import logo from '@/assets/images/devHub-logo.png';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import SkillPopup from '@/components/_common/popup/SkillPopup';
import FieldBox from './FieldBox';
import { useDisclosure } from '@/hooks/_common/useDisclosure';
import useSignup from '@/hooks/signup/useSignup';
import { COMMON_CODE } from '@/types/const';
import { getCodesByGroup } from '@/utils/util._common';
import { LockOutline, PersonOutlined } from '@mui/icons-material';
import { Button, Divider, Paper, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import SelectableGroup from '@/components/_common/SelectableGroup';
import { FormSection } from './FormSection';
import AddableChipGroup from '../_common/AddableChipGroup';

interface Props {
  email: string;
}

export default function UserInfoPage({ email }: Props) {
  const skillPopup = useDisclosure();
  const { userInfo, handleChange, createToggle, createHandler, applySignup, loading } = useSignup(email);

  return (
    <div className="auth-page flex-center">
      <div className="flex-col" style={{ gap: '0.8rem' }}>
        <div className="auth-logo-box">
          <Link to="/" className="align-center">
            <img src={logo} alt="devHub logo icon" className="logo-icon" />
            <span className="logo-text">DevHub</span>
          </Link>
        </div>

        <Paper className="auth-box flex-col" elevation={4}>
          <div className="text-box flex-col">
            <strong>계정 만들기</strong>
            <p>DevHub에서 함께 성장할 준비 되셨나요?</p>
          </div>

          <Divider />
          {/* ID */}
          <div className="field-box flex-col">
            <div className="field-title align-center">
              <p>ID</p>
            </div>
            <div className="field-content flex-col">
              <TextField value={email} fullWidth disabled />
            </div>
          </div>

          {/* 비밀번호 설정 */}
          <FormSection title="비밀번호 설정" icon={<LockOutline sx={{ fontSize: 20, color: 'var(--primary-main)' }} />}>
            <CustomTextfield
              type="password"
              placeholder="특수문자, 숫자 포함 10자 이상"
              value={userInfo.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
            <CustomTextfield
              type="password"
              placeholder="비밀번호 확인"
              value={userInfo.passwordConfirm}
              onChange={(e) => handleChange('passwordConfirm', e.target.value)}
            />
          </FormSection>

          {/* 프로필 */}
          <FormSection title="프로필" icon={<PersonOutlined sx={{ fontSize: 20, color: 'var(--primary-main)' }} />} contentGap="0.5rem">
            <CustomTextfield placeholder="닉네임" value={userInfo.username} onChange={(e) => handleChange('username', e.target.value)} />
            <span className="help-text">다른 사용자에게 표시되는 이름입니다</span>

            <CustomTextfield
              type="textarea"
              rows={2}
              placeholder="자신을 소개해 주세요."
              value={userInfo.introduction}
              onChange={(e) => handleChange('introduction', e.target.value)}
            />
          </FormSection>

          {/* 관심 포지션 */}
          <FieldBox title="관심 포지션" type="wide" helpText="관심 포지션은 필수로 선택해야합니다.">
            <div className="chip-box w-100 align-center flex-wrap">
              <SelectableGroup
                type="chip"
                items={getCodesByGroup(COMMON_CODE.POSITION_CODE)}
                values={userInfo.positionList}
                onToggle={createToggle('positionList')}
              />
            </div>
          </FieldBox>

          {/* 기술스택 */}
          <FormSection title="보유 스킬" className="field-box2" contentGap="0.5rem">
            <div className="content-box align-stretch">
              <div className="chip-box align-center flex-wrap" style={{ flex: 1, minHeight: '56px' }}>
                <AddableChipGroup
                  values={userInfo.skillList}
                  items={getCodesByGroup(COMMON_CODE.SKILL_CODE)}
                  onDelete={(value) => createToggle('skillList')(value)}
                  onAdd={() => skillPopup.toggle()}
                />
              </div>
            </div>
          </FormSection>

          <SkillPopup isOpen={skillPopup.isOpen} onClose={skillPopup.close} values={userInfo.skillList} setValues={createHandler('skillList')} />

          <Divider sx={{ marginY: '0.5rem' }} />

          <Button size="large" variant="contained" fullWidth onClick={applySignup} disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </Button>
        </Paper>
      </div>
    </div>
  );
}
