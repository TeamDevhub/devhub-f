import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/_common/useAuth';

// /admin 라우트 트리를 감싸는 가드 - 로그인 여부 + ADMIN 권한까지 함께 확인한다.
// authStore 초기화 완료 전까지는 판단을 보류한다 (RequireAuthRoute와 동일한 패턴)
export default function RequireAdminRoute() {
  const { isLoggedIn, initialized, user } = useAuth();

  if (!initialized) return null;

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user?.userRole !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
