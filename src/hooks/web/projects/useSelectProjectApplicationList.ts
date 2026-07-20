import { useMemo, useState } from "react";
import { useSelect } from "@/hooks/_common/api.hook";
import { getProjectApplicationList } from "@/api/web/api.projects";
import type { ProjectApplicationListRequest, ProjectApplicationListResponse } from "@/types/type.projects";

export const projectApplicationListCacheKey = (projectGuid: string) => `project-application-list-${projectGuid}`;

export default function useSelectProjectApplicationList(projectGuid?: string) {
  const [request, setRequest] = useState<ProjectApplicationListRequest>({
    projectGuid: projectGuid ?? "",
    page: 0,
    size: 10,
  });

  const options = useMemo(() => ({
    apiFn: getProjectApplicationList,
    req: request,
    cacheKey: projectApplicationListCacheKey(projectGuid ?? ""),
    enabled: !!projectGuid,
  }), [request, projectGuid]);

  const { res, loading, error, refetch } = useSelect<ProjectApplicationListResponse, ProjectApplicationListRequest>(options);

  // MUI Pagination은 1부터 시작하지만 백엔드는 0부터 시작하므로 여기서 변환한다.
  const setPage = (page: number) => {
    setRequest((prev) => ({ ...prev, page: page - 1 }));
  };

  const applicationList = res?.data?.applicationList ?? [];
  const projectDetail = res?.data?.projectDetailDto;
  const pagination = res?.data?.pagination;

  return { applicationList, projectDetail, pagination, request, setPage, loading, error, refetch };
}
