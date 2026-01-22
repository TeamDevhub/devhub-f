import MyInfoBox from '@/pages/web/mypage/home/MyInfoBox'
import { Button, Chip, Divider, Paper } from '@mui/material'
import CustomAvatar from '@/components/common/CustomAvatar'
import { AccessTime, LocationOn, Person } from '@mui/icons-material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/swiper.css';
import React, { useState } from 'react'
import WebPopup from '@/components/popup/WebPopup'
import CustomTextfield from '@/components/common/CustomTextfield'

export default function MyProjectApplicant(){
  // 상세보기 팝업
  const [openDetailPopup, setOpenDetailPopup] = useState(false);
  const clickOpenDetailPopup = () => {setOpenDetailPopup(true);}

  return (
    <div className='main-page align-stretch' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      {/* 1. left area */}
      <MyInfoBox selectedKey='projects' />
      {/* 2. right area */}
      <Paper className='mypage-box flex-col flex-grow' elevation={4}>
        {/* 2-1. project info */}
        <div className="project-box2 w-100 justify-between" style={{ padding: 0, border: 'none', cursor: 'default' }}>
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
        </div>
         <Divider />        
        {/* 2-2. project applicants */}
        <div className="applicant-box flex-col">
          {/* 2-2-1. 포지션 및 인원 현황 */}
          <div className="top align-center justify-between">
            <div className="left-area align-center">
              <strong>기획자</strong>
              <Chip size='small' variant='filled' color='default' label='주니어' />
            </div>
            <div className="right-area align-center">
              <div className="count-text align-center">
                <strong className='title'>모집</strong> 
                <p className='count'><em>0</em> / 1명</p>
              </div>
              <Divider orientation='vertical' flexItem />
              <div className="count-text align-center">
                <strong className='title'>지원자</strong> 
                <p className='count'><em>25</em>명</p>
              </div>
            </div>
          </div>
          {/* 2-2-2. 신청자 리스트(슬라이드) */}
          <div className="bottom">
            <Swiper
              observer
              observeParents
              spaceBetween={12}
              centeredSlides={false}
              slidesPerView={4}
              navigation={{
                nextEl: '.next1',
                prevEl: '.prev1',
              }}
              className='applicant-swiper'
              scrollbar={{ draggable: true }}
              modules={[Navigation, Scrollbar]}
            >
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary' onClick={clickOpenDetailPopup}>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary' onClick={clickOpenDetailPopup}>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary' onClick={clickOpenDetailPopup}>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary'>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary'>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
            </Swiper>
            <div className='swiper-button-prev prev1'></div>
            <div className='swiper-button-next next1'></div>
          </div>
        </div>
        <div className="applicant-box flex-col">
          {/* 2-2-1. 포지션 및 인원 현황 */}
          <div className="top align-center justify-between">
            <div className="left-area align-center">
              <strong>퍼블리셔</strong>
              <Chip size='small' variant='filled' color='default' label='주니어' />
            </div>
            <div className="right-area align-center">
              <div className="count-text align-center">
                <strong className='title'>모집</strong> 
                <p className='count'><em>0</em> / 1명</p>
              </div>
              <Divider orientation='vertical' flexItem />
              <div className="count-text align-center">
                <strong className='title'>지원자</strong> 
                <p className='count'><em>25</em>명</p>
              </div>
            </div>
          </div>
          {/* 2-2-2. 신청자 리스트(슬라이드) */}
          <div className="bottom">
            <Swiper
              observer
              observeParents
              spaceBetween={12}
              centeredSlides={false}
              slidesPerView={4}
              navigation={{
                nextEl: '.next2',
                prevEl: '.prev2',
              }}
              className='applicant-swiper'
              scrollbar={{ draggable: true }}
              modules={[Navigation, Scrollbar]}
            >
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary'>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary'>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary'>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary'>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary'>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
            </Swiper>
            <div className='swiper-button-prev prev2'></div>
            <div className='swiper-button-next next2'></div>
          </div>
        </div>
        <div className="applicant-box flex-col">
          {/* 2-2-1. 포지션 및 인원 현황 */}
          <div className="top align-center justify-between">
            <div className="left-area align-center">
              <strong>개발자</strong>
              <Chip size='small' variant='filled' color='default' label='주니어' />
            </div>
            <div className="right-area align-center">
              <div className="count-text align-center">
                <strong className='title'>모집</strong> 
                <p className='count'><em>0</em> / 1명</p>
              </div>
              <Divider orientation='vertical' flexItem />
              <div className="count-text align-center">
                <strong className='title'>지원자</strong> 
                <p className='count'><em>25</em>명</p>
              </div>
            </div>
          </div>
          {/* 2-2-2. 신청자 리스트(슬라이드) */}
          <div className="bottom">
            <Swiper
              observer
              observeParents
              spaceBetween={12}
              centeredSlides={false}
              slidesPerView={4}
              navigation={{
                nextEl: '.next3',
                prevEl: '.prev3',
              }}
              className='applicant-swiper'
              scrollbar={{ draggable: true }}
              modules={[Navigation, Scrollbar]}
            >
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary'>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary'>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary'>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary'>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
              <SwiperSlide>
                <Paper className='applicant-swiper-slide flex-col' elevation={4}>
                  <div className="top">
                    <p className="application-date">지원일자 <em>2025.05.01</em></p>
                  </div>
                  <div className="middle flex-col">
                    <div className="user-info-box flex-col">
                      <div className="top-area align-center">
                        <div className="left-area">
                          <CustomAvatar 
                            size={32}
                            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                          />
                        </div>
                        <div className="right-area">
                          <p className='user-nickname'>닉네임</p>
                          <p className='user-email'>email@gmail.com</p>
                        </div>
                      </div>
                      <div className="bottom-area align-center flex-wrap">
                        <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                        <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                        <Chip size='small' variant='outlined' color='secondary' label='JS' />
                      </div>
                    </div>
                    <div className="manner-box flex-col">
                      <div className="manner-text justify-between">
                        <p className='text'>매너온도</p>
                        <p className='manner-temperature'>36.5°C</p>
                      </div>
                      <div className="manner-figure">
                        <span className='current-figure h-100'></span>
                      </div>
                    </div>
                    <Button fullWidth size='small' color='primary'>상세보기</Button>
                  </div>
                  <div className="bottom">
                    <div className="button-box flex gap-4">
                      <Button fullWidth size='small' variant='outlined' color='primary'>거절</Button>
                      <Button fullWidth size='small' variant='contained' color='primary'>승인</Button>
                    </div>
                  </div>
                </Paper>
              </SwiperSlide>
            </Swiper>
            <div className='swiper-button-prev prev3'></div>
            <div className='swiper-button-next next3'></div>
          </div>
        </div>
      </Paper>
      {/* 3. popup */}
      <WebPopup
        size='large'
        isOpen={openDetailPopup}
        setOpen={setOpenDetailPopup}
        onSubmit={()=>{}}
        title='지원자 상세'
        submitText='확인'
      >
        <div className="mypage-popup flex-col" style={{ gap: '1.6rem' }}>
          {/* 1. 기본 정보 */}
          <div className="form-wrap flex-col">
            <div className="form-box w-100 flex-col">   
              <div className="field-area user-info-box flex">
                <div className="left-area flex-col">
                  <div className="top align-center">
                    <CustomAvatar 
                      sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                      avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                    />
                    <div className="flex-col">
                      <p className='user-nickname'>지원자</p>
                      <p className='user-email'>email@gmail.com</p>
                    </div>
                  </div>
                  <div className="bottom manner-box flex-col">
                    <div className="manner-text justify-between">
                      <p className='text'>매너온도</p>
                      <p className='manner-temperature'>36.5°C</p>
                    </div>
                    <div className="manner-figure">
                      <span className='current-figure h-100'></span>
                    </div>
                  </div>
                </div>
                <Divider orientation='vertical' flexItem />
                <div className="right-area flex-col">
                  <div className="position-box align-start">
                    <p className="title">지원 포지션</p>
                    <div className="content align-center">
                      <Chip size='small' variant='outlined' color='primary' label='서버개발자' />
                    </div>
                  </div>
                  <div className="skill-box align-start">
                    <p className="title">보유 스킬</p>
                    <div className="content align-center">
                      <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                      <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                      <Chip size='small' variant='outlined' color='secondary' label='Docker' />
                      <Chip size='small' variant='outlined' color='secondary' label='GO' />
                    </div>
                  </div>
                  <div className="introduce-box align-start">
                    <p className="title">자기 소개</p>
                    <div className="content">
                      안녕하세요 저는 광명에 거주하고 있는 김수빈이라고 합니다.<br/>
                      저는 멋쟁이 토마토입니다. 나는야 주스 될거야 나는야 케찹 될거야 나는야 춤을 출거야
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 2. 추가 정보 */}
          <div className="inform-wrap flex-col">
            <div className="inform-box align-start">
              <div className="label-area">
                <strong>프로젝트 참여 목적</strong>
              </div>
              <div className="field-area">
                <p>
                  저는 **'테크 혁신'**이 곧 고객 만족으로 이어진다고 믿는 A사의 철학에 깊이 공감했습니다. 특히, 최근 진행하신 **'친환경 캠페인'**을 접하며 제가 가진 데이터 기반의 정량적 분석 능력이 회사의 브랜드 가치 향상에 크게 기여할 수 있음을 확신했습니다. 입사 후에는 빠르게 변화하는 시장 환경 속에서 소비자 행동을 예측하고, 차별화된 마케팅 전략을 수립하여 회사의 성장을 가속화하는 핵심 인재가 되겠습니다.
                </p>
              </div>
            </div>
            <Divider />
            <div className="inform-box align-start">
              <div className="label-area">
                <strong>경력</strong>
              </div>
              <div className="field-area">
                <p>2년차</p>
              </div>
            </div>
            <Divider />
            <div className="inform-box align-start">
              <div className="label-area">
                <strong>프로젝트 참여 이력</strong>
              </div>
              <div className="field-area history-part">
                <div className='align-center'>
                  <span></span>
                  <p>2020 네이버</p>
                </div>
                <div className='align-center'>
                  <span></span>
                  <p>2024 카카오 모빌리티</p>
                </div>
                <div className='align-center'>
                  <span></span>
                  <p>2025 테슬라 우주 항공 모함 제작 참여</p>
                </div>
              </div>
            </div>
            <Divider />
            <div className="inform-box align-start">
              <div className="label-area">
                <strong>지원동기</strong>
              </div>
              <div className="field-area">
                <p>
                  저는 **'테크 혁신'**이 곧 고객 만족으로 이어진다고 믿는 A사의 철학에 깊이 공감했습니다. 특히, 최근 진행하신 **'친환경 캠페인'**을 접하며 제가 가진 데이터 기반의 정량적 분석 능력이 회사의 브랜드 가치 향상에 크게 기여할 수 있음을 확신했습니다. 입사 후에는 빠르게 변화하는 시장 환경 속에서 소비자 행동을 예측하고, 차별화된 마케팅 전략을 수립하여 회사의 성장을 가속화하는 핵심 인재가 되겠습니다.
                </p>
              </div>
            </div>
            <Divider />
            <div className="inform-box align-start">
              <div className="label-area">
                <strong>첨부파일</strong>
              </div>
              <div className="field-area">
                {/* 추후에 첨부파일 영역으로 수정 필요 */}
                <CustomTextfield multiline placeholder='첨부파일 A' disabled />
              </div>
            </div>
          </div>
        </div>
      </WebPopup>
    </div>
  )
}

