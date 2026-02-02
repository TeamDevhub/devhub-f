import CheckAbleButton from "@/components/_common/CheckAbleButton";
import CheckAbleChip from "@/components/_common/CheckAbleChip";
import type { CommonCode, CommonCodeItem } from "@/types/type._common";
import { getCodesByGroup } from "@/utils/util._common";
import { AddCircle } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import React, { useMemo } from "react";

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

  const codeGroup = useMemo(() => {
    if (codeName) return getCodesByGroup(codeName);
    if (options) return options;
    return [];
  }, [codeName, options]);

  const getName = (v: string) => {
    return codeGroup.find(item => item.code === v)?.name ?? "";
  };

  const handleOnClick = (value:string, checked:boolean) => {
    if (value === '') {
      setValues([]);
      return;
    }

    if(checked){
      setValues([...values, value]);
    }else{
      setValues(values.filter((item) => item !== value));
    }
  }

  const hasValue = (value: string) => {
    if (value === '') return values.length === 0;
    return values.includes(value);
  };

  const renderItems = () => {
    if (type === "addableChip") {
      return (
        <>
          {values.map((v) => (
            <Chip 
              key={v} 
              size='small' 
              variant='filled' 
              label={getName(v)} 
              color='primary' 
              onDelete={() => handleOnClick(v, false)} 
            />
          ))}
          <IconButton size='small' onClick={onClickAddBtn}>
            <AddCircle sx={{ fontSize: 24, color: 'primary.main' }} />
          </IconButton>
        </>
      );
    }

    const Component = type === "button" ? CheckAbleButton : CheckAbleChip;

    return (
      <>
        {useAll && (
          <Component 
            name='전체' 
            value='' 
            checked={hasValue('')} 
            onClick={handleOnClick} 
          />
        )}
        {codeGroup.map((item) => (
          <Component 
            key={item.code} 
            checked={hasValue(item.code)} 
            name={item.name} 
            value={item.code} 
            onClick={handleOnClick} 
          />
        ))}
      </>
    );
  };

  return (
    <FilterWarpper title={title} subText={subText}>
      {renderItems()}
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