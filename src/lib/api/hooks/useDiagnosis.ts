import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  CreateUpdateDiagnosisDto,
  DiagnosisFilterDto,
} from '../types/diagnosis';
import { diagnosisService } from '../services/diagnosis.service';

export const useDiagnosis = () => {
  const queryClient = useQueryClient();

  const useDiagnosesList = (filter: DiagnosisFilterDto) =>
    useQuery({
      queryKey: ['diagnoses', filter],
      queryFn: async () => {
        const response = await diagnosisService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const useDiagnosisDetails = (id: string) =>
    useQuery({
      queryKey: ['diagnosis', id],
      queryFn: async () => {
        const response = await diagnosisService.getOne(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });

  const useDiagnosesDropdown = () =>
    useQuery({
      queryKey: ['diagnoses-dropdown'],
      queryFn: async () => {
        const response = await diagnosisService.getDropdownOptions();
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const useDiagnosesTree = () =>
    useQuery({
      queryKey: ['diagnoses-tree'],
      queryFn: async () => {
        const response = await diagnosisService.getDiagnosesTree();
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const createDiagnosis = useMutation({
    mutationFn: async (data: CreateUpdateDiagnosisDto) => {
      const response = await diagnosisService.create(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Diagnosis created successfully');
      queryClient.invalidateQueries({ queryKey: ['diagnoses'] });
      queryClient.invalidateQueries({ queryKey: ['diagnoses-dropdown'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateDiagnosis = useMutation({
    mutationFn: async (data: CreateUpdateDiagnosisDto) => {
      const response = await diagnosisService.update(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Diagnosis updated successfully');
      queryClient.invalidateQueries({ queryKey: ['diagnoses'] });
      queryClient.invalidateQueries({ queryKey: ['diagnoses-dropdown'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteDiagnosis = useMutation({
    mutationFn: async (id: string) => {
      const response = await diagnosisService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Diagnosis deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['diagnoses'] });
      queryClient.invalidateQueries({ queryKey: ['diagnoses-dropdown'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    useDiagnosesList,
    useDiagnosisDetails,
    useDiagnosesDropdown,
    useDiagnosesTree,
    createDiagnosis,
    updateDiagnosis,
    deleteDiagnosis,
  };
};
