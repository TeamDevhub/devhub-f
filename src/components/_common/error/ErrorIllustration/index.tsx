import {
  BuildRounded,
  ConstructionRounded,
  LockRounded,
  ReportProblemRounded,
  RocketLaunchRounded,
  SearchOffRounded,
  WifiOffRounded,
} from '@mui/icons-material';
import { ERROR_PAGE_TYPE } from '@/constants/errorPages';
import type { ErrorPageType } from '@/types/type.error';

interface ErrorIllustrationProps {
  type: ErrorPageType;
}

// 에러 유형별 아이콘 + 톤 배지 - 기존 팔레트(primary/secondary/error/warning)만 사용
export default function ErrorIllustration({ type }: ErrorIllustrationProps) {
  switch (type) {
    case ERROR_PAGE_TYPE.NOT_FOUND:
      return (
        <div className="error-icon-badge error-icon-badge--secondary" aria-hidden="true">
          <SearchOffRounded />
        </div>
      );
    case ERROR_PAGE_TYPE.FORBIDDEN:
      return (
        <div className="error-icon-badge error-icon-badge--error" aria-hidden="true">
          <LockRounded />
        </div>
      );
    case ERROR_PAGE_TYPE.SERVER_ERROR:
      return (
        <div className="error-icon-badge error-icon-badge--error" aria-hidden="true">
          <ReportProblemRounded />
        </div>
      );
    case ERROR_PAGE_TYPE.NETWORK_ERROR:
      return (
        <div className="error-icon-badge error-icon-badge--warning" aria-hidden="true">
          <WifiOffRounded />
        </div>
      );
    case ERROR_PAGE_TYPE.SERVICE_UNAVAILABLE:
      return (
        <div className="error-icon-badge error-icon-badge--warning" aria-hidden="true">
          <BuildRounded />
        </div>
      );
    case ERROR_PAGE_TYPE.NOT_IMPLEMENTED:
      return (
        <div className="error-icon-badge error-icon-badge--primary" aria-hidden="true">
          <ConstructionRounded />
        </div>
      );
    case ERROR_PAGE_TYPE.COMING_SOON:
    default:
      return (
        <div className="error-icon-badge error-icon-badge--primary" aria-hidden="true">
          <RocketLaunchRounded />
        </div>
      );
  }
}
