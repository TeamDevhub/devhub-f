import CustomAvatar from '@/components/_common/customMUI/CustomAvatar'
import WebPopup from '@/components/_common/popup/WebPopup'
import { Person } from '@mui/icons-material'
import { Button, Divider, List, ListItemButton, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'

type MyPageNavKey = 'home' | 'projects' | 'boards'

interface MyPageNavProps {
  selectedKey: MyPageNavKey
  onChange?: (key: MyPageNavKey) => void
}

export default function MyInfoBox({
  selectedKey,
  onChange
}: MyPageNavProps){
  // 1. 사용자 이미지 변경 팝업
  const [openProfilePopup, setOpenProfilePopup] = useState(false);
  const clickOpenProfilePopup = () => {setOpenProfilePopup(true);}

  return (
    <>
      <Paper className='myinfo-box h-fit flex-col' elevation={4}>
      <div className="profile-area flex-col align-center">
        <CustomAvatar 
          size={80}
          sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);', cursor: 'pointer' }}
          avatarIcon={<Person sx={{ fontSize: 24 }} />} 
          onClick={clickOpenProfilePopup}
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
        <ListItemButton selected={selectedKey === 'home'} onClick={() => onChange?.('home')}>내 정보 홈</ListItemButton>
        <ListItemButton selected={selectedKey === 'projects'} onClick={() => onChange?.('projects')}>내 프로젝트 관리</ListItemButton>
        <ListItemButton selected={selectedKey === 'boards'} onClick={() => onChange?.('boards')}>내 게시글 관리</ListItemButton>
      </List>
    </Paper>
    {/* popup */}
    <WebPopup
      size='medium'
      isOpen={openProfilePopup}
      onClose={() => setOpenProfilePopup(false)}
      onSubmit={()=>{}}
      title='사용자 이미지 변경'
      submitText='저장'
    >
      <div className='mypage-popup align-center gap-24'>
        <CustomAvatar 
          size={80}
          sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
          avatarIcon={<Person sx={{ fontSize: 24 }} />} 
        />
        {/* Drag and Drop 변경 필요 */}
        <TextField multiline placeholder='Link or drag and drop' /> 
      </div>
    </WebPopup>
    </>
  )
}
