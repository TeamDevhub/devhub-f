import { Create, Favorite, Search, Visibility } from '@mui/icons-material'
import { Button, Chip, IconButton, InputAdornment, Pagination, Paper, Tab, Tabs, TextField } from '@mui/material'
import React from 'react'

export default function BoardListPage(){

  // category tabs
  const [value, setValue] = React.useState('all');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className='main-page flex-col h-fit'>
      {/* 1. category tabs */}
      <Tabs
        value={value}
        variant='standard'
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="category-tabs"
      >
        <Tab value="all" label="전체" />
        <Tab value="category1" label="카테고리1" />
        <Tab value="category2" label="카테고리2" />
        <Tab value="category3" label="카테고리3" />
      </Tabs>
      {/* 2. search field */}
      <Paper className='search-box align-center' elevation={4}>
        <TextField 
          size='small' fullWidth 
          placeholder='제목을 입력해 주세요.'
          slotProps={{ input: { startAdornment: (<InputAdornment position='start'><Search sx={{ fontSize: 24 }}></Search></InputAdornment>) } }}    
        />
          <Button size='medium' variant='contained'>검색</Button>
      </Paper>
      {/* 3. board summary */}
      <div className='page-summary'>
        <strong className='page-count'>전체 <em>23</em>개 게시글</strong>
      </div>
      {/* 4. board list */}
      <div className="board-list flex-col">
        <Paper className='board-box w-100 flex-col align-center' elevation={4}>
          <div className="top w-100 justify-between">
            <div className="left-area flex-col align-start flex-1">
              <Chip size='small' variant='outlined' color='primary' label='모집중' />
              <strong className='main-text text-ellipsis'>
                요즘 다들 어떤 취미를 가지고 계신가요? 취미 없는 저에게 추천해주실 취미 부자 분들 없나요?
              </strong>
            </div>
            <div className="right-area flex-col">
              <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
              <p className='heart-count'>206</p>
            </div>
          </div>
          <div className="bottom w-100 align-center justify-between">
            <div className="left-area">
              <p className='user-info'>홍길동 . 2025.12.03</p>
            </div>
            <div className="right-area align-center">
              <div className='view-count align-center'>
                <Visibility sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>2354</p>
              </div>
              <div className="reply-count align-center">
                <Create sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>2354</p>
              </div>
            </div>
          </div>
        </Paper>
        <Paper className='board-box w-100 flex-col align-center' elevation={4}>
          <div className="top w-100 justify-between">
            <div className="left-area flex-col align-start flex-1">
              <Chip size='small' variant='outlined' color='primary' label='모집중' />
              <strong className='main-text text-ellipsis'>
                요즘 다들 어떤 취미를 가지고 계신가요? 취미 없는 저에게 추천해주실 취미 부자 분들 없나요?
              </strong>
            </div>
            <div className="right-area flex-col">
              <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
              <p className='heart-count'>206</p>
            </div>
          </div>
          <div className="bottom w-100 align-center justify-between">
            <div className="left-area">
              <p className='user-info'>홍길동 . 2025.12.03</p>
            </div>
            <div className="right-area align-center">
              <div className='view-count align-center'>
                <Visibility sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>2354</p>
              </div>
              <div className="reply-count align-center">
                <Create sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>2354</p>
              </div>
            </div>
          </div>
        </Paper>
        <Paper className='board-box w-100 flex-col align-center' elevation={4}>
          <div className="top w-100 justify-between">
            <div className="left-area flex-col align-start flex-1">
              <Chip size='small' variant='outlined' color='primary' label='모집중' />
              <strong className='main-text text-ellipsis'>
                요즘 다들 어떤 취미를 가지고 계신가요? 취미 없는 저에게 추천해주실 취미 부자 분들 없나요?
              </strong>
            </div>
            <div className="right-area flex-col">
              <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
              <p className='heart-count'>206</p>
            </div>
          </div>
          <div className="bottom w-100 align-center justify-between">
            <div className="left-area">
              <p className='user-info'>홍길동 . 2025.12.03</p>
            </div>
            <div className="right-area align-center">
              <div className='view-count align-center'>
                <Visibility sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>2354</p>
              </div>
              <div className="reply-count align-center">
                <Create sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>2354</p>
              </div>
            </div>
          </div>
        </Paper>
        <Paper className='board-box w-100 flex-col align-center' elevation={4}>
          <div className="top w-100 justify-between">
            <div className="left-area flex-col align-start flex-1">
              <Chip size='small' variant='outlined' color='primary' label='모집중' />
              <strong className='main-text text-ellipsis'>
                요즘 다들 어떤 취미를 가지고 계신가요? 취미 없는 저에게 추천해주실 취미 부자 분들 없나요?
              </strong>
            </div>
            <div className="right-area flex-col">
              <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
              <p className='heart-count'>206</p>
            </div>
          </div>
          <div className="bottom w-100 align-center justify-between">
            <div className="left-area">
              <p className='user-info'>홍길동 . 2025.12.03</p>
            </div>
            <div className="right-area align-center">
              <div className='view-count align-center'>
                <Visibility sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>2354</p>
              </div>
              <div className="reply-count align-center">
                <Create sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>2354</p>
              </div>
            </div>
          </div>
        </Paper>
        <Paper className='board-box w-100 flex-col align-center' elevation={4}>
          <div className="top w-100 justify-between">
            <div className="left-area flex-col align-start flex-1">
              <Chip size='small' variant='outlined' color='primary' label='모집중' />
              <strong className='main-text text-ellipsis'>
                요즘 다들 어떤 취미를 가지고 계신가요? 취미 없는 저에게 추천해주실 취미 부자 분들 없나요?
              </strong>
            </div>
            <div className="right-area flex-col">
              <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
              <p className='heart-count'>206</p>
            </div>
          </div>
          <div className="bottom w-100 align-center justify-between">
            <div className="left-area">
              <p className='user-info'>홍길동 . 2025.12.03</p>
            </div>
            <div className="right-area align-center">
              <div className='view-count align-center'>
                <Visibility sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>2354</p>
              </div>
              <div className="reply-count align-center">
                <Create sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>2354</p>
              </div>
            </div>
          </div>
        </Paper>
        <Paper className='board-box w-100 flex-col align-center' elevation={4}>
          <div className="top w-100 justify-between">
            <div className="left-area flex-col align-start flex-1">
              <Chip size='small' variant='outlined' color='primary' label='모집중' />
              <strong className='main-text text-ellipsis'>
                요즘 다들 어떤 취미를 가지고 계신가요? 취미 없는 저에게 추천해주실 취미 부자 분들 없나요?
              </strong>
            </div>
            <div className="right-area flex-col">
              <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
              <p className='heart-count'>206</p>
            </div>
          </div>
          <div className="bottom w-100 align-center justify-between">
            <div className="left-area">
              <p className='user-info'>홍길동 . 2025.12.03</p>
            </div>
            <div className="right-area align-center">
              <div className='view-count align-center'>
                <Visibility sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>2354</p>
              </div>
              <div className="reply-count align-center">
                <Create sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>2354</p>
              </div>
            </div>
          </div>
        </Paper>
        <div className='list-bottom-box w-100 align-center'>
          <Pagination count={10} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
          <Button size='medium' variant='contained' sx={{ height: '3.6rem !important' }}>글쓰기</Button>
        </div>
      </div>
    </div>
  )
}

