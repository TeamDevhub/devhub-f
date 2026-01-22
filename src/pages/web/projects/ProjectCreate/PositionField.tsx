import type { Position } from '@/api/projects/projects.type'
import { FormControl, Select, MenuItem, IconButton } from '@mui/material';
import CustomTextfield from '@/components/common/CustomTextfield';
import { Remove } from '@mui/icons-material'
import { useState, useEffect } from 'react';
import { COMMON_CODE, type CommonCodeItem } from '@/types/common.type';
import { getCodesByGroup } from '@/utils/common.util';

interface PositionFieldProps {
    position: Position;
    onChange?: (key: number, newPosition?: Position) => void;
    index: number;
}

export default function PositionField ({
    position,
    onChange,
    index
}: PositionFieldProps){
    const [positionOptions, setPositionOptions] = useState<CommonCodeItem[]>([]);
    const [levelOptions, setLevelOptions] = useState<CommonCodeItem[]>([]);

    const initialize = () => {
        setPositionOptions(getCodesByGroup(COMMON_CODE.POSITION_CODE));
        setLevelOptions(getCodesByGroup(COMMON_CODE.POSITION_LEVEL_CODE));
    }
    const handleOnChange = (name: keyof Position, value: Position[keyof Position]) => {
        onChange?.(index, {
            ...position,
            [name]: value,
        });
    };

    const handleOnDelete = () => {
        onChange?.(index);
    }

    useEffect(()=>{
        initialize();
    }, []);

    return <div className="field-box flex-col">
                <div className="align-center">
                    <FormControl variant='outlined' sx={{ minWidth: '27rem' }}>
                    <Select 
                        id='filter' 
                        name='position'
                        value={position.position}
                        onChange={(e) =>handleOnChange(
                                    e.target.name as keyof Position,
                                    e.target.value as Position[keyof Position]
                                )} 
                        size='medium' 
                        displayEmpty
                        renderValue={(selected) => 
                        selected === '' ? '포지션' : positionOptions.find(item => item.code === selected)?.name}>
                        {positionOptions.map((item)=><MenuItem value={item.code}>{item.name}</MenuItem>)}
                    </Select>
                    </FormControl>
                    <FormControl variant='outlined' sx={{ minWidth: '17rem' }}>
                    <Select 
                        id='filter'
                        name='level'
                        value={position.level}
                        onChange={(e) => handleOnChange(
                                    e.target.name as keyof Position,
                                    e.target.value as Position[keyof Position]
                                    )} 
                        size='medium'
                        displayEmpty
                        renderValue={(selected) => 
                        selected === '' ? '레벨' : levelOptions.find(item => item.code === selected)?.name}>
                        {levelOptions.map((item)=><MenuItem value={item.code}>{item.name}</MenuItem>)}
                    </Select>
                    </FormControl>
                    <CustomTextfield 
                        name='capacity' 
                        sx={{ width: '6rem' }}
                        value={position.capacity}
                        onChange={(e) => handleOnChange(
                                    e.target.name as keyof Position,
                                    Number(e.target.value) as Position[keyof Position]
                                    )}  />              
                    <p>명</p>
                    <IconButton size='small' onClick={handleOnDelete}><Remove sx={{ fontSize: 24, color: 'text.disabled' }} /></IconButton>
                </div>
            </div>
};