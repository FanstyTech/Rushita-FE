import {
  CountryDto,
  CreateUpdateCountryDto,
  CountryListDto,
  CountryFilterDto,
} from '../types/country';
import type { SelectOption } from '../types/select-option';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams } from '../../../utils/filter';

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

  async getCountryForDropdown(): Promise<ApiResponse<SelectOption<string>[]>> {
    // Assuming there's an endpoint for fetching countries for dropdown
    return apiClient.get(API_ENDPOINTS.country.GET_COUNTRY_FOR_DROPDOWN);
  },

  async create(data: CreateUpdateCountryDto): Promise<ApiResponse<CountryDto>> {
    return apiClient.post(API_ENDPOINTS.country.CREATE_OR_UPDATE, data);
  },

  async update(data: CreateUpdateCountryDto): Promise<ApiResponse<CountryDto>> {
    return apiClient.post(API_ENDPOINTS.country.CREATE_OR_UPDATE, data);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.country.DELETE, {
      id,
    });
  },
};
