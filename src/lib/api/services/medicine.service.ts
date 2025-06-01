import type { ApiResponse } from '../types/api';
import type { PaginationResponse } from '../types/pagination';
import {
  CreateUpdateMedicineDto,
  MedicineDto,
  MedicineFilterDto,
  MedicineListDto,
} from '../types/medicine';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams } from '../../../utils/filter';

export const medicineService = {
  async getAll(
    filter: MedicineFilterDto
  ): Promise<ApiResponse<PaginationResponse<MedicineListDto>>> {
    return apiClient.get<ApiResponse<PaginationResponse<MedicineListDto>>>(
      API_ENDPOINTS.medicine.LIST,
      {
        params: convertFilterToParams(filter),
      }
    );
  },

  async getOne(id: string): Promise<ApiResponse<MedicineDto>> {
    return apiClient.get<ApiResponse<MedicineDto>>(
      API_ENDPOINTS.medicine.GET_ONE.replace(':id', id)
    );
  },

  async create(
    data: CreateUpdateMedicineDto
  ): Promise<ApiResponse<MedicineDto>> {
    return apiClient.post<ApiResponse<MedicineDto>>(
      API_ENDPOINTS.medicine.CREATE_OR_UPDATE,
      data
    );
  },

  async update(
    data: CreateUpdateMedicineDto
  ): Promise<ApiResponse<MedicineDto>> {
    return apiClient.post<ApiResponse<MedicineDto>>(
      API_ENDPOINTS.medicine.CREATE_OR_UPDATE,
      data
    );
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.medicine.DELETE, {
      id,
    });
  },
};
