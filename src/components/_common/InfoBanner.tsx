import { InfoOutlined } from '@mui/icons-material';
import type { ReactNode } from 'react';

interface InfoBannerProps {
  children: ReactNode;
}

// 페이지 상단에 붙는 가벼운 안내 배너 - 에러/경고와 구분되는 톤(연한 primary)만 사용한다
export default function InfoBanner({ children }: InfoBannerProps) {
  return (
    <div className="info-banner align-center" role="status">
      <InfoOutlined className="info-banner-icon" />
      <p className="info-banner-text">{children}</p>
    </div>
  );
}
