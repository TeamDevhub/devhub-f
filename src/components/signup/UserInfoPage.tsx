import logo from '@/assets/images/devHub-logo.png';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import useSignup from '@/hooks/signup/useSignup';
import SkillPopup from '@/components/_common/popup/SkillPopup';
import PositionGroup from '@/components/signup/PositionGroup';
import { useDisclosure } from '@/hooks/_common/useDisclosure';
import { getCodeName, getCodesByGroup } from '@/utils/util._common';
import { COMMON_CODE } from '@/types/const';

import { AddCircle } from '@mui/icons-material';
import { LockOutline, PersonOutlined } from '@mui/icons-material';
import { Button, Chip, Divider, Paper, TextField, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import SelectableGroup from './../_common/SelectableGroup';

interface Props {
  email: string;
}

export default function UserInfoPage({ email }: Props) {
  const skillPopup = useDisclosure();
  const { userInfo, changeUserInfo, toggleArrayValue, applySignup, loading } = useSignup(email);

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
          <div className="field-box flex-col">
            <div className="field-title align-center">
              <LockOutline sx={{ fontSize: 20, color: 'var(--primary-main)' }} />
              <p>비밀번호 설정</p>
            </div>
            <div className="field-content flex-col">
              <CustomTextfield
                type="password"
                placeholder="특수문자, 숫자 포함 10자 이상"
                value={userInfo.password}
                onChange={(e) => changeUserInfo('password', e.target.value)}
              />
              <CustomTextfield
                type="password"
                placeholder="비밀번호 확인"
                value={userInfo.passwordConfirm}
                onChange={(e) => changeUserInfo('passwordConfirm', e.target.value)}
              />
            </div>
          </div>

          {/* 프로필 */}
          <div className="field-box flex-col">
            <div className="field-title align-center">
              <PersonOutlined sx={{ fontSize: 20, color: 'var(--primary-main)' }} />
              <p>프로필</p>
            </div>
            <div className="field-content flex-col" style={{ gap: '0.5rem' }}>
              <CustomTextfield placeholder="닉네임" value={userInfo.username} onChange={(e) => changeUserInfo('username', e.target.value)} />
              <span className="help-text">다른 사용자에게 표시되는 이름입니다</span>

              <CustomTextfield
                type="textarea"
                rows={2}
                placeholder="자신을 소개해 주세요."
                value={userInfo.introduction}
                onChange={(e) => changeUserInfo('introduction', e.target.value)}
              />
            </div>
          </div>

          {/* 관심 포지션 */}
          <div className="field-box2 flex-col">
            <div className="field-title align-center">
              <p>관심 포지션</p>
            </div>

            <div className="field-content flex-col" style={{ gap: '0.5rem' }}>
              <div className="chip-box w-100 align-center flex-wrap">
                <SelectableGroup
                  items={getCodesByGroup(COMMON_CODE.POSITION_CODE)}
                  onToggle={(v)=>{toggleArrayValue('positionList', v)}}
                  type='chip'
                  values={userInfo.positionList}
                />
              </div>

              <span className="help-text">관심 포지션은 필수로 선택해야합니다.</span>
            </div>
          </div>
          <PositionGroup positionList={userInfo.positionList} onChange={(values) => changeUserInfo('positionList', values)} />

          {/* 기술스택 */}
          <div className="field-box2 flex-col">
            <div className="field-title align-center">
              <p>보유 스킬</p>
            </div>

            <div className="field-content flex-col" style={{ gap: '0.5rem' }}>
              <div className="content-box align-stretch">
                <div className="chip-box align-center flex-wrap" style={{ flex: 1, minHeight: '56px' }}>
                  {userInfo.skillList.length === 0 ? (
                    <span className="help-text">선택된 스킬이 없습니다</span>
                  ) : (
                    userInfo.skillList.map((item) => (
                      <Chip
                        key={item}
                        size="medium"
                        variant="filled"
                        label={getCodeName(COMMON_CODE.SKILL_CODE, item)}
                        color="primary"
                        onDelete={() => toggleArrayValue('skillList', item)}
                      />
                    ))
                  )}
                </div>

                <IconButton size="small" onClick={skillPopup.toggle}>
                  <AddCircle sx={{ fontSize: 35, color: 'primary.main' }} />
                </IconButton>
              </div>

              <span className="help-text">보유 스킬은 필수로 선택해야합니다.</span>
            </div>
          </div>

          <SkillPopup
            isOpen={skillPopup.isOpen}
            onClose={skillPopup.close}
            values={userInfo.skillList}
            setValues={(values: string[]) => changeUserInfo('skillList', values)}
          />

          <Divider sx={{ marginY: '0.5rem' }} />

          <Button size="large" variant="contained" fullWidth onClick={applySignup} disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </Button>
        </Paper>
      </div>
    </div>
  );
}
