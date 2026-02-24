import { getProjectApplication } from "@/api/projects/projects.api";
import type { ProjectApplicationRequest, ProjectApplicationResponse } from "@/types/type.projects";
import { useSelect } from "../_common/api.hook";

export default function useSelectProjectApplication(
  projectGuid?: string,
  applicationGuid?: string,
  enabled = true,
) {
  const req: ProjectApplicationRequest = {
    projectGuid: projectGuid!,
    applicationGuid: applicationGuid!,
  };

  const options = {
    apiFn: getProjectApplication,
    req,
    cacheKey: (projectGuid && applicationGuid)
      ? `project-application-${projectGuid}-${applicationGuid}`
      : undefined,
    enabled: enabled && !!projectGuid && !!applicationGuid,
  };

  const { res, loading } = useSelect<ProjectApplicationResponse, ProjectApplicationRequest>(options);
   //eslint-disable-next-line no-debugger
debugger;
  return {
    res,
    loading,
  };
}
