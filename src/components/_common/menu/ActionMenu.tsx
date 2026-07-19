import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import type { ReactNode } from 'react';
import useMenu from '@/hooks/_common/useMenu';

export interface ActionMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  danger?: boolean;
}

interface ActionMenuProps {
  items: ActionMenuItem[];
  ariaLabel?: string;
}

// 게시글/프로젝트 상세 화면의 수정·삭제 등 소유자 전용 액션을 모아두는 케밥 메뉴
export default function ActionMenu({ items, ariaLabel = '더보기' }: ActionMenuProps) {
  const { anchorEl, open, handleClick, handleClose } = useMenu();

  if (items.length === 0) return null;

  return (
    <>
      <IconButton size='small' onClick={handleClick} aria-label={ariaLabel}>
        <MoreVert sx={{ fontSize: 22, color: 'rgba(0, 0, 0, 0.56)' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => { handleClose(); item.onClick(); }}
            sx={item.danger ? { color: 'error.main' } : undefined}
          >
            {item.icon}
            <p>{item.label}</p>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
