import { Notifications, Person } from '@mui/icons-material'
import { Avatar, Badge, Button, Paper } from '@mui/material'
import React from 'react'

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
                <Badge variant="dot" color="error" sx={{ '& .MuiBadge-dot': { width: 8, height: 8 }}} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} >
                    <Avatar sx={{ width: 40, height: 40, bgcolor: 'transparent' }}>
                        <Notifications sx={{ fontSize: 35, color: '#2196F3' }} />
                    </Avatar>
                </Badge>
                <Avatar sx={{ width: 40, height: 40 }}>
                    <Person sx={{ fontSize: 24 }}></Person>
                </Avatar>
            </div> 
        </Paper>
    </header>
  )
}
