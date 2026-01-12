import { Button, FormControl, MenuItem, Paper, Select, TextField, type SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'

export default function BoardModifyPage(){
  // category select
  const [category, setCategory] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <div className='main-page'>
      <Paper className='board-modify-box flex-col' elevation={4}>
        {/* 1. page title */}
        <strong className="page-title">게시글 수정</strong>
        {/* 2. board modify form */}
        <div className="form-wrap flex-col">
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <span className='required'>*</span>
              <p className='label-text'>카테고리</p>
            </div>
            <div className="field-area flex-col flex-1" style={{ gap: '1.2rem' }}>
              <FormControl variant='outlined' sx={{ minWidth: '27rem' }}>
                <Select 
                  id='category' value={category} onChange={handleChange} size='medium' displayEmpty
                  renderValue={(selected) => selected === '' ? '카테고리' : selected }
                >
                  <MenuItem value=''>None</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <span className='required'>*</span>
              <p className='label-text'>제목</p>
            </div>
            <div className="field-area flex-col flex-1" style={{ gap: '1.2rem' }}>
              <TextField size='medium' fullWidth placeholder='제목을 입력해 주세요.' />
            </div>
          </div>
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <span className='required'>*</span>
              <p className='label-text'>내용</p>
            </div>
            <div className="field-area flex-1">
              <div className="field-box">
                <TextField multiline placeholder='내용을 입력해 주세요.' />
                <div className="count-str">
                  <p>0/100</p>
                </div>
              </div>
            </div>
          </div>
          <div className="action-button-box align-center justify-end">
            <Button size='large' variant='outlined'>취소</Button>
            <Button size='large' variant='contained'>수정</Button>
          </div>
        </div>
      </Paper>
    </div>
  )
}

