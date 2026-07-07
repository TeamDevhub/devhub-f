import CustomAvatar from '@/components/_common/customMUI/CustomAvatar';
import NotificationItem from '@/components/_common/layout/NotificationItem';
import useMenu from '@/hooks/_common/useMenu';
import { useAuth } from '@/hooks/_common/useAuth';
import useCheckedNotification from '@/hooks/web/header/useCheckedNotification';
import useNotificationList from '@/hooks/web/header/useNotificationList';
import { Create, Inbox, Logout, Notifications, Person } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_FILE_API_URL;

export default function UserInfo() {
  const { user, logout } = useAuth();

  const iconStyle = {
    fontSize: 24,
    color: 'rgba(0, 0, 0, 0.56)',
  };

  const { res: notifications, removeNotification, hasList } = useNotificationList();

  const { checkedNotification } = useCheckedNotification();

  const { anchorEl: notificationsEl, open: notificationsOpen, handleClick: notificationsClick, handleClose: notificationsClose } = useMenu();

  const { anchorEl: userEl, open: userOpen, handleClick: userClick, handleClose: userClose } = useMenu();

  const handleClickNotification = (guid: string) => {
    checkedNotification(guid).then();
    removeNotification(guid);
  };

  return (
    <>
      {/* 알림 */}
      <div>
        <IconButton onClick={notificationsClick}>
          <CustomAvatar
            useBadge={hasList}
            avatarIcon={
              <Notifications
                sx={{
                  fontSize: 35,
                  color: 'primary.main',
                }}
              />
            }
          />
        </IconButton>

        <Menu className="notification-menu" anchorEl={notificationsEl} open={notificationsOpen} onClose={notificationsClose}>
          {notifications?.dataList?.map((item) => (
            <NotificationItem
              key={item.notificationGuid}
              guid={item.notificationGuid}
              content={item.content}
              registerDate={item.registrationDate}
              type={item.typeCd}
              onClick={handleClickNotification}
            />
          ))}
        </Menu>
      </div>

      {/* 사용자 메뉴 */}
      <div>
        <IconButton onClick={userClick}>
          <CustomAvatar
            src={user?.fileGuid ? `${API_URL}${user.fileGuid}` : undefined}
            bgColor="text.disabled"
            avatarIcon={<Person sx={{ fontSize: 24 }} />}
          />
        </IconButton>

        <Menu anchorEl={userEl} open={userOpen} onClose={userClose}>
          {/* 프로필 영역 */}
          <MenuItem
            sx={{
              padding: '1.4rem 1.6rem',
              gap: '1.6rem',
              borderBottom: '1px solid rgba(0,0,0,.12)',
              pointerEvents: 'none',
            }}
          >
            <CustomAvatar
              size={40}
              src={user?.fileGuid ? `${API_URL}${user.fileGuid}` : undefined}
              bgColor="text.disabled"
              avatarIcon={<Person sx={{ fontSize: 20 }} />}
            />

            <div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: '1.4rem',
                }}
              >
                {user?.username}
              </p>
            </div>
          </MenuItem>

          <MenuItem onClick={userClose} component={Link} to="/profile" sx={{ mt: 1 }}>
            <Person sx={iconStyle} />
            <p>내 정보</p>
          </MenuItem>

          <MenuItem onClick={userClose} component={Link} to="/profile/projects">
            <Inbox sx={iconStyle} />
            <p>내 프로젝트</p>
          </MenuItem>

          <MenuItem onClick={userClose} component={Link} to="/projects/create">
            <Create sx={iconStyle} />
            <p>프로젝트 모집하기</p>
          </MenuItem>

          <MenuItem
            onClick={async () => {
              userClose();
              await logout();
            }}
            sx={{ mb: 1 }}
          >
            <Logout sx={iconStyle} />
            <p>로그아웃</p>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
