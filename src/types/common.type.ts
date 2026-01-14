export interface CommonCodeItem {
  code: number;
  parentCode: string;
  name: string;
  depth: number;
}

export type CommonCodeMap = Record<string, CommonCodeItem[]>;