import React, { useState } from 'react'
import CustomTextfield from '@/components/common/CustomTextfield';
import { Button, Pagination, Paper, Tab, Tabs} from '@mui/material'
import { useSelectBoards } from '@/api/boards/boards.json.hook';
import BoardCard from './BoardCard';
import type { BoardSearchRequest } from '@/api/boards/boards.type';


export default function BoardListPage(){
    const initData : BoardSearchRequest = {
        page : 1,
        categoryCd: '',
        title: ''
    }
    // api (개발)
    const [formData, setFormData] = useState<BoardSearchRequest>(initData);
    const [searchData, setSearchData] = useState<BoardSearchRequest>(initData);
    const {res} = useSelectBoards(searchData);

    const handleSearchData = (value:string) => {
        setFormData(prev => ({
            ...prev,
            title : value
        }))
    };

    const handleSearchClick = () => {
        setSearchData({
            ...formData,
            page : 1
        })
    }

    // category tabs
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setSearchData({
            ...initData,
            categoryCd : newValue,
        })
        setFormData({
            ...initData,
            categoryCd : newValue,
        })
    };

    return (
        <div className='main-page flex-col h-fit'>
        {/* 1. category tabs */}
        <Tabs
            value={formData.categoryCd}
            variant='standard'
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="category-tabs"
        >
            <Tab value="" label="전체" />
            <Tab value="4001" label="자유게시판" />
            <Tab value="4002" label="질문게시판" />
            <Tab value="4003" label="공지사항" />
        </Tabs>
        {/* 2. search field */}
        <Paper className='search-box align-center' elevation={4}>
            <CustomTextfield size='small' type='search' placeholder='제목을 입력해 주세요.' value={formData.title}
                onChange={(e) => handleSearchData(e.target.value)}/>
            <Button size='medium' variant='contained' onClick={handleSearchClick}>검색</Button>
        </Paper>
        {/* 3. board summary */}
        <div className='page-summary'>
            <strong className='page-count'>전체 <em>{res?.pagination?.totalElements}</em>개 게시글</strong>
        </div>
        {/* 4. board list */}
        <div className="board-list flex-col" style={{ gap: '0.8rem' }}>
            {res?.dataList?.map((item, index) => {
                return <BoardCard {...item} key={index}></BoardCard>
            })}
            <div className='list-bottom-box w-100 align-center mt-14'>
            <Pagination count={res?.pagination?.totalPages} page={searchData.page} onChange={(_, page) => {setSearchData(prev => ({...prev, page}));}} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
            <Button size='medium' variant='contained' sx={{ height: '3.6rem !important' }}>글쓰기</Button>
            </div>
        </div>
        </div>
    )
    }


