import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import {
  CreateUpdateDentalProcedureDto,
  DentalProcedureDto,
  DentalProcedureFilterDto,
  DentalProcedureListDto,
} from '../types/dental-procedure';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams } from '../../../utils/filter';

export const dentalProcedureService = {
  async getAll(
    filter: DentalProcedureFilterDto
  ): Promise<ApiResponse<PaginationResponse<DentalProcedureListDto>>> {
    return apiClient.get<
      ApiResponse<PaginationResponse<DentalProcedureListDto>>
    >(API_ENDPOINTS.dentalProcedure.LIST, {
      params: convertFilterToParams(filter),
    });
  },

  async getOne(id: string): Promise<ApiResponse<DentalProcedureDto>> {
    return apiClient.get<ApiResponse<DentalProcedureDto>>(
      API_ENDPOINTS.dentalProcedure.GET_ONE.replace(':id', id)
    );
  },

  async create(
    data: CreateUpdateDentalProcedureDto
  ): Promise<ApiResponse<DentalProcedureDto>> {
    return apiClient.post<ApiResponse<DentalProcedureDto>>(
      API_ENDPOINTS.dentalProcedure.CREATE_OR_UPDATE,
      data
    );
  },

  async update(
    data: CreateUpdateDentalProcedureDto
  ): Promise<ApiResponse<DentalProcedureDto>> {
    return apiClient.post<ApiResponse<DentalProcedureDto>>(
      API_ENDPOINTS.dentalProcedure.CREATE_OR_UPDATE,
      data
    );
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.dentalProcedure.DELETE,
      {
        id,
      }
    );
  },
};
