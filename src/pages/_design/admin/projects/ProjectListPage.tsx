import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import LeftMenuBar from '@/components/design/LeftMenuBar'
import { Button, Checkbox, Chip, Divider, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, type SelectChangeEvent } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react'

export default function ProjectListPage(){
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

  // 진행 방식 select
  const [progress, setProgress] = useState('');
  const handleChange3 = (event: SelectChangeEvent) => {
    setProgress(event.target.value);
  };

  // 진행 지역 select
  const [progressArea, setProgressArea] = useState('');
  const handleChange4 = (event: SelectChangeEvent) => {
    setProgressArea(event.target.value);
  };

  // table data
  function createData(
    num: number,
    projectName: string,
    writer: string,
    recruitClassify: string,
    recruitStatus: string,
    progress: string,
    progressArea: string,
    createDate: string,
  ) {
    return { num, projectName, writer, recruitClassify, recruitStatus, progress, progressArea, createDate };
  }

  const rows = [
    createData(1, '프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다.', '김수빈', '일반모집', '모집중', '온라인', '대전', '2026.01.01' ),
    createData(2, '프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다.', '김수빈', '추가모집', '모집완료', '오프라인', '대전', '2026.01.01' ),
    createData(3, '프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다.', '김수빈', '추가모집', '모집중', '온라인', '대전', '2026.01.01' ),
    createData(4, '프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다.', '김수빈', '일반모집', '모집완료', '온라인', '대전', '2026.01.01' ),
    createData(5, '프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다. 프로젝트 명을 입력하는 란입니다.', '김수빈', '추가모집', '모집중', '온라인', '대전', '2026.01.01' ),
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case '일반모집':
        return 'success';
      case '추가모집':
        return 'error';
      default:
        return 'success';
    }
  };

  const getStatusColor2 = (status: string) => {
    switch (status) {
      case '모집중':
        return 'success';
      case '모집완료':
        return 'error';
      default:
        return 'success';
    }
  };

  // table checkbox
  const [selected, setSelected] = React.useState<number[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.num);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (num: number) => {
    const selectedIndex = selected.indexOf(num);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, num];
    } else {
      newSelected = selected.filter((id) => id !== num);
    }

    setSelected(newSelected);
  };

  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='projects' />
      {/* 2. right area */}
      <div className="content-box w-100 flex-col gap-32">
        {/* 2-1. 타이틀 */}
        <strong className="title">프로젝트 목록</strong>
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
              id='category' value={recruitClassify} onChange={handleChange} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '모집중' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>모집중</MenuItem>
            </Select>
            <div className="align-center gap-4">
              <DatePicker
                slotProps={{
                  textField: {
                    label: '모집일',
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
          <div className="align-center gap-16">
            <Select 
              label='진행 방식'
              id='category' value={progress} onChange={handleChange3} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '온라인' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>온라인</MenuItem>
            </Select>
            <Select 
              label='진행 지역'
              id='category' value={progressArea} onChange={handleChange4} size='small' displayEmpty
              renderValue={(selected) => selected === '' ? '서울' : selected }
              sx={{ width: '20rem' }}
            >
              <MenuItem value=''>서울</MenuItem>
            </Select>
            <div className="align-center gap-4">
              <DatePicker
                slotProps={{
                  textField: {
                    label: '진행일',
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
          <CustomTextfield size='small' placeholder='' sx={{ width: '41.6rem' }} />
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
                  <TableCell padding="checkbox">
                    <Checkbox
                      size='large'
                      color="primary"
                      indeterminate={
                        selected.length > 0 && selected.length < rows.length
                      }
                      checked={
                        rows.length > 0 && selected.length === rows.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell align="center" width={70}>번호</TableCell>
                  <TableCell align="center">프로젝트 명</TableCell>
                  <TableCell align="center" width={120}>작성자</TableCell>
                  <TableCell align="center" width={120}>모집 구분</TableCell>
                  <TableCell align="center" width={120}>모집 상태</TableCell>
                  <TableCell align="center" width={120}>진행 방식</TableCell>
                  <TableCell align="center" width={120}>진행 지역</TableCell>
                  <TableCell align="center" width={120}>작성일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        size='large'
                        color="primary"
                        checked={selected.includes(row.num)}
                        onChange={() => handleClick(row.num)}
                      />
                    </TableCell>
                    <TableCell align="center">{row.num}</TableCell>
                    <TableCell align="left"><Typography noWrap>{row.projectName}</Typography></TableCell>
                    <TableCell align="center">{row.writer}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.recruitClassify}
                        color={getStatusColor(row.recruitClassify)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.recruitStatus}
                        color={getStatusColor2(row.recruitStatus)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">{row.progress}</TableCell>
                    <TableCell align="center">{row.progressArea}</TableCell>
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

