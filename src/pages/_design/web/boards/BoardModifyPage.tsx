import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import { Button, FormControl, MenuItem, Paper, Select, type SelectChangeEvent } from '@mui/material'
import FormField from '@/components/design/FormField';
import FieldGroup from '@/components/design/FieldGroup';
import { useState } from 'react'

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
          {/* 2-1. 카테고리 */}
          <FormField required label='카테고리'>
            <FieldGroup>
              <FormControl variant='outlined' sx={{ minWidth: '27rem' }}>
                <Select 
                  id='category' value={category} onChange={handleChange} size='medium' displayEmpty
                  renderValue={(selected) => selected === '' ? '카테고리' : selected }
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                >
                  <MenuItem value=''>None</MenuItem>
                </Select>
              </FormControl>
            </FieldGroup>
          </FormField>
          {/* 2-2. 제목 */}
          <FormField required label='제목'>
            <CustomTextfield placeholder='제목을 입력해 주세요.' />
          </FormField>
          {/* 2-3. 내용 */}
          <FormField required label='내용'>
            <FieldGroup>
              <CustomTextfield type='textarea' placeholder='내용을 입력해 주세요.' />
            </FieldGroup>
          </FormField>
          <div className="action-button-box align-center justify-end">
            <Button size='large' variant='outlined'>취소</Button>
            <Button size='large' variant='contained'>수정</Button>
          </div>
        </div>
      </Paper>
    </div>
  )
}

