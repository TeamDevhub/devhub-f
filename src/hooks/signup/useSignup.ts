import { signup, oauthSignup } from '@/api/signup/signup.api';

import type { ApiResponse } from '@/types/type.api';
import type { SignupRequest, OauthSignupRequest } from '@/types/type.signup';
import type { AgreeTermsRequest } from '@/types/type.terms';

import { Validators } from '@/utils/util._common';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState.ts';
import { useModal } from '@/hooks/_common/useModal';
import { setSessionStorage } from '@/utils/util._common.ts';

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

  const validations = {
    password: [Validators.required(), Validators.minLength(10)],
    passwordConfirm: [Validators.required()],
    username: [Validators.required()],
    skillList: [Validators.minArrayLength(1)],
    positionList: [Validators.minArrayLength(1)],
  };

  const { state: userInfo, handleChange, createHandler, createToggle, checkError } = useFormState(initData, { validations });

  const handleSuccessSignup = (res: ApiResponse<TokenResponseDto>) => {
    alert(res.code);

    const accessToken = res.data?.accessToken;

    if (accessToken) {
      setSessionStorage('accessToken', accessToken);
      navigate('/'); // 🔥 메인으로 바로 이동
      return;
    }

    navigate('/auth/login');
  };

  const handleFailSignup = (res: ApiResponse<TokenResponseDto>) => {
    alert(res.code);
  };

  const { mutate: requestSignup, loading: signupLoading } = useMutation<SignupRequest, TokenResponseDto>(
    signup,
    handleSuccessSignup,
    handleFailSignup,
  );

  const { mutate: requestOauthSignup, loading: oauthSignupLoading } = useMutation<OauthSignupRequest, TokenResponseDto>(
    oauthSignup,
    handleSuccessSignup,
    handleFailSignup,
  );

  const loading = signupLoading || oauthSignupLoading;

  const applySignup = async (termsAgreementList: AgreeTermsRequest[]) => {
    if (checkError()) return;

    if (userInfo.password !== userInfo.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (tempToken) {
      const payload: OauthSignupRequest = {
        tempToken: tempToken,
        password: userInfo.password,
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
