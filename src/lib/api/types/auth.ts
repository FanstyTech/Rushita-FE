export interface AuthenticationUserResult {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface AuthenticationResult {
  user: AuthenticationUserResult;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse extends AuthenticationResult {}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  result?: T;
  errors?: Record<string, string[]>;
}
