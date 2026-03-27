import type { AgreeTermsRequest } from './type.terms';

export interface SendVerificationCodeRequest {
  verificationType: string;
  value: string;
}

export interface ConfrimVerificationCodeRequest {
  verificationType: string;
  value: string;
  code: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
  introduction: string;
  skillList: string[];
  positionList: string[];
  termsAgreementList: AgreeTermsRequest[];
}
