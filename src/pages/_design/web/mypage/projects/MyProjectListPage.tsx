import React, { useState } from 'react'
import MyInfoBox from '@/components/_design/MyInfoBox'
import { Box, Button, Chip, Pagination, Paper, Rating, Tab, Tabs } from '@mui/material'
import CustomAvatar from '@/components/_common/customMUI/CustomAvatar'
import { AccessTime, LocationOn, Person } from '@mui/icons-material'
import HeartButton from '@/components/_common/button/HeartButton'
import WebPopup from '@/components/_common/popup/WebPopup'

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

export default function MyProjectListPage(){
  // tabs
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
            <ProjectCard 
              variant='register'
              title='[데이터 분석1] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다. 타이틀이 길어지면 말줄임표가 자동 처리됩니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
              currentRecriutNumber='1'
              totalRecriutNumber='25'
              applicantNumber='10'
              approvalNumber='10'
            />
            <ProjectCard 
              variant='register'
              title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
              currentRecriutNumber='1'
              totalRecriutNumber='25'
              applicantNumber='10'
              approvalNumber='10'
            />
            <ProjectCard 
              variant='register'
              title='[데이터 분석3] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
              currentRecriutNumber='1'
              totalRecriutNumber='25'
              applicantNumber='10'
              approvalNumber='10'
            />
          </div>
        </TabPanel>
        {/* 2-3-2. 내가 신청한 프로젝트 */}
        <TabPanel value={value} index={1}>
          <div className="list-box flex-col">
            <ProjectCard 
              variant='apply'
              title='[데이터 분석1] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다. 타이틀이 길어지면 말줄임표가 자동 처리됩니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
              approvalState='승인 대기중'
            />
            <ProjectCard 
              variant='apply'
              title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
              approvalState='참가 거절'
            />
            <ProjectCard 
              variant='apply'
              title='[데이터 분석3] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
              approvalState='참가 승인'
            />
          </div>
        </TabPanel>
        {/* 2-3-3. 관심 프로젝트 */}
        <TabPanel value={value} index={2}>
          <div className="list-box flex-col">
            <ProjectCard 
              variant='favorite'
              title='[데이터 분석1] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다. 타이틀이 길어지면 말줄임표가 자동 처리됩니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
            />
            <ProjectCard 
              variant='favorite'
              title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
            />
            <ProjectCard 
              variant='favorite'
              title='[데이터 분석3] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
            />
          </div>
        </TabPanel>
        {/* 2-3-4. 참여한 프로젝트 */}
        <TabPanel value={value} index={3}>
          <div className="list-box flex-col">
            <ProjectCard 
              variant='participate'
              progressState='진행중'
              title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
            />
            <ProjectCard 
              variant='participate'
              progressState='진행완료'
              title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
            >
              <EvaluateCard 
                userID='김수빈'
                userEmail='rolling0321@naver.com'
                mannerTemperature='40'
                completeRating
              />
              <EvaluateCard 
                userID='데브헙'
                userEmail='devHub@naver.com'
                mannerTemperature='40'
              />
              <EvaluateCard 
                userID='파핑'
                userEmail='5finger@naver.com'
                mannerTemperature='40'
              />
              <EvaluateCard 
                userID='두쫀쿠'
                userEmail='dubaichoco@naver.com'
                mannerTemperature='40'
                completeRating
              />
            </ProjectCard>
            <ProjectCard 
              variant='participate'
              progressState='진행완료'
              title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
            />
          </div>
        </TabPanel>
        {/* 2-4. pagination */}
        <Pagination count={10} showFirstButton showLastButton color='primary' className='w-100 mt-a flex-center' />
      </Paper>
    </div>
  )
}

/* used components */
// 1. EvaluateCard
type EvaluateCardProps = {
  userID?: string;
  userEmail?: string;
  mannerTemperature?: string;
  completeRating?: boolean;
}

function EvaluateCard ({
  userID,
  userEmail,
  mannerTemperature,
  completeRating = false
}: EvaluateCardProps){
  return (
    <Paper className='evaluate-card flex-col' elevation={2}>
      <div className="user-info align-center">
        <div className="left-area">
          <CustomAvatar 
            sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
            avatarIcon={<Person sx={{ fontSize: 24 }} />} 
          />
        </div>
        <div className="right-area">
          <p className='user-nickname'>{userID}</p>
          <p className='user-email'>{userEmail}</p>
        </div>
      </div>
      <div className="manner-box flex-col">
        <div className="top flex-col">
          <div className="manner-text justify-between">
            <p className='text'>매너온도</p>
            <p className='manner-temperature'>{mannerTemperature}°C</p>
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
        {!completeRating ? (
          <>
            <Rating name="team-rating" defaultValue={0} precision={0.5} />
            <Button size='small' variant='contained' color='primary'>평가</Button>
          </>
        ) : (
          <>
            <Rating name="team-rating" defaultValue={2.5} disabled precision={0.5} />
            <strong className='rating-text flex-center'>평가 완료</strong>
          </>
        )}
      </div>
    </Paper>
  )
}

// 2. ProjectCard
type ProjectCardVariant = 'register' | 'apply' | 'favorite' | 'participate';
type ApprovalStateType = '승인 대기중' | '참가 승인' | '참가 거절';
type ProgressStateType = '진행중' | '진행완료';

type ProjectCardProps = {
  variant?: ProjectCardVariant;
  title?: string;
  recruitStartDate?: string;
  recruitEndDate?: string;
  progressStartDate?: string;
  progressEndDate?: string;
  currentRecriutNumber?: string;
  totalRecriutNumber?: string;
  applicantNumber?: string;
  approvalNumber?: string;
  approvalState?: ApprovalStateType;
  progressState?: ProgressStateType;
  children?: React.ReactNode;
}

function ProjectCard ({
  variant,
  title,
  recruitStartDate,
  recruitEndDate,
  progressStartDate,
  progressEndDate,
  currentRecriutNumber,
  totalRecriutNumber,
  applicantNumber,
  approvalNumber,
  approvalState,
  progressState,
  children
}: ProjectCardProps){
  // 승인 상태에 따른 텍스트 색상 변경
  const approvalColorMap = {
    '승인 대기중': 'var(--text-primary)',
    '참가 승인': 'var(--primary-main)',
    '참가 거절': 'var(--error-main)'
  } as const;

  // 내가 신청한 프로젝트 中 지원 취소 팝업
  const [openCancelPopup, setOpenCancelPopup] = useState(false);
  const clickOpenCancelPopup = () => {setOpenCancelPopup(true);}
  
  // 참여한 프로젝트 中 팀원 평가 팝업
  const [openEvaluatePopup, setOpenEvaluatePopup] = useState(false);
  const clickOpenEvaluatePopup = () => {setOpenEvaluatePopup(true);}

  return (
    <div className="project-box2 w-100 justify-between">
      <div className="left-area flex-col">
        <div className="chip-box align-center">
          { variant !== 'participate' && <Chip size='small' variant='filled' color='primary' label='모집중' /> }
          {variant === 'participate' && progressState && (
            <Chip
              size='small'
              variant='outlined'
              color={progressState === '진행중' ? 'primary' : 'success'}
              label={progressState}
            />
          )}
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
        <strong className='main-text text-ellipsis'>{title}</strong>
        <div className='sub-text align-center'>
          <div className='align-center'>
            <div className='title flex'><AccessTime />모집기간</div>
            <p className='flex'>{recruitStartDate} ~ {recruitEndDate}</p>
          </div>
          <div className='align-center'>
            <div className='title flex'><AccessTime />진행기간</div>
            <p>{progressStartDate} ~ {progressEndDate}</p>
          </div>
        </div>
      </div>
      { variant == 'register' &&
        <div className="right-area flex-col" style={{ padding: 0 }}>
          <div className="top justify-between">
            <div className='flex-col align-end'>
              <div className="count" style={{ color: 'var(--info-main)' }}>{currentRecriutNumber} / {totalRecriutNumber}</div>
              <p className='count-text'>모집인원</p>
            </div>
            <div className='flex-col align-end'>
              <div className="count">{applicantNumber}</div>
              <p className='count-text'>신청자</p>
            </div>
            <div className='flex-col align-end'>
              <div className="count">{approvalNumber}</div>
              <p className='count-text'>승인대기</p>
            </div>
          </div>
          <div className="bottom align-center">
            <Button fullWidth size='small' variant='outlined' color='primary'>신청자</Button>
            <Button fullWidth size='small' variant='outlined' color='primary'>수정</Button>
            <Button fullWidth size='small' variant='contained' color='primary'>마감</Button>
          </div>
        </div>
      }
      { variant == 'apply' && approvalState &&
        <>
          <div className="right-area flex-center" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className='w-100 flex-col align-center'>
              <div className="count" style={{ color: approvalColorMap[approvalState], padding: '1.05rem 3.5rem' }}>{approvalState}</div>
              <Button size='small' variant='outlined' color='primary' className='w-100' onClick={clickOpenCancelPopup}>신청 취소</Button>
            </div>
          </div>

          {/* 지원 취소 팝업 */}
          <WebPopup
            isOpen={openCancelPopup}
            onClose={()=>setOpenCancelPopup(false)}
            onSubmit={()=>{}}
            title='프로젝트 지원 취소'
            submitText='확인'
          >
            <div className='mypage-popup' style={{ paddingBottom: '1.6rem' }}>
              <p>정말로 지원을 취소하시겠습니까?</p>
            </div>
          </WebPopup>
        </>
      }
      { variant == 'favorite' &&
        <div className="right-area flex-center" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className='w-100 flex-col align-center'>
            {/* likeCount는 추후에 데이터와 연결해야함(현재는 임시로 숫자 넣음) */}
            <HeartButton className='ml-a' noCount defaultLiked /> 
            <Button size='small' variant='outlined' color='primary' className='w-100'>프로젝트 지원</Button>
          </div>
        </div>
      }
      { variant == 'participate' &&
        <>
          <div className="right-area align-end" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className='w-100 flex-col align-center'>
              { progressState == '진행완료' && <Button size='small' variant='outlined' color='primary' className='w-100' onClick={clickOpenEvaluatePopup}>팀원 평가</Button> }
            </div>
          </div>

         {/* 팀원 평가 팝업 */}
          <WebPopup
            size='auto'
            isOpen={openEvaluatePopup}
            onClose={()=>setOpenEvaluatePopup(false)}
            onSubmit={()=>{}}
            title='프로젝트 팀원 평가'
            submitText='저장'
          >
            <div className='mypage-popup' style={{ paddingBottom: '1.6rem' }}>
              <div className="evaluate-box">
                {children}
              </div>
            </div>
          </WebPopup>
        </>
      }
    </div>
  )
}

