import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import LeftMenuBar from '@/components/design/LeftMenuBar'
import { Button, Chip, Divider, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, type SelectChangeEvent } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'

export default function BoardManagementPage(){
  // 키테고리 select
  const [category, setCategory] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  // 상태 select
  const [state, setState] = useState('');
  const handleChange2 = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  // 신고 여부 select
  const [reportStatus, setReportStatus] = useState('');
  const handleChange3 = (event: SelectChangeEvent) => {
    setReportStatus(event.target.value);
  };

  // table data
  function createData(
    num: number,
    category: string,
    title: string,
    state: string,
    reportCount: string,
    writer: string,
    createDate: string
  ) {
    return { num, category, title, state, reportCount, writer, createDate };
  }

  const rows = [
    createData(1, 'Q&A', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구 장사친구 장사친구 장사친구 장사친구 장사친구', '정상', '1회', '김수빈', '2026.01.01' ),
    createData(2, 'Q&A', '[UI/UX 디자이너] 소상공인을 위한 장사친구', '삭제', '1회', '김수빈', '2026.01.01' ),
    createData(3, 'Q&A', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구 장사친구 장사친구 장사친구 장사친구 장사친구', '탈퇴', '1회', '김수빈', '2026.01.01' ),
    createData(4, 'Q&A', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구 장사친구 장사친구 장사친구 장사친구 장사친구', '정상', '1회', '김수빈', '2026.01.01' ),
    createData(5, 'Q&A', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구 장사친구 장사친구 장사친구 장사친구 장사친구', '탈퇴', '1회', '김수빈', '2026.01.01' ),
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case '정상':
        return 'success';
      case '탈퇴':
        return 'default';
      case '삭제':
        return 'error';
      default:
        return 'success';
    }
  };

  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='boards' />
      {/* 2. right area */}
      <div className="content-box w-100 flex-col gap-32">
        {/* 2-1. 타이틀 */}
        <strong className="title">게시판 관리</strong>
        {/* 2-2. 조회 영역 */}
        <div className="search-section flex-col gap-8">
          <div className="align-center gap-16">
            <div className="align-center gap-4">
              <DatePicker
                slotProps={{
                  textField: {
                    label: '작성일',
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
            <Select 
              label='카테고리'
              id='category' value={category} onChange={handleChange} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? 'Q&A' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>Q&A</MenuItem>
            </Select>
            <Select 
              label='상태'
              id='category' value={state} onChange={handleChange2} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '정상' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>정상</MenuItem>
            </Select>
            <Select 
              label='신고 여부'
              id='category' value={reportStatus} onChange={handleChange3} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '정상' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>정상</MenuItem>
            </Select>
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
                  <TableCell align="center" width={120}>카테고리</TableCell>
                  <TableCell align="center">제목</TableCell>
                  <TableCell align="center" width={120}>상태</TableCell>
                  <TableCell align="center" width={120}>신고 횟수</TableCell>
                  <TableCell align="center" width={120}>작성자</TableCell>
                  <TableCell align="center" width={120}>작성일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow>
                    <TableCell align="center">{row.num}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="left"><Typography noWrap>{row.title}</Typography></TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.state}
                        color={getStatusColor(row.state)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">{row.reportCount}</TableCell>
                    <TableCell align="center">{row.writer}</TableCell>
                    <TableCell align="center">{row.createDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="align-center">
            <Pagination count={10} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
            <Button size='medium' variant='outlined' color='primary' className='ml-a'>삭제</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
