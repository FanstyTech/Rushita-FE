// OTP Types for Rousheta Frontend API Integration

// Base OTP DTO
export interface OtpDto {
  id: string;
  countryCodeId: string;
  countryCodeName?: string;
  phoneNumber: string;
  email?: string;
  code: string;
  type: OtpType;
  status: OtpStatus;
  expiresAt: string;
  verifiedAt?: string;
  attempts: number;
  purpose?: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

// OTP Type Enum
export enum OtpType {
  Registration = 1,
  Login = 2,
  PasswordReset = 3,
  PhoneVerification = 4,
  TwoFactorAuthentication = 5,
}

// OTP Status Enum
export enum OtpStatus {
  Pending = 1,
  Verified = 2,
  Expired = 3,
  Failed = 4,
  Cancelled = 5,
}

// Send OTP Request DTO
export interface SendOtpRequestDto {
  countryCodeId: string;
  phoneNumber: string;
  type: OtpType;
  purpose?: string;
}

// Send OTP Response DTO
export interface SendOtpResponseDto {
  success: boolean;
  message: string;
  otpId: string;
  expiresAt: string;
  resendCooldownSeconds: number;
}

// Verify OTP Request DTO
export interface VerifyOtpRequestDto {
  countryCodeId: string;
  phoneNumber: string;
  code: string;
  type: OtpType;
}

// Verify OTP Response DTO
export interface VerifyOtpResponseDto {
  success: boolean;
  message: string;
  isNewUser: boolean;
  userId?: string;
  token?: string;
  refreshToken?: string;
}

// Complete Registration Request DTO
export interface CompleteRegistrationRequestDto {
  countryCodeId: string;
  phoneNumber: string;
  otpCode: string;
  fNameL: string;
  lNameL: string;
  dateOfBirth: string; // Will be converted to Date in backend
  gender: Gender;
  email: string;
  password: string;
  confirmPassword: string;
  preferredLanguage?: string;
}

// Resend OTP Request DTO
export interface ResendOtpRequestDto {
  countryCodeId: string;
  phoneNumber: string;
  type: OtpType;
}

// Gender Enum
export enum Gender {
  Male = 1,
  Female = 2,
  Other = 3,
}

// OTP Validation Request DTO
export interface ValidateOtpRequestDto {
  otpId: string;
  code: string;
}

// OTP Invalidation Request DTO
export interface InvalidateOtpRequestDto {
  otpId: string;
}

// Check User Request DTO
export interface CheckUserRequestDto {
  countryCodeId: string;
  phoneNumber: string;
}

// Check User Response DTO
export interface CheckUserResponseDto {
  userExists: boolean;
}
