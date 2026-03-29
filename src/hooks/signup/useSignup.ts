import { useEffect, useState } from 'react';
import { signup } from '@/api/signup/signup.api';
import { getTerms } from '@/api/terms/terms.api';

import type { ApiResponse } from '@/types/type.api';
import type { SignupRequest } from '@/types/type.signup';
import type { TermsResponse, AgreeTermsRequest } from '@/types/type.terms';

import { Validators } from '@/utils/util._common';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState.ts';
import { useModal } from '@/hooks/_common/useModal';

interface SignupFormState extends SignupRequest {
  passwordConfirm: string;
}

interface TermsItem extends TermsResponse {
  isAgreed: boolean;
}

export default function useSignup(email: string) {
  const { alert } = useModal();
  const navigate = useNavigate();
  const [terms, setTerms] = useState<TermsItem[]>([]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await getTerms();
        const data = res.data ?? [];

        setTerms(
          data
            .filter((t) => t.isUsed && !t.isDeleted)
            .map((t) => ({
              ...t,
              isAgreed: false,
            })),
        );
      } catch {
        alert('약관을 불러오지 못했습니다.');
      }
    };

    fetchTerms();
  }, [alert]);

  const toggleTerms = (termsGuid: string) => {
    setTerms((prev) => prev.map((t) => (t.termsGuid === termsGuid ? { ...t, isAgreed: !t.isAgreed } : t)));
  };

  const agreeAllTerms = (checked: boolean) => {
    setTerms((prev) =>
      prev.map((t) => ({
        ...t,
        isAgreed: checked,
      })),
    );
  };

  const validateTerms = () => {
    const hasUnagreedRequired = terms.some((t) => t.isRequired && !t.isAgreed);

    if (hasUnagreedRequired) {
      alert('필수 약관에 동의해주세요.');
      return false;
    }

    return true;
  };

  const buildTermsPayload = (): AgreeTermsRequest[] =>
    terms.map((t) => ({
      termsGuid: t.termsGuid,
      isAgreed: t.isAgreed,
    }));

  const initData: SignupFormState = {
    email: email,
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

  const applySignup = async () => {
    if (checkError()) return;

    if (userInfo.password !== userInfo.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validateTerms()) return;

    const termsAgreementList = buildTermsPayload();

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

    terms,
    toggleTerms,
    agreeAllTerms,

    applySignup,
    loading,
  };
}
