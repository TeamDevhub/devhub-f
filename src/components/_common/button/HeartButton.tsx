import {Favorite, FavoriteBorder} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {useState} from 'react';

export interface HeartButtonProps {
  likeCount?: string;
  className?: string;
  noCount?: boolean;
  defaultLiked?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, liked:boolean)=>void;
}
export default function HeartButton({
  likeCount,
  className,
  noCount = false,
  defaultLiked = false,
  disabled = false,
  onClick
}: HeartButtonProps){
  const [liked, setLiked] = useState(defaultLiked);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    
    e.stopPropagation(); 
    const nextLiked = !liked;
    setLiked(nextLiked);
    onClick?.(e, nextLiked);
  };

  return (
    <div className={['heart-box flex-col align-end', className].filter(Boolean).join(' ')}>
      <IconButton size='small' disabled={disabled} onClick={handleClick}>
        {liked ? (
          <Favorite sx={{ fontSize: 24, color: '#D05B5B !important' }} />
        ) : (
          <FavoriteBorder sx={{ fontSize: 24, color: '#D05B5B' }} />
        )}
      </IconButton>
      {!noCount &&
        <p className='heart-count'>
          {(liked == defaultLiked) && Number(likeCount)}
          {(liked && !defaultLiked) && Number(likeCount) + 1}
          {(!liked && defaultLiked) && Number(likeCount) - 1}
        </p>
      }
    </div>
  )
}

