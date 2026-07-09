import { useId, type ReactNode } from 'react';

interface CarouselNav {
  prevClass: string;
  nextClass: string;
}

interface CarouselViewportProps {
  className?: string;
  children: (nav: CarouselNav) => ReactNode;
}

// Swiper와 좌우 방향 버튼만 감싸는 공통 뷰포트.
// 버튼의 세로 중심은 이 요소의 높이(= Swiper 콘텐츠 높이) 기준으로만 계산되므로,
// 타이틀이나 섹션 여백(margin/gap)이 바뀌어도 항상 캐러셀 콘텐츠 정중앙에 고정된다.
export default function CarouselViewport({ className, children }: CarouselViewportProps) {
  const navId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const prevClass = `carousel-nav-prev-${navId}`;
  const nextClass = `carousel-nav-next-${navId}`;

  return (
    <div className={['carousel-viewport', className].filter(Boolean).join(' ')}>
      {children({ prevClass, nextClass })}
      <div className={`swiper-button-prev ${prevClass}`} />
      <div className={`swiper-button-next ${nextClass}`} />
    </div>
  );
}
