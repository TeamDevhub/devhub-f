import type { CheckAbleComponentProps } from "@/types/type._common";
import { Button } from "@mui/material";

export default function CheckAbleButton({
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
    <Button
      size='small' 
      variant={checked ? "contained" : "outlined"} 
      onClick={handleOnClick} 
      {...res}
    >{name}</Button>
  )
  
}