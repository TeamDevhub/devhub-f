import CustomTextfield from '@/components/_common/customMUI/CustomTextfield'
import LeftMenuBar from '@/components/design/LeftMenuBar'
import { Box, Button, Chip, Divider, Pagination, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material'
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

export default function UserDetailPage(){
  // data tabs
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // table data
  function createData(
    num: number,
    recruitmentStatus: string,
    projectDetail: string,
    recruitmentPeriod: string,
    recruitmentSituation?: string,
    applicantNum?: string
  ) {
    return { num, recruitmentStatus, projectDetail, recruitmentPeriod, recruitmentSituation, applicantNum };
  }

  function createData2(
    num: number,
    recruitmentStatus: string,
    projectDetail: string,
    recruitmentPeriod: string,
    recruitmentDate?: string,
    state?: string
  ) {
    return { num, recruitmentStatus, projectDetail, recruitmentPeriod, recruitmentDate, state };
  }

  // 1. 등록한 프로젝트 데이터
  const rows = [
    createData(1, '모집 중', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구 장사친구 장사친구 장사친구 장사친구', '2025.05.05 ~ 2025.05.03', '1/10', '15명' ),
    createData(2, '모집 중', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구 ', '2025.05.05 ~ 2025.05.03', '1/10', '15명' ),
    createData(3, '모집 완료', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구', '2025.05.05 ~ 2025.05.03', '1/10', '15명' ),
    createData(4, '모집 완료', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구 장사친구 장사친구 장사친구 장사친구', '2025.05.05 ~ 2025.05.03', '1/10', '15명' ),
    createData(5, '모집 중', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구', '2025.05.05 ~ 2025.05.03', '1/10', '15명' )
  ]

  // 2. 신청한 프로젝트 데이터
  const rows2 = [
    createData2(1, '모집 중', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구 장사친구 장사친구 장사친구 장사친구', '2025.05.05 ~ 2025.05.03', '2025.01.01', '승인대기중' ),
    createData2(2, '모집 중', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구 ', '2025.05.05 ~ 2025.05.03', '2025.01.01', '승인거절' ),
    createData2(3, '모집 완료', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구', '2025.05.05 ~ 2025.05.03', '2025.01.01', '승인완료' ),
    createData2(4, '모집 완료', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구 장사친구 장사친구 장사친구 장사친구', '2025.05.05 ~ 2025.05.03', '2025.01.01', '승인완료' ),
    createData2(5, '모집 중', '[UI/UX 디자이너] 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친 소상공인을 위한 장사친구', '2025.05.05 ~ 2025.05.03', '2025.01.01', '승인대기중' )
  ]

  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='user-list' />
      {/* 2. right area */}
      <div className="content-box w-100 flex-col gap-32">
        {/* 2-1. 타이틀 */}
        <strong className='title'>회원 상세</strong>
        {/* 2-2. 조회 영역 */}
        <div className="search-section flex-col gap-16">
          <div className="title-area align-center gap-16">
            <strong>회원 정보</strong>
            <Divider sx={{ flexGrow: 1 }} />
          </div>
          <div className="information-area flex-col gap-4">
            {/* 2-2-1. 이메일, 닉네임, 비밀번호 */}
            <div className="align-center">
              <dl className='align-center flex-1 gap-4'>
                <dt>이메일</dt>
                <dd className='w-100'><CustomTextfield size='small' type='email' /></dd>
              </dl>
              <dl className='align-center flex-1 gap-4'>
                <dt>닉네임</dt>
                <dd className='w-100'><CustomTextfield size='small' /></dd>
              </dl>
              <dl className='align-center flex-1 gap-4'>
                <dt>비밀번호</dt>
                <dd className='w-100'><Button variant='outlined'>초기화</Button></dd>
              </dl>
            </div>
            {/* 2-2-2. 자기소개 */}
            <div className="align-center">
              <dl className='align-center flex-1 gap-4'>
                <dt>자기소개</dt>
                <dd className='w-100'><CustomTextfield size='small' /></dd>
              </dl>
            </div>
            {/* 2-2-3. 관심분야 */}
            <div className="align-center">
              <dl className='align-center flex-1 gap-4'>
                <dt>관심분야</dt>
                <dd className='w-100'>
                  <div className="chip-box align-center gap-4">
                    <Chip size='small' color='default' label='JAVA' onDelete={() => {}} />
                    <Chip size='small' color='default' label='React' onDelete={() => {}} />
                    <Chip size='small' color='default' label='GO' onDelete={() => {}} />
                  </div>
                </dd>
              </dl>
            </div>
            {/* 2-2-4. 보유스킬 */}
            <div className="align-center">
              <dl className='align-center flex-1 gap-4'>
                <dt>보유스킬</dt>
                <dd className='w-100'>
                  <div className="chip-box align-center gap-4">
                    <Chip size='small' color='default' label='JAVA' onDelete={() => {}} />
                    <Chip size='small' color='default' label='React' onDelete={() => {}} />
                    <Chip size='small' color='default' label='GO' onDelete={() => {}} />
                  </div>
                </dd>
              </dl>
            </div>
            {/* 2-2-5. 매너온도, 가입일, 최근 로그인 */}
            <div className="align-center">
              <dl className='align-center flex-1 gap-4'>
                <dt>매너온도</dt>
                <dd className='w-100'>36.5</dd>
              </dl>
              <dl className='align-center flex-1 gap-4'>
                <dt>가입일</dt>
                <dd className='w-100'>2025.12.08 10:13:32</dd>
              </dl>
              <dl className='align-center flex-1 gap-4'>
                <dt>최근 로그인</dt>
                <dd className='w-100'>2025.12.08 10:13:32</dd>
              </dl>
            </div>
            {/* 2-2-6. 버튼 */}
            <div className="align-center gap-4 ml-a" style={{ marginTop: '0.4rem' }}>
              <Button variant='outlined' className='flex-1'>회원 정지</Button>
              <Button variant='contained' className='flex-1'>저장</Button>
            </div>
          </div>
        </div>
        {/* 2-3. 데이터 영역 */}
        <div className="data-section flex-col gap-8">
          {/* 2-3-1. 타이틀 */}
          <div className="title-area align-center gap-16">
            <strong>회원 데이터</strong>
            <Divider sx={{ flexGrow: 1 }} />
          </div>
          {/* 2-3-2. 그리드(데이터) */}
          <div className="grid-area flex-col gap-28">
            <Tabs
              value={value}
              variant='standard'
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="user-data-tabs"
            >
              <Tab label="프로젝트 내역" />
              <Tab label="신고 내역" />
            </Tabs>
            <TabPanel value={value} index={0} className='flex-col gap-28'>
              <div className="register-project">
                <div className="flex-col gap-4">
                  <div className="table-summary align-center gap-16">
                    <p className='summary-title'>등록한 프로젝트</p>
                    <Divider sx={{ flexGrow: 1 }} />
                    <p className='total-count'>총 <em>5</em>개</p>
                  </div>
                  <TableContainer component={Paper}>
                    <Table aria-label="user list table" sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" width={70}>번호</TableCell>
                          <TableCell align="center" width={120}>모집 상태</TableCell>
                          <TableCell align="center">프로젝트 상세</TableCell>
                          <TableCell align="center" width={200}>모집 기간</TableCell>
                          <TableCell align="center" width={120}>모집 현황</TableCell>
                          <TableCell align="center" width={120}>신청 인원</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow>
                            <TableCell align="center">{row.num}</TableCell>
                            <TableCell align="center">{row.recruitmentStatus}</TableCell>
                            <TableCell align="left">
                              <Typography noWrap>
                                {row.projectDetail}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">{row.recruitmentPeriod}</TableCell>
                            <TableCell align="center">{row.recruitmentSituation}</TableCell>
                            <TableCell align="center">{row.applicantNum}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <Pagination size='small' count={10} showFirstButton showLastButton color='primary' className='w-100 flex-center mt-20' />
              </div>
              <div className="apply-project">
                <div className="flex-col gap-4">
                  <div className="table-summary align-center gap-16">
                    <p className='summary-title'>신청한 프로젝트</p>
                    <Divider sx={{ flexGrow: 1 }} />
                    <p className='total-count'>총 <em>5</em>개</p>
                  </div>
                  <TableContainer component={Paper}>
                    <Table aria-label="user list table" sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" width={70}>번호</TableCell>
                          <TableCell align="center" width={120}>모집 상태</TableCell>
                          <TableCell align="center">프로젝트 상세</TableCell>
                          <TableCell align="center" width={200}>모집 기간</TableCell>
                          <TableCell align="center" width={120}>신청일자</TableCell>
                          <TableCell align="center" width={120}>상태</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows2.map((row) => (
                          <TableRow>
                            <TableCell align="center">{row.num}</TableCell>
                            <TableCell align="center">{row.recruitmentStatus}</TableCell>
                            <TableCell align="left">
                              <Typography noWrap>
                                {row.projectDetail}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">{row.recruitmentPeriod}</TableCell>
                            <TableCell align="center">{row.recruitmentDate}</TableCell>
                            <TableCell align="center">{row.state}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <Pagination size='small' count={10} showFirstButton showLastButton color='primary' className='w-100 flex-center mt-20' />
              </div>
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  )
}
