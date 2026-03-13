import {DatePicker} from "@mui/x-date-pickers";
import type {DateType} from "@/types/type.api.ts";

export default function CustomDateRange({
    label,
    startDate,
    endDate,
    onStartChange,
    onEndChange,
}:{
    label:string;
    startDate:DateType;
    endDate:DateType;
    onStartChange:(value:DateType) => void;
    onEndChange:(value:DateType) => void;
}){
    return (
        <div className="align-center gap-4">
            <DatePicker
                value={startDate}
                onChange={onStartChange}
                slotProps={{
                    textField: {
                        label: label,
                        size: 'small',
                        InputLabelProps: {
                            shrink: true,
                        }
                    },
                }}
                sx={{ maxWidth: '20rem' }}
            />
            <p className='seperator'>~</p>
            <DatePicker
                value={endDate}
                onChange={onEndChange}
                slotProps={{
                    textField: {
                        size: 'small',
                        InputLabelProps: {
                            shrink: true,
                        }
                    },
                }}
                sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 },
                    maxWidth: '20rem'
                }}
            />
        </div>
    )
}