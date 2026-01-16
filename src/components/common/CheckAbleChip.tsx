import type { CheckAbleComponentProps } from "@/types/components.type";
import { Chip } from "@mui/material";
import { useState } from "react";

export default function CheckAbleChip({
  name,
  value,
  onClick,
  checked = false,
  ...res
} : CheckAbleComponentProps){

  const [_checked, setChecked] = useState<boolean>(checked);
  const handleOnClick = () => {
    const returnChecked = !_checked;
    setChecked(returnChecked);
    onClick(value, returnChecked);
  }

  return (
    <Chip 
      size='small' 
      variant='filled' 
      label={name} 
      clickable 
      onClick={handleOnClick}
      color={_checked ? 'primary' : 'default'}
      {...res}
    />
  )
  
}