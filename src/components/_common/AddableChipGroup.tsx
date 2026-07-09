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
  <>
    {values?.map((v) => {
      const label = getCodeName(CodeName, v);
      return (
        <Chip key={v} size='small' variant='filled' label={label} color='primary' onDelete={() => onDelete(v)} />
      );
    })}
    <IconButton size='small' onClick={onAdd}>
      <AddCircle sx={{ fontSize: 24, color: 'primary.main' }} />
    </IconButton>
  </>
)};