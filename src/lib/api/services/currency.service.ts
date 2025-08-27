import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams, FilterParams } from '@/utils/filter';
import type {
  CurrencyDto,
  CurrencyFilterDto,
  CurrencyListDto,
  CreateUpdateCurrencyDto,
} from '../types/currency';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import { SelectOption } from '../types/select-option';

export const currencyService = {
  async getAll(
    filter: CurrencyFilterDto
  ): Promise<ApiResponse<PaginationResponse<CurrencyListDto>>> {
    return apiClient.get(API_ENDPOINTS.CURRENCY.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  async getById(id: string): Promise<ApiResponse<CurrencyDto>> {
    return apiClient.get(API_ENDPOINTS.CURRENCY.GET_ONE, { params: { id } });
  },

  async getCurrenciesForDropdown(): Promise<
    ApiResponse<SelectOption<string>[]>
  > {
    return apiClient.get(API_ENDPOINTS.CURRENCY.GET_FOR_DROPDOWN);
  },

  async getDefaultCurrency(): Promise<ApiResponse<CurrencyDto>> {
    return apiClient.get(API_ENDPOINTS.CURRENCY.GET_DEFAULT);
  },

  async setDefaultCurrency(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.post(API_ENDPOINTS.CURRENCY.SET_DEFAULT, {
      id,
    });
  },

  async create(
    currency: CreateUpdateCurrencyDto
  ): Promise<ApiResponse<CurrencyDto>> {
    return apiClient.post(API_ENDPOINTS.CURRENCY.CREATE_OR_UPDATE, currency);
  },

  async update(
    currency: CreateUpdateCurrencyDto
  ): Promise<ApiResponse<CurrencyDto>> {
    return apiClient.post(API_ENDPOINTS.CURRENCY.CREATE_OR_UPDATE, currency);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.CURRENCY.DELETE, {
      id,
    });
  },
};
