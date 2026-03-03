// MyProfileLayout.tsx
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import MyInfoBox from '@/components/profile/MyInfoBox';

type MyPageNavKey = 'home' | 'projects' | 'boards';

export default function MyProfileLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey: MyPageNavKey = (() => {
    if (location.pathname.startsWith('/profile/projects')) return 'projects';
    if (location.pathname.startsWith('/profile/boards')) return 'boards';
    return 'home';
  })();

  const handleChange = (key: MyPageNavKey) => {
    switch (key) {
      case 'home':
        navigate('/profile');
        break;
      case 'projects':
        navigate('/profile/projects');
        break;
      case 'boards':
        navigate('/profile/boards');
        break;
    }
  };

  return (
    <div className="main-page flex gap-24 align-stretch" style={{ minHeight: 'calc(100vh - 7rem)' }}>
      <MyInfoBox selectedKey={selectedKey} onChange={handleChange} />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
