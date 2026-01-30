import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import BoardCard from '@/components/boards/boardList/BoardCard';
import useMutationBoards from '@/hooks/boards/useMutationBoards';
import useSelecttBoards from '@/hooks/boards/useSelectBoards';
import { Button, Pagination, Paper, Tab, Tabs } from '@mui/material';


export default function BoardList(){
    const {
        res, request, 
        setPage, 
        setTab, 
        title, setTitle,
        handleSearchClick,
    } = useSelecttBoards();

    const {
        handleLike
    } = useMutationBoards();

    const categoryTab = [
        {value:"", label:'전체'},
        {value:"4001", label:'자유게시판'},
        {value:"4002", label:'질문게시판'},
        {value:"4003", label:'공지사항'},
    ]

    return (
        <div className='main-page flex-col h-fit'>
        {/* 1. category tabs */}
        <Tabs
            value={request.categoryCd}
            variant='standard'
            onChange={(e, newValue)=>setTab(newValue)}
            textColor="primary"
            indicatorColor="primary"
            aria-label="category-tabs"
        >
        {categoryTab.map((item, index)=>(
            <Tab key={index} value={item.value} label={item.label}/>
        ))}
        </Tabs>
        {/* 2. search field */}
        <Paper className='search-box align-center' elevation={4}>
            <CustomTextfield size='small' type='search' placeholder='제목을 입력해 주세요.' value={title}
                onChange={(e)=>setTitle(e.target.value)}/>
            <Button size='medium' variant='contained' onClick={handleSearchClick}>검색</Button>
        </Paper>
        {/* 3. board summary */}
        <div className='page-summary'>
            <strong className='page-count'>전체 <em>{res?.pagination?.totalElements}</em>개 게시글</strong>
        </div>
        {/* 4. board list */}
        <div className="board-list flex-col" style={{ gap: '0.8rem' }}>
            {res?.dataList?.map((item, index) => {
                return <BoardCard key={index} boardData={item} handleLike={handleLike}></BoardCard>
            })}
            <div className='list-bottom-box w-100 align-center mt-14'>
                <Pagination count={res?.pagination?.totalPages} page={request.page} onChange={(_, page) => {setPage(page);}} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
                <Button size='medium' variant='contained' sx={{ height: '3.6rem !important' }}>글쓰기</Button>
            </div>
        </div>
        </div>
    )
    }


