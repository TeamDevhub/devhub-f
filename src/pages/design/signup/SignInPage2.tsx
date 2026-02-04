import { LockOutline, PersonOutlined } from '@mui/icons-material'
import { Button, Chip, Divider, Paper } from '@mui/material'
import logo from '@/assets/images/devHub-logo.png'
import { Link } from 'react-router-dom';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import FieldBox from '@/pages/design/signup/FieldBox';
import React from 'react'

export default function SignInPage2(){
  // FieldBox Data
  const setPasswordItems = [
    { fieldValue: (
      <>
        <span className='required'>*</span>
        <CustomTextfield type='password' placeholder='특수문자, 숫자 포함 10자 이상' />  
      </>
    ) },
    { fieldValue: (
      <>
        <span className='required'>*</span>
        <CustomTextfield type='password' placeholder='비밀번호 확인' />   
      </>
    ) }
  ]
  const profileItems = [
    { fieldValue: (
      <>
        <span className='required'>*</span>
        <div className="flex-col">
          <CustomTextfield placeholder='닉네임' />  
          <span className='help-text'>다른 사용자에게 표시되는 이름입니다</span>
        </div>
      </>
    ) },
    { fieldValue: (
      <>
        <span className='required'>*</span>
        <div className="flex-col">
          <CustomTextfield type='textarea' noCountStr rows={2} placeholder='자신을 소개해 주세요.' />  
          <span className='help-text'>간단한 자기소개를 작성해 주세요</span>
        </div>
      </>
    ) }
  ]
  const interestPositionItems = [
    { fieldValue: <>
      <span className='required'>*</span>
      <div className="chip-box w-100 align-center flex-wrap">
        <Chip size='medium' color='default' label='Backend' clickable />
        <Chip size='medium' color='default' label='Frontend' clickable />
        <Chip size='medium' color='primary' label='Fullstack' clickable />
        <Chip size='medium' color='default' label='Mobile' clickable />
        <Chip size='medium' color='primary' label='DevOps Engineer' clickable />
        <Chip size='medium' color='default' label='Cloud Engineer' clickable />
        <Chip size='medium' color='primary' label='SRE' clickable />
        <Chip size='medium' color='default' label='UI/UX Designer' clickable />
        <Chip size='medium' color='primary' label='PM(Project/Product Manager)' clickable />
      </div>
    </> }
  ]
  const skillItems = [
    { fieldValue: <>
      <div className="align-start" style={{ gap: '0.8rem' }}>
        <span className='required'>*</span>
        <div className="chip-box w-100 align-center flex-wrap">
          <Chip size='medium' color='primary' label='JAVA' onDelete={() => {}} />
          <Chip size='medium' color='primary' label='React' onDelete={() => {}} />
          <Chip size='medium' color='primary' label='GO' onDelete={() => {}} />
          <Chip size='medium' color='primary' label='SQL' onDelete={() => {}} />
          <Chip size='medium' color='primary' label='Docker' onDelete={() => {}} />
          <Chip size='medium' color='primary' label='git' onDelete={() => {}} />
        </div>
      </div>
      <Button size='large' variant='contained' color='primary'>+</Button>
    </> }
  ]

  return (
    <div className='auth-page flex-center' style={{ padding: '9rem 0' }}>
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
          {/* 2-1. 비밀번호 설정 */}
          <FieldBox fieldLabel='비밀번호 설정' items={setPasswordItems} />
          {/* 2-2. 프로필 */}
          <FieldBox fieldLabel='프로필' items={profileItems} />
          {/* 2-3. 관심 포지션 */}
          <FieldBox type={2} fieldLabel='관심 포지션' items={interestPositionItems} />
          {/* 2-4. 보유 스킬 */}
          <FieldBox type={2} fieldLabel='보유 스킬' items={skillItems} />
          <Divider />
          {/* 3. signin button */}
          <Button size='large' variant='contained' color='primary'>회원가입</Button>
        </Paper>
      </div>
    </div>
  )
}
