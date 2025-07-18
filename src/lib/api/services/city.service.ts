import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams, FilterParams } from '@/utils/filter';
import type {
  CityDto,
  CityFilterDto,
  CityListDto,
  CreateUpdateCityDto,
  GetCitiesForDropdownInput,
} from '../types/city';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import { SelectOption } from '../types/select-option';

export const cityService = {
  async getAll(
    filter: CityFilterDto
  ): Promise<ApiResponse<PaginationResponse<CityListDto>>> {
    return apiClient.get(API_ENDPOINTS.city.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  async getById(id: string): Promise<ApiResponse<CityDto>> {
    return apiClient.get(API_ENDPOINTS.city.GET_ONE.replace(':id', id));
  },
  async getCitiesForDropdown(
    filter: GetCitiesForDropdownInput
  ): Promise<ApiResponse<SelectOption<string>[]>> {
    return apiClient.get(API_ENDPOINTS.city.GET_FOR_DROPDOWN, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  async create(city: CreateUpdateCityDto): Promise<ApiResponse<CityDto>> {
    return apiClient.post(API_ENDPOINTS.city.CREATE_OR_UPDATE, city);
  },

  async update(city: CreateUpdateCityDto): Promise<ApiResponse<CityDto>> {
    return apiClient.post(API_ENDPOINTS.city.CREATE_OR_UPDATE, city);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.city.DELETE, {
      id,
    });
  },
};
