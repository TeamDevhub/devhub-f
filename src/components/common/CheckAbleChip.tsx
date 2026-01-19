import type { CheckAbleComponentProps } from "@/types/components.type";
import { Chip } from "@mui/material";

export default function CheckAbleChip({
  name,
  value,
  onClick,
  checked = false,
  ...res
} : CheckAbleComponentProps){

  const handleOnClick = () => {
    onClick(value, !checked);
  }

  return (
    <Chip 
      size='small' 
      variant='filled' 
      label={name} 
      clickable 
      onClick={handleOnClick}
      color={checked ? 'primary' : 'default'}
      {...res}
    />
  )
  
}