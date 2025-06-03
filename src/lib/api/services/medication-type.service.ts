import type { ApiResponse } from '../types/api';
import {
  CreateUpdateMedicationTypeDto,
  MedicationTypeDto,
  MedicationTypeFilterDto,
  MedicationTypeListDto,
} from '../types/medication-type';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { SelectOption } from '../types/select-option';
import type { PaginationResponse } from '../types/pagination';
import { convertFilterToParams, FilterParams } from '@/utils/filter';

export const medicationTypeService = {
  async getAll(
    filter: MedicationTypeFilterDto
  ): Promise<ApiResponse<PaginationResponse<MedicationTypeListDto>>> {
    return apiClient.get<
      ApiResponse<PaginationResponse<MedicationTypeListDto>>
    >(API_ENDPOINTS.medicationType.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  async getOne(id: string): Promise<ApiResponse<MedicationTypeDto>> {
    return apiClient.get<ApiResponse<MedicationTypeDto>>(
      API_ENDPOINTS.medicationType.GET_ONE.replace(':id', id)
    );
  },

  async create(
    data: CreateUpdateMedicationTypeDto
  ): Promise<ApiResponse<MedicationTypeDto>> {
    return apiClient.post<ApiResponse<MedicationTypeDto>>(
      API_ENDPOINTS.medicationType.CREATE_OR_UPDATE,
      data
    );
  },

  async update(
    data: CreateUpdateMedicationTypeDto
  ): Promise<ApiResponse<MedicationTypeDto>> {
    return apiClient.post<ApiResponse<MedicationTypeDto>>(
      API_ENDPOINTS.medicationType.CREATE_OR_UPDATE,
      data
    );
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.medicationType.DELETE,
      {
        id,
      }
    );
  },

  async getMedicationTypesForDropdown(): Promise<
    ApiResponse<SelectOption<string>[]>
  > {
    return apiClient.get<ApiResponse<SelectOption<string>[]>>(
      API_ENDPOINTS.medicationType.GET_FOR_DROPDOWN
    );
  },
};
