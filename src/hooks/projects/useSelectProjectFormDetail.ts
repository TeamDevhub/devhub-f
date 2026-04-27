import type { ProjectFormDetailResponse } from "@/types/type.projects";
import { useSelect } from "../_common/api.hook";
import { getProjectFormDetail } from "@/api/web/projects.api";

export default function useSelectProjectFormDetail(
  projectId?: string
) {
  const options = {
    apiFn: getProjectFormDetail,
    req: projectId!,
    enabled: !!projectId,
}

const { res, loading } = useSelect<ProjectFormDetailResponse, string>(options);

  return {
    res, 
    loading,
  };
}