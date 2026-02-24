import {Button, MenuItem} from "@mui/material";
import {ArrowForwardIos} from "@mui/icons-material";

export default function NotificationItem({
    content,
    registerDate,
    type,
    useButton = false,
    onButtonClick,
    onClick,
    guid,
}:{
    content:string,
    registerDate:string,
    type:string,
    useButton?:boolean,
    onButtonClick?: () => void,
    onClick?: (guid: string)=>void,
    guid: string
}){
    const handleClick = () => {
        onClick?.(guid);
    }
    return (
        <MenuItem className={`flex-col ${type}`} sx={{minWidth:'200px'}} onClick={handleClick}>
            <strong className="main-text">
                {content}
            </strong>
            <div className="bottom w-100 align-center justify-between">
                <p className="alert-date">{registerDate}</p>
                {useButton && <Button size="small" className="detail-button" endIcon={<ArrowForwardIos />} onClick={onButtonClick} >상세보기</Button>}
            </div>
        </MenuItem>
    )
}