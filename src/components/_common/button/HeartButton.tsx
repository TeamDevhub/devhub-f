import {Favorite, FavoriteBorder} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {useState} from 'react';

export interface HeartButtonProps {
  likeCount?: string;
  className?: string;
  noCount?: boolean;
  defaultLiked?: boolean;
  onClick?: (liked:boolean)=>void;
}
export default function HeartButton({
  likeCount,
  className,
  noCount = false,
  defaultLiked = false,
  onClick
}: HeartButtonProps){
  const [liked, setLiked] = useState(defaultLiked);

  const handleClick = () => {
    setLiked(prev => !prev);
    onClick?.(!liked);
  };

  return (
    <div className={['heart-box flex-col align-end', className].filter(Boolean).join(' ')}>
      <IconButton size='small' onClick={handleClick}>
        {liked ? (
          <Favorite sx={{ fontSize: 24, color: '#D05B5B' }} />
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

