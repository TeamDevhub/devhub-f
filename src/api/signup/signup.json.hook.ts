import { useMutation } from "@/hooks/api.hook";
import type { ApiResponse } from "@/types/api.type";
import type { SignupRequest, VerificationConfirmRequest, VerificationRequest } from './signup.type';

import apiSuccessResJSON from '@/assets/jsonData/apiSuccessRes.json'

// 개발용 JSON 호출
export const usePublishVerification = () => {
  const mockPublishVerification = async (): Promise<ApiResponse<void>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return apiSuccessResJSON as ApiResponse<void>;
  };

  useMutation<VerificationRequest, void>(mockPublishVerification);
};

export const useConfirmVerification = () => {
  const mockConfirmVerification = async (): Promise<ApiResponse<void>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return apiSuccessResJSON as ApiResponse<void>;
  };

  useMutation<VerificationConfirmRequest, void>(mockConfirmVerification);
};

export const useSignup = () => {
  const mockSignup = async (): Promise<ApiResponse<void>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return apiSuccessResJSON as ApiResponse<void>;
  };

  useMutation<SignupRequest, void>(mockSignup);
};