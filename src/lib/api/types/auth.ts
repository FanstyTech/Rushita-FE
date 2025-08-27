export interface UserPermissionDto {
  key: string;
  name: string;
  module: string;
}

export interface UserClinicInfoDto {
  id: string;
  name: string;
  staffId: string;
}

export interface AuthenticationUserResult {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  clinicInfo?: UserClinicInfoDto;
  roles: string[];
  permissions: UserPermissionDto[];
}

export interface AuthenticationResult {
  user: AuthenticationUserResult;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email?: string;
  phoneNumber?: string;
  countryCodeId?: string;
  password: string;
  rememberMe?: boolean;
}

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
export interface CompleteRegistrationDto {
  password: string;
  confirmPassword: string;
  registrationToken: string;
}
