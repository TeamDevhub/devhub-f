import { useMutation } from "@/hooks/api.hook";
import { confirmVerification, publishVerification, signup } from './signup.api';
import type { SignupRequest, VerificationConfirmRequest, VerificationRequest } from './signup.type';

export const usePublishVerification = () =>
  useMutation<VerificationRequest, void>(publishVerification);

export const useConfirmVerification = () =>
  useMutation<VerificationConfirmRequest, void>(confirmVerification);

export const useSignup = () =>
  useMutation<SignupRequest, void>(signup);


