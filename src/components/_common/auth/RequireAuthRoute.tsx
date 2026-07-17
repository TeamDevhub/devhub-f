import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/_common/useAuth';

// 마이페이지 등 로그인 전용 라우트 트리를 감싸는 가드 - authStore 초기화 완료 전까지는 판단을 보류한다
export default function RequireAuthRoute() {
  const { isLoggedIn, initialized } = useAuth();
  const location = useLocation();

  if (!initialized) return null;

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
