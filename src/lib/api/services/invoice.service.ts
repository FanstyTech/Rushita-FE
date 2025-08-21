import {
  InvoiceDto,
  InvoiceListDto,
  InvoiceSummaryDto,
  InvoiceDashboardDto,
  InvoiceFilterDto,
  InvoiceSummaryFilterDto,
  InvoiceDashboardFilterDto,
  CreateUpdateInvoiceDto,
  PaymentDto,
} from '../types/invoice';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { ApiResponse } from '../types/api';
import type { PaginationResponse } from '../types/pagination';
import { convertFilterToParams, FilterParams } from '@/utils/filter';

export const invoiceService = {
  // Get all invoices with pagination and filtering
  async getAll(
    filter: InvoiceFilterDto
  ): Promise<ApiResponse<PaginationResponse<InvoiceListDto>>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.INVOICES.GET_LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  // Get invoice by ID
  async getById(id: string): Promise<ApiResponse<InvoiceDto>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.INVOICES.GET_ONE, {
      params: { id },
    });
  },

  // Create or update invoice
  async createOrUpdate(
    data: CreateUpdateInvoiceDto
  ): Promise<ApiResponse<InvoiceDto>> {
    return apiClient.post(
      API_ENDPOINTS.FINANCE_ENDPOINTS.INVOICES.CREATE_OR_UPDATE,
      data
    );
  },
  async addPayment(data: PaymentDto): Promise<ApiResponse<void>> {
    return apiClient.post(
      API_ENDPOINTS.FINANCE_ENDPOINTS.INVOICES.ADD_PAYMENT,
      data
    );
  },
  // Delete invoice
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.FINANCE_ENDPOINTS.INVOICES.DELETE, {
      id,
    });
  },

  // Get invoice summary statistics
  async getSummary(
    filter: InvoiceSummaryFilterDto
  ): Promise<ApiResponse<InvoiceSummaryDto>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.INVOICES.GET_SUMMARY, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  // Get invoice dashboard stats
  async getDashboardStats(
    filter: InvoiceDashboardFilterDto
  ): Promise<ApiResponse<InvoiceDashboardDto>> {
    return apiClient.get(
      API_ENDPOINTS.FINANCE_ENDPOINTS.INVOICES.GET_DASHBOARD_STATS,
      {
        params: convertFilterToParams(filter as FilterParams),
      }
    );
  },
};
