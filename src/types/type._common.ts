import type { COMMON_CODE, PROJECT_RECRUIT_STATUS, PROJECT_APPROVAL_STATUS } from "@/constants/codes";

export interface CommonCodeItem {
  code: string;
  parentCode?: string;
  name: string;
  used?: boolean;
  remarks?: string;
  order?: string;
  children?: CommonCodeItem[];
}

export interface RequestCommonCodeItem extends CommonCodeItem {
  insert?: boolean;
}

export type CommonCodeMap = Record<string, CommonCodeItem[]>;

export type CommonCode = typeof COMMON_CODE[keyof typeof COMMON_CODE];

export interface CheckAbleComponentProps {
  name: string;
  value: string;
  onClick: (value: string) => void;
  checked?: boolean;
}

export interface SelectComponentProps {
  value: string;
  label: string;
}

export type ProjectRecruitStatusCode = typeof PROJECT_RECRUIT_STATUS[keyof typeof PROJECT_RECRUIT_STATUS]["CODE"];
export type ProjectApprovalStatusCode = typeof PROJECT_APPROVAL_STATUS[keyof typeof PROJECT_APPROVAL_STATUS]["CODE"];