import type { ProjectDetailResponse, ProjectListResponse, ProjectSearchRequest, UpdateProjectRequest } from "@/api/projects/projects.type";
import fetcher from "@/utils/api.util";

// api/project.api.ts
export const getProjects = (req: ProjectSearchRequest) =>
  fetcher<ProjectListResponse, ProjectSearchRequest>(
    "/projects",
    req,
    { method: "get" }
  );

export const getProjectDetail = (projectId: number) =>
  fetcher<ProjectDetailResponse>(
    `/projects/${projectId}`,
    undefined,
    { method: "get" }
  );

export const updateProject = (req: {
  projectId: number;
  data: UpdateProjectRequest;
}) =>
  fetcher<void, UpdateProjectRequest>(
    `/projects/${req.projectId}`,
    req.data,
    { method: "put" }
  );
