import { useNavigate } from 'react-router-dom';
import BaseErrorPage from '@/components/_common/error/BaseErrorPage';
import { ERROR_PAGE_PRESETS, ERROR_PAGE_TYPE } from '@/constants/errorPages';

export default function NetworkErrorPage() {
  const navigate = useNavigate();

  return (
    <BaseErrorPage
      type={ERROR_PAGE_TYPE.NETWORK_ERROR}
      {...ERROR_PAGE_PRESETS[ERROR_PAGE_TYPE.NETWORK_ERROR]}
      primaryAction={{ label: '다시 시도', onClick: () => window.location.reload() }}
      secondaryAction={{ label: '홈으로', onClick: () => navigate('/') }}
    />
  );
}
