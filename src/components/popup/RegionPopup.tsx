import React, { useEffect, useState } from 'react'
import WebPopup from './WebPopup'
import { getCodesByGroup } from '@/utils/common.util';
import CheckAbleChip from '../common/CheckAbleChip';
import CustomTextfield from '../common/CustomTextfield';
import { Button, Menu, Tabs } from '@mui/material';
import type { CommonCodeItem } from '@/types/common.type';

export interface RegionPopupProps{
  isOpen:boolean;
  values?:string[],
  setOpen:(open:boolean)=>void;
  setValues: (value: string[]) => void;
  onClose?:()=>void;
  multiple:boolean;
}

export default function RegionPopup({
  isOpen,
  values,
  setOpen,
  setValues,
  onClose,
}:RegionPopupProps) {

  const [RegionCode, setRegionCode] = useState<CommonCodeItem[]>([]);
  const [_values, _setValues] = useState(values??[]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const codeList = getCodesByGroup('REGION_CODE');
    setRegionCode(codeList);
  }, []);

  useEffect(() => {
    if (isOpen && values) _setValues(values);
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

  const handleChange = () => {

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
          <div>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tab}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            
          </Tabs>
          </div>
          <div>

          </div>
        </div>
      </div>
    </WebPopup>
  )
}
