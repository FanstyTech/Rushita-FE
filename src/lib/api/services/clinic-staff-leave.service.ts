import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams, FilterParams } from '@/utils/filter';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import {
  ClinicStaffLeaveDto,
  ClinicStaffLeaveFilterDto,
  CreateUpdateClinicStaffLeaveDto,
  UpdateClinicStaffLeaveStatusDto,
} from '../types/clinic-staff-leave';

export const clinicStaffLeaveService = {
  async getAll(
    filter: ClinicStaffLeaveFilterDto
  ): Promise<ApiResponse<PaginationResponse<ClinicStaffLeaveDto>>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_STAFF_LEAVES.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  async getById(id: string): Promise<ApiResponse<ClinicStaffLeaveDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_STAFF_LEAVES.GET_ONE, {
      params: {
        id: id,
      },
    });
  },

  async getForEdit(
    id: string
  ): Promise<ApiResponse<CreateUpdateClinicStaffLeaveDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_STAFF_LEAVES.GET_FOR_EDIT, {
      params: {
        id: id,
      },
    });
  },

  async createOrUpdate(
    data: CreateUpdateClinicStaffLeaveDto
  ): Promise<ApiResponse<ClinicStaffLeaveDto>> {
    return apiClient.post(
      API_ENDPOINTS.CLINIC_STAFF_LEAVES.CREATE_OR_UPDATE,
      data
    );
  },

  async updateStatus(
    data: UpdateClinicStaffLeaveStatusDto
  ): Promise<ApiResponse<ClinicStaffLeaveDto>> {
    return apiClient.put(API_ENDPOINTS.CLINIC_STAFF_LEAVES.UPDATE_STATUS, data);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.CLINIC_STAFF_LEAVES.DELETE, {
      id,
    });
  },
};
