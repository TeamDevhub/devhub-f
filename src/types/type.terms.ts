export interface Terms {
  termsGuid: string;
  title: string;
  content: string;
  required: boolean;
  used: boolean;
  deleted: boolean;
}

export interface AgreeTermsRequest {
  termsGuid: string;
  agreed: boolean;
}

export interface CreateTermsRequest {
  title: string;
  content: string;
  required: boolean;
  used: boolean;
  deleted: boolean;
}

export interface TermsResponse {
  termsGuid: string;
  title: string;
  content: string;
  required: boolean;
  used: boolean;
  deleted: boolean;
}
