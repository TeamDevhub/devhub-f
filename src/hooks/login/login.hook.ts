import { login } from "@/api/login/login.api";
import { useMutation } from "@/hooks/api.hook";
import type { LoginRequest, LoginResponse } from "@/types/type.login";

export const useLogin = () => useMutation<LoginRequest, LoginResponse>(login);