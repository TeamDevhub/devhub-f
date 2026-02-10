import type {Dayjs} from "dayjs";
import type {CommonCode, CommonCodeItem} from "@/types/type._common.ts";

export type DateType = Dayjs | null | undefined;

export interface Pagination {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  code : string;
  data?: T;
  dataList?: T[];
  pagination?: Pagination | null;
  error?: {
    code: string;
    message: string;
  } | null;
}

export interface CommonCodeRequest {
  used?:boolean
}

export type CommonCodeResponse = Record<CommonCode, CommonCodeItem>;

