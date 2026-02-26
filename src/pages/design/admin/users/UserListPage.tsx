import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import LeftMenuBar from '@/components/design/LeftMenuBar'
import { Button, Chip, Divider, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, type SelectChangeEvent } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react'

export default function UserListPage(){
  // 계정 상태 select
  const [category, setCategory] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  // table data
  function createData(
    num: number,
    email: string,
    nickname: string,
    accountStatus: string,
    subscriptionDate: string,
    mannerTemperature: string
  ) {
    return { num, email, nickname, accountStatus, subscriptionDate, mannerTemperature };
  }

  const rows = [
    createData(1, 'debHub1234@gmail.com', '김수빈', '정상', '2026.01.01', '36.5℃' ),
    createData(2, 'debHub1234@gmail.com', '김수빈', '탈퇴', '2026.01.01', '36.5℃' ),
    createData(3, 'debHub1234@gmail.com', '김수빈', '정상', '2026.01.01', '36.5℃' ),
    createData(4, 'debHub1234@gmail.com', '김수빈', '정지', '2026.01.01', '36.5℃' ),
    createData(5, 'debHub1234@gmail.com', '김수빈', '정상', '2026.01.01', '36.5℃' )
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case '정상':
        return 'success';
      case '탈퇴':
        return 'default';
      case '정지':
        return 'error';
      default:
        return 'success';
    }
  };
  
  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='user-list' />
      {/* 2. right area */}
      <div className="content-box w-100 flex-col gap-32">
        {/* 2-1. 타이틀 */}
        <strong className="title">회원 목록</strong>
        {/* 2-2. 조회 영역 */}
        <div className="search-section flex-col gap-8">
          <div className="align-center gap-16">
            <Select 
              label='계정상태'
              id='category' value={category} onChange={handleChange} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '정지' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>정지</MenuItem>
            </Select>
            <div className="align-center gap-4">
              <DatePicker
                slotProps={{
                  textField: {
                    label: '가입일',
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
                  <TableCell align="center">닉네임</TableCell>
                  <TableCell align="center">계정상태</TableCell>
                  <TableCell align="center">가입일</TableCell>
                  <TableCell align="center">매너온도</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow>
                    <TableCell align="center">{row.num}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="center">{row.nickname}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.accountStatus}
                        color={getStatusColor(row.accountStatus)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">{row.subscriptionDate}</TableCell>
                    <TableCell align="center">{row.mannerTemperature}</TableCell>
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
