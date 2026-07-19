import { useNavigate } from 'react-router-dom';
import BaseErrorPage from '@/components/_common/error/BaseErrorPage';
import { ERROR_PAGE_PRESETS, ERROR_PAGE_TYPE } from '@/constants/errorPages';

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <BaseErrorPage
      type={ERROR_PAGE_TYPE.FORBIDDEN}
      {...ERROR_PAGE_PRESETS[ERROR_PAGE_TYPE.FORBIDDEN]}
      primaryAction={{ label: '홈으로', onClick: () => navigate('/') }}
      secondaryAction={{ label: '이전으로', onClick: () => navigate(-1) }}
    />
  );
}
