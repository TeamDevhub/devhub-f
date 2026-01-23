import { useMutation } from "@/hooks/api.hook";
import { confirmVerification, sendVerification, signup } from "./signup.api";
import type {
  SignupRequest,
  VerificationConfirmRequest,
  VerificationRequest,
} from "./signup.type";

export const useSendVerification = () =>
  useMutation<VerificationRequest, void>(sendVerification);

export const useConfirmVerification = () =>
  useMutation<VerificationConfirmRequest, void>(confirmVerification);

export const useSignup = () => useMutation<SignupRequest, void>(signup);
