import { BANNER_ILLUSTRATION } from '@/constants/homeBanners';
import type { BannerIllustrationKey } from '@/types/type.home';

interface BannerIllustrationProps {
  variant: BannerIllustrationKey;
  className?: string;
}

// 프론트엔드 내에서 생성한 개발자 커뮤니티 컨셉 SVG 일러스트 (외부 이미지 의존 없음)
export default function BannerIllustration({ variant, className }: BannerIllustrationProps) {
  switch (variant) {
    case BANNER_ILLUSTRATION.PROJECTS:
      return (
        <svg className={className} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-projects" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <rect width="400" height="220" fill="url(#bg-projects)" />
          <circle cx="350" cy="30" r="70" fill="#ffffff" opacity="0.06" />
          <circle cx="40" cy="190" r="50" fill="#ffffff" opacity="0.06" />
          <g transform="translate(48,54)" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.95">
            <rect x="0" y="0" width="120" height="86" rx="8" />
            <line x1="0" y1="24" x2="120" y2="24" />
            <circle cx="14" cy="12" r="3" fill="#ffffff" stroke="none" />
            <circle cx="26" cy="12" r="3" fill="#ffffff" stroke="none" />
            <circle cx="38" cy="12" r="3" fill="#ffffff" stroke="none" />
            <line x1="14" y1="42" x2="90" y2="42" strokeOpacity="0.7" />
            <line x1="14" y1="56" x2="70" y2="56" strokeOpacity="0.5" />
            <line x1="14" y1="70" x2="100" y2="70" strokeOpacity="0.5" />
          </g>
          <g transform="translate(190,30)" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.9">
            <rect x="0" y="0" width="140" height="100" rx="8" />
            <line x1="0" y1="24" x2="140" y2="24" />
            <circle cx="14" cy="12" r="3" fill="#ffffff" stroke="none" />
            <circle cx="26" cy="12" r="3" fill="#ffffff" stroke="none" />
            <circle cx="38" cy="12" r="3" fill="#ffffff" stroke="none" />
            <path d="M20 60 L34 74 L20 88" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="46" y1="88" x2="70" y2="60" strokeLinecap="round" />
          </g>
        </svg>
      );
    case BANNER_ILLUSTRATION.BOARDS:
      return (
        <svg className={className} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-boards" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <rect width="400" height="220" fill="url(#bg-boards)" />
          <circle cx="30" cy="40" r="60" fill="#ffffff" opacity="0.06" />
          <circle cx="370" cy="180" r="80" fill="#ffffff" opacity="0.06" />
          <g fill="#ffffff">
            <rect x="70" y="46" width="110" height="70" rx="10" opacity="0.95" />
            <rect x="70" y="126" width="110" height="46" rx="10" opacity="0.55" />
            <rect x="200" y="70" width="130" height="46" rx="10" opacity="0.75" />
            <rect x="200" y="126" width="90" height="46" rx="10" opacity="0.4" />
          </g>
          <g fill="#0369a1">
            <text x="86" y="76" fontFamily="sans-serif" fontSize="13" fontWeight="700">Q&amp;A</text>
            <text x="216" y="98" fontFamily="sans-serif" fontSize="13" fontWeight="700">Tips</text>
          </g>
        </svg>
      );
    case BANNER_ILLUSTRATION.SKILLS:
    default:
      return (
        <svg className={className} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-skills" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>
          </defs>
          <rect width="400" height="220" fill="url(#bg-skills)" />
          <circle cx="360" cy="40" r="70" fill="#ffffff" opacity="0.06" />
          <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
            <polyline points="60,150 100,90 140,130 180,60 220,110 260,50" fill="none" />
          </g>
          <g fill="#ffffff">
            <circle cx="60" cy="150" r="5" />
            <circle cx="100" cy="90" r="5" />
            <circle cx="140" cy="130" r="5" />
            <circle cx="180" cy="60" r="5" />
            <circle cx="220" cy="110" r="5" />
            <circle cx="260" cy="50" r="6" />
          </g>
          <rect x="40" y="172" width="300" height="2" fill="#ffffff" opacity="0.3" />
        </svg>
      );
  }
}
