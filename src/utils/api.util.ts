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
import { useEffect, useRef } from 'react';


interface CommonError {
  status: HttpStatusCode;
  timestamp: string;
  errCode: string;
  errMessage: string;
  requestId: string;
  path: string;
}

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
  //request.headers['Authorization'] = `Bearer ${accessToken}`;
  return request;
};

/////////////////////////////////////////////////////
//* 인터셉터
/////////////////////////////////////////////////////

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

export const axiosWithLoadingInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'post',
});

axiosInstance.interceptors.request.use(requestSuccessInterceptor);

axiosInstance.interceptors.response.use(
  responseSuccessInterceptor,
  responseErrorInterceptor
);


export interface FetcherConfig extends AxiosRequestConfig {
  withLoading?: boolean;
}

export const fetcher = async <T = any, P = any>(
  url: string,
  data?: P,
  config?: FetcherConfig
): Promise<ApiResponse<T>> => {
  let instance = axiosInstance;

  if (config?.withLoading) {
    instance = axiosWithLoadingInstance;
  }

  const {
    method = "post",
    headers,
    responseType = "json",
    ...restConfig
  } = config || {};

  const isGetMethod = method.toLowerCase() === "get";

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

export const useFetchWithLoading = () => {
  // const { loading, setLoading } = useLoadingContext();
  const activeRequests = useRef(0);

  useEffect(() => {
    const requestInterceptor =
      axiosWithLoadingInstance.interceptors.request.use((config) => {
        requestSuccessInterceptor(config);
        if (activeRequests.current === 0) {
          // setLoading(true);
        }
        activeRequests.current += 1;
        return config;
      });

    const responseInterceptor =
      axiosWithLoadingInstance.interceptors.response.use(
        (response) => {
          responseSuccessInterceptor(response);

          activeRequests.current -= 1;
          if (activeRequests.current === 0) {
            // setLoading(false);
          }
          return response;
        },
        (error) => {
          responseErrorInterceptor(error);
          activeRequests.current -= 1;
          if (activeRequests.current === 0) {
            // setLoading(false);
          }
          return Promise.reject(error);
        }
      );

    return () => {
      axiosWithLoadingInstance.interceptors.request.eject(requestInterceptor);
      axiosWithLoadingInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return {
    // loading,
    fetcher: (url: string, data?: any, config?: AxiosRequestConfig) =>
      fetcher(url, data, { ...config, withLoading: true }),
  };
};

export default fetcher;
