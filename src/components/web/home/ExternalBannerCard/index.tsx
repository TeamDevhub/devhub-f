import { ArrowOutward } from '@mui/icons-material';
import ServiceLogo from '@/components/web/home/ServiceLogo';
import type { ExternalBanner } from '@/types/type.home';

interface ExternalBannerCardProps {
  banner: ExternalBanner;
}

export default function ExternalBannerCard({ banner }: ExternalBannerCardProps) {
  return (
    <a className="resource-item" href={banner.link} target="_blank" rel="noopener noreferrer">
      <ServiceLogo className="resource-item-icon" variant={banner.logo} />
      <div className="resource-item-text">
        <strong className="resource-item-title">{banner.title}</strong>
        <p className="resource-item-desc">{banner.description}</p>
      </div>
      <ArrowOutward className="resource-item-arrow" sx={{ fontSize: 18 }} />
    </a>
  );
}
