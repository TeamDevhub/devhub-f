export interface UserBasicResponse {
  userGuid: string;
  email: string;
  username: string;
  introduction: string;
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
