import { Button, Chip, Divider, Paper } from '@mui/material';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import PasswordChangePopup from '@/components/_common/popup/PasswordChangePopup';
import SkillPopup from '@/components/_common/popup/SkillPopup';
import MyInfoBox from '@/components/design/MyInfoBox';
import FormField2 from '@/components/design/FormField2';
import FieldGroup2 from '@/components/design/FieldGroup2';
import SelectableGroup from '@/components/_common/SelectableGroup';
import useDisclosure from '@/hooks/_common/useDisclosure';
import { useCodes } from '@/contexts/CommonCodeContext.ts';

export default function MyProfileUpdate() {
  const { getCodesByGroup } = useCodes();
  const passwordChangePopup = useDisclosure();
  const skillPopup = useDisclosure();

  return (
    <div className="main-page align-stretch" style={{ minHeight: 'calc(100vh - 7rem)' }}>
      <MyInfoBox selectedKey="home" />
      <Paper className="mypage-box flex-col flex-grow" elevation={4}>
        <FormField2 label="이메일">
          <FieldGroup2 style={{ padding: '0.8rem 0 0.8rem 1.6rem' }}>email@gmail.com</FieldGroup2>
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
              <CustomTextfield placeholder="닉네임" />
              <span className="help-text">다른 사용자에게 표시되는 이름입니다</span>
            </div>
          </FieldGroup2>
          <FieldGroup2>
            <div className="flex-col">
              <CustomTextfield type="textarea" rows={1} noCountStr placeholder="자신을 소개해 주세요." />
              <span className="help-text">간단한 자기소개를 작성해 주세요</span>
            </div>
          </FieldGroup2>
        </FormField2>
        {/* 2-4. 관심 포지션 */}
        <FormField2 type={2} label="관심 포지션">
          <FieldGroup2>
            <span className="required">*</span>
            <div className="chip-box w-100 align-center flex-wrap">
              <Chip size="medium" color="default" label="Backend" clickable />
              <Chip size="medium" color="default" label="Frontend" clickable />
              <Chip size="medium" color="primary" label="Fullstack" clickable />
              <Chip size="medium" color="default" label="Mobile" clickable />
              <Chip size="medium" color="primary" label="DevOps Engineer" clickable />
              <Chip size="medium" color="default" label="Cloud Engineer" clickable />
              <Chip size="medium" color="primary" label="SRE" clickable />
              <Chip size="medium" color="default" label="UI/UX Designer" clickable />
              <Chip size="medium" color="primary" label="PM(Project/Product Manager)" clickable />
            </div>
          </FieldGroup2>
        </FormField2>
        <FormField2 type={2} label="보유 스킬">
          <FieldGroup2>
            <div className="align-start w-100" style={{ gap: '0.8rem' }}>
              <span className="required">*</span>
              <div className="chip-box w-100 align-center flex-wrap">
                <Chip size="medium" color="primary" label="JAVA" onDelete={() => {}} />
                <Chip size="medium" color="primary" label="React" onDelete={() => {}} />
                <Chip size="medium" color="primary" label="GO" onDelete={() => {}} />
                <Chip size="medium" color="primary" label="SQL" onDelete={() => {}} />
                <Chip size="medium" color="primary" label="Docker" onDelete={() => {}} />
                <Chip size="medium" color="primary" label="git" onDelete={() => {}} />
              </div>
            </div>
            <Button size="large" variant="contained" color="primary">
              +
            </Button>
          </FieldGroup2>
        </FormField2>
        <Divider />
        <div className="button-box w-100 align-center gap-12">
          <Button size="medium" variant="outlined" className="flex-1">
            취소
          </Button>
          <Button size="medium" variant="contained" className="flex-1">
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
