import HomeSwiperList from '@/components/web/home/HomeSwiperList';
import HomeBoardCard from '@/components/web/home/HomeBoardCard';
import type { HomeBoard } from '@/types/type.home';

interface BoardCardGridProps {
  boards: HomeBoard[];
}

export default function BoardCardGrid({ boards }: BoardCardGridProps) {
  return (
    <HomeSwiperList
      items={boards}
      getKey={(board) => board.boardGuid}
      renderItem={(board) => <HomeBoardCard board={board} />}
      rowClassName="board-list"
      swiperClassName="board-swiper"
      emptyMessage="등록된 게시글이 없습니다."
    />
  );
}
