export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponseDto {
  accessToken: string;
}
