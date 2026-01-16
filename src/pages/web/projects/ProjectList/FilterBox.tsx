import CheckAbleButton from "@/components/common/CheckAbleButton";
import CheckAbleChip from "@/components/common/CheckAbleChip";
import type { CommonCode, CommonCodeItem } from "@/types/common.type";
import { getCodesByGroup, getCodeName } from "@/utils/common.util";
import { AddCircle } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

export interface FilterBoxProps {
  title: string;
  subText?: string;
  type: "button" | "chip" | "addableChip";
  codeName?: CommonCode;
  options?: CommonCodeItem[];
  useAll?: boolean;
  values: string[];
  setValues: Dispatch<SetStateAction<string[]>>
}

export default function FilterBox({
  title,
  subText,
  type,
  codeName,
  options,
  useAll = false,
  values,
  setValues,
} : FilterBoxProps){

  let codeGroup :CommonCodeItem[] = [];

  if(codeName){
    codeGroup = getCodesByGroup(codeName);
  }else if(options){
    codeGroup = options;
  }

  const getName = (v: string) => {
    if(codeName){
      return getCodeName(codeName, v);
    }else if(options){
      options.find(item => item.code === v)?.name ?? ""
    }
    
  }

  const handleOnClick = (value:string, checked:boolean) => {
    if(checked){
      setValues((prev) => [...prev, value]);
    }else{
      setValues((prev) => prev.filter((item) => item != value));
    }
  }

  const handleOnDelete = (value:string) => {
    setValues((prev) => prev.filter((item) => item != value));
  }

  const setButtonGroup = () => {
    return (
      <>
        {useAll && <CheckAbleButton name='전체' value='' checked={true} onClick={handleOnClick}/>}
        {codeGroup.map((item)=>(
          <CheckAbleButton name={item.name} value={item.code} onClick={handleOnClick}/>
        ))}
      </>
    )
  }

  const setChipGroup = () => {
    return (
      <>
        {useAll && <CheckAbleChip name='전체' value='' checked={true} onClick={handleOnClick}/>}
        {codeGroup.map((item)=>(
          <CheckAbleChip name={item.name} value={item.code} onClick={handleOnClick}/>
        ))}
      </>
    )
  }

  const setAddableChipGroup = () => {
    return (
      <>
        {values.map((v)=>(
          <Chip size='small' variant='filled' label={getName(v)} color='primary' clickable onDelete={()=>{handleOnDelete(v)}} />
        ))}
        <IconButton size='small'><AddCircle sx={{ fontSize: 24, color: 'primary.main' }} /></IconButton>
      </>
    )
  }

  return (
  <div className='filter-box flex-col'>
    <div className='filter-title align-start justify-between'>
      <div className='text-box flex-col'>
        <strong>{title}</strong>
        {subText && <p>{subText}</p>}
      </div>
    </div>
    <div className='filter-options align-center flex-wrap'>
      {type == "button" && setButtonGroup()}
      {type == "chip" && setChipGroup()}
      {type == "addableChip" && setAddableChipGroup()}
    </div>
  </div>
  )
}