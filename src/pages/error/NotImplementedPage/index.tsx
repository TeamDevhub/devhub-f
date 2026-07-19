import { useNavigate } from 'react-router-dom';
import BaseErrorPage from '@/components/_common/error/BaseErrorPage';
import { ERROR_PAGE_PRESETS, ERROR_PAGE_TYPE } from '@/constants/errorPages';

export default function NotImplementedPage() {
  const navigate = useNavigate();

  return (
    <BaseErrorPage
      type={ERROR_PAGE_TYPE.NOT_IMPLEMENTED}
      {...ERROR_PAGE_PRESETS[ERROR_PAGE_TYPE.NOT_IMPLEMENTED]}
      primaryAction={{ label: '홈으로', onClick: () => navigate('/') }}
      secondaryAction={{ label: '이전으로', onClick: () => navigate(-1) }}
    />
  );
}
