import { Fragment, type ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper.css';
import CarouselViewport from '@/components/web/home/CarouselViewport';

const RESPONSIVE_BREAKPOINTS = {
  0: { slidesPerView: 1.2 },
  768: { slidesPerView: 2 },
  1200: { slidesPerView: 3 },
};

interface HomeSwiperListProps<T> {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  rowClassName: string;
  swiperClassName: string;
  emptyMessage: string;
  maxVisible?: number;
}

// 항목이 maxVisible 이하면 일반 그리드로, 초과하면 Swiper 캐러셀로 전환되는 홈 화면 공용 리스트
export default function HomeSwiperList<T>({
  items,
  getKey,
  renderItem,
  rowClassName,
  swiperClassName,
  emptyMessage,
  maxVisible = 3,
}: HomeSwiperListProps<T>) {
  if (items.length === 0) {
    return <p className={`${rowClassName}-empty`}>{emptyMessage}</p>;
  }

  if (items.length <= maxVisible) {
    return (
      <div className={rowClassName}>
        {items.map((item) => (
          <Fragment key={getKey(item)}>{renderItem(item)}</Fragment>
        ))}
      </div>
    );
  }

  return (
    <CarouselViewport className={swiperClassName}>
      {({ prevClass, nextClass }) => (
        <Swiper
          observer
          observeParents
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={RESPONSIVE_BREAKPOINTS}
          navigation={{ nextEl: `.${nextClass}`, prevEl: `.${prevClass}` }}
        >
          {items.map((item) => (
            <SwiperSlide key={getKey(item)}>{renderItem(item)}</SwiperSlide>
          ))}
        </Swiper>
      )}
    </CarouselViewport>
  );
}
