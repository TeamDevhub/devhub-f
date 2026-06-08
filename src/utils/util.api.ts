import type { ApiResponse } from '@/types/type.api';
import { tokenStorage } from '@/utils/auth.token';
import axios, { AxiosError, HttpStatusCode, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig, type Method } from 'axios';
import dayjs from 'dayjs';

interface CommonError {
  status: HttpStatusCode;
  timestamp: string;
  error: {
    code: string;
    message: string;
  }
  requestId: string;
  path: string;
}

const convertDayjsToString = (data: unknown): unknown => {
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
    return Object.keys(data).reduce(
      (acc, key) => {
        const value = (data as Record<string, unknown>)[key];
        acc[key] = convertDayjsToString(value);
        return acc;
      },
      {} as Record<string, unknown>,
    );
  }
  return data;
};

const removeEmptyValues = (obj: Record<string, unknown>): unknown => {
  if (obj instanceof FormData) {
    return obj;
  }

  const cleanObj = { ...obj };

  Object.keys(cleanObj).forEach((key) => {
    const value = cleanObj[key];

    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
      delete cleanObj[key];
    }
  });

  return cleanObj;
};

let activeRequests = 0;
let loadingHandler = { show: () => { }, hide: () => { } };

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
  _retry?: boolean;
}

// 동시 401 시 reissue 한 번만 호출하기 위한 단일 promise 큐
let reissuePromise: Promise<string | null> | null = null;

const triggerReissue = (): Promise<string | null> => {
  if (reissuePromise) return reissuePromise;

  reissuePromise = (async (): Promise<string | null> => {
    try {
      // 순환 import 회피를 위한 dynamic import
      const { reissue } = await import('@/api/web/api.auth');
      const res = await reissue();
      const token = res?.data?.accessToken;
      if (!token) return null;
      tokenStorage.set(token);
      return token;
    } catch {
      return null;
    } finally {
      // 다음 만료 사이클을 위해 비움
      setTimeout(() => { reissuePromise = null; }, 0);
    }
  })();

  return reissuePromise;
};

const handleAuthFailure = (): void => {
  tokenStorage.clear();
  if (typeof window === 'undefined') return;
  // 인증 페이지에서의 401(로그인 실패 등)은 redirect 루프 방지를 위해 그대로 둔다
  if (window.location.pathname.startsWith('/auth/')) return;
  window.location.href = '/auth/login';
};

/**
 * 요청 성공 처리
 */
const requestSuccessInterceptor = async (request: InternalAxiosRequestConfig<unknown>) => {
  const accessToken = tokenStorage.get();
  if (accessToken) request.headers['Authorization'] = `Bearer ${accessToken}`;

  return request;
};

/**
 * 응답 성공 처리
 */
const responseSuccessInterceptor = async (response: AxiosResponse<unknown>) => {
  return response;
};

/**
 * 에러 처리 — 401에 대한 silent refresh + 재시도 포함
 * 만료/무효 등 구체 에러코드와 무관하게 401이면 재발급을 1회 시도한다.
 * (백엔드 에러코드 변경에 깨지지 않도록 코드 문자열에 의존하지 않음)
 */
const responseErrorInterceptor = async (err: unknown) => {
  const error = err as AxiosError<CommonError>;
  const config = error.config as CustomAxiosRequestConfig | undefined;

  const status = error.response?.status;

  if (status === 401 && !config?.skipErrorHandling) {
    // /auth/login·/auth/reissue 등 인증 엔드포인트 자체의 401은 재발급 대상이 아니다
    const isAuthEndpoint = (config?.url ?? '').includes('/auth/');
    const canRetry = !!config && !config._retry && !isAuthEndpoint;

    if (canRetry) {
      const newToken = await triggerReissue();
      if (newToken) {
        config._retry = true;
        config.headers = {
          ...(config.headers ?? {}),
          Authorization: `Bearer ${newToken}`,
        } as typeof config.headers;
        return axiosInstance.request(config);
      }
    }

    // 재발급 불가/실패 → 인증 실패 처리
    // 인증 엔드포인트(reissue/login) 자체 실패는 redirect 하지 않는다
    // (init()의 조용한 토큰 복구 시도가 불필요한 redirect를 유발하지 않도록)
    if (!isAuthEndpoint) {
      handleAuthFailure();
    }
    return Promise.reject(error);
  }

  // skipErrorHandling 여부와 무관하게 항상 reject — 호출자가 직접 처리하도록
  return Promise.reject(error);
};

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  async (config) => {
    await requestSuccessInterceptor(config);
    return handleRequestStart(config);
  },
  (error) => {
    handleRequestEnd();
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    handleRequestEnd();
    return responseSuccessInterceptor(response);
  },
  async (error) => {
    handleRequestEnd();
    return responseErrorInterceptor(error);
  },
);

export const fetcher = async <T = unknown, P = unknown>(url: string, data?: P, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const instance = axiosInstance;

  const { method = 'post', headers, responseType = 'json', ...restConfig } = config || {};

  const isGetMethod = method.toLowerCase() === 'get';
  if (data) data = removeEmptyValues(data) as P;
  data = convertDayjsToString(data) as P;

  const baseUrl = import.meta.env.VITE_API_URL;
  url = baseUrl + url;

  const res = await instance.request<ApiResponse<T>>({
    url,
    method: method as Method,
    ...(isGetMethod ? { params: data } : { data }),
    responseType,
    headers: {
      ...(data instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
    },
    ...restConfig,
  });

  return res.data;
};

export default fetcher;
