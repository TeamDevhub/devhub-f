import type { ApiResponse } from '@/types/api.type';
import { ERROR_CODE } from '@/types/common.type';
import { getLocalStorage } from '@/utils/common.util';
import axios, {
  AxiosError,
  HttpStatusCode,
  type AxiosResponse,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type Method,
} from 'axios';
import dayjs from 'dayjs';

interface CommonError {
  status: HttpStatusCode;
  timestamp: string;
  errCode: string;
  errMessage: string;
  requestId: string;
  path: string;
}

const convertDayjsToString = (data: any): any => {
  
  if (data instanceof FormData) {
    return data;
  }

  if (dayjs.isDayjs(data)) {
    return data.format('YYYY-MM-DD');
  }
  
  if (Array.isArray(data)) {
    return data.map(convertDayjsToString);
  }
  
  if (data !== null && typeof data === 'object') {
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = convertDayjsToString(data[key]);
      return acc;
    }, {} as any);
  }
  
  return data;
};

let activeRequests = 0;
let loadingHandler = { show: () => {}, hide: () => {} };

export const injectLoadingHandler = (handler: { show: () => void; hide: () => void }) => {
  loadingHandler = handler;
};

// 로딩 처리를 위한 공통 함수
const handleRequestStart = (config: InternalAxiosRequestConfig) => {
  if (activeRequests === 0) loadingHandler.show();
  activeRequests++;
  return config;
};

const handleRequestEnd = () => {
  activeRequests--;
  if (activeRequests <= 0) {
    activeRequests = 0;
    loadingHandler.hide();
  }
};

/////////////////////////////////////////////////////
//* 인터셉터
/////////////////////////////////////////////////////
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipErrorHandling?: boolean;
}
/**
 * 요청 성공 처리
 */
const requestSuccessInterceptor = async (
  request: InternalAxiosRequestConfig<any>
) => {
  const accessToken = getLocalStorage('accessToken');
  request.headers['Authorization'] = `Bearer ${accessToken}`;
  return request;
};
//bearer basic digest hoba ..

/**
 * 응답 성공 처리
 */
const responseSuccessInterceptor = async (response: AxiosResponse<any>) => {
  return response;
};
/**
 * 에러 처리
 */
const responseErrorInterceptor = async (err: unknown) => {
  const error = err as AxiosError<CommonError>;

  console.log('responseErrorInterceptor', error.response?.data?.errCode);
  
  const errorCode = error.response?.data?.errCode ?? '';
  const status = error.response?.status;
  
  //에러 인터페이스에 따라 처리 추후 추가
  if (status === 401) {
    if (errorCode === ERROR_CODE.EXPIRE_ACCESS_TOKEN) {
        // 리프레쉬토큰 발급
    } else if ( errorCode === ERROR_CODE.DUP_LOGIN ) {
    } else if (errorCode === ERROR_CODE.SIGNATURE_ERROR_ACCESS_TOKEN) {
    } else {
      try {
            // signOut();
            return;
      } catch (error) {
        console.error(error);
      }
    }
  } 

  if (!(error?.config as CustomAxiosRequestConfig)?.skipErrorHandling) {
    return Promise.reject(error);
  }
};

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'post',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    await requestSuccessInterceptor(config);
    return handleRequestStart(config);
  },
  (error) => {
    handleRequestEnd();
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    handleRequestEnd();
    return responseSuccessInterceptor(response);
  },
  async (error) => {
    handleRequestEnd();
    return responseErrorInterceptor(error);
  }
);

export const fetcher = async <T = any, P = any>(
  url: string,
  data?: P,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  
  const instance = axiosInstance;

  const {
    method = "post",
    headers,
    responseType = "json",
    ...restConfig
  } = config || {};

  const isGetMethod = method.toLowerCase() === "get";
  data = convertDayjsToString(data);

  const res = await instance.request<ApiResponse<T>>({
    url,
    method: method as Method,
    ...(isGetMethod
      ? { params: data }
      : { data }),
    responseType,
    headers: {
      ...(data instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...headers,
    },
    ...restConfig,
  });

  return res.data;
};

export default fetcher;
