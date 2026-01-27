import type { ApiResponse } from "@/types/type.api";

export interface LoginRequest {
  id: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}