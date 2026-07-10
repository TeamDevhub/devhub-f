import logo from '@/assets/images/devHub-logo.png';
import { Button, Drawer, IconButton, Paper } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/_common/useAuth';
import useDisclosure from '@/hooks/_common/useDisclosure';
import UserInfo from '@/components/_common/layout/UserInfo.tsx';

export default function Header() {
  const { isLoggedIn } = useAuth();
  const mobileNav = useDisclosure();

  const navLinks = (
    <>
      <Link to={'/projects'} onClick={mobileNav.close}>
        <Button size="large" variant="text">
          PROJECT
        </Button>
      </Link>
      <Link to={'/boards'} onClick={mobileNav.close}>
        <Button size="large" variant="text">
          BOARD
        </Button>
      </Link>
      <Link to={'/skilltrend'} onClick={mobileNav.close}>
        <Button size="large" variant="text">
          SKILL TRENDS
        </Button>
      </Link>
    </>
  );

  return (
    <header>
      <Paper className="header w-100 align-center justify-between" elevation={1} sx={{ borderRadius: 0 }}>
        <div className="header-left-box align-center">
          <h1 className="logo-box">
            <Link to={'/'} className="align-center">
              <img src={logo} alt="devHub logo icon" className="logo-icon" />
              <span className="logo-text">DevHub</span>
            </Link>
          </h1>
          <nav className="menu-box">{navLinks}</nav>
        </div>
        <div className="header-right-box align-center">
          {isLoggedIn ? (
            <UserInfo />
          ) : (
            <>
              <Link to="/auth/signup">
                <Button size="large" variant="text">
                  JOIN
                </Button>
              </Link>

              <Link to="/auth/login">
                <Button size="large" variant="text">
                  LOGIN
                </Button>
              </Link>
            </>
          )}
          <IconButton className="menu-toggle-btn" onClick={mobileNav.open} aria-label="메뉴 열기">
            <MenuIcon />
          </IconButton>
        </div>
      </Paper>

      <Drawer anchor="right" open={mobileNav.isOpen} onClose={mobileNav.close}>
        <nav className="mobile-menu-box flex-col" role="presentation">
          {navLinks}
        </nav>
      </Drawer>
    </header>
  );
}
