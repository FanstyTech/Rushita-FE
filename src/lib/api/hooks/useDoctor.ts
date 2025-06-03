import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { doctorService } from '../services/doctor.service';
import type { CreateDoctorDto, UpdateDoctorDto } from '../types/doctor';
import { toast } from '@/components/ui/Toast';

export const doctorKeys = {
  all: ['doctors'] as const,
  lists: () => [...doctorKeys.all, 'list'] as const,
  list: (filters: string) => [...doctorKeys.lists(), { filters }] as const,
  details: () => [...doctorKeys.all, 'detail'] as const,
  detail: (id: string) => [...doctorKeys.details(), id] as const,
};

export function useDoctorsList() {
  return useQuery({
    queryKey: doctorKeys.lists(),
    queryFn: () => doctorService.getAll(),
  });
}

export function useDoctorDetails(id: string) {
  return useQuery({
    queryKey: doctorKeys.detail(id),
    queryFn: () => doctorService.getById(id),
    enabled: !!id,
  });
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDoctorDto) => doctorService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.lists() });
      toast.success('Doctor created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateDoctor(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateDoctorDto) => doctorService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: doctorKeys.lists() });
      toast.success('Doctor updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: doctorService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.lists() });
      toast.success('Doctor deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
