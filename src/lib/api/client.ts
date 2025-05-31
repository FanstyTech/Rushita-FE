import { API_BASE_URL } from './config';
import Cookies from 'js-cookie';
import { ApiError, type ApiErrorResponse } from './utils/error';
import { toast } from '@/components/ui/Toast';

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  suppressError?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    if (!baseUrl && !API_BASE_URL) {
      throw new Error(
        'API base URL is not defined. Please set NEXT_PUBLIC_API_URL environment variable.'
      );
    }
    this.baseUrl = baseUrl || API_BASE_URL || '';
  }

  private async handleResponse<T>(
    response: Response,
    suppressError = false,
    endpoint?: string
  ): Promise<T> {
    if (!response.ok) {
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
        if (error.statusCode === 401 && !endpoint?.endsWith('/auth/login')) {
          toast.error(error.message);
          Cookies.remove('auth-token');
          window.location.href = '/auth/login';
        } else if (error.statusCode === 403) {
          toast.error(error.message);
        } else {
          toast.error(error.message);
        }
      }

      throw error;
    }

    const apiResponse = await response.json();
    if (!apiResponse.success) {
      const error = new ApiError(
        apiResponse.message,
        response.status,
        apiResponse.errors
      );
      if (!suppressError) {
        toast.error(error.message);
      }
      throw error;
    }
    return apiResponse;
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
    try {
      const response = await fetch(this.buildUrl(endpoint, params), {
        method: 'GET',
        headers: this.getHeaders(),
        ...init,
      });
      return this.handleResponse<T>(response, suppressError, endpoint);
    } catch (error) {
      if (!suppressError) {
        toast.error('Network error. Please check your connection.');
      }
      throw new ApiError('Network error', 0);
    }
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, suppressError, ...init } = config;
    const response = await fetch(this.buildUrl(endpoint, params), {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
      ...init,
    });
    return this.handleResponse<T>(response, suppressError, endpoint);
  }

  async put<T>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, suppressError, ...init } = config;
    const response = await fetch(this.buildUrl(endpoint, params), {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
      ...init,
    });
    return this.handleResponse<T>(response, suppressError, endpoint);
  }

  async delete<T>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, suppressError, ...init } = config;
    const response = await fetch(this.buildUrl(endpoint, params), {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
      ...init,
    });
    return this.handleResponse<T>(response, suppressError, endpoint);
  }
}

export const apiClient = new ApiClient();
