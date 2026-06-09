import fetcher from '@/utils/util.api';
import type {
  AdminProjectSummary,
  AdminProjectDetail,
  AdminProjectSearchRequest,
  UpdateAdminProjectRequest,
  AdminApplicantSummary,
  AdminApplicantSearchRequest,
  UpdateApplicantStatusRequest,
} from '@/types/type.project';

export const getAdminProjects = (req: AdminProjectSearchRequest) =>
  fetcher<AdminProjectSummary, AdminProjectSearchRequest>('/admin/projects', req, { method: 'get' });

export const getAdminProjectDetail = (projectGuid: string) =>
  fetcher<AdminProjectDetail>(`/admin/projects/${projectGuid}`, undefined, { method: 'get' });

export const updateAdminProject = (req: UpdateAdminProjectRequest) =>
  fetcher<void, Omit<UpdateAdminProjectRequest, 'projectGuid'>>(
    `/admin/projects/${req.projectGuid}`,
    req,
    { method: 'put' },
  );

export const deleteAdminProject = (projectGuid: string) =>
  fetcher<void>(`/admin/projects/${projectGuid}`, undefined, { method: 'delete' });

export const getAdminApplicants = (req: AdminApplicantSearchRequest) =>
  fetcher<AdminApplicantSummary, Omit<AdminApplicantSearchRequest, 'projectGuid'>>(
    `/admin/projects/${req.projectGuid}/applicants`,
    req,
    { method: 'get' },
  );

export const updateApplicantStatus = (req: UpdateApplicantStatusRequest) =>
  fetcher<void, Pick<UpdateApplicantStatusRequest, 'approvalStatusCd'>>(
    `/admin/projects/${req.projectGuid}/applicants/${req.applicantGuid}/status`,
    req,
    { method: 'put' },
  );
