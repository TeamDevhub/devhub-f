import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import BaseErrorPage from '@/components/_common/error/BaseErrorPage';
import { ERROR_PAGE_PRESETS, ERROR_PAGE_TYPE } from '@/constants/errorPages';
import type { ErrorPageType } from '@/types/type.error';

const resolveErrorType = (error: unknown): ErrorPageType => {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return ERROR_PAGE_TYPE.NOT_FOUND;
    if (error.status === 401 || error.status === 403) return ERROR_PAGE_TYPE.FORBIDDEN;
  }
  return ERROR_PAGE_TYPE.SERVER_ERROR;
};

// 라우터 errorElement 전용 - 라우트 매칭 실패/로더 에러/렌더링 중 예외를 상태코드에 맞는 에러 페이지로 매핑한다
export default function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const type = resolveErrorType(error);

  return (
    <BaseErrorPage
      type={type}
      {...ERROR_PAGE_PRESETS[type]}
      primaryAction={{ label: '홈으로', onClick: () => navigate('/') }}
      secondaryAction={{ label: '이전으로', onClick: () => navigate(-1) }}
    />
  );
}
