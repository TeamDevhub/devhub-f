import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import { Remove, Search } from '@mui/icons-material';
import { Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, MenuItem, Paper, Radio, RadioGroup, Select, TextField, type SelectChangeEvent } from '@mui/material'
import FormBox from '@/pages/design/projects/FormBox'
import React, { useState } from 'react'

export default function ProjectCreatePage(){
  const [filter, setFilter] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  // FormBox Data
  const basicInfoItems = [
    { fieldValue: <>
      <CustomTextfield placeholder='제목을 입력해 주세요.' />              
      <CustomTextfield placeholder='카테고리를 입력해 주세요.' />       
    </> }
  ]
  const recruitInfoItems = [
    { fieldTitle: '모집기간', fieldValue:
      <div className="align-center">
        <CustomTextfield fullWidth placeholder='시작일을 입력해 주세요.' />              
        -
        <CustomTextfield fullWidth placeholder='종료일을 입력해 주세요.' />              
      </div>
    },
    { fieldTitle: '모집인원', addButton: true, fieldValue: <div className="w-fit align-center">
      <FormControl variant='outlined' sx={{ minWidth: '27rem' }}>
        <Select 
          id='filter' value={filter} onChange={handleChange} size='medium' displayEmpty
          renderValue={(selected) => selected === '' ? '모집인원' : selected }
        >
          <MenuItem value=''>None</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant='outlined' sx={{ minWidth: '17rem' }}>
        <Select 
          id='filter' value={filter} onChange={handleChange} size='medium' displayEmpty
          renderValue={(selected) => selected === '' ? '모집인원' : selected }
        >
          <MenuItem value=''>None</MenuItem>
        </Select>
      </FormControl>
      <CustomTextfield sx={{ width: '6rem' }} />              
      <p>명</p>
      <IconButton size='small'><Remove sx={{ fontSize: 24, color: 'text.disabled' }} /></IconButton>
    </div> },
    { fieldTitle: '기술스택', addButton: true, fieldValue: <div className="align-center">
      <Chip size='medium' variant='filled' label='JAVA' color='primary' onDelete={() => {}} />
      <Chip size='medium' variant='filled' label='SQL' color='primary' onDelete={() => {}} />
      <Chip size='medium' variant='filled' label='Docker' color='primary' onDelete={() => {}} />
    </div> }
  ]
  const projectInfoItems = [
    { fieldValue: <FormControl>
      <FormLabel id='project-info-radio-group'>진행방식</FormLabel>
      <RadioGroup row aria-labelledby='project-info-radio-group-label' defaultValue='online'>
        <FormControlLabel value='online' control={<Radio />} label='온라인' />
        <FormControlLabel value='offline' control={<Radio />} label='오프라인' />
      </RadioGroup>
    </FormControl> },
    { fieldTitle: '진행지역', fieldValue: <div className="align-stretch">
      <CustomTextfield placeholder='지역 명을 입력해 주세요.' />    
      <Button 
        size='large' 
        variant='contained' 
        color='primary' 
        startIcon={<Search sx={{ fontSize: 24 }}/>}
        sx={{ minWidth: '9.9rem !important' }}
      >
        찾기
      </Button>
    </div> },
    { fieldTitle: '진행기간', fieldValue: <div className="align-center">
      <CustomTextfield placeholder='시작일을 입력해 주세요.' />    
      -
      <CustomTextfield placeholder='종료일을 입력해 주세요.' />    
    </div> }
  ]
  const detailItems = [
    { fieldValue: <CustomTextfield type='textarea' placeholder='상세내용을 입력해 주세요.' /> }
  ]
  const attachedFileItems = [
    { fieldValue: <TextField multiline placeholder='Link or drag and drop' /> }
  ]
  const imageFileItems = [
    { fieldValue: <TextField multiline placeholder='Link or drag and drop' /> }
  ]
  const applicationFormItems = [
    { fieldValue: <div className='flex gap-32'>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label='이름' />
        <FormControlLabel control={<Checkbox />} label='나이' />
        <FormControlLabel control={<Checkbox />} label='지원동기' />
        <FormControlLabel control={<Checkbox />} label='경력' />
        <FormControlLabel control={<Checkbox />} label='경험' />
      </FormGroup>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label='첨부파일' />
        <FormControlLabel control={<Checkbox />} label='참여가능 요일' />
      </FormGroup>
    </div> }
  ]
  const additionalFormItems = [ { addButton: true } ]

  return (
    <div className='main-page'>
      <Paper className='project-create-box flex-col' elevation={4}>
        {/* 1. page title */}
        <strong className="page-title">프로젝트 생성</strong>
        {/* 2. project create form */}
        <div className="form-wrap flex-col">
          {/* 1. 모집 유형 */}
          <div className="form-box">
            <FormControl>
              <RadioGroup row aria-labelledby='recruitment-status-radio-group-label' defaultValue='general'>
                <FormControlLabel value='general' control={<Radio />} label='일반모집' />
                <FormControlLabel value='additional' control={<Radio />} label='추가모집' />
              </RadioGroup>
            </FormControl>
            <p className="help-text align-center">
              <span className='dot'></span>
              기존 모집을 참고하여 동일한 프로젝트의 인원을 추가로 모집하는 경우 추가모집을 이용해주시기 바랍니다.
            </p>
          </div>
          {/* 2. 기본 정보 */}
          <FormBox required labelText='기본 정보' items={basicInfoItems} />
          {/* 3. 모집 정보 */}
          <FormBox required labelText='모집 정보' items={recruitInfoItems} />
          <Divider />
          {/* 4. 프로젝트 정보 */}
          <FormBox required labelText='프로젝트 정보' items={projectInfoItems} />
          {/* 5. 상세 내용 */}
          <FormBox required labelText='상세 내용' items={detailItems} />
          <Divider />
          {/* 6. 첨부파일 */}
          {/* drag and drop으로 변경 필요! */}
          <FormBox required labelText='첨부파일' items={attachedFileItems} />
          {/* 7. 이미지 파일 */}
          <FormBox required labelText='이미지 파일' items={imageFileItems} />
          <Divider />
          {/* 8. 신청 양식 */}
          <FormBox 
            required 
            labelText='신청 양식' 
            items={applicationFormItems} 
            helpText='지원자가 작성해야 하는 항목을 선택하세요.<br/> 기본 양식을 선택하거나, 원하면 새로운 양식을 만들 수 있어요.(최대 3개)'
          />
          {/* 9. 추가 양식 */}
          <FormBox labelText='추가 양식' items={additionalFormItems} />
        </div>
        {/* 3. action buttons */}
        <div className="action-button-box align-center justify-end">
          <Button size='large' variant='outlined'>취소</Button>
          <Button size='large' variant='outlined'>양식 미리보기</Button>
          <Button size='large' variant='contained'>등록</Button>
        </div>
      </Paper>
    </div>
  )
}