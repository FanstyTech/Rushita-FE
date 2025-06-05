import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
  ClinicDto,
  ClinicListDto,
  CreateUpdateClinicDto,
  ClinicFilterDto,
  ClinicStatus,
} from '../types/clinic';
import type { PaginationResponse } from '../types/pagination';
import type { SelectOption } from '../types/select-option';
import type { ApiResponse } from '../types/api';
import { convertFilterToParams, FilterParams } from '@/utils/filter';

class ClinicService {
  async getAll(
    filter: ClinicFilterDto
  ): Promise<ApiResponse<PaginationResponse<ClinicListDto>>> {
    return apiClient.get(API_ENDPOINTS.CLINIC.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  }

  async createOrUpdate(
    data: CreateUpdateClinicDto & { id?: string }
  ): Promise<ClinicDto> {
    const response = await apiClient.post<ClinicDto>(
      API_ENDPOINTS.CLINIC.CREATE_OR_UPDATE,
      data
    );
    return response;
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.CLINIC.DELETE, {
      id,
    });
  }

  async getOne(id: string): Promise<ClinicDto> {
    const response = await apiClient.get<ClinicDto>(
      `${API_ENDPOINTS.CLINIC.GET_ONE}`,
      {
        params: {
          id: id,
        },
      }
    );
    return response;
  }

  async getForEdit(id: string): Promise<ApiResponse<CreateUpdateClinicDto>> {
    const response = await apiClient.get<ApiResponse<CreateUpdateClinicDto>>(
      `${API_ENDPOINTS.CLINIC.GET_FOR_EDIT}`,
      {
        params: {
          id: id,
        },
      }
    );
    return response;
  }

  async getForDropdown(): Promise<SelectOption<string>[]> {
    const response = await apiClient.get<SelectOption<string>[]>(
      API_ENDPOINTS.CLINIC.GET_FOR_DROPDOWN
    );
    return response;
  }

  async uploadImage(file: File): Promise<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file);
    const response = await apiClient.post<{ imageUrl: string }>(
      API_ENDPOINTS.CLINIC.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response;
  }

  async updateStatus(
    id: string,
    status: ClinicStatus,
    reason?: string
  ): Promise<void> {
    await apiClient.put(`${API_ENDPOINTS.CLINIC.UPDATE_STATUS}`, {
      id,
      status,
      reason,
    });
  }

  async updateLocation(
    id: string,
    latitude: number,
    longitude: number
  ): Promise<void> {
    await apiClient.put(`${API_ENDPOINTS.CLINIC.UPDATE_LOCATION}/${id}`, {
      latitude,
      longitude,
    });
  }

  //   async getDoctors(clinicId: string): Promise<any[]> {
  //     const response = await apiClient.get<ApiResponse<any[]>>(
  //       `${API_ENDPOINTS.CLINIC.GET_DOCTORS}/${clinicId}`
  //     );
  //     return response;
  //   }

  //   async getPatients(clinicId: string): Promise<any[]> {
  //     const response = await apiClient.get<ApiResponse<any[]>>(
  //       `${API_ENDPOINTS.CLINIC.GET_PATIENTS}/${clinicId}`
  //     );
  //     return response.data;
  //   }
}

export const clinicService = new ClinicService();
