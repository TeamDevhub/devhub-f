import LeftMenuBar from '@/components/_design/LeftMenuBar.tsx';
import LoadingRenderer from '@/components/_common/layout/LoadingRenderer';
import ModalRenderer from '@/components/_common/popup/ModalRenderer';
import { LoadingBridge } from '@/contexts/LoadingContext';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <>
      <LoadingBridge />
      <div id='devHubAdmin' className='wh-100'>
        {/* 어드민 헤더 현재 미정 -> 임시 헤더 적용 */}
        <div className='align-center' style={{ position: 'fixed', zIndex: 100, width: '100%', height: '6.4rem', padding: '0 2.4rem', backgroundColor: 'var(--primary-main)' }}>
          <h1 style={{ color: '#fff' }}>DevHub</h1>
        </div>
        <main>
          <div className='admin-page flex'>
            <LeftMenuBar selectedKey='banner' />
            <Outlet />
          </div>
        </main>
      </div>
      <ModalRenderer />
      <LoadingRenderer />
    </>
  );
}
