import { useState } from 'react';
import logo from '@/assets/images/devHub-logo.png';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import useSendVerificationCode from '@/hooks/web/signup/useSendVerificationCode';
import useConfirmVerificationCode from '@/hooks/web/signup/useConfirmVerificationCode';
import { ArrowForwardIos, Edit, KeyboardArrowDown, ListAlt, MailOutline } from '@mui/icons-material';
import { Button, Divider, FormControl, IconButton, MenuItem, Paper, Select } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
  onVerified: (email: string) => void;
}

const CUSTOM_DOMAIN_OPTION = '직접 입력';

const EMAIL_HOST_OPTIONS = [
  'gmail.com',
  'naver.com',
  'daum.net',
  'kakao.com',
  'nate.com',
  'hanmail.net',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'yahoo.com',
];

export default function VerificationPage({ onVerified }: Props) {
  const { emailAddress, isVerificationCodeSent, changeEmailId, changeEmailHost, applySendMail } = useSendVerificationCode();
  const { verificationCode, setVerificationCode, applyConfirmVerification, verifying } = useConfirmVerificationCode(
    `${emailAddress.emailId}@${emailAddress.emailHost}`,
    onVerified,
  );

  const [isCustomDomain, setIsCustomDomain] = useState(false);

  const handleSelectHost = (value: string) => {
    if (value === CUSTOM_DOMAIN_OPTION) {
      setIsCustomDomain(true);
      changeEmailHost('');
      return;
    }
    changeEmailHost(value);
  };

  const handleBackToList = () => {
    setIsCustomDomain(false);
    changeEmailHost('');
  };

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

          {/* 이메일 입력 */}
          <div className="field-box flex-col">
            <div className="field-title align-center">
              <MailOutline sx={{ fontSize: 20, color: 'var(--primary-main)' }} />
              <p>이메일 인증</p>
            </div>

            <div className="field-content flex-col">
              <div className="content-box email-verify-row align-stretch">
                <CustomTextfield placeholder="이메일" value={emailAddress.emailId} onChange={(e) => changeEmailId(e.target.value)} fullWidth />

                <p className="flex-center">@</p>

                {isCustomDomain ? (
                  <div className="email-host-custom align-center" style={{ display: 'flex', gap: '0.4rem', width: '100%' }}>
                    <CustomTextfield
                      placeholder="도메인을 입력해주세요"
                      value={emailAddress.emailHost}
                      onChange={(e) => changeEmailHost(e.target.value)}
                      fullWidth
                    />
                    <IconButton className="email-host-back-btn" onClick={handleBackToList} aria-label="목록에서 선택">
                      <ListAlt sx={{ fontSize: 20 }} />
                    </IconButton>
                  </div>
                ) : (
                  <FormControl fullWidth variant="outlined" className="email-host-select">
                    <Select
                      value={emailAddress.emailHost}
                      onChange={(e) => handleSelectHost(e.target.value)}
                      size="medium"
                      displayEmpty
                      IconComponent={KeyboardArrowDown}
                      renderValue={(selected) => (selected === '' ? '이메일을 선택해주세요' : selected)}
                      MenuProps={{
                        PaperProps: {
                          className: 'email-host-menu-paper',
                        },
                      }}
                    >
                      {EMAIL_HOST_OPTIONS.map((emailHost) => (
                        <MenuItem key={emailHost} value={emailHost}>
                          {emailHost}
                        </MenuItem>
                      ))}
                      <Divider />
                      <MenuItem value={CUSTOM_DOMAIN_OPTION} className="email-host-custom-option">
                        <Edit sx={{ fontSize: 16 }} />
                        직접 입력
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}

                <Button size="large" variant="contained" color="primary" onClick={applySendMail} sx={{ height: '56px', minWidth: '120px' }}>
                  인증
                </Button>
              </div>

              {isVerificationCodeSent && (
                <div
                  className="content-box align-stretch"
                  style={{
                    marginTop: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                  }}
                >
                  <CustomTextfield
                    placeholder="인증번호 입력"
                    value={verificationCode.verificationCode}
                    onChange={(e) =>
                      setVerificationCode({
                        verificationCode: e.target.value,
                      })
                    }
                    fullWidth
                  />
                </div>
              )}
            </div>
          </div>

          <Divider />

          {isVerificationCodeSent && (
            <Button size="large" variant="contained" color="primary" endIcon={<ArrowForwardIos />} fullWidth onClick={applyConfirmVerification}>
              {verifying ? '확인 중...' : '인증 확인'}
            </Button>
          )}
        </Paper>
      </div>
    </div>
  );
}
