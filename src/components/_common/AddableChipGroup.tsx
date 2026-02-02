import type { CommonCodeItem } from "@/types/type._common";
import { AddCircle } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";

export default function AddableChipGroup({ 
  values, 
  items, 
  onDelete, 
  onAdd 
}: { 
  values: string[] | undefined; 
  items: CommonCodeItem[]; 
  onDelete: (v: string) => void; 
  onAdd?: () => void;
}){
  return (
  <>
    {values?.map((v) => {
      const label = items.find(item => item.code === v)?.name ?? "";
      return (
        <Chip key={v} size='small' variant='filled' label={label} color='primary' onDelete={() => onDelete(v)} />
      );
    })}
    <IconButton size='small' onClick={onAdd}>
      <AddCircle sx={{ fontSize: 24, color: 'primary.main' }} />
    </IconButton>
  </>
)};