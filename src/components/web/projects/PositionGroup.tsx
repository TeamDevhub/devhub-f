import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import { COMMON_CODE } from '@/constants/codes';
import type { Position } from '@/types/type.projects';
import { AddCircle, Remove } from '@mui/icons-material';
import { FormControl, IconButton, MenuItem, Select } from '@mui/material';
import { useCodes } from '@/contexts/CommonCodeContext.ts';

interface PositionGroupProps {
  positionList: Position[];
  onChange?: (newPosition: Position[]) => void;
}

interface PositionFieldProps {
  position: Position;
  index: number;
  onChange?: (key: number, newPosition?: Position) => void;
}

export default function PositionGroup({ positionList, onChange }: PositionGroupProps) {
  const onHandlePositionField = (index1: number, newPosition?: Position) => {
    const newPositionList = newPosition
      ? positionList.map((item, index2) => (index1 === index2 ? newPosition : item))
      : positionList.filter((_, index2) => index1 !== index2);
    onChange?.(newPositionList);
  };

  const onHandleAddPositionField = () => {
    const newPositionList = positionList.concat({
      position: '',
      level: '',
      capacity: 0,
    });
    onChange?.(newPositionList);
  };
  return (
    <>
      <div className="position-group flex-col">
        {positionList.map((position, index) => (
          <PositionField key={index} position={position} onChange={onHandlePositionField} index={index} />
        ))}
      </div>
      <IconButton className="icon-add-btn" size="small" onClick={onHandleAddPositionField} aria-label="모집 포지션 추가">
        <AddCircle sx={{ fontSize: 35, color: 'primary.main' }} />
      </IconButton>
    </>
  );
}

function PositionField({ position, index, onChange }: PositionFieldProps) {
  const { getCodesByGroup } = useCodes();
  const positionOptions = getCodesByGroup(COMMON_CODE.POSITION_CODE);
  const levelOptions = getCodesByGroup(COMMON_CODE.POSITION_LEVEL_CODE);

  const handleOnChange = (name: keyof Position, value: Position[keyof Position]) => {
    onChange?.(index, {
      ...position,
      [name]: value,
    });
  };

  const handleOnDelete = () => {
    onChange?.(index);
  };

  return (
    <div className="position-field-row flex-col">
      <div className="align-center">
        <FormControl variant="outlined" sx={{ minWidth: '27rem' }}>
          <Select
            id="filter"
            value={position.position}
            onChange={(e) => handleOnChange('position', e.target.value as Position[keyof Position])}
            size="medium"
            displayEmpty
            renderValue={(selected) => (selected === '' ? '포지션' : positionOptions.find((item) => item.code === selected)?.name)}
          >
            {positionOptions.map((item) => (
              <MenuItem value={item.code}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: '17rem' }}>
          <Select
            id="filter"
            value={position.level}
            onChange={(e) => handleOnChange('level', e.target.value as Position[keyof Position])}
            size="medium"
            displayEmpty
            renderValue={(selected) => (selected === '' ? '레벨' : levelOptions.find((item) => item.code === selected)?.name)}
          >
            {levelOptions.map((item) => (
              <MenuItem value={item.code}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <CustomTextfield
          sx={{ minWidth: '10rem' }}
          value={position.capacity}
          onChange={(e) => handleOnChange('capacity', Number(e.target.value) as Position[keyof Position])}
        />
        <p>명</p>
        <IconButton className="icon-remove-btn" size="small" onClick={handleOnDelete} aria-label="포지션 삭제">
          <Remove sx={{ fontSize: 24, color: 'text.disabled' }} />
        </IconButton>
      </div>
    </div>
  );
}
