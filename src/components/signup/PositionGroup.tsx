import { Chip } from '@mui/material';
import { COMMON_CODE } from '@/types/const';
import { getSelectOptions } from '@/utils/util._common';

interface PositionGroupProps {
  positionList: string[];
  onChange: (values: string[]) => void;
}

export default function PositionGroup({ positionList, onChange }: PositionGroupProps) {
  const positionOptions = getSelectOptions(COMMON_CODE.POSITION_CODE);

  const togglePosition = (code: string) => {
    if (positionList.includes(code)) {
      onChange(positionList.filter((v) => v !== code));
    } else {
      onChange([...positionList, code]);
    }
  };

  return (
    <div className="field-box2 flex-col">
      <div className="field-title align-center">
        <p>관심 포지션</p>
      </div>

      <div className="field-content flex-col" style={{ gap: '0.5rem' }}>
        <div className="chip-box w-100 align-center flex-wrap">
          {positionOptions.map((pos) => (
            <Chip key={pos.value} label={pos.label} color={positionList.includes(pos.value) ? 'primary' : 'default'} clickable onClick={() => togglePosition(pos.value)} />
          ))}
        </div>

        <span className="help-text">관심 포지션은 필수로 선택해야합니다.</span>
      </div>
    </div>
  );
}
