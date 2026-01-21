import CustomAvatar from '@/components/common/CustomAvatar'
import { AccessTime, ArrowForwardIos, Email, Favorite, InfoOutline, LocationOn, Person, Settings } from '@mui/icons-material'
import { Button, Chip, Divider, Paper } from '@mui/material'
import MyInfoBox from '@/pages/web/mypage/home/MyInfoBox'
import React from 'react'

export interface MyPageHomeProps { // 데이터가 없을 때, Divider가 안 보여야 해서 임시로 설정해둠
  hasRegisterProject?: boolean;
  hasApplyProject?: boolean;
}

export default function MyPageHome({
  hasRegisterProject = true, 
  hasApplyProject = true,
}: MyPageHomeProps){
  return (
    <div className='main-page flex align-stretch' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      {/* 1. left area */}
      <MyInfoBox selectedKey='home' />
      {/* 2. right area */}
      <Paper className='mypage-box flex-col flex-grow flex-1' elevation={4}>
        {/* 2-1. 내 정보 */}
        <div className="top flex-col">
          <div className='flex align-center'>
            <div className="label-area align-center">
              <Person sx={{ fontSize: 24, color: 'primary.main' }} />
              <p>닉네임</p>
            </div>
            <div className="field-area">닉네임</div>
          </div>
          <div className='flex align-center'>
            <div className="label-area align-center">
              <Email sx={{ fontSize: 24, color: 'primary.main' }} />
              <p>이메일</p>
            </div>
            <div className="field-area">email@gmail.com</div>
          </div>
          <div className='flex align-center'>
            <div className="label-area align-center">
              <InfoOutline sx={{ fontSize: 24, color: 'primary.main' }} />
              <p>내 소개</p>
            </div>
            <div className="field-area">
              안녕하세요! 김민수입니다. 저는 마케팅 전략 수립 분야에 깊은 관심을 가지고 있으며, 특히 데이터 분석 능력을 바탕으로 매출 증대에 기여하고 싶습니다. 잘 부탁드립니다!
            </div>
          </div>
          <div className='flex align-center'>
            <div className="label-area align-center">
              <Favorite sx={{ fontSize: 24, color: 'primary.main' }} />
              <p>관심 포지션</p>
            </div>
            <div className="field-area flex">
              <Chip size='small' variant='outlined' color='primary' label='PL' />
              <Chip size='small' variant='outlined' color='primary' label='UI' />
              <Chip size='small' variant='outlined' color='primary' label='디자인' />
              <Chip size='small' variant='outlined' color='primary' label='CI/CD' />
              <Chip size='small' variant='outlined' color='primary' label='프론트엔드' />
              <Chip size='small' variant='outlined' color='primary' label='데이터분석' />
              <Chip size='small' variant='outlined' color='primary' label='백엔드' />
            </div>
          </div>
          <div className='flex align-center'>
            <div className="label-area align-center">
              <Settings sx={{ fontSize: 24, color: 'primary.main' }} />
              <p>보유 기술</p>
            </div>
            <div className="field-area flex">
              <Chip size='small' variant='outlined' color='secondary' label='CSS' />
              <Chip size='small' variant='outlined' color='secondary' label='JS' />
              <Chip size='small' variant='outlined' color='secondary' label='React' />
              <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
              <Chip size='small' variant='outlined' color='secondary' label='SQL' />
            </div>
          </div>
        </div>
        {/* 2-2. 내 프로젝트 */}
        <div className="bottom flex-col">
          {/* 2-2-1. 내가 등록한 프로젝트 */}
          { hasRegisterProject && 
            <>
              <Divider />
              <div className="list-box flex-col">
                <div className="list-top align-center justify-between">
                  <strong className='title'>내가 등록한 프로젝트</strong>
                  <Button 
                    size='small' color='primary'
                    endIcon={<ArrowForwardIos />}
                  >
                    전체보기
                  </Button>
                </div>
                <div className="list-bottom flex-col">
                  <div className="project-box w-100 justify-between">
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
                    <div className="right-area align-center">
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
                  </div>
                  <div className="project-box w-100 justify-between">
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
                    <div className="right-area align-center">
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
                  </div>
                  <div className="project-box w-100 justify-between">
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
                    <div className="right-area align-center">
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
                  </div>
                </div>
              </div>
            </>
          }
          {/* 2-2-2. 내가 신청한 프로젝트 */}
          { hasApplyProject && 
            <>
              <Divider />
              <div className="list-box flex-col">
                <div className="list-top align-center justify-between">
                  <strong className='title'>내가 신청한 프로젝트</strong>
                  <Button 
                    size='small' color='primary'
                    endIcon={<ArrowForwardIos />}
                  >
                    전체보기
                  </Button>
                </div>
                <div className="list-bottom flex-col">
                  <div className="project-box w-100 justify-between">
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
                    <div className="right-area flex-center">
                      <div className='flex-col align-center'>
                        <p className='count-text'>승인상태</p>
                        <div className="count" style={{ color: 'var(--text-secondary)' }}>승인 대기중</div>
                      </div>
                    </div>
                  </div>
                  <div className="project-box w-100 justify-between">
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
                    <div className="right-area flex-center">
                      <div className='flex-col align-center'>
                        <p className='count-text'>승인상태</p>
                        <div className="count" style={{ color: 'var(--info-main)' }}>참가 승인</div>
                      </div>
                    </div>
                  </div>
                  <div className="project-box w-100 justify-between">
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
                    <div className="right-area flex-center">
                      <div className='flex-col align-center'>
                        <p className='count-text'>승인상태</p>
                        <div className="count" style={{ color: 'var(--error-main)' }}>참가 거절</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </Paper>
    </div>
  )
}
