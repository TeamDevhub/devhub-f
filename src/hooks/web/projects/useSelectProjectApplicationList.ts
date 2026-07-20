import { useMemo, useState } from "react";
import { useSelect } from "@/hooks/_common/api.hook";
import { getProjectApplicationList } from "@/api/web/api.projects";
import type { ProjectApplicationListRequest, ProjectApplicationListResponse } from "@/types/type.projects";

export const projectApplicationListCacheKey = (projectGuid: string) => `project-application-list-${projectGuid}`;

export default function useSelectProjectApplicationList(projectGuid?: string) {
  // position별로 그룹핑해서 보여주는 화면 특성상 페이지 경계에서 한 포지션 그룹이 잘리면
  // 그룹별 인원수/카드 목록이 페이지마다 달라 보이므로, 실제로 페이징이 필요한 규모가 되기 전까지는
  // 한 페이지에 최대한 모아 보여준다 (진짜 대량일 때는 여전히 정상적으로 페이징된다).
  const [request, setRequest] = useState<ProjectApplicationListRequest>({
    projectGuid: projectGuid ?? "",
    page: 0,
    size: 50,
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
