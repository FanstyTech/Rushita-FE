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

const convertFilterToParams = (
  filter: SpecialtyFilterDto
): Record<string, string> => {
  const params: Record<string, string> = {};
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params[key] = String(value);
    }
  });
  return params;
};

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
