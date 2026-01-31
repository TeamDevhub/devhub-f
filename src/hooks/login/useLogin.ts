import { useMutation } from '../_common/api.hook';
import { useFormState } from '../_common/common.hook';
import { Validators } from '@/utils/util._common';
import { login } from '@/api/login/login.api';
import { setLocalStorage } from '@/utils/util._common';

import type { ApiResponse } from '@/types/type.api';
import type { LoginRequest, LoginResponse } from '@/types/type.login';
import { useNavigate } from 'react-router-dom';

const initData: LoginRequest = {
  id: '',
  password: '',
};

export default function useLogin() {
  const navigate = useNavigate();

  const validations = {
    id: [Validators.required(), Validators.email()],
    password: [Validators.required()],
  };

  const { state: loginInfo, setState: setLoginInfo, checkError } = useFormState(initData, { validations });

  const changeId = (value: string) => {
    setLoginInfo((prev) => ({ ...prev, id: value }));
  };

  const changePassword = (value: string) => {
    setLoginInfo((prev) => ({ ...prev, password: value }));
  };

  const handleSuccessLogin = (res: ApiResponse<LoginResponse>) => {
    setLocalStorage('accessToken', res.data?.accessToken);
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
      id: loginInfo.id,
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
