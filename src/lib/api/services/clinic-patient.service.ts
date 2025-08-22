import { convertFilterToParams, FilterParams } from '@/utils/filter';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { ApiResponse } from '../types/api';
import {
  AllergyDto,
  ClinicPatientDto,
  ClinicPatientFilterDto,
  ClinicPatientListDto,
  CreateOrUpdateAllergyDto,
  CreateOrUpdateEmergencyContactDto,
  CreateOrUpdateFamilyHistoryDto,
  CreateOrUpdateMedicalConditionDto,
  CreateUpdateClinicPatientDto,
  EmergencyContactDto,
  FamilyHistoryDto,
  GetPatientDropdownInput,
  GetPatientForViewDto,
  MedicalConditionDto,
  PatientAppointmentFilterDto,
  PatientHealthMetricDto,
  PatientPortalAppointmentsDto,
  PatientPortalDashboardDto,
  PatientPortalPrescriptionsDto,
  PatientPortalProfileDto,
  PatientPortalVisitsDto,
  PatientPrescriptionFilterDto,
  PatientProfileDto,
  PatientStatus,
  PatientVisitFilterDto,
  UpdatePatientAppointmentDto,
  UpdatePatientHealthMetricDto,
  UpdatePatientPrescriptionDto,
  UpdatePatientPortalProfileDto,
  SavePatientAppointmentDto,
  BookFollowUpAppointmentDto,
} from '../types/clinic-patient';
import { PaginationResponse } from '../types/pagination';
import { SelectOption } from '../types/select-option';

class ClinicPatientService {
  async getAll(
    filter: ClinicPatientFilterDto
  ): Promise<ApiResponse<PaginationResponse<ClinicPatientListDto>>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.LIST, {
      params: convertFilterToParams(filter as FilterParams),
    });
  }

  async getById(id: string): Promise<ApiResponse<ClinicPatientDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_ONE, {
      params: { id },
    });
  }

  async getForEdit(
    id: string
  ): Promise<ApiResponse<CreateUpdateClinicPatientDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_FOR_EDIT, {
      params: { id },
    });
  }
  async getForView(id: string): Promise<ApiResponse<GetPatientForViewDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_FOR_VIEW, {
      params: { id },
    });
  }

  async getPatientDropdown(
    filter: GetPatientDropdownInput
  ): Promise<ApiResponse<SelectOption<string>[]>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_PATIENT_DROPDOWN, {
      params: convertFilterToParams(filter as FilterParams),
    });
  }

  async createOrUpdate(
    data: CreateUpdateClinicPatientDto
  ): Promise<ApiResponse<ClinicPatientDto>> {
    return apiClient.post(API_ENDPOINTS.CLINIC_PATIENTS.CREATE_OR_UPDATE, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.CLINIC_PATIENTS.DELETE, {
      id,
    });
  }

  async updateStatus(
    id: string,
    status: PatientStatus
  ): Promise<ApiResponse<void>> {
    return apiClient.put(API_ENDPOINTS.CLINIC_PATIENTS.UPDATE_STATUS, {
      id,
      status,
    });
  }

  async createOrUpdateCondition(
    data: CreateOrUpdateMedicalConditionDto
  ): Promise<ApiResponse<MedicalConditionDto>> {
    return apiClient.post(
      API_ENDPOINTS.CLINIC_PATIENTS.CREATE_OR_UPDATE_CONDITION,
      data
    );
  }
  async createOrUpdateAllergy(
    data: CreateOrUpdateAllergyDto
  ): Promise<ApiResponse<AllergyDto>> {
    return apiClient.post(
      API_ENDPOINTS.CLINIC_PATIENTS.CREATE_OR_UPDATE_ALLERGY,
      data
    );
  }

  async createOrUpdateFamilyHistory(
    data: CreateOrUpdateFamilyHistoryDto
  ): Promise<ApiResponse<FamilyHistoryDto>> {
    return apiClient.post(
      API_ENDPOINTS.CLINIC_PATIENTS.CREATE_OR_UPDATE_FAMILY_HISTORY,
      data
    );
  }

  async getProfile(id: string): Promise<ApiResponse<PatientProfileDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_PROFILE, {
      params: { id },
    });
  }

  // Get patient portal profile
  async getPatientPortalProfile(): Promise<
    ApiResponse<PatientPortalProfileDto>
  > {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_PORTAL_PROFILE);
  }

  // Update patient portal profile
  async updatePatientPortalProfile(
    data: UpdatePatientPortalProfileDto
  ): Promise<ApiResponse<PatientPortalProfileDto>> {
    return apiClient.put(
      API_ENDPOINTS.CLINIC_PATIENTS.UPDATE_PORTAL_PROFILE,
      data
    );
  }

  // Get patient health metrics
  async getPatientHealthMetrics(
    id: string
  ): Promise<ApiResponse<PatientHealthMetricDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_HEALTH_METRICS, {
      params: { id },
    });
  }

  // Update patient health metrics
  async updatePatientHealthMetrics(
    data: UpdatePatientHealthMetricDto
  ): Promise<ApiResponse<PatientHealthMetricDto>> {
    return apiClient.post(
      API_ENDPOINTS.CLINIC_PATIENTS.UPDATE_HEALTH_METRICS,
      data
    );
  }

  // Create or update emergency contact
  async createOrUpdateEmergencyContact(
    data: CreateOrUpdateEmergencyContactDto
  ): Promise<ApiResponse<EmergencyContactDto>> {
    return apiClient.post(
      API_ENDPOINTS.CLINIC_PATIENTS.CREATE_OR_UPDATE_EMERGENCY_CONTACT,
      data
    );
  }

  // Delete emergency contact
  async deleteEmergencyContact(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(
      API_ENDPOINTS.CLINIC_PATIENTS.DELETE_EMERGENCY_CONTACT,
      {
        params: { id },
      }
    );
  }

  // Patient Portal Dashboard
  async getPatientPortalDashboard(): Promise<
    ApiResponse<PatientPortalDashboardDto>
  > {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_PORTAL_DASHBOARD);
  }

  // Patient Portal Appointments
  async getPatientAppointments(
    filter: PatientAppointmentFilterDto
  ): Promise<ApiResponse<PaginationResponse<PatientPortalAppointmentsDto>>> {
    return apiClient.get(
      API_ENDPOINTS.CLINIC_PATIENTS.GET_PATIENT_APPOINTMENTS,
      {
        params: convertFilterToParams(filter as FilterParams),
      }
    );
  }

  async updatePatientAppointment(
    data: UpdatePatientAppointmentDto
  ): Promise<ApiResponse<void>> {
    return apiClient.put(
      API_ENDPOINTS.CLINIC_PATIENTS.UPDATE_PATIENT_APPOINTMENT,
      data
    );
  }

  // Patient Portal Visits
  async getPatientVisits(
    filter: PatientVisitFilterDto
  ): Promise<ApiResponse<PaginationResponse<PatientPortalVisitsDto>>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_PATIENT_VISITS, {
      params: convertFilterToParams(filter as FilterParams),
    });
  }

  async updatePatientPrescription(
    data: UpdatePatientPrescriptionDto
  ): Promise<ApiResponse<PatientPortalPrescriptionsDto>> {
    return apiClient.put(
      API_ENDPOINTS.CLINIC_PATIENTS.UPDATE_PATIENT_PRESCRIPTION,
      data
    );
  }

  // Save patient appointment
  async savePatientAppointment(
    data: SavePatientAppointmentDto
  ): Promise<ApiResponse<void>> {
    return apiClient.post(API_ENDPOINTS.CLINIC_PATIENTS.SAVE_APPOINTMENT, data);
  }

  /**
   * Get appointment details by appointment ID for patient portal
   * @param appointmentId - The ID of the appointment
   * @returns Promise<ApiResponse<PatientPortalAppointmentsDto>>
   */
  async getAppointmentDetails(
    appointmentId: string
  ): Promise<ApiResponse<PatientPortalAppointmentsDto>> {
    return apiClient.get(
      API_ENDPOINTS.CLINIC_PATIENTS.GET_APPOINTMENT_DETAILS,
      {
        params: { id: appointmentId },
      }
    );
  }

  /**
   * Book a follow-up appointment based on an existing appointment
   * @param data - Follow-up appointment data
   * @returns Promise<ApiResponse<PatientPortalAppointmentsDto>>
   */
  async bookFollowUpAppointment(
    data: BookFollowUpAppointmentDto
  ): Promise<ApiResponse<PatientPortalAppointmentsDto>> {
    return apiClient.post(
      API_ENDPOINTS.CLINIC_PATIENTS.BOOK_FOLLOW_UP_APPOINTMENT,
      data
    );
  }

  /**
   * Get visit details by visit ID
   * @param visitId - The ID of the visit
   * @returns Promise<ApiResponse<PatientPortalVisitsDto>>
   */

  async getVisitDetails(
    visitId: string
  ): Promise<ApiResponse<PatientPortalVisitsDto>> {
    return apiClient.get(API_ENDPOINTS.CLINIC_PATIENTS.GET_VISIT_DETAILS, {
      params: { id: visitId },
    });
  }
}

export const clinicPatientService = new ClinicPatientService();
