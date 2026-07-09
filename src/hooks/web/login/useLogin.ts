import { useMutation } from '@/hooks/_common/api.hook';
import { Validators } from '@/utils/util._common';
import { login } from '@/api/web/api.auth';
import type { ApiResponse } from '@/types/type.api';
import type { LoginRequest, TokenResponseDto } from '@/types/type.auth';
import { useNavigate } from 'react-router-dom';
import useFormState from '@/hooks/_common/useFormState.ts';
import { useAuth } from '@/hooks/_common/useAuth';
import { useModal } from '@/hooks/_common/useModal';
import { ERROR_MESSAGES } from '@/constants/errorMessages';

const initData: LoginRequest = {
  email: '',
  password: '',
};

export default function useLogin() {
  const { alert } = useModal();
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

  const handleSuccessLogin = async (res: ApiResponse<TokenResponseDto>) => {
    await _login?.(res.data?.accessToken);
    navigate('/');
  };

  const handleFailLogin = (res: ApiResponse<TokenResponseDto>) => {
    console.error('login failed', res.code);
    alert(ERROR_MESSAGES.LOGIN_FAILED);
    changePassword('');
  };

  const { mutate: requestLogin, loading } = useMutation<LoginRequest, TokenResponseDto>(login, handleSuccessLogin, handleFailLogin);

  const applyLogin = async () => {
    if (checkError()) return;

    const payload: LoginRequest = {
      email: loginInfo.email,
      password: loginInfo.password,
    };

    await requestLogin(payload);
  };

  const oauthLogin = (provider: 'google' | 'github' | 'kakao') => {
    const apiUrl = import.meta.env.VITE_API_URL;

    console.log('VITE_API_URL =', apiUrl);

    if (!apiUrl) {
      throw new Error('VITE_API_URL is not configured');
    }

    window.location.href = `${apiUrl}/auth/oauth/${provider}`;
  };

  return {
    loginInfo,
    changeId,
    changePassword,
    applyLogin,
    oauthLogin,
    loading,
  };
}
