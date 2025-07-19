import { convertFilterToParams, FilterParams } from '@/utils/filter';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { ApiResponse } from '../types/api';
import {
  AppointmentDto,
  AppointmentFilterDto,
  AppointmentListDto,
  CreateUpdateAppointmentDto,
  GetAppointmentForEditDto,
  UpdateAppointmentStatusDto,
} from '../types/appointment';
import { PaginationResponse } from '../types/pagination';
import { formatAppointmentDateTime } from '@/utils/dateTimeUtils';

// Helper function to convert date and time for API submission
const convertDateTimeForSubmission = (data: CreateUpdateAppointmentDto): CreateUpdateAppointmentDto => {
  const { date, startTime, endTime } = formatAppointmentDateTime(
    data.date,
    data.startTime,
    data.endTime
  );
  
  return {
    ...data,
    date,
    startTime,
    endTime,
  };
};

class AppointmentService {
  async getAll(
    filter: AppointmentFilterDto
  ): Promise<ApiResponse<PaginationResponse<AppointmentListDto>>> {
    // Convert date to ISO string if provided for filtering
    const convertedFilter = {
      ...filter,
      date: filter.date ? new Date(filter.date).toISOString() : undefined,
    };
    
    return apiClient.get(API_ENDPOINTS.APPOINTMENT.LIST, {
      params: convertFilterToParams(convertedFilter as FilterParams),
    });
  }

  async getById(id: string): Promise<ApiResponse<AppointmentDto>> {
    return apiClient.get(API_ENDPOINTS.APPOINTMENT.GET_ONE, {
      params: { id },
    });
  }

  async getForEdit(
    id: string
  ): Promise<ApiResponse<GetAppointmentForEditDto>> {
    return apiClient.get(API_ENDPOINTS.APPOINTMENT.GET_FOR_EDIT, {
      params: { id },
    });
  }

  async createOrUpdate(
    data: CreateUpdateAppointmentDto
  ): Promise<ApiResponse<AppointmentDto>> {
    const convertedData = convertDateTimeForSubmission(data);
    return apiClient.post(API_ENDPOINTS.APPOINTMENT.CREATE_OR_UPDATE, convertedData);
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
