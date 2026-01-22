import React from 'react';
import { Button, Paper, Divider, Chip } from '@mui/material';
import { LockOutline, PersonOutlined } from '@mui/icons-material';
import CustomTextfield from '@/components/common/CustomTextfield';

interface Props {
  onBack: () => void;
}

export default function UserInfoPage({ onBack }: Props) {
  return (
    <Paper className='auth-box flex-col' elevation={4} style={{ padding: '1rem', gap: '1rem' }}>
      {/* 비밀번호 설정 */}
      <div className="field-box flex-col">
        <div className="field-title align-center">
          <LockOutline />
          <p>비밀번호 설정</p>
        </div>
        <div className="field-content flex-col" style={{ gap: '0.5rem' }}>
          <CustomTextfield type='password' placeholder='특수문자, 숫자 포함 10자 이상' />
          <CustomTextfield type='password' placeholder='비밀번호 확인' />
        </div>
      </div>

      {/* 프로필 */}
      <div className="field-box flex-col">
        <div className="field-title align-center">
          <PersonOutlined />
          <p>프로필</p>
        </div>
        <div className="field-content flex-col" style={{ gap: '0.5rem' }}>
          <CustomTextfield placeholder='닉네임' />
          <CustomTextfield type='textarea' rows={2} placeholder='자신을 소개해 주세요.' />
        </div>
      </div>

      {/* 관심 포지션 */}
      <div className="field-box2 flex-col">
        <div className="field-title align-center"><p>관심 포지션</p></div>
        <div className="chip-box w-100 align-center flex-wrap">
          <Chip label='Backend' clickable />
          <Chip label='Frontend' clickable />
          <Chip label='Fullstack' clickable color='primary' />
        </div>
      </div>

      {/* 보유 스킬 */}
      <div className="field-box2 flex-col">
        <div className="field-title align-center"><p>보유 스킬</p></div>
        <div className="chip-box w-100 align-center flex-wrap">
          <Chip label='JAVA' color='primary' onDelete={() => {}} />
          <Chip label='React' color='primary' onDelete={() => {}} />
        </div>
        <Button variant='contained' color='primary'>+</Button>
      </div>

      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='outlined' onClick={onBack}>이전</Button>
        <Button variant='contained' color='primary'>회원가입</Button>
      </div>
    </Paper>
  )
}