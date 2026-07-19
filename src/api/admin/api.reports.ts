import fetcher from '@/utils/util.api';
import type { AdminReport, AdminReportSearchRequest } from '@/types/type.user';

type AdminReportsRequest = AdminReportSearchRequest & { page: number; size: number };

export const getAdminReports = (req: AdminReportsRequest) =>
  fetcher<AdminReport, AdminReportsRequest>('/admin/users/reports', req, { method: 'get' });

export const processAdminReport = (reportGuid: string) =>
  fetcher<void>(`/admin/users/reports/${reportGuid}/process`, undefined, { method: 'put' });
