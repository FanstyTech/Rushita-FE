import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cityService } from '../services/city.service';
import type {
  CityFilterDto,
  CreateUpdateCityDto,
  GetCitiesForDropdownInput,
} from '../types/city';
import { toast } from '@/components/ui/Toast';

export const useCity = () => {
  const queryClient = useQueryClient();

  const useCitiesList = (filter: CityFilterDto) =>
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

  const useCityDetails = (id: string) =>
    useQuery({
      queryKey: ['cities', id],
      queryFn: () => cityService.getById(id),
      enabled: !!id,
    });

  const useCitiesDropdown = (filter: GetCitiesForDropdownInput) =>
    useQuery({
      queryKey: ['citiesForDropdown'],
      queryFn: async () => {
        const response = await cityService.getCitiesForDropdown(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: filter.all || !!filter.countryId || !!filter.filter,
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
    useCitiesList,
    useCityDetails,
    useCitiesDropdown,
    createCity,
    updateCity,
    deleteCity,
  };
};
