import type { ProjectDetailResponse } from "@/types/type.projects";
import { useSelect } from "../_common/api.hook";
import { getProjectDetail } from "@/api/projects/projects.api";

export default function useSelectProjectDetail(
  projectId?: string
) {
  const options = {
    apiFn: getProjectDetail,
    req: projectId!,
    enabled: !!projectId,
  }

  const { res, loading } = useSelect<ProjectDetailResponse, string>(options);

  return {
    res, 
    loading,
  };
}


