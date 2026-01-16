import React from 'react'
import { Button, IconButton, Paper } from '@mui/material'
import { Close } from '@mui/icons-material';

export interface WebPopupProps{
  title:string;
  onClose?:()=>void;
  onSubmit:()=>void;
  children:React.ReactNode;
  isOpen:boolean;
  setOpen:(open:boolean)=>void;
  submitText:string
}
export default function WebPopup({
  title,
  onClose,
  onSubmit,
  children,
  isOpen,
  setOpen,
  submitText,
}:WebPopupProps) {

  if (!isOpen) return null;

  const handleClose = () => {
    onClose && onClose();
    setOpen(false);
  }
  const handleSubmit = () => {
    onSubmit();
  }

  return (
    <div className='back-drop'>
      <Paper className='web-popup' elevation={4}>
        <div className='popup-title-box flex-col justify-between align-center'>
          <p className='popup-title'>{title}</p>
          <IconButton onClick={handleClose}>
            <Close color='primary' fontSize='medium'></Close>
          </IconButton>
        </div>
        <div>
          {children}
        </div>
        <div className='popup-button-box flex-col align-center'>
          <Button className='w-100' variant='outlined' onClick={handleClose}>취소</Button>
          <Button className='w-100' variant='contained' onClick={handleSubmit}>{submitText}</Button>
        </div>
      </Paper>
    </div>
  )
}
