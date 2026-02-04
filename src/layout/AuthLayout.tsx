import commonCodeJson from "@/assets/jsonData/commonCode.json";
import {LoadingBridge} from "@/contexts/LoadingContext";
import {setCommonCodes} from '@/utils/util._common';
import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {CommonCodeProvider} from "@/contexts/CommonCodeProvider.tsx";
import {LoadingProvider} from "@/contexts/LoadingProvider.tsx";

export default function AuthLayout() {

  useEffect(() => {
    setCommonCodes(commonCodeJson);
  }, []);  

  return (
    <LoadingProvider>
        <LoadingBridge/>
        <CommonCodeProvider>
          <div id='devHub' className='wh-100'>
            <main>
              <Outlet></Outlet>
            </main>
          </div>
        </CommonCodeProvider>
    </LoadingProvider>
  )
}