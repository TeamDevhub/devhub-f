import type { SkillTrendResponse } from '@/types/type.skilltrend';

export const MOCK_TREND: SkillTrendResponse = {
  statsCardList: [
    { title: '등록된 프로젝트', count: 17 },
    { title: '활동 중인 개발자', count: 51 },
    { title: '이번 달 신규 팀 매칭', count: 6 },
    { title: '누적 팀 빌딩 완료', count: 21 },
  ],

  positionDemandList: [
    { positionCode: 'p01', positionName: '백엔드 개발자', count: 10 },
    { positionCode: 'p02', positionName: '프론트엔드 개발자', count: 8 },
    { positionCode: 'p03', positionName: '풀스택 개발자', count: 7 },
    { positionCode: 'p04', positionName: '앱 개발자', count: 6 },
    { positionCode: 'p05', positionName: 'UI/UX 디자이너', count: 6 },
    { positionCode: 'p07', positionName: 'DevOps 엔지니어', count: 5 },
    { positionCode: 'p08', positionName: 'PM/기획자', count: 5 },
    { positionCode: 'p09', positionName: 'AI/ML 엔지니어', count: 4 },
  ],

  popularPositionList: [
    {
      rank: 1,
      positionCode: 'p01',
      positionName: '백엔드 개발자',
      skillList: [
        { skillCode: 's01', skillName: 'Spring Boot', percentage: 34, color: '#7086FD' },
        { skillCode: 's02', skillName: 'Node.js', percentage: 22, color: '#6FD195' },
        { skillCode: 's03', skillName: 'FastAPI', percentage: 16, color: '#FFAE4C' },
        { skillCode: 's04', skillName: 'Django', percentage: 14, color: '#07DBFA' },
        { skillCode: 's05', skillName: 'NestJS', percentage: 14, color: '#988AFC' },
      ],
    },
    {
      rank: 2,
      positionCode: 'p02',
      positionName: '프론트엔드 개발자',
      skillList: [
        { skillCode: 's10', skillName: 'React', percentage: 45, color: '#7086FD' },
        { skillCode: 's11', skillName: 'Next.js', percentage: 28, color: '#6FD195' },
        { skillCode: 's12', skillName: 'Vue.js', percentage: 15, color: '#FFAE4C' },
        { skillCode: 's13', skillName: 'TypeScript', percentage: 12, color: '#07DBFA' },
      ],
    },
    {
      rank: 3,
      positionCode: 'p04',
      positionName: '앱 개발자',
      skillList: [
        { skillCode: 's20', skillName: 'Flutter', percentage: 38, color: '#7086FD' },
        { skillCode: 's21', skillName: 'React Native', percentage: 30, color: '#6FD195' },
        { skillCode: 's22', skillName: 'Swift', percentage: 18, color: '#FFAE4C' },
        { skillCode: 's23', skillName: 'Kotlin', percentage: 14, color: '#07DBFA' },
      ],
    },
  ],

  monthlyProjectList: [
    { month: '25.06', postCount: 5, startCount: 4, completedCount: 3 },
    { month: '25.07', postCount: 7, startCount: 5, completedCount: 5 },
    { month: '25.08', postCount: 10, startCount: 7, completedCount: 4 },
    { month: '25.09', postCount: 11, startCount: 8, completedCount: 10 },
    { month: '25.10', postCount: 14, startCount: 11, completedCount: 11 },
    { month: '25.11', postCount: 16, startCount: 14, completedCount: 14 },
    { month: '25.12', postCount: 15, startCount: 13, completedCount: 17 },
    { month: '26.01', postCount: 20, startCount: 17, completedCount: 14 },
    { month: '26.02', postCount: 21, startCount: 20, completedCount: 15 },
    { month: '26.03', postCount: 25, startCount: 20, completedCount: 18 },
    { month: '26.04', postCount: 22, startCount: 18, completedCount: 22 },
    { month: '26.05', postCount: 28, startCount: 27, completedCount: 26 },
  ],

  marketableSkillGroupList: [
    {
      positionCode: 'p01',
      positionName: '백엔드 개발자',
      skillList: [
        { rank: 1, skillCode: 's01', skillName: 'Spring Boot', popularityPercent: 82 },
        { rank: 2, skillCode: 's30', skillName: 'Docker', popularityPercent: 74 },
        { rank: 3, skillCode: 's31', skillName: 'Kubernetes', popularityPercent: 61 },
        { rank: 4, skillCode: 's02', skillName: 'Node.js', popularityPercent: 58 },
        { rank: 5, skillCode: 's32', skillName: 'PostgreSQL', popularityPercent: 53 },
      ],
    },
    {
      positionCode: 'p02',
      positionName: '프론트엔드 개발자',
      skillList: [
        { rank: 1, skillCode: 's10', skillName: 'React', popularityPercent: 91 },
        { rank: 2, skillCode: 's13', skillName: 'TypeScript', popularityPercent: 79 },
        { rank: 3, skillCode: 's11', skillName: 'Next.js', popularityPercent: 67 },
        { rank: 4, skillCode: 's40', skillName: 'Tailwind', popularityPercent: 55 },
        { rank: 5, skillCode: 's12', skillName: 'Vue.js', popularityPercent: 43 },
      ],
    },
    {
      positionCode: 'p04',
      positionName: '앱 개발자',
      skillList: [
        { rank: 1, skillCode: 's20', skillName: 'Flutter', popularityPercent: 77 },
        { rank: 2, skillCode: 's21', skillName: 'React Native', popularityPercent: 64 },
        { rank: 3, skillCode: 's50', skillName: 'Firebase', popularityPercent: 58 },
        { rank: 4, skillCode: 's22', skillName: 'Swift', popularityPercent: 47 },
        { rank: 5, skillCode: 's23', skillName: 'Kotlin', popularityPercent: 44 },
      ],
    },
    {
      positionCode: 'p05',
      positionName: 'UI/UX 디자이너',
      skillList: [
        { rank: 1, skillCode: 's60', skillName: 'Figma', popularityPercent: 95 },
        { rank: 2, skillCode: 's61', skillName: 'Zeplin', popularityPercent: 52 },
        { rank: 3, skillCode: 's62', skillName: 'Adobe XD', popularityPercent: 41 },
        { rank: 4, skillCode: 's63', skillName: 'Webflow', popularityPercent: 34 },
        { rank: 5, skillCode: 's64', skillName: 'Illustrator', popularityPercent: 29 },
      ],
    },
  ],
};
