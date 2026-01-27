import type { ApplicationFormBasic, ApplicationFormRequest, ProjectCreate, ProjectDetailResponse, ProjectListResponse, ProjectSearchRequest, UpdateProjectRequest } from "@/api/projects/projects.type";
import { useMutation, useSelect } from "@/hooks/api.hook";
import { createProject, getApplicationForms, getProjectDetail, getProjects, updateProject, updateProjectLike } from "./projects.api";

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

export const useUpdateProjectLike = () =>
  useMutation<{projectId: string}, void>(
    ({projectId}) => updateProjectLike(projectId)
  );

export const useCreateProject = () => useMutation<ProjectCreate, void>(createProject);
  //const { mutate, loading } = useCreateProject();
  // await mutate({
  //    title: "새 프로젝트"
  // });

export const useSelectApplicationForms = (req: ApplicationFormRequest) =>
  useSelect<ApplicationFormBasic, ApplicationFormRequest>({
    apiFn: getApplicationForms,
    req,
    cacheKey: 'applicationForms-${JSON.stringify(req)}',
})
//const { res, loading, refetch } = useSelectApplicationForms({ customYn: 'N });
