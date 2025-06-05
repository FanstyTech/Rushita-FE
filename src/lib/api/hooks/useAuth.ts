import { useMutation } from '@tanstack/react-query';
import {
  type LoginRequest,
  AuthenticationResult,
  AuthenticationUserResult,
} from '../types/auth';

import { authService } from '../services/auth.service';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from '@/components/ui/Toast';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<AuthenticationUserResult | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await authService.login(data);
      if (!response.success || !response.result) {
        throw new Error(response.message || 'Login failed');
      }
      return response.result;
    },
    retry: false, // Disable retries for login
    onSuccess: (response: AuthenticationResult, variables) => {
      toast.success('Login successfully');

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
      });

      // Store user data
      localStorage.setItem('user', JSON.stringify(response.user));

      // Update user state
      setUser(response.user);

      // Redirect to dashboard or home
      router.push('/admin/dashboard');
    },
  });

  const logout = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear auth token
      Cookies.remove('auth-token');
      Cookies.remove('refresh-token');
      localStorage.removeItem('user');
      setUser(null);
      router.push('/auth/login');
    },
    onError: () => {
      toast.error('Failed to logout');
    },
  });

  return {
    login,
    logout,
    user,
  };
};
