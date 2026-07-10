import { Close } from '@mui/icons-material';
import { Button, Dialog, IconButton, Paper, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

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
}
export default function WebPopup({
  title,
  onClose,
  onSubmit,
  onDelete,
  children,
  isOpen = false,
  submitText= '확인',
  size = 'small',
  closeOnSubmit = true
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

  return (
    <Dialog open={isOpen} onClose={handleClose} scroll='body' disableRestoreFocus fullScreen={isMobile}>
      <Paper className='web-popup' elevation={4}>
        <div className='popup-title-box justify-between align-center'>
          <p className='popup-title'>{title}</p>
          <IconButton onClick={handleClose}>
            <Close color='primary' fontSize='medium' sx={{ fontSize: 24 }}></Close>
          </IconButton>
        </div>
        <div style={{width:`${_size}`}}>
          {children}
        </div>
        <div className='popup-button-box align-center'>
          {onDelete &&
            <Button className='w-100' variant='text' onClick={handleDelete}>삭제</Button>
          }
          <Button className='w-100' variant='outlined' onClick={handleClose}>취소</Button>
          <Button className='w-100' variant='contained' onClick={handleSubmit}>{submitText}</Button>
        </div>
      </Paper>
    </Dialog>
  )
}
