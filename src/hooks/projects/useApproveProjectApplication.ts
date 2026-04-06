import { approveProjectApplication } from "@/api/projects/projects.api";
import { useMutation } from "@/hooks/_common/api.hook";
import type { ApiResponse } from "@/types/type.api";

export default function useApproveProjectApplication(
  onSuccess?: (res: ApiResponse<void>) => void,
  onFail?: (res: ApiResponse<void>) => void
) {
  const { mutate, loading, error } = useMutation<
    { projectGuid: string; applicationGuid: string; approved: boolean },
    void
  >(
    approveProjectApplication,
    onSuccess,
    onFail
  );

  return { mutate, loading, error };
}
