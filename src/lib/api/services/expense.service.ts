import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { ApiResponse } from '../types/api';
import type { PaginationResponse } from '../types/pagination';
import {
  CreateUpdateClinicExpenseDto,
  ClinicExpenseDto,
  ClinicExpenseFilterDto,
  ClinicExpenseListDto,
  ClinicExpenseSummaryDto,
  ClinicExpenseSummaryFilterDto,
  ClinicExpenseDashboardDto,
  ClinicExpenseDashboardFilterDto,
} from '../types/expense';
import { convertFilterToParams, FilterParams } from '@/utils/filter';

export const expenseService = {
  // Get paginated list of expenses
  async getAll(
    filter: ClinicExpenseFilterDto
  ): Promise<ApiResponse<PaginationResponse<ClinicExpenseListDto>>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.EXPENSES.GET_LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  // Get single expense by ID
  async getById(id: string): Promise<ApiResponse<ClinicExpenseDto>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.EXPENSES.GET_ONE, {
      params: { id },
    });
  },

  // Create or update expense
  async createOrUpdate(
    data: CreateUpdateClinicExpenseDto
  ): Promise<ApiResponse<ClinicExpenseDto>> {
    return apiClient.post(
      API_ENDPOINTS.FINANCE_ENDPOINTS.EXPENSES.CREATE_OR_UPDATE,
      data
    );
  },

  // Delete expense
  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(API_ENDPOINTS.FINANCE_ENDPOINTS.EXPENSES.DELETE, {
      id,
    });
  },

  // Get expense summary
  async getSummary(
    filter: ClinicExpenseSummaryFilterDto
  ): Promise<ApiResponse<ClinicExpenseSummaryDto>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.EXPENSES.GET_SUMMARY, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  // Get expense dashboard stats
  async getDashboardStats(
    filter: ClinicExpenseDashboardFilterDto
  ): Promise<ApiResponse<ClinicExpenseDashboardDto>> {
    return apiClient.get(
      API_ENDPOINTS.FINANCE_ENDPOINTS.EXPENSES.GET_DASHBOARD_STATS,
      { params: convertFilterToParams(filter as FilterParams) }
    );
  },
};