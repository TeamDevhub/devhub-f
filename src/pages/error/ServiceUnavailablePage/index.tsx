import { useNavigate } from 'react-router-dom';
import BaseErrorPage from '@/components/_common/error/BaseErrorPage';
import { ERROR_PAGE_PRESETS, ERROR_PAGE_TYPE } from '@/constants/errorPages';

export default function ServiceUnavailablePage() {
  const navigate = useNavigate();

  return (
    <BaseErrorPage
      type={ERROR_PAGE_TYPE.SERVICE_UNAVAILABLE}
      {...ERROR_PAGE_PRESETS[ERROR_PAGE_TYPE.SERVICE_UNAVAILABLE]}
      primaryAction={{ label: '홈으로', onClick: () => navigate('/') }}
    />
  );
}
