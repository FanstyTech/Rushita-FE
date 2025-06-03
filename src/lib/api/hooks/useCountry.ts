import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { countryService } from '../services/country.service';
import type {
  CountryFilterDto,
  CreateUpdateCountryDto,
} from '../types/country';
import { toast } from '@/components/ui/Toast';

export function useCountry() {
  const queryClient = useQueryClient();

  const useCountriesList = (filter: CountryFilterDto) =>
    useQuery({
      queryKey: ['countries', filter],
      retry: false,
      queryFn: async () => {
        const response = await countryService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const useCountryDetails = (id: string) =>
    useQuery({
      queryKey: ['country', id],
      queryFn: async () => {
        const response = await countryService.getById(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const useCountryDropdown = () =>
    useQuery({
      queryKey: ['country', 'dropdown'],
      queryFn: async () => {
        const response = await countryService.getCountryForDropdown();
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const createCountry = useMutation({
    mutationFn: async (data: CreateUpdateCountryDto) => {
      const response = await countryService.create(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Country created successfully');
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateCountry = useMutation({
    mutationFn: async (data: CreateUpdateCountryDto) => {
      const response = await countryService.update(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Country updated successfully');
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteCountry = useMutation({
    mutationFn: async (id: string) => {
      const response = await countryService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Country deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    useCountriesList,
    useCountryDetails,
    useCountryDropdown,
    createCountry,
    updateCountry,
    deleteCountry,
  };
}
