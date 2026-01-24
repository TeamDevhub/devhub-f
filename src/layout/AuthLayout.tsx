import commonCodeJson from "@/assets/jsonData/commonCode.json";
import { LoadingProvider, useLoading } from "@/hooks/LoadingContext";
import Header from '@/layout/Header';
import { injectLoadingHandler } from "@/utils/api.util";
import { setCommonCodes } from '@/utils/common.util';
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