import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import WebPopup from '@/components/_common/popup/WebPopup';
import LeftMenuBar from '@/components/design/LeftMenuBar'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Button, Chip, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, type SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'

export default function CodeManagementPage(){
  // 상태 select
  const [state, setState] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };
  // 공통코드 select
  const [commonCode, setCommonCode] = useState('');
  const handleChange2 = (event: SelectChangeEvent) => {
    setCommonCode(event.target.value);
  };

  // 코드 명 select
  const [codeName, setCodeName] = useState('');
  const handleChange3 = (event: SelectChangeEvent) => {
    setCodeName(event.target.value);
  };
  // 상세 코드 명 select
  const [detailCodeName, setDetailCodeName] = useState('');
  const handleChange4 = (event: SelectChangeEvent) => {
    setDetailCodeName(event.target.value);
  };

  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedRow2, setSelectedRow2] = useState<number | null>(null);

  // table data1
  function createData(
    classify: number,
    ID: string,
    name: string,
    usedYn: string,
    note: string
  ) {
    return { classify, ID, name, usedYn, note };
  }

  const rows = [
    createData(1, 'C00010000', '포지션', '사용', '-' ),
    createData(2, 'C00010000', '기술', '사용', '-' ),
    createData(3, 'C00010000', '오류코드', '미사용', '-' ),
    createData(4, 'C00010000', '기타', '사용', '-' ),
    createData(5, 'C00010000', '포지션', '미사용', '-' ),
    createData(6, 'C00010000', '포지션', '미사용', '-' ),
    createData(7, 'C00010000', '포지션', '사용', '-' ),
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

  // table data2
  function createData2(
    classify: number,
    ID: string,
    name: string,
    usedYn: string,
    note: string
  ) {
    return { classify, ID, name, usedYn, note };
  }

  const rows2 = [
    createData2(1, 'C00010000', '포지션', '사용', '-' ),
    createData2(2, 'C00010000', '포지션', '사용', '-' ),
    createData2(3, 'C00010000', '포지션', '미사용', '-' ),
  ]

  // 공통코드 생성 팝업1
  const [openCodesCreatePopup, setOpenCodesCreatePopup] = useState(false);
  const clickOpenCodesCreatePopup = () => { setOpenCodesCreatePopup(true); }
  // 공통코드 생성 팝업2
  const [openCodesCreatePopup2, setOpenCodesCreatePopup2] = useState(false);
  const clickOpenCodesCreatePopup2 = () => { setOpenCodesCreatePopup2(true); }

  // 사용여부 select
  const [usedYn, setUsedYn] = useState('');
  const handleChange5 = (event: SelectChangeEvent) => {
    setUsedYn(event.target.value);
  };
  
  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='codes' />
      {/* 2. right area */}
      <div className="content-box w-100 flex-col gap-32">
        {/* 2-1. 타이틀 */}
        <strong className="title">공통 코드 관리</strong>
        <div className='w-100 h-100 flex-col gap-24'>
          {/* 2-2. 탑 영역(조회 및 버튼) */}
          <div className="w-100 top-section">
            <div className="w-100 align-stretch justify-between">
              <div className="align-center gap-8">
                <Select 
                  label='상태'
                  id='category' value={state} onChange={handleChange} size='small' displayEmpty
                  renderValue={(selected) => selected === '' ? '전체' : selected }
                  sx={{ width: '22rem' }}
                >
                  <MenuItem value=''>전체</MenuItem>
                </Select>
                <Select 
                  label='공통코드'
                  id='category' value={commonCode} onChange={handleChange2} size='small' displayEmpty
                  renderValue={(selected) => selected === '' ? 'C0010000' : selected }
                  sx={{ width: '22rem' }}
                >
                  <MenuItem value=''>C0010000</MenuItem>
                </Select>
              </div>
              <div className="align-center gap-8">
                <Button size="large" variant='outlined' color='primary'>수정</Button>
                <Button size="large" variant='outlined' color='primary'>생성</Button>
              </div>
            </div>
          </div>
          {/* 2-3. 바텀 영역(그리드) */}
          <div className="w-100 flex gap-24 bottom-section">
            <div className="left-area flex-col flex-1 flex-grow gap-8">
              <div className="search-area align-center justify-between">
                <Select 
                  label='코드 명'
                  id='category' value={codeName} onChange={handleChange3} size='small' displayEmpty
                  renderValue={(selected) => selected === '' ? '코드 명' : selected }
                  sx={{ width: '30rem' }}
                >
                  <MenuItem value=''>코드 네임</MenuItem>
                </Select>
                <Button size='large' variant='contained' color='primary' onClick={clickOpenCodesCreatePopup}>생성</Button>
              </div>
              <div className="grid-area flex-col flex-grow gap-8">
                <Paper sx={{ width: '100%', overflow: 'hidden', border: '1px solid rgba(0, 0, 0, 0.2)' }} elevation={0}>
                  <TableContainer sx={{ maxHeight: '60vh', minHeight: '60vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" width={70}>구분</TableCell>
                          <TableCell align="center">ID</TableCell>
                          <TableCell align="center">NAME</TableCell>
                          <TableCell align="center">사용여부</TableCell>
                          <TableCell align="center">비고</TableCell>
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
                            <TableCell align="center">{row.ID}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">
                              <Chip
                                label={row.usedYn}
                                color={getStatusColor(row.usedYn)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell align="center">{row.note}</TableCell>
                          </TableRow> 
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <div className="align-center gap-8 ml-a">
                  <Button size='large' variant='outlined' color='primary'>수정</Button>
                  <Button size='large' variant='contained' color='primary'>저장</Button>
                </div>
              </div>
            </div>
            <div className="right-area flex-col flex-1 flex-grow gap-8">
              <div className="search-area align-center justify-between">
                <Select 
                  label='상세 코드 명'
                  id='category' value={detailCodeName} onChange={handleChange4} size='small' displayEmpty
                  renderValue={(selected) => selected === '' ? '상세 코드 명' : selected }
                  sx={{ width: '30rem' }}
                >
                  <MenuItem value=''>상세 코드 명</MenuItem>
                </Select>
                <Button size='large' variant='contained' color='primary' onClick={clickOpenCodesCreatePopup2}>생성</Button>
              </div>
              <div className="grid-area flex-col flex-grow gap-8">
                <Paper sx={{ width: '100%', overflow: 'hidden', border: '1px solid rgba(0, 0, 0, 0.2)' }} elevation={0}>
                  <TableContainer sx={{ maxHeight: '60vh', minHeight: '60vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" width={70}>구분</TableCell>
                          <TableCell align="center">ID</TableCell>
                          <TableCell align="center">NAME</TableCell>
                          <TableCell align="center">사용여부</TableCell>
                          <TableCell align="center">정렬</TableCell>
                          <TableCell align="center">비고</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows2.map((row, index) => (
                          <TableRow 
                            key={index}
                            selected={selectedRow2 === index}
                            onClick={() => setSelectedRow2(index)}
                            sx={{ cursor: 'pointer' }} 
                          >
                            <TableCell align="center">{row.classify}</TableCell>
                            <TableCell align="center">{row.ID}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">
                              <Chip
                                label={row.usedYn}
                                color={getStatusColor(row.usedYn)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell align="center">
                              <div className="flex-center">
                                <IconButton size="small" className="w-fit">
                                  <KeyboardArrowUp sx={{ fontSize: 25, color: "rgba(0,0,0,0.3)" }} />
                                </IconButton>
                                <IconButton size="small" className="w-fit">
                                  <KeyboardArrowDown sx={{ fontSize: 25, color: "rgba(0,0,0,0.3)" }} />
                                </IconButton>
                              </div>
                            </TableCell>
                            <TableCell align="center">{row.note}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <div className="align-center gap-8 ml-a">
                  <Button size='large' variant='outlined' color='primary'>수정</Button>
                  <Button size='large' variant='contained' color='primary'>저장</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 3. 공통코드 생성 팝업 */}
      {/* 3-1. 팝업1 */}
      <WebPopup
        size='medium'
        isOpen={openCodesCreatePopup}
        onClose={() => setOpenCodesCreatePopup(false)}
        title='공통코드 생성'
        submitText={'등록'}
        onSubmit={() => {}}
      >
        <div className="description-list flex-col gap-4">
          <dl className='align-center gap-4'>
            <dt>코드</dt>
            <dd className='w-100'>
              <CustomTextfield size='small' />
            </dd>
          </dl>
          <dl className='align-center gap-4'>
            <dt>이름</dt>
            <dd className='w-100'>
              <CustomTextfield size='small' />
            </dd>
          </dl>
          <dl className='align-center gap-4'>
            <dt>사용여부</dt>
            <dd className='w-100'>
              <Select 
                id='category' value={usedYn} onChange={handleChange5} size='small' displayEmpty
                renderValue={(selected) => selected === '' ? '사용' : selected }
                sx={{
                  width: '100%',
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                }}
              >
                <MenuItem value=''>사용</MenuItem>
              </Select>
            </dd>
          </dl>
          <dl className='align-center gap-4'>
            <dt>정렬</dt>
            <dd className='w-100'>
              <CustomTextfield size='small' />
            </dd>
          </dl>
          <dl className='align-center gap-4'>
            <dt>비고</dt>
            <dd className='w-100'>
              <CustomTextfield size='small' />
            </dd>
          </dl>
        </div>
      </WebPopup>
      {/* 3-2. 팝업2 */}
      <WebPopup
        size='medium'
        isOpen={openCodesCreatePopup2}
        onClose={() => setOpenCodesCreatePopup2(false)}
        title='공통코드 생성'
        submitText={'등록'}
        onSubmit={() => {}}
      >
          <div className="description-list flex-col gap-4">
            <dl className='align-center gap-4'>
              <dt>상위 코드</dt>
              <dd className='w-100'>
                <CustomTextfield size='small' />
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>코드</dt>
              <dd className='w-100'>
                <CustomTextfield size='small' />
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>이름</dt>
              <dd className='w-100'>
                <CustomTextfield size='small' />
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>사용여부</dt>
              <dd className='w-100'>
                <Select 
                  id='category' value={usedYn} onChange={handleChange5} size='small' displayEmpty
                  renderValue={(selected) => selected === '' ? '사용' : selected }
                  sx={{
                    width: '100%',
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                  }}
                >
                  <MenuItem value=''>사용</MenuItem>
                </Select>
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>정렬</dt>
              <dd className='w-100'>
                <CustomTextfield size='small' />
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>비고</dt>
              <dd className='w-100'>
                <CustomTextfield size='small' />
              </dd>
            </dl>
          </div>
      </WebPopup>
    </div>
  )
}

