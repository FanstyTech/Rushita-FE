import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { ApiResponse } from '../types/api';
import type { PaginationResponse } from '../types/pagination';
import type {
  VisitDto,
  VisitListDto,
  VisitFilterDto,
  VisitStatus,
  VisitDiagnosisDto,
  VisitPrescriptionDto,
  VisitLabTestDto,
  VisitRadiologyTestDto,
  VisitDentalProcedureDto,
  VisitStatusHistoryDto,
  CreateOrUpdateVisitDto,
} from '../types/treatment';

// Helper function to convert filter to query parameters
const convertFilterToParams = (
  filter: VisitFilterDto
): Record<string, string> => {
  const params: Record<string, string> = {};

  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params[key] = String(value);
    }
  });

  return params;
};

export const visitService = {
  // Get paginated list of visits
  async getAll(
    filter: VisitFilterDto
  ): Promise<ApiResponse<PaginationResponse<VisitListDto>>> {
    return apiClient.get(API_ENDPOINTS.VISIT_ENDPOINTS.LIST, {
      params: convertFilterToParams(filter),
    });
  },

  // Get single visit by ID
  async getById(id: string): Promise<ApiResponse<VisitDto>> {
    return apiClient.get(API_ENDPOINTS.VISIT_ENDPOINTS.GET_ONE, {
      params: { id },
    });
  },

  // Get single visit by ID
  async getVisitForEdit(
    id: string
  ): Promise<ApiResponse<CreateOrUpdateVisitDto>> {
    return apiClient.get(API_ENDPOINTS.VISIT_ENDPOINTS.GET_FOR_EDIT, {
      params: { id },
    });
  },

  // Create new or update existing visit
  async createOrUpdate(
    data: CreateOrUpdateVisitDto
  ): Promise<ApiResponse<VisitDto>> {
    return apiClient.post(API_ENDPOINTS.VISIT_ENDPOINTS.CREATE_OR_UPDATE, data);
  },

  // Delete visit
  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(
      API_ENDPOINTS.VISIT_ENDPOINTS.DELETE.replace(':id', id)
    );
  },

  // Update visit status
  async updateStatus(
    id: string,
    status: VisitStatus,
    notes?: string
  ): Promise<ApiResponse<VisitDto>> {
    return apiClient.put(
      API_ENDPOINTS.VISIT_ENDPOINTS.UPDATE_STATUS.replace(':id', id),
      {
        status,
        notes,
      }
    );
  },

  // Get visit status history
  async getStatusHistory(
    visitId: string
  ): Promise<ApiResponse<VisitStatusHistoryDto[]>> {
    return apiClient.get(
      API_ENDPOINTS.VISIT_ENDPOINTS.GET_STATUS_HISTORY.replace(':id', visitId)
    );
  },

  // Get visit diagnoses
  async getDiagnoses(
    visitId: string
  ): Promise<ApiResponse<VisitDiagnosisDto[]>> {
    return apiClient.get(
      API_ENDPOINTS.VISIT_ENDPOINTS.GET_DIAGNOSES.replace(':id', visitId)
    );
  },

  // Get visit prescriptions
  async getPrescriptions(
    visitId: string
  ): Promise<ApiResponse<VisitPrescriptionDto[]>> {
    return apiClient.get(
      API_ENDPOINTS.VISIT_ENDPOINTS.GET_PRESCRIPTIONS.replace(':id', visitId)
    );
  },

  // Get visit lab tests
  async getLabTests(visitId: string): Promise<ApiResponse<VisitLabTestDto[]>> {
    return apiClient.get(
      API_ENDPOINTS.VISIT_ENDPOINTS.GET_LAB_TESTS.replace(':id', visitId)
    );
  },

  // Get visit radiology tests
  async getRadiologyTests(
    visitId: string
  ): Promise<ApiResponse<VisitRadiologyTestDto[]>> {
    return apiClient.get(
      API_ENDPOINTS.VISIT_ENDPOINTS.GET_RADIOLOGY_TESTS.replace(':id', visitId)
    );
  },

  // Get visit dental procedures
  async getDentalProcedures(
    visitId: string
  ): Promise<ApiResponse<VisitDentalProcedureDto[]>> {
    return apiClient.get(
      API_ENDPOINTS.VISIT_ENDPOINTS.GET_DENTAL_PROCEDURES.replace(
        ':id',
        visitId
      )
    );
  },
};
