import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import WebPopup from '@/components/_common/popup/WebPopup';
import LeftMenuBar from '@/components/design/LeftMenuBar'
import { Button, Chip, Divider, FormControl, FormControlLabel, MenuItem, Pagination, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, type SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'

export default function TermsManagementPage(){
  // 모집 구분 select
  const [recruitClassify, setRecruitClassify] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setRecruitClassify(event.target.value);
  };

  // 모집 상태 select
  const [recruitStatus, setRecruitStatus] = useState('');
  const handleChange2 = (event: SelectChangeEvent) => {
    setRecruitStatus(event.target.value);
  };

  // table data
  function createData(
    num: number,
    name: string,
    description: string,
    required: string,
    used: string,
    registerDate: string,
    modifyDate: string
  ) {
    return { num, name, description, required, used, registerDate, modifyDate };
  }

  const rows = [
    createData(1, '서비스 이용약관', '서비스 이용과 관련된 회원의 권리·의무 및 책임 사항을 규정한 약관 서비스 이용과 관한 인정한 약관입니다. 이 약관은 필수 동의하여야 하므로', '필수', '사용중', '2026.01.01', '-' ),
    createData(2, '서비스 이용약관', '서비스 이용과 관련된 회원의 권리·의무 및 책임 사항을 규정한 약관 서비스 이용과 관한 인정한 약관입니다.', '선택', '사용중', '2026.01.01', '-' ),
    createData(3, '서비스 이용약관', '서비스 이용과 관련된 회원의 권리·의무 및 책임 사항을 규정한 약관 서비스 이용과 관한 인정한 약관입니다. 이 약관은 필수 동의하여야 하므로', '선택', '미사용', '2026.01.01', '-' ),
    createData(4, '서비스 이용약관', '서비스 이용과 관련된 회원의 권리·의무 및 책임 사항을 규정한 약관 서비스 이용과 관한 인정한 약관입니다. 이 약관은 필수 동의하여야 하므로', '필수', '미사용', '2026.01.01', '-' ),
    createData(5, '서비스 이용약관', '서비스 이용과 관련된 회원의 권리·의무 및 책임 사항을 규정한 약관 서비스 이용과 관한 인정한 약관입니다. 이 약관은 필수 동의하여야 하므로', '필수', '사용중', '2026.01.01', '-' ),
  ]

  const getStatusColor1 = (status: string) => {
    switch (status) {
      case '필수':
        return 'primary';
      case '선택':
        return 'default';
      default:
        return 'primary';
    }
  };

  const getStatusColor2 = (status: string) => {
    switch (status) {
      case '사용중':
        return 'success';
      case '미사용':
        return 'default';
      default:
        return 'success';
    }
  };

  // 약관 상세 팝업
  const [openTermsManagementPopup, setOpenTermsManagementPopup] = useState(false);
  const clickOpenTermsManagementPopup = () => { setOpenTermsManagementPopup(true); }

  // 약관 등록 팝업
  const [openTermsRegisterPopup, setOpenTermsRegisterPopup] = useState(false);
  const clickOpenTermsRegisterPopup = () => { setOpenTermsRegisterPopup(true); }

  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='terms' />
      {/* 2. right area */}
      <div className="content-box w-100 flex-col gap-32">
        {/* 2-1. 타이틀 */}
        <strong className="title">약관 관리</strong>
        {/* 2-2. 조회 영역 */}
        <div className="search-section flex-col gap-8">
          <div className="align-center gap-16">
            <Select 
              label='모집 구분'
              id='category' value={recruitClassify} onChange={handleChange} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '일반모집' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>일반모집</MenuItem>
            </Select>
            <Select 
              label='모집 상태'
              id='category' value={recruitStatus} onChange={handleChange2} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '모집중' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>모집중</MenuItem>
            </Select>
          </div>
          <CustomTextfield size='small' placeholder='약관 명을 입력해 주세요.' sx={{ width: '41.6rem' }} />
          <Button size='medium' variant='contained' className='ml-a'>조회</Button>
        </div>
        {/* 2-3. 그리드 영역 */}
        <div className="grid-section flex-col gap-16">
          <div className="grid-summary align-center gap-16">
            <Divider sx={{ flexGrow: 1 }} />
            <strong className='total-count'>총 <em>5</em>개</strong>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="user list table" sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate' }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" width={70}>번호</TableCell>
                  <TableCell align="center" width={200}>약관 명</TableCell>
                  <TableCell align="center">약관 설명</TableCell>
                  <TableCell align="center" width={120}>필수 여부</TableCell>
                  <TableCell align="center" width={120}>사용 여부</TableCell>
                  <TableCell align="center" width={120}>등록일</TableCell>
                  <TableCell align="center" width={120}>수정일</TableCell>
                  <TableCell align="center" width={70}>상세</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow>
                    <TableCell align="center">{row.num}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="left"><Typography noWrap>{row.description}</Typography></TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.required}
                        color={getStatusColor1(row.required)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.used}
                        color={getStatusColor2(row.used)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">{row.registerDate}</TableCell>
                    <TableCell align="center">{row.modifyDate}</TableCell>
                    <TableCell align="center">
                        <Button variant="outlined" color="primary" size="small" sx={{ minWidth: '0 !important' }} onClick={clickOpenTermsManagementPopup}>관리</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="align-center">
            <Pagination count={10} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
            <Button size='medium' variant='contained' color='primary' className='ml-a' onClick={clickOpenTermsRegisterPopup}>생성</Button>
          </div>
        </div>
        {/* 3. 약관 관리 팝업 */}
        <WebPopup
          size='medium'
          isOpen={openTermsManagementPopup}
          onClose={() => setOpenTermsManagementPopup(false)}
          title='약관 상세'
          submitText={'등록'}
          onDelete={() => {}}
          onSubmit={() => {}}
        >
          <div className="description-list flex-col gap-4">
            <dl className='align-center gap-4'>
              <dt>약관 명</dt>
              <dd className='w-100'>
                <CustomTextfield size='small' />
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>필수 여부</dt>
              <dd className='w-100'>
                <FormControl>
                  <RadioGroup row aria-labelledby='required-status-radio-group-label' defaultValue='true'>
                    <FormControlLabel value='true' control={<Radio />} label='필수' />
                    <FormControlLabel value='false' control={<Radio />} label='선택' />
                  </RadioGroup>
                </FormControl>
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>사용 여부</dt>
              <dd className='w-100'>
                <FormControl>
                  <RadioGroup row aria-labelledby='used-status-radio-group-label' defaultValue='true'>
                    <FormControlLabel value='true' control={<Radio />} label='사용' />
                    <FormControlLabel value='false' control={<Radio />} label='미사용' />
                  </RadioGroup>
                </FormControl>
              </dd>
            </dl>
            <dl className='align-stretch gap-4'>
              <dt>약관 내용</dt>
              <dd className='w-100'>
                <CustomTextfield size='small' type='textarea' />
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>등록일</dt>
              <dd className='w-100'>2026.01.01</dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>수정일</dt>
              <dd className='w-100'>-</dd>
            </dl>
          </div>
        </WebPopup>
        {/* 4. 약관 등록(생성) 팝업 */}
        <WebPopup
          size='medium'
          isOpen={openTermsRegisterPopup}
          onClose={() => setOpenTermsRegisterPopup(false)}
          title='약관 등록'
          submitText={'등록'}
          onSubmit={() => {}}
        >
          <div className="description-list flex-col gap-4">
            <dl className='align-center gap-4'>
              <dt>약관 명</dt>
              <dd className='w-100'>
                <CustomTextfield size='small' />
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>필수 여부</dt>
              <dd className='w-100'>
                <FormControl>
                  <RadioGroup row aria-labelledby='required-status-radio-group-label' defaultValue='true'>
                    <FormControlLabel value='true' control={<Radio />} label='필수' />
                    <FormControlLabel value='false' control={<Radio />} label='선택' />
                  </RadioGroup>
                </FormControl>
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>사용 여부</dt>
              <dd className='w-100'>
                <FormControl>
                  <RadioGroup row aria-labelledby='used-status-radio-group-label' defaultValue='true'>
                    <FormControlLabel value='true' control={<Radio />} label='사용' />
                    <FormControlLabel value='false' control={<Radio />} label='미사용' />
                  </RadioGroup>
                </FormControl>
              </dd>
            </dl>
            <dl className='align-stretch gap-4'>
              <dt>약관 내용</dt>
              <dd className='w-100'>
                <CustomTextfield size='small' type='textarea' />
              </dd>
            </dl>
          </div>
        </WebPopup>
      </div>
    </div>
  )
}
