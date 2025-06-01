import {
  SpecialtyDto,
  CreateUpdateSpecialtyDto,
  SpecialtyListDto,
  SpecialtyFilterDto,
} from '../types/specialty';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams } from '../../../utils/filter';
import { SelectOption } from '../types/select-option';

export const specialtyService = {
  async getAll(
    filter: SpecialtyFilterDto
  ): Promise<ApiResponse<PaginationResponse<SpecialtyListDto>>> {
    return apiClient.get<ApiResponse<PaginationResponse<SpecialtyListDto>>>(
      API_ENDPOINTS.specialty.LIST,
      { params: convertFilterToParams(filter) }
    );
  },

  async getById(id: string): Promise<ApiResponse<SpecialtyDto>> {
    return apiClient.get<ApiResponse<SpecialtyDto>>(
      API_ENDPOINTS.specialty.GET_ONE.replace(':id', id)
    );
  },

  async getRadiologyTestsForDropdown(): Promise<
    ApiResponse<SelectOption<string>[]>
  > {
    return apiClient.get<ApiResponse<SelectOption<string>[]>>(
      API_ENDPOINTS.specialty.GET_FOR_DROPDOWN
    );
  },

  async create(
    data: CreateUpdateSpecialtyDto
  ): Promise<ApiResponse<SpecialtyDto>> {
    return apiClient.post<ApiResponse<SpecialtyDto>>(
      API_ENDPOINTS.specialty.CREATE_OR_UPDATE,
      data
    );
  },

  async update(
    data: CreateUpdateSpecialtyDto
  ): Promise<ApiResponse<SpecialtyDto>> {
    return apiClient.post<ApiResponse<SpecialtyDto>>(
      API_ENDPOINTS.specialty.CREATE_OR_UPDATE,
      data
    );
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.specialty.DELETE, {
      id,
    });
  },
};
