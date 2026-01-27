import apiSuccessResJSON from '@/assets/jsonData/apiSuccessRes.json';
import applicationFormListRes from '@/assets/jsonData/projectsPage/applicationFormListRes.json';
import selectDetailResJSON from '@/assets/jsonData/projectsPage/projectDetailRes.json';
import selectListResJSON from '@/assets/jsonData/projectsPage/projectListRes.json';
import { useMutation, useSelect } from "@/hooks/api.hook";
import type { ApiResponse } from "@/types/type.api";
import type { ApplicationFormBasic, ApplicationFormRequest, ProjectCreate, ProjectDetailResponse, ProjectListResponse, ProjectSearchRequest, UpdateProjectRequest } from "@/types/type.projects";

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

export const useCreateProject = () => {
  const mockCreateProject = async (): Promise<ApiResponse<void>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return apiSuccessResJSON as ApiResponse<void>;
  };

  useMutation<ProjectCreate, void>(mockCreateProject);
}

export const useSelectApplicationForms = (req: ApplicationFormRequest) => {
  const mockGetApplicationForms = async (): Promise<ApiResponse<ApplicationFormBasic>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return applicationFormListRes as ApiResponse<ApplicationFormBasic>;
  };
  return useSelect<ApplicationFormBasic, ApplicationFormRequest>({
      apiFn: mockGetApplicationForms,
      req,
      cacheKey: 'applicationForms-${JSON.stringify(req)}',
  })
}