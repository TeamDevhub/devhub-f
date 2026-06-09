import { AccessTime, ArrowForwardIos, Create, LocationOn, Visibility } from '@mui/icons-material'
import { Box, Button, Chip, Paper, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import 'swiper/swiper.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import CustomAvatar from '@/components/_common/customMUI/CustomAvatar';
import HeartButton from '@/components/_common/button/HeartButton';

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
      style={{ position: 'relative' }}
      className='slide-banner-tabpanel w-100 flex flex-grow'
    >
      <div className='w-100 flex-grow'>
        <Box className={className} sx={{ height: '100%' }}>{children}</Box>
      </div>
    </div>
  )
}

export default function DesignMainPage(){
  // slide banner tabs
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => { setValue(newValue) };
    
  return (
    <>
      {/* 1. main */}
      <div className='main-container'>
        {/* 1-1. slide banner */}
        <div className="main-banner-container">
          <Swiper
            observer
            observeParents
            spaceBetween={0}
            centeredSlides={false}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className='main-banner-swiper'
            modules={[Pagination]}
          >
            <SwiperSlide>
              <p>메인 배너 슬라이드1 입니다.</p>
            </SwiperSlide>
            <SwiperSlide>
              <p>메인 배너 슬라이드2 입니다.</p>
            </SwiperSlide>
            <SwiperSlide>
              <p>메인 배너 슬라이드3 입니다.</p>
            </SwiperSlide>
          </Swiper>
        </div>
        {/* 1-2. project list */}
        <div className="main-project-tabs align-center justify-between" style={{ marginBottom: '-2.4rem' }}>
          <Tabs
            value={value}
            variant='standard'
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="slide-banner-tabs"
          >
            <Tab label="BACKEND" />
            <Tab label="FRONTEND" />
            <Tab label="PM" />
            <Tab label="AA" />
          </Tabs>
          <Button size="small" color='primary' endIcon={<ArrowForwardIos />}>더보기</Button>
        </div>
        {/* 1-2-1. BACKEND */}
        <TabPanel value={value} index={0}>
          <Swiper
            observer
            observeParents
            modules={[Navigation, Pagination]}
            slidesPerView={3.7}
            slidesOffsetBefore={0}
            spaceBetween={16} 
            navigation={{
              nextEl: '.next1',
              prevEl: '.prev1',
            }}
            className='project-list-swiper'
          >
            <SwiperSlide className='flex-col gap-16'>
              <div className="project-card flex-col gap-16">
                <div className="top flex-col gap-8">
                  <div className="chip-box align-center">
                    <Chip size='small' variant='filled' color='primary' label='모집중' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='default' 
                      label='서울'
                      className='flex-1'
                      icon={
                        <CustomAvatar
                          size={18}
                          sx={{ backgroundColor: '#AEAEAE' }}
                          avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                    <Chip size='small' variant='filled' color='error' label='추가모집' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='warning' 
                      label='D-13'
                      className='flex-1'
                      icon={
                        <CustomAvatar 
                        size={18}
                        sx={{ backgroundColor: '#E65100' }}
                        avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                  </div>
                  <strong className='main-text text-ellipsis'>
                    [데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.
                  </strong>
                </div>
                <div className="bottom flex-col gap-8">
                  <div className="chip-wrapper flex-col gap-4">
                    <div className="position-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                      <Chip size='small' variant='outlined' color='primary' label='풀스텍' />
                      <Chip size='small' variant='outlined' color='primary' label='웹 디자이너' />
                    </div>
                    <div className="skill-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                      <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                      <Chip size='small' variant='outlined' color='secondary' label='REACT' />
                    </div>
                  </div>
                  <div className="project-info align-center justify-between">
                      <p>홍길동 · 2025.12.03</p>
                      <p>view 1017</p>
                  </div>
                </div>
              </div>
              <div className="project-card flex-col gap-16">
                <div className="top flex-col gap-8">
                  <div className="chip-box align-center">
                    <Chip size='small' variant='filled' color='primary' label='모집중' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='default' 
                      label='서울'
                      className='flex-1'
                      icon={
                        <CustomAvatar
                          size={18}
                          sx={{ backgroundColor: '#AEAEAE' }}
                          avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                    <Chip size='small' variant='filled' color='error' label='추가모집' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='warning' 
                      label='D-13'
                      className='flex-1'
                      icon={
                        <CustomAvatar 
                        size={18}
                        sx={{ backgroundColor: '#E65100' }}
                        avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                  </div>
                  <strong className='main-text text-ellipsis'>
                    [데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.
                  </strong>
                </div>
                <div className="bottom flex-col gap-8">
                  <div className="chip-wrapper flex-col gap-4">
                    <div className="position-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                      <Chip size='small' variant='outlined' color='primary' label='풀스텍' />
                      <Chip size='small' variant='outlined' color='primary' label='웹 디자이너' />
                    </div>
                    <div className="skill-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                      <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                      <Chip size='small' variant='outlined' color='secondary' label='REACT' />
                    </div>
                  </div>
                  <div className="project-info align-center justify-between">
                      <p>홍길동 · 2025.12.03</p>
                      <p>view 1017</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='flex-col gap-16'>
              <div className="project-card flex-col gap-16">
                <div className="top flex-col gap-8">
                  <div className="chip-box align-center">
                    <Chip size='small' variant='filled' color='primary' label='모집중' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='default' 
                      label='서울'
                      className='flex-1'
                      icon={
                        <CustomAvatar
                          size={18}
                          sx={{ backgroundColor: '#AEAEAE' }}
                          avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                    <Chip size='small' variant='filled' color='error' label='추가모집' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='warning' 
                      label='D-13'
                      className='flex-1'
                      icon={
                        <CustomAvatar 
                        size={18}
                        sx={{ backgroundColor: '#E65100' }}
                        avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                  </div>
                  <strong className='main-text text-ellipsis'>
                    [데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.
                  </strong>
                </div>
                <div className="bottom flex-col gap-8">
                  <div className="chip-wrapper flex-col gap-4">
                    <div className="position-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                      <Chip size='small' variant='outlined' color='primary' label='풀스텍' />
                      <Chip size='small' variant='outlined' color='primary' label='웹 디자이너' />
                    </div>
                    <div className="skill-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                      <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                      <Chip size='small' variant='outlined' color='secondary' label='REACT' />
                    </div>
                  </div>
                  <div className="project-info align-center justify-between">
                      <p>홍길동 · 2025.12.03</p>
                      <p>view 1017</p>
                  </div>
                </div>
              </div>
              <div className="project-card flex-col gap-16">
                <div className="top flex-col gap-8">
                  <div className="chip-box align-center">
                    <Chip size='small' variant='filled' color='primary' label='모집중' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='default' 
                      label='서울'
                      className='flex-1'
                      icon={
                        <CustomAvatar
                          size={18}
                          sx={{ backgroundColor: '#AEAEAE' }}
                          avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                    <Chip size='small' variant='filled' color='error' label='추가모집' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='warning' 
                      label='D-13'
                      className='flex-1'
                      icon={
                        <CustomAvatar 
                        size={18}
                        sx={{ backgroundColor: '#E65100' }}
                        avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                  </div>
                  <strong className='main-text text-ellipsis'>
                    [데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.
                  </strong>
                </div>
                <div className="bottom flex-col gap-8">
                  <div className="chip-wrapper flex-col gap-4">
                    <div className="position-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                      <Chip size='small' variant='outlined' color='primary' label='풀스텍' />
                      <Chip size='small' variant='outlined' color='primary' label='웹 디자이너' />
                    </div>
                    <div className="skill-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                      <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                      <Chip size='small' variant='outlined' color='secondary' label='REACT' />
                    </div>
                  </div>
                  <div className="project-info align-center justify-between">
                      <p>홍길동 · 2025.12.03</p>
                      <p>view 1017</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='flex-col gap-16'>
              <div className="project-card flex-col gap-16">
                <div className="top flex-col gap-8">
                  <div className="chip-box align-center">
                    <Chip size='small' variant='filled' color='primary' label='모집중' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='default' 
                      label='서울'
                      className='flex-1'
                      icon={
                        <CustomAvatar
                          size={18}
                          sx={{ backgroundColor: '#AEAEAE' }}
                          avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                    <Chip size='small' variant='filled' color='error' label='추가모집' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='warning' 
                      label='D-13'
                      className='flex-1'
                      icon={
                        <CustomAvatar 
                        size={18}
                        sx={{ backgroundColor: '#E65100' }}
                        avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                  </div>
                  <strong className='main-text text-ellipsis'>
                    [데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.
                  </strong>
                </div>
                <div className="bottom flex-col gap-8">
                  <div className="chip-wrapper flex-col gap-4">
                    <div className="position-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                      <Chip size='small' variant='outlined' color='primary' label='풀스텍' />
                      <Chip size='small' variant='outlined' color='primary' label='웹 디자이너' />
                    </div>
                    <div className="skill-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                      <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                      <Chip size='small' variant='outlined' color='secondary' label='REACT' />
                    </div>
                  </div>
                  <div className="project-info align-center justify-between">
                      <p>홍길동 · 2025.12.03</p>
                      <p>view 1017</p>
                  </div>
                </div>
              </div>
              <div className="project-card flex-col gap-16">
                <div className="top flex-col gap-8">
                  <div className="chip-box align-center">
                    <Chip size='small' variant='filled' color='primary' label='모집중' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='default' 
                      label='서울'
                      className='flex-1'
                      icon={
                        <CustomAvatar
                          size={18}
                          sx={{ backgroundColor: '#AEAEAE' }}
                          avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                    <Chip size='small' variant='filled' color='error' label='추가모집' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='warning' 
                      label='D-13'
                      className='flex-1'
                      icon={
                        <CustomAvatar 
                        size={18}
                        sx={{ backgroundColor: '#E65100' }}
                        avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                  </div>
                  <strong className='main-text text-ellipsis'>
                    [데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.
                  </strong>
                </div>
                <div className="bottom flex-col gap-8">
                  <div className="chip-wrapper flex-col gap-4">
                    <div className="position-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                      <Chip size='small' variant='outlined' color='primary' label='풀스텍' />
                      <Chip size='small' variant='outlined' color='primary' label='웹 디자이너' />
                    </div>
                    <div className="skill-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                      <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                      <Chip size='small' variant='outlined' color='secondary' label='REACT' />
                    </div>
                  </div>
                  <div className="project-info align-center justify-between">
                      <p>홍길동 · 2025.12.03</p>
                      <p>view 1017</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='flex-col gap-16'>
              <div className="project-card flex-col gap-16">
                <div className="top flex-col gap-8">
                  <div className="chip-box align-center">
                    <Chip size='small' variant='filled' color='primary' label='모집중' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='default' 
                      label='서울'
                      className='flex-1'
                      icon={
                        <CustomAvatar
                          size={18}
                          sx={{ backgroundColor: '#AEAEAE' }}
                          avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                    <Chip size='small' variant='filled' color='error' label='추가모집' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='warning' 
                      label='D-13'
                      className='flex-1'
                      icon={
                        <CustomAvatar 
                        size={18}
                        sx={{ backgroundColor: '#E65100' }}
                        avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                  </div>
                  <strong className='main-text text-ellipsis'>
                    [데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.
                  </strong>
                </div>
                <div className="bottom flex-col gap-8">
                  <div className="chip-wrapper flex-col gap-4">
                    <div className="position-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                      <Chip size='small' variant='outlined' color='primary' label='풀스텍' />
                      <Chip size='small' variant='outlined' color='primary' label='웹 디자이너' />
                    </div>
                    <div className="skill-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                      <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                      <Chip size='small' variant='outlined' color='secondary' label='REACT' />
                    </div>
                  </div>
                  <div className="project-info align-center justify-between">
                      <p>홍길동 · 2025.12.03</p>
                      <p>view 1017</p>
                  </div>
                </div>
              </div>
              <div className="project-card flex-col gap-16">
                <div className="top flex-col gap-8">
                  <div className="chip-box align-center">
                    <Chip size='small' variant='filled' color='primary' label='모집중' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='default' 
                      label='서울'
                      className='flex-1'
                      icon={
                        <CustomAvatar
                          size={18}
                          sx={{ backgroundColor: '#AEAEAE' }}
                          avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                    <Chip size='small' variant='filled' color='error' label='추가모집' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='warning' 
                      label='D-13'
                      className='flex-1'
                      icon={
                        <CustomAvatar 
                        size={18}
                        sx={{ backgroundColor: '#E65100' }}
                        avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                  </div>
                  <strong className='main-text text-ellipsis'>
                    [데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.
                  </strong>
                </div>
                <div className="bottom flex-col gap-8">
                  <div className="chip-wrapper flex-col gap-4">
                    <div className="position-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                      <Chip size='small' variant='outlined' color='primary' label='풀스텍' />
                      <Chip size='small' variant='outlined' color='primary' label='웹 디자이너' />
                    </div>
                    <div className="skill-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                      <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                      <Chip size='small' variant='outlined' color='secondary' label='REACT' />
                    </div>
                  </div>
                  <div className="project-info align-center justify-between">
                      <p>홍길동 · 2025.12.03</p>
                      <p>view 1017</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='flex-col gap-16'>
              <div className="project-card flex-col gap-16">
                <div className="top flex-col gap-8">
                  <div className="chip-box align-center">
                    <Chip size='small' variant='filled' color='primary' label='모집중' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='default' 
                      label='서울'
                      className='flex-1'
                      icon={
                        <CustomAvatar
                          size={18}
                          sx={{ backgroundColor: '#AEAEAE' }}
                          avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                    <Chip size='small' variant='filled' color='error' label='추가모집' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='warning' 
                      label='D-13'
                      className='flex-1'
                      icon={
                        <CustomAvatar 
                        size={18}
                        sx={{ backgroundColor: '#E65100' }}
                        avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                  </div>
                  <strong className='main-text text-ellipsis'>
                    [데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.
                  </strong>
                </div>
                <div className="bottom flex-col gap-8">
                  <div className="chip-wrapper flex-col gap-4">
                    <div className="position-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                      <Chip size='small' variant='outlined' color='primary' label='풀스텍' />
                      <Chip size='small' variant='outlined' color='primary' label='웹 디자이너' />
                    </div>
                    <div className="skill-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                      <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                      <Chip size='small' variant='outlined' color='secondary' label='REACT' />
                    </div>
                  </div>
                  <div className="project-info align-center justify-between">
                      <p>홍길동 · 2025.12.03</p>
                      <p>view 1017</p>
                  </div>
                </div>
              </div>
              <div className="project-card flex-col gap-16">
                <div className="top flex-col gap-8">
                  <div className="chip-box align-center">
                    <Chip size='small' variant='filled' color='primary' label='모집중' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='default' 
                      label='서울'
                      className='flex-1'
                      icon={
                        <CustomAvatar
                          size={18}
                          sx={{ backgroundColor: '#AEAEAE' }}
                          avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                    <Chip size='small' variant='filled' color='error' label='추가모집' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='warning' 
                      label='D-13'
                      className='flex-1'
                      icon={
                        <CustomAvatar 
                        size={18}
                        sx={{ backgroundColor: '#E65100' }}
                        avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                  </div>
                  <strong className='main-text text-ellipsis'>
                    [데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.
                  </strong>
                </div>
                <div className="bottom flex-col gap-8">
                  <div className="chip-wrapper flex-col gap-4">
                    <div className="position-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                      <Chip size='small' variant='outlined' color='primary' label='풀스텍' />
                      <Chip size='small' variant='outlined' color='primary' label='웹 디자이너' />
                    </div>
                    <div className="skill-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                      <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                      <Chip size='small' variant='outlined' color='secondary' label='REACT' />
                    </div>
                  </div>
                  <div className="project-info align-center justify-between">
                      <p>홍길동 · 2025.12.03</p>
                      <p>view 1017</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='flex-col gap-16'>
              <div className="project-card flex-col gap-16">
                <div className="top flex-col gap-8">
                  <div className="chip-box align-center">
                    <Chip size='small' variant='filled' color='primary' label='모집중' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='default' 
                      label='서울'
                      className='flex-1'
                      icon={
                        <CustomAvatar
                          size={18}
                          sx={{ backgroundColor: '#AEAEAE' }}
                          avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                    <Chip size='small' variant='filled' color='error' label='추가모집' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='warning' 
                      label='D-13'
                      className='flex-1'
                      icon={
                        <CustomAvatar 
                        size={18}
                        sx={{ backgroundColor: '#E65100' }}
                        avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                  </div>
                  <strong className='main-text text-ellipsis'>
                    [데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.
                  </strong>
                </div>
                <div className="bottom flex-col gap-8">
                  <div className="chip-wrapper flex-col gap-4">
                    <div className="position-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                      <Chip size='small' variant='outlined' color='primary' label='풀스텍' />
                      <Chip size='small' variant='outlined' color='primary' label='웹 디자이너' />
                    </div>
                    <div className="skill-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                      <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                      <Chip size='small' variant='outlined' color='secondary' label='REACT' />
                    </div>
                  </div>
                  <div className="project-info align-center justify-between">
                      <p>홍길동 · 2025.12.03</p>
                      <p>view 1017</p>
                  </div>
                </div>
              </div>
              <div className="project-card flex-col gap-16">
                <div className="top flex-col gap-8">
                  <div className="chip-box align-center">
                    <Chip size='small' variant='filled' color='primary' label='모집중' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='default' 
                      label='서울'
                      className='flex-1'
                      icon={
                        <CustomAvatar
                          size={18}
                          sx={{ backgroundColor: '#AEAEAE' }}
                          avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                    <Chip size='small' variant='filled' color='error' label='추가모집' className='flex-1' />
                    <Chip 
                      size='small' 
                      variant='filled' 
                      color='warning' 
                      label='D-13'
                      className='flex-1'
                      icon={
                        <CustomAvatar 
                        size={18}
                        sx={{ backgroundColor: '#E65100' }}
                        avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                        />
                      } 
                    />
                  </div>
                  <strong className='main-text text-ellipsis'>
                    [데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.
                  </strong>
                </div>
                <div className="bottom flex-col gap-8">
                  <div className="chip-wrapper flex-col gap-4">
                    <div className="position-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                      <Chip size='small' variant='outlined' color='primary' label='풀스텍' />
                      <Chip size='small' variant='outlined' color='primary' label='웹 디자이너' />
                    </div>
                    <div className="skill-box align-center gap-4">
                      <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                      <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                      <Chip size='small' variant='outlined' color='secondary' label='REACT' />
                    </div>
                  </div>
                  <div className="project-info align-center justify-between">
                      <p>홍길동 · 2025.12.03</p>
                      <p>view 1017</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className='swiper-button-prev prev1'></div>
          <div className='swiper-button-next next1'></div>
        </TabPanel>
        {/* 1-3. slide ad banner */}
        <div className='sub-banner-container'>
          <Swiper
            observer
            observeParents
            spaceBetween={24}
            slidesPerView={3}
            navigation={{
              nextEl: '.next2',
              prevEl: '.prev2',
            }}
            className='sub-banner-swiper'
            modules={[Navigation]}
          >
            <SwiperSlide>
              <p>서브 배너 슬라이드1 입니다.</p>
            </SwiperSlide>
            <SwiperSlide>
              <p>서브 배너 슬라이드2 입니다.</p>
            </SwiperSlide>
            <SwiperSlide>
              <p>서브 배너 슬라이드3 입니다.</p>
            </SwiperSlide>
            <SwiperSlide>
              <p>서브 배너 슬라이드4 입니다.</p>
            </SwiperSlide>
            <SwiperSlide>
              <p>서브 배너 슬라이드5 입니다.</p>
            </SwiperSlide>
          </Swiper>
          <div className='swiper-button-prev prev2'></div>
          <div className='swiper-button-next next2'></div>
        </div>
        {/* 1-4. popular boards */}
        <div className='popular-boards flex-col gap-8'>
          <div className="title-area align-center justify-between">
            <strong>인기 게시글</strong>
            <Button size='small' color='primary' endIcon={<ArrowForwardIos />}>더보기</Button>
          </div>
          <div className="board-list">
            <Paper className="board-box flex-col align-center" elevation={4}>
              <div className="top w-100 justify-between">
                <div className="left-area flex-col align-start flex-1">
                  <Chip size="small" variant="outlined" color="primary" label="모집중" />
                  <strong className="main-text text-ellipsis">
                    인기 게시글1 입니다.
                  </strong>
                </div>
                <div className="right-area flex-col">
                  <HeartButton likeCount={'206'} />
                </div>
              </div>
              <div className="bottom w-100 align-center justify-between">
                <div className="left-area">
                  <p className="user-info">홍길동 · 2026.12.03</p>
                </div>
                <div className="right-area align-center">
                  <div className="view-count align-center">
                    <Visibility sx={{ fontSize: 20, color: 'rgba(0,0,0,0.3)' }} />
                    <p>2354</p>
                  </div>
                  <div className="reply-count align-center">
                    <Create sx={{ fontSize: 20, color: 'rgba(0,0,0,0.3)' }} />
                    <p>2354</p>
                  </div>
                </div>
              </div>
            </Paper>
            <Paper className="board-box flex-col align-center" elevation={4}>
              <div className="top w-100 justify-between">
                <div className="left-area flex-col align-start flex-1">
                  <Chip size="small" variant="outlined" color="primary" label="모집중" />
                  <strong className="main-text text-ellipsis">
                    인기 게시글2 입니다.
                  </strong>
                </div>
                <div className="right-area flex-col">
                  <HeartButton likeCount={'206'} />
                </div>
              </div>
              <div className="bottom w-100 align-center justify-between">
                <div className="left-area">
                  <p className="user-info">홍길동 · 2026.12.03</p>
                </div>
                <div className="right-area align-center">
                  <div className="view-count align-center">
                    <Visibility sx={{ fontSize: 20, color: 'rgba(0,0,0,0.3)' }} />
                    <p>2354</p>
                  </div>
                  <div className="reply-count align-center">
                    <Create sx={{ fontSize: 20, color: 'rgba(0,0,0,0.3)' }} />
                    <p>2354</p>
                  </div>
                </div>
              </div>
            </Paper>
            <Paper className="board-box flex-col align-center" elevation={4}>
              <div className="top w-100 justify-between">
                <div className="left-area flex-col align-start flex-1">
                  <Chip size="small" variant="outlined" color="primary" label="모집중" />
                  <strong className="main-text text-ellipsis">
                    인기 게시글3 입니다.
                  </strong>
                </div>
                <div className="right-area flex-col">
                  <HeartButton likeCount={'206'} />
                </div>
              </div>
              <div className="bottom w-100 align-center justify-between">
                <div className="left-area">
                  <p className="user-info">홍길동 · 2026.12.03</p>
                </div>
                <div className="right-area align-center">
                  <div className="view-count align-center">
                    <Visibility sx={{ fontSize: 20, color: 'rgba(0,0,0,0.3)' }} />
                    <p>2354</p>
                  </div>
                  <div className="reply-count align-center">
                    <Create sx={{ fontSize: 20, color: 'rgba(0,0,0,0.3)' }} />
                    <p>2354</p>
                  </div>
                </div>
              </div>
            </Paper>
            <Paper className="board-box flex-col align-center" elevation={4}>
              <div className="top w-100 justify-between">
                <div className="left-area flex-col align-start flex-1">
                  <Chip size="small" variant="outlined" color="primary" label="모집중" />
                  <strong className="main-text text-ellipsis">
                    인기 게시글4 입니다.
                  </strong>
                </div>
                <div className="right-area flex-col">
                  <HeartButton likeCount={'206'} />
                </div>
              </div>
              <div className="bottom w-100 align-center justify-between">
                <div className="left-area">
                  <p className="user-info">홍길동 · 2026.12.03</p>
                </div>
                <div className="right-area align-center">
                  <div className="view-count align-center">
                    <Visibility sx={{ fontSize: 20, color: 'rgba(0,0,0,0.3)' }} />
                    <p>2354</p>
                  </div>
                  <div className="reply-count align-center">
                    <Create sx={{ fontSize: 20, color: 'rgba(0,0,0,0.3)' }} />
                    <p>2354</p>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
      {/* 2. footer */}
      <footer className='flex'>
        <div className="left-section flex-col gap-16">
          <p className='footer-logo'>DevHub</p>
          <div className="footer-info">
            <div className="contact align-center gap-8">
              <p>Contact</p>
              <address>teamDevHub@gmail.com</address>
            </div>
            <div className="copyright">
              Copyright DevHub. All rights reserved
            </div>
          </div>
        </div>
        <div className="right-section flex-1 justify-end">
          <nav>
            <ul className='align-center gap-24'>
              {/* 임의로 넣어둔 것 */}
              <li>
                <a href="#">이용약관</a>
              </li>
              <li>
                <a href="#">개인정보처리방침</a>
              </li>
              <li>
                <a href="#">서비스소개</a>
              </li>
              <li>
                <a href="#">고객센터</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  )
}
