import type { DateType } from './type.api';
import type { Pagination } from '@/types/type.api'

export interface AdminProjectSummary {
  projectGuid: string;
  title: string;
  email: string;
  username: string;
  recruitmentTypeCd: string;
  recruitStatus: string;
  progressTypeCd: string;
  progressRegionCd: string;
  registeredDate: string;
}

export interface AdminProjectPosition {
  position: string;
  level: string;
  capacity: number;
}

export interface AdminProjectDetail {
  projectGuid: string;
  title: string;
  recruitmentTypeCd: string;
  progressTypeCd: string;
  progressRegionCd: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  progressStartDate: string;
  progressEndDate: string;
  registeredDate: string;
  positionList: AdminProjectPosition[];
  content: string;
  email: string;
  username: string;
  userGuid: string;
  recruitStatusCd: string;
}

export interface AdminProjectSearchRequest {
  page: number;
  size?: number;
  keyword?: string;
  recruitmentTypeCd?: string;
  recruitStatusCd?: string;
  progressTypeCd?: string;
  progressRegionCd?: string;
  recruitmentStartDate?: DateType;
  recruitmentEndDate?: DateType;
  progressStartDate?: DateType;
  progressEndDate?: DateType;
}

export interface UpdateAdminProjectRequest {
  projectGuid: string;
  title: string;
  recruitmentTypeCd: string;
  progressTypeCd: string;
  progressRegionCd: string;
  recruitmentStartDate: DateType;
  recruitmentEndDate: DateType;
  progressStartDate: DateType;
  progressEndDate: DateType;
}

export interface AdminApplicantSummary {
  applicantGuid: string;
  userGuid: string;
  email: string;
  positionCd: string;
  levelCd: string;
  approvalStatusCd: string;
}
export interface AdminApplicantSummaryResponse {
  applicantList: AdminApplicantSummary[];
  pagination: Pagination
}

export interface AdminApplicantSearchRequest {
  projectGuid: string;
  page: number;
  size: number;
  approvalStatusCd?: string;
  positionCd?: string;
  levelCd?: string;
}

export interface UpdateApplicantStatusRequest {
  projectGuid: string;
  applicantGuid: string;
  approvalStatusCd: string;
}
