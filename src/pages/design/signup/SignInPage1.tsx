import { ArrowForwardIos } from '@mui/icons-material'
import { Button, Divider, FormControl, MenuItem, Paper, Select, type SelectChangeEvent } from '@mui/material'
import logo from '@/assets/images/devHub-logo.png'
import { Link } from 'react-router-dom';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import FieldBox from '@/pages/design/signup/FieldBox';
import React, { useState } from 'react'

export default function SignInPage1(){
  // email select
  const [email, setEmail] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setEmail(event.target.value);
  };

  // FieldBox Data
  const emailVerifyItems = [
    {
      fieldValue: (
        <>
          <span className='required'>*</span>
          <CustomTextfield placeholder='이메일' />
          <p className='flex-center'>@</p>
          <FormControl fullWidth variant='outlined'>
            <Select
              fullWidth
              id='category'
              value={email}
              onChange={handleChange}
              size='medium'
              displayEmpty
              renderValue={(selected) =>
                selected === '' ? 'gmail.com' : selected
              }
            >
              <MenuItem value=''>None</MenuItem>
            </Select>
          </FormControl>
          <Button size='large' variant='contained' color='primary'>
            인증
          </Button>
        </>
      )
    },
    {
      fieldValue: (
        <>
          <span className='required'>*</span>
          <CustomTextfield placeholder='인증번호' />
        </>
      )
    }
  ];

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
          <FieldBox fieldLabel='이메일 인증' items={emailVerifyItems} />
          <Divider />
          {/* 3. next button */}
          <Button 
            size='large' variant='contained' color='primary'
            endIcon={<ArrowForwardIos />}
            className='next-button'
          >
            인증 확인
          </Button>
        </Paper>
      </div>
    </div>
  )
}
