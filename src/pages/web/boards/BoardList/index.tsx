import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import BoardCard from '@/components/boards/boardList/BoardCard';
import useMutationBoards from '@/hooks/boards/useMutationBoards';
import useSelecttBoards from '@/hooks/boards/useSelectBoards';
import {Button, Pagination, Paper, Tab, Tabs} from '@mui/material';
import {useCodes} from "@/contexts/CommonCodeContext.ts";
import {COMMON_CODE} from "@/types/const.ts";
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function BoardList(){
    const { isLoggedIn } = useAuth();
    const {
        res, request, 
        setPage, 
        setTab, 
        title, setTitle,
        handleSearchClick,
        handleDetail
    } = useSelecttBoards();

    const { handleLike } = useMutationBoards();
    const { getCodesByGroup } = useCodes();
    const categoryCode = getCodesByGroup(COMMON_CODE.BOARD_CATEGORY);
    const boardCategoryCode = [{code:'', name:'전체'}, ...categoryCode];

    return (
        <div className='main-page flex-col h-fit'>
        {/* 1. category tabs */}
        <Tabs
            value={request.categoryCd}
            variant='standard'
            onChange={(_, newValue)=>setTab(newValue)}
            textColor="primary"
            indicatorColor="primary"
            aria-label="category-tabs"
        >
        {boardCategoryCode.map((item, index)=>(
            <Tab key={index} value={item.code} label={item.name}/>
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
                return <BoardCard key={index} boardData={item} handleLike={handleLike} handleDetail={()=>handleDetail(item.boardBasicResponseDto.boardGuid)} isLoggedIn={isLoggedIn ?? false}></BoardCard>
            })}
            <div className='list-bottom-box w-100 align-center mt-14'>
                <Pagination count={res?.pagination?.totalPages} page={request.page} onChange={(_, page) => {setPage(page);}} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
                <Link to={'/boards/create'} className="flex-1 flex-center">
                    <Button size='medium' variant='contained' sx={{ height: '3.6rem !important' }}>글쓰기</Button>
                </Link>
            </div>
        </div>
        </div>
    )
    }


