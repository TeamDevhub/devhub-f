import { useMutation } from "@/hooks/api.hook";
import type { ApiResponse } from "@/types/type.api";
import type { SignupRequest, VerificationConfirmRequest, VerificationRequest } from "@/types/type.signup";


// 개발용 JSON 호출
export const useSendVerification = () => {
  const mockSendVerification = async (): Promise<ApiResponse<void>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      code: "SUC.DVH.0001",
      error: null,
    } as ApiResponse<void>;
  };

  return useMutation<VerificationRequest, void>(mockSendVerification);
};

export const useConfirmVerification = () => {
  const mockConfirmVerification = async (): Promise<ApiResponse<void>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      code: "SUC.DVH.0001",
      error: null,
    } as ApiResponse<void>;
  };

  return useMutation<VerificationConfirmRequest, void>(mockConfirmVerification);
};

export const useSignup = () => {
  const mockSignup = async (): Promise<ApiResponse<void>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      code: "SUC.DVH.0001",
      error: null,
    } as ApiResponse<void>;
  };

  return useMutation<SignupRequest, void>(mockSignup);
};
