import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { currencyService } from '../services/currency.service';
import type {
  CurrencyFilterDto,
  CreateUpdateCurrencyDto,
} from '../types/currency';
import { toast } from '@/components/ui/Toast';

export const useCurrency = () => {
  const queryClient = useQueryClient();

  const useCurrenciesList = (filter: CurrencyFilterDto) =>
    useQuery({
      queryKey: ['currencies', filter],
      retry: false,
      queryFn: async () => {
        const response = await currencyService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const useCurrencyDetails = (id: string) =>
    useQuery({
      queryKey: ['currencies', id],
      queryFn: async () => {
        const response = await currencyService.getById(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });

  const useCurrenciesDropdown = () =>
    useQuery({
      queryKey: ['currenciesForDropdown'],
      queryFn: async () => {
        const response = await currencyService.getCurrenciesForDropdown();
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      staleTime: 30 * 60 * 1000, // 30 minutes
      retry: false,
    });

  const useDefaultCurrency = () =>
    useQuery({
      queryKey: ['defaultCurrency'],
      queryFn: async () => {
        const response = await currencyService.getDefaultCurrency();
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
    });

  const createCurrency = useMutation({
    mutationFn: (currency: CreateUpdateCurrencyDto) =>
      currencyService.create(currency),
    onSuccess: () => {
      toast.success('Currency created successfully');
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
      queryClient.invalidateQueries({ queryKey: ['defaultCurrency'] });
    },
    retry: false,
  });

  const updateCurrency = useMutation({
    mutationFn: (currency: CreateUpdateCurrencyDto) =>
      currencyService.update(currency),
    onSuccess: () => {
      toast.success('Currency updated successfully');
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
      queryClient.invalidateQueries({ queryKey: ['defaultCurrency'] });
    },
    retry: false,
  });

  const deleteCurrency = useMutation({
    mutationFn: (id: string) => currencyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
      queryClient.invalidateQueries({ queryKey: ['defaultCurrency'] });
      toast.success('Currency deleted successfully');
    },
    retry: false,
  });

  const setDefaultCurrency = useMutation({
    mutationFn: (id: string) => currencyService.setDefaultCurrency(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
      queryClient.invalidateQueries({ queryKey: ['defaultCurrency'] });
      toast.success('Default currency updated successfully');
    },
    retry: false,
  });

  return {
    useCurrenciesList,
    useCurrencyDetails,
    useCurrenciesDropdown,
    useDefaultCurrency,
    createCurrency,
    updateCurrency,
    deleteCurrency,
    setDefaultCurrency,
  };
};
