import { Button, Divider, Paper } from '@mui/material';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import PasswordChangePopup from '@/components/_common/popup/PasswordChangePopup';
import SkillPopup from '@/components/_common/popup/SkillPopup';
import MyProfileUpdateBaseForm from './MyProfileUpdateBaseForm';
import MyProfileUpdateExtraForm from './MyProfileUpdateExtraForm';
import MyProfileUpdateFieldGroup from './MyProfileUpdateFieldGroup';
import SelectableGroup from '@/components/_common/SelectableGroup';
import useDisclosure from '@/hooks/_common/useDisclosure';
import { useCodes } from '@/contexts/CommonCodeContext';
import { COMMON_CODE } from '@/types/const';
import AddableChipGroup from '@/components/_common/AddableChipGroup';
import useUpdateProfile from '@/hooks/profile/user/useUpdateProfile';

import type { UserDetailResponse } from '@/types/type.user';

interface MyProfileUpdateProps {
  profile: UserDetailResponse;
}

export default function MyProfileUpdate({ profile }: MyProfileUpdateProps) {
  const { getCodesByGroup } = useCodes();
  const passwordChangePopup = useDisclosure();
  const skillPopup = useDisclosure();

  const { userInfo, handleChange, createToggle, createHandler, applyUpdateProfile, loading } = useUpdateProfile(profile);

  return (
    <>
      <Paper className="mypage-box flex-col flex-1" elevation={4}>
        {/* 이메일 */}
        {/* <MyProfileUpdateBaseForm label="이메일">
          <MyProfileUpdateFieldGroup>
            <div className="flex-col">
              <CustomTextfield value={profile.user.email} readonly />
            </div>
          </MyProfileUpdateFieldGroup>
        </MyProfileUpdateBaseForm> */}

        {/* 기본 정보 */}
        <MyProfileUpdateBaseForm label="내 정보">
          <MyProfileUpdateFieldGroup>
            <div className="flex-col">
              <CustomTextfield value={userInfo.username} onChange={(e) => handleChange('username', e.target.value)} placeholder="닉네임" />
            </div>
          </MyProfileUpdateFieldGroup>

          <MyProfileUpdateFieldGroup>
            <div className="flex-col">
              <CustomTextfield
                type="textarea"
                rows={1}
                value={userInfo.introduction}
                onChange={(e) => handleChange('introduction', e.target.value)}
                placeholder="자기소개"
              />
            </div>
          </MyProfileUpdateFieldGroup>
        </MyProfileUpdateBaseForm>

        {/* 관심 포지션 */}
        <MyProfileUpdateExtraForm label="관심 포지션">
          <div className="chip-box w-100 align-center flex-wrap">
            <SelectableGroup
              type="chip"
              items={getCodesByGroup(COMMON_CODE.POSITION_CODE)}
              values={userInfo.positionList}
              onToggle={createToggle('positionList')}
            />
          </div>
        </MyProfileUpdateExtraForm>

        {/* 보유 스킬 */}
        <MyProfileUpdateExtraForm label="보유 스킬">
          <div className="content-box align-stretch">
            <div className="chip-box align-center flex-wrap" style={{ flex: 1, minHeight: '56px' }}>
              <AddableChipGroup
                values={userInfo.skillList}
                CodeName={COMMON_CODE.SKILL_CODE}
                onDelete={(v) => createToggle('skillList')(v)}
                onAdd={skillPopup.open}
              />
            </div>
          </div>
        </MyProfileUpdateExtraForm>

        <SkillPopup
          key={skillPopup.isOpen ? 'open' : 'close'}
          isOpen={skillPopup.isOpen}
          onClose={skillPopup.close}
          values={userInfo.skillList}
          setValues={createHandler('skillList')}
        />

        <Divider />

        {/* 버튼 영역 */}
        <div className="button-box w-100 flex justify-end gap-12">
          <Button size="medium" variant="outlined" color="primary" onClick={passwordChangePopup.open}>
            비밀번호 변경
          </Button>

          <Button size="medium" variant="contained" sx={{ minWidth: 120 }} onClick={applyUpdateProfile} disabled={loading}>
            저장
          </Button>
        </div>
      </Paper>

      {/* 비밀번호 변경 팝업 */}
      <PasswordChangePopup isOpen={passwordChangePopup.isOpen} onClose={passwordChangePopup.close} />
    </>
  );
}
