import type { ParticipationBanner } from '@/types/type.home';

// 참여 유도 CTA 전용 일러스트 키 - 메인 배너(BANNER_ILLUSTRATION)와 별개의 구성을 쓴다
export const PARTICIPATION_ILLUSTRATION = {
  CREATE_PROJECT: 'create-project',
  WRITE_POST: 'write-post',
  UPDATE_SKILLS: 'update-skills',
} as const;

// 홈 화면 - 참여 유도 CTA 카드 (백엔드 데이터 아님, 서비스 액션 진입점을 프론트에서 고정 노출)
export const PARTICIPATION_BANNERS: ParticipationBanner[] = [
  {
    key: 'create-project',
    title: '나만의 프로젝트를 시작해보세요',
    description: '프로젝트를 만들고 팀원을 모아 함께 의미 있는 결과물을 만들어보세요',
    ctaText: '프로젝트 만들기',
    linkUrl: '/projects/create',
    illustration: PARTICIPATION_ILLUSTRATION.CREATE_PROJECT,
  },
  {
    key: 'write-post',
    title: '개발자들과 지식을 나눠보세요',
    description: '질문하고 경험을 공유하며 개발자 커뮤니티가 함께 성장하도록 도와주세요',
    ctaText: '게시글 작성하기',
    linkUrl: '/boards/create',
    illustration: PARTICIPATION_ILLUSTRATION.WRITE_POST,
  },
  {
    key: 'update-skills',
    title: '내 개발자 프로필을 최신 상태로 유지하세요',
    description: '보유 기술과 경험을 업데이트하고 나를 잘 보여줄 수 있도록 관리해보세요',
    ctaText: '스킬 관리하기',
    linkUrl: '/profile/update',
    illustration: PARTICIPATION_ILLUSTRATION.UPDATE_SKILLS,
  },
];
