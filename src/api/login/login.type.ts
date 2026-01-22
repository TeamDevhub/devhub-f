import type { ApiResponse } from "@/types/api.type";

export interface LoginRequest {
  id: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}