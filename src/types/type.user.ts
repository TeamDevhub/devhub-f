export type DateTimeString = string; // LocalDateTime → ISO string

export interface UserBasicResponse {
  userGuid: string;
  username: string;
  introduction: string | null;

  fileGuid: string | null;

  mannerDegree: number;

  blocked: boolean;
  blockEndDate: DateTimeString | null;

  deleted: boolean;

  lastLoginDateTime?: DateTimeString | null;

  registrantGuid: string;
  registeredDate: DateTimeString;

  modifierGuid: string;
  modifiedDate: DateTimeString;
}

export interface AdminUserDetail {
  userGuid: string;
  username: string;
  introduction: string | null;

  fileGuid: string | null;

  userRole: string;

  mannerDegree: number;

  blocked: boolean;
  blockEndDate: DateTimeString | null;

  deleted: boolean;

  positionList: string[];
  skillList: string[];

  registeredDate: DateTimeString;
  modifiedDate: DateTimeString;
}

export type AdminUserListItem = UserBasicResponse;

export interface AdminReport {
  reportGuid: string;

  boardGuid: string | null;
  commentGuid: string | null;

  reportedUser: string;
  reporterUser: string;

  categoryCd: string;
  reason: string;

  processed: boolean;

  registeredDate: DateTimeString;
}

export interface AdminUpdateUserRequest {
  username: string;
  introduction: string;
}

export interface AdminResetPasswordRequest {
  newPassword: string;
}

export interface AdminBanUserRequest {
  reason?: string;
  blockEndDate?: DateTimeString;
}

import type { DateType } from './type.api';

export interface AdminUserSearchRequest {
  username?: string;

  blocked?: boolean;
  deleted?: boolean;

  registeredStartDate?: DateType;
  registeredEndDate?: DateType;
}
