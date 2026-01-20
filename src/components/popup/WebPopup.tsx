import React from 'react'
import { Button, Dialog, IconButton, Paper } from '@mui/material'
import { Close } from '@mui/icons-material';

export interface WebPopupProps{
  title:string;
  onClose?:()=>void;
  onSubmit?:()=>void;
  children:React.ReactNode;
  isOpen:boolean;
  setOpen:(open:boolean)=>void;
  submitText?:string;
  size?: "small" | "large" | "medium"
  closeOnSubmit?: boolean
}
export default function WebPopup({
  title,
  onClose,
  onSubmit,
  children,
  isOpen,
  setOpen,
  submitText='확인',
  size = 'small',
  closeOnSubmit = true
}:WebPopupProps) {

  const handleClose = () => {
    onClose && onClose();
    setOpen(false);
  }
  const handleSubmit = () => {
    onSubmit && onSubmit();
    closeOnSubmit && setOpen(false);
  }

  let _size : string;
  switch(size){
    case 'large' : _size = '1200'; break;
    case 'medium' : _size = '800'; break;
    case 'small' : _size = '400'; break;
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} scroll='body' disableRestoreFocus>
      <Paper className='web-popup' elevation={4}>
        <div className='popup-title-box justify-between align-center'>
          <p className='popup-title'>{title}</p>
          <IconButton onClick={handleClose}>
            <Close color='primary' fontSize='medium'></Close>
          </IconButton>
        </div>
        <div style={{width:`${_size}px`}}>
          {children}
        </div>
        <div className='popup-button-box align-center'>
          <Button className='w-100' variant='outlined' onClick={handleClose}>취소</Button>
          <Button className='w-100' variant='contained' onClick={handleSubmit}>{submitText}</Button>
        </div>
      </Paper>
    </Dialog>
  )
}
