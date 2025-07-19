import { apiClient } from '../client';
import { VISIT_ENDPOINTS } from '../config/visit.endpoints';
import type { ApiResponse } from '../types/api';
import type { PaginationResponse } from '../types/pagination';
import type {
  VisitDto,
  VisitListDto,
  VisitFilterDto,
  CreateVisitDto,
  UpdateVisitDto,
  VisitStatus,
  VisitDiagnosisDto,
  VisitPrescriptionDto,
  VisitLabTestDto,
  VisitRadiologyTestDto,
  VisitDentalProcedureDto,
  VisitStatusHistoryDto,
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
    return apiClient.get(VISIT_ENDPOINTS.LIST, {
      params: convertFilterToParams(filter),
    });
  },

  // Get single visit by ID
  async getById(id: string): Promise<ApiResponse<VisitDto>> {
    return apiClient.get(VISIT_ENDPOINTS.GET_BY_ID.replace(':id', id));
  },

  // Create new visit
  async create(data: CreateVisitDto): Promise<ApiResponse<VisitDto>> {
    return apiClient.post(VISIT_ENDPOINTS.CREATE, data);
  },

  // Update existing visit
  async update(id: string, data: UpdateVisitDto): Promise<ApiResponse<VisitDto>> {
    return apiClient.put(VISIT_ENDPOINTS.UPDATE.replace(':id', id), data);
  },

  // Delete visit
  async delete(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(VISIT_ENDPOINTS.DELETE.replace(':id', id));
  },

  // Update visit status
  async updateStatus(id: string, status: VisitStatus, notes?: string): Promise<ApiResponse<VisitDto>> {
    return apiClient.put(VISIT_ENDPOINTS.UPDATE_STATUS.replace(':id', id), {
      status,
      notes,
    });
  },

  // Get visit status history
  async getStatusHistory(visitId: string): Promise<ApiResponse<VisitStatusHistoryDto[]>> {
    return apiClient.get(VISIT_ENDPOINTS.GET_STATUS_HISTORY.replace(':id', visitId));
  },

  // Get visit diagnoses
  async getDiagnoses(visitId: string): Promise<ApiResponse<VisitDiagnosisDto[]>> {
    return apiClient.get(VISIT_ENDPOINTS.GET_DIAGNOSES.replace(':id', visitId));
  },

  // Get visit prescriptions
  async getPrescriptions(visitId: string): Promise<ApiResponse<VisitPrescriptionDto[]>> {
    return apiClient.get(VISIT_ENDPOINTS.GET_PRESCRIPTIONS.replace(':id', visitId));
  },

  // Get visit lab tests
  async getLabTests(visitId: string): Promise<ApiResponse<VisitLabTestDto[]>> {
    return apiClient.get(VISIT_ENDPOINTS.GET_LAB_TESTS.replace(':id', visitId));
  },

  // Get visit radiology tests
  async getRadiologyTests(visitId: string): Promise<ApiResponse<VisitRadiologyTestDto[]>> {
    return apiClient.get(VISIT_ENDPOINTS.GET_RADIOLOGY_TESTS.replace(':id', visitId));
  },

  // Get visit dental procedures
  async getDentalProcedures(visitId: string): Promise<ApiResponse<VisitDentalProcedureDto[]>> {
    return apiClient.get(VISIT_ENDPOINTS.GET_DENTAL_PROCEDURES.replace(':id', visitId));
  },
};
