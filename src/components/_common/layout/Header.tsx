import logo from '@/assets/images/devHub-logo.png';
import { Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.ts';
import UserInfo from '@/components/_common/layout/UserInfo.tsx';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header>
      <Paper className="header w-100 align-center justify-between" elevation={1} sx={{ borderRadius: 0 }}>
        <div className="header-left-box align-center">
          <h1 className="logo-box">
            <Link to={'/'} className="align-center">
              <img src={logo} alt="devHub logo icon" className="logo-icon" />
              <span className="logo-text">DevHub Test</span>
            </Link>
          </h1>
          <nav className="menu-box">
            <Link to={'/projects'}>
              <Button size="large" variant="text">
                PROJECT
              </Button>
            </Link>
            <Link to={'/boards'}>
              <Button size="large" variant="text">
                BOARD
              </Button>
            </Link>
            <Link to={'/skilltrend'}>
              <Button size="large" variant="text">
                SKILL TRENDS
              </Button>
            </Link>
          </nav>
        </div>
        <div className="header-right-box align-center">
          {!isLoggedIn && (
            <>
              <Link to={'/auth/signup'}>
                <Button size="large" variant="text">
                  JOIN
                </Button>
              </Link>
              <Link to={'/auth/login'}>
                <Button size="large" variant="text">
                  LOGIN
                </Button>
              </Link>
            </>
          )}
          {isLoggedIn && <UserInfo logout={logout} />}
        </div>
      </Paper>
    </header>
  );
}
