import {
  SendOtpRequestDto,
  SendOtpResponseDto,
  VerifyOtpRequestDto,
  VerifyOtpResponseDto,
  CompleteRegistrationRequestDto,
  CompleteRegistrationResponseDto,
  ResendOtpRequestDto,
  ValidateOtpRequestDto,
  InvalidateOtpRequestDto,
  CheckUserRequestDto,
  CheckUserResponseDto,
} from '../types/otp';
import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export const otpService = {
  // Send OTP
  async sendOtp(data: SendOtpRequestDto): Promise<ApiResponse<SendOtpResponseDto>> {
    return apiClient.post<ApiResponse<SendOtpResponseDto>>(
      API_ENDPOINTS.otp.SEND,
      data
    );
  },

  // Verify OTP
  async verifyOtp(data: VerifyOtpRequestDto): Promise<ApiResponse<VerifyOtpResponseDto>> {
    return apiClient.post<ApiResponse<VerifyOtpResponseDto>>(
      API_ENDPOINTS.otp.VERIFY,
      data
    );
  },

  // Complete Registration
  async completeRegistration(
    data: CompleteRegistrationRequestDto
  ): Promise<ApiResponse<CompleteRegistrationResponseDto>> {
    return apiClient.post<ApiResponse<CompleteRegistrationResponseDto>>(
      API_ENDPOINTS.otp.COMPLETE_REGISTRATION,
      data
    );
  },

  // Resend OTP
  async resendOtp(data: ResendOtpRequestDto): Promise<ApiResponse<SendOtpResponseDto>> {
    return apiClient.post<ApiResponse<SendOtpResponseDto>>(
      API_ENDPOINTS.otp.RESEND,
      data
    );
  },

  // Validate OTP
  async validateOtp(otpId: string, code: string): Promise<ApiResponse<boolean>> {
    const endpoint = API_ENDPOINTS.otp.VALIDATE
      .replace(':otpId', otpId)
      .replace(':code', code);
    
    return apiClient.get<ApiResponse<boolean>>(endpoint);
  },

  // Invalidate OTP
  async invalidateOtp(otpId: string): Promise<ApiResponse<boolean>> {
    const endpoint = API_ENDPOINTS.otp.INVALIDATE.replace(':otpId', otpId);
    
    return apiClient.delete<ApiResponse<boolean>>(endpoint);
  },

  // Check if user exists
  async checkUser(data: CheckUserRequestDto): Promise<ApiResponse<boolean>> {
    return apiClient.post<ApiResponse<boolean>>(
      API_ENDPOINTS.otp.CHECK_USER,
      data
    );
  },
};
