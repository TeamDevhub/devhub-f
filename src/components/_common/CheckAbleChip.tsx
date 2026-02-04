import type { CheckAbleComponentProps } from "@/types/type._common";
import { Chip } from "@mui/material";

export default function CheckAbleChip({
  name,
  value,
  onClick,
  checked = false,
  ...res
} : CheckAbleComponentProps){

  const handleOnClick = () => {
    onClick(value);
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