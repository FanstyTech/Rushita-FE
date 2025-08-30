import type {
  DoctorDashboardDto,
  DoctorDashboardFilterDto,
} from '../types/doctor-dashboard';
import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

// Helper function to convert filter to query parameters
const convertFilterToParams = (
  filter: DoctorDashboardFilterDto
): Record<string, string> => {
  const params: Record<string, string> = {};

  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params[key] = String(value);
    }
  });

  return params;
};

export const doctorDashboardService = {
  // Get doctor dashboard data
  async getDashboard(
    filter: DoctorDashboardFilterDto = {}
  ): Promise<ApiResponse<DoctorDashboardDto>> {
    return apiClient.get(API_ENDPOINTS.DOCTOR.DASHBOARD, {
      params: convertFilterToParams(filter),
    });
  },
};
