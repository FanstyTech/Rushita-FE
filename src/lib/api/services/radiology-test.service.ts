import { API_ENDPOINTS } from '../config';
import { apiClient } from '../client';
import { convertFilterToParams, FilterParams } from '@/utils/filter';
import type {
  RadiologyTestDto,
  RadiologyTestListDto,
  RadiologyTestFilterDto,
  CreateUpdateRadiologyTestDto,
} from '../types/radiology-test';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import type { SelectOption } from '../types/select-option';

export const radiologyTestService = {
  async getAll(
    filter: RadiologyTestFilterDto
  ): Promise<ApiResponse<PaginationResponse<RadiologyTestListDto>>> {
    return apiClient.get(API_ENDPOINTS.radiologyTest.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  async getById(id: string): Promise<ApiResponse<RadiologyTestDto>> {
    return apiClient.get(
      API_ENDPOINTS.radiologyTest.GET_ONE.replace(':id', id)
    );
  },

  async create(
    data: CreateUpdateRadiologyTestDto
  ): Promise<ApiResponse<RadiologyTestDto>> {
    return apiClient.post(API_ENDPOINTS.radiologyTest.CREATE_OR_UPDATE, data);
  },

  async update(
    data: CreateUpdateRadiologyTestDto
  ): Promise<ApiResponse<RadiologyTestDto>> {
    return apiClient.post(API_ENDPOINTS.radiologyTest.CREATE_OR_UPDATE, data);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.radiologyTest.DELETE, {
      id,
    });
  },

  async getRadiologyTestsForDropdown(): Promise<
    ApiResponse<SelectOption<string>[]>
  > {
    return apiClient.get(API_ENDPOINTS.radiologyTest.GET_FOR_DROPDOWN);
  },
};
