import {
  BuildRounded,
  ConstructionRounded,
  LockRounded,
  ReportProblemRounded,
  RocketLaunchRounded,
  SearchOffRounded,
  WifiOffRounded,
} from '@mui/icons-material';
import IconBadge, { type IconBadgeTone } from '@/components/_common/IconBadge';
import { ERROR_PAGE_TYPE } from '@/constants/errorPages';
import type { ErrorPageType } from '@/types/type.error';

interface ErrorIllustrationProps {
  type: ErrorPageType;
}

const ERROR_ICON_MAP: Record<ErrorPageType, { icon: React.ReactNode; tone: IconBadgeTone }> = {
  [ERROR_PAGE_TYPE.NOT_FOUND]: { icon: <SearchOffRounded />, tone: 'secondary' },
  [ERROR_PAGE_TYPE.FORBIDDEN]: { icon: <LockRounded />, tone: 'error' },
  [ERROR_PAGE_TYPE.SERVER_ERROR]: { icon: <ReportProblemRounded />, tone: 'error' },
  [ERROR_PAGE_TYPE.NETWORK_ERROR]: { icon: <WifiOffRounded />, tone: 'warning' },
  [ERROR_PAGE_TYPE.SERVICE_UNAVAILABLE]: { icon: <BuildRounded />, tone: 'warning' },
  [ERROR_PAGE_TYPE.NOT_IMPLEMENTED]: { icon: <ConstructionRounded />, tone: 'primary' },
  [ERROR_PAGE_TYPE.COMING_SOON]: { icon: <RocketLaunchRounded />, tone: 'primary' },
};

// 에러 유형별 아이콘 + 톤 배지 - 기존 팔레트(primary/secondary/error/warning)만 사용
export default function ErrorIllustration({ type }: ErrorIllustrationProps) {
  const { icon, tone } = ERROR_ICON_MAP[type] ?? ERROR_ICON_MAP[ERROR_PAGE_TYPE.COMING_SOON];
  return <IconBadge icon={icon} tone={tone} size="medium" />;
}
