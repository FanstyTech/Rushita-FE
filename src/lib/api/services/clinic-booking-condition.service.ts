import {
  ClinicBookingConditionDto,
  CreateUpdateClinicBookingConditionDto,
  ClinicBookingConditionListDto,
  ClinicBookingConditionFilterDto,
  ClinicBookingConditionSelectOption,
  UpdateClinicBookingConditionStatusDto,
  ClinicBookingConditionDropdownFilterDto, // إضافة النوع الجديد
} from '../types/clinic-booking-condition';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams, FilterParams } from '@/utils/filter';

class ClinicBookingConditionService {
  // Get paginated list
  async getAll(
    filter: ClinicBookingConditionFilterDto
  ): Promise<ApiResponse<PaginationResponse<ClinicBookingConditionListDto>>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_BOOKING_CONDITION.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  }

  // Get single condition by ID
  async getById(id: string): Promise<ApiResponse<ClinicBookingConditionDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_BOOKING_CONDITION.GET_ONE, {
      params: { id },
    });
  }

  // Get conditions by clinic ID
  async getByClinicId(clinicId: string): Promise<ApiResponse<ClinicBookingConditionDto[]>> {
    return apiClient.get(`${API_ENDPOINTS.CLINIC_BOOKING_CONDITION.GET_BY_CLINIC_ID}/${clinicId}`);
  }

  // Get condition for edit
  async getForEdit(id: string): Promise<ApiResponse<CreateUpdateClinicBookingConditionDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_BOOKING_CONDITION.GET_FOR_EDIT, {
      params: { id },
    });
  }

  // Create new condition
  async create(data: CreateUpdateClinicBookingConditionDto): Promise<ApiResponse<ClinicBookingConditionDto>> {
    return apiClient.post(API_ENDPOINTS.CLINIC_BOOKING_CONDITION.CREATE_OR_UPDATE, data);
  }

  // Update existing condition
  async update(data: CreateUpdateClinicBookingConditionDto): Promise<ApiResponse<ClinicBookingConditionDto>> {
    return apiClient.post(API_ENDPOINTS.CLINIC_BOOKING_CONDITION.CREATE_OR_UPDATE, data);
  }

  // Create or update (handles both cases)
  async createOrUpdate(data: CreateUpdateClinicBookingConditionDto): Promise<ApiResponse<ClinicBookingConditionDto>> {
    return apiClient.post(API_ENDPOINTS.CLINIC_BOOKING_CONDITION.CREATE_OR_UPDATE, data);
  }

  // Delete condition
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.post(API_ENDPOINTS.CLINIC_BOOKING_CONDITION.DELETE, {
      id,
    });
  }

  // Get dropdown options with filter
  async getForDropdown(
    filter?: ClinicBookingConditionDropdownFilterDto
  ): Promise<ApiResponse<ClinicBookingConditionSelectOption[]>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_BOOKING_CONDITION.GET_FOR_DROPDOWN, {
      params: filter ? convertFilterToParams(filter as FilterParams) : undefined,
    });
  }

  // Update condition status
  async updateStatus(data: UpdateClinicBookingConditionStatusDto): Promise<ApiResponse<void>> {
    return apiClient.put(API_ENDPOINTS.CLINIC_BOOKING_CONDITION.UPDATE_STATUS, data);
  }
}

export const clinicBookingConditionService = new ClinicBookingConditionService();
