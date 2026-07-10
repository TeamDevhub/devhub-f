import logo from '@/assets/images/devHub-logo.png';
import { Button, Drawer, IconButton, Paper } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/_common/useAuth';
import useDisclosure from '@/hooks/_common/useDisclosure';
import UserInfo from '@/components/_common/layout/UserInfo.tsx';

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) => `nav-link${isActive ? ' active' : ''}`;

export default function Header() {
  const { isLoggedIn } = useAuth();
  const mobileNav = useDisclosure();

  const navLinks = (
    <>
      <NavLink to={'/projects'} className={getNavLinkClassName} onClick={mobileNav.close}>
        PROJECT
      </NavLink>
      <NavLink to={'/boards'} className={getNavLinkClassName} onClick={mobileNav.close}>
        BOARD
      </NavLink>
      <NavLink to={'/skilltrend'} className={getNavLinkClassName} onClick={mobileNav.close}>
        SKILL TRENDS
      </NavLink>
    </>
  );

  return (
    <header>
      <Paper className="header w-100 align-center justify-between" elevation={0} sx={{ borderRadius: 0 }}>
        <div className="header-left-box align-center">
          <h1 className="logo-box">
            <Link to={'/'} className="align-center">
              <img src={logo} alt="devHub logo icon" className="logo-icon" />
              <span className="logo-text">DevHub</span>
            </Link>
          </h1>
          <nav className="menu-box align-center">{navLinks}</nav>
        </div>
        <div className="header-right-box align-center">
          {isLoggedIn ? (
            <UserInfo />
          ) : (
            <Button className="auth-cta" variant="contained" color="primary" disableElevation component={Link} to="/auth/login">
              로그인 / 회원가입
            </Button>
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
