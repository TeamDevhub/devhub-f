import type { ReactNode } from 'react';

export type IconBadgeTone = 'primary' | 'secondary' | 'error' | 'warning' | 'success';
export type IconBadgeSize = 'small' | 'medium';

interface IconBadgeProps {
  icon: ReactNode;
  tone: IconBadgeTone;
  size?: IconBadgeSize;
}

// 톤이 있는 원형 아이콘 배지 - 에러 페이지 / 다이얼로그가 공통으로 사용하는 시각 요소
export default function IconBadge({ icon, tone, size = 'medium' }: IconBadgeProps) {
  return (
    <div className={`icon-badge icon-badge--${size} icon-badge--${tone}`} aria-hidden="true">
      {icon}
    </div>
  );
}
