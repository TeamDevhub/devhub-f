import { useLocation } from 'react-router-dom'
import useSelectBoardDetail from '@/hooks/boards/useSelectBoardDetail';
import BoardUpdateForm from '@/components/boards/boardUpdate/BoardUpdateForm'
export default function BoardUpdate() {

  const {state} = useLocation();
  const { res, loading, error } = useSelectBoardDetail(state?.boardGuid);

  if (loading) return null;
  if (error || !res?.data) return null;

    return <BoardUpdateForm boardData={res.data} />;

}

