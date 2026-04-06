import { Chip, Divider, Paper } from '@mui/material';
import MyProfileBaseForm from '@/components/profile/home/MyProfileBaseForm';
import MyProfileListBox from '@/components/profile/home/MyProfileListBox';
import useSelectUserProfile from '@/hooks/profile/useSelectProfile';
import useSelectMyProjects from '@/hooks/profile/useSelectMyProjects';
import { COMMON_CODE } from '@/types/const';
import { useCodes } from '@/contexts/CommonCodeContext';
import type { MyProject } from '@/types/type.projects';

export default function MyProfileHome() {
  const { getCodeName } = useCodes();
  const { res } = useSelectUserProfile();
  const { res:projectRes, loading, error, setPage, handleTabChange } = useSelectMyProjects();
  const profile = res?.data;

  const registerProjects: MyProject[] = [
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

  const applyProjects: MyProject[] = [
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
    <Paper className="mypage-box flex-col flex-1" elevation={4}>
      {/* 내 정보 */}
      <div className="top flex-col">
        <MyProfileBaseForm label="닉네임">{profile?.user.username}</MyProfileBaseForm>
        <MyProfileBaseForm label="이메일">{profile?.user.email}</MyProfileBaseForm>
        <MyProfileBaseForm label="내 소개">{profile?.user.introduction || '-'}</MyProfileBaseForm>
        <MyProfileBaseForm label="관심 포지션">
          <div className="recruit-chip-box align-center">
            {profile?.positionList?.map((position, index) => (
              <Chip key={index} size="small" variant="outlined" color="primary" label={getCodeName(COMMON_CODE.POSITION_CODE, position)} />
            ))}
          </div>
        </MyProfileBaseForm>

        <MyProfileBaseForm label="보유 기술">
          <div className="tech-chip-box align-center flex-wrap">
            {profile?.skillList?.map((skill, index) => (
              <Chip key={index} size="small" variant="outlined" color="secondary" label={getCodeName(COMMON_CODE.SKILL_CODE, skill)} />
            ))}
          </div>
        </MyProfileBaseForm>
      </div>

      {(registerProjects.length > 0 || applyProjects.length > 0) && <Divider />}

      {/* 프로젝트 목록 */}
      <div className="bottom flex-col">
        {registerProjects.length > 0 && <MyProfileListBox variant="register" listTitle="내가 등록한 프로젝트" items={registerProjects} />}

        {applyProjects.length > 0 && <MyProfileListBox variant="apply" listTitle="내가 신청한 프로젝트" items={applyProjects} />}
      </div>
    </Paper>
  );
}
