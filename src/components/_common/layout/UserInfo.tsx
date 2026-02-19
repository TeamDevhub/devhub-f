import CustomAvatar from "@/components/_common/customMUI/CustomAvatar.tsx";
import {Notifications, Person} from "@mui/icons-material";
import useMenu from "@/hooks/_common/useMenu.ts";
import {IconButton, Menu, MenuItem} from "@mui/material";
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
                <Menu anchorEl={notificationsEl} open={notificationsOpen} onClose={notificationsClose}>

                </Menu>
            </div>
            <div>
                <IconButton onClick={userClick}>
                    <CustomAvatar bgColor='text.disabled' avatarIcon={<Person sx={{ fontSize: 24 }} />} />
                </IconButton>
                <Menu anchorEl={userEl} open={userOpen} onClose={userClose}>
                    <MenuItem>
                        <CustomAvatar bgColor='text.disabled' size={32} avatarIcon={<Person sx={{ fontSize: 20 }} />} />
                        <div>
                            <p>name</p>
                            <p>email@</p>
                        </div>
                    </MenuItem>
                    <MenuItem onClick={userClose} component={Link} to="/">
                        <Person></Person>
                        <p>내 정보</p>
                    </MenuItem>
                    <MenuItem onClick={userClose} component={Link} to="/">
                        <Person></Person>
                        <p>모집 현황</p>
                    </MenuItem>
                    <MenuItem onClick={userClose} component={Link} to="/">
                        <Person></Person>
                        <p>신청 결과 확인</p>
                    </MenuItem>
                    <MenuItem onClick={userClose} component={Link} to="/">
                        <Person></Person>
                        <p>프로젝트 모집하기</p>
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <Person></Person>
                        <p>Sign out</p>
                    </MenuItem>
                </Menu>
            </div>

        </>
    )
}