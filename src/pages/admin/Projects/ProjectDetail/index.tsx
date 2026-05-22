import CustomTextfield from '@/components/_common/customMUI/CustomTextfield'
import LeftMenuBar from '@/components/_design/LeftMenuBar'
import { Button, Chip, Divider, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, type SelectChangeEvent } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react'

export default function ProjectDetailPage(){
  // 모집 구분 select
  const [recruitClassify, setRecruitClassify] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setRecruitClassify(event.target.value);
  };

  // 진행 방식 select
  const [progress, setProgress] = useState('');
  const handleChange2 = (event: SelectChangeEvent) => {
    setProgress(event.target.value);
  };

  // 진행 지역 select
  const [progressArea, setProgressArea] = useState('');
  const handleChange3 = (event: SelectChangeEvent) => {
    setProgressArea(event.target.value);
  };

  // 지원 상태 select
  const [applyStatus, setApplyStatus] = useState('');
  const handleChange4 = (event: SelectChangeEvent) => {
    setApplyStatus(event.target.value);
  };

  // 지원 포지션 select
  const [applyPosition, setApplyPosition] = useState('');
  const handleChange5 = (event: SelectChangeEvent) => {
    setApplyPosition(event.target.value);
  };

  // 스킬 레벨 select
  const [skillLevel, setSkillLevel] = useState('');
  const handleChange6 = (event: SelectChangeEvent) => {
    setSkillLevel(event.target.value);
  };

  // table data
  function createData(
    num: string,
    applicantID: string,
    applyPosition: string,
    skillLevel: string,
    applyStatus: string
  ) {
    return { num, applicantID, applyPosition, skillLevel, applyStatus };
  }

  const rows = [
    createData('1', 'devHub1234@gmail.com', '백엔드', '상', '승인대기' ),
    createData('2', 'devHub1234@gmail.com', '프론트엔드', '상', '승인완료' ),
    createData('3', 'devHub1234@gmail.com', '기획자', '중', '승인대기' ),
    createData('4', 'devHub1234@gmail.com', '디자이너', '하', '승인거절' ),
    createData('5', 'devHub1234@gmail.com', '백엔드', '상', '승인대기' ),
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case '승인대기':
        return 'default';
      case '승인완료':
        return 'success';
      case '승인거절':
        return 'error';
      default:
        return 'default';
    }
  }; 

  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='projects' />
      {/* 2. right area */}
      <div className="content-box w-100 flex-col gap-32">
        {/* 2-1. 타이틀 */}
        <strong className='title'>프로젝트 상세</strong>
        {/* 2-2. 프로젝트 정보 */}
        <div className="search-section flex-col gap-16">
          <div className="title-area align-center gap-16">
            <strong>프로젝트 정보</strong>
            <Divider sx={{ flexGrow: 1 }} />
          </div>
          <div className="information-area flex-col gap-4">
            {/* 2-2-1. 프로젝트 명 */}
            <div className="align-center">
              <dl className='align-center flex-1 gap-4'>
                <dt>프로젝트 명</dt>
                <dd className='w-100'><CustomTextfield size='small' type='text' /></dd>
              </dl>
            </div>
            {/* 2-2-2. 모집 구분, 진행 방식, 진행 지역 */}
            <div className="align-center">
              <dl className='align-center flex-1 gap-4'>
                <dt>모집 구분</dt>
                <dd className='w-100'>
                  <Select 
                    className='w-100'
                    id='category' value={recruitClassify} onChange={handleChange} size='small' displayEmpty
                    renderValue={(selected) => selected === '' ? '일반모집' : selected }
                    sx={{
                      '& legend': { display: 'none' },
                      '& fieldset': { top: 0 },
                    }}
                  >
                    <MenuItem value=''>일반모집</MenuItem>
                  </Select>
                </dd>
              </dl>
              <dl className='align-center flex-1 gap-4'>
                <dt>진행 방식</dt>
                <dd className='w-100'>
                  <Select 
                    className='w-100'
                    id='category' value={progress} onChange={handleChange2} size='small' displayEmpty
                    renderValue={(selected) => selected === '' ? '온라인' : selected }
                    sx={{
                      '& legend': { display: 'none' },
                      '& fieldset': { top: 0 },
                    }}
                  >
                    <MenuItem value=''>온라인</MenuItem>
                  </Select>
                </dd>
              </dl>
              <dl className='align-center flex-1 gap-4'>
                <dt>진행 지역</dt>
                <dd className='w-100'>
                  <Select 
                    className='w-100'
                    id='category' value={progressArea} onChange={handleChange3} size='small' displayEmpty
                    renderValue={(selected) => selected === '' ? '서울' : selected }
                    sx={{
                      '& legend': { display: 'none' },
                      '& fieldset': { top: 0 },
                    }}
                  >
                    <MenuItem value=''>서울</MenuItem>
                  </Select>
                </dd>
              </dl>
            </div>
            {/* 2-2-3. 모집 기간, 진행 기간, 등록일시 */}
            <div className="align-center">
              <dl className='align-center flex-1 gap-4'>
                <dt>모집 기간</dt>
                <dd className='w-100 align-center gap-4' style={{ minWidth: 0 }}>
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
                      maxWidth: '16.8rem',
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
                      maxWidth: '16.8rem',
                      '& legend': { display: 'none' },
                      '& fieldset': { top: 0 },
                    }}
                  />
                </dd>
              </dl>
              <dl className='align-center flex-1 gap-4'>
                <dt>진행 기간</dt>
                <dd className='w-100 align-center gap-4' style={{ minWidth: 0 }}>
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
                      maxWidth: '16.8rem',
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
                      maxWidth: '16.8rem',
                      '& legend': { display: 'none' },
                      '& fieldset': { top: 0 },
                    }}
                  />
                </dd>
              </dl>
              <dl className='align-center flex-1 gap-4'>
                <dt>등록일시</dt>
                <dd className='w-100'>2026.01.01</dd>
              </dl>
            </div>
            {/* 2-2-4. 모집 인원 */}
            <div className="align-center">
              <dl className='align-stretch flex-1 gap-4'>
                <dt>모집 인원</dt>
                <dd>
                  <div className='flex-col gap-4' style={{ padding: '0.8rem 0' }}>
                  <div className="align-center gap-4">
                    <Chip size='small' variant='outlined' color='primary' label='기획자' />
                    <Chip size='small' variant='filled' label='하급' />
                    <p>1명</p>
                  </div>
                  <div className="align-center gap-4">
                    <Chip size='small' variant='outlined' color='primary' label='디자이너' />
                    <Chip size='small' variant='filled' label='하급' />
                    <p>1명</p>
                  </div>
                  <div className="align-center gap-4">
                    <Chip size='small' variant='outlined' color='primary' label='퍼블리셔' />
                    <Chip size='small' variant='filled' label='하급' />
                    <p>1명</p>
                  </div>
                  <div className="align-center gap-4">
                    <Chip size='small' variant='outlined' color='primary' label='프론트엔드개발자' />
                    <Chip size='small' variant='filled' label='하급' />
                    <p>1명</p>
                  </div>
                  <div className="align-center gap-4">
                    <Chip size='small' variant='outlined' color='primary' label='백엔드개발자' />
                    <Chip size='small' variant='filled' label='하급' />
                    <p>1명</p>
                  </div>
                </div>
                </dd>
              </dl>
            </div>
            {/* 2-2-5. 작성자 */}
            <div className="align-center">
              <dl className='align-center flex-1 gap-4'>
                <dt>작성자</dt>
                <dd className='w-100 align-center gap-4'>
                  devHub@gmail.com
                  <Chip size='small' variant='outlined' color='primary' label='기획자' />
                  <Chip size='small' variant='filled' label='하급' />
                  <Button size='small' variant='outlined' color='primary' className='ml-28'>상세보기</Button>
                </dd>
              </dl>
            </div>
            {/* 2-2-6.본문  */}
            <div className="align-center">
              <dl className='align-center flex-1 gap-4'>
                <dt>본문</dt>
                <dd className='w-100'>
                  <Button size='small' variant='outlined' color='primary'>상세보기</Button>
                </dd>
              </dl>
            </div>
            <Button size='medium' variant='contained' color='primary' className='ml-a'>저장</Button>
          </div>
        </div>
        {/* 2-3. 지원자 목록 中 조회 영역 */}
        <div className="search-section flex-col gap-16">
          <div className="title-area align-center gap-16">
            <strong>지원자 목록</strong>
            <Divider sx={{ flexGrow: 1 }} />
          </div>
          <div className="align-center gap-8">
            <Select 
              label='지원 상태'
              id='category' value={applyStatus} onChange={handleChange4} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '승인대기' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>승인대기</MenuItem>
            </Select>
            <Select 
              label='지원 포지션'
              id='category' value={applyPosition} onChange={handleChange5} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '백엔드' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>백엔드</MenuItem>
            </Select>
            <Select 
              label='스킬 레벨'
              id='category' value={skillLevel} onChange={handleChange6} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '상' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>상</MenuItem>
            </Select>
            <Button size='medium' variant='contained' color='primary' className='ml-a'>조회</Button>
          </div>
        </div>
        {/* 2-4. 지원자 목록 中 그리드 영역 */}
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
                  <TableCell align="center">지원자 아이디</TableCell>
                  <TableCell align="center">지원 포지션</TableCell>
                  <TableCell align="center">스킬 레벨</TableCell>
                  <TableCell align="center">지원 상태</TableCell>
                  <TableCell align="center">상세보기</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow>
                    <TableCell align="center">{row.num}</TableCell>
                    <TableCell align="left">{row.applicantID}</TableCell>
                    <TableCell align="center">{row.applyPosition}</TableCell>
                    <TableCell align="center">{row.skillLevel}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.applyStatus}
                        color={getStatusColor(row.applyStatus)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button size='small' variant='outlined' color='primary'>상세보기</Button>
                    </TableCell>
                  </TableRow> 
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination count={10} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
        </div>
      </div>
    </div>
  )
}

