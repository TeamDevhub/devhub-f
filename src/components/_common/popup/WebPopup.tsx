import {
  CheckCircleOutlineRounded,
  Close,
  ErrorOutlineRounded,
  HelpOutlineRounded,
  InfoOutlined,
  WarningAmberRounded,
} from '@mui/icons-material';
import { Button, Dialog, IconButton, Paper, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import IconBadge, { type IconBadgeTone } from '@/components/_common/IconBadge';
import type { DialogVariant } from '@/types/type.dialog';

export interface WebPopupProps{
  title:string;
  onClose?:()=>void;
  onSubmit?: () => void | boolean | Promise<void | boolean>;
  onDelete?:()=>void;
  children:React.ReactNode;
  isOpen?:boolean;
  submitText?:string;
  size?: 'small' | 'medium' | 'large' | 'auto';
  closeOnSubmit?: boolean;
  /** 다이얼로그 유형 - 지정 시 제목 옆에 톤이 있는 아이콘 배지를 표시한다 */
  variant?: DialogVariant;
}

const VARIANT_ICON: Record<DialogVariant, { icon: React.ReactNode; tone: IconBadgeTone }> = {
  confirm: { icon: <HelpOutlineRounded />, tone: 'primary' },
  info: { icon: <InfoOutlined />, tone: 'primary' },
  success: { icon: <CheckCircleOutlineRounded />, tone: 'success' },
  warning: { icon: <WarningAmberRounded />, tone: 'warning' },
  error: { icon: <ErrorOutlineRounded />, tone: 'error' },
};

export default function WebPopup({
  title,
  onClose,
  onSubmit,
  onDelete,
  children,
  isOpen = false,
  submitText= '확인',
  size = 'small',
  closeOnSubmit = true,
  variant,
}:WebPopupProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    onClose?.();
  }
  const handleSubmit = async () => {
    const isSubmit = await onSubmit?.();
    if(isSubmit === false) return;
    if(closeOnSubmit) onClose?.();
  }

  const handleDelete = () => {
    onDelete?.();
    onClose?.();
  }

  let _size : string;
  switch(size){
    case 'large' : _size = '1200px'; break;
    case 'medium' : _size = '800px'; break;
    case 'small' : _size = '400px'; break;
    case 'auto' : _size = 'auto'; break;
  }
  if(isMobile && size !== 'auto') _size = '100%';

  const variantIcon = variant ? VARIANT_ICON[variant] : undefined;
  const submitColor = variant === 'warning' || variant === 'error' ? 'error' : 'primary';

  return (
    <Dialog open={isOpen} onClose={handleClose} scroll='body' disableRestoreFocus fullScreen={isMobile}>
      <Paper className='web-popup' elevation={0}>
        <div className='popup-title-box justify-between align-start'>
          <div className='popup-heading align-center'>
            {variantIcon && <IconBadge icon={variantIcon.icon} tone={variantIcon.tone} size='small' />}
            <p className='popup-title'>{title}</p>
          </div>
          <IconButton className='popup-close-btn' size='small' onClick={handleClose} aria-label='닫기'>
            <Close fontSize='small'></Close>
          </IconButton>
        </div>
        <div style={{width:`${_size}`}}>
          {children}
        </div>
        <div className='popup-button-box align-center'>
          {onDelete &&
            <Button className='flex-1' variant='text' color='error' size='large' onClick={handleDelete}>삭제</Button>
          }
          <Button className='flex-1' variant='outlined' size='large' onClick={handleClose}>취소</Button>
          <Button className='flex-1' variant='contained' color={submitColor} size='large' onClick={handleSubmit}>{submitText}</Button>
        </div>
      </Paper>
    </Dialog>
  )
}
