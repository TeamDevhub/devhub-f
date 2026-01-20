import React, { useEffect } from 'react'
import Header from '@/layout/Header'
import { Outlet } from 'react-router-dom'
import { setCommonCodes } from '@/utils/common.util'
import commonCodeJson from "@/assets/jsonData/commonCode.json";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';

export default function MainLayout() {

  useEffect(() => {
    setCommonCodes(commonCodeJson);
  }, []);  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
    <div id='devHub' className='wh-100'>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
    </LocalizationProvider>
  )
}
