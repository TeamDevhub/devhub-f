import { COMMON_CODE } from '@/types/const';
import { getCodesByGroup } from '@/utils/util._common';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import CustomTextfield from '../customMUI/CustomTextfield';
import WebPopup from './WebPopup';
import SelectableGroup from '@/components/_common/SelectableGroup.tsx';
import { useEffect } from 'react';

export interface SkillPopupProps {
  isOpen: boolean;
  values?: string[];
  setValues: (value: string[]) => void;
  onClose?: () => void;
}

export default function SkillPopup({ isOpen, values, setValues, onClose }: SkillPopupProps) {
  const allSkills = getCodesByGroup(COMMON_CODE.SKILL_CODE);

  const [_values, _setValues] = useState<string[]>(values ?? []);
  const [keyword, setKeyword] = useState('');
  const [searchTrigger, setSearchTrigger] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        _setValues(values ?? []);
      }, 0);
    }
  }, [isOpen, values]);

  const filteredSkills = allSkills.filter((item) => item.name.toLowerCase().includes(searchTrigger.toLowerCase()));

  const handleOnClick = (value: string) => {
    _setValues((prev) => (hasValue(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const handleSubmit = () => {
    setValues(_values);
  };

  const hasValue = (value: string) => {
    return _values.includes(value);
  };

  const handleClick = () => setSearchTrigger(keyword.trim());
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setKeyword(e.target.value);

  return (
    <WebPopup isOpen={isOpen} onSubmit={handleSubmit} title="스킬 전체보기" onClose={onClose}>
      <div className="flex-col gap-8" style={{ padding: '0 20px' }}>
        <div className="align-stretch mt-24 gap-4">
          <CustomTextfield value={keyword} onChange={handleChange} size="small" type="search" placeholder="스킬 검색" />
          <Button size="medium" variant="contained" onClick={handleClick}>
            검색
          </Button>
        </div>
        <div className="flex gap-4">
          <SelectableGroup type="chip" values={_values} items={filteredSkills} onToggle={handleOnClick} />
        </div>
      </div>
    </WebPopup>
  );
}
