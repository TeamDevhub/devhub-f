import type { SignupRequest, VerificationConfirmRequest, VerificationRequest } from './signup.type';

import fetcher from "@/utils/api.util";

export const publishVerification = (req: VerificationRequest) =>
  fetcher<void, VerificationRequest>(
    "/auth/email-verification",
    req,
    { method: "post" }
  );

export const confirmVerification = (req: VerificationConfirmRequest) =>
  fetcher<void,VerificationConfirmRequest>(
    "/auth/email-verification/confirm",
    req,
    { method: "post" }
  );

export const signup = (req: SignupRequest) =>
  fetcher<void,SignupRequest>(
    "/user/signup",
    req,
    { method: "post" }
  );