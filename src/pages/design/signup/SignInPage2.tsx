import { PersonOutlined } from '@mui/icons-material'
import { Button, Chip, Divider, Paper } from '@mui/material'
import logo from '@/assets/images/devHub-logo.png'
import { Link } from 'react-router-dom';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import React from 'react'

export default function SignInPage2(){
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
          {/* 2-1. 프로필 */}
          <div className="field-box flex-col">
            <div className="field-title align-center">
              <PersonOutlined sx={{ fontSize: 20, color: 'var(--primary-main)' }} />
              <p>프로필</p>
            </div>
            <div className="field-content flex-col">
              <div className="content-box align-start">
                <span className='required'>*</span>
                <div className="flex-col">
                  <CustomTextfield placeholder='닉네임' />  
                  <span className='help-text'>다른 사용자에게 표시되는 이름입니다</span>
                </div>
              </div>
              <div className="content-box align-stretch">
                <span className='required'>*</span>
                <div className="flex-col">
                  <CustomTextfield type='textarea' rows={2} placeholder='자신을 소개해 주세요.' />  
                  <span className='help-text'>간단한 자기소개를 작성해 주세요</span>
                </div>
              </div>
            </div>
          </div>
          <div className="field-box2 flex-col">
            <div className="field-title align-center">
              <p>관심 포지션</p>
            </div>
            <div className="field-content flex-col">
              <div className="content-box align-start">
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
              </div>
            </div>
          </div>
          <div className="field-box2 flex-col">
            <div className="field-title align-center">
              <p>보유 스킬</p>
            </div>
            <div className="field-content flex-col">
              <div className="content-box align-stretch">
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
              </div>
            </div>
          </div>
          <Divider />
          {/* 3. signin button */}
          <Button 
            size='large' variant='contained' color='primary'>회원가입</Button>
        </Paper>
      </div>
    </div>
  )
}
