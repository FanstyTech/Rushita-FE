import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { ApiResponse } from '../types/api';
import type { PaginationResponse } from '../types/pagination';
import { SelectOption } from '../types/select-option';
import {
  GetServicesByTypeInput,
  ServicePriceCreateUpdateDto,
  ServicePriceDto,
  ServicePriceFilterDto,
  ServicePriceListDto,
  ServicePriceSummaryDto,
  ServicePriceSummaryFilterDto,
} from '../types/service-price';
import { convertFilterToParams, FilterParams } from '@/utils/filter';

export const servicePriceService = {
  // Get paginated list of service prices
  async getAll(
    filter: ServicePriceFilterDto
  ): Promise<ApiResponse<PaginationResponse<ServicePriceListDto>>> {
    return apiClient.get(
      API_ENDPOINTS.FINANCE_ENDPOINTS.SERVICE_PRICES.GET_LIST,
      {
        params: convertFilterToParams(filter as FilterParams),
      }
    );
  },

  // Get single service price by ID
  async getById(id: string): Promise<ApiResponse<ServicePriceDto>> {
    return apiClient.get(
      API_ENDPOINTS.FINANCE_ENDPOINTS.SERVICE_PRICES.GET_ONE,
      {
        params: { id },
      }
    );
  },

  // Create new service price
  async createOrUpdate(
    data: ServicePriceCreateUpdateDto
  ): Promise<ApiResponse<ServicePriceDto>> {
    return apiClient.post(
      API_ENDPOINTS.FINANCE_ENDPOINTS.SERVICE_PRICES.CREATE_OR_UPDATE,
      data
    );
  },

  // Delete service price
  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(
      API_ENDPOINTS.FINANCE_ENDPOINTS.SERVICE_PRICES.DELETE,
      {
        id,
      }
    );
  },

  // Get services by type for dropdown
  async getServicesByType(
    filter: GetServicesByTypeInput
  ): Promise<ApiResponse<SelectOption<string>[]>> {
    return apiClient.get(API_ENDPOINTS.FINANCE_ENDPOINTS.SERVICES_BY_TYPE, {
      params: {
        serviceType: filter.serviceType.toString(),
        filter: filter.filter,
      },
    });
  },

  // Get service price summary
  async getSummary(
    filter: ServicePriceSummaryFilterDto
  ): Promise<ApiResponse<ServicePriceSummaryDto[]>> {
    return apiClient.get(
      API_ENDPOINTS.FINANCE_ENDPOINTS.SERVICE_PRICES.GET_SUMMARY,
      { params: convertFilterToParams(filter as FilterParams) }
    );
  },
};
