import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cityService } from '../services/city.service';
import type { CityFilterDto, CreateUpdateCityDto } from '../types/city';
import { toast } from '@/components/ui/Toast';

export const useCity = () => {
  const queryClient = useQueryClient();

  const getCities = (filter: CityFilterDto) =>
    useQuery({
      queryKey: ['cities', filter],
      retry: false,
      queryFn: async () => {
        const response = await cityService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const getCity = (id: string) =>
    useQuery({
      queryKey: ['cities', id],
      queryFn: () => cityService.getById(id),
      enabled: !!id,
    });
  const getCitiesForDropdown = () =>
    useQuery({
      queryKey: ['citiesForDropdown'],
      queryFn: async () => {
        const response = await cityService.getCitiesForDropdown();
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });
  const createCity = useMutation({
    mutationFn: (city: CreateUpdateCityDto) => cityService.create(city),
    onSuccess: () => {
      toast.success('City created successfully');
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
    onError: () => {
      toast.error('Failed to create city');
    },
  });

  const updateCity = useMutation({
    mutationFn: (city: CreateUpdateCityDto) => cityService.update(city),
    onSuccess: () => {
      toast.success('City updated successfully');
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
    onError: () => {
      toast.error('Failed to update city');
    },
  });

  const deleteCity = useMutation({
    mutationFn: (id: string) => cityService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      toast.success('City deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete city');
    },
  });

  return {
    getCities,
    getCity,
    getCitiesForDropdown,
    createCity,
    updateCity,
    deleteCity,
  };
};
