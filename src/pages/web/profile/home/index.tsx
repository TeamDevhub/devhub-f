import { Chip, Divider, Paper } from '@mui/material';
import MyInfoBox from '@/components/design/MyInfoBox';
import InfoFieldBox from '@/components/profile/InfoFiledBox';
import ListBox from '@/components/profile/ListBox';
import useSelectUserProfile from '@/hooks/profile/useSelectUserProfile';
import { COMMON_CODE } from '@/types/const';
import { useCodes } from '@/contexts/CommonCodeContext.ts';

import type { ListCardProps } from '@/components/profile/ListCard';

export default function MyProfile() {
  const { getCodeName } = useCodes();
  const { res } = useSelectUserProfile();
  const profile = res?.data;

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
          <InfoFieldBox label="닉네임">{profile?.user.username}</InfoFieldBox>
          <InfoFieldBox label="이메일">{profile?.user.email}</InfoFieldBox>
          <InfoFieldBox label="내 소개">{profile?.user.introduction || '-'}</InfoFieldBox>

          <InfoFieldBox label="관심 포지션">
            <div className="recruit-chip-box align-center">
              {profile?.positionList?.map((position, index) => (
                <Chip key={index} variant="outlined" color="primary" size="small" label={getCodeName(COMMON_CODE.POSITION_CODE, position)} />
              ))}
            </div>
          </InfoFieldBox>

          <InfoFieldBox label="보유 기술">
            <div className="tech-chip-box align-center flex-wrap">
              {profile?.skillList?.map((skill, index) => (
                <Chip key={index} variant="outlined" color="secondary" size="small" label={getCodeName(COMMON_CODE.SKILL_CODE, skill)} />
              ))}
            </div>
          </InfoFieldBox>
        </div>

        {/* 내 프로젝트 */}
        <div className="bottom flex-col">
          {registerProjects.length > 0 && (
            <>
              <Divider />
              <ListBox variant="register" listTitle="내가 등록한 프로젝트" items={registerProjects} />
            </>
          )}

          {applyProjects.length > 0 && (
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
