import { PARTICIPATION_ILLUSTRATION } from '@/constants/participationBanners';
import type { ParticipationIllustrationKey } from '@/types/type.home';

interface ParticipationIllustrationProps {
  variant: ParticipationIllustrationKey;
  className?: string;
}

// 참여 유도 CTA 전용 일러스트 - 메인 배너(둘러보기)와 달리 액션/생성 개념을 표현하는 프론트엔드 생성 SVG
export default function ParticipationIllustration({ variant, className }: ParticipationIllustrationProps) {
  switch (variant) {
    case PARTICIPATION_ILLUSTRATION.CREATE_PROJECT:
      return (
        <svg className={className} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-create-project" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
          </defs>
          <rect width="400" height="220" fill="url(#bg-create-project)" />
          <circle cx="40" cy="30" r="50" fill="#ffffff" opacity="0.06" />
          <circle cx="360" cy="190" r="60" fill="#ffffff" opacity="0.06" />
          {/* 두 사람이 가운데 + 배지에서 만나 새로운 프로젝트를 함께 시작하는 구성 */}
          <g stroke="#ffffff" strokeWidth="2.5" opacity="0.85">
            <line x1="126" y1="110" x2="176" y2="110" strokeDasharray="4 5" />
            <line x1="224" y1="110" x2="274" y2="110" strokeDasharray="4 5" />
          </g>
          <g fill="none" stroke="#ffffff" strokeWidth="2.5">
            <circle cx="100" cy="110" r="26" />
            <circle cx="92" cy="100" r="8" fill="#ffffff" stroke="none" opacity="0.9" />
            <path d="M78 122 q22 -14 44 0" />
          </g>
          <g fill="none" stroke="#ffffff" strokeWidth="2.5">
            <circle cx="300" cy="110" r="26" />
            <circle cx="308" cy="100" r="8" fill="#ffffff" stroke="none" opacity="0.9" />
            <path d="M278 122 q22 -14 44 0" />
          </g>
          <circle cx="200" cy="110" r="24" fill="#ffffff" />
          <line x1="200" y1="98" x2="200" y2="122" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
          <line x1="188" y1="110" x2="212" y2="110" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case PARTICIPATION_ILLUSTRATION.WRITE_POST:
      return (
        <svg className={className} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-write-post" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          <rect width="400" height="220" fill="url(#bg-write-post)" />
          <circle cx="350" cy="40" r="60" fill="#ffffff" opacity="0.06" />
          <circle cx="40" cy="180" r="50" fill="#ffffff" opacity="0.06" />
          {/* 문서에 글을 작성 중인 연필 - 게시글 작성 개념 */}
          <rect x="140" y="46" width="140" height="128" rx="10" fill="#ffffff" opacity="0.95" />
          <line x1="160" y1="76" x2="260" y2="76" stroke="#0891b2" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
          <line x1="160" y1="96" x2="240" y2="96" stroke="#0891b2" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
          <line x1="160" y1="116" x2="250" y2="116" stroke="#0891b2" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
          <g transform="translate(226,120) rotate(45)">
            <rect x="-8" y="-46" width="16" height="66" rx="4" fill="#facc15" />
            <polygon points="-8,20 8,20 0,36" fill="#facc15" />
            <rect x="-8" y="-46" width="16" height="14" rx="4" fill="#eab308" />
          </g>
        </svg>
      );
    case PARTICIPATION_ILLUSTRATION.UPDATE_SKILLS:
    default:
      return (
        <svg className={className} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-update-skills" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
          <rect width="400" height="220" fill="url(#bg-update-skills)" />
          <circle cx="40" cy="40" r="50" fill="#ffffff" opacity="0.06" />
          <circle cx="360" cy="180" r="60" fill="#ffffff" opacity="0.06" />
          {/* 프로필 아바타 + 성장 그래프 + 별 배지 - 스킬/프로필 업데이트 개념 */}
          <circle cx="140" cy="110" r="44" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.9" />
          <circle cx="140" cy="96" r="14" fill="#ffffff" opacity="0.9" />
          <path d="M112 138 q28 -22 56 0" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.9" />
          <polyline
            points="220,150 250,110 280,130 320,70"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
          <polygon points="320,50 326,64 341,64 329,73 333,88 320,79 307,88 311,73 299,64 314,64" fill="#facc15" />
        </svg>
      );
  }
}
