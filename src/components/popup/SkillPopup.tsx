import { COMMON_CODE, type CommonCodeItem } from '@/types/common.type';
import { getCodesByGroup } from '@/utils/common.util';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CheckAbleChip from '../common/CheckAbleChip';
import CustomTextfield from '../common/CustomTextfield';
import WebPopup from './WebPopup';

export interface SkillPopupProps{
  isOpen:boolean;
  values?:string[],
  setOpen:(open:boolean)=>void;
  setValues: (value: string[]) => void;
  onClose?:()=>void;
}

export default function SkillPopup({
  isOpen,
  values,
  setOpen,
  setValues,
  onClose,
}:SkillPopupProps) {

  const [skillCode, setSkillCode] = useState<CommonCodeItem[]>([]);
  const [_values, _setValues] = useState(values ?? []);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setSkillCode(getCodesByGroup(COMMON_CODE.SKILL_CODE));
  }, []);

  useEffect(() => {
    if (isOpen) _setValues(values ?? []);
  }, [isOpen, values]);

  useEffect(() => {
    if (isOpen) { 
      setKeyword('');
      setSkillCode(getCodesByGroup(COMMON_CODE.SKILL_CODE));
    }
  }, [isOpen]);

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

  const handleClick = () => {
    const cleanKeyword = keyword.trim().toLowerCase();
    setSkillCode(getCodesByGroup(COMMON_CODE.SKILL_CODE).filter((item)=> item.name.toLowerCase().includes(cleanKeyword)));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKeyword(e.target.value);
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
        <div className='align-stretch mt-24 gap-4'>
          <CustomTextfield value={keyword} onChange={handleChange} size='small' type='search' placeholder='스킬 검색' />
          <Button size='medium' variant='contained' onClick={handleClick}>검색</Button>
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
