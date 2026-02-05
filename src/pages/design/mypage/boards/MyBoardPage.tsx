import React from 'react'
import MyInfoBox from '@/components/design/MyInfoBox'
import { Button, Chip, Pagination, Paper } from '@mui/material'
import { Create, Favorite, Visibility } from '@mui/icons-material'

export default function MyBoardPage(){
  return (
    <div className='main-page align-stretch' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      {/* 1. left area */}
      <MyInfoBox selectedKey='boards' />
      {/* 2. right area */}
      <Paper className='mypage-box flex-col flex-grow flex-1' elevation={4}>
        {/* 2-1. list summary */}
        <div className="list-summary flex align-center justify-between">
          <strong className='title'>내 게시글</strong>
          <p>총 2건</p>
        </div>
        {/* 2-2. board list */}
        <div className="board-list flex-col">
          <div className="board-box flex">
            <div className="left-area flex-col flex-1 align-start">
              <Chip size='small' variant='outlined' color='primary' label='질문' />
              <strong className='title text-ellipsis'>내 게시글 제목란입니다. 내 게시글 제목란입니다. 내 게시글 제목란입니다. 내 게시글 제목란입니다.</strong>
              <p className="post-date">2025.12.03</p>
            </div>
            <div className="right-area flex-col align-end justify-between">
              <div className="info-box align-center">
                <div className='align-center'>
                  <Visibility sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.3)' }} />
                  <p>573</p>
                </div>
                <div className="align-center">
                  <Create sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.3)' }} />
                  <p>13</p>
                </div>
                <div className="align-center">
                  <Favorite sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.3)' }} />
                  <p>12</p>
                </div>
              </div>
              <div className="button-box align-center gap-4">
                <Button size='small' color='primary'>삭제</Button>
                <Button size='small' variant='outlined' color='primary'>수정</Button>
              </div>
            </div>
          </div>
          <div className="board-box flex">
            <div className="left-area flex-col flex-1 align-start">
              <Chip size='small' variant='outlined' color='primary' label='질문' />
              <strong className='title text-ellipsis'>내 게시글 제목란입니다.</strong>
              <p className="post-date">2025.12.03</p>
            </div>
            <div className="right-area flex-col align-end justify-between">
              <div className="info-box align-center">
                <div className='align-center'>
                  <Visibility sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.3)' }} />
                  <p>573</p>
                </div>
                <div className="align-center">
                  <Create sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.3)' }} />
                  <p>13</p>
                </div>
                <div className="align-center">
                  <Favorite sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.3)' }} />
                  <p>12</p>
                </div>
              </div>
              <div className="button-box align-center gap-4">
                <Button size='small' color='primary'>삭제</Button>
                <Button size='small' variant='outlined' color='primary'>수정</Button>
              </div>
            </div>
          </div>
          <div className="board-box flex">
            <div className="left-area flex-col flex-1 align-start">
              <Chip size='small' variant='outlined' color='primary' label='질문' />
              <strong className='title text-ellipsis'>내 게시글 제목란입니다.</strong>
              <p className="post-date">2025.12.03</p>
            </div>
            <div className="right-area flex-col align-end justify-between">
              <div className="info-box align-center">
                <div className='align-center'>
                  <Visibility sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.3)' }} />
                  <p>573</p>
                </div>
                <div className="align-center">
                  <Create sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.3)' }} />
                  <p>13</p>
                </div>
                <div className="align-center">
                  <Favorite sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.3)' }} />
                  <p>12</p>
                </div>
              </div>
              <div className="button-box align-center gap-4">
                <Button size='small' color='primary'>삭제</Button>
                <Button size='small' variant='outlined' color='primary'>수정</Button>
              </div>
            </div>
          </div>
        </div>
        <Pagination count={10} showFirstButton showLastButton color='primary' className='w-100 flex-center mt-a' />
      </Paper>
    </div>
  )
}
