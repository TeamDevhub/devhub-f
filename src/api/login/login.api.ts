import fetcher from "@/utils/api.util";
import type { LoginRequest, LoginResponse } from "./login.type";

export const login = (req: LoginRequest) =>
  fetcher<LoginResponse, LoginRequest>(
    `/login`,
    req,
    { method: "post" }
  );
