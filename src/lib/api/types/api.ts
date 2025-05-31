export interface ApiResponse<T> {
  success: boolean;
  message: string;
  result: T | null;
  errors?: object | null;
}
