import { useMutation } from "@/hooks/api.hook";
import { login } from "./login.api";
import type { LoginRequest, LoginResponse } from "./login.type";

export const useLogin = () => useMutation<LoginRequest, LoginResponse>(login);