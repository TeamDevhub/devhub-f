import { useLocation } from 'react-router-dom'
import useSelectBoardDetail from '@/hooks/web/boards/useSelectBoardDetail';
import BoardUpdateForm from '@/components/web/boards/boardUpdate/BoardUpdateForm'
export default function BoardUpdate() {

  const {state} = useLocation();
  const { res, loading, error } = useSelectBoardDetail(state?.boardGuid);

  if (loading) return null;
  if (error || !res?.data) return null;

    return <BoardUpdateForm boardData={res.data} />;

}

