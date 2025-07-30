import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicePriceService } from '../services/service-price.service';
import { toast } from '@/components/ui/Toast';
import {
  GetServicesByTypeInput,
  ServicePriceCreateUpdateDto,
  ServicePriceFilterDto,
  ServicePriceSummaryFilterDto,
} from '../types/service-price';

export function useServicePrice() {
  const queryClient = useQueryClient();

  // Get paginated list of service prices
  const useServicePricesList = (filters: ServicePriceFilterDto) =>
    useQuery({
      queryKey: ['servicePrices', filters],
      queryFn: async () => {
        const response = await servicePriceService.getAll(filters);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch service prices');
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });

  // Get single service price
  const useServicePriceDetails = (id: string) =>
    useQuery({
      queryKey: ['servicePrice', id],
      queryFn: async () => {
        const response = await servicePriceService.getById(id);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch service price');
        }
        return response.result;
      },
      enabled: !!id,
      retry: false,
    });

  // Get services by type for dropdown
  const useServicesByType = (filter: GetServicesByTypeInput) =>
    useQuery({
      queryKey: ['services', filter],
      queryFn: async () => {
        const response = await servicePriceService.getServicesByType(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch services by type'
          );
        }
        return response.result;
      },
      enabled: !!filter && filter?.serviceType > 0,
      retry: false,
    });

  // Get service price summary
  const useServicePriceSummary = (filter: ServicePriceSummaryFilterDto) =>
    useQuery({
      queryKey: ['servicePriceSummary', filter],
      queryFn: async () => {
        const response = await servicePriceService.getSummary(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch service price summary'
          );
        }
        return response.result;
      },
      enabled: !!filter.clinicId,
      retry: false,
    });

  // Create service price mutation
  const createOrUpdateServicePrice = useMutation({
    mutationFn: async (data: ServicePriceCreateUpdateDto) =>
      servicePriceService.createOrUpdate(data),
    onSuccess: (_, data) => {
      toast.success(
        `Service price has been successfully ${data.id ? 'updated' : 'created'}`
      );
      queryClient.invalidateQueries({ queryKey: ['servicePrices'] });
    },
    retry: false,
  });

  // Delete service price mutation
  const deleteServicePrice = useMutation({
    mutationFn: async (id: string) => {
      const response = await servicePriceService.delete(id);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete service price');
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Service price deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['servicePrices'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  return {
    useServicePricesList,
    useServicePriceDetails,
    useServicesByType,
    useServicePriceSummary,
    createOrUpdateServicePrice,
    deleteServicePrice,
  };
}
