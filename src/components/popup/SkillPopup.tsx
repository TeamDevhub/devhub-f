import React, { useEffect, useState } from 'react'
import WebPopup from './WebPopup'
import { getCodesByGroup } from '@/utils/common.util';
import CheckAbleChip from '../common/CheckAbleChip';
import CustomTextfield from '../common/CustomTextfield';
import { Button } from '@mui/material';
import type { CommonCodeItem } from '@/types/common.type';

export interface SkillPopupProps{
  onClose?:()=>void;
  isOpen:boolean;
  setOpen:(open:boolean)=>void;
  values:string[],
  setValues: (value: string[]) => void;
}

export default function SkillPopup({
  onClose,
  isOpen,
  setOpen,
  values,
  setValues,
}:SkillPopupProps) {

  const [skillCode, setSkillCode] = useState<CommonCodeItem[]>([]);
  const [_values, _setValues] = useState(values);

  useEffect(() => {
    const codeList = getCodesByGroup('SKILL_CODE');
    setSkillCode(codeList);
  }, []);

  useEffect(() => {
    if (isOpen) _setValues(values);
    
  }, [isOpen, values]);

  const handleOnClick = (value:string, checked:boolean) => {
    if(checked){
      _setValues([..._values, value]);
    }else{
      _setValues(_values.filter((item) => item != value));
    }
  }

  const handleSubmit = () => {
    setValues(_values);
  }

  const hasValue = (value: string) => {
    return _values.includes(value);
  }

  return (
    <WebPopup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      setOpen={setOpen}
      title='스킬 전체보기'
      onClose={onClose}
    >
      <div className='flex-col gap-8' style={{padding: "0 20px"}}>
        <div className='align-center mt-24 gap-4'>
          <CustomTextfield size='small' type='search' placeholder='스킬 검색' />
          <Button size='medium' variant='contained'>검색</Button>
        </div>
        <div className='flex gap-4'>
        {skillCode.map((item, index)=>(
          <CheckAbleChip
            checked={hasValue(item.code)}
            name={item.name}
            value={item.code}
            onClick={handleOnClick}
            key={index}
          />
        ))}
        </div>
      </div>
    </WebPopup>
  )
}
