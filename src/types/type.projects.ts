import type { DateType } from "@/types/type.api";
import type { ApplicationFormType } from "@/types/const.projectCreate.ts"
import type { ProjectRecruitStatusCode } from '@/types/type._common';

export interface ProjectBasic {
  projectGuid?: string;
  userGuid?: string;
  username?: string;
  category: string;
  title: string;
  content: string;
  attachmentFileGuid?: string;
  imageFileGuid?: string;
  recruitmentTypeCd: string;
  recruitmentStartDate: DateType;
  recruitmentEndDate: DateType;
  progressTypeCd: string;
  progressRegionCd: string;
  progressStartDate: DateType;
  progressEndDate: DateType;
  viewCount?: string;
  capacityClosed?: boolean;
  registrantGuid?: string;
  registeredDate?: string;
  modifierGuid?: string;
  modifiedDate?: string;
}

export interface Position {
  position: string;
  level: string;
  capacity: number;
  isFull?: boolean;
}

export interface ProjectDetail extends ProjectBasic {
  skillList: string[];
  positionList: Position[];
  likeCount?: string;
  recruitStatus?: ProjectRecruitStatusCode;
}

export interface ProjectCreate extends ProjectDetail {
  applicationFormList: string[];
  additionalFormList: ApplicationsFormCreate[];
}

export interface ApplicationFormBasic {
  applicationFormGuid: string;
  typeCd: ApplicationFormType;
  title: string;
  helpText?: string;
  vertYn?: string;
  customYn?: string;
  useYn?: string;
  registerId?: string;
  registeredDate?: DateType;
  modifiderId?: string;
  modifiedDate?: DateType;
}

export interface ApplicationFormDetail extends ApplicationFormBasic {
  itemList?: string[];
}

export type ApplicationsFormCreate = Omit<ApplicationFormDetail, 'applicationFormGuid'>;

export interface ApplicationFormRequest {
  title?: string;
  formTypeCd?: string;
  customYn?: string;
  useYn?: string;
}

export interface ProjectSearchRequest {
  page: number;
  size: number;
  order?: string;
  keyword?: string;
  skillCodeList?: string[];
  regionCodeList?: string[];
  positionCodeList?: string[];
  progressPeriodList?: string[];
  positionLevelCodeList?: string[];
  projectRecruitTypeList?: string[];
  projectProgressTypeList?: string[];
  projectRecruitStatusList?: string[];
  recruitmentStartDate?: DateType;
  recruitmentEndDate?: DateType;
  progressStartDate?: DateType;
}

export type SearchData = Pick<ProjectSearchRequest, 'page' | 'order' | 'keyword' | 'size'>;
export type FilterData = Omit<ProjectSearchRequest, keyof SearchData>;

export interface ProjectUpdate extends ProjectDetail {
  applicationFormList: string[];
  additionalFormList: ApplicationsFormCreate[];
}

export interface ProjectListResponse extends ProjectDetail {
  //필요시 추가
}

export interface ProjectDetailResponse extends ProjectDetail {
  email: string;
}
