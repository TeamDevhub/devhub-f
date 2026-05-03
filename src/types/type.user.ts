export interface UserBasicResponse {
  userGuid: string;
  email: string;
  username: string;
  introduction: string;
  fileGuid: string;
  mannerDegree: number;
  blocked: boolean;
  blockEndDate: string | null;
  deleted: boolean;
  lastLoginDateTime: string | null;
  registrantGuid: string;
  registeredDate: string;
  modifierGuid: string;
  modifiedDate: string;
}

export interface UserDetailResponse {
  user: UserBasicResponse;
  positionList: string[];
  skillList: string[];
}

export interface UpdateProfileRequest {
  username: string;
  introduction: string;
  positionList: string[];
  skillList: string[];
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileImageRequest {
  fileGuid: string;
}

export interface AdminUserSummary {
  userGuid: string;
  email: string;
  username: string;
  userStatusCd: string;
  registeredDate: string;
  mannerDegree: number;
}

export interface AdminUserDetail {
  user: UserBasicResponse;
  userStatusCd: string;
  positionList: string[];
  skillList: string[];
}

import type { DateType } from './type.api';

export interface AdminUserSearchRequest {
  page: number;
  size: number;
  username?: string;
  userStatusCd?: string;
  registeredStartDate?: DateType;
  registeredEndDate?: DateType;
}

export interface UpdateUserStatusRequest {
  userGuid: string;
  userStatusCd: string;
}
