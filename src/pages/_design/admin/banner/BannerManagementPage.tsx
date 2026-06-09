import CustomTextfield from '@/components/_common/customMUI/CustomTextfield'
import WebPopup from '@/components/_common/popup/WebPopup'
import LeftMenuBar from '@/components/_design/LeftMenuBar'
import { Box, Button, Chip, Divider, FormControl, FormControlLabel, MenuItem, Pagination, Paper, Radio, RadioGroup, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography, type SelectChangeEvent } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'

function TabPanel({ value, index, className, children }: {
  value: number
  index: number
  className?: string
  children: React.ReactNode
}) {
  if (value !== index) return null
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className='w-100 flex flex-grow'
    >
      <div className='w-100 flex-grow'>
        <Box className={className} sx={{ height: '100%' }}>{children}</Box>
      </div>
    </div>
  )
}

export default function BannerManagementPage(){
  // banner tabs
  const [value, setValue] = useState(0);
  const handleChange3 = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  // 상시 노출 여부 select
  const [expose, setExpose] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setExpose(event.target.value);
  };

  // 사용 여부 select
  const [use, setUse] = useState('');
  const handleChange2 = (event: SelectChangeEvent) => {
    setUse(event.target.value);
  };

  // table data
  function createData(
    drag: string,
    title: string,
    description: string,
    image: string,
    link: string,
    exposeDate: string,
    exposeStatus: string
  ) {
    return { drag, title, description, image, link, exposeDate, exposeStatus };
  }

  const rows = [
    createData('', '메인 배너1', '메인 페이지 배너 1', '', 'http://localhost:5173/design/admin/banner', '2026.01.01 ~ 2026.03.03', '노출중' ),
    createData('', '메인 배너1', '메인 페이지 배너 1', '', 'http://localhost:5173/design/admin/banner', '2026.01.01 ~ 2026.03.03', '비노출' ),
    createData('', '메인 배너1', '메인 페이지 배너 1', '', 'http://localhost:5173/design/admin/banner', '2026.01.01 ~ 2026.03.03', '비노출' ),
    createData('', '메인 배너1', '메인 페이지 배너 1', '', 'http://localhost:5173/design/admin/banner', '2026.01.01 ~ 2026.03.03', '노출중' ),
    createData('', '메인 배너1', '메인 페이지 배너 1', '', 'http://localhost:5173/design/admin/banner', '2026.01.01 ~ 2026.03.03', '비노출' ),
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case '노출중':
        return 'success';
      case '비노출':
        return 'default';
      default:
        return 'success';
    }
  }; 

  // 배너 설정 팝업
  const [openBannerSettingPopup, setOpenBannerSettingPopup] = useState(false);
  const clickOpenBannerSettingPopup = () => { setOpenBannerSettingPopup(true); }

  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='banner' />
      {/* 2. right area */}
      <div className="content-box w-100 flex-col gap-32">
        {/* 2-1. 타이틀 */}
        <strong className="title">배너 관리</strong>
        {/* 2-2. 탭 영역 */}
        <Tabs
          value={value}
          variant='standard'
          onChange={handleChange3}
          textColor="primary"
          indicatorColor="primary"
          aria-label="banner-tabs"
        >
          <Tab label="메인 배너" />
          <Tab label="서브 배너" />
        </Tabs>
        {/* 메인 배녀 */}
        <TabPanel value={value} index={0} className='flex-col gap-32'>
          {/* 2-2-1. 조회 영역 */}
          <div className="search-section flex-col gap-8">
            <div className="align-center gap-16">
              <div className="align-center gap-4">
                <DatePicker
                  slotProps={{
                    textField: {
                      label: '노출 기간',
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
                label='상시 노출 여부'
                id='category' value={expose} onChange={handleChange} size='small' displayEmpty
                renderValue={(selected) => selected === '' ? '사용' : selected }
                sx={{ width: '20rem' }}
              >
                <MenuItem value=''>사용</MenuItem>
              </Select>
              <Select 
                label='사용 여부'
                id='category' value={use} onChange={handleChange2} size='small' displayEmpty
                renderValue={(selected) => selected === '' ? '사용' : selected }
                sx={{ width: '20rem' }}
              >
                <MenuItem value=''>사용</MenuItem>
              </Select>
            </div>
            <CustomTextfield size='small' placeholder='' sx={{ width: '41.6rem' }} />
            <Button size='medium' variant='contained' className='ml-a'>조회</Button>
          </div>
          {/* 2-2-2. 그리드 영역 */}
          <div className="grid-section flex-col gap-16">
            <div className="grid-summary align-center gap-16">
              <Divider sx={{ flexGrow: 1 }} />
              <strong className='total-count'>총 <em>5</em>개</strong>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="user list table" sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate' }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width={50}></TableCell>
                    <TableCell align="center" width={200}>배너 제목</TableCell>
                    <TableCell align="center" width={200}>배너 설명</TableCell>
                    <TableCell align="center">배너 이미지</TableCell>
                    <TableCell align="center" width={200}>링크</TableCell>
                    <TableCell align="center" width={200}>노출 기간</TableCell>
                    <TableCell align="center" width={120}>노출 상태</TableCell>
                    <TableCell align="center" width={70}>관리</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow>
                      <TableCell align="center">{row.drag}</TableCell>
                      <TableCell align="center"><Typography noWrap>{row.title}</Typography></TableCell>
                      <TableCell align="left"><Typography noWrap>{row.description}</Typography></TableCell>
                      <TableCell align="center">{row.image}</TableCell>
                      <TableCell align="left"><Typography noWrap>{row.link}</Typography></TableCell>
                      <TableCell align="center">{row.exposeDate}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.exposeStatus}
                          color={getStatusColor(row.exposeStatus)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button size='small' variant='outlined' color='primary' sx={{ minWidth: '0 !important' }} onClick={clickOpenBannerSettingPopup}>관리</Button>
                      </TableCell>
                    </TableRow> 
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="align-center">
              <Pagination count={10} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
              <Button size='medium' variant='contained' color='primary' className='ml-a'>생성</Button>
            </div>
          </div>
        </TabPanel>
        {/* 서브 배너 */}
        <TabPanel value={value} index={1} className='flex-col gap-32'>
          {/* 2-2-1. 조회 영역 */}
          <div className="search-section flex-col gap-8">
            <div className="align-center gap-16">
              <div className="align-center gap-4">
                <DatePicker
                  slotProps={{
                    textField: {
                      label: '노출 기간',
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
                label='상시 노출 여부'
                id='category' value={expose} onChange={handleChange} size='small' displayEmpty
                renderValue={(selected) => selected === '' ? '사용' : selected }
                sx={{ width: '20rem' }}
              >
                <MenuItem value=''>사용</MenuItem>
              </Select>
              <Select 
                label='사용 여부'
                id='category' value={use} onChange={handleChange2} size='small' displayEmpty
                renderValue={(selected) => selected === '' ? '사용' : selected }
                sx={{ width: '20rem' }}
              >
                <MenuItem value=''>사용</MenuItem>
              </Select>
            </div>
            <CustomTextfield size='small' placeholder='' sx={{ width: '41.6rem' }} />
            <Button size='medium' variant='contained' className='ml-a'>조회</Button>
          </div>
          {/* 2-2-2. 그리드 영역 */}
          <div className="grid-section flex-col gap-16">
            <div className="grid-summary align-center gap-16">
              <Divider sx={{ flexGrow: 1 }} />
              <strong className='total-count'>총 <em>5</em>개</strong>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="user list table" sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate' }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width={50}></TableCell>
                    <TableCell align="center" width={200}>배너 제목</TableCell>
                    <TableCell align="center" width={200}>배너 설명</TableCell>
                    <TableCell align="center">배너 이미지</TableCell>
                    <TableCell align="center" width={200}>링크</TableCell>
                    <TableCell align="center" width={200}>노출 기간</TableCell>
                    <TableCell align="center" width={120}>노출 상태</TableCell>
                    <TableCell align="center" width={70}>관리</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow>
                      <TableCell align="center">{row.drag}</TableCell>
                      <TableCell align="center"><Typography noWrap>{row.title}</Typography></TableCell>
                      <TableCell align="left"><Typography noWrap>{row.description}</Typography></TableCell>
                      <TableCell align="center">{row.image}</TableCell>
                      <TableCell align="left"><Typography noWrap>{row.link}</Typography></TableCell>
                      <TableCell align="center">{row.exposeDate}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.exposeStatus}
                          color={getStatusColor(row.exposeStatus)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button size='small' variant='outlined' color='primary' sx={{ minWidth: '0 !important' }} onClick={clickOpenBannerSettingPopup}>관리</Button>
                      </TableCell>
                    </TableRow> 
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="align-center">
              <Pagination count={10} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
              <Button size='medium' variant='contained' color='primary' className='ml-a'>생성</Button>
            </div>
          </div>
        </TabPanel>
      </div>
      {/* 3. 배너 설정 팝업 */}
      <WebPopup
        size='medium'
        isOpen={openBannerSettingPopup}
        onClose={() => setOpenBannerSettingPopup(false)}
        title='배너 설정'
        submitText={'등록'}
        onDelete={() => {}}
        onSubmit={() => {}}
      >
        <div className="description-list flex-col gap-4">
          <dl className='align-stretch gap-4'>
            <dt style={{ height: 'auto' }}>배너 이미지</dt>
            <dd className='w-100 flex-col gap-4' style={{ padding: '1.3rem 0.8rem' }}>
              <div className="align-stretch gap-8">
                <CustomTextfield size='small' placeholder='이미지를 업로드해 주세요.' />
                <Button size='medium' variant='contained' color='primary'>업로드</Button>
              </div>
              <div className='help-text align-center'>
                <span className='dot'></span>
                파일 정보에 관련된 헬프 텍스트를 작성하는 란입니다.
              </div>
            </dd>
          </dl>
          <dl className='align-center gap-4'>
            <dt>설명</dt>
            <dd className='w-100'>
              <CustomTextfield size='small' />
            </dd>
          </dl>
          <dl className='align-center gap-4'>
            <dt>링크</dt>
            <dd className='w-100'>
              <CustomTextfield size='small' />
            </dd>
          </dl>
          <dl className='align-center gap-4'>
            <dt>노출 상태</dt>
            <dd className='w-100'>
              <FormControl>
                <RadioGroup row aria-labelledby='expose-status-radio-group-label' defaultValue='expose'>
                  <FormControlLabel value='expose' control={<Radio />} label='노출' />
                  <FormControlLabel value='non-expose' control={<Radio />} label='비노출' />
                </RadioGroup>
              </FormControl>
            </dd>
          </dl>
          <dl className='align-center gap-4'>
            <dt>상시 여부</dt>
            <dd className='w-100'>
              <FormControl>
                <RadioGroup row aria-labelledby='allTime-status-radio-group-label' defaultValue='true'>
                  <FormControlLabel value='true' control={<Radio />} label='상시' />
                  <FormControlLabel value='false' control={<Radio />} label='기간' />
                </RadioGroup>
              </FormControl>
            </dd>
          </dl>
          <dl className='align-center gap-4'>
            <dt>노출 기간</dt>
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
      </WebPopup>
    </div>
  )
}
