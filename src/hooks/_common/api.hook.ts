// hooks/common/useSelect.ts
import type { ApiResponse } from "@/types/type.api";
import {useCallback, useEffect, useRef, useState} from "react";

// cacheKey는 동일 키로 서로 다른 req가 들어와도 구분해야 하므로 req를 함께 저장한다.
// invalidateKeys는 여전히 cacheKey 문자열 그대로 삭제하므로 무효화 동작은 그대로 유지된다.
const cacheStore = new Map<string, { reqKey: string; data: unknown }>();

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

  // 페이지네이션/탭 전환을 빠르게 연속 클릭하면 이전 요청이 최신 요청보다 늦게 도착할 수 있다.
  // 응답을 적용하기 전에 "여전히 가장 최근 요청인지"를 확인해 늦게 온 이전 응답이 최신 결과를 덮어쓰지 않도록 한다.
  const requestIdRef = useRef(0);

  const fetchData = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    try {
      setLoading(true);
      setError(null);

      const cached = cacheKey ? cacheStore.get(cacheKey) : undefined;
      if (cached && cached.reqKey === reqKey) {
        setData(cached.data as ApiResponse<TRes>);
        return;
      }
      const res = await apiFnRef.current(reqRef.current);
      if (requestIdRef.current !== requestId) return;
      setData(res);

      if (cacheKey) {
        cacheStore.set(cacheKey, { reqKey, data: res });
      }
    } catch (e) {
      if (requestIdRef.current !== requestId) return;
      setError(e as Error);
    } finally {
      if (requestIdRef.current === requestId) setLoading(false);
    }
  // reqKey로 deep compare, apiFn은 ref로 접근하므로 의존성 제외
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
