import type { CommonCodeItem } from '@/types/type._common';
import { getCodeName, getCodesByGroup } from '@/utils/util._common';
import { Checkbox, Chip, List, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import WebPopup from './WebPopup';

export interface RegionPopupProps{
  isOpen:boolean;
  values?:string[],
  setOpen:(open:boolean)=>void;
  setValues: (value: string[]) => void;
  onClose?:()=>void;
  multiple?:boolean;
}

export default function RegionPopup({
  isOpen,
  values,
  setOpen,
  setValues,
  onClose,
  multiple = false,
}:RegionPopupProps) {

  const [regionCode, setRegionCode] = useState<CommonCodeItem[]>([]);
  const [_values, _setValues] = useState(values??[]);
  const [tab, setTab] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const getChildren = (code: string) => {
    return regionCode.find(item => item.code == code)?.children;
  }

  useEffect(() => {
    const codeList = getCodesByGroup('REGION_CODE');
    setRegionCode(codeList);
  }, []);

  useEffect(() => {
    regionCode && regionCode.length > 0 && setTab(regionCode[0].code);
  }, [regionCode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [tab]);

  useEffect(() => {
    if (isOpen && values) _setValues(values);
  }, [isOpen, values]);
  
  const hasValue = (value: string) => {
    return _values.includes(value)
  }

  const handleChange = (e: React.SyntheticEvent, newValue: string) => setTab(newValue);

  const handleOnClick = (value:string, checked:boolean) => {
    if(checked){
      const newValue = multiple ? [..._values, value] : [value];
      _setValues(newValue);
    }else{
      _setValues(_values.filter((item) => item != value));
    }
  }

  const handleSubmit = () => setValues(_values);
  
  return (
    <WebPopup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      setOpen={setOpen}
      title='지역 선택'
      onClose={onClose}
    >
      <div className='flex-col gap-8' style={{padding: "0 20px"}}>
        <div className='align-stretch mt-24 gap-4 h-fit' style={{height:'40vh'}}>
          <div style={{flexShrink: '0'}}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tab}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              {regionCode.map((item, index)=>(
                <Tab label={item.name} value={item.code} key={index}/>  
              ))}
            </Tabs>
          </div>
          <div className='w-100' style={{overflowY:'scroll', display:'flex'}} ref={scrollRef}>
            <List className='w-100' sx={{padding: 0}}>
              {getChildren(tab)?.map((item, index)=>(
                <ListItem 
                  key={index} 
                  label={item.name} 
                  value={item.code} 
                  useCheckBox={multiple} 
                  onClick={handleOnClick} 
                  checked={hasValue(item.code)} 
                />
              ))}
            </List>
          </div>
        </div>
        {multiple && 
          <div className='flex-wrap mt-12 gap-4'>
            {_values.map((v, index)=>(
              <Chip 
                key={index} 
                size='small' 
                variant='filled' 
                color='primary' 
                label={getCodeName(regionCode, v)} 
                onDelete={()=>{handleOnClick(v, false)}}
                clickable 
              />
            ))}
          </div>
        }
      </div>
    </WebPopup>
  )
}

function ListItem({
  label,
  value,
  onClick,
  useCheckBox = false,
  checked = false,
}:{
  label:string;
  value:string;
  onClick?:(v:string, checked:boolean)=>void;
  useCheckBox?:boolean;
  checked?:boolean;
}){

  const handleClick = ()=>{
    onClick && onClick(value, !checked);
  }

  return(
    <ListItemButton selected={!useCheckBox && checked} onClick={handleClick} sx={{minHeight: '48px'}}>
      {useCheckBox && 
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
      }
      <ListItemText id={`test`} primary={label} sx={{fontSize: '1.4rem', fontWeight: '500'}}/>
    </ListItemButton>
  )
}