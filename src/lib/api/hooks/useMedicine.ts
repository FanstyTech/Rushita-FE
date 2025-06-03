import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CreateUpdateMedicineDto, MedicineFilterDto } from '../types/medicine';
import { medicineService } from '../services/medicine.service';

export const useMedicine = () => {
  const queryClient = useQueryClient();

  const useMedicinesList = (filter: MedicineFilterDto) =>
    useQuery({
      queryKey: ['medicines', filter],
      queryFn: async () => {
        const response = await medicineService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const useMedicineDetails = (id: string) =>
    useQuery({
      queryKey: ['medicine', id],
      queryFn: async () => {
        const response = await medicineService.getOne(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
    });

  const createMedicine = useMutation({
    mutationFn: async (data: CreateUpdateMedicineDto) => {
      const response = await medicineService.create(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Medicine created successfully');
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateMedicine = useMutation({
    mutationFn: async (data: CreateUpdateMedicineDto) => {
      const response = await medicineService.update(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Medicine updated successfully');
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteMedicine = useMutation({
    mutationFn: async (id: string) => {
      const response = await medicineService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Medicine deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    useMedicinesList,
    useMedicineDetails,
    createMedicine,
    updateMedicine,
    deleteMedicine,
  };
};
