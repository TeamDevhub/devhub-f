import { useNavigate } from 'react-router-dom';
import { Chip, Paper } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useCodes } from '@/hooks/_common/useCodes';
import HeartButton from '@/components/_common/button/HeartButton';
import { COMMON_CODE } from '@/constants/codes';
import type { HomeBoard } from '@/types/type.home';

interface HomeBoardCardProps {
  board: HomeBoard;
}

export default function HomeBoardCard({ board }: HomeBoardCardProps) {
  const navigate = useNavigate();
  const { getCodeName } = useCodes();

  return (
    <Paper
      className="board-box flex-col align-center"
      variant="outlined"
      onClick={() => navigate('/boards/detail', { state: { boardGuid: board.boardGuid } })}
    >
      <div className="top w-100 justify-between">
        <div className="left-area flex-col align-start flex-1">
          <Chip size="small" variant="outlined" color="primary" label={getCodeName(COMMON_CODE.BOARD_CATEGORY, board.categoryCd)} />
          <strong className="main-text">{board.title}</strong>
        </div>
        <div className="right-area flex-col">
          <HeartButton likeCount={String(board.likeCount)} disabled />
        </div>
      </div>
      <div className="bottom w-100 align-center justify-between">
        <div className="left-area">
          <p className="user-info">{board.username}</p>
        </div>
        <div className="right-area align-center">
          <div className="view-count align-center">
            <Visibility sx={{ fontSize: 20, color: 'rgba(0,0,0,0.3)' }} />
            <p>{board.viewCount}</p>
          </div>
        </div>
      </div>
    </Paper>
  );
}
