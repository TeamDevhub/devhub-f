import type { COMMON_CODE, PROJECT_RECRUIT_STATUS } from "./const";

export interface CommonCodeItem {
  code: string;
  parentCode?: string;
  name: string;
  used?: boolean;
  children?: CommonCodeItem[];
}

export type CommonCodeMap = Record<string, CommonCodeItem[]>;

export type CommonCode = typeof COMMON_CODE[keyof typeof COMMON_CODE];

export interface CheckAbleComponentProps {
  name : string; 
  value: string;
  onClick: (value:string)=> void; 
  checked?: boolean; 
}

export interface SelectComponentProps {
  value: string;
  label : string; 
}

export type ProjectRecruitStatusCode = typeof PROJECT_RECRUIT_STATUS[keyof typeof PROJECT_RECRUIT_STATUS]["CODE"];