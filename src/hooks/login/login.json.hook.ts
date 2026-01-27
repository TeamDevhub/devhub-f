import loginSuccessRes from "@/assets/jsonData/login/loginSuccessRes.json";
import { useMutation } from "@/hooks/_common/api.hook";
import type { ApiResponse } from "@/types/type.api";
import type { LoginRequest, LoginResponse } from "@/types/type.login";

export const useLogin = () => {
  const mockLogin = async (): Promise<ApiResponse<LoginResponse>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return loginSuccessRes;
  };

  return useMutation<LoginRequest, LoginResponse>(mockLogin);
}