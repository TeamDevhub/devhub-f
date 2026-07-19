import type {CommonCode} from "@/types/type._common";
import {AddCircle} from "@mui/icons-material";
import {Chip, IconButton} from "@mui/material";
import {useCodes} from "@/contexts/CommonCodeContext.ts";

export default function AddableChipGroup({
  values,
  CodeName,
  onDelete,
  onAdd
}: {
  values: string[] | undefined;
  CodeName: CommonCode;
  onDelete: (v: string) => void;
  onAdd?: () => void;
}){

  const {getCodeName} = useCodes();

  return (
  <div className="addable-chip-group align-center flex-wrap">
    {values?.map((v) => {
      const label = getCodeName(CodeName, v);
      return (
        <Chip key={v} size='small' variant='filled' label={label} color='primary' onDelete={() => onDelete(v)} />
      );
    })}
    <IconButton className="icon-add-btn" size='small' onClick={onAdd} aria-label='추가'>
      <AddCircle sx={{ fontSize: 24, color: 'primary.main' }} />
    </IconButton>
  </div>
)};