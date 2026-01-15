export interface ApiResponse<T> {
  success: boolean;
  code : string;
  data?: T;
  dataList?: T[];
  pagination?: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
  } | null;
  error?: string | null;
}