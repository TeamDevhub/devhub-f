import { DEVELOPER_TOOL_LOGO } from '@/constants/developerCommunityBanners';
import type { DeveloperToolLogoKey } from '@/types/type.home';

interface ServiceLogoProps {
  variant: DeveloperToolLogoKey;
  className?: string;
}

// 개발자 커뮤니티/생산성 도구 배너용 프론트엔드 생성 SVG 마크 (외부 로고 이미지 의존 없음)
export default function ServiceLogo({ variant, className }: ServiceLogoProps) {
  switch (variant) {
    case DEVELOPER_TOOL_LOGO.GITHUB:
      return (
        <svg className={className} viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="160" fill="#161b22" />
          <g fill="#ffffff">
            <path d="M150 34 C122 34 100 56 100 84 C100 106 114 124 134 131 C137 132 138 130 138 128 L138 116 C124 119 121 109 121 109 C119 103 116 102 116 102 C111 99 116 99 116 99 C122 99 125 105 125 105 C130 113 138 111 141 109 C142 105 143 102 145 100 C129 98 112 92 112 65 C112 57 115 51 120 46 C119 44 116 36 121 26 C121 26 128 24 138 32 C142 31 147 30 152 30 C157 30 162 31 166 32 C176 24 183 26 183 26 C188 36 185 44 184 46 C189 51 192 57 192 65 C192 92 175 98 159 100 C161 103 163 107 163 113 L163 128 C163 130 164 132 167 131 C187 124 201 106 201 84 C201 56 178 34 150 34 Z" />
          </g>
        </svg>
      );
    case DEVELOPER_TOOL_LOGO.STACKOVERFLOW:
      return (
        <svg className={className} viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-stackoverflow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f48024" />
              <stop offset="100%" stopColor="#9c3d0e" />
            </linearGradient>
          </defs>
          <rect width="300" height="160" fill="url(#bg-stackoverflow)" />
          <g fill="#ffffff">
            <rect x="98" y="100" width="104" height="14" rx="2" />
            <rect x="104" y="80" width="98" height="14" rx="2" opacity="0.9" transform="rotate(-4 104 80)" />
            <rect x="108" y="60" width="94" height="14" rx="2" opacity="0.75" transform="rotate(-8 108 60)" />
            <rect x="112" y="41" width="90" height="14" rx="2" opacity="0.6" transform="rotate(-12 112 41)" />
          </g>
          <path d="M92 100 L210 100 L210 122 L92 122 Z" fill="none" stroke="#ffffff" strokeWidth="6" opacity="0.9" />
        </svg>
      );
    case DEVELOPER_TOOL_LOGO.CLAUDE:
      return (
        <svg className={className} viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-claude" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#da7756" />
              <stop offset="100%" stopColor="#a84a2e" />
            </linearGradient>
          </defs>
          <rect width="300" height="160" fill="url(#bg-claude)" />
          <g stroke="#ffffff" strokeWidth="6" strokeLinecap="round">
            <line x1="150" y1="46" x2="150" y2="114" />
            <line x1="116" y1="55" x2="184" y2="105" />
            <line x1="184" y1="55" x2="116" y2="105" />
            <line x1="110" y1="80" x2="190" y2="80" />
            <line x1="130" y1="47" x2="170" y2="113" />
            <line x1="170" y1="47" x2="130" y2="113" />
          </g>
        </svg>
      );
    case DEVELOPER_TOOL_LOGO.NOTION:
    default:
      return (
        <svg className={className} viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="160" fill="#ffffff" />
          <rect x="102" y="34" width="96" height="92" rx="6" fill="#191919" />
          <path
            d="M116 48 L116 112 L128 112 L128 68 L172 112 L184 112 L184 48 L172 48 L172 92 L128 48 Z"
            fill="#ffffff"
          />
        </svg>
      );
  }
}
