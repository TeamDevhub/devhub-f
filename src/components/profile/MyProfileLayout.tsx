import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import MyInfoBox from '@/components/profile/MyInfoBox';

type MyPageNavKey = 'home' | 'projects' | 'boards';

export default function MyProfileLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey: MyPageNavKey = (() => {
    if (location.pathname.startsWith('/design/mypage/projects')) return 'projects';
    if (location.pathname.startsWith('/design/mypage/boards')) return 'boards';
    return 'home';
  })();

  const handleChange = (key: MyPageNavKey) => {
    switch (key) {
      case 'home':
        navigate('/profile/home');
        break;

      case 'projects':
        navigate('/design/mypage/projects/list');
        break;

      case 'boards':
        navigate('/design/mypage/boards');
        break;

      default:
        navigate('/profile/home');
    }
  };

  return (
    <div className="flex gap-24">
      <MyInfoBox selectedKey={selectedKey} onChange={handleChange} />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
