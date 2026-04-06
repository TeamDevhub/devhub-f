import { signup } from '@/api/signup/signup.api';

import type { ApiResponse } from '@/types/type.api';
import type { SignupRequest } from '@/types/type.signup';
import type { AgreeTermsRequest } from '@/types/type.terms';

import { Validators } from '@/utils/util._common';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState.ts';
import { useModal } from '@/hooks/_common/useModal';

interface SignupFormState extends SignupRequest {
  passwordConfirm: string;
}

export default function useSignup(email: string) {
  const { alert } = useModal();
  const navigate = useNavigate();

  const initData: SignupFormState = {
    email,
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

  const handleSuccessSignup = (res: ApiResponse<void>) => {
    alert(res.code);
    navigate('/auth/login');
  };

  const handleFailSignup = (res: ApiResponse<void>) => {
    alert(res.code);
  };

  const { mutate: requestSignup, loading } = useMutation<SignupRequest, void>(signup, handleSuccessSignup, handleFailSignup);

  const applySignup = async (termsAgreementList: AgreeTermsRequest[]) => {
    if (checkError()) return;

    if (userInfo.password !== userInfo.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
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
