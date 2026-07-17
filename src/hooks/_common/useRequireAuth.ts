import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/_common/useAuth';
import { useModal } from '@/hooks/_common/useModal';

const LOGIN_REQUIRED_MESSAGE = '로그인이 필요한 기능입니다.\n로그인 후 다시 시도해 주세요.';

export const useRequireAuth = () => {
  const { isLoggedIn } = useAuth();
  const { confirm } = useModal();
  const navigate = useNavigate();

  const requireAuth = async (action?: () => unknown): Promise<boolean> => {
    if (isLoggedIn) {
      await action?.();
      return true;
    }

    const goLogin = await confirm(LOGIN_REQUIRED_MESSAGE, {
      title: '로그인이 필요해요',
      submitText: '로그인',
      variant: 'info',
    });

    if (goLogin) navigate('/auth/login');
    return false;
  };

  return { requireAuth, isLoggedIn };
};

export default useRequireAuth;
