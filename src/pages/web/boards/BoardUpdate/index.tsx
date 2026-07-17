import { useParams } from 'react-router-dom'
import useSelectBoardDetail from '@/hooks/web/boards/useSelectBoardDetail';
import BoardUpdateForm from '@/components/web/boards/BoardUpdateForm'
import Loading from '@/components/_common/layout/Loading';
import NotFoundPage from '@/pages/error/NotFoundPage';

export default function BoardUpdate() {

  const { boardGuid } = useParams<{ boardGuid: string }>();
  const { res, error } = useSelectBoardDetail(boardGuid);

  if (!boardGuid) return <NotFoundPage />;
  if (!res && !error) return <Loading />;
  if (error || !res?.data) return <NotFoundPage />;

  return <BoardUpdateForm boardData={res.data} />;

}

