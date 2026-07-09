import { Pagination, Paper } from '@mui/material'
import useSelectBoards from '@/hooks/web/profile/boards/useSelectBoards';
import MyInfoBoardCard from '@/components/web/profile/MyInfoBoardCard';
import useDeleteBoard from '@/hooks/web/boards/useDeleteBoard';

export default function MyProfileBoardList(){
  const {
    res, 
    page, setPage, 
    refetch,
  } = useSelectBoards();

  const { handleDelete } = useDeleteBoard(refetch);
  
  return (
    <Paper className='mypage-box flex-col flex-grow flex-1' elevation={4}>
      <div className="list-summary flex align-center justify-between">
        <strong className='title'>내 게시글</strong>
        <p>총 {res?.pagination?.totalElements}건</p>
      </div>
      <div className="board-list flex-col">
        {res?.dataList?.map((item, index) => {
          return <MyInfoBoardCard key={index} boardData={item} handleDelete={handleDelete} ></MyInfoBoardCard>
        })}
      </div>
      <Pagination count={res?.pagination?.totalPages} page={page} onChange={(_, page) => {setPage(page);}} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
    </Paper>
  )
}
