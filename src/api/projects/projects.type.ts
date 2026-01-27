import type { DateType } from "@/types/api.type";

export interface ProjectBasic {
  projectGuid?: string;
  userGuid?: string;
  username?: string;
  category?: string;
  title?: string;
  content?: string;
  recruitmentTypeCd?: string;
  recruitmentStartDate?: DateType;
  recruitmentEndDate?: DateType;
  progressTypeCd?: string;
  prgressRegionCd?: string;
  progressPeriod?: string;
  progressStartDate?: DateType;
  progressEndDate?: DateType;
  viewCount?: string;
  registerId?: string;
  registeredDate?: string;
  modifiderId?: string;
  modifiedDate?: string;
}

export interface Position {
  position?: string;
  level?: string;
  capacity?: number;
  isFull?: boolean;
}

export interface ApplicationFormBasic {
  applicationFormGuid?: string;
  typeCd?: string;
  title?: string;
  helpText?: string;
  vertYn?: string;
  customYn?: string;
  useY?: string;
  registerId?: string;
  registeredDate?: DateType;
  modifiderId?: string;
  modifiedDate?: DateType;
}

export interface ProjectDetail extends ProjectBasic {
  skillList?: string[];
  positionList?: Position[];
  likeCount?: string;
}

export interface ProjectCreate extends ProjectDetail {
  applicationFormList: string[];
  additionalFormList: ApplicationFormDetail[];
}

export interface ApplicationFormDetail extends ApplicationFormBasic {
  itemList: string[];
}

export interface ProjectSearchRequest {
  page:number;
  order?:string;
  keyword?:string;
  skillCodeList?:string[];
  regionCodeList?:string[];
  positionCodeList?:string[];
  progressPeriodList?:string[];
  positionLevelCodeList?:string[];
  projectRecruitTypeList?:string[];
  projectProgressTypeList?:string[];
  projectRecruitStatusList?:string[];
  recruitmentStartDate?:DateType;
  recruitmentEndDate?:DateType;
  progressStartDate?:DateType;
};

export interface ApplicationFormRequest {
  title?: string;
  formTypeCd?: string;
  customYn?: string;
  useYn?: string;
}

export interface ProjectListResponse extends ProjectDetail {
  //필요시 추가
};

export interface ProjectDetailResponse extends ProjectDetail {
  email: string;
}

export interface UpdateProjectRequest { };