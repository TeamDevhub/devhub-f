import { Chip, Divider, Paper } from '@mui/material';
import MyProfileBaseForm from '@/components/web/profile/MyProfileBaseForm';
import MyProfileListBox from '@/components/web/profile/MyProfileListBox';
import useSelectUserProfile from '@/hooks/web/profile/user/useSelectProfile';
import useSelectApplyProjects from '@/hooks/web/profile/project/useSelectApplyProjects';
import useSelectMyProjects from '@/hooks/web/profile/project/useSelectMyProjects';
import { COMMON_CODE } from '@/constants/codes';
import { useCodes } from '@/contexts/CommonCodeContext';
import type { MyProject } from '@/types/type.projects';

export default function MyProfileHome() {
  const { getCodeName } = useCodes();
  const { res } = useSelectUserProfile();
  const { res: projectRes } = useSelectMyProjects();
  const { res: applyRes } = useSelectApplyProjects();
  const profile = res?.data;

  return (
    <Paper className="mypage-box flex-col flex-1" elevation={4}>
      {/* 내 정보 */}
      <div className="top flex-col">
        <MyProfileBaseForm label="닉네임">{profile?.user.username}</MyProfileBaseForm>
        {/* <MyProfileBaseForm label="이메일">{profile?.user.email}</MyProfileBaseForm> */}
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

      {(projectRes?.dataList?.length > 0 || applyRes?.dataList?.length > 0) && <Divider />}

      {/* 프로젝트 목록 */}
      <div className="bottom flex-col">
        {projectRes?.dataList?.length > 0 && <MyProfileListBox variant="register" listTitle="내가 등록한 프로젝트" items={projectRes?.dataList} />}

        {applyRes?.dataList?.length > 0 && <MyProfileListBox variant="apply" listTitle="내가 신청한 프로젝트" items={applyRes?.dataList} />}
      </div>
    </Paper>
  );
}
