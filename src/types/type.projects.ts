import type { DateType, Pagination } from "@/types/type.api";
import type { ApplicationFormType } from "@/constants/projectCreate"
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
  // 승인된(취소되지 않은) 지원자 수 - 모집 포지션의 현재 인원 표시용
  currentCount?: number;
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
  progressEndDate?: DateType;
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
  userFileGuid?: string;
}

export interface ProjectFormDetailResponse extends ProjectExtra, ProjectFileMetaData {
  email?: string;
  applicationFormList: ApplicationFormBasic[];
  additionalFormList: ApplicationFormCreate[];
}

export interface ProjectUpdate extends ProjectExtra, ProjectFileMetaData {
  applicationFormList: string[];
  additionalFormList: ApplicationFormCreate[];
}

// Profile
export type MyProjectListCardVariant = 'register' | 'apply' | 'favorite' | 'participate';
export type ProgressStateType = 'ing' | 'end';

export interface MyApplication {
  applicantGuid: string;
  userName: string;
  email: string;
  // 백엔드는 아직 평가하지 않은 팀원의 경우 score를 null로 반환한다 (ProjectApplicationScore.score: Double).
  score: number | null;
  mannerDegree: string;
}

// 프로젝트 지원 (applicant-facing)
export interface CreateApplicationAnswerRequest {
  projectApplicationFormGuid: string;
  applicationFormGuid: string;
  content: string;
  fileGuid?: string;
}

export interface CreateApplicationRequest {
  projectGuid: string;
  requirementGuid: string;
  answers: CreateApplicationAnswerRequest[];
}

// 프로젝트 지원자 관리 (owner-facing) - ProjectApplicationDetailResponseDto와 1:1 대응
export interface ProjectApplicant {
  applicationGuid: string;
  requirementGuid?: string;
  applicantGuid?: string;
  approverGuid?: string;
  decisionDate?: string;
  statusCd: string;
  userName?: string;
  email?: string;
  mannerDegree?: string;
  skillList?: string[];
  position?: string;
  levelCd?: string;
  applyDate?: string;
}

export interface ProjectApplicationListRequest {
  projectGuid: string;
  page: number;
  size: number;
}

export interface ProjectApplicationListResponse {
  projectDetailDto: ProjectDetailResponse;
  applicationList: ProjectApplicant[];
  pagination: Pagination;
}

export interface ApproveApplicationRequest {
  projectGuid: string;
  applicationGuid: string;
  approved: boolean;
}

// 지원 상세 조회 - ProjectApplicationDetailWrapperResponseDto와 1:1 대응
export interface ProjectApplicationAnswerDetailItem {
  applicationAnswerGuid?: string;
  projectApplicationFormGuid?: string;
  fileGuid?: string;
  content?: string;
  userName?: string;
  email?: string;
  mannerDegree?: string;
  userSkillList?: string[];
  positionCd?: string;
  introduction?: string;
}

export interface ProjectApplicationResponse {
  projectApplicationBasicDto?: {
    applicationGuid?: string;
    requirementGuid?: string;
    applicantGuid?: string;
    approverGuid?: string;
    decisionDate?: string;
    applyDate?: string;
  };
  projectApplicationAnswerList?: ProjectApplicationAnswerDetailItem[];
}

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
  // 'apply' variant에서만 채워진다 - 지원 취소 시 어떤 지원 건인지 식별하기 위함
  applicationGuid?: string;
  applicationList?: MyApplication[];
  children?: React.ReactNode;
}
