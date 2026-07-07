import { useNavigate } from 'react-router-dom';
import { Paper, Button } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import ParticipationIllustration from '@/components/web/home/ParticipationIllustration';
import type { ParticipationBanner } from '@/types/type.home';

interface ParticipationCardProps {
  banner: ParticipationBanner;
}

export default function ParticipationCard({ banner }: ParticipationCardProps) {
  const navigate = useNavigate();

  return (
    <Paper className="participation-card flex-col gap-16" variant="outlined" onClick={() => navigate(banner.linkUrl)}>
      <div className="participation-card-illustration">
        <ParticipationIllustration variant={banner.illustration} />
      </div>
      <div className="participation-card-body flex-col gap-8">
        <strong className="main-text">{banner.title}</strong>
        <p>{banner.description}</p>
      </div>
      <Button
        className="participation-card-cta"
        variant="contained"
        color="primary"
        size="large"
        endIcon={<ArrowForwardIos sx={{ fontSize: '1.2rem !important' }} />}
        onClick={(e) => {
          e.stopPropagation();
          navigate(banner.linkUrl);
        }}
      >
        {banner.ctaText}
      </Button>
    </Paper>
  );
}
