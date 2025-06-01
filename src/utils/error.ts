export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors?: Record<string, string[]>;

  constructor(
    message: string,
    statusCode: number,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static fromResponse(response: ApiErrorResponse): ApiError {
    return new ApiError(
      response.message,
      response.statusCode || 500,
      response.errors
    );
  }

  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
  }

  getFirstError(): string {
    if (!this.errors) return this.message;

    const firstErrorKey = Object.keys(this.errors)[0];
    if (!firstErrorKey) return this.message;

    return this.errors[firstErrorKey][0] || this.message;
  }
}
