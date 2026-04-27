import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import WebPopup from '@/components/_common/popup/WebPopup';
import FieldGroup from '@/components/_design/FieldGroup';
import FormField from '@/components/_design/FormField';
import LeftMenuBar from '@/components/_design/LeftMenuBar'
import { Clear } from '@mui/icons-material';
import { Button, Chip, Divider, FormControl, FormControlLabel, IconButton, MenuItem, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, type SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'

export default function FormManagementPage(){
  // 코드 명 select
  const [codeName, setCodeName] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setCodeName(event.target.value);
  };

  // 타입 select
  const [type, setType] = useState('');
  const handleChange2 = (event: SelectChangeEvent) => {
    setCodeName(event.target.value);
  };

  // table data
  function createData(
    classify: number,
    fieldName: string,
    type: string,
    usedYn: string,
    defaultFieldYn: string
  ) {
    return { classify, fieldName, type, usedYn, defaultFieldYn };
  }

  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const rows = [
    createData(1, '이름', 'Textfield', '사용', '미해당' ),
    createData(2, '이메일', 'Textfield', '사용', '해당' ),
    createData(3, '전화번호', 'Textfield', '미사용', '해당' ),
    createData(4, '포트폴리오', 'File', '사용', '해당' ),
    createData(5, '자기소개', 'Textfield', '미사용', '미해당' ),
    createData(6, '희망 포지션', 'Select', '미사용', '미해당' ),
    createData(7, '보유 기술', 'Select', '사용', '해당' ),
    createData(8, '거주지', 'Select', '사용', '해당' ),
    createData(9, '성별', 'Checkbox', '사용', '해당' ),
    createData(10, '사용 기술', 'Multiple Select', '미사용', '미해당' ),
    createData(11, '사용 기술', 'Multiple Select', '미사용', '해당' ),
    createData(12, '사용 기술', 'Multiple Select', '사용', '미해당' ),
    createData(13, '사용 기술', 'Multiple Select', '사용', '해당' ),
    createData(14, '사용 기술', 'Multiple Select', '미사용', '해당' ),
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case '사용':
        return 'primary';
      case '미사용':
        return 'error';
      default:
        return 'primary';
    }
  }; 

  // 양식 추가 생성 팝업
  const [openFormsCreatePopup, setOpenFormsCreatePopup] = useState(false);
  const clickOpenFormsCreatePopup = () => { setOpenFormsCreatePopup(true); }

  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='forms' />
      {/* 2. right area */}
      <div className="content-box w-100 flex-col gap-32">
        {/* 2-1. 타이틀 */}
        <strong className="title">신청 양식 관리</strong>
        <div className='w-100 h-100 flex gap-32'>
          {/* 2-2. 왼쪽 영역(그리드) */}
          <div className="left-section flex-col flex-1 flex-grow">
            <div className="search-area align-center justify-between">
              <Select 
                label='코드 명'
                id='category' value={codeName} onChange={handleChange} size='small' displayEmpty
                renderValue={(selected) => selected === '' ? '코드 네임' : selected }
                sx={{ width: '30rem' }}
              >
                <MenuItem value=''>코드 네임</MenuItem>
              </Select>
              <Button size='large' variant='contained' color='primary' onClick={clickOpenFormsCreatePopup}>생성</Button>
            </div>
            <div className="grid-area flex-col flex-grow gap-8">
              <Paper sx={{ width: '100%', overflow: 'hidden', border: '1px solid rgba(0, 0, 0, 0.2)' }} elevation={0}>
                <TableContainer sx={{ maxHeight: '65vh', minHeight: '65vh' }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" width={70}>구분</TableCell>
                        <TableCell align="center">필드 명</TableCell>
                        <TableCell align="center">타입</TableCell>
                        <TableCell align="center">사용여부</TableCell>
                        <TableCell align="center">기본 필드 여부</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow
                          key={index}
                          selected={selectedRow === index}
                          onClick={() => setSelectedRow(index)}
                          sx={{ cursor: 'pointer' }} 
                        >
                          <TableCell align="center">{row.classify}</TableCell>
                          <TableCell align="center">{row.fieldName}</TableCell>
                          <TableCell align="center">{row.type}</TableCell>
                          <TableCell align="center">
                            <Chip
                              label={row.usedYn}
                              color={getStatusColor(row.usedYn)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">{row.defaultFieldYn}</TableCell>
                        </TableRow> 
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <div className="align-center gap-8 ml-a">
                <Button size='large' variant='outlined' color='primary'>삭제</Button>
                <Button size='large' variant='contained' color='primary'>수정</Button>
              </div>
            </div>
          </div>
          {/* 2-3. 오른쪽 영역(미리보기) */}
          <div className="right-section flex-col flex-1">
            <div className="title-area align-center">
              <strong>미리보기</strong>
              <Divider sx={{ flexGrow: 1 }} />
            </div>
            <div className="form-wrap flex-col">
              <FormField label='경험' helpText='지원자가 작성해야 하는 항목을 선택하세요.</br> 기본 양식을 선택하거나, 원하면 새로운 양식을 만들 수 있어요.(최대 3개)'>
                <FieldGroup>
                  <CustomTextfield type='textarea' placeholder='경험을 입력해 주세요.' />
                </FieldGroup>
              </FormField>
              <FormField label='경험' helpText='지원자가 작성해야 하는 항목을 선택하세요.</br> 기본 양식을 선택하거나, 원하면 새로운 양식을 만들 수 있어요.(최대 3개)'>
                <FieldGroup>
                  <CustomTextfield type='textarea' placeholder='경험을 입력해 주세요.' />
                </FieldGroup>
              </FormField>
            </div>
          </div>
        </div>
      </div>
      {/* 3. 양식 추가 생성 팝업 */}
      {/* 3-1. type = textfield */}
      {/* <WebPopup
        size='medium'
        isOpen={openFormsCreatePopup}
        onClose={() => setOpenFormsCreatePopup(false)}
        title='양식 추가 생성'
        submitText={'등록'}
        onSubmit={() => {}}
      >
        <div className="description-list flex-col gap-4">
          <dl className='align-center gap-4'>
            <dt>필드 명</dt>
            <dd className='w-100'>
              <CustomTextfield size='small' />
            </dd>
          </dl>
          <dl className='align-center gap-4'>
            <dt>타입</dt>
            <dd className='w-100'>
              <Select 
                id='category' value={type} onChange={handleChange2} size='small' displayEmpty
                renderValue={(selected) => selected === '' ? 'Textfield' : selected }
                sx={{
                  width: '100%',
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                }}
              >
                <MenuItem value=''>Textfield</MenuItem>
              </Select>
            </dd>
          </dl>
          <dl className='align-stretch gap-4'>
            <dt>글자 수 제한</dt>
            <dd className='w-100 flex-col gap-4' style={{ padding: '1.3rem 0.8rem' }}>
              <FormControl>
                <RadioGroup row aria-labelledby='text-limit-radio-group-label' defaultValue='true'>
                  <FormControlLabel value='true' control={<Radio />} label='사용' />
                  <FormControlLabel value='false' control={<Radio />} label='미사용' />
                </RadioGroup>
              </FormControl>
              <CustomTextfield size='small' />
            </dd>
          </dl>
          <dl className='align-stretch gap-4'>
            <dt>도움말</dt>
            <dd className='w-100 flex-col gap-4' style={{ padding: '1.3rem 0.8rem' }}>
              <FormControl>
                <RadioGroup row aria-labelledby='help-radio-group-label' defaultValue='true'>
                  <FormControlLabel value='true' control={<Radio />} label='사용' />
                  <FormControlLabel value='false' control={<Radio />} label='미사용' />
                </RadioGroup>
              </FormControl>
              <CustomTextfield size='small' />
            </dd>
          </dl>
        </div>
      </WebPopup> */}
      {/* 3-2. type = radio */}
      {/* <WebPopup
        size='medium'
        isOpen={openFormsCreatePopup}
        onClose={() => setOpenFormsCreatePopup(false)}
        title='양식 추가 생성'
        submitText={'등록'}
        onSubmit={() => {}}
      >
        <div className="description-list flex-col gap-4">
          <dl className='align-center gap-4'>
            <dt>필드 명</dt>
            <dd className='w-100'>
              <CustomTextfield size='small' />
            </dd>
          </dl>
          <dl className='align-center gap-4'>
            <dt>타입</dt>
            <dd className='w-100'>
              <Select 
                id='category' value={type} onChange={handleChange2} size='small' displayEmpty
                renderValue={(selected) => selected === '' ? 'Radio' : selected }
                sx={{
                  width: '100%',
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                }}
              >
                <MenuItem value=''>Radio</MenuItem>
              </Select>
            </dd>
          </dl>
          <dl className='align-stretch gap-4'>
            <dt>가로 여부</dt>
            <dd className='w-100'>
              <FormControl>
                <RadioGroup row aria-labelledby='text-limit-radio-group-label' defaultValue='horizontal'>
                  <FormControlLabel value='horizontal' control={<Radio />} label='가로' />
                  <FormControlLabel value='vertical' control={<Radio />} label='세로' />
                </RadioGroup>
              </FormControl>
            </dd>
          </dl>
          <dl className='align-stretch gap-4'>
            <dt>선택항목</dt>
            <dd className='w-100 flex-col gap-4'>
              <div className="flex gap-8">
                <CustomTextfield size='small' />
                <IconButton size="small" className="w-fit">
                  <Clear sx={{ fontSize: 25, color: "rgba(0, 0, 0, 0.3)" }} />
                </IconButton> 
              </div>
              <div className="flex gap-8">
                <CustomTextfield size='small' />
                <IconButton size="small" className="w-fit">
                  <Clear sx={{ fontSize: 25, color: "rgba(0, 0, 0, 0.3)" }} />
                </IconButton> 
              </div>
              <div className="flex gap-8">
                <CustomTextfield size='small' />
                <IconButton size="small" className="w-fit">
                  <Clear sx={{ fontSize: 25, color: "rgba(0, 0, 0, 0.3)" }} />
                </IconButton> 
              </div>
              <div className="flex gap-8">
                <CustomTextfield size='small' />
                <IconButton size="small" className="w-fit">
                  <Clear sx={{ fontSize: 25, color: "rgba(0, 0, 0, 0.3)" }} />
                </IconButton> 
              </div>
              <Button size='medium' variant='contained' color='primary'>추가</Button>
            </dd>
          </dl>
          <dl className='align-stretch gap-4'>
            <dt>도움말</dt>
            <dd className='w-100 flex-col gap-4' style={{ padding: '1.3rem 0.8rem' }}>
              <FormControl>
                <RadioGroup row aria-labelledby='help-radio-group-label' defaultValue='true'>
                  <FormControlLabel value='true' control={<Radio />} label='사용' />
                  <FormControlLabel value='false' control={<Radio />} label='미사용' />
                </RadioGroup>
              </FormControl>
              <CustomTextfield size='small' />
            </dd>
          </dl>
        </div>
      </WebPopup> */}
      {/* 3-3. type = select */}
      <WebPopup
        size='medium'
        isOpen={openFormsCreatePopup}
        onClose={() => setOpenFormsCreatePopup(false)}
        title='양식 추가 생성'
        submitText={'등록'}
        onSubmit={() => {}}
      >
        <div className="description-list flex-col gap-4">
          <dl className='align-center gap-4'>
            <dt>필드 명</dt>
            <dd className='w-100'>
              <CustomTextfield size='small' />
            </dd>
          </dl>
          <dl className='align-center gap-4'>
            <dt>타입</dt>
            <dd className='w-100'>
              <Select 
                id='category' value={type} onChange={handleChange2} size='small' displayEmpty
                renderValue={(selected) => selected === '' ? 'Select' : selected }
                sx={{
                  width: '100%',
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                }}
              >
                <MenuItem value=''>Select</MenuItem>
              </Select>
            </dd>
          </dl>
          <dl className='align-stretch gap-4'>
            <dt>선택항목</dt>
            <dd className='w-100 flex-col gap-4'>
              <div className="flex gap-8">
                <CustomTextfield size='small' />
                <IconButton size="small" className="w-fit">
                  <Clear sx={{ fontSize: 25, color: "rgba(0, 0, 0, 0.3)" }} />
                </IconButton> 
              </div>
              <div className="flex gap-8">
                <CustomTextfield size='small' />
                <IconButton size="small" className="w-fit">
                  <Clear sx={{ fontSize: 25, color: "rgba(0, 0, 0, 0.3)" }} />
                </IconButton> 
              </div>
              <div className="flex gap-8">
                <CustomTextfield size='small' />
                <IconButton size="small" className="w-fit">
                  <Clear sx={{ fontSize: 25, color: "rgba(0, 0, 0, 0.3)" }} />
                </IconButton> 
              </div>
              <div className="flex gap-8">
                <CustomTextfield size='small' />
                <IconButton size="small" className="w-fit">
                  <Clear sx={{ fontSize: 25, color: "rgba(0, 0, 0, 0.3)" }} />
                </IconButton> 
              </div>
              <Button size='medium' variant='contained' color='primary'>추가</Button>
            </dd>
          </dl>
          <dl className='align-stretch gap-4'>
            <dt>도움말</dt>
            <dd className='w-100 flex-col gap-4' style={{ padding: '1.3rem 0.8rem' }}>
              <FormControl>
                <RadioGroup row aria-labelledby='help-radio-group-label' defaultValue='true'>
                  <FormControlLabel value='true' control={<Radio />} label='사용' />
                  <FormControlLabel value='false' control={<Radio />} label='미사용' />
                </RadioGroup>
              </FormControl>
              <CustomTextfield size='small' />
            </dd>
          </dl>
        </div>
      </WebPopup>
    </div>
  )
}

