import { confirmVerification, sendVerification, signup } from "@/api/signup/signup.api";
import { useMutation } from "@/hooks/_common/api.hook";
import type { SignupRequest, VerificationConfirmRequest, VerificationRequest } from "@/types/type.signup";


export const useSendVerification = () =>
  useMutation<VerificationRequest, void>(sendVerification);

export const useConfirmVerification = () =>
  useMutation<VerificationConfirmRequest, void>(confirmVerification);

export const useSignup = () => useMutation<SignupRequest, void>(signup);
