import { COMMON_CODE } from '@/types/const';
import { Chip } from '@mui/material';
import {useCodes} from "@/contexts/CommonCodeContext.ts";

export const UserStatusChip = ({ statusCd }: { statusCd: string }) => {
    const { getCodeName } = useCodes();
    const statusName = getCodeName(COMMON_CODE.USER_STATUS, statusCd);

    const getStatusColor = (code: string): "default" | "error" | "success" | "warning" => {
        switch (code) {
            case '7001': return 'success'; 
            case '7002': return 'warning'; 
            case '7003': return 'error';   
            default: return 'success';
        }
    };

    return (
        <Chip 
            label={statusName} 
            color={getStatusColor(statusCd)} 
            size="small" 
            variant="outlined" 
        />
    );
};