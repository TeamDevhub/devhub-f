import { signup, oauthSignup } from '@/api/web/api.signup';

import type { ApiResponse } from '@/types/type.api';
import type { SignupRequest, OauthSignupRequest } from '@/types/type.signup';
import type { AgreeTermsRequest } from '@/types/type.terms';

import { Validators } from '@/utils/util._common';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState.ts';
import { useModal } from '@/hooks/_common/useModal';
import { useAuth } from '@/hooks/_common/useAuth';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { SUCCESS_MESSAGES } from '@/constants/successMessages';

import type { TokenResponseDto } from '@/types/type.auth';

interface SignupFormState extends SignupRequest {
  passwordConfirm: string;
}

interface SignupParams {
  email?: string;
  tempToken?: string;
}

export default function useSignup({ email, tempToken }: SignupParams) {
  const { alert } = useModal();
  const navigate = useNavigate();
  const { login: _login } = useAuth();

  const initData: SignupFormState = {
    email: email ?? '',
    password: '',
    passwordConfirm: '',
    username: '',
    introduction: '',
    skillList: [],
    positionList: [],
    termsAgreementList: [],
  };

  const validations = tempToken
    ? {
        username: [Validators.required()],
        skillList: [Validators.minArrayLength(1)],
        positionList: [Validators.minArrayLength(1)],
      }
    : {
        password: [Validators.required(), Validators.minLength(10)],
        passwordConfirm: [Validators.required()],
        username: [Validators.required()],
        skillList: [Validators.minArrayLength(1)],
        positionList: [Validators.minArrayLength(1)],
      };

  const { state: userInfo, handleChange, createHandler, createToggle, checkError } = useFormState(initData, { validations });

  const handleSuccessSignup = () => {
    alert(SUCCESS_MESSAGES.SIGNUP_COMPLETE);
    navigate('/auth/login');
  };

  const handleSuccessOauthSignup = async (res: ApiResponse<TokenResponseDto>) => {
    alert(SUCCESS_MESSAGES.OAUTH_SIGNUP_COMPLETE);
    await _login(res.data?.accessToken);
    navigate('/');
  };

  const handleFailSignup = (res: ApiResponse<unknown>) => {
    console.error('signup failed', res.code);
    alert(ERROR_MESSAGES.SIGNUP_FAILED);
  };

  const handleFailOauthSignup = (res: ApiResponse<unknown>) => {
    console.error('oauth signup failed', res.code);
    alert(ERROR_MESSAGES.OAUTH_SIGNUP_FAILED);
  };

  const { mutate: requestSignup, loading: signupLoading } = useMutation<SignupRequest, void>(signup, handleSuccessSignup, handleFailSignup);

  const { mutate: requestOauthSignup, loading: oauthSignupLoading } = useMutation<OauthSignupRequest, TokenResponseDto>(
    oauthSignup,
    handleSuccessOauthSignup,
    handleFailOauthSignup,
  );

  const loading = signupLoading || oauthSignupLoading;

  const applySignup = async (termsAgreementList: AgreeTermsRequest[]) => {
    if (checkError()) return;

    if (userInfo.password !== userInfo.passwordConfirm) {
      alert(ERROR_MESSAGES.PASSWORD_MISMATCH);
      return;
    }

    if (tempToken) {
      const payload: OauthSignupRequest = {
        tempToken: tempToken,
        username: userInfo.username,
        introduction: userInfo.introduction,
        skillList: userInfo.skillList,
        positionList: userInfo.positionList,
        termsAgreementList,
      };

      await requestOauthSignup(payload);
      return;
    }

    const payload: SignupRequest = {
      email: userInfo.email,
      password: userInfo.password,
      username: userInfo.username,
      introduction: userInfo.introduction,
      skillList: userInfo.skillList,
      positionList: userInfo.positionList,
      termsAgreementList,
    };

    await requestSignup(payload);
  };

  return {
    userInfo,
    handleChange,
    createHandler,
    createToggle,
    applySignup,
    loading,
  };
}
