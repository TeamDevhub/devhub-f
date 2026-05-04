import type { ProjectApprovalStatusCode } from '@/types/type._common';

// 승인 상태에 따른 텍스트 색상 변경
export const approvalColorMap: Record<ProjectApprovalStatusCode, string> = {
    '3301': 'var(--text-primary)', // 대기 (기본색)
    '3302': 'var(--primary-main)',  // 승인 (강조색)
    '3303': 'var(--error-main)'    // 반려 (에러색)
  };