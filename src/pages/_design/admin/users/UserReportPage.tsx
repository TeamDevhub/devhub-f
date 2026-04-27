import CustomTextfield from '@/components/_common/customMUI/CustomTextfield'
import WebPopup from '@/components/_common/popup/WebPopup'
import LeftMenuBar from '@/components/_design/LeftMenuBar'
import { Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, MenuItem, Pagination, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, type SelectChangeEvent } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'

export default function UserReportPage(){
  // 신고 유형 select
  const [type, setType] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };
  // 신고 대상 select
  const [target, setTarget] = useState('');
  const handleChange2 = (event: SelectChangeEvent) => {
    setTarget(event.target.value);
  };
  // 신고 처리 상태 select
  const [processStatus, setProcessStatus] = useState('');
  const handleChange3 = (event: SelectChangeEvent) => {
    setProcessStatus(event.target.value);
  };

  // table data
  function createData(
    num: number,
    email: string,
    reportType: string,
    reportTarget: string,
    reportReason: string,
    reportDetail: string,
    reportDate: string,
    reportProcess: string
  ) {
    return { num, email, reportType, reportTarget, reportReason, reportDetail, reportDate, reportProcess };
  }

  const rows = [
    createData(1, 'debHub1234@gmail.com', '욕설', '게시물', '게시물에 과도한 욕설과 비방으로 상대방으로 하여금 불편함을 유발하였음', '안녕하세요 수빈님, 다름이 아니라 퍼블리싱 관련 자료를 요청하고 싶습니다.', '2026.01.01', '처리 완료' ),
    createData(2, 'debHub1234@gmail.com', '욕설', '댓글', '게시물에 과도한 욕설과 비방으로 상대방으로 하여금 불편함을 유발하였음', '안녕하세요 수빈님, 다름이 아니라 퍼블리싱 관련 자료를 요청하고 싶습니다.', '2026.01.01', '처리 미완료' ),
    createData(3, 'debHub1234@gmail.com', '욕설', '댓글', '게시물에 과도한 욕설과 비방으로 상대방으로 하여금 불편함을 유발하였음', '안녕하세요 수빈님, 다름이 아니라 퍼블리싱 관련 자료를 요청하고 싶습니다.', '2026.01.01', '처리 완료' ),
    createData(4, 'debHub1234@gmail.com', '욕설', '게시물', '게시물에 과도한 욕설과 비방으로 상대방으로 하여금 불편함을 유발하였음', '안녕하세요 수빈님, 다름이 아니라 퍼블리싱 관련 자료를 요청하고 싶습니다.', '2026.01.01', '처리 미완료' ),
    createData(5, 'debHub1234@gmail.com', '욕설', '게시물', '게시물에 과도한 욕설과 비방으로 상대방으로 하여금 불편함을 유발하였음', '안녕하세요 수빈님, 다름이 아니라 퍼블리싱 관련 자료를 요청하고 싶습니다.', '2026.01.01', '처리 완료' )
  ]
  
  // 회원 정지 팝업
  const [openSuspensionPopup, setOpenSuspensionPopup] = useState(false);
  const clickOpenSuspensionPopup = () => {
    setStep(1);
    setOpenSuspensionPopup(true);
  }
  const [step, setStep] = useState(1);

  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='user-reports' />
      {/* 2. right area */}
      <div className="content-box w-100 flex-col gap-32">
        {/* 2-1. 타이틀 */}
        <strong className="title">신고 목록</strong>
        {/* 2-2. 조회 영역 */}
        <div className="search-section flex-col gap-8">
          <div className="align-center gap-16">
            <Select 
              label='신고 유형'
              id='category' value={type} onChange={handleChange} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '정지' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>정지</MenuItem>
            </Select>
            <Select 
              label='신고 대상'
              id='category' value={target} onChange={handleChange2} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '댓글' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>댓글</MenuItem>
            </Select>
            <Select 
              label='신고 처리 상태'
              id='category' value={processStatus} onChange={handleChange3} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '전체' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>전체</MenuItem>
            </Select>
            <div className="align-center gap-4">
              <DatePicker
                slotProps={{
                  textField: {
                    label: '신고 날짜',
                    size: 'small',
                    InputLabelProps: {
                      shrink: true,
                    }
                  },
                }}
                sx={{ maxWidth: '20rem' }}
              />
              <p className='seperator'>~</p>
              <DatePicker
                slotProps={{
                  textField: {
                    size: 'small',
                    InputLabelProps: {
                      shrink: true,
                    }
                  },
                }}
                sx={{
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                  maxWidth: '20rem'
                }}
              />
            </div>
          </div>
          <CustomTextfield size='small' placeholder='닉네임을 입력해 주세요.' sx={{ width: '41.6rem' }} />
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
                  <TableCell align="center" width={120}>번호</TableCell>
                  <TableCell align="center">이메일</TableCell>
                  <TableCell align="center" width={120}>신고 유형</TableCell>
                  <TableCell align="center" width={120}>신고 대상</TableCell>
                  <TableCell align="center">신고 사유</TableCell>
                  <TableCell align="center">신고 상세보기</TableCell>
                  <TableCell align="center" width={120}>신고 날짜</TableCell>
                  <TableCell align="center" width={120}>신고 처리</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow>
                    <TableCell align="center">{row.num}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="center">{row.reportType}</TableCell>
                    <TableCell align="center">{row.reportTarget}</TableCell>
                    <TableCell align="left"><Typography noWrap>{row.reportReason}</Typography></TableCell>
                    <TableCell align="left"><Typography noWrap>{row.reportDetail}</Typography></TableCell>
                    <TableCell align="center">{row.reportDate}</TableCell>
                    <TableCell align="center">
                      {row.reportProcess === '처리 완료' ? ('처리 완료') : (
                        <Button variant="contained" color="primary" size="small" onClick={clickOpenSuspensionPopup}>회원 정지</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination count={10} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
        </div>
      </div>
      <WebPopup
        size='medium'
        isOpen={openSuspensionPopup}
        onClose={() => setOpenSuspensionPopup(false)}
        title='회원 정지'
        submitText={step === 1 ? '등록' : '확인'}
        closeOnSubmit={step !== 1}
        onSubmit={() => {
          if (step === 1) { setStep(2); }
        }}
      >
        { step == 1 &&
          <div className="description-list flex-col gap-4">
            <dl className='align-center gap-4'>
              <dt>신고 사유</dt>
              <dd>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox />} label='욕설/비방' />
                  <FormControlLabel control={<Checkbox />} label='불건전/유해' />
                  <FormControlLabel control={<Checkbox />} label='스팸/광고' />
                  <FormControlLabel control={<Checkbox />} label='음란물' />
                  <FormControlLabel control={<Checkbox />} label='기타' />
                </FormGroup>
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>상세 사유</dt>
              <dd>
                COCO000199
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>정지 기간</dt>
              <dd>
                <FormControl>
                  <RadioGroup row aria-labelledby='recruitment-status-radio-group-label' defaultValue='general'>
                    <FormControlLabel value='general' control={<Radio />} label='7일' />
                    <FormControlLabel value='additional' control={<Radio />} label='30일' />
                    <FormControlLabel value='additional' control={<Radio />} label='영구정지' />
                    <FormControlLabel value='additional' control={<Radio />} label='기타' />
                  </RadioGroup>
                </FormControl>
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>정지 기간 설정</dt>
              <dd className='w-100 align-center gap-8'>
                <DatePicker
                  slotProps={{
                    textField: {
                      size: 'small',
                      InputLabelProps: {
                        shrink: true,
                      }
                    },
                  }}
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                />
                <p className='seperator'>~</p>
                <DatePicker
                  slotProps={{
                    textField: {
                      size: 'small',
                      InputLabelProps: {
                        shrink: true,
                      }
                    },
                  }}
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                />
              </dd>
            </dl>
          </div>
        }
        { step == 2 &&
          <div className='only-text'>
            <p>정말 정지하시겠습니까?</p>
          </div>
        }
      </WebPopup>
    </div>
  )
}

