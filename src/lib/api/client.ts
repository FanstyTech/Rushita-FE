import { API_BASE_URL, API_ENDPOINTS } from './config';
import Cookies from 'js-cookie';
import { ApiError, type ApiErrorResponse } from '../../utils/error';
import { toast } from '@/components/ui/Toast';
import { ApiResponse, AuthenticationResult } from './types/auth';

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  suppressError?: boolean;
}

type RequestBody = object | FormData | string | null;

interface RetryConfig {
  method: string;
  url: string;
  data?: RequestBody;
  init?: RequestInit;
}

class ApiClient {
  private baseUrl: string;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor(baseUrl?: string) {
    if (!baseUrl && !API_BASE_URL) {
      throw new Error(
        'API base URL is not defined. Please set NEXT_PUBLIC_API_URL environment variable.'
      );
    }
    this.baseUrl = baseUrl || API_BASE_URL || '';
  }
  private serializeBody(body: RequestBody): BodyInit | null {
    if (body === null) {
      return null;
    }
    if (body instanceof FormData) {
      return body;
    }
    if (typeof body === 'string') {
      return body;
    }
    return JSON.stringify(body);
  }

  private async handleResponse<T>(
    response: Response,
    suppressError = false,
    endpoint?: string,
    retryCount = 0,
    requestInfo?: {
      method: string;
      body?: RequestBody;
    }
  ): Promise<T> {
    if (!response.ok) {
      // Handle 401 Unauthorized
      if (
        response.status === 401 &&
        !endpoint?.includes('/auth') &&
        retryCount === 0
      ) {
        const newToken = await this.handleTokenRefresh();

        if (newToken) {
          // Retry the original request with new token
          const newResponse = await fetch(response.url, {
            method: requestInfo?.method || 'GET',
            headers: {
              ...this.getHeaders(),
              Authorization: `Bearer ${newToken}`,
            },
            body: requestInfo?.body
              ? this.serializeBody(requestInfo.body)
              : undefined,
          });

          // Retry with incremented count to prevent infinite loops
          return this.handleResponse<T>(
            newResponse,
            suppressError,
            endpoint,
            retryCount + 1,
            requestInfo
          );
        }

        throw new ApiError('Session expired. Please login again.', 401);
      }
      // Handle other errors
      let errorData: ApiErrorResponse;
      try {
        const apiResponse = await response.json();
        errorData = {
          message: apiResponse.message || 'An unexpected error occurred',
          statusCode: response.status,
          errors: apiResponse.errors,
        };
      } catch {
        errorData = {
          message: 'An unexpected error occurred',
          statusCode: response.status,
        };
      }

      const error = ApiError.fromResponse(errorData);

      // Show toast for non-suppressed errors
      if (!suppressError) {
        if (error.statusCode === 403) {
          toast.error('You do not have permission to perform this action');
        } else {
          toast.error(error.message);
        }
      }

      throw error;
    }

    try {
      const apiResponse = await response.json();
      return apiResponse;
    } catch (error) {
      console.error('Failed to parse response:', error);
      throw new ApiError('Invalid response format', 500);
    }
  }

  private async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = Cookies.get('refresh-token');
      if (!refreshToken) {
        return null;
      }

      const response = await fetch(
        this.buildUrl(API_ENDPOINTS.auth.refreshToken),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data: ApiResponse<AuthenticationResult> = await response.json();
      if (!data.success || !data.result) {
        throw new Error(data.message || 'Failed to refresh token');
      }

      const { user, accessToken, refreshToken: newRefreshToken } = data.result;

      // Update tokens
      Cookies.set('auth-token', accessToken, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      Cookies.set('refresh-token', newRefreshToken, {
        expires: 30,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      // Store user data
      localStorage.setItem('user', JSON.stringify(user));

      return accessToken;
    } catch {
      // Clear all auth data on refresh failure
      Cookies.remove('auth-token');
      Cookies.remove('refresh-token');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
      return null;
    }
  }

  private async handleTokenRefresh(): Promise<string | null> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      const newToken = await this.refreshToken();
      this.isRefreshing = false;

      if (newToken) {
        this.refreshSubscribers.forEach((callback) => callback(newToken));
      }
      this.refreshSubscribers = [];
      return newToken;
    }

    // Wait for the token to be refreshed
    return new Promise((resolve) => {
      this.refreshSubscribers.push((token: string) => {
        resolve(token);
      });
    });
  }

  private async retryRequest<T>(
    config: RetryConfig,
    newToken: string
  ): Promise<T> {
    const { method, url, data, init } = config;
    const headers = {
      ...this.getHeaders(),
      Authorization: `Bearer ${newToken}`,
    };

    const response = await fetch(url, {
      method,
      headers,
      body: data ? this.serializeBody(data) : undefined,
      ...init,
    });

    return this.handleResponse<T>(response, false);
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const token = Cookies.get('auth-token');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    let url = endpoint;
    if (params && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      url = `${url}?${queryString}`;
    }
    return `${this.baseUrl}${url}`;
  }

  async get<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { params, suppressError, ...init } = config;
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
        ...init,
      });
      return this.handleResponse<T>(response, suppressError, endpoint, 0, {
        method: 'GET',
      });
    } catch {
      throw new ApiError('Network error', 0);
    }
  }

  async post<T>(
    endpoint: string,
    data?: RequestBody,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, suppressError, ...init } = config;
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: data ? this.serializeBody(data) : undefined,
        ...init,
      });
      return this.handleResponse<T>(response, suppressError, endpoint);
    } catch {
      throw new ApiError('Network error', 0);
    }
  }

  async put<T>(
    endpoint: string,
    data?: RequestBody,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, suppressError, ...init } = config;
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: data ? this.serializeBody(data) : undefined,
        ...init,
      });
      return this.handleResponse<T>(response, suppressError, endpoint);
    } catch {
      throw new ApiError('Network error', 0);
    }
  }

  async delete<T>(
    endpoint: string,
    data?: RequestBody,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, suppressError, ...init } = config;
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getHeaders(),
        body: data ? this.serializeBody(data) : undefined,
        ...init,
      });
      return this.handleResponse<T>(response, suppressError, endpoint);
    } catch {
      throw new ApiError('Network error', 0);
    }
  }
}

export const apiClient = new ApiClient();
