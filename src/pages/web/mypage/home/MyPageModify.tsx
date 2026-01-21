import { Button, Chip, Divider, Paper } from '@mui/material'
import { LockOutline, MailOutline, PersonOutlined } from '@mui/icons-material'
import CustomTextfield from '@/components/common/CustomTextfield'
import WebPopup from '@/components/popup/WebPopup'
import MyInfoBox from '@/pages/web/mypage/home/MyInfoBox'
import React, { useState } from 'react'

export default function MyPageModify(){
  // 비밀번호 변경 팝업
  const [openPasswordPopup, setOpenPasswordPopup] = useState(false);
  const clickOpenPasswordPopup = () => {
    setStep(1);
    setOpenPasswordPopup(true);
  }
  const [step, setStep] = useState(1);

  return (
    <div className='main-page flex align-stretch' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      {/* 1. left area */}
      <MyInfoBox selectedKey='home' />
      {/* 2. right area */}
      <Paper className='mypage-box flex-col flex-grow' elevation={4}>
        {/* 2-1. 이메일 */}
        <div className="field-box flex-col">
          <div className="field-title align-center">
            <MailOutline sx={{ fontSize: 20, color: 'var(--primary-main)' }} />
            <p>이메일</p>
          </div>
          <div className="field-content flex-col">
            <div className="content-box align-stretch">
              <p>email@gmail.com</p>
            </div>
          </div>
        </div>
        {/* 2-2. 비밀번호 */}
        <div className="field-box flex-col">
          <div className="field-title align-center">
            <LockOutline sx={{ fontSize: 20, color: 'var(--primary-main)' }} />
            <p>비밀번호</p>
          </div>
          <div className="field-content flex-col">
            <div className="content-box align-stretch">
              <Button size='small' variant='outlined' color='primary' onClick={clickOpenPasswordPopup}>비밀번호 변경</Button>
            </div>
          </div>
        </div>
        {/* 2-3. 프로필 */}
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
              <div className="flex-col">
                <CustomTextfield type='textarea' rows={1} noCountStr placeholder='자신을 소개해 주세요.' />  
                <span className='help-text'>간단한 자기소개를 작성해 주세요</span>
              </div>
            </div>
          </div>
        </div>
        {/* 2-4. 관심 포지션 */}
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
        {/* 2-5. 보유 스킬 */}
        <div className="field-box2 flex-col">
          <div className="field-title align-center">
            <p>보유 스킬</p>
          </div>
          <div className="field-content flex-col">
            <div className="content-box align-stretch">
              <div className="align-start w-100" style={{ gap: '0.8rem' }}>
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
        <div className="button-box w-100 align-center gap-12">
          <Button size='medium' variant='outlined' className='flex-1'>취소</Button>
          <Button size='medium' variant='contained' className='flex-1'>저장</Button>
        </div>
      </Paper>
      {/* 3. popup */}
      {/* 3-1. 비밀번호 변경(2개) */}
      <WebPopup
        isOpen={openPasswordPopup}
        setOpen={setOpenPasswordPopup}
        title='비밀번호 변경'
        submitText={step === 1 ? '확인' : '저장'}
        closeOnSubmit={step !== 1}
        onSubmit={() => {
          if (step === 1) {
            setStep(2);
          }
        }}
      >
        { step == 1 &&
          <div className='mypage-popup'>
            <div className="field-box flex-col">
              <p className="label">현재 비밀번호 재입력</p>
              <div className="field">
                <CustomTextfield type='password' placeholder='특수문자, 숫자 포함 10자 이상' />
              </div>
            </div>
          </div>
        }
        { step == 2 &&
          <div className='mypage-popup'>
            <div className="field-box flex-col">
              <p className="label flex-col gap-8">새 비밀번호</p>
              <div className="field flex-col gap-8">
                <div className="align-start gap-8">
                  <span className='required'>*</span>
                  <CustomTextfield type='password' placeholder='특수문자, 숫자 포함 10자 이상' />  
                </div>
                <div className="align-start gap-8">
                  <span className='required'>*</span>
                  <CustomTextfield type='password' placeholder='비밀번호 확인' />  
                </div>
              </div>
            </div>
          </div>
        }
      </WebPopup>
    </div>
  )
}

