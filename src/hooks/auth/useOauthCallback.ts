import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@/hooks/_common/api.hook';
import { oauthCallback } from '@/api/auth/oauth.api';
import { useModal } from '@/hooks/_common/useModal';
import { useAuth } from '@/contexts/AuthContext';
import type { ApiResponse } from '@/types/type.api';
import type { OauthResponse } from '@/types/type.oauth';

export default function useOauthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { alert } = useModal();
  const { login } = useAuth();

  const handleSuccess = (res: ApiResponse<OauthResponse>) => {
    const data = res.data;

    if (!data) {
      alert('잘못된 응답입니다.');
      navigate('/auth/login');
      return;
    }

    if ('tempToken' in data) {
      navigate('/auth/signup');
      return;
    }

    if ('accessToken' in data) {
      login?.(data.accessToken);
      navigate('/');
      return;
    }

    alert('알 수 없는 인증 상태');
    navigate('/');
  };

  const handleFail = (res: ApiResponse<OauthResponse>) => {
    alert(res?.error?.message || '로그인 실패');
    navigate('/');
  };

  const { mutate, loading } = useMutation<{ provider: string; code: string }, OauthResponse>(
    ({ provider, code }) => oauthCallback(provider, code),
    handleSuccess,
    handleFail,
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const provider = location.pathname.split('/').pop();

    if (!code || !provider) {
      alert('잘못된 접근입니다.');
      navigate('/');
      return;
    }

    mutate({ provider, code });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return { loading };
}
