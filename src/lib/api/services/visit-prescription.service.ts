import {
  VisitPrescriptionDto,
  CreateUpdateVisitPrescriptionDto,
  VisitPrescriptionListDto,
  VisitPrescriptionFilterDto,
  PrescribedMedicationItemDto,
  UpdatePrescriptionStatusDto,
  DispenseMedicineDto,
} from '../types/visit-prescription';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { convertFilterToParams, FilterParams } from '@/utils/filter';

export const visitPrescriptionService = {
  // Get paginated list
  async getAll(
    filter: VisitPrescriptionFilterDto
  ): Promise<ApiResponse<PaginationResponse<VisitPrescriptionListDto>>> {
    return apiClient.get(API_ENDPOINTS.visitPrescription.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  },

  // Get single visit prescription by ID
  async getById(id: string): Promise<ApiResponse<VisitPrescriptionDto>> {
    return apiClient.get(
      API_ENDPOINTS.visitPrescription.GET_ONE.replace(':id', id)
    );
  },

  // Create new visit prescription
  async create(
    data: CreateUpdateVisitPrescriptionDto
  ): Promise<ApiResponse<VisitPrescriptionDto>> {
    return apiClient.post(
      API_ENDPOINTS.visitPrescription.CREATE_OR_UPDATE,
      data
    );
  },

  // Update existing visit prescription
  async update(
    data: CreateUpdateVisitPrescriptionDto
  ): Promise<ApiResponse<VisitPrescriptionDto>> {
    return apiClient.post(
      API_ENDPOINTS.visitPrescription.CREATE_OR_UPDATE,
      data
    );
  },

  // Create or update (handles both cases)
  async createOrUpdate(
    data: CreateUpdateVisitPrescriptionDto
  ): Promise<ApiResponse<VisitPrescriptionDto>> {
    return apiClient.post(
      API_ENDPOINTS.visitPrescription.CREATE_OR_UPDATE,
      data
    );
  },

  // Delete visit prescription
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.visitPrescription.DELETE, {
      params: { id },
    });
  },

  // Get visit prescriptions by visit ID
  async getByVisitId(
    visitId: string
  ): Promise<ApiResponse<VisitPrescriptionDto[]>> {
    return apiClient.get(API_ENDPOINTS.visitPrescription.GET_BY_VISIT_ID, {
      params: { visitId },
    });
  },

  // Update prescription status
  async updateStatus(
    data: UpdatePrescriptionStatusDto
  ): Promise<ApiResponse<VisitPrescriptionDto>> {
    return apiClient.put(API_ENDPOINTS.visitPrescription.UPDATE_STATUS, data);
  },

  // Dispense medicine
  async dispenseMedicine(
    data: DispenseMedicineDto
  ): Promise<ApiResponse<VisitPrescriptionDto>> {
    return apiClient.post(
      API_ENDPOINTS.visitPrescription.DISPENSE_MEDICINE,
      data
    );
  },

  // Get prescribed medications by visit ID
  async getPrescribedMedicationsByVisitId(
    id: string
  ): Promise<ApiResponse<PrescribedMedicationItemDto[]>> {
    return apiClient.get(
      API_ENDPOINTS.visitPrescription.GET_PRESCRIBED_MEDICATIONS,
      {
        params: { id },
      }
    );
  },
};
