import { useMutation } from '@tanstack/react-query';
import { type LoginRequest, type LoginResponse } from '../types/auth';

import { authService } from '../services/auth.service';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export function useAuth() {
  const router = useRouter();
  const login = useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await authService.login(data);

      if (!response.success || !response.result) {
        throw new Error(response.message || 'Login failed');
      }
      return response.result;
    },
    retry: false, // Disable retries for login
    onSuccess: (response: LoginResponse, variables) => {
      // Set the auth token in cookies
      Cookies.set('auth-token', response.accessToken, {
        expires: variables.rememberMe ? 30 : 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      // Store refresh token securely
      Cookies.set('refresh-token', response.refreshToken, {
        expires: variables.rememberMe ? 30 : 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true,
      });

      // Store user data (optional)
      localStorage.setItem('user', JSON.stringify(response.user));
    },
  });

  const logout = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear auth token
      Cookies.remove('auth-token');
      Cookies.remove('refresh-token');
      localStorage.removeItem('user');

      // Navigate to login page and let the login page component handle cleanup
      router.push('/auth/login');
    },
  });

  return {
    login,
    logout,
    // Add more auth-related mutations/queries here
  };
}
