import { useMutation, useQueryClient } from '@tanstack/react-query';
import { otpService } from '../services/otp.service';
import type {
  SendOtpRequestDto,
  VerifyOtpRequestDto,
  CompleteRegistrationRequestDto,
  ResendOtpRequestDto,
  CheckUserRequestDto,
} from '../types/otp';
import { toast } from '@/components/ui/Toast';

export function useOtp() {
  const queryClient = useQueryClient();

  // Query keys for cache management
  const queryKeys = {
    all: ['otp'] as const,
    send: () => [...queryKeys.all, 'send'] as const,
    verify: () => [...queryKeys.all, 'verify'] as const,
    registration: () => [...queryKeys.all, 'registration'] as const,
    resend: () => [...queryKeys.all, 'resend'] as const,
    checkUser: () => [...queryKeys.all, 'checkUser'] as const,
  };

  // Send OTP mutation
  const sendOtp = useMutation({
    mutationFn: async (data: SendOtpRequestDto) => {
      const response = await otpService.sendOtp(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to send OTP');
      }
      return response.result;
    },
    onSuccess: (data) => {
      toast.success('OTP sent successfully');
      // Store OTP ID and expiry for verification
      localStorage.setItem('currentOtpId', data?.otpId || '');
      localStorage.setItem('otpExpiresAt', data?.expiresAt || '');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send OTP');
    },
  });

  // Verify OTP mutation
  const verifyOtp = useMutation({
    mutationFn: async (data: VerifyOtpRequestDto) => {
      const response = await otpService.verifyOtp(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to verify OTP');
      }
      return response.result;
    },
    onSuccess: (data) => {
      if (data?.isNewUser) {
        toast.success('OTP verified successfully. Please complete your registration.');
      } else {
        toast.success('OTP verified successfully');
        // Clear OTP data from localStorage
        localStorage.removeItem('currentOtpId');
        localStorage.removeItem('otpExpiresAt');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to verify OTP');
    },
  });

  // Complete Registration mutation
  const completeRegistration = useMutation({
    mutationFn: async (data: CompleteRegistrationRequestDto) => {
      const response = await otpService.completeRegistration(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to complete registration');
      }
      return response.result;
    },
    onSuccess: (data) => {
      toast.success('Registration completed successfully');
      // Clear OTP data from localStorage
      localStorage.removeItem('currentOtpId');
      localStorage.removeItem('otpExpiresAt');
      
      // Store authentication tokens
      if (data?.token) {
        localStorage.setItem('accessToken', data.token);
      }
      if (data?.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      
      // Invalidate auth-related queries
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to complete registration');
    },
  });

  // Resend OTP mutation
  const resendOtp = useMutation({
    mutationFn: async (data: ResendOtpRequestDto) => {
      const response = await otpService.resendOtp(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to resend OTP');
      }
      return response.result;
    },
    onSuccess: (data) => {
      toast.success('OTP resent successfully');
      // Update OTP data in localStorage
      localStorage.setItem('currentOtpId', data?.otpId || '');
      localStorage.setItem('otpExpiresAt', data?.expiresAt || '');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to resend OTP');
    },
  });

  // Validate OTP mutation
  const validateOtp = useMutation({
    mutationFn: async ({ otpId, code }: { otpId: string; code: string }) => {
      const response = await otpService.validateOtp(otpId, code);
      if (!response.success) {
        throw new Error(response.message || 'Failed to validate OTP');
      }
      return response.result;
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to validate OTP');
    },
  });

  // Invalidate OTP mutation
  const invalidateOtp = useMutation({
    mutationFn: async (otpId: string) => {
      const response = await otpService.invalidateOtp(otpId);
      if (!response.success) {
        throw new Error(response.message || 'Failed to invalidate OTP');
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('OTP invalidated successfully');
      // Clear OTP data from localStorage
      localStorage.removeItem('currentOtpId');
      localStorage.removeItem('otpExpiresAt');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to invalidate OTP');
    },
  });

  // Check user existence mutation
  const checkUser = useMutation({
    mutationFn: async (data: CheckUserRequestDto) => {
      const response = await otpService.checkUser(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to check user');
      }
      return response.result;
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to check user');
    },
  });

  // Helper function to get current OTP data from localStorage
  const getCurrentOtpData = () => {
    const otpId = localStorage.getItem('currentOtpId');
    const expiresAt = localStorage.getItem('otpExpiresAt');
    
    if (!otpId || !expiresAt) {
      return null;
    }

    const expiryDate = new Date(expiresAt);
    if (expiryDate <= new Date()) {
      // OTP has expired, clear from localStorage
      localStorage.removeItem('currentOtpId');
      localStorage.removeItem('otpExpiresAt');
      return null;
    }

    return {
      otpId,
      expiresAt: expiryDate,
      remainingTime: Math.max(0, expiryDate.getTime() - new Date().getTime()),
    };
  };

  // Helper function to check if OTP can be resent
  const canResendOtp = () => {
    const otpData = getCurrentOtpData();
    if (!otpData) {
      return true; // No OTP exists, can send new one
    }
    
    // Check if enough time has passed (1 minute cooldown)
    const cooldownTime = 60 * 1000; // 60 seconds
    return otpData.remainingTime < (otpData.expiresAt.getTime() - new Date().getTime() - cooldownTime);
  };

  return {
    // Mutations
    sendOtp,
    verifyOtp,
    completeRegistration,
    resendOtp,
    validateOtp,
    invalidateOtp,
    checkUser,
    
    // Helper functions
    getCurrentOtpData,
    canResendOtp,
    
    // Query keys (for manual cache management)
    queryKeys,
  };
}
