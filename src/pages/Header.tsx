import { Notifications, Person } from '@mui/icons-material'
import { Avatar, Badge, Button, Paper } from '@mui/material'
import React from 'react'
import CustomAvatar from '../components/CustomAvatar'

export default function Header(){
  return (
    <header>
      <Paper className='header w-100 flex-middle flex-between' elevation={1}>
        <div className="header-left-box flex-middle">
          <h1 className="logo-box">
            <a href="/" className='flex-middle'>
              <img
                src="/images/devHub-logo.png"
                alt="devHub logo icon"
                className="logo-icon"
              />
              <span className="logo-text">DevHub</span>
            </a>
          </h1>
          <nav className='menu-box'>
            <Button size='large' variant='text'>PROJECT</Button>
            <Button size='large' variant='text'>BOARD</Button>
            <Button size='large' variant='text'>SKILL TRENDS</Button>
          </nav>
        </div>
        <div className="header-right-box flex-middle">
          <CustomAvatar useBadge avatarIcon={<Notifications sx={{ fontSize: 35, color: 'var(--primary-main)' }} />} />
          <CustomAvatar bgColor='var(--avatar-fill)' avatarIcon={<Person sx={{ fontSize: 24 }} />} />
        </div> 
      </Paper>
    </header>
  )
}
