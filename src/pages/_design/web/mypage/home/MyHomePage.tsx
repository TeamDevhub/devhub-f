import CustomAvatar from '@/components/_common/customMUI/CustomAvatar'
import { AccessTime, ArrowForwardIos, Email, Favorite, InfoOutline, LocationOn, Person, Settings } from '@mui/icons-material'
import { Button, Chip, Divider, Paper } from '@mui/material'
import MyInfoBox from '@/components/_design/MyInfoBox'
import React from 'react'

export interface MyPageHomeProps { // 데이터가 없을 때, Divider가 안 보여야 해서 임시로 설정해둠
  hasRegisterProject?: boolean;
  hasApplyProject?: boolean;
}

export default function MyHomePage({
  hasRegisterProject = true, 
  hasApplyProject = true,
}: MyPageHomeProps){
  return (
    <div className='main-page align-stretch' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      {/* 1. left area */}
      <MyInfoBox selectedKey='home' />
      {/* 2. right area */}
      <Paper className='mypage-box flex-col flex-grow flex-1' elevation={4}>
        {/* 2-1. 내 정보 */}
        <div className="top flex-col">
          <InfoFieldBox label='닉네임'>홍길동</InfoFieldBox>
          <InfoFieldBox label='이메일'>email@gmail.com</InfoFieldBox>
          <InfoFieldBox label='내 소개'>
            안녕하세요! 김민수입니다. 저는 마케팅 전략 수립 분야에 깊은 관심을 가지고 있으며, 특히 데이터 분석 능력을 바탕으로 매출 증대에 기여하고 싶습니다. 잘 부탁드립니다!
          </InfoFieldBox>
          <InfoFieldBox label='관심 포지션'>
            <Chip size='small' variant='outlined' color='primary' label='PL' />
            <Chip size='small' variant='outlined' color='primary' label='UI' />
            <Chip size='small' variant='outlined' color='primary' label='디자인' />
            <Chip size='small' variant='outlined' color='primary' label='CI/CD' />
            <Chip size='small' variant='outlined' color='primary' label='프론트엔드' />
            <Chip size='small' variant='outlined' color='primary' label='데이터분석' />
            <Chip size='small' variant='outlined' color='primary' label='백엔드' />
          </InfoFieldBox>
          <InfoFieldBox label='보유 기술'>
            <Chip size='small' variant='outlined' color='secondary' label='CSS' />
            <Chip size='small' variant='outlined' color='secondary' label='JS' />
            <Chip size='small' variant='outlined' color='secondary' label='React' />
            <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
            <Chip size='small' variant='outlined' color='secondary' label='SQL' />
          </InfoFieldBox>
        </div>
        {/* 2-2. 내 프로젝트 */}
        <div className="bottom flex-col">
          {/* 2-2-1. 내가 등록한 프로젝트 */}
          { hasRegisterProject && 
            <>
              <Divider />
              <ListBox variant='register' listTitle='내가 등록한 프로젝트'>
                <ListCard 
                  title='[데이터 분석1] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다. 많은 관심과 사랑 부탁드립니다.'
                  recruitmentStartDate='2025.12.03'
                  recruitmentEndDate='2026.02.03'
                  progressStartDate='2025.12.03'
                  progressEndDate='2026.02.03'
                  currentRecriutNumber='1'
                  totalRecriutNumber='25'
                  applicantNumber='10'
                  approvalNumber='10'
                />
                <ListCard 
                  title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
                  recruitmentStartDate='2025.12.03'
                  recruitmentEndDate='2026.02.03'
                  progressStartDate='2025.12.03'
                  progressEndDate='2026.02.03'
                  currentRecriutNumber='1'
                  totalRecriutNumber='25'
                  applicantNumber='10'
                  approvalNumber='10'
                />
                <ListCard 
                  title='[데이터 분석3] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
                  recruitmentStartDate='2025.12.03'
                  recruitmentEndDate='2026.02.03'
                  progressStartDate='2025.12.03'
                  progressEndDate='2026.02.03'
                  currentRecriutNumber='1'
                  totalRecriutNumber='25'
                  applicantNumber='10'
                  approvalNumber='10'
                />
              </ListBox>
            </>
          }
          {/* 2-2-2. 내가 신청한 프로젝트 */}
          { hasApplyProject && 
            <>
              <Divider />
              <ListBox variant='apply' listTitle='내가 신청한 프로젝트'>
                <ListCard 
                  title='[데이터 분석1] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다. 많은 관심과 사랑 부탁드립니다.'
                  recruitmentStartDate='2025.12.03'
                  recruitmentEndDate='2026.02.03'
                  progressStartDate='2025.12.03'
                  progressEndDate='2026.02.03'
                  approvalState='승인 대기중'
                />
                <ListCard 
                  title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
                  recruitmentStartDate='2025.12.03'
                  recruitmentEndDate='2026.02.03'
                  progressStartDate='2025.12.03'
                  progressEndDate='2026.02.03'
                  approvalState='참가 승인'
                />
                <ListCard 
                  title='[데이터 분석3] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
                  recruitmentStartDate='2025.12.03'
                  recruitmentEndDate='2026.02.03'
                  progressStartDate='2025.12.03'
                  progressEndDate='2026.02.03'
                  approvalState='참가 거절'
                />
              </ListBox>
            </>
          }
        </div>
      </Paper>
    </div>
  )
}

/* used components */
// 1. InfoFieldBox
type fieldLabel = '닉네임' | '이메일' | '내 소개' | '관심 포지션' | '보유 기술';

type InfofieldBoxProps = {
  label: fieldLabel;
  children?: React.ReactNode;
} 

function InfoFieldBox ({
  label,
  children
}: InfofieldBoxProps){
  // renderIcon
  const renderIcon = (fieldLabel: fieldLabel) => {
    const iconProps = { sx: { fontSize: 24, color: 'primary.main' } };

    switch (fieldLabel) {
      case '닉네임':
        return <Person {...iconProps} />;
      case '이메일':
        return <Email {...iconProps} />;
      case '내 소개':
        return <InfoOutline {...iconProps} />; 
      case '관심 포지션':
        return <Favorite {...iconProps} />; 
      case '보유 기술':
        return <Settings {...iconProps} />; 
      default:
        return null;
    }
  };

  return (
    <div className='flex align-center'>
      <div className="label-area align-center">
        {renderIcon(label)}
        <p>{label}</p>
      </div>
      <div className="field-area flex flex-wrap">{children}</div>
    </div>
  )
}

// 2. ListBox
type ListBoxVariant = 'register' | 'apply';

type ListBoxProps = {
  listTitle?: string;
  variant: ListBoxVariant;
  children?: React.ReactNode;
}

function ListBox({
  listTitle,
  variant,
  children
}: ListBoxProps) {
  return (
    <div className="list-box flex-col">
      <div className="list-top align-center justify-between">
        <strong className="title">{listTitle}</strong>
        <Button size="small" endIcon={<ArrowForwardIos />}>
          전체보기
        </Button>
      </div>
      <div className="list-bottom flex-col">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<ListCardProps>(child)) return child;
          return React.cloneElement(child, {
            variant
          });
        })}
      </div>
    </div>
  );
}

// 3. ListCard
type ListCardVariant = 'register' | 'apply';
type ApprovalStateType = '승인 대기중' | '참가 승인' | '참가 거절';

type ListCardProps = {
  variant?: ListCardVariant;
  title?: string;
  recruitmentStartDate?: string;
  recruitmentEndDate?: string;
  progressStartDate?: string;
  progressEndDate?: string;
  currentRecriutNumber?: string;
  totalRecriutNumber?: string;
  applicantNumber?: string;
  approvalNumber?: string;
  approvalState?: ApprovalStateType;
}

function ListCard ({
  variant,
  title,
  recruitmentStartDate,
  recruitmentEndDate,
  progressStartDate,
  progressEndDate,
  currentRecriutNumber,
  totalRecriutNumber,
  applicantNumber,
  approvalNumber,
  approvalState
}: ListCardProps){
  // 승인 상태에 따른 텍스트 색상 변경
  const approvalColorMap = {
    '승인 대기중': 'var(--text-primary)',
    '참가 승인': 'var(--primary-main)',
    '참가 거절': 'var(--error-main)'
  } as const;

  return (
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
        <strong className='main-text text-ellipsis'>{title}</strong>
        <div className='sub-text align-center'>
          <div className='align-center'>
            <div className='title flex'><AccessTime />모집기간</div>
            <p className='flex'>{recruitmentStartDate} ~ {recruitmentEndDate}</p>
          </div>
          <div className='align-center'>
            <div className='title flex'><AccessTime />진행기간</div>
            <p>{progressStartDate} ~ {progressEndDate}</p>
          </div>
        </div>
      </div>
      { variant == 'register' &&
        <div className="right-area align-center">
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
      }
      {variant === 'apply' && approvalState && (
        <div className="right-area flex-center">
          <div className="flex-col align-center">
            <p className="count-text">승인상태</p>
            <div
              className="count"
              style={{ color: approvalColorMap[approvalState] }}
            >
              {approvalState}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
