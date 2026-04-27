import type { DateType } from "@/types/type.api";
import type { ApplicationFormType } from "@/types/const.projectCreate.ts"
import type { ProjectRecruitStatusCode, ProjectApprovalStatusCode } from '@/types/type._common';

export interface ProjectBasic {
  projectGuid: string;
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
}

export interface ProjectCreate extends Omit<ProjectDetail, 'projectGuid'> {
  applicationFormList: string[];
  additionalFormList: ApplicationFormCreate[];
}

export interface ProjectExtra extends ProjectDetail {
  likeCount: string;
  recruitStatus: ProjectRecruitStatusCode;
  projectLiked?: boolean;
}

export interface ApplicationFormBasic {
  applicationFormGuid: string;
  typeCd: ApplicationFormType;
  title: string;
  helpText?: string;
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

export type ApplicationFormCreate = Omit<ApplicationFormDetail, 'applicationFormGuid'>;

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

export interface ProjectFileMetaData {
  imageFileGuid?: string;
  imageFileName?: string;
  imageFileUrl?: string;
  attachmentFileGuid?: string;
  attachmentFileName?: string;
  attachmentFileUrl?: string;
}

export type SearchData = Pick<ProjectSearchRequest, 'page' | 'order' | 'keyword' | 'size'>;
export type SearchUserData = Pick<ProjectSearchRequest, 'page' | 'size'>;
export type FilterData = Omit<ProjectSearchRequest, keyof SearchData>;

// export interface ProjectUpdate extends ProjectDetail {
//   applicationFormList: string[];
//   additionalFormList: ApplicationFormCreate[];
// }

// export interface ProjectListResponse extends ProjectExtra {
//   //필요시 추가
// }

export interface ProjectDetailResponse extends ProjectExtra, ProjectFileMetaData {
  email: string;
}

export interface ProjectFormDetailResponse extends ProjectExtra, ProjectFileMetaData {
  applicationFormList: ApplicationFormBasic[];
  additionalFormList: ApplicationFormCreate[];
}

export interface ProjectUpdate extends ProjectExtra, ProjectFileMetaData {
  applicationFormList: string[];
  additionalFormList: ApplicationFormCreate[];
}

// Profile
export type MyProjectListCardVariant = 'register' | 'apply' | 'favorite' | 'participate';
export type ProgressStateType = '진행중' | '진행완료';

export interface MyProject {
  variant?: MyProjectListCardVariant;
  projectGuid: string;
  title?: string;
  recruitmentStartDate?: string;
  recruitmentEndDate?: string;
  progressStartDate?: string;
  progressEndDate?: string;
  progressRegionCd?: string;
  recruitmentTypeCd?: string;
  currentRecriutNumber?: string;
  totalRecriutNumber?: string;
  applicantNumber?: string;
  approvalNumber?: string;
  approvalState?: ProjectApprovalStatusCode;
  progressState?: ProgressStateType;
  recruitStatus: ProjectRecruitStatusCode;
  children?: React.ReactNode;
};
