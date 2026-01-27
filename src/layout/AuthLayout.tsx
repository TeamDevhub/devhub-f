import commonCodeJson from "@/assets/jsonData/commonCode.json";
import { LoadingProvider, useLoading } from "@/contexts/LoadingContext";
import Header from '@/components/_common/layout/Header';
import { injectLoadingHandler } from "@/utils/util.api";
import { setCommonCodes } from '@/utils/util._common';
import { useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

export default function AuthLayout() {

  useEffect(() => {
    setCommonCodes(commonCodeJson);
  }, []);  

  return (
    <LoadingProvider>
      <LoadingBridge />
      <div id='devHub' className='wh-100'>
        <Header></Header>
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </LoadingProvider>
  )
}

const LoadingBridge = () => {
  const { show, hide } = useLoading();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'loading') {
      show();
    } else {
      hide();
    }
  }, [navigation.state, show, hide]);

  useEffect(() => {
    injectLoadingHandler({ show, hide });
  }, [show, hide]);

  return null;
};