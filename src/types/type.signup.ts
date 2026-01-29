export interface SendVerificationCodeRequest {
  email: string;
}

export interface ConfrimVerificationCodeRequest {
  email: string;
  verificationCode: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
  introduction: string;
  skillList: string[];
  positionList: string[];
}
