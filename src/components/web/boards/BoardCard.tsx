import HeartButton from '@/components/_common/button/HeartButton';
import { BoardCategoryChip } from '@/components/web/boards/BoardChips';
import type { BoardSummary } from '@/types/type.boards';
import { Create, Visibility } from '@mui/icons-material';
import { Paper } from '@mui/material';
import { elapsedTime } from '@/utils/util.date.ts';

interface BoardCardProps {
  boardData: BoardSummary;
  toggleLike: (boardGuid: string) => void | Promise<unknown>;
  handleDetail: (boardGuid: string) => void;
  isLoggedIn: boolean;
}
export default function BoardCard({ boardData, toggleLike, handleDetail, isLoggedIn }: BoardCardProps) {
  const { boardBasicResponseDto, likeCount, commentCount } = boardData;

  return (
    <Paper className="board-box w-100 flex-col align-center" elevation={4} onClick={() => handleDetail(boardBasicResponseDto.boardGuid)}>
      <div className="top w-100 justify-between">
        <div className="left-area flex-col align-start flex-1">
          <BoardCategoryChip categoryCd={boardBasicResponseDto.categoryCd}></BoardCategoryChip>
          <strong className="main-text text-ellipsis">{boardBasicResponseDto.title}</strong>
        </div>
        <div className="right-area flex-col">
          <div className="heart-box flex-col align-end">
            <HeartButton likeCount={likeCount} onClick={() => toggleLike(boardBasicResponseDto.boardGuid)} onBeforeToggle={() => isLoggedIn} />
          </div>
        </div>
      </div>
      <div className="bottom w-100 align-center justify-between">
        <div className="left-area">
          <p className="user-info">
            {boardBasicResponseDto.userName}. {elapsedTime(boardBasicResponseDto.registeredDate)}
          </p>
        </div>
        <div className="right-area align-center">
          {/* <div className='view-count align-center'>
              <Visibility sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
              <p>{boardBasicResponseDto.viewCount}</p>
            </div> */}
          <div className="reply-count align-center">
            <Create sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
            <p>{commentCount}</p>
          </div>
        </div>
      </div>
    </Paper>
  );
}
