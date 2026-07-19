import {Favorite, FavoriteBorder} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {useEffect, useState} from 'react';

export interface HeartButtonProps {
  likeCount?: string;
  className?: string;
  noCount?: boolean;
  defaultLiked?: boolean;
  disabled?: boolean;
  /** false를 반환하면 하트 상태를 낙관적으로 토글하지 않는다 (예: 비로그인 사용자) */
  onBeforeToggle?: () => boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, liked:boolean) => void | Promise<unknown>;
}
export default function HeartButton({
  likeCount,
  className,
  noCount = false,
  defaultLiked = false,
  disabled = false,
  onBeforeToggle,
  onClick
}: HeartButtonProps){
  const [liked, setLiked] = useState(defaultLiked);
  const [pending, setPending] = useState(false);

  // defaultLiked는 서버 응답 기반 값이다. useState의 초기값은 최초 마운트 시점에만 반영되므로,
  // 페이지 새로고침 직후의 인증 타이밍, 같은 라우트에서 다른 게시글/프로젝트로 이동, refetch 등으로
  // defaultLiked가 마운트 이후에 도착하거나 바뀌면 로컬 liked가 서버 상태와 어긋난 채로 남는다.
  // 좋아요 API는 켜기/끄기를 명시하지 않는 토글 방식이라, 이 불일치가 곧 "이미 눌렀는데 다시 눌린다" 버그로 이어진다.
  useEffect(() => {
    setLiked(defaultLiked);
  }, [defaultLiked]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || pending) return;

    e.stopPropagation();

    if (onBeforeToggle && !onBeforeToggle()) {
      onClick?.(e, liked);
      return;
    }

    const nextLiked = !liked;
    setLiked(nextLiked);

    // 요청이 끝나기 전까지 버튼을 잠가 같은 좋아요 요청이 중복으로 나가는 것을 막는다
    setPending(true);
    try {
      await onClick?.(e, nextLiked);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={['heart-box flex-col align-end', className].filter(Boolean).join(' ')}>
      <IconButton size='small' disabled={disabled || pending} onClick={handleClick}>
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
