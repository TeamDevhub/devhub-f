import type { ProjectDetailResponse } from "@/types/type.projects";
import { useSelect, useMutation } from "@/hooks/_common/api.hook";
import { useRequireAuth } from "@/hooks/_common/useRequireAuth";
import { getProjectDetail, createProjectLike } from "@/api/web/api.projects";

export default function useSelectProjectDetail(
  projectId?: string
) {
  const options = {
    apiFn: getProjectDetail,
    req: projectId!,
    enabled: !!projectId,
  }

  const { res, loading, error } = useSelect<ProjectDetailResponse, string>(options);
  const { mutate: projectLikeMutate } = useMutation<string, void>(createProjectLike);
  const { requireAuth } = useRequireAuth();

  const toggleLike = (projectId: string) => requireAuth(() => projectLikeMutate(projectId));

  return {
    res,
    loading,
    error,
    toggleLike
  };
}


