import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clinicPatientService } from '../services/clinic-patient.service';
import { toast } from '@/components/ui/Toast';
import {
  CreateUpdateClinicPatientDto,
  PatientStatus,
  ClinicPatientFilterDto,
  CreateOrUpdateMedicalConditionDto,
  CreateOrUpdateAllergyDto,
  CreateOrUpdateFamilyHistoryDto,
  GetPatientDropdownInput,
  PatientAppointmentFilterDto,
  PatientVisitFilterDto,
  PatientPrescriptionFilterDto,
  UpdatePatientAppointmentDto,
  UpdatePatientPrescriptionDto,
  SavePatientAppointmentDto,
  CreateOrUpdateEmergencyContactDto,
  UpdatePatientHealthMetricDto,
  UpdatePatientPortalProfileDto,
} from '../types/clinic-patient';
// Replace the problematic query keys section with this:
const patientPortalQueryKeys = {
  profile: () => ['clinic-patients', 'portal-profile'] as const,
  healthMetrics: (id: string) =>
    ['clinic-patients', 'health-metrics', id] as const,
};
export function useClinicPatients() {
  const queryClient = useQueryClient();

  const usePatientsList = (filters: ClinicPatientFilterDto) =>
    useQuery({
      queryKey: ['clinic-patients', filters],
      queryFn: async () => {
        const response = await clinicPatientService.getAll(filters);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!filters.clinicId,
      retry: false,
    });

  const usePatientProfile = (id?: string) => {
    return useQuery({
      queryKey: ['clinic-patient-profile', id],
      queryFn: async () => {
        const response = await clinicPatientService.getProfile(id!);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });
  };
  const usePatientForEdit = (id: string) =>
    useQuery({
      queryKey: ['clinic-patient-edit', id],
      queryFn: async () => {
        const response = await clinicPatientService.getForEdit(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });

  const usePatientForView = (id: string) =>
    useQuery({
      queryKey: ['clinic-patient-view', id],
      queryFn: async () => {
        const response = await clinicPatientService.getForView(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });

  const usePatientDropdown = (
    filters: GetPatientDropdownInput,
    options?: { enabled?: boolean }
  ) =>
    useQuery({
      queryKey: ['clinic-patients-dropdown', filters],
      queryFn: async () => {
        const response = await clinicPatientService.getPatientDropdown(filters);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: options?.enabled !== undefined ? options.enabled : true,
      retry: false,
    });

  const createOrUpdatePatient = useMutation({
    mutationFn: async (data: CreateUpdateClinicPatientDto) => {
      const response = await clinicPatientService.createOrUpdate(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinic-patients'] });
      toast.success('Patient saved successfully');
    },
    onError: () => {
      toast.error('Failed to save patient');
    },
    retry: false,
  });

  const createOrUpdateCondition = useMutation({
    mutationFn: async (data: CreateOrUpdateMedicalConditionDto) => {
      const response = await clinicPatientService.createOrUpdateCondition(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: (data) => {
      if (!data) return;
      queryClient.invalidateQueries({
        queryKey: ['clinic-patient-profile', data.patientId],
      });
      toast.success('Condition saved successfully');
    },
    onError: () => {
      toast.error('Failed to save condition');
    },
    retry: false,
  });

  const createOrUpdateAllergy = useMutation({
    mutationFn: async (data: CreateOrUpdateAllergyDto) => {
      const response = await clinicPatientService.createOrUpdateAllergy(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: (data) => {
      if (!data) return;
      queryClient.invalidateQueries({
        queryKey: ['clinic-patient-profile', data.patientId],
      });
      toast.success('Allergy saved successfully');
    },
    onError: () => {
      toast.error('Failed to save allergy');
    },
    retry: false,
  });

  const createOrUpdateFamilyHistory = useMutation({
    mutationFn: async (data: CreateOrUpdateFamilyHistoryDto) => {
      const response = await clinicPatientService.createOrUpdateFamilyHistory(
        data
      );
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: (data) => {
      if (!data) return;
      queryClient.invalidateQueries({
        queryKey: ['clinic-patient-profile', data.patientId],
      });
      toast.success('Family history saved successfully');
    },
    onError: () => {
      toast.error('Failed to save family history');
    },
    retry: false,
  });

  const deletePatient = useMutation({
    mutationFn: async (id: string) => {
      const response = await clinicPatientService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinic-patients'] });
      toast.success('Patient deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete patient');
    },
    retry: false,
  });

  const updatePatientStatus = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: PatientStatus;
    }) => {
      const response = await clinicPatientService.updateStatus(id, status);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinic-patients'] });
      toast.success('Patient status updated successfully');
    },
    onError: () => {
      toast.error('Failed to update patient status');
    },
  });

  // Get patient portal profile
  const usePatientPortalProfile = () =>
    useQuery({
      queryKey: patientPortalQueryKeys.profile(),
      queryFn: async () => {
        const response = await clinicPatientService.getPatientPortalProfile();
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch patient profile'
          );
        }
        return response.result;
      },
      retry: false,
    });

  // Get patient health metrics
  const usePatientHealthMetrics = (id: string) =>
    useQuery({
      queryKey: patientPortalQueryKeys.healthMetrics(id),
      queryFn: async () => {
        const response = await clinicPatientService.getPatientHealthMetrics(id);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch health metrics');
        }
        return response.result;
      },
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

  // Update patient portal profile mutation
  const updatePatientPortalProfile = useMutation({
    mutationFn: async (data: UpdatePatientPortalProfileDto) => {
      // Assuming UpdatePatientPortalProfileDto is not defined here, using 'any' for now
      const response = await clinicPatientService.updatePatientPortalProfile(
        data
      );
      if (!response.success) {
        throw new Error(response.message || 'Failed to update patient profile');
      }
      return response.result;
    },
    onSuccess: (data) => {
      toast.success('Profile updated successfully');
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({
        queryKey: patientPortalQueryKeys.profile(),
      });
      queryClient.invalidateQueries({
        queryKey: patientPortalQueryKeys.healthMetrics(data?.id || ''),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update patient health metrics mutation
  const updatePatientHealthMetrics = useMutation({
    mutationFn: async (data: UpdatePatientHealthMetricDto) => {
      // Assuming UpdatePatientHealthMetricDto is not defined here, using 'any' for now
      const response = await clinicPatientService.updatePatientHealthMetrics(
        data
      );
      if (!response.success) {
        throw new Error(response.message || 'Failed to update health metrics');
      }
      return response.result;
    },
    onSuccess: (data) => {
      toast.success('Health metrics updated successfully');
      queryClient.invalidateQueries({
        queryKey: patientPortalQueryKeys.healthMetrics(data?.patientId || ''),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Create or update emergency contact mutation
  const createOrUpdateEmergencyContact = useMutation({
    mutationFn: async (data: CreateOrUpdateEmergencyContactDto) => {
      // Assuming CreateOrUpdateEmergencyContactDto is not defined here, using 'any' for now
      const response =
        await clinicPatientService.createOrUpdateEmergencyContact(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to save emergency contact');
      }
      return response.result;
    },
    onSuccess: (data, variables) => {
      const isUpdate = !!variables.id;
      toast.success(
        isUpdate
          ? 'Emergency contact updated successfully'
          : 'Emergency contact created successfully'
      );
      queryClient.invalidateQueries({
        queryKey: patientPortalQueryKeys.profile(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Delete emergency contact mutation
  const deleteEmergencyContact = useMutation({
    mutationFn: async (id: string) => {
      const response = await clinicPatientService.deleteEmergencyContact(id);
      if (!response.success) {
        throw new Error(
          response.message || 'Failed to delete emergency contact'
        );
      }
    },
    onSuccess: () => {
      toast.success('Emergency contact deleted successfully');
      // Note: We'll need to invalidate the profile query, but we need the patient ID
      // This might need to be handled differently
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Patient Portal Dashboard
  const usePatientPortalDashboard = () =>
    useQuery({
      queryKey: ['clinic-patients', 'portal-dashboard'],
      queryFn: async () => {
        const response = await clinicPatientService.getPatientPortalDashboard();
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch dashboard');
        }
        return response.result;
      },
      retry: false,
    });

  // Patient Portal Appointments
  const usePatientAppointments = (filters: PatientAppointmentFilterDto) =>
    useQuery({
      queryKey: ['clinic-patients', 'appointments', filters],
      queryFn: async () => {
        const response = await clinicPatientService.getPatientAppointments(
          filters
        );
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch appointments');
        }
        return response.result;
      },
      retry: false,
    });

  const updatePatientAppointment = useMutation({
    mutationFn: async (data: UpdatePatientAppointmentDto) => {
      const response = await clinicPatientService.updatePatientAppointment(
        data
      );
      if (!response.success) {
        throw new Error(response.message || 'Failed to update appointment');
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Appointment updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['clinic-patients', 'appointments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['clinic-patients', 'portal-dashboard'],
      });
    },

    retry: false,
  });

  // Patient Portal Visits
  const usePatientVisits = (filters: PatientVisitFilterDto) =>
    useQuery({
      queryKey: ['clinic-patients', 'visits', filters],
      queryFn: async () => {
        const response = await clinicPatientService.getPatientVisits(filters);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch visits');
        }
        return response.result;
      },
      retry: false,
    });

  const updatePatientPrescription = useMutation({
    mutationFn: async (data: UpdatePatientPrescriptionDto) => {
      const response = await clinicPatientService.updatePatientPrescription(
        data
      );
      if (!response.success) {
        throw new Error(response.message || 'Failed to update prescription');
      }
      return response.result;
    },
    onSuccess: (data) => {
      toast.success('Prescription updated successfully');
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: ['clinic-patients', 'prescriptions'],
        });
        queryClient.invalidateQueries({
          queryKey: ['clinic-patients', 'portal-dashboard'],
        });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Save patient appointment mutation
  const savePatientAppointment = useMutation({
    mutationFn: async (data: SavePatientAppointmentDto) => {
      const response = await clinicPatientService.savePatientAppointment(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to save appointment');
      }
    },
    onSuccess: () => {
      toast.success('تم حجز الموعد بنجاح!');
      // Invalidate appointments queries
      queryClient.invalidateQueries({ queryKey: ['patient-appointments'] });
      queryClient.invalidateQueries({ queryKey: ['patient-portal-dashboard'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  const useAppointmentDetails = (appointmentId: string) =>
    useQuery({
      queryKey: ['appointment-details', appointmentId],
      queryFn: async () => {
        const response = await clinicPatientService.getAppointmentDetails(
          appointmentId
        );

        return response.result;
      },
      enabled: !!appointmentId,
      retry: false,
    });

  const useVisitDetails = (visitId: string) =>
    useQuery({
      queryKey: ['visit-details', visitId],
      queryFn: async () => {
        const response = await clinicPatientService.getVisitDetails(visitId);

        return response.result;
      },
      enabled: !!visitId,
      retry: false,
    });

  const bookFollowUpAppointment = useMutation({
    mutationFn: clinicPatientService.bookFollowUpAppointment,
    onSuccess: () => {
      toast.success('Follow-up appointment booked successfully!');
      queryClient.invalidateQueries({ queryKey: ['patient-appointments'] });
      queryClient.invalidateQueries({ queryKey: ['patient-portal-dashboard'] });
    },
    retry: false,
  });

  return {
    usePatientsList,
    usePatientForEdit,
    usePatientForView,
    usePatientProfile,
    usePatientDropdown,
    createOrUpdatePatient,
    createOrUpdateCondition,
    createOrUpdateAllergy,
    createOrUpdateFamilyHistory,
    deletePatient,
    updatePatientStatus,

    // New patient portal methods
    usePatientPortalProfile,
    usePatientHealthMetrics,
    updatePatientPortalProfile,
    updatePatientHealthMetrics,
    createOrUpdateEmergencyContact,
    deleteEmergencyContact,

    // New patient portal dashboard, appointments, visits, and prescriptions methods
    usePatientPortalDashboard,
    usePatientAppointments,
    updatePatientAppointment,
    usePatientVisits,
    updatePatientPrescription,
    savePatientAppointment,
    useAppointmentDetails,
    useVisitDetails,
    bookFollowUpAppointment,
  };
}
