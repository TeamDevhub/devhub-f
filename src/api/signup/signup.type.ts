export interface VerificationRequest {
  email:string;
};

export interface VerificationConfirmRequest {
  email:string;
  authCode:string;
};

export interface SignupRequest {
  email:string;
  password:string;
  username:string;
  introduction:string;
  skillList:string[];
  positionList:string[];
};