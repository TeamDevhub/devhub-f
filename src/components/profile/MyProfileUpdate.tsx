import { Button, Divider, Paper } from '@mui/material';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import PasswordChangePopup from '@/components/_common/popup/PasswordChangePopup';
import InfoFieldBox from '@/components/profile/InfoFiledBox';
import SkillPopup from '@/components/_common/popup/SkillPopup';
import MyInfoBox from '@/components/design/MyInfoBox';
import FormField2 from '@/components/design/FormField2';
import FieldGroup2 from '@/components/design/FieldGroup2';
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
          <FieldGroup2 style={{ padding: '0.8rem 0 0.8rem 1.6rem' }}></FieldGroup2>
          {profile.user.email}
        </FormField2>
        <FormField2 label="비밀번호">
          <FieldGroup2>
            <Button size="small" variant="outlined" color="primary" onClick={passwordChangePopup.open}>
              비밀번호 변경
            </Button>
          </FieldGroup2>
        </FormField2>
        <FormField2 label="프로필">
          <FieldGroup2>
            <span className="required">*</span>
            <div className="flex-col">
              <CustomTextfield value={userInfo.username} onChange={(e) => handleChange('username', e.target.value)} placeholder="닉네임" />
              <span className="help-text">다른 사용자에게 표시되는 이름입니다</span>
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
              <span className="help-text">간단한 자기소개를 작성해 주세요</span>
            </div>
          </FieldGroup2>
        </FormField2>

        <InfoFieldBox label="관심 포지션">
          <div className="chip-box w-100 align-center flex-wrap">
            <SelectableGroup
              type="chip"
              items={getCodesByGroup(COMMON_CODE.POSITION_CODE)}
              values={userInfo.positionList}
              onToggle={createToggle('positionList')}
            />
          </div>
        </InfoFieldBox>

        <InfoFieldBox label="보유 기술">
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
        </InfoFieldBox>

        <SkillPopup
          key={skillPopup.isOpen ? 'open' : 'close'}
          isOpen={skillPopup.isOpen}
          onClose={skillPopup.close}
          values={userInfo.skillList}
          setValues={createHandler('skillList')}
        />

        <Divider />
        <div className="button-box w-100 align-center gap-12">
          <Button size="medium" variant="outlined" className="flex-1">
            취소
          </Button>
          <Button variant="contained" onClick={applyUpdateProfile} disabled={loading}>
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
