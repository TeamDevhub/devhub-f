import type { COMMON_CODE } from "./const";

export interface CommonCodeItem {
  code: string;
  parentCode?: string;
  name: string;
  depth?: number;
  children?: CommonCodeItem[];
}

export type CommonCodeMap = Record<string, CommonCodeItem[]>;

export type CommonCode = typeof COMMON_CODE[keyof typeof COMMON_CODE];

export interface CheckAbleComponentProps {
  name : string; 
  value: string;
  onClick: (value:string, checked:boolean)=> void; 
  checked?: boolean; 
}