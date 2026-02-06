import { useMutation } from '../_common/api.hook';
import { useFormState } from '../_common/common.hook';
import { setSessionStorage, Validators } from '@/utils/util._common';
import { login } from '@/api/login/login.api';
import type { ApiResponse } from '@/types/type.api';
import type { LoginRequest, LoginResponse } from '@/types/type.login';
import { useNavigate } from 'react-router-dom';
import useFormState from '@/hooks/_common/useFormState.ts';
import { useAuth } from '@/contexts/AuthContext.ts';

const initData: LoginRequest = {
  email: '',
  password: '',
};

export default function useLogin() {
  const navigate = useNavigate();
  const { login: _login } = useAuth();

  const validations = {
    email: [Validators.required(), Validators.email()],
    password: [Validators.required()],
  };

  const { state: loginInfo, setState: setLoginInfo, checkError } = useFormState(initData, { validations });

  const changeId = (value: string) => {
    setLoginInfo((prev) => ({ ...prev, email: value }));
  };

  const changePassword = (value: string) => {
    setLoginInfo((prev) => ({ ...prev, password: value }));
  };

  const handleSuccessLogin = (res: ApiResponse<LoginResponse>) => {
    setSessionStorage('accessToken', res.data?.accessToken);
    navigate('/');
  };

  const handleFailLogin = (res: ApiResponse<LoginResponse>) => {
    alert(res.code);
    changePassword('');
  };

  const { mutate: requestLogin, loading } = useMutation<LoginRequest, LoginResponse>(login, handleSuccessLogin, handleFailLogin);

  const applyLogin = async () => {
    if (checkError()) return;

    const payload: LoginRequest = {
      email: loginInfo.email,
      password: loginInfo.password,
    };

    await requestLogin(payload);
  };

  return {
    loginInfo,
    changeId,
    changePassword,
    applyLogin,
    loading,
  };
}
