import { ArrowForwardIos, LockOutline, MailOutline, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Divider, FormControl, IconButton, InputAdornment, MenuItem, Paper, Select, TextField, type SelectChangeEvent } from '@mui/material'
import logo from '@/assets/images/devHub-logo.png'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function SignInPage1(){
  // email select
  const [email, setEmail] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setEmail(event.target.value);
  };

  // password textfield
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className='auth-page flex-center'>
      <div className="flex-col" style={{ gap: '0.8rem' }}>
        <div className="auth-logo-box">
          <Link to={"/"} className='align-center'>
            <img
              src={logo}
              alt="devHub logo icon"
              className="logo-icon"
            />
            <span className="logo-text">DevHub</span>   
          </Link>
        </div>
        <Paper className='auth-box flex-col' elevation={4}>
          {/* 1. page title */}
          <div className="text-box flex-col">
            <strong>계정 만들기</strong>
            <p>DevHub에서 함께 성장할 준비 되셨나요?</p>
          </div>
          <Divider />
          {/* 2. field area */}
          {/* 2-1. 이메일 인증 */}
          <div className="field-box flex-col">
            <div className="field-title align-center">
              <MailOutline sx={{ fontSize: 20, color: 'var(--primary-main)' }} />
              <p>이메일 인증</p>
            </div>
            <div className="field-content flex-col">
              <div className="content-box align-stretch">
                <span className='required'>*</span>
                <TextField size='medium' placeholder='이메일' />
                <p className='flex-center'>@</p>
                <FormControl fullWidth variant='outlined'>
                  <Select 
                    fullWidth
                    id='category' value={email} onChange={handleChange} size='medium' displayEmpty
                    renderValue={(selected) => selected === '' ? 'gmail.com' : selected }
                  >
                    <MenuItem value=''>None</MenuItem>
                  </Select>
                </FormControl>
                <Button size='large' variant='contained' color='primary'>인증</Button>
              </div>
              <div className="content-box align-stretch">
                <span className='required'>*</span>
                <TextField size='medium' placeholder='인증번호' />
              </div>
            </div>
          </div>
          {/* 2-2. 비밀번호 설정 */}
          <div className="field-box flex-col">
            <div className="field-title align-center">
              <LockOutline sx={{ fontSize: 20, color: 'var(--primary-main)' }} />
              <p>비밀번호 설정</p>
            </div>
            <div className="field-content flex-col">
              <div className="content-box align-stretch">
                <span className='required'>*</span>
                <TextField 
                  size='medium' 
                  placeholder='특수문자, 숫자 포함 10자 이상' 
                  slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          size='large'
                          onClick={handleClickShowPassword}
                          aria-label="toggle password visibility"
                          sx={{ '& svg': { fontSize: 24 } }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}  
                />
              </div>
              <div className="content-box align-stretch">
                <span className='required'>*</span>
                <TextField 
                  size='medium' 
                  placeholder='비밀번호 확인' 
                  slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          size='large'
                          onClick={handleClickShowPassword}
                          aria-label="toggle password visibility"
                          sx={{ '& svg': { fontSize: 24 } }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}  
                />
              </div>
            </div>
          </div>
          <Divider />
          {/* 3. next button */}
          <Button 
            size='large' variant='contained' color='primary'
            endIcon={<ArrowForwardIos />}
          >
            다음
          </Button>
        </Paper>
      </div>
    </div>
  )
}
