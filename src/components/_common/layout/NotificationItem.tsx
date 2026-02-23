import {Button, MenuItem} from "@mui/material";
import {ArrowForwardIos} from "@mui/icons-material";

export default function NotificationItem({
    content,
    registerDate,
    type,
    useButton = false,
    onClick,
}:{
    content:string,
    registerDate:string,
    type:string,
    useButton?:boolean,
    onClick?: ()=>void,
}){
    const handleClick = () => {
        onClick?.();
    }
    return (
        <MenuItem className={`flex-col ${type}`} sx={{minWidth:'200px'}}>
            <strong className="main-text">
                {content}
            </strong>
            <div className="bottom w-100 align-center justify-between">
                <p className="alert-date">{registerDate}</p>
                {useButton && <Button size="small" className="detail-button" endIcon={<ArrowForwardIos />} onClick={handleClick}>상세보기</Button>}
            </div>
        </MenuItem>
    )
}