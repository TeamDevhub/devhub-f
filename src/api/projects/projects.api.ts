import type { ApplicationFormBasic, ApplicationFormRequest, ProjectApplicationListRequest, ProjectApplicationListResponseData, ProjectApplicationResponse, ProjectCreate, ProjectDetailResponse, ProjectExtra, ProjectSearchRequest, ProjectUpdate, ProjectFormDetailResponse, CreateApplicationRequest } from "@/types/type.projects";
import fetcher from "@/utils/util.api";

export const getProjects = (req: ProjectSearchRequest) =>
  fetcher<ProjectExtra, ProjectSearchRequest>(
    "/projects/list",
    req,
    { method: "get" }
  );

export const getProjectApplicationList = (req: { projectGuid: string } & ProjectApplicationListRequest) =>
  fetcher<ProjectApplicationListResponseData, ProjectApplicationListRequest>(
    `/projects/${req.projectGuid}/applications`,
    { page: req.page, size: req.size },
    { method: "get" }
  );

export const getProjectDetail = (projectId: string) =>
  fetcher<ProjectDetailResponse>(
    `/projects/${projectId}`,
    undefined,
    { method: "get" }
  );

export const getProjectFormDetail = (projectId: string) =>
  fetcher<ProjectFormDetailResponse>(
    `/projects/${projectId}/form`,
    undefined,
    { method: "get" }
  );

export const updateProject = (req: {
  projectId: string;
  data: ProjectUpdate;
}) =>
  fetcher<void, ProjectUpdate>(
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

export const getProjectApplication = (applicationGuid: string) =>
  fetcher<ProjectApplicationResponse>(
    `/projects/applications/${applicationGuid}`,
    undefined,
    { method: "get" }
  );

export const createProjectApplication = (req: CreateApplicationRequest) =>
  fetcher<void, Omit<CreateApplicationRequest, 'projectGuid'>>(
    `/projects/${req.projectGuid}/applications`,
    { requirementGuid: req.requirementGuid, answers: req.answers },
    { method: "post" }
  );

