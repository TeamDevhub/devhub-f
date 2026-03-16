import type { ProjectFormDetailResponse } from "@/types/type.projects";
import { useSelect } from "../_common/api.hook";
import { getProjectFormDetail } from "@/api/projects/projects.api";

export default function useSelectProjectFormDetail(
  projectId?: string
) {
  const options = {
    apiFn: getProjectFormDetail,
    req: projectId!,
    cacheKey: projectId ? `project-detail-${projectId}-form` : undefined,
    enabled: !!projectId,
}

const { res, loading } = useSelect<ProjectFormDetailResponse, string>(options);

  return {
    res, 
    loading,
  };
}