import HeartButton from '@/components/_common/button/HeartButton';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import { Create, Visibility } from '@mui/icons-material'
import { Box, Button, Chip, Pagination, Paper, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'

function TabPanel({ value, index, children }: {
  value: number
  index: number
  children: React.ReactNode
}) {
  if (value !== index) return null
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className='w-100 flex flex-grow'
    >
      <div className='w-100 flex-grow'>
        <Box sx={{ height: '100%' }}>{children}</Box>
      </div>
    </div>
  )
}

export default function BoardListPage(){
  // category tabs
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='main-page flex-col h-fit' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      {/* 1. category tabs */}
      <Tabs
        value={value}
        variant='standard'
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="category-tabs"
      >
        <Tab label="전체" />
        <Tab label="카테고리1" />
        <Tab label="카테고리2" />
        <Tab label="카테고리3" />
      </Tabs>
      {/* 2. search field */}
      <Paper className='search-box align-stretch' elevation={4}>
        <CustomTextfield size='small' type='search' placeholder='제목을 입력해 주세요.' />
          <Button size='small' variant='contained'>검색</Button>
      </Paper>
      {/* 3. board summary */}
      <div className='page-summary'>
        <strong className='page-count'>전체 <em>23</em>개 게시글</strong>
      </div>
      {/* 4. board list */}
      <TabPanel value={value} index={0}>
        <div className="board-list flex-col h-100" style={{ gap: '0.8rem' }}>
          <BoardBox 
            boardTitle='안녕하세요 게시판 첫 번째 글입니다. 게시판의 제목이 너무 길어지면 말 줄임표가 자동으로 적용됩니다. 그러니 마음껏 본인의 생각을 펼쳐보세요~'
            userName='홍길동'
            registerDate='2025.02.03'
            viewCount='100+'
            replyCount='10'
          />
          <BoardBox 
            boardTitle='게시판 두 번째 글입니다.'
            userName='홍길동'
            registerDate='2025.02.03'
            viewCount='100+'
            replyCount='10'
          />
          <div className='list-bottom-box w-100 align-center mt-a'>
            <Pagination count={10} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
            <Button size='medium' variant='contained' sx={{ height: '3.6rem !important' }}>글쓰기</Button>
          </div>
        </div>
      </TabPanel>
    </div>
  )
}

/** used components **/
type BoardBoxProps = {
  boardTitle: string;
  userName: string;
  registerDate: string;
  viewCount: string;
  replyCount: string;
  likeCount?: string;
};

function BoardBox({
  boardTitle,
  userName,
  registerDate,
  viewCount,
  replyCount,
  likeCount = '0' // 임시 고정 값
}: BoardBoxProps) {
  return (
    <Paper className="board-box flex-col align-center" elevation={4}>
      <div className="top w-100 justify-between">
        <div className="left-area flex-col align-start flex-1">
          <Chip size="small" variant="outlined" color="primary" label="모집중" />
          <strong className="main-text text-ellipsis">
            {boardTitle}
          </strong>
        </div>
        <div className="right-area flex-col">
          <HeartButton likeCount={likeCount} />
        </div>
      </div>

      <div className="bottom w-100 align-center justify-between">
        <div className="left-area">
          <p className="user-info">{userName} · {registerDate}</p>
        </div>
        <div className="right-area align-center">
          <div className="view-count align-center">
            <Visibility sx={{ fontSize: 20, color: 'rgba(0,0,0,0.3)' }} />
            <p>{viewCount}</p>
          </div>
          <div className="reply-count align-center">
            <Create sx={{ fontSize: 20, color: 'rgba(0,0,0,0.3)' }} />
            <p>{replyCount}</p>
          </div>
        </div>
      </div>
    </Paper>
  );
}

