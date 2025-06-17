import { convertFilterToParams, FilterParams } from '@/utils/filter';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { ApiResponse } from '../types/api';
import {
  AppointmentDto,
  AppointmentFilterDto,
  AppointmentListDto,
  CreateUpdateAppointmentDto,
  UpdateAppointmentStatusDto,
} from '../types/appointment';
import { PaginationResponse } from '../types/pagination';

class AppointmentService {
  async getAll(
    filter: AppointmentFilterDto
  ): Promise<ApiResponse<PaginationResponse<AppointmentListDto>>> {
    return apiClient.get(API_ENDPOINTS.APPOINTMENT.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  }

  async getById(id: string): Promise<ApiResponse<AppointmentDto>> {
    return apiClient.get(API_ENDPOINTS.APPOINTMENT.GET_ONE, {
      params: { id },
    });
  }

  async getForEdit(
    id: string
  ): Promise<ApiResponse<CreateUpdateAppointmentDto>> {
    return apiClient.get(API_ENDPOINTS.APPOINTMENT.GET_FOR_EDIT, {
      params: { id },
    });
  }

  async createOrUpdate(
    data: CreateUpdateAppointmentDto
  ): Promise<ApiResponse<AppointmentDto>> {
    return apiClient.post(API_ENDPOINTS.APPOINTMENT.CREATE_OR_UPDATE, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.APPOINTMENT.DELETE, {
      id,
    });
  }

  async updateStatus(
    data: UpdateAppointmentStatusDto
  ): Promise<ApiResponse<void>> {
    return apiClient.put(API_ENDPOINTS.APPOINTMENT.UPDATE_STATUS, data);
  }
}

export const appointmentService = new AppointmentService();
