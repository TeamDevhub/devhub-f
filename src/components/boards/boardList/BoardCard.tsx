import HeartButton from '@/components/_common/button/HeartButton';
import { BoardCategoryChip } from '@/components/boards/BoardChips';
import type { BoardSummary } from "@/types/type.boards";
import { Create, Visibility } from '@mui/icons-material';
import { Paper } from '@mui/material';
import {convertString} from "@/utils/util.date.ts";

interface BoardCardProps {
  boardData : BoardSummary;
  handleLike:(boardGuid:string) => void;
}
export default function BoardCard({
  boardData, 
  handleLike
} : BoardCardProps){

  const {
    boardBasicResponseDto,
    likeCount, 
    commentCount
  } = boardData;
  
  return(
    <Paper className='board-box w-100 flex-col align-center' elevation={4}>
        <div className="top w-100 justify-between">
          <div className="left-area flex-col align-start flex-1">
            <BoardCategoryChip categoryCd={boardBasicResponseDto.categoryCd}></BoardCategoryChip>
            <strong className='main-text text-ellipsis'>
              {boardBasicResponseDto.title}
            </strong>
          </div>
          <div className="right-area flex-col">
            <div className='heart-box flex-col align-end'>
              <HeartButton likeCount={likeCount} onClick={()=>handleLike(boardBasicResponseDto.boardGuid)}/>
            </div>
          </div>
        </div>
        <div className="bottom w-100 align-center justify-between">
          <div className="left-area">
            <p className='user-info'>{boardBasicResponseDto.userName}. {convertString(boardBasicResponseDto.registeredDate)}</p>
          </div>
          <div className="right-area align-center">
            <div className='view-count align-center'>
              <Visibility sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
              <p>{boardBasicResponseDto.viewCount}</p>
            </div>
            <div className="reply-count align-center">
              <Create sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
              <p>{commentCount}</p>
            </div>
          </div>
        </div>
      </Paper>
  )
}