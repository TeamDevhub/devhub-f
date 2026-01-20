import CustomAvatar from '@/components/common/CustomAvatar'
import { Person } from '@mui/icons-material'
import { Button, Divider, List, ListItemButton, Paper } from '@mui/material'
import React from 'react'

export default function MyInfoBox(){
  return (
    <Paper className='myinfo-box h-fit flex-col' elevation={4}>
      <div className="profile-area flex-col align-center">
        <CustomAvatar 
          size={80}
          sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
          avatarIcon={<Person sx={{ fontSize: 24 }} />} 
        />
        <div className='flex-col align-center' style={{ padding: '0.4rem 0' }}>
          <p className='user-nickname'>닉네임</p>
          <p className='user-email'>email@gmail.com</p>
        </div>
      </div>
      <div className="manner-box flex-col">
        <div className="manner-text justify-between">
          <p className='text'>매너온도</p>
          <p className='manner-temperature'>36.5°C</p>
        </div>
        <div className="manner-figure">
          <span className='current-figure h-100'></span>
        </div>
      </div>
      <Button size='small' variant='outlined' className='mt-16'>내 정보 수정</Button>
      <Divider />
      <List component='nav' aria-label='mypage list'>
        <ListItemButton selected>내 정보 홈</ListItemButton>
        <ListItemButton>내 프로젝트 관리</ListItemButton>
        <ListItemButton>내 게시글 관리</ListItemButton>
      </List>
    </Paper>
  )
}
