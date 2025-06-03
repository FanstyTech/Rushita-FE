import { API_ENDPOINTS } from '../config';
import { apiClient } from '../client';
import type {
  ClinicTypeDto,
  CreateUpdateClinicTypeDto,
  ClinicTypeFilterDto,
  ClinicTypeListDto,
} from '../types/clinic-type';
import { convertFilterToParams, FilterParams } from '@/utils/filter';
import { SelectOption } from '../types/select-option';
import { ApiResponse } from '../types/api';
import { PaginationResponse } from '../types/pagination';

export const clinicTypeService = {
  async getAll(
    filter: ClinicTypeFilterDto
  ): Promise<ApiResponse<PaginationResponse<ClinicTypeListDto>>> {
    return apiClient.get<ApiResponse<PaginationResponse<ClinicTypeListDto>>>(
      API_ENDPOINTS.clinicType.LIST,
      {
        params: convertFilterToParams(filter as FilterParams),
      }
    );
  },

  async create(
    data: CreateUpdateClinicTypeDto
  ): Promise<ApiResponse<ClinicTypeDto>> {
    return apiClient.post<ApiResponse<ClinicTypeDto>>(
      API_ENDPOINTS.clinicType.CREATE_OR_UPDATE,
      data
    );
  },

  async update(
    data: CreateUpdateClinicTypeDto
  ): Promise<ApiResponse<ClinicTypeDto>> {
    return apiClient.post<ApiResponse<ClinicTypeDto>>(
      API_ENDPOINTS.clinicType.CREATE_OR_UPDATE,
      data
    );
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.clinicType.DELETE,
      {
        id,
      }
    );
  },

  async getOne(id: string): Promise<ApiResponse<ClinicTypeDto>> {
    return apiClient.get<ApiResponse<ClinicTypeDto>>(
      API_ENDPOINTS.clinicType.GET_ONE.replace(':id', id)
    );
  },

  async getClinicTypesForDropdown(): Promise<
    ApiResponse<SelectOption<string>[]>
  > {
    return apiClient.get<ApiResponse<SelectOption<string>[]>>(
      API_ENDPOINTS.clinicType.GET_FOR_DROPDOWN
    );
  },
};
