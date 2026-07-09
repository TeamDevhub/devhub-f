import { Avatar, Badge, type AvatarProps } from '@mui/material';
import { type ReactNode } from 'react';

export interface CustomAvatarProps extends AvatarProps {
  useBadge?: boolean;
  size?: number;
  bgColor?: string;
  avatarIcon?: ReactNode;
}

export default function CustomAvatar({
  useBadge = false,
  size = 40,
  bgColor = 'transparent',
  avatarIcon,
  sx,
  ...rest
}: CustomAvatarProps){
  return (
    <Badge 
      variant="dot" 
      color="error" 
      invisible={!useBadge}
      sx={{ '& .MuiBadge-dot': { width: 8, height: 8 }}} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
    >
      <Avatar sx={{ width: size, height: size, bgcolor: bgColor, ...sx }} {...rest}>
        {avatarIcon}
      </Avatar>
    </Badge>
  )
}

