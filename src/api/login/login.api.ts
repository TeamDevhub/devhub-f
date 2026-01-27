import type { LoginRequest, LoginResponse } from "@/types/type.login";
import fetcher from "@/utils/util.api";

export const login = (req: LoginRequest) =>
  fetcher<LoginResponse, LoginRequest>(
    `/login`,
    req,
    { method: "post" }
  );
