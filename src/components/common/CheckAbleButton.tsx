import type { CheckAbleComponentProps } from "@/types/components.type";
import { Button } from "@mui/material";
import { useState } from "react";

export default function CheckAbleButton({
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
    <Button
      size='small' 
      variant={_checked ? "contained" : "outlined"} 
      onClick={handleOnClick} 
      {...res}
    >{name}</Button>
  )
  
}