import { Chip, Divider, Paper } from '@mui/material';
import MyInfoBox from '@/components/design/MyInfoBox';
import InfoFieldBox from '@/components/profile/InfoFiledBox';
import ListBox from '@/components/profile/ListBox';
import type { ListCardProps } from '@/components/profile/ListCard';

export interface MyProfileProps {
  hasRegisterProject?: boolean;
  hasApplyProject?: boolean;
}

export default function MyProfile({ hasRegisterProject = true, hasApplyProject = true }: MyProfileProps) {
  const registerProjects: ListCardProps[] = [
    {
      title: '[데이터 분석1] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.',
      recruitmentStartDate: '2025.12.03',
      recruitmentEndDate: '2026.02.03',
      progressStartDate: '2025.12.03',
      progressEndDate: '2026.02.03',
      currentRecriutNumber: '1',
      totalRecriutNumber: '25',
      applicantNumber: '10',
      approvalNumber: '10',
    },
    {
      title: '[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.',
      recruitmentStartDate: '2025.12.03',
      recruitmentEndDate: '2026.02.03',
      progressStartDate: '2025.12.03',
      progressEndDate: '2026.02.03',
      currentRecriutNumber: '1',
      totalRecriutNumber: '25',
      applicantNumber: '10',
      approvalNumber: '10',
    },
  ];

  const applyProjects: ListCardProps[] = [
    {
      title: '[데이터 분석1] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.',
      recruitmentStartDate: '2025.12.03',
      recruitmentEndDate: '2026.02.03',
      progressStartDate: '2025.12.03',
      progressEndDate: '2026.02.03',
      approvalState: '승인 대기중',
    },
    {
      title: '[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.',
      recruitmentStartDate: '2025.12.03',
      recruitmentEndDate: '2026.02.03',
      progressStartDate: '2025.12.03',
      progressEndDate: '2026.02.03',
      approvalState: '참가 승인',
    },
    {
      title: '[데이터 분석3] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.',
      recruitmentStartDate: '2025.12.03',
      recruitmentEndDate: '2026.02.03',
      progressStartDate: '2025.12.03',
      progressEndDate: '2026.02.03',
      approvalState: '참가 거절',
    },
  ];

  return (
    <div className="main-page align-stretch" style={{ minHeight: 'calc(100vh - 7rem)' }}>
      <MyInfoBox selectedKey="home" />

      <Paper className="mypage-box flex-col flex-grow flex-1" elevation={4}>
        {/* 내 정보 */}
        <div className="top flex-col">
          <InfoFieldBox label="닉네임">홍길동</InfoFieldBox>
          <InfoFieldBox label="이메일">email@gmail.com</InfoFieldBox>
          <InfoFieldBox label="내 소개">안녕하세요! 김민수입니다. 데이터 분석을 기반으로 매출 증대에 기여하고 싶습니다.</InfoFieldBox>

          <InfoFieldBox label="관심 포지션">
            <Chip size="small" variant="outlined" color="primary" label="PL" />
            <Chip size="small" variant="outlined" color="primary" label="UI" />
            <Chip size="small" variant="outlined" color="primary" label="프론트엔드" />
          </InfoFieldBox>

          <InfoFieldBox label="보유 기술">
            <Chip size="small" variant="outlined" color="secondary" label="React" />
            <Chip size="small" variant="outlined" color="secondary" label="JAVA" />
            <Chip size="small" variant="outlined" color="secondary" label="SQL" />
          </InfoFieldBox>
        </div>

        {/* 내 프로젝트 */}
        <div className="bottom flex-col">
          {hasRegisterProject && (
            <>
              <Divider />
              <ListBox variant="register" listTitle="내가 등록한 프로젝트" items={registerProjects} />
            </>
          )}

          {hasApplyProject && (
            <>
              <Divider />
              <ListBox variant="apply" listTitle="내가 신청한 프로젝트" items={applyProjects} />
            </>
          )}
        </div>
      </Paper>
    </div>
  );
}
