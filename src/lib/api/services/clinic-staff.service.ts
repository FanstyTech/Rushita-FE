import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { ApiResponse } from '../types/api';
import {
  ClinicStaffFilterDto,
  ClinicStaffListDto,
  CreateUpdateClinicStaffDto,
  ClinicStaffDto,
  UpdateClinicStaffStatusDto,
  ChangeStaffPasswordDto,
  GetClinicStaffForDropdownInput,
} from '../types/clinic-staff';
import { convertFilterToParams, FilterParams } from '@/utils/filter';
import { PaginationResponse } from '../types/pagination';
import { SelectOption } from '../types/select-option';

export const clinicStaffService = {
  async getAll(
    filter: ClinicStaffFilterDto
  ): Promise<ApiResponse<PaginationResponse<ClinicStaffListDto>>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_STAFF.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  async getOne(id: string): Promise<ApiResponse<ClinicStaffDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_STAFF.GET_ONE.replace(':id', id));
  },

  async getForEdit(
    id: string
  ): Promise<ApiResponse<CreateUpdateClinicStaffDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_STAFF.GET_FOR_EDIT, {
      params: {
        id: id,
      },
    });
  },
   
  async getDoctordetails(
    id: string
  ): Promise<ApiResponse<ClinicStaffDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_STAFF.GET_BY_ID, {
      params: {
        id: id,
      },
    });
  },
  async getClinicStaffForDropdown(
    filter: GetClinicStaffForDropdownInput
  ): Promise<ApiResponse<SelectOption<string>[]>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_STAFF.GET_FOR_DROPDOWN, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },
  async createOrUpdate(
    data: CreateUpdateClinicStaffDto
  ): Promise<ApiResponse<ClinicStaffDto>> {
    return apiClient.post(API_ENDPOINTS.CLINIC_STAFF.CREATE_OR_UPDATE, data);
  },
  async changeStaffPassword(
    data: ChangeStaffPasswordDto
  ): Promise<ApiResponse<void>> {
    return apiClient.post(API_ENDPOINTS.CLINIC_STAFF.CHANGE_PASSWORD, data);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.CLINIC_STAFF.DELETE, {
      id,
    });
  },

  async updateStatus(data: UpdateClinicStaffStatusDto): Promise<void> {
    await apiClient.put(`${API_ENDPOINTS.CLINIC_STAFF.UPDATE_STATUS}`, data);
  },
};
