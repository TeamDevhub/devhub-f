import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import { Button, FormControl, MenuItem, Paper, Select, type SelectChangeEvent } from '@mui/material'
import FormBox from '@/pages/design/projects/FormBox'
import React, { useState } from 'react'

export default function BoardCreatePage(){
  // category select
  const [category, setCategory] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  // FormBox Data
  const categoryItems = [
    { fieldValue: <FormControl variant='outlined' sx={{ minWidth: '27rem' }}>
      <Select 
        id='category' value={category} onChange={handleChange} size='medium' displayEmpty
        renderValue={(selected) => selected === '' ? '카테고리' : selected }
      >
        <MenuItem value=''>None</MenuItem>
      </Select>
    </FormControl> }
  ]
  const titleItems = [
    { fieldValue: <CustomTextfield placeholder='제목을 입력해 주세요.' /> }
  ]
  const contentItems = [
    { fieldValue: <CustomTextfield type='textarea' placeholder='내용을 입력해 주세요.' /> }
  ]

  return (
    <div className='main-page'>
      <Paper className='board-create-box flex-col' elevation={4}>
        {/* 1. page title */}
        <strong className="page-title">게시글 생성</strong>
        {/* 2. board create form */}
        <div className="form-wrap flex-col">
          {/* 2-1. 카테고리 */}
          <FormBox required labelText='카테고리' items={categoryItems} />
          {/* 2-2. 제목 */}
          <FormBox required labelText='제목' items={titleItems} />
          {/* 2-3. 내용 */}
          <FormBox required labelText='내용' items={contentItems} />
          <div className="action-button-box align-center justify-end">
            <Button size='large' variant='outlined'>취소</Button>
            <Button size='large' variant='contained'>등록</Button>
          </div>
        </div>
      </Paper>
    </div>
  )
}

