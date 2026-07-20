import type { ApplicationFormBasic, ApplicationFormRequest, ProjectApplicationListRequest, ProjectApplicationListResponseData, ProjectApplicationResponse, ProjectCreate, ProjectDetailResponse, ProjectExtra, ProjectSearchRequest, ProjectUpdate, ProjectFormDetailResponse, CreateApplicationRequest, SearchUserData, MyProject } from "@/types/type.projects";
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

export const getUserProjects = (req: SearchUserData) =>
  fetcher<MyProject, SearchUserData>(
    "/user/projects",
    req,
    { method: "get" }
  );

export const getUserLikeProjects = (req: SearchUserData) =>
  fetcher<MyProject, SearchUserData>(
    "/user/projects/likes",
    req,
    { method: "get" }
  );

export const getUserApplyProjects = (req: SearchUserData) =>
  fetcher<MyProject, SearchUserData>(
    "/user/projects/applications",
    req,
    { method: "get" }
  );

export const getUserParticapateProjects = (req: SearchUserData) =>
  fetcher<MyProject, SearchUserData>(
    "/user/projects/participates",
    req,
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

export const approveProjectApplication = (req: { projectGuid: string; applicationGuid: string; approved: boolean }) =>
  fetcher<void>(
    `/projects/applications/${req.applicationGuid}/approve?approved=${req.approved}`,
    undefined,
    { method: "put" }
  );

export const deleteProject = (projectId: string) =>
  fetcher<void, string>(
    `/projects/${projectId}`,
    undefined,
    { method: "delete" }
  );

export const createProjectLike = (projectId: string) =>
  fetcher<void, string>(
    `/projects/${projectId}/likes`,
    undefined,
    { method: "post" }
  );

export const closeProject = (projectId: string) =>
  fetcher<void, string>(
    `/projects/${projectId}/close`,
    undefined,
    { method: "post" }
  );

export const reviewMember = (req: { projectGuid: string, userGuid: string, score: number }) =>
  fetcher<void>(
    `/projects/${req.projectGuid}/members/${req.userGuid}`,
    { score: req.score },
    { method: "post" }
  );
