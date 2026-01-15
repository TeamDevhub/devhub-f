import { Button, Divider, IconButton, InputAdornment, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '@/assets/images/devHub-logo.png'
import { GitHub,  Visibility, VisibilityOff } from '@mui/icons-material';
import googleIcon from '@/assets/images/google-icon.svg'
import CustomTextfield from '@/components/common/CustomTextfield';

export default function LoginPage(){
  // password textfield
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className='auth-page flex-center'>
      <Paper className='auth-box flex-col' elevation={4}>
        <div className="logo-box">
          <Link to={"/"} className='align-center'>
            <img
              src={logo}
              alt="devHub logo icon"
              className="logo-icon"
            />
            <span className="logo-text">DevHub</span>   
          </Link>
        </div>
        <div className="input-box flex-col">
          <CustomTextfield placeholder='아이디' />
          <CustomTextfield type='password' placeholder='비밀번호' />
        </div>
        <div className="button-box flex-col">
          <Button size='large' variant='contained' color='primary'>로그인</Button>
          <div className="w-100 align-center" style={{ gap: '1rem' }}>
            <Button size='small' color='primary' className='flex-1'>비밀번호 찾기</Button>
            <Button size='small' color='primary' className='flex-1'>회원가입</Button>
          </div>
        </div>
        <Divider />
        <div className="button-box flex-col">
          <Paper elevation={1}>
            <Button fullWidth size='medium' variant='outlined' color='primary'>
              <img src={googleIcon} 
                alt='google icon'
                className='button-icon'
              />
              Google로 로그인
            </Button>
          </Paper>
          <Paper elevation={1}>
            <Button fullWidth size='medium' variant='outlined' color='primary' startIcon={<GitHub sx={{ fontSize: '2rem' }} />} sx={{ color: 'text.primary', borderColor: 'text.primary' }}>
              Github로 로그인
            </Button>
          </Paper>
        </div>
      </Paper>
    </div>
  )
}
