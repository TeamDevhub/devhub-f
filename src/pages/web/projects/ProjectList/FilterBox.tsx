import CheckAbleButton from "@/components/common/CheckAbleButton";
import CheckAbleChip from "@/components/common/CheckAbleChip";
import type { CommonCode, CommonCodeItem } from "@/types/common.type";
import { getCodeName, getCodesByGroup } from "@/utils/common.util";
import { AddCircle } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

export interface FilterBoxProps {
  title: string;
  subText?: string;
  type: "button" | "chip" | "addableChip";
  codeName?: CommonCode;
  options?: CommonCodeItem[];
  useAll?: boolean;
  values?: string[];
  setValues: (value: string[]) => void;
  onClickAddBtn?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const FilterBox = React.memo(({
  title,
  subText,
  type,
  codeName,
  options,
  useAll = false,
  values = [],
  setValues,
  onClickAddBtn,
} : FilterBoxProps) => {

  const [codeGroup, setCodeGroup] = useState<CommonCodeItem[]>([]);

  useEffect(()=>{
    if(codeName){
      setCodeGroup(getCodesByGroup(codeName));
    }else if(options){
      setCodeGroup(options);
    }
  },[])

  const getName = (v: string) => {
    if(codeName){
      return getCodeName(codeGroup, v);
    }else if(options){
      options.find(item => item.code === v)?.name ?? ""
    }
  }

  const handleOnClick = (value:string, checked:boolean) => {
    if(checked){
      setValues([...values, value]);
    }else{
      handleOnDelete(value);
    }
  }

  const handleOnDelete = (value:string) => {
    setValues(values.filter((item) => item != value));
  }

  const hasValue = (value: string) => {
    return values.includes(value);
  }

  const setButtonGroup = () => {
    return (
      <>
        {useAll && <CheckAbleButton name='전체' value='' checked={true} onClick={handleOnClick}/>}
        {codeGroup.map((item, index)=>(
          <CheckAbleButton key={index} checked={hasValue(item.code)} name={item.name} value={item.code} onClick={handleOnClick}/>
        ))}
      </>
    )
  }

  const setChipGroup = () => {
    return (
      <>
        {useAll && <CheckAbleChip name='전체' value='' checked={true} onClick={handleOnClick}/>}
        {codeGroup.map((item, index)=>(
          <CheckAbleChip key={index} checked={hasValue(item.code)} name={item.name} value={item.code} onClick={handleOnClick}/>
        ))}
      </>
    )
  }

  const setAddableChipGroup = () => {
    return (
      <>
        {values.map((v, index)=>(
          <Chip key={index} size='small' variant='filled' label={getName(v)} color='primary' clickable onDelete={()=>{handleOnDelete(v)}} />
        ))}
        <IconButton size='small' onClick={onClickAddBtn}><AddCircle sx={{ fontSize: 24, color: 'primary.main' }} /></IconButton>
      </>
    )
  }

  return (
    <FilterWarpper title={title} subText={subText}>
      {type == "button" && setButtonGroup()}
      {type == "chip" && setChipGroup()}
      {type == "addableChip" && setAddableChipGroup()}
    </FilterWarpper>
  )
});

export function FilterWarpper({
  title,
  subText,
  children
}:{
  title: string;
  subText?: string;
  children: React.ReactNode;
}){
  return (
    <div className='filter-box flex-col'>
      <div className='filter-title align-start justify-between'>
        <div className='text-box flex-col'>
          <strong>{title}</strong>
          {subText && <p>{subText}</p>}
        </div>
      </div>
      <div className='filter-options align-center flex-wrap'>
        {children}
      </div>
    </div>
  )
}

export default FilterBox;