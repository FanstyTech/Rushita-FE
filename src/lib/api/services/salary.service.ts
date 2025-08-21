import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { ApiResponse } from '../types/api';
import type { PaginationResponse } from '../types/pagination';
import {
  StaffSalaryDto,
  StaffSalaryListDto,
  StaffSalarySummaryDto,
  StaffSalaryFilterDto,
  StaffSalarySummaryFilterDto,
  CreateUpdateStaffSalaryDto,
} from '../types/salary';
import { convertFilterToParams, FilterParams } from '@/utils/filter';

export const salaryService = {
  // Get paginated list of staff salaries
  async getAll(
    filter: StaffSalaryFilterDto
  ): Promise<ApiResponse<PaginationResponse<StaffSalaryListDto>>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.SALARIES.GET_LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  // Get single salary by ID
  async getById(id: string): Promise<ApiResponse<StaffSalaryDto>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.SALARIES.GET_ONE, {
      params: { id },
    });
  },

  // Create or update salary
  async createOrUpdate(
    data: CreateUpdateStaffSalaryDto
  ): Promise<ApiResponse<StaffSalaryDto>> {
    return apiClient.post(
      API_ENDPOINTS.FINANCE_ENDPOINTS.SALARIES.CREATE_OR_UPDATE,
      data
    );
  },

  // Delete salary
  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(API_ENDPOINTS.FINANCE_ENDPOINTS.SALARIES.DELETE, {
      id,
    });
  },

  // Get salary summary
  async getSummary(
    filter: StaffSalarySummaryFilterDto
  ): Promise<ApiResponse<StaffSalarySummaryDto>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.SALARIES.GET_SUMMARY, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },
};
