import type {
  SignupRequest,
  VerificationConfirmRequest,
  VerificationRequest,
} from "./signup.type";

import fetcher from "@/utils/api.util";

export const sendVerification = (req: VerificationRequest) =>
  fetcher<void, VerificationRequest>("/auth/verification/email", req, {
    method: "post",
  });

export const confirmVerification = (req: VerificationConfirmRequest) =>
  fetcher<void, VerificationConfirmRequest>(
    "/auth/verification/email/confirm",
    req,
    { method: "post" },
  );

export const signup = (req: SignupRequest) =>
  fetcher<void, SignupRequest>("/user/signup", req, { method: "post" });
