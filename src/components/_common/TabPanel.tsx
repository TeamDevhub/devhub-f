import {Box} from "@mui/material";
import React from "react";

export default function TabPanel({ value, index, className, children }: {
    value: number
    index: number
    className?: string
    children: React.ReactNode
}) {
    if (value !== index) return null
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            className='w-100 flex flex-grow'
        >
            <div className='w-100 flex-grow'>
                <Box className={className} sx={{ height: '100%' }}>{children}</Box>
            </div>
        </div>
    )
}