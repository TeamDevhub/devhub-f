import { signup } from '@/api/signup/signup.api';
import type { ApiResponse } from '@/types/type.api';
import type { SignupRequest } from '@/types/type.signup';
import { Validators } from '@/utils/util._common';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '../_common/api.hook';
import { useFormState } from '../_common/common.hook';

interface SignupFormState extends SignupRequest {
  passwordConfirm: string;
}

export default function useSignup(email: string) {
  const navigate = useNavigate();

  const initData: SignupFormState = {
    email: email,
    password: '',
    passwordConfirm: '',
    username: '',
    introduction: '',
    skillList: [],
    positionList: [],
  };

  const validations = {
    password: [Validators.required(), Validators.minLength(10)],
    passwordConfirm: [Validators.required()],
    username: [Validators.required()],
    skillList: [Validators.minArrayLength(1)],
    positionList: [Validators.minArrayLength(1)],
  };

  const { state: userInfo, setState: setUserInfo, checkError } = useFormState(initData, { validations });

  const changeUserInfo = <K extends keyof SignupFormState>(key: K, value: SignupFormState[K]) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleArrayValue = (key: 'positionList' | 'skillList', value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }));
  };

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

    const payload: SignupRequest = {
      email: userInfo.email,
      password: userInfo.password,
      username: userInfo.username,
      introduction: userInfo.introduction,
      skillList: userInfo.skillList,
      positionList: userInfo.positionList,
    };

    await requestSignup(payload);
  };

  return {
    userInfo,
    changeUserInfo,
    toggleArrayValue,
    applySignup,
    loading,
  };
}
