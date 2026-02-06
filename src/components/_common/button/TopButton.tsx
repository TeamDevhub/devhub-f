import { ArrowUpward } from '@mui/icons-material';
import { Paper } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

export default function TopButton({ onClick }: { onClick: () => void }){
  const [showTopButton, setShowTopButton] = useState(false);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClick();
  }, [onClick]);

  useEffect(() => {
    const onScroll = () => {
      setShowTopButton(window.scrollY > 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
    
  return (
    <>
      {showTopButton && (
        <Paper
          className='float-button top-button flex-center'
          elevation={5}
          role="button"
          tabIndex={0}
          onClick={handleScrollTop}
        >
          <ArrowUpward sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.56)' }} />
        </Paper>
      )}
    </>
  )
}
