import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import {
  CreateUpdateLabTestDto,
  LabTestDto,
  LabTestFilterDto,
  LabTestListDto,
} from '../types/lab-test';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams } from '../../../utils/filter';

export const labTestService = {
  async getAll(
    filter: LabTestFilterDto
  ): Promise<ApiResponse<PaginationResponse<LabTestListDto>>> {
    return apiClient.get<ApiResponse<PaginationResponse<LabTestListDto>>>(
      API_ENDPOINTS.labTest.LIST,
      {
        params: convertFilterToParams(filter),
      }
    );
  },

  async getOne(id: string): Promise<ApiResponse<LabTestDto>> {
    return apiClient.get<ApiResponse<LabTestDto>>(
      API_ENDPOINTS.labTest.GET_ONE.replace(':id', id)
    );
  },

  async create(data: CreateUpdateLabTestDto): Promise<ApiResponse<LabTestDto>> {
    return apiClient.post<ApiResponse<LabTestDto>>(
      API_ENDPOINTS.labTest.CREATE_OR_UPDATE,
      data
    );
  },

  async update(data: CreateUpdateLabTestDto): Promise<ApiResponse<LabTestDto>> {
    return apiClient.post<ApiResponse<LabTestDto>>(
      API_ENDPOINTS.labTest.CREATE_OR_UPDATE,
      data
    );
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.labTest.DELETE, {
      id,
    });
  },
};
