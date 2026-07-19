import type { ExternalBanner } from '@/types/type.home';

export const DEVELOPER_TOOL_LOGO = {
  GITHUB: 'github',
  STACKOVERFLOW: 'stackoverflow',
  CLAUDE: 'claude',
  NOTION: 'notion',
} as const;

// 서브 배너 - 개발자 커뮤니티/생산성 도구 소개 (외부 사이트로 이동)
export const DEVELOPER_COMMUNITY_BANNERS: ExternalBanner[] = [
  {
    bannerGuid: 'ext-github',
    title: 'GitHub',
    description: 'Collaborate, manage code, and build open source projects',
    link: 'https://github.com',
    logo: DEVELOPER_TOOL_LOGO.GITHUB,
  },
  {
    bannerGuid: 'ext-stackoverflow',
    title: 'Stack Overflow',
    description: 'Find solutions and share programming knowledge',
    link: 'https://stackoverflow.com',
    logo: DEVELOPER_TOOL_LOGO.STACKOVERFLOW,
  },
  {
    bannerGuid: 'ext-claude',
    title: 'Claude AI',
    description: 'Improve development productivity with AI assistance',
    link: 'https://claude.ai',
    logo: DEVELOPER_TOOL_LOGO.CLAUDE,
  },
  {
    bannerGuid: 'ext-notion',
    title: 'Notion',
    description: 'Organize projects, documentation, and team knowledge',
    link: 'https://www.notion.so',
    logo: DEVELOPER_TOOL_LOGO.NOTION,
  },
];
