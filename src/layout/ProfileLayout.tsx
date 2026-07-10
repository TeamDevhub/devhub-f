import { Outlet, useLocation } from 'react-router-dom';
import MyInfoBox from '@/components/web/profile/MyInfoBox';

type MyPageNavKey = 'home' | 'projects' | 'boards';

export default function ProfileLayout() {
  const location = useLocation();

  const selectedKey: MyPageNavKey = (() => {
    if (location.pathname.startsWith('/profile/projects')) return 'projects';
    if (location.pathname.startsWith('/profile/boards')) return 'boards';
    return 'home';
  })();

  return (
    <div className="main-page profile-layout flex gap-24 align-stretch" style={{ minHeight: 'calc(100vh - 7rem)' }}>
      <MyInfoBox selectedKey={selectedKey} />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
