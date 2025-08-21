import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { ApiResponse } from '../types/api';
import type { PaginationResponse } from '../types/pagination';
import {
  CreateUpdateClinicRevenueDto,
  ClinicRevenueDto,
  ClinicRevenueFilterDto,
  ClinicRevenueListDto,
  ClinicRevenueSummaryDto,
  ClinicRevenueSummaryFilterDto,
  ClinicRevenueDashboardDto,
  ClinicRevenueDashboardFilterDto,
} from '../types/revenue';
import { convertFilterToParams, FilterParams } from '@/utils/filter';

export const revenueService = {
  // Get paginated list of revenues
  async getAll(
    filter: ClinicRevenueFilterDto
  ): Promise<ApiResponse<PaginationResponse<ClinicRevenueListDto>>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.REVENUES.GET_LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  // Get single revenue by ID
  async getById(id: string): Promise<ApiResponse<ClinicRevenueDto>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.REVENUES.GET_ONE, {
      params: { id },
    });
  },

  // Create or update revenue
  async createOrUpdate(
    data: CreateUpdateClinicRevenueDto
  ): Promise<ApiResponse<ClinicRevenueDto>> {
    return apiClient.post(
      API_ENDPOINTS.FINANCE_ENDPOINTS.REVENUES.CREATE_OR_UPDATE,
      data
    );
  },

  // Delete revenue
  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(API_ENDPOINTS.FINANCE_ENDPOINTS.REVENUES.DELETE, {
      id,
    });
  },

  // Get revenue summary
  async getSummary(
    filter: ClinicRevenueSummaryFilterDto
  ): Promise<ApiResponse<ClinicRevenueSummaryDto>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.REVENUES.GET_SUMMARY, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  // Get revenue dashboard stats
  async getDashboardStats(
    filter: ClinicRevenueDashboardFilterDto
  ): Promise<ApiResponse<ClinicRevenueDashboardDto>> {
    return apiClient.get(
      API_ENDPOINTS.FINANCE_ENDPOINTS.REVENUES.GET_DASHBOARD_STATS,
      { params: convertFilterToParams(filter as FilterParams) }
    );
  },
};
