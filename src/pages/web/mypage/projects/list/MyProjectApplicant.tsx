import React from 'react'
import MyInfoBox from '@/pages/web/mypage/home/MyInfoBox'
import { Paper } from '@mui/material'

export default function MyProjectApplicant(){
  return (
    <div className='main-page align-stretch' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      {/* 1. left area */}
      <MyInfoBox selectedKey='projects' />
      {/* 2. right area */}
      <Paper className='mypage-box flex-col flex-grow' elevation={4}></Paper>
    </div>
  )
}

