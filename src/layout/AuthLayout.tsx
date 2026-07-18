import LoadingRenderer from '@/components/_common/layout/LoadingRenderer';
import ModalRenderer from '@/components/_common/popup/ModalRenderer';
import { LoadingBridge } from '@/contexts/LoadingContext';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <>
      <LoadingBridge />
      <div id='devHub' className='wh-100'>
        <main>
          <Outlet />
        </main>
      </div>
      <ModalRenderer />
      <LoadingRenderer />
    </>
  );
}
