import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import {
  CreateUpdateLabTestCategoryDto,
  LabTestCategoryDto,
  LabTestCategoryFilterDto,
  LabTestCategoryListDto,
} from '../types/lab-test-category';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams } from '../../../utils/filter';
import { SelectOption } from '../types/select-option';

export const labTestCategoryService = {
  async getAll(
    filter: LabTestCategoryFilterDto
  ): Promise<ApiResponse<PaginationResponse<LabTestCategoryListDto>>> {
    return apiClient.get<
      ApiResponse<PaginationResponse<LabTestCategoryListDto>>
    >(API_ENDPOINTS.labTestCategory.LIST, {
      params: convertFilterToParams(filter),
    });
  },

  async getOne(id: string): Promise<ApiResponse<LabTestCategoryDto>> {
    return apiClient.get<ApiResponse<LabTestCategoryDto>>(
      API_ENDPOINTS.labTestCategory.GET_ONE.replace(':id', id)
    );
  },

  async create(
    data: CreateUpdateLabTestCategoryDto
  ): Promise<ApiResponse<LabTestCategoryDto>> {
    return apiClient.post<ApiResponse<LabTestCategoryDto>>(
      API_ENDPOINTS.labTestCategory.CREATE_OR_UPDATE,
      data
    );
  },

  async update(
    data: CreateUpdateLabTestCategoryDto
  ): Promise<ApiResponse<LabTestCategoryDto>> {
    return apiClient.post<ApiResponse<LabTestCategoryDto>>(
      API_ENDPOINTS.labTestCategory.CREATE_OR_UPDATE,
      data
    );
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.labTestCategory.DELETE,
      {
        id,
      }
    );
  },

  async getLabTestCategoriesForDropdown(): Promise<
    ApiResponse<SelectOption<string>[]>
  > {
    return apiClient.get<ApiResponse<SelectOption<string>[]>>(
      API_ENDPOINTS.labTestCategory.GET_FOR_DROPDOWN
    );
  },
};
