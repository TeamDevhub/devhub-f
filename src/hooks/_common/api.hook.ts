// hooks/common/useSelect.ts
import type { ApiResponse } from "@/types/type.api";
import {useCallback, useEffect, useRef, useState} from "react";

const cacheStore = new Map<string, unknown>();

interface UseSelectOptions<TRes, TReq> {
  apiFn: (req: TReq) => Promise<ApiResponse<TRes>>;
  req: TReq;
  cacheKey?: string;
  enabled?: boolean;
}

export const useSelect = <TRes, TReq>({
  apiFn,
  req,
  cacheKey,
  enabled = true,
}: UseSelectOptions<TRes, TReq>) => {
  const [data, setData] = useState<ApiResponse<TRes> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ref로 최신값 유지 — fetchData 의존성 배열에서 제외해 불필요한 재생성 방지
  const apiFnRef = useRef(apiFn);
  apiFnRef.current = apiFn;
  const reqRef = useRef(req);
  reqRef.current = req;

  // req는 객체라 매 렌더마다 새 참조가 올 수 있으므로 stringify로 deep compare
  const reqKey = JSON.stringify(req);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (cacheKey && cacheStore.has(cacheKey)) {
        setData(cacheStore.get(cacheKey) as ApiResponse<TRes>);
        return;
      }
      const res = await apiFnRef.current(reqRef.current);
      setData(res);
      console.log('data>>>', res);
      if (cacheKey) {
        cacheStore.set(cacheKey, res);
      }
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  // reqKey로 deep compare, apiFn은 ref로 접근하므로 의존성 제외
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqKey, cacheKey]);

  useEffect(() => {
    if (!enabled) return;
    fetchData().then();
  }, [enabled, fetchData]);

  return {
    res: data,
    setRes: setData,
    loading,
    error,
    refetch: fetchData,
  };
};
export default useSelect

export const useMutation = <TReq, TRes>(
  mutationFn: (req: TReq) => Promise<ApiResponse<TRes>>,
  onSuccess?: (res: ApiResponse<TRes>) => void | Promise<void>,
  onFail?: (res: ApiResponse<TRes>) => void,
  options?: { invalidateKeys?: string[] }
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (req: TReq): Promise<ApiResponse<TRes>> => {
    try {
      setLoading(true);
      setError(null);
      const res = await mutationFn(req);

      if (res.success) {
        options?.invalidateKeys?.forEach((key) => cacheStore.delete(key));
        await onSuccess?.(res);
      } else {
        onFail?.(res);
      }

      return res;
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    mutate,
    loading,
    error,
  };
};
