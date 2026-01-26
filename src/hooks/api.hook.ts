// hooks/common/useSelect.ts
import type { ApiResponse } from "@/types/api.type";
import { useEffect, useState } from "react";

const cacheStore = new Map<string, any>();

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

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (cacheKey && cacheStore.has(cacheKey)) {
        setData(cacheStore.get(cacheKey));
        return;
      }

      const res = await apiFn(req);
      setData(res);

      if (cacheKey) {
        cacheStore.set(cacheKey, res);
      }
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled) return;
    fetchData();
  }, [JSON.stringify(req), enabled]);

  return {
    res: data,
    loading,
    error,
    refetch: fetchData,
  };
};

export const useMutation = <TReq, TRes>(
  mutationFn: (req: TReq) => Promise<ApiResponse<TRes>>,
  onSuccess?: (res: ApiResponse<TRes>) => void,
  onFail?: (res: ApiResponse<TRes>) => void
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (req: TReq): Promise<ApiResponse<TRes>> => {
    try {
      setLoading(true);
      setError(null);
      const res = await mutationFn(req);
      
      if(res.success) onSuccess && onSuccess(res);
      else onFail && onFail(res);

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
