import CustomAvatar from "@/components/_common/customMUI/CustomAvatar.tsx";
import {CheckCircle, Create, Inbox, Logout, Notifications, Person} from "@mui/icons-material";
import useMenu from "@/hooks/_common/useMenu.ts";
import {IconButton, Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import useNotificationList from "@/hooks/header/useNotificationList.ts";
import NotificationItem from "@/components/_common/layout/NotificationItem.tsx";
import useCheckedNotification from "@/hooks/header/useCheckedNotification.ts";

export default function UserInfo({ logout }:{
    logout?:()=>void;
}){

    const iconStyle = { fontSize: 24, color: 'rgba(0, 0, 0, 0.56)' }

    const { res: notifications, removeNotification, hasList } = useNotificationList();
    const { checkedNotification } = useCheckedNotification();

    const {
        anchorEl: notificationsEl,
        open: notificationsOpen,
        handleClick: notificationsClick,
        handleClose: notificationsClose
    } = useMenu();
    const {
        anchorEl: userEl,
        open: userOpen,
        handleClick: userClick,
        handleClose: userClose
    } = useMenu();

    const handleClickNotification = (guid: string) => {
        checkedNotification(guid).then();
        removeNotification(guid);
    }

    return (
        <>
            <div>
                <IconButton onClick={notificationsClick}>
                    <CustomAvatar useBadge={hasList} avatarIcon={<Notifications sx={{ fontSize: 35, color: 'primary.main' }}/>}  />
                </IconButton>
                <Menu className="notification-menu" anchorEl={notificationsEl} open={notificationsOpen} onClose={notificationsClose}>
                    {notifications?.dataList?.map((item, index)=>{
                        return(
                            //기본 info error
                            <NotificationItem
                                key={index}
                                guid={item.notificationGuid}
                                content={item.content}
                                registerDate={item.registrationDate}
                                type={item.typeCd}
                                onClick={handleClickNotification}
                            />
                        )
                    })}
                </Menu>
            </div>
            <div>
                <IconButton onClick={userClick}>
                    <CustomAvatar bgColor='text.disabled' avatarIcon={<Person sx={{ fontSize: 24 }} />} />
                </IconButton>
                <Menu anchorEl={userEl} open={userOpen} onClose={userClose}>
                    <MenuItem sx={{ padding: '1.4rem 1.6rem', gap: '1.6rem', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                        <CustomAvatar size={40} bgColor='text.disabled' avatarIcon={<Person sx={{ fontSize: 20 }} />} />
                        <div>
                            <p>name</p>
                            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>email@</p>
                        </div>
                    </MenuItem>
                    <MenuItem onClick={userClose} component={Link} to="/" sx={{ marginTop: '0.8rem' }}>
                        <Person sx={iconStyle} />
                        <p>내 정보</p>
                    </MenuItem>
                    <MenuItem onClick={userClose} component={Link} to="/">
                        <Inbox sx={iconStyle} />
                        <p>모집 현황</p>
                    </MenuItem>
                    <MenuItem onClick={userClose} component={Link} to="/">
                        <CheckCircle sx={iconStyle} />
                        <p>신청 결과 확인</p>
                    </MenuItem>
                    <MenuItem onClick={userClose} component={Link} to="/">
                        <Create sx={iconStyle} />
                        <p>프로젝트 모집하기</p>
                    </MenuItem>
                    <MenuItem onClick={logout} sx={{ marginBottom: '0.8rem' }}>
                        <Logout sx={iconStyle} />
                        <p>Sign out</p>
                    </MenuItem>
                </Menu>
            </div>

        </>
    )
}