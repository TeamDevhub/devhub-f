import { useNavigate } from 'react-router-dom';
import BaseErrorPage from '@/components/_common/error/BaseErrorPage';
import { ERROR_PAGE_PRESETS, ERROR_PAGE_TYPE } from '@/constants/errorPages';

export default function ServerErrorPage() {
  const navigate = useNavigate();

  return (
    <BaseErrorPage
      type={ERROR_PAGE_TYPE.SERVER_ERROR}
      {...ERROR_PAGE_PRESETS[ERROR_PAGE_TYPE.SERVER_ERROR]}
      primaryAction={{ label: '홈으로', onClick: () => navigate('/') }}
      secondaryAction={{ label: '새로고침', onClick: () => window.location.reload() }}
    />
  );
}
