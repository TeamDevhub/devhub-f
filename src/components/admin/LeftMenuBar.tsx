import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type AdminNavKey = 'user-list' | 'user-reports' | 'projects' | 'codes' | 'forms' | 'boards' | 'banner';

const getSelectedKey = (pathname: string): AdminNavKey | null => {
  if (pathname.startsWith('/admin/users')) return 'user-list';
  if (pathname.startsWith('/admin/reports')) return 'user-reports';
  if (pathname.startsWith('/admin/projects')) return 'projects';
  if (pathname.startsWith('/admin/codes')) return 'codes';
  if (pathname.startsWith('/admin/forms')) return 'forms';
  if (pathname.startsWith('/admin/boards')) return 'boards';
  if (pathname.startsWith('/admin/banner')) return 'banner';
  return null;
};

export default function LeftMenuBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selectedKey = getSelectedKey(pathname);

  const isUserGroupSelected = selectedKey === 'user-list' || selectedKey === 'user-reports';
  const [manuallyOpened, setManuallyOpened] = useState(false);
  const open = isUserGroupSelected || manuallyOpened;

  const handleClick = () => {
    setManuallyOpened((prev) => !prev);
  };

  return (
    <Paper className="left-menu-bar" elevation={1} sx={{ paddingTop: '2.4rem' }}>
      <List className="h-100" sx={{ width: '25.6rem' }}>
        {/* 1-1. 회원 관리 */}
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="회원 관리" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton dense selected={selectedKey === 'user-list'} onClick={() => navigate('/admin/users')}>
              <ListItemText primary="회원 목록" />
            </ListItemButton>

            <ListItemButton dense selected={selectedKey === 'user-reports'} onClick={() => navigate('/admin/reports')}>
              <ListItemText primary="신고 목록" />
            </ListItemButton>
          </List>
        </Collapse>
        {/* 1-2. 프로젝트 관리 */}
        <ListItemButton selected={selectedKey === 'projects'} onClick={() => navigate('/admin/projects')}>
          <ListItemText primary="프로젝트 관리" />
        </ListItemButton>
        {/* 1-3. 공통 코드 관리 */}
        <ListItemButton selected={selectedKey === 'codes'} onClick={() => navigate('/admin/codes')}>
          <ListItemText primary="공통 코드 관리" />
        </ListItemButton>
        {/* 1-4. 신청 양식 관리 */}
        <ListItemButton selected={selectedKey === 'forms'} onClick={() => navigate('/admin/forms')}>
          <ListItemText primary="신청 양식 관리" />
        </ListItemButton>
        {/* 1-5. 게시판 관리 */}
        <ListItemButton selected={selectedKey === 'boards'} onClick={() => navigate('/admin/boards')}>
          <ListItemText primary="게시판 관리" />
        </ListItemButton>
        {/* 1-6. 배너 관리 */}
        <ListItemButton selected={selectedKey === 'banner'} onClick={() => navigate('/admin/banner')}>
          <ListItemText primary="배너 관리" />
        </ListItemButton>
      </List>
    </Paper>
  );
}
