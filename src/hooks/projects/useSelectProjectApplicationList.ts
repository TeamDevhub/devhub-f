import { getProjectApplicationList } from "@/api/projects/projects.api";
import type { ProjectApplicationListRequest, ProjectApplicationListResponseData } from "@/types/type.projects";
import { useSelect } from "../_common/api.hook";

export default function useSelectProjectApplicationList(projectGuid?: string) {
  const req = { projectGuid: projectGuid!, page: 0, size: 100 };

  const options = {
    apiFn: getProjectApplicationList,
    req,
    cacheKey: projectGuid ? `project-applications-${projectGuid}` : undefined,
    enabled: !!projectGuid,
  };

  const { res, loading } = useSelect<ProjectApplicationListResponseData, { projectGuid: string } & ProjectApplicationListRequest>(options);

  return {
    applicationList: res?.data?.applicationList ?? [],
    projectDetail: res?.data?.projectDetailDto,
    loading,
  };
}
