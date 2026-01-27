import { useMutation, useSelect } from "@/hooks/api.hook";
import type { ApiResponse } from "@/types/api.type";
import type { ProjectDetailResponse, ProjectListResponse, ProjectSearchRequest, UpdateProjectRequest } from "./projects.type";

import apiSuccessResJSON from '@/assets/jsonData/apiSuccessRes.json';
import selectDetailResJSON from '@/assets/jsonData/projectsPage/projectDetailRes.json';
import selectListResJSON from '@/assets/jsonData/projectsPage/projectListRes.json';

// 개발용 JSON 호출

//조회
export const useSelectProjects = (req: ProjectSearchRequest) => {
  const mockGetProjects = async (): Promise<ApiResponse<ProjectListResponse>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return selectListResJSON as ApiResponse<ProjectListResponse>;
  };

  return useSelect<ProjectListResponse, ProjectSearchRequest>({
    apiFn: mockGetProjects,
    req,
    cacheKey: `projects-mock-${JSON.stringify(req)}`,
  });
};

export const useSelectProjectDetail = (projectId?: string) => {
  const mockGetProject = async (): Promise<ApiResponse<ProjectDetailResponse>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return selectDetailResJSON as ApiResponse<ProjectDetailResponse>;
  };

  return useSelect<ProjectDetailResponse, string>({
    apiFn: mockGetProject,
    req: projectId!,
    enabled: !!projectId,
    cacheKey: `project-mock-${projectId}`,
  });
}


//생성 수정 삭제
export const useUpdateProject = () => {
  const mockUpdateProject = async (): Promise<ApiResponse<void>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return apiSuccessResJSON as ApiResponse<void>;
  };

  useMutation<{
    projectId: string;
    data: UpdateProjectRequest;
  }, void>(mockUpdateProject);
}