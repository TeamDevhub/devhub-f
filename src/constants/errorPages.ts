import type { ErrorPagePreset, ErrorPageType } from '@/types/type.error';

export const ERROR_PAGE_TYPE = {
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  COMING_SOON: 'COMING_SOON',
  NOT_IMPLEMENTED: 'NOT_IMPLEMENTED',
} as const;

export const ERROR_PAGE_PRESETS: Record<ErrorPageType, ErrorPagePreset> = {
  [ERROR_PAGE_TYPE.NOT_FOUND]: {
    statusCode: '404',
    title: '페이지를 찾을 수 없어요',
    description: '요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있어요.\n주소를 다시 확인해 주세요.',
  },
  [ERROR_PAGE_TYPE.FORBIDDEN]: {
    statusCode: '403',
    title: '접근 권한이 없어요',
    description: '이 페이지에 접근할 수 있는 권한이 없습니다.\n권한이 필요하다면 관리자에게 문의해 주세요.',
  },
  [ERROR_PAGE_TYPE.SERVER_ERROR]: {
    statusCode: '500',
    title: '일시적인 오류가 발생했어요',
    description: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.\n문제가 계속되면 고객센터로 문의해 주세요.',
  },
  [ERROR_PAGE_TYPE.NETWORK_ERROR]: {
    title: '네트워크 연결을 확인해 주세요',
    description: '인터넷 연결이 원활하지 않습니다.\n연결 상태를 확인한 후 다시 시도해 주세요.',
  },
  [ERROR_PAGE_TYPE.SERVICE_UNAVAILABLE]: {
    title: '서비스 점검 중이에요',
    description: '더 나은 서비스를 위해 점검을 진행하고 있습니다.\n잠시 후 다시 이용해 주세요.',
  },
  [ERROR_PAGE_TYPE.COMING_SOON]: {
    title: '곧 만나볼 수 있어요',
    description: '더 좋은 경험을 위해 준비 중인 화면이에요.\n조금만 기다려 주세요.',
  },
  [ERROR_PAGE_TYPE.NOT_IMPLEMENTED]: {
    title: '아직 준비 중인 기능이에요',
    description: '해당 기능은 현재 개발 중입니다.\n빠른 시일 내에 만나보실 수 있도록 준비할게요.',
  },
};
