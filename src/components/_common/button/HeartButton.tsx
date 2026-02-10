import useUpdateProjectLike from '@/hooks/projects/useUpdateProjectLike';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';

export interface HeartButtonProps {
  projectId: string;
  likeCount?: string;
  className?: string;
  noCount?: boolean;
  defaultLiked?: boolean;
}
export default function HeartButton({
  projectId,
  likeCount,
  className,
  noCount = false,
  defaultLiked = false,
  onClick
}: HeartButtonProps){
}: HeartButtonProps) {
  const [liked, setLiked] = useState(defaultLiked);
  const { toggleLike } = useUpdateProjectLike();

  const handleClick = async () => {
    const res = await toggleLike(projectId, liked);
    if (res.success) {
      setLiked(prev => !prev);
    }
  const handleClick = () => {
    setLiked(prev => !prev);
    onClick?.();
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
          {liked ? Number(likeCount) + 1 : Number(likeCount)}
        </p>
      }
    </div>
  )
}

