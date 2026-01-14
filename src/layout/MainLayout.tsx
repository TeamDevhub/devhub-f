import React, { useEffect } from 'react'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'
import { setCommonCodes } from '@/utils/common.util'
import commonCodeJson from "@/assets/jsonData/commonCode.json";

export default function MainLayout() {

  useEffect(() => {
    setCommonCodes(commonCodeJson);
  }, []);  

  return (
    <div id='devHub' className='wh-100'>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}
