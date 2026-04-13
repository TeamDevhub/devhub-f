import logo from '@/assets/images/devHub-logo.png';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import SkillPopup from '@/components/_common/popup/SkillPopup';
import TermsPopup from '@/components/_common/popup/TermsPopup';
import FieldBox from './FieldBox';
import useDisclosure from '@/hooks/_common/useDisclosure';
import useSignup from '@/hooks/signup/useSignup';
import { COMMON_CODE } from '@/types/const';
import { BadgeOutlined, Favorite, Gavel, LockOutline, PersonOutlined, Settings } from '@mui/icons-material';
import { Button, Divider, Paper, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import SelectableGroup from '@/components/_common/SelectableGroup';
import { FormSection } from './FormSection';
import AddableChipGroup from '../_common/AddableChipGroup';
import { useCodes } from '@/contexts/CommonCodeContext.ts';
import useTerms from '@/hooks/terms/useTerms';
import { useState } from 'react';

import type { TermsResponse } from '@/types/type.terms';

interface Props {
  email?: string;
  tempToken?: string;
}

export default function UserInfoPage({ email, tempToken }: Props) {
  const { getCodesByGroup } = useCodes();
  const { userInfo, handleChange, createToggle, createHandler, applySignup, loading } = useSignup({ email, tempToken });
  const { terms, toggleTerms, agreeAllTerms, isAllChecked, isRequiredValid, getAgreementList } = useTerms();
  const [selectedTerms, setSelectedTerms] = useState<TermsResponse | null>(null);

  const skillPopup = useDisclosure();
  const termsPopup = useDisclosure();

  const isOauthUser = !!tempToken;

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
          {!isOauthUser && (
            <div className="field-box flex-col">
              <div className="field-title align-center">
                <BadgeOutlined sx={{ fontSize: 20, color: 'var(--primary-main)' }} />
                <p>ID</p>
              </div>
              <div className="field-content flex-col">
                <TextField value={email} fullWidth disabled />
              </div>
            </div>
          )}

          {/* 비밀번호 */}
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

          {/* 포지션 */}
          <FieldBox title="관심 포지션" icon={<Favorite sx={{ fontSize: 20, color: 'var(--primary-main)' }} />} type="wide" helpText="관심 포지션은 필수로 선택해야합니다.">
            <div className="chip-box w-100 align-center flex-wrap">
              <SelectableGroup
                type="chip"
                items={getCodesByGroup(COMMON_CODE.POSITION_CODE)}
                values={userInfo.positionList}
                onToggle={createToggle('positionList')}
              />
            </div>
          </FieldBox>

          {/* 스킬 */}
          <FormSection title="보유 스킬" icon={<Settings sx={{ fontSize: 20, color: 'var(--primary-main)' }} />} className="field-box2" contentGap="0.5rem">
            <div className="content-box align-stretch">
              <div className="chip-box align-center flex-wrap" style={{ flex: 1, minHeight: '56px' }}>
                <AddableChipGroup
                  values={userInfo.skillList}
                  CodeName={COMMON_CODE.SKILL_CODE}
                  onDelete={(value) => createToggle('skillList')(value)}
                  onAdd={() => skillPopup.toggle()}
                />
              </div>
            </div>
          </FormSection>

          <SkillPopup
            key={skillPopup.isOpen ? 'open' : 'close'}
            isOpen={skillPopup.isOpen}
            onClose={skillPopup.close}
            values={userInfo.skillList}
            setValues={createHandler('skillList')}
          />

          {/* 약관 */}
          <FieldBox title="약관 동의" icon={<Gavel sx={{ fontSize: 20, color: 'var(--primary-main)' }} />} type="wide">
            <div className="flex-col" style={{ gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>
                <input type="checkbox" checked={isAllChecked} onChange={(e) => agreeAllTerms(e.target.checked)} />
                전체 동의
              </label>

              <Divider />

              {terms.map((t) => (
                <div
                  key={t.termsGuid}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <label style={{ display: 'flex', gap: '0.4rem' }}>
                    <input type="checkbox" checked={t.agreed} onChange={() => toggleTerms(t.termsGuid)} />
                    <span>
                      {t.title} {t.required && <span style={{ color: 'red' }}>(필수)</span>}
                    </span>
                  </label>

                  <span
                    style={{ cursor: 'pointer', fontWeight: 600 }}
                    onClick={() => {
                      setSelectedTerms(t);
                      termsPopup.open();
                    }}
                  >
                    &gt;
                  </span>
                </div>
              ))}
            </div>
          </FieldBox>

          <Divider sx={{ marginY: '0.5rem' }} />

          <Button size="large" variant="contained" fullWidth onClick={() => applySignup(getAgreementList())} disabled={!isRequiredValid || loading}>
            {loading ? '가입 중...' : '회원가입'}
          </Button>
        </Paper>

        <TermsPopup
          isOpen={termsPopup.isOpen}
          terms={selectedTerms}
          onClose={() => {
            termsPopup.close();
            setSelectedTerms(null);
          }}
        />
      </div>
    </div>
  );
}
