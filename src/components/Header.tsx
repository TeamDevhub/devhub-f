import React from 'react'
import { Notifications, Person } from '@mui/icons-material'
import { Avatar, Badge, Button, Paper } from '@mui/material'
import CustomAvatar from '@/components/CustomAvatar'
import logo from '@/assets/images/devHub-logo.png'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header>
      <Paper className='header w-100 align-center justify-between' elevation={1}>
        <div className="header-left-box align-center">
          <h1 className="logo-box">
            <Link to={"/"} className='align-center'>
              <img
                src={logo}
                alt="devHub logo icon"
                className="logo-icon"
              />
              <span className="logo-text">DevHub</span>
            </Link>
          </h1>
          <nav className='menu-box'>
            <Link to={"/projects"}>
              <Button size='large' variant='text'>PROJECT</Button>
            </Link>
            <Button size='large' variant='text'>BOARD</Button>
            <Button size='large' variant='text'>SKILL TRENDS</Button>
          </nav>
        </div>
        <div className="header-right-box align-center">
          <CustomAvatar useBadge avatarIcon={<Notifications sx={{ fontSize: 35, color: 'primary.main' }} />} />
          <CustomAvatar bgColor='text.disabled' avatarIcon={<Person sx={{ fontSize: 24 }} />} />
        </div> 
      </Paper>
    </header>
  )
}
