import {
  CountryDto,
  CreateUpdateCountryDto,
  CountryListDto,
  CountryFilterDto,
} from '../types/country';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

const convertFilterToParams = (
  filter: CountryFilterDto
): Record<string, string> => {
  const params: Record<string, string> = {};
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params[key] = String(value);
    }
  });
  return params;
};

export const countryService = {
  async getAll(
    filter: CountryFilterDto
  ): Promise<ApiResponse<PaginationResponse<CountryListDto>>> {
    return apiClient.get(API_ENDPOINTS.country.LIST, {
      params: convertFilterToParams(filter),
    });
  },

  async getById(id: string): Promise<ApiResponse<CountryDto>> {
    return apiClient.get(API_ENDPOINTS.country.GET_ONE.replace(':id', id));
  },

  async create(data: CreateUpdateCountryDto): Promise<ApiResponse<CountryDto>> {
    return apiClient.post(API_ENDPOINTS.country.CREATE_OR_UPDATE, data);
  },

  async update(data: CreateUpdateCountryDto): Promise<ApiResponse<CountryDto>> {
    return apiClient.post(API_ENDPOINTS.country.CREATE_OR_UPDATE, data);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.country.DELETE, {
      params: { id },
    });
  },
};
