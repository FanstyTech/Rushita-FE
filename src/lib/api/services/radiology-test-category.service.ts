import { API_ENDPOINTS } from '../config';
import { apiClient } from '../client';
import { convertFilterToParams } from '../../../utils/filter';
import type {
  RadiologyTestCategoryDto,
  RadiologyTestCategoryListDto,
  RadiologyTestCategoryFilterDto,
  CreateUpdateRadiologyTestCategoryDto,
} from '../types/radiology-test-category';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import type { SelectOption } from '../types/select-option';

export const radiologyTestCategoryService = {
  async getAll(
    filter: RadiologyTestCategoryFilterDto
  ): Promise<ApiResponse<PaginationResponse<RadiologyTestCategoryListDto>>> {
    return apiClient.get(API_ENDPOINTS.radiologyTestCategory.LIST, {
      params: convertFilterToParams(filter),
    });
  },

  async getById(id: string): Promise<ApiResponse<RadiologyTestCategoryDto>> {
    return apiClient.get(
      API_ENDPOINTS.radiologyTestCategory.GET_ONE.replace(':id', id)
    );
  },

  async create(
    data: CreateUpdateRadiologyTestCategoryDto
  ): Promise<ApiResponse<RadiologyTestCategoryDto>> {
    return apiClient.post(
      API_ENDPOINTS.radiologyTestCategory.CREATE_OR_UPDATE,
      data
    );
  },

  async update(
    data: CreateUpdateRadiologyTestCategoryDto
  ): Promise<ApiResponse<RadiologyTestCategoryDto>> {
    return apiClient.post(
      API_ENDPOINTS.radiologyTestCategory.CREATE_OR_UPDATE,
      data
    );
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.radiologyTestCategory.DELETE, {
      id,
    });
  },

  async getRadiologyTestCategoriesForDropdown(): Promise<
    ApiResponse<SelectOption<string>[]>
  > {
    return apiClient.get(API_ENDPOINTS.radiologyTestCategory.GET_FOR_DROPDOWN);
  },
};
