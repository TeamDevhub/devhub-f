import type { StaticBanner } from '@/types/type.home';

export const BANNER_ILLUSTRATION = {
  PROJECTS: 'projects',
  BOARDS: 'boards',
  SKILLS: 'skills',
} as const;

// 메인 배너 - 백엔드 배너 데이터 대신 프론트에서 고정 노출하는 서비스 소개 배너
// 슬라이드마다 각자 다른 기능(프로젝트/커뮤니티/기술 트렌드)의 진입점 역할을 하므로 문구/CTA를 슬라이드별로 다르게 가진다
export const HOME_MAIN_BANNERS: StaticBanner[] = [
  {
    bannerGuid: 'main-projects',
    title: '개발자 프로젝트에 참여해보세요',
    description: '함께할 개발자를 찾고, 의미 있는 프로젝트를 만들어보세요',
    ctaText: '프로젝트 둘러보기',
    linkUrl: '/projects',
    illustration: BANNER_ILLUSTRATION.PROJECTS,
  },
  {
    bannerGuid: 'main-boards',
    title: '지식을 나누고 개발자와 소통하세요',
    description: '질문하고, 경험을 나누며, 커뮤니티와 함께 성장하세요',
    ctaText: '커뮤니티 둘러보기',
    linkUrl: '/boards',
    illustration: BANNER_ILLUSTRATION.BOARDS,
  },
  {
    bannerGuid: 'main-skills',
    title: '인기 기술과 트렌드를 확인하세요',
    description: '인기 기술 스택과 프레임워크, 트렌드를 살펴보세요',
    ctaText: '기술 트렌드 보기',
    linkUrl: '/skilltrend',
    illustration: BANNER_ILLUSTRATION.SKILLS,
  },
];
