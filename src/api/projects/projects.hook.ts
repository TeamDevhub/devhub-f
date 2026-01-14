import { useMutation, useSelect } from "@/hooks/api.hook";
import type { ProjectDetailResponse, ProjectListResponse, ProjectSearchRequest, UpdateProjectRequest } from "@/types/projects.type";
import { getProjectDetail, getProjects, updateProject } from "./projects.api";

export const useProjects = (req: ProjectSearchRequest) =>
  useSelect<ProjectListResponse, ProjectSearchRequest>({
    apiFn: getProjects,
    req,
    cacheKey: `projects-${JSON.stringify(req)}`,
  });
  //const { data, loading, refetch } = useProjects({ page: 1 });
  
export const useProjectDetail = (projectId?: number) =>
  useSelect<ProjectDetailResponse, number>({
    apiFn: getProjectDetail,
    req: projectId!,
    enabled: !!projectId,
    cacheKey: `project-${projectId}`,
  });
  //const { data, loading } = useProjectDetail(1);

export const useUpdateProject = () =>
  useMutation<{
    projectId: number;
    data: UpdateProjectRequest;
  }, void>(updateProject);
  //const { mutate, loading } = useUpdateProject();
  // await mutate({
  //   projectId: 1,
  //   data: { title: "수정됨" },
  // });


