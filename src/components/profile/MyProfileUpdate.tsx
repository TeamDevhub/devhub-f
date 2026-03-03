import { Button, Divider, Paper } from '@mui/material';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import PasswordChangePopup from '@/components/_common/popup/PasswordChangePopup';
import SkillPopup from '@/components/_common/popup/SkillPopup';
import MyInfoBox from '@/components/profile/MyInfoBox';
import FormField2 from '@/components/profile/FormField2';
import FormFieldExtra from './FormFiledExtra';
import FieldGroup2 from '@/components/profile/FieldGroup2';
import SelectableGroup from '@/components/_common/SelectableGroup';
import useDisclosure from '@/hooks/_common/useDisclosure';
import { useCodes } from '@/contexts/CommonCodeContext.ts';
import { COMMON_CODE } from '@/types/const';
import AddableChipGroup from '@/components/_common/AddableChipGroup';
import useUpdateProfile from '@/hooks/profile/useUpdateProfile';

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
    <div className="main-page align-stretch" style={{ minHeight: 'calc(100vh - 7rem)' }}>
      <MyInfoBox selectedKey="home" />
      <Paper className="mypage-box flex-col flex-grow" elevation={4}>
        <FormField2 label="이메일">
          <FieldGroup2>
            <div className="flex-col">
              <CustomTextfield value={profile.user.email} readonly={true} />
            </div>
          </FieldGroup2>
        </FormField2>
        <FormField2 label="내 정보">
          <FieldGroup2>
            <div className="flex-col">
              <CustomTextfield value={userInfo.username} onChange={(e) => handleChange('username', e.target.value)} placeholder="닉네임" />
            </div>
          </FieldGroup2>
          <FieldGroup2>
            <div className="flex-col">
              <CustomTextfield
                type="textarea"
                rows={1}
                value={userInfo.introduction}
                onChange={(e) => handleChange('introduction', e.target.value)}
                placeholder="자기소개"
              />
            </div>
          </FieldGroup2>
        </FormField2>

        <FormFieldExtra label="관심 포지션">
          <div className="chip-box w-100 align-center flex-wrap">
            <SelectableGroup
              type="chip"
              items={getCodesByGroup(COMMON_CODE.POSITION_CODE)}
              values={userInfo.positionList}
              onToggle={createToggle('positionList')}
            />
          </div>
        </FormFieldExtra>

        <FormFieldExtra label="보유 스킬">
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
        </FormFieldExtra>

        <SkillPopup
          key={skillPopup.isOpen ? 'open' : 'close'}
          isOpen={skillPopup.isOpen}
          onClose={skillPopup.close}
          values={userInfo.skillList}
          setValues={createHandler('skillList')}
        />

        <Divider />

        <div className="button-box w-100 flex justify-end gap-12">
          <Button size="small" variant="outlined" color="primary" onClick={passwordChangePopup.open}>
            비밀번호 변경
          </Button>
          <Button size="medium" variant="contained" sx={{ minWidth: 120 }} onClick={applyUpdateProfile} disabled={loading}>
            저장
          </Button>
        </div>
      </Paper>

      <PasswordChangePopup
        isOpen={passwordChangePopup.isOpen}
        onClose={passwordChangePopup.close}
        onSubmit={({ currentPassword, newPassword }) => {
          console.log(currentPassword, newPassword);
          passwordChangePopup.close();
        }}
      />
    </div>
  );
}
