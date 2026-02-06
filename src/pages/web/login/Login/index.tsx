import logo from '@/assets/images/devHub-logo.png';
import googleIcon from '@/assets/images/google-icon.svg';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import useLogin from '@/hooks/login/useLogin';
import { GitHub } from '@mui/icons-material';
import { Button, Divider, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Login() {
  const { loginInfo, changeId, changePassword, applyLogin } = useLogin();

  useEffect(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, []);

  return (
    <div className="auth-page flex-center">
      <form>
        <Paper className="auth-box flex-col" elevation={4}>
          <div className="logo-box">
            <Link to={'/'} className="align-center">
              <img src={logo} alt="devHub logo icon" className="logo-icon" />
              <span className="logo-text">DevHub</span>
            </Link>
          </div>
          <div className="input-box flex-col">
            <CustomTextfield
              name="email"
              placeholder="아이디"
              value={loginInfo.email}
              onChange={(e) => changeId(e.target.value)}
              autoComplete="username"
            />
            <CustomTextfield
              name="password"
              type="password"
              placeholder="비밀번호"
              value={loginInfo.password}
              onChange={(e) => changePassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="button-box flex-col">
            <Button size="large" variant="contained" color="primary" onClick={applyLogin}>
              로그인
            </Button>
            <div className="w-100 align-center" style={{ gap: '1rem' }}>
              <Link to={'/비밀번호 찾기'} className="flex-1 flex-center">
                <Button size="small" color="primary" className="flex-1">
                  비밀번호 찾기
                </Button>
              </Link>
              <Link to={'/signin'} className="flex-1 flex-center">
                <Button size="small" color="primary" className="flex-1">
                  회원가입
                </Button>
              </Link>
            </div>
          </div>
          <Divider />
          <div className="button-box flex-col">
            <Button fullWidth size="medium" variant="outlined" color="primary">
              <img src={googleIcon} alt="google icon" className="button-icon" />
              Google로 로그인
            </Button>
            <Button
              fullWidth
              size="medium"
              variant="outlined"
              color="primary"
              startIcon={<GitHub sx={{ fontSize: '2rem' }} />}
              sx={{ color: 'text.primary', borderColor: 'text.primary' }}
            >
              Github로 로그인
            </Button>
          </div>
        </Paper>
      </form>
    </div>
  );
}
