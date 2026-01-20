import type { DateType } from "@/types/api.type";

export interface ProjectBasic {
  projectGuid: string;
  userGuid: string;
  username: string;
  category: string;
  title: string;
  content: string;
  recruitmentTypeCd: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  progressTypeCd: string;
  prgressRegionCd: string;
  progressPeriod: string;
  progressStartDate: string;
  progressEndDate: string;
  viewCount: string;
  registerId: string;
  registeredDate: string;
  modifiderId: string;
  modifiedDate: string;
}

export interface Postion {
  position: string;
  capacity: number;
  level: string;
  isFull: boolean;
}

export interface ProjectDetail extends ProjectBasic {
  skillList: string[];
  positionList: Postion[];
  likeCount: string;
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

export interface ProjectListResponse extends ProjectDetail {
  //필요시 추가
};

export interface ProjectDetailResponse {};

export interface UpdateProjectRequest {};