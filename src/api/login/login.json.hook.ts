import { useMutation } from "@/hooks/api.hook";
import type { LoginRequest, LoginResponse } from "./login.type";
import type { ApiResponse } from "@/types/api.type";
import loginSuccessRes from "@/assets/jsonData/login/loginSuccessRes.json"

export const useLogin = () => {
  const mockLogin = async (): Promise<ApiResponse<LoginResponse>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return loginSuccessRes;
  };

  return useMutation<LoginRequest, LoginResponse>(mockLogin);
}