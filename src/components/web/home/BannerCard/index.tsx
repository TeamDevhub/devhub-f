import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import BannerIllustration from '@/components/web/home/BannerIllustration';
import { BANNER_ILLUSTRATION } from '@/constants/homeBanners';
import type { StaticBanner } from '@/types/type.home';

interface BannerCardProps {
  banner: StaticBanner;
  size?: 'main' | 'sub';
}

// 히어로 슬라이드가 어떤 기능의 진입점인지 한눈에 알 수 있도록 붙이는 짧은 태그
const HERO_EYEBROW: Record<string, string> = {
  [BANNER_ILLUSTRATION.PROJECTS]: '🚀 프로젝트',
  [BANNER_ILLUSTRATION.BOARDS]: '💬 커뮤니티',
  [BANNER_ILLUSTRATION.SKILLS]: '📈 기술 트렌드',
};

export default function BannerCard({ banner, size = 'main' }: BannerCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`banner-card banner-card-${size} flex-col justify-end`}
      role="button"
      tabIndex={0}
      aria-label={banner.title}
      onClick={() => navigate(banner.linkUrl)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') navigate(banner.linkUrl);
      }}
    >
      <BannerIllustration className="banner-card-illustration" variant={banner.illustration} />
      <div className="banner-card-text flex-col gap-16">
        {size === 'main' && HERO_EYEBROW[banner.illustration] && (
          <span className="banner-card-eyebrow">{HERO_EYEBROW[banner.illustration]}</span>
        )}
        <strong className="banner-card-title">{banner.title}</strong>
        <p className="banner-card-desc">{banner.description}</p>
        {size === 'main' && banner.ctaText && (
          <Button
            className="banner-card-cta"
            variant="contained"
            color="primary"
            size="large"
            onClick={(e) => {
              e.stopPropagation();
              navigate(banner.linkUrl);
            }}
          >
            {banner.ctaText}
          </Button>
        )}
      </div>
    </div>
  );
}
