import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import {
  CreateUpdateDiagnosisDto,
  DiagnosisDto,
  DiagnosisFilterDto,
  DiagnosisListDto,
} from '../types/diagnosis';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams } from '../../../utils/filter';

export const diagnosisService = {
  async getAll(
    filter: DiagnosisFilterDto
  ): Promise<ApiResponse<PaginationResponse<DiagnosisListDto>>> {
    return apiClient.get<ApiResponse<PaginationResponse<DiagnosisListDto>>>(
      API_ENDPOINTS.diagnosis.LIST,
      {
        params: convertFilterToParams(filter),
      }
    );
  },

  async getOne(id: string): Promise<ApiResponse<DiagnosisDto>> {
    return apiClient.get<ApiResponse<DiagnosisDto>>(
      API_ENDPOINTS.diagnosis.GET_ONE.replace(':id', id)
    );
  },

  async create(
    data: CreateUpdateDiagnosisDto
  ): Promise<ApiResponse<DiagnosisDto>> {
    return apiClient.post<ApiResponse<DiagnosisDto>>(
      API_ENDPOINTS.diagnosis.CREATE_OR_UPDATE,
      data
    );
  },

  async update(
    data: CreateUpdateDiagnosisDto
  ): Promise<ApiResponse<DiagnosisDto>> {
    return apiClient.post<ApiResponse<DiagnosisDto>>(
      API_ENDPOINTS.diagnosis.CREATE_OR_UPDATE,
      data
    );
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.diagnosis.DELETE, {
      id,
    });
  },
};
