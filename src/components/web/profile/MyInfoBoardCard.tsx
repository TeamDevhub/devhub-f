import { Button } from '@mui/material'
import { BoardCategoryChip } from '@/components/web/boards/BoardChips';
import type { BoardSummary } from "@/types/type.boards";
import {convertString} from "@/utils/util.date.ts";
import { Create, Favorite, Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

interface BoardCardProps {
  boardData : BoardSummary;
  handleDelete:(boardGuid:string) => void;
}
export default function MyInfoBoardCard({
  boardData, 
  handleDelete
} : BoardCardProps){

  const {
    boardBasicResponseDto,
    likeCount, 
    commentCount
  } = boardData;

  const navigate = useNavigate();
  
  return (
    <div className="board-box flex">
      <div className="left-area flex-col flex-1 align-start">
        <BoardCategoryChip categoryCd={boardBasicResponseDto.categoryCd}></BoardCategoryChip>
        <strong className='title text-ellipsis'>{boardBasicResponseDto.title}</strong>
        <p className="post-date">{convertString(boardBasicResponseDto.registeredDate)}</p>
      </div>
      <div className="right-area flex-col align-end justify-between">
        <div className="info-box align-center">
          <div className='align-center'>
            <Visibility sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.3)' }} />
            <p>{boardBasicResponseDto.viewCount}</p>
          </div>
          <div className="align-center">
            <Create sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.3)' }} />
            <p>{commentCount}</p>
          </div>
          <div className="align-center">
            <Favorite sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.3)' }} />
            <p>{likeCount}</p>
          </div>
        </div>
        <div className="button-box align-center gap-4">
          <Button onClick={()=>handleDelete(boardBasicResponseDto.boardGuid)} size='small' color='primary'>삭제</Button>
          <Button onClick={(e) => { e.stopPropagation(); navigate(`/boards/update`, {state : {boardGuid : boardBasicResponseDto.boardGuid}}) }} size='small' variant='outlined' color='primary'>수정</Button>
        </div>
      </div>
    </div>
  )
}