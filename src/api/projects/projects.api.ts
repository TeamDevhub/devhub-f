import type { ApplicationFormBasic, ApplicationFormRequest, ProjectCreate, ProjectDetailResponse, ProjectListResponse, ProjectSearchRequest, UpdateProjectRequest } from "@/types/type.projects";
import fetcher from "@/utils/util.api";

export const getProjects = (req: ProjectSearchRequest) =>
  fetcher<ProjectListResponse, ProjectSearchRequest>(
    "/projects/list",
    req,
    { method: "get" }
  );

export const getProjectDetail = (projectId: string) =>
  fetcher<ProjectDetailResponse>(
    `/projects/${projectId}`,
    undefined,
    { method: "get" }
  );

export const updateProject = (req: {
  projectId: string;
  data: UpdateProjectRequest;
}) =>
  fetcher<void, UpdateProjectRequest>(
    `/projects/${req.projectId}`,
    req.data,
    { method: "put" }
  );

export const updateProjectLike = (projectId: string) =>
  fetcher<void>(
    `/projects/${projectId}/likes`,
    undefined,
    { method: "post" }
  );
  
export const createProject = (req: ProjectCreate) => 
  fetcher<void, ProjectCreate>(
    '/projects',
    req,
    { method: "post" }
  );

export const getApplicationForms = (req: ApplicationFormRequest) => 
  fetcher<ApplicationFormBasic, ApplicationFormRequest>(
    '/applicationForms',
    req,
    { method: "post" }
  );

