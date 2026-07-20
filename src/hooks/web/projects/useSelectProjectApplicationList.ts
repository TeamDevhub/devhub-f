import type {
  ProjectApplicationListItem,
  ProjectApplicationListResponseData,
  ProjectDetailResponse,
} from "@/types/type.projects";
import { useSelect } from "@/hooks/_common/api.hook";
import { getProjectApplicationList } from "@/api/web/api.projects";

type ProjectApplicationListReq = { projectGuid: string; page: number; size: number };

export default function useSelectProjectApplicationList(projectGuid?: string) {
  const options = {
    apiFn: getProjectApplicationList,
    req: { projectGuid: projectGuid!, page: 0, size: 100 },
    enabled: !!projectGuid,
  };

  const { res, loading, error } = useSelect<
    ProjectApplicationListResponseData,
    ProjectApplicationListReq
  >(options);

  const applicationList: ProjectApplicationListItem[] = res?.data?.applicationList ?? [];
  const projectDetail: ProjectDetailResponse | undefined = res?.data?.projectDetailDto;

  return { applicationList, projectDetail, loading, error };
}
