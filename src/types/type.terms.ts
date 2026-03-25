export interface Terms {
  termsGuid: string;
  title: string;
  content: string;
  isRequired: boolean;
  isUsed: boolean;
  isDeleted: boolean;
}

export interface AgreeTermsRequest {
  termsGuid: string;
  isAgreed: boolean;
}

export interface CreateTermsRequest {
  title: string;
  content: string;
  isRequired: boolean;
  isUsed: boolean;
  isDeleted: boolean;
}

export interface TermsResponse {
  termsGuid: string;
  title: string;
  content: string;
  isRequired: boolean;
  isUsed: boolean;
  isDeleted: boolean;
}
