import type { ApplicationFormBasic, ApplicationFormRequest, ProjectCreate, ProjectDetailResponse, ProjectExtra, ProjectSearchRequest, ProjectUpdate, ProjectFormDetailResponse, SearchUserData, MyProject, CreateApplicationRequest, ProjectApplicationListRequest, ProjectApplicationListResponse, ApproveApplicationRequest, ProjectApplicationResponse } from "@/types/type.projects";
import fetcher from "@/utils/util.api";

export const getProjects = (req: ProjectSearchRequest) =>
  fetcher<ProjectExtra, ProjectSearchRequest>(
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

// 프로젝트 지원 (POST /projects/{projectGuid}/applications)
export const createProjectApplication = (req: CreateApplicationRequest) =>
  fetcher<void, Omit<CreateApplicationRequest, 'projectGuid'>>(
    `/projects/${req.projectGuid}/applications`,
    { requirementGuid: req.requirementGuid, answers: req.answers },
    { method: "post" }
  );

// 프로젝트 지원자 목록 조회 (GET /projects/{projectGuid}/applications) - 프로젝트 리더 전용
export const getProjectApplicationList = (req: ProjectApplicationListRequest) =>
  fetcher<ProjectApplicationListResponse>(
    `/projects/${req.projectGuid}/applications`,
    { page: req.page, size: req.size },
    { method: "get" }
  );

// 지원 승인/거절 (PUT /projects/applications/{applicationGuid}/approve) - 프로젝트 리더 전용
export const approveProjectApplication = (req: ApproveApplicationRequest) =>
  fetcher<void>(
    `/projects/applications/${req.applicationGuid}/approve?approved=${req.approved}`,
    undefined,
    { method: "put" }
  );

// 지원 상세 조회 (GET /projects/applications/{applicationGuid}) - 답변 내역 포함
export const getProjectApplication = (applicationGuid: string) =>
  fetcher<ProjectApplicationResponse>(
    `/projects/applications/${applicationGuid}`,
    undefined,
    { method: "get" }
  );

// 지원 취소 (PUT /projects/applications/{applicationGuid}/cancel) - 본인 지원 건만, 승인대기 상태만 가능
export const cancelProjectApplication = (applicationGuid: string) =>
  fetcher<void>(
    `/projects/applications/${applicationGuid}/cancel`,
    undefined,
    { method: "put" }
  );
