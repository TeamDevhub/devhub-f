import type { ProjectDetailResponse, ProjectListResponse, ProjectSearchRequest, UpdateProjectRequest, ProjectCreate, ApplicationFormRequest, ApplicationFormBasic } from "@/api/projects/projects.type";
import fetcher from "@/utils/api.util";

export const getProjects = (req: ProjectSearchRequest) =>
  fetcher<ProjectListResponse, ProjectSearchRequest>(
    "/projects",
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

