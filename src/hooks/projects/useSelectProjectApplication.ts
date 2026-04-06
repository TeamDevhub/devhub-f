import { getProjectApplication } from "@/api/projects/projects.api";
import type { ProjectApplicationResponse } from "@/types/type.projects";
import { useSelect } from "../_common/api.hook";

export default function useSelectProjectApplication(
  applicationGuid?: string,
  enabled = true,
) {
  const options = {
    apiFn: getProjectApplication,
    req: applicationGuid!,
    cacheKey: applicationGuid ? `project-application-${applicationGuid}` : undefined,
    enabled: enabled && !!applicationGuid,
  };

  const { res, loading } = useSelect<ProjectApplicationResponse, string>(options);
  return {
    res,
    loading,
  };
}
