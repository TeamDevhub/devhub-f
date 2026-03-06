import type { ApplicationFormBasic, ApplicationFormRequest, CreateApplicationRequest, ProjectApplicationRequest, ProjectApplicationResponse, ProjectCreate, ProjectDetailResponse, ProjectListResponse, ProjectSearchRequest, UpdateProjectRequest } from "@/types/type.projects";
import fetcher from "@/utils/util.api";

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

export const updateProjectLike = (req: {
  projectId: string;
  liked: boolean;
}) =>
  fetcher<void>(
    `/projects/${req.projectId}/likes`,
    req.liked,
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
    { method: "get" }
  );

export const getProjectApplication = (req: ProjectApplicationRequest) =>
  fetcher<ProjectApplicationResponse>(
    `/projects/${req.projectGuid}/applications/${req.applicationGuid}`,
    undefined,
    { method: "get" }
  );

export const createProjectApplication = (req: CreateApplicationRequest) =>
  fetcher<void, Omit<CreateApplicationRequest, 'projectGuid'>>(
    `/projects/${req.projectGuid}/applications`,
    { requirementGuid: req.requirementGuid, answers: req.answers },
    { method: "post" }
  );

