import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
  AuthenticationResult,
  CompleteRegistrationDto,
  LoginRequest,
  RegisterRequest,
} from '../types/auth';
import type { ApiResponse } from '../types/api';

export const authService = {
  async login(data: LoginRequest): Promise<ApiResponse<AuthenticationResult>> {
    return apiClient.post<ApiResponse<AuthenticationResult>>(
      API_ENDPOINTS.auth.login,
      data
    );
  },

  async completeRegistration(
    data: CompleteRegistrationDto
  ): Promise<ApiResponse<boolean>> {
    return apiClient.post<ApiResponse<boolean>>(
      API_ENDPOINTS.auth.COMPLETE_REGISTRATION,
      data
    );
  },

  async register(
    data: RegisterRequest
  ): Promise<ApiResponse<AuthenticationResult>> {
    return apiClient.post<ApiResponse<AuthenticationResult>>(
      API_ENDPOINTS.auth.register,
      data
    );
  },

  async logout(): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>(API_ENDPOINTS.auth.logout);
  },

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.auth.forgotPassword,
      { email }
    );
  },

  async resetPassword(
    token: string,
    password: string
  ): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>(API_ENDPOINTS.auth.resetPassword, {
      token,
      password,
    });
  },
};
