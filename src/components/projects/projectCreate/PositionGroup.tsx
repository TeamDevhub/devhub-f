import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import { COMMON_CODE } from '@/types/const';
import type { CommonCodeItem } from '@/types/type._common';
import type { Position } from '@/types/type.projects';
import { getCodesByGroup } from '@/utils/util._common';
import { AddCircle, Remove } from '@mui/icons-material';
import { FormControl, IconButton, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';

interface PositionGroupProps {
    positionList: Position[];
    onChange?: (newPosition: Position[]) => void;
}

interface PositionFieldProps {
    position: Position;
    index: number;
    onChange?: (key: number, newPosition?: Position) => void;
}

export default function PositionGroup ({
    positionList,
    onChange
}: PositionGroupProps) {

    const onHandlePositionField = (index1: number, newPosition?: Position) => {
        let newPositionList = positionList;
        if(!newPosition){
            newPositionList = positionList.filter((_, index2)=>index1 !== index2);
        } else {
            newPositionList = positionList.map((item, index2)=>index1 === index2 ? newPosition : item);
        }
        onChange?.(newPositionList);
        }

    const onHandleAddPositionField = () => {
        const newPositionList = positionList.concat({
            position: '',
            level: '',
            capacity: 0,
        });
        onChange?.(newPositionList);
    }
    return <>
        <div className="field-box flex-col">
            {positionList.map((position, index) => (
                <PositionField
                    key={index}
                    position={position}
                    onChange={onHandlePositionField}
                    index={index}
                />
            ))}
        </div>
        <IconButton size='small' onClick={onHandleAddPositionField}><AddCircle sx={{ fontSize: 35, color: 'primary.main' }} /></IconButton>
    </>
}

function PositionField ({
    position,
    index,
    onChange
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
                        value={position.position}
                        onChange={(e) =>handleOnChange(
                                    "position",
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
                        value={position.level}
                        onChange={(e) => handleOnChange(
                                    "level",
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
                        sx={{ width: '6rem' }}
                        value={position.capacity}
                        onChange={(e) => handleOnChange(
                                    "capacity",
                                    Number(e.target.value) as Position[keyof Position]
                                    )}  />              
                    <p>명</p>
                    <IconButton size='small' onClick={handleOnDelete}><Remove sx={{ fontSize: 24, color: 'text.disabled' }} /></IconButton>
                </div>
            </div>
};