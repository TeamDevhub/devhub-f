import CustomAvatar from '@/components/CustomAvatar'
import { Create, Favorite, Person, Visibility } from '@mui/icons-material'
import { Button, Chip, Divider, IconButton, Paper, TextField } from '@mui/material'
import React from 'react'

export default function BoardDetailPage(){
  return (
    <div className='main-page'>
      <Paper className='board-detail-box flex-col' elevation={4}>
        {/* 1. board header */}
        <div className="board-header flex-col">
          <div className="top w-100 justify-between">
            <div className="left-area flex-col align-start flex-1">
              <Chip size='small' variant='outlined' color='primary' label='모집중' />
              <strong className='main-text text-ellipsis'>
                요즘 다들 어떤 취미를 가지고 계신가요? 취미 없는 저에게 추천해주실 취미 부자 분들 없나요?
              </strong>
            </div>
            <div className="right-area flex-col">
              <div className='heart-box flex-col align-end'>
                <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
                <p className='heart-count'>206</p>
              </div>
            </div>
          </div>
          <div className="bottom w-100 align-end justify-between">
            <div className="user-info align-center">
              <div className="left-area">
                <CustomAvatar 
                  sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                  avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                />
              </div>
              <div className="right-area">
                <p className='user-nickname'>닉네임</p>
                <p className='user-email'>email@gmail.com</p>
              </div>
            </div>
            <div className="board-info align-center">
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
          <Divider />
        </div>
        {/* 2. board content */}
        <div className="board-content-box flex-col">
          <div className="board-content">
            <p>게시글 내용입니다.</p>
          </div>
          <Divider flexItem />
          <Button size='small' color='warning' className='ml-a'>신고하기</Button>
          <div className="write-reply flex-col">
            <strong>댓글</strong>
            <div className="align-center">
              <TextField size='small' fullWidth placeholder='댓글을 입력하세요.' />
              <Button size='medium' variant='contained' color='primary'>글쓰기</Button>
            </div>
          </div>
        </div>
        {/* 3. board reply */}
        <div className="board-reply flex-col">
          <div className="reply-box flex-col">
            <div className="commenter-info align-center">
              <p className='commenter-id'>김수빈</p>
              <p className='comment-time'>12분전</p>
            </div>
            <div className="reply-content mt-4">
              <p>댓글 작성 내용입니다.</p>
            </div>
            <Button size='small' color='warning' className='ml-a'>신고하기</Button>
            <Divider />
          </div>
          <div className="reply-box flex-col">
            <div className="commenter-info align-center">
              <p className='commenter-id'>김수빈</p>
              <p className='comment-time'>12분전</p>
            </div>
            <div className="reply-content mt-4">
              <p>댓글 작성 내용입니다.</p>
            </div>
            <Button size='small' color='warning' className='ml-a'>신고하기</Button>
            <Divider />
          </div>
          <div className="reply-box flex-col">
            <div className="commenter-info align-center">
              <p className='commenter-id'>김수빈</p>
              <p className='comment-time'>12분전</p>
            </div>
            <div className="reply-content mt-4">
              <p>댓글 작성 내용입니다.</p>
            </div>
            <Button size='small' color='warning' className='ml-a'>신고하기</Button>
            <Divider />
          </div>
          <div className="reply-box flex-col">
            <div className="commenter-info align-center">
              <p className='commenter-id'>김수빈</p>
              <p className='comment-time'>12분전</p>
            </div>
            <div className="reply-content mt-4">
              <p>댓글 작성 내용입니다.</p>
            </div>
            <Button size='small' color='warning' className='ml-a'>신고하기</Button>
            <Divider />
          </div>
        </div>
      </Paper>
    </div>
  )
}

