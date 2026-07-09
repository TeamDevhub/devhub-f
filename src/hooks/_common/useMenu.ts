import {useState, type MouseEvent} from "react";

export default function useMenu(){

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return {
        open,
        anchorEl,
        handleClick,
        handleClose,
    }
}