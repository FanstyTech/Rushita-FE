import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clinicService } from '../services/clinic.service';
import type { ClinicFilterDto, CreateUpdateClinicDto } from '../types/clinic';
import { toast } from 'sonner';

export function useClinicList(filter: ClinicFilterDto) {
  return useQuery({
    queryKey: ['clinics', filter],
    queryFn: () => clinicService.getList(filter),
  });
}

export function useClinicDropdown() {
  return useQuery({
    queryKey: ['clinics-dropdown'],
    queryFn: () => clinicService.getForDropdown(),
  });
}

export function useClinic(id: string) {
  return useQuery({
    queryKey: ['clinic', id],
    queryFn: () => clinicService.getOne(id),
    enabled: !!id,
  });
}

export function useCreateUpdateClinic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUpdateClinicDto & { id?: string }) =>
      clinicService.createOrUpdate(data),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
      toast.success(
        'Clinic has been successfully ' + (data.id ? 'updated' : 'created')
      );
    },
    onError: (_, data) => {
      toast.error('Failed to ' + (data.id ? 'update' : 'create') + ' clinic');
    },
  });
}

export function useDeleteClinic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clinicService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
      toast.success('Clinic has been successfully deleted');
    },
    onError: () => {
      toast.error('Failed to delete clinic');
    },
  });
}

export function useUploadClinicImage() {
  return useMutation({
    mutationFn: (file: File) => clinicService.uploadImage(file),
    onError: () => {
      toast.error('Failed to upload clinic image');
    },
  });
}

export function useUpdateClinicStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      clinicService.updateStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
      toast.success('Clinic status has been updated');
    },
    onError: () => {
      toast.error('Failed to update clinic status');
    },
  });
}

export function useUpdateClinicLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      latitude,
      longitude,
    }: {
      id: string;
      latitude: number;
      longitude: number;
    }) => clinicService.updateLocation(id, latitude, longitude),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
      toast.success('Clinic location has been updated');
    },
    onError: () => {
      toast.error('Failed to update clinic location');
    },
  });
}

// export function useClinicDoctors(clinicId: string) {
//   return useQuery({
//     queryKey: ['clinic-doctors', clinicId],
//     queryFn: () => clinicService.getDoctors(clinicId),
//     enabled: !!clinicId,
//   });
// }

// export function useClinicPatients(clinicId: string) {
//   return useQuery({
//     queryKey: ['clinic-patients', clinicId],
//     queryFn: () => clinicService.getPatients(clinicId),
//     enabled: !!clinicId,
//   });
// }
