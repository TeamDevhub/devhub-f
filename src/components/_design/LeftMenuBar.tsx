import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AdminNavKey = 'user-list' | 'user-reports' | 'projects' | 'codes' | 'forms' | 'boards' | 'banner' | 'terms';

interface LeftMenuBarProps {
  selectedKey: AdminNavKey;
}

export default function LeftMenuBar({ selectedKey }: LeftMenuBarProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedKey === 'user-list' || selectedKey === 'user-reports') {
      setOpen(true);
    }
  }, [selectedKey]);

  const handleClick = () => {
    setOpen((prev) => !prev);
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
        <ListItemButton selected={selectedKey === 'projects'}>
          <ListItemText primary="프로젝트 관리" />
        </ListItemButton>
        {/* 1-3. 공통 코드 관리 */}
        <ListItemButton selected={selectedKey === 'codes'}>
          <ListItemText primary="공통 코드 관리" />
        </ListItemButton>
        {/* 1-4. 신청 양식 관리 */}
        <ListItemButton selected={selectedKey === 'forms'}>
          <ListItemText primary="신청 양식 관리" />
        </ListItemButton>
        {/* 1-5. 게시판 관리 */}
        <ListItemButton selected={selectedKey === 'boards'}>
          <ListItemText primary="게시판 관리" />
        </ListItemButton>
        {/* 1-6. 배너 관리 */}
        <ListItemButton selected={selectedKey === 'banner'}>
          <ListItemText primary="배너 관리" />
        </ListItemButton>
        {/* 1-7. 약관 관리 */}
        <ListItemButton selected={selectedKey === 'terms'}>
          <ListItemText primary="약관 관리" />
        </ListItemButton>
      </List>
    </Paper>
  );
}
