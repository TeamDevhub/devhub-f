import { useMutation, useSelect } from "@/hooks/api.hook";
import type { ProjectDetailResponse, ProjectListResponse, ProjectSearchRequest, UpdateProjectRequest } from "@/api/projects/projects.type";
import { getProjectDetail, getProjects, updateProject } from "./projects.api";

export const useSelectProjects = (req: ProjectSearchRequest) =>
  useSelect<ProjectListResponse, ProjectSearchRequest>({
    apiFn: getProjects,
    req,
    cacheKey: `projects-${JSON.stringify(req)}`,
  });
  //const { res, loading, refetch } = useSelectProjects({ page: 1 });
  
export const useSelectProjectDetail = (projectId?: string) =>
  useSelect<ProjectDetailResponse, string>({
    apiFn: getProjectDetail,
    req: projectId!,
    enabled: !!projectId,
    cacheKey: `project-${projectId}`,
  });
  //const { res, loading } = useSelectProjectDetail(1);

export const useUpdateProject = () =>
  useMutation<{
    projectId: string;
    data: UpdateProjectRequest;
  }, void>(updateProject);
  //const { mutate, loading } = useUpdateProject();
  // await mutate({
  //   projectId: 1,
  //   data: { title: "수정됨" },
  // });

