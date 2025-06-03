import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import {
  CreateUpdateDiagnosisCategoryDto,
  DiagnosisCategoryDto,
  DiagnosisCategoryFilterDto,
  DiagnosisCategoryListDto,
} from '../types/diagnosis-category';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams, FilterParams } from '@/utils/filter';
import { SelectOption } from '../types/select-option';

export const diagnosisCategoryService = {
  async getAll(
    filter: DiagnosisCategoryFilterDto
  ): Promise<ApiResponse<PaginationResponse<DiagnosisCategoryListDto>>> {
    return apiClient.get<
      ApiResponse<PaginationResponse<DiagnosisCategoryListDto>>
    >(API_ENDPOINTS.diagnosisCategory.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  async getOne(id: string): Promise<ApiResponse<DiagnosisCategoryDto>> {
    return apiClient.get<ApiResponse<DiagnosisCategoryDto>>(
      API_ENDPOINTS.diagnosisCategory.GET_ONE.replace(':id', id)
    );
  },

  async create(
    data: CreateUpdateDiagnosisCategoryDto
  ): Promise<ApiResponse<DiagnosisCategoryDto>> {
    return apiClient.post<ApiResponse<DiagnosisCategoryDto>>(
      API_ENDPOINTS.diagnosisCategory.CREATE_OR_UPDATE,
      data
    );
  },

  async update(
    data: CreateUpdateDiagnosisCategoryDto
  ): Promise<ApiResponse<DiagnosisCategoryDto>> {
    return apiClient.post<ApiResponse<DiagnosisCategoryDto>>(
      API_ENDPOINTS.diagnosisCategory.CREATE_OR_UPDATE,
      data
    );
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.diagnosisCategory.DELETE,
      {
        id,
      }
    );
  },

  async getDiagnosisCategoriesForDropdown(): Promise<
    ApiResponse<SelectOption<string>[]>
  > {
    return apiClient.get<ApiResponse<SelectOption<string>[]>>(
      API_ENDPOINTS.diagnosisCategory.GET_FOR_DROPDOWN
    );
  },
};
