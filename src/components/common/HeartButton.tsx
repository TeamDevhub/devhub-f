import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'

export interface HeartButtonProps {
  likeCount: string;
}

export default function HeartButton({likeCount}: HeartButtonProps){
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(prev => !prev);
  };

  return (
    <div className='heart-box flex-col align-end'>
      <IconButton size='small' onClick={handleClick}>
        {liked ? (
          <Favorite sx={{ fontSize: 24, color: '#D05B5B' }} />
        ) : (
          <FavoriteBorder sx={{ fontSize: 24, color: '#D05B5B' }} />
        )}
      </IconButton>
      <p className='heart-count'>
        {liked ? likeCount + 1 : likeCount}
      </p>
    </div>
  )
}

