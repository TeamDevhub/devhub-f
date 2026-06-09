import type { ProjectFormDetailResponse } from "@/types/type.projects";
import { useSelect } from "@/hooks/_common/api.hook";
import { getProjectFormDetail } from "@/api/web/api.projects";

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