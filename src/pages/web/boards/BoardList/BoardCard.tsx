import { Paper } from '@mui/material'
import { Create, Visibility } from '@mui/icons-material'
import type { BoardSummary } from "@/api/boards/boards.type";
import HeartButton from '@/components/common/HeartButton';
import { BoardCategoryChip} from '@/components/boards/BoardChips';

 export default function BoardCard(boardData : BoardSummary){
    const {
      username,
      categoryCd,
      title,
      registeredDate,
      viewCount,
      likeCount, 
      commentCount
    } = boardData;

    return(
      <Paper className='board-box w-100 flex-col align-center' elevation={4}>
          <div className="top w-100 justify-between">
            <div className="left-area flex-col align-start flex-1">
              <BoardCategoryChip categoryCd={categoryCd}></BoardCategoryChip>
              <strong className='main-text text-ellipsis'>
                {title}
              </strong>
            </div>
            <div className="right-area flex-col">
              <div className='heart-box flex-col align-end'>
                <HeartButton likeCount={likeCount} />
              </div>
            </div>
          </div>
          <div className="bottom w-100 align-center justify-between">
            <div className="left-area">
              <p className='user-info'>{username}. {registeredDate}</p>
            </div>
            <div className="right-area align-center">
              <div className='view-count align-center'>
                <Visibility sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>{viewCount}</p>
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