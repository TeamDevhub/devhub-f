import type { ProjectDetailResponse } from "@/types/type.projects";
import { useSelect, useMutation } from "../_common/api.hook";
import { getProjectDetail, createProjectLike } from "@/api/web/projects.api";

export default function useSelectProjectDetail(
  projectId?: string
) {
  const options = {
    apiFn: getProjectDetail,
    req: projectId!,
    enabled: !!projectId,
  }

  const { res, loading } = useSelect<ProjectDetailResponse, string>(options);
  const { mutate: projectLikeMutate } = useMutation<string, void>(createProjectLike);

  return {
    res,
    loading,
    toggleLike: projectLikeMutate
  };
}


