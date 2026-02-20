import CustomAvatar from "@/components/_common/customMUI/CustomAvatar.tsx";
import {ArrowForwardIos, CheckCircle, Create, Inbox, Logout, Notifications, Person} from "@mui/icons-material";
import useMenu from "@/hooks/_common/useMenu.ts";
import {Button, IconButton, Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";

export default function UserInfo({ logout }:{
    logout?:()=>void;
}){

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

    return (
        <>
            <div>
                <IconButton onClick={notificationsClick}>
                    <CustomAvatar useBadge avatarIcon={<Notifications sx={{ fontSize: 35, color: 'primary.main' }}/>}  />
                </IconButton>
                <Menu className="notification-menu" anchorEl={notificationsEl} open={notificationsOpen} onClose={notificationsClose}>
                    {/* 임시 데이터 */}
                    {/* MenuItem에 info, error 클래스 붙이면 색상 변경되도록 scss 작성해둠 */}
                    <MenuItem className="flex-col info">
                        <strong className="main-text">
                            모집하는 프로젝트에 새로운 지원자가 지원하였습니다.
                        </strong>
                        <div className="bottom w-100 align-center justify-between">
                            <p className="alert-date">2025.01.01</p>
                            <Button size="small" className="detail-button" endIcon={<ArrowForwardIos />}>상세보기</Button>
                        </div>
                    </MenuItem>
                    <MenuItem className="flex-col">
                        <strong className="main-text">
                            기본 알림입니다.
                        </strong>
                        <div className="bottom w-100 align-center justify-between">
                            <p className="alert-date">2025.01.01</p>
                        </div>
                    </MenuItem>
                    <MenuItem className="flex-col error">
                        <strong className="main-text">
                            신고 알림입니다.
                        </strong>
                        <div className="bottom w-100 align-center justify-between">
                            <p className="alert-date">2025.01.01</p>
                            <Button size="small" className="detail-button" endIcon={<ArrowForwardIos />}>상세보기</Button>
                        </div>
                    </MenuItem>
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
                        <Person sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.56)' }} />
                        <p>내 정보</p>
                    </MenuItem>
                    <MenuItem onClick={userClose} component={Link} to="/">
                        <Inbox sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.56)' }} />
                        <p>모집 현황</p>
                    </MenuItem>
                    <MenuItem onClick={userClose} component={Link} to="/">
                        <CheckCircle sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.56)' }} />
                        <p>신청 결과 확인</p>
                    </MenuItem>
                    <MenuItem onClick={userClose} component={Link} to="/">
                        <Create sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.56)' }} />
                        <p>프로젝트 모집하기</p>
                    </MenuItem>
                    <MenuItem onClick={logout} sx={{ marginBottom: '0.8rem' }}>
                        <Logout sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.56)' }} />
                        <p>Sign out</p>
                    </MenuItem>
                </Menu>
            </div>

        </>
    )
}