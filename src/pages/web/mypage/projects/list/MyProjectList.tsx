import React, { useState } from 'react'
import MyInfoBox from '@/pages/web/mypage/home/MyInfoBox'
import { Box, Button, Chip, Pagination, Paper, Rating, Tab, Tabs } from '@mui/material'
import CustomAvatar from '@/components/common/CustomAvatar'
import { AccessTime, LocationOn, Person } from '@mui/icons-material'
import HeartButton from '@/components/common/HeartButton'
import WebPopup from '@/components/popup/WebPopup'

// tabs
function TabPanel({ value, index, children }: {
  value: number
  index: number
  children: React.ReactNode
}) {
  if (value !== index) return null
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export default function MyProjectList(){
  // tabs
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // 내가 신청한 프로젝트 中 지원 취소 팝업
  const [openCancelPopup, setOpenCancelPopup] = useState(false);
  const clickOpenCancelPopup = () => {setOpenCancelPopup(true);}

  // 참여한 프로젝트 中 팀원 평가 팝업
  const [openEvaluatePopup, setOpenEvaluatePopup] = useState(false);
  const clickOpenEvaluatePopup = () => {setOpenEvaluatePopup(true);}

  return (
    <div className='main-page align-stretch' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      {/* 1. left area */}
      <MyInfoBox selectedKey='projects' />
      {/* 2. right area */}
      <Paper className='mypage-box flex-col flex-grow' elevation={4}>
        {/* 2-1. tab menu */}
        <Tabs value={value} onChange={handleChange}>
          <Tab label="내가 등록한 프로젝트" />
          <Tab label="내가 신청한 프로젝트" />
          <Tab label="관심 프로젝트" />
          <Tab label="참여한 프로젝트" />
        </Tabs>
        {/* 2-2. list summary */}
        <strong className="list-summary">
          총 <em>3</em>건
        </strong>
        {/* 2-3. tab contents */}
        {/* 2-3-1. 내가 등록한 프로젝트 */}
        <TabPanel value={value} index={0}>
          <div className="list-box flex-col">
            <div className="project-box2 w-100 justify-between">
              <div className="left-area flex-col">
                <div className="chip-box align-center">
                <Chip size='small' variant='filled' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='default' 
                  label='서울'
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                <Chip size='small' variant='filled' color='error' label='추가모집' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='warning' 
                  label='D-13'
                  icon={
                    <CustomAvatar 
                    size={18}
                    sx={{ backgroundColor: '#E65100' }}
                    avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                </div>
                <strong className='main-text text-ellipsis'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.</strong>
                <div className='sub-text align-center'>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />모집기간</div>
                    <p className='flex'>2025.12.03 ~ 2025.02.03</p>
                  </div>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />진행기간</div>
                    <p>2025.12.03 ~ 2025.02.03</p>
                  </div>
                </div>
              </div>
              <div className="right-area flex-col" style={{ padding: 0 }}>
                <div className="top justify-between">
                  <div className='flex-col align-end'>
                    <div className="count" style={{ color: 'var(--info-main)' }}>1 / 35</div>
                    <p className='count-text'>모집인원</p>
                  </div>
                  <div className='flex-col align-end'>
                    <div className="count">25</div>
                    <p className='count-text'>신청자</p>
                  </div>
                  <div className='flex-col align-end'>
                    <div className="count">2</div>
                    <p className='count-text'>승인대기</p>
                  </div>
                </div>
                <div className="bottom align-center">
                  <Button size='small' variant='outlined' color='primary' className='flex-1'>신청자</Button>
                  <Button size='small' variant='outlined' color='primary' className='flex-1'>수정</Button>
                  <Button size='small' variant='contained' color='primary' className='flex-1'>마감</Button>
                </div>
              </div>
            </div>
            <div className="project-box2 w-100 justify-between">
              <div className="left-area flex-col">
                <div className="chip-box align-center">
                <Chip size='small' variant='filled' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='default' 
                  label='서울'
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                <Chip size='small' variant='filled' color='error' label='추가모집' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='warning' 
                  label='D-13'
                  icon={
                    <CustomAvatar 
                    size={18}
                    sx={{ backgroundColor: '#E65100' }}
                    avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                </div>
                <strong className='main-text text-ellipsis'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.</strong>
                <div className='sub-text align-center'>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />모집기간</div>
                    <p className='flex'>2025.12.03 ~ 2025.02.03</p>
                  </div>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />진행기간</div>
                    <p>2025.12.03 ~ 2025.02.03</p>
                  </div>
                </div>
              </div>
              <div className="right-area flex-col" style={{ padding: 0 }}>
                <div className="top justify-between">
                  <div className='flex-col align-end'>
                    <div className="count" style={{ color: 'var(--info-main)' }}>1 / 35</div>
                    <p className='count-text'>모집인원</p>
                  </div>
                  <div className='flex-col align-end'>
                    <div className="count">25</div>
                    <p className='count-text'>신청자</p>
                  </div>
                  <div className='flex-col align-end'>
                    <div className="count">2</div>
                    <p className='count-text'>승인대기</p>
                  </div>
                </div>
                <div className="bottom align-center">
                  <Button size='small' variant='outlined' color='primary' className='flex-1'>신청자</Button>
                  <Button size='small' variant='outlined' color='primary' className='flex-1'>수정</Button>
                  <Button size='small' variant='contained' color='primary' className='flex-1'>마감</Button>
                </div>
              </div>
            </div>
            <div className="project-box2 w-100 justify-between">
              <div className="left-area flex-col">
                <div className="chip-box align-center">
                <Chip size='small' variant='filled' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='default' 
                  label='서울'
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                <Chip size='small' variant='filled' color='error' label='추가모집' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='warning' 
                  label='D-13'
                  icon={
                    <CustomAvatar 
                    size={18}
                    sx={{ backgroundColor: '#E65100' }}
                    avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                </div>
                <strong className='main-text text-ellipsis'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.</strong>
                <div className='sub-text align-center'>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />모집기간</div>
                    <p className='flex'>2025.12.03 ~ 2025.02.03</p>
                  </div>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />진행기간</div>
                    <p>2025.12.03 ~ 2025.02.03</p>
                  </div>
                </div>
              </div>
              <div className="right-area flex-col" style={{ padding: 0 }}>
                <div className="top justify-between">
                  <div className='flex-col align-end'>
                    <div className="count" style={{ color: 'var(--info-main)' }}>1 / 35</div>
                    <p className='count-text'>모집인원</p>
                  </div>
                  <div className='flex-col align-end'>
                    <div className="count">25</div>
                    <p className='count-text'>신청자</p>
                  </div>
                  <div className='flex-col align-end'>
                    <div className="count">2</div>
                    <p className='count-text'>승인대기</p>
                  </div>
                </div>
                <div className="bottom align-center">
                  <Button size='small' variant='outlined' color='primary' className='flex-1'>신청자</Button>
                  <Button size='small' variant='outlined' color='primary' className='flex-1'>수정</Button>
                  <Button size='small' variant='contained' color='primary' className='flex-1'>마감</Button>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        {/* 2-3-2. 내가 신청한 프로젝트 */}
        <TabPanel value={value} index={1}>
          <div className="list-box flex-col">
            <div className="project-box2 w-100 justify-between">
              <div className="left-area flex-col">
                <div className="chip-box align-center">
                <Chip size='small' variant='filled' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='default' 
                  label='서울'
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                <Chip size='small' variant='filled' color='error' label='추가모집' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='warning' 
                  label='D-13'
                  icon={
                    <CustomAvatar 
                    size={18}
                    sx={{ backgroundColor: '#E65100' }}
                    avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                </div>
                <strong className='main-text text-ellipsis'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.</strong>
                <div className='sub-text align-center'>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />모집기간</div>
                    <p className='flex'>2025.12.03 ~ 2025.02.03</p>
                  </div>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />진행기간</div>
                    <p>2025.12.03 ~ 2025.02.03</p>
                  </div>
                </div>
              </div>
              <div className="right-area flex-center" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className='w-100 flex-col align-center'>
                  <div className="count" style={{ color: 'var(--text-secondary)', padding: '1.05rem 3.5rem' }}>승인 대기중</div>
                  <Button size='small' variant='outlined' color='primary' className='w-100' onClick={clickOpenCancelPopup}>신청 취소</Button>
                </div>
              </div>
            </div>
            <div className="project-box2 w-100 justify-between">
              <div className="left-area flex-col">
                <div className="chip-box align-center">
                <Chip size='small' variant='filled' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='default' 
                  label='서울'
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                <Chip size='small' variant='filled' color='error' label='추가모집' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='warning' 
                  label='D-13'
                  icon={
                    <CustomAvatar 
                    size={18}
                    sx={{ backgroundColor: '#E65100' }}
                    avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                </div>
                <strong className='main-text text-ellipsis'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.</strong>
                <div className='sub-text align-center'>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />모집기간</div>
                    <p className='flex'>2025.12.03 ~ 2025.02.03</p>
                  </div>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />진행기간</div>
                    <p>2025.12.03 ~ 2025.02.03</p>
                  </div>
                </div>
              </div>
              <div className="right-area flex-center" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className='w-100 flex-col align-center'>
                  <div className="count" style={{ color: 'var(--info-main)', padding: '1.05rem 3.5rem' }}>참가 승인</div>
                  <Button size='small' variant='outlined' color='primary' className='w-100' onClick={clickOpenCancelPopup}>신청 취소</Button>
                </div>
              </div>
            </div>
            <div className="project-box2 w-100 justify-between">
              <div className="left-area flex-col">
                <div className="chip-box align-center">
                <Chip size='small' variant='filled' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='default' 
                  label='서울'
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                <Chip size='small' variant='filled' color='error' label='추가모집' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='warning' 
                  label='D-13'
                  icon={
                    <CustomAvatar 
                    size={18}
                    sx={{ backgroundColor: '#E65100' }}
                    avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                </div>
                <strong className='main-text text-ellipsis'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.</strong>
                <div className='sub-text align-center'>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />모집기간</div>
                    <p className='flex'>2025.12.03 ~ 2025.02.03</p>
                  </div>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />진행기간</div>
                    <p>2025.12.03 ~ 2025.02.03</p>
                  </div>
                </div>
              </div>
              <div className="right-area flex-center" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className='w-100 flex-col align-center'>
                  <div className="count" style={{ color: 'var(--error-main)', padding: '1.05rem 3.5rem' }}>참가 거절</div>
                  <Button size='small' variant='outlined' color='primary' className='w-100' onClick={clickOpenCancelPopup}>신청 취소</Button>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        {/* 지원 취소 팝업 */}
        <WebPopup
          isOpen={openCancelPopup}
          setOpen={setOpenCancelPopup}
          onSubmit={()=>{}}
          title='프로젝트 지원 취소'
          submitText='확인'
        >
          <div className='mypage-popup' style={{ paddingBottom: '1.6rem' }}>
            <p>정말로 지원을 취소하시겠습니까?</p>
          </div>
        </WebPopup>
        {/* 2-3-3. 관심 프로젝트 */}
        <TabPanel value={value} index={2}>
          <div className="list-box flex-col">
            <div className="project-box2 w-100 justify-between">
              <div className="left-area flex-col">
                <div className="chip-box align-center">
                <Chip size='small' variant='filled' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='default' 
                  label='서울'
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                <Chip size='small' variant='filled' color='error' label='추가모집' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='warning' 
                  label='D-13'
                  icon={
                    <CustomAvatar 
                    size={18}
                    sx={{ backgroundColor: '#E65100' }}
                    avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                </div>
                <strong className='main-text text-ellipsis'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.</strong>
                <div className='sub-text align-center'>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />모집기간</div>
                    <p className='flex'>2025.12.03 ~ 2025.02.03</p>
                  </div>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />진행기간</div>
                    <p>2025.12.03 ~ 2025.02.03</p>
                  </div>
                </div>
              </div>
              <div className="right-area flex-center" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className='w-100 flex-col align-center'>
                  {/* likeCount는 추후에 데이터와 연결해야함(현재는 임시로 숫자 넣음) */}
                  <HeartButton className='ml-a' noCount defaultLiked /> 
                  <Button size='small' variant='outlined' color='primary' className='w-100'>프로젝트 지원</Button>
                </div>
              </div>
            </div>
            <div className="project-box2 w-100 justify-between">
              <div className="left-area flex-col">
                <div className="chip-box align-center">
                <Chip size='small' variant='filled' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='default' 
                  label='서울'
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                <Chip size='small' variant='filled' color='error' label='추가모집' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='warning' 
                  label='D-13'
                  icon={
                    <CustomAvatar 
                    size={18}
                    sx={{ backgroundColor: '#E65100' }}
                    avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                </div>
                <strong className='main-text text-ellipsis'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.</strong>
                <div className='sub-text align-center'>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />모집기간</div>
                    <p className='flex'>2025.12.03 ~ 2025.02.03</p>
                  </div>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />진행기간</div>
                    <p>2025.12.03 ~ 2025.02.03</p>
                  </div>
                </div>
              </div>
              <div className="right-area flex-center" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className='w-100 flex-col align-center'>
                  {/* likeCount는 추후에 데이터와 연결해야함(현재는 임시로 숫자 넣음) */}
                  <HeartButton className='ml-a' noCount defaultLiked /> 
                  <Button size='small' variant='outlined' color='primary' className='w-100'>프로젝트 지원</Button>
                </div>
              </div>
            </div>
            <div className="project-box2 w-100 justify-between">
              <div className="left-area flex-col">
                <div className="chip-box align-center">
                <Chip size='small' variant='filled' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='default' 
                  label='서울'
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                <Chip size='small' variant='filled' color='error' label='추가모집' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='warning' 
                  label='D-13'
                  icon={
                    <CustomAvatar 
                    size={18}
                    sx={{ backgroundColor: '#E65100' }}
                    avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                </div>
                <strong className='main-text text-ellipsis'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.</strong>
                <div className='sub-text align-center'>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />모집기간</div>
                    <p className='flex'>2025.12.03 ~ 2025.02.03</p>
                  </div>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />진행기간</div>
                    <p>2025.12.03 ~ 2025.02.03</p>
                  </div>
                </div>
              </div>
              <div className="right-area flex-center" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className='w-100 flex-col align-center'>
                  {/* likeCount는 추후에 데이터와 연결해야함(현재는 임시로 숫자 넣음) */}
                  <HeartButton className='ml-a' noCount defaultLiked /> 
                  <Button size='small' variant='outlined' color='primary' className='w-100'>프로젝트 지원</Button>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        {/* 2-3-4. 참여한 프로젝트 */}
        <TabPanel value={value} index={3}>
          <div className="list-box flex-col">
            <div className="project-box2 w-100 justify-between">
              <div className="left-area flex-col">
                <div className="chip-box align-center">
                <Chip size='small' variant='outlined' color='primary' label='진행중' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='default' 
                  label='서울'
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                <Chip size='small' variant='filled' color='error' label='추가모집' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='warning' 
                  label='D-13'
                  icon={
                    <CustomAvatar 
                    size={18}
                    sx={{ backgroundColor: '#E65100' }}
                    avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                </div>
                <strong className='main-text text-ellipsis'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.</strong>
                <div className='sub-text align-center'>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />모집기간</div>
                    <p className='flex'>2025.12.03 ~ 2025.02.03</p>
                  </div>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />진행기간</div>
                    <p>2025.12.03 ~ 2025.02.03</p>
                  </div>
                </div>
              </div>
              <div className="right-area flex-center" style={{ paddingTop: 0, paddingBottom: 0 }}>
              </div>
            </div>
            <div className="project-box2 w-100 justify-between">
              <div className="left-area flex-col">
                <div className="chip-box align-center">
                <Chip size='small' variant='outlined' color='success' label='진행완료' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='default' 
                  label='서울'
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                <Chip size='small' variant='filled' color='error' label='추가모집' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='warning' 
                  label='D-13'
                  icon={
                    <CustomAvatar 
                    size={18}
                    sx={{ backgroundColor: '#E65100' }}
                    avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                </div>
                <strong className='main-text text-ellipsis'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.</strong>
                <div className='sub-text align-center'>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />모집기간</div>
                    <p className='flex'>2025.12.03 ~ 2025.02.03</p>
                  </div>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />진행기간</div>
                    <p>2025.12.03 ~ 2025.02.03</p>
                  </div>
                </div>
              </div>
              <div className="right-area align-end" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className='w-100 flex-col align-center'>
                  <Button size='small' variant='outlined' color='primary' className='w-100' onClick={clickOpenEvaluatePopup}>팀원 평가</Button>
                </div>
              </div>
            </div>
            <div className="project-box2 w-100 justify-between">
              <div className="left-area flex-col">
                <div className="chip-box align-center">
                <Chip size='small' variant='outlined' color='success' label='진행완료' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='default' 
                  label='서울'
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                <Chip size='small' variant='filled' color='error' label='추가모집' />
                <Chip 
                  size='small' 
                  variant='filled' 
                  color='warning' 
                  label='D-13'
                  icon={
                    <CustomAvatar 
                    size={18}
                    sx={{ backgroundColor: '#E65100' }}
                    avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />
                </div>
                <strong className='main-text text-ellipsis'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.</strong>
                <div className='sub-text align-center'>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />모집기간</div>
                    <p className='flex'>2025.12.03 ~ 2025.02.03</p>
                  </div>
                  <div className='align-center'>
                    <div className='title flex'><AccessTime />진행기간</div>
                    <p>2025.12.03 ~ 2025.02.03</p>
                  </div>
                </div>
              </div>
              <div className="right-area align-end" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className='w-100 flex-col align-center'>
                  <Button size='small' variant='outlined' color='primary' className='w-100' onClick={clickOpenEvaluatePopup}>팀원 평가</Button>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        {/* 팀원 평가 팝업 */}
        <WebPopup
          size='auto'
          isOpen={openEvaluatePopup}
          setOpen={setOpenEvaluatePopup}
          onSubmit={()=>{}}
          title='프로젝트 팀원 평가'
          submitText='저장'
        >
          <div className='mypage-popup' style={{ paddingBottom: '1.6rem' }}>
            <div className="evaluate-box">
              <Paper className='evaluate-card flex-col' elevation={2}>
                <div className="user-info align-center">
                  <div className="left-area">
                    <CustomAvatar 
                      sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                      avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                    />
                  </div>
                  <div className="right-area">
                    <p className='user-nickname'>닉네임</p>
                    <p className='user-email'>email@gmail.com</p>
                  </div>
                </div>
                <div className="manner-box flex-col">
                  <div className="top flex-col">
                    <div className="manner-text justify-between">
                      <p className='text'>매너온도</p>
                      <p className='manner-temperature'>36.5°C</p>
                    </div>
                    <div className="manner-figure">
                      <span className='current-figure h-100'></span>
                    </div>
                  </div>
                  <div className="bottom align-center justify-between">
                    <p className='text'>참여 포지션</p>
                    <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                  </div>
                </div>
                <div className="rating-box flex-col">
                  <Rating name="team-rating" defaultValue={0} precision={0.5} />
                  <Button size='small' variant='contained' color='primary'>평가</Button>
                </div>
              </Paper>
              <Paper className='evaluate-card flex-col' elevation={2}>
                <div className="user-info align-center">
                  <div className="left-area">
                    <CustomAvatar 
                      sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                      avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                    />
                  </div>
                  <div className="right-area">
                    <p className='user-nickname'>닉네임</p>
                    <p className='user-email'>email@gmail.com</p>
                  </div>
                </div>
                <div className="manner-box flex-col">
                  <div className="top flex-col">
                    <div className="manner-text justify-between">
                      <p className='text'>매너온도</p>
                      <p className='manner-temperature'>36.5°C</p>
                    </div>
                    <div className="manner-figure">
                      <span className='current-figure h-100'></span>
                    </div>
                  </div>
                  <div className="bottom align-center justify-between">
                    <p className='text'>참여 포지션</p>
                    <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                  </div>
                </div>
                <div className="rating-box flex-col">
                  <Rating name="team-rating" defaultValue={2.5} disabled precision={0.5} />
                  <strong className='rating-text flex-center'>평가 완료</strong>
                </div>
              </Paper>
              <Paper className='evaluate-card flex-col' elevation={2}>
                <div className="user-info align-center">
                  <div className="left-area">
                    <CustomAvatar 
                      sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                      avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                    />
                  </div>
                  <div className="right-area">
                    <p className='user-nickname'>닉네임</p>
                    <p className='user-email'>email@gmail.com</p>
                  </div>
                </div>
                <div className="manner-box flex-col">
                  <div className="top flex-col">
                    <div className="manner-text justify-between">
                      <p className='text'>매너온도</p>
                      <p className='manner-temperature'>36.5°C</p>
                    </div>
                    <div className="manner-figure">
                      <span className='current-figure h-100'></span>
                    </div>
                  </div>
                  <div className="bottom align-center justify-between">
                    <p className='text'>참여 포지션</p>
                    <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                  </div>
                </div>
                <div className="rating-box flex-col">
                  <Rating name="team-rating" defaultValue={0} precision={0.5} />
                  <Button size='small' variant='contained' color='primary'>평가</Button>
                </div>
              </Paper>
              <Paper className='evaluate-card flex-col' elevation={2}>
                <div className="user-info align-center">
                  <div className="left-area">
                    <CustomAvatar 
                      sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                      avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                    />
                  </div>
                  <div className="right-area">
                    <p className='user-nickname'>닉네임</p>
                    <p className='user-email'>email@gmail.com</p>
                  </div>
                </div>
                <div className="manner-box flex-col">
                  <div className="top flex-col">
                    <div className="manner-text justify-between">
                      <p className='text'>매너온도</p>
                      <p className='manner-temperature'>36.5°C</p>
                    </div>
                    <div className="manner-figure">
                      <span className='current-figure h-100'></span>
                    </div>
                  </div>
                  <div className="bottom align-center justify-between">
                    <p className='text'>참여 포지션</p>
                    <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                  </div>
                </div>
                <div className="rating-box flex-col">
                  <Rating name="team-rating" defaultValue={0} precision={0.5} />
                  <Button size='small' variant='contained' color='primary'>평가</Button>
                </div>
              </Paper>
            </div>
          </div>
        </WebPopup>
        {/* 2-4. pagination */}
        <Pagination count={10} showFirstButton showLastButton color='primary' className='w-100 mt-a flex-center' />
      </Paper>
    </div>
  )
}

