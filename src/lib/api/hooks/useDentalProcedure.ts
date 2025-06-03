import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  CreateUpdateDentalProcedureDto,
  DentalProcedureFilterDto,
} from '../types/dental-procedure';
import { dentalProcedureService } from '../services/dental-procedure.service';

export const useDentalProcedure = () => {
  const queryClient = useQueryClient();

  const useDentalProceduresList = (filter: DentalProcedureFilterDto) =>
    useQuery({
      queryKey: ['dentalProcedures', filter],
      queryFn: async () => {
        const response = await dentalProcedureService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const useDentalProcedureDetails = (id: string) =>
    useQuery({
      queryKey: ['dentalProcedure', id],
      queryFn: async () => {
        const response = await dentalProcedureService.getOne(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });

  const createDentalProcedure = useMutation({
    mutationFn: async (data: CreateUpdateDentalProcedureDto) => {
      const response = await dentalProcedureService.create(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Dental procedure created successfully');
      queryClient.invalidateQueries({ queryKey: ['dentalProcedures'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateDentalProcedure = useMutation({
    mutationFn: async (data: CreateUpdateDentalProcedureDto) => {
      const response = await dentalProcedureService.update(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Dental procedure updated successfully');
      queryClient.invalidateQueries({ queryKey: ['dentalProcedures'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteDentalProcedure = useMutation({
    mutationFn: async (id: string) => {
      const response = await dentalProcedureService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Dental procedure deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['dentalProcedures'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    useDentalProceduresList,
    useDentalProcedureDetails,
    createDentalProcedure,
    updateDentalProcedure,
    deleteDentalProcedure,
  };
};
