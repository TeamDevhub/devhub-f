import { Button, Chip, Divider, Paper } from '@mui/material'
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield'
import WebPopup from '@/components/_common/popup/WebPopup'
import MyInfoBox from '@/components/_design/MyInfoBox'
import FormField2 from '@/components/_design/FormField2'
import FieldGroup2 from '@/components/_design/FieldGroup2'
import React, { useState } from 'react'

export default function MyHomeModifyPage(){
  // 비밀번호 변경 팝업
  const [openPasswordPopup, setOpenPasswordPopup] = useState(false);
  const clickOpenPasswordPopup = () => {
    setStep(1);
    setOpenPasswordPopup(true);
  }
  const [step, setStep] = useState(1);

  return (
    <div className='main-page align-stretch' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      {/* 1. left area */}
      <MyInfoBox selectedKey='home' />
      {/* 2. right area */}
      <Paper className='mypage-box flex-col flex-grow' elevation={4}>
        {/* 2-1. 이메일 */}
        <FormField2 label='이메일'>
          <FieldGroup2 style={{ padding: '0.8rem 0 0.8rem 1.6rem' }}>email@gmail.com</FieldGroup2>
        </FormField2>
        {/* 2-2. 비밀번호 */}
        <FormField2 label='비밀번호'>
          <FieldGroup2>
            <Button size='small' variant='outlined' color='primary' onClick={clickOpenPasswordPopup}>비밀번호 변경</Button>
          </FieldGroup2>
        </FormField2>
        {/* 2-3. 프로필 */}
        <FormField2 label='프로필'>
          <FieldGroup2>
            <span className='required'>*</span>
            <div className="flex-col">
              <CustomTextfield placeholder='닉네임' />  
              <span className='help-text'>다른 사용자에게 표시되는 이름입니다</span>
            </div>
          </FieldGroup2>
          <FieldGroup2>
            <div className="flex-col">
              <CustomTextfield type='textarea' rows={1} noCountStr placeholder='자신을 소개해 주세요.' />  
              <span className='help-text'>간단한 자기소개를 작성해 주세요</span>
            </div>
          </FieldGroup2>
        </FormField2>
        {/* 2-4. 관심 포지션 */}
        <FormField2 type={2} label='관심 포지션'>
          <FieldGroup2>
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
          </FieldGroup2>
        </FormField2>
        {/* 2-5. 보유 스킬 */}
        <FormField2 type={2} label='보유 스킬'>
          <FieldGroup2>
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
          </FieldGroup2>
        </FormField2>
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
        onClose={() => setOpenPasswordPopup(false)}
        title='비밀번호 변경'
        submitText={step === 1 ? '확인' : '저장'}
        closeOnSubmit={step !== 1}
        onSubmit={() => {
          if (step === 1) { setStep(2); }
        }}
      >
        { step == 1 &&
          <div className='mypage-popup'>
            <PopupFieldBox label='현재 비밀번호 재입력'>
              <PopupFieldGroup>
                <CustomTextfield type='password' placeholder='특수문자, 숫자 포함 10자 이상' />
              </PopupFieldGroup>
            </PopupFieldBox>
          </div>
        }
        { step == 2 &&
          <div className='mypage-popup'>
            <PopupFieldBox label='새 비밀번호'>
              <PopupFieldGroup>
                <span className='required'>*</span>
                <CustomTextfield type='password' placeholder='특수문자, 숫자 포함 10자 이상' />  
              </PopupFieldGroup>
              <PopupFieldGroup>
                <span className='required'>*</span>
                <CustomTextfield type='password' placeholder='비밀번호 확인' />  
              </PopupFieldGroup>
            </PopupFieldBox>
          </div>
        }
      </WebPopup>
    </div>
  )
}

/* used components */
// 1. PopupFieldBox
type PopupFieldBoxProps = {
  label?: string;
  children?: React.ReactNode;
}

function PopupFieldBox ({
  label,
  children
}: PopupFieldBoxProps){
  return (
    <div className="field-box flex-col">
      <p className="label flex-col gap-8">{label}</p>
      {children}
    </div>
  )
}

// 2. PopupFieldGroup
type PopupFieldGroupProps = {
  children?: React.ReactNode;
}

function PopupFieldGroup ({children}: PopupFieldGroupProps){
  return (
    <div className="field flex-col gap-8">
      <div className="align-start gap-8">
        {children}
      </div>
    </div>
  )
}

