import {
  ClinicTransactionDto,
  ClinicTransactionListDto,
  ClinicTransactionSummaryDto,
  ClinicTransactionDashboardDto,
  ClinicTransactionFilterDto,
  ClinicTransactionSummaryFilterDto,
  ClinicTransactionDashboardFilterDto,
  CreateUpdateClinicTransactionDto,
} from '../types/transaction';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams, FilterParams } from '@/utils/filter';

export const transactionService = {
  // Get all transactions with pagination and filtering
  async getAll(
    filter: ClinicTransactionFilterDto
  ): Promise<ApiResponse<PaginationResponse<ClinicTransactionListDto>>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.TRANSACTIONS.GET_LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  // Get transaction by ID
  async getById(id: string): Promise<ApiResponse<ClinicTransactionDto>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.TRANSACTIONS.GET_ONE, { 
      params: { id } 
    });
  },

  // Create or update transaction
  async createOrUpdate(
    data: CreateUpdateClinicTransactionDto
  ): Promise<ApiResponse<ClinicTransactionDto>> {
    return apiClient.post(API_ENDPOINTS.FINANCE_ENDPOINTS.TRANSACTIONS.CREATE_OR_UPDATE, data);
  },

  // Delete transaction
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.FINANCE_ENDPOINTS.TRANSACTIONS.DELETE, { 
      params: { id } 
    });
  },

  // Get transaction summary statistics
  async getSummary(
    filter: ClinicTransactionSummaryFilterDto
  ): Promise<ApiResponse<ClinicTransactionSummaryDto>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.TRANSACTIONS.GET_SUMMARY, { 
      params: convertFilterToParams(filter as FilterParams) 
    });
  },

  // Get transaction dashboard stats
  async getDashboardStats(
    filter: ClinicTransactionDashboardFilterDto
  ): Promise<ApiResponse<ClinicTransactionDashboardDto>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.TRANSACTIONS.GET_DASHBOARD_STATS, { 
      params: convertFilterToParams(filter as FilterParams) 
    });
  },
};