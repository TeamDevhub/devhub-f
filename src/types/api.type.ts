export interface ApiResponse<T> {
  success: boolean;
  data: T;
  dataList: T;
  message?: string;
  errorCode?: string;
}