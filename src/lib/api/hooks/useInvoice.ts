import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoiceService } from '../services/invoice.service';
import { toast } from '@/components/ui/Toast';
import {
  CreateUpdateInvoiceDto,
  InvoiceFilterDto,
  InvoiceSummaryFilterDto,
  InvoiceDashboardFilterDto,
  PaymentDto,
} from '../types/invoice';

export function useInvoice() {
  const queryClient = useQueryClient();

  // Get paginated list of invoices
  const useInvoicesList = (filters: InvoiceFilterDto) =>
    useQuery({
      queryKey: ['invoices', filters],
      queryFn: async () => {
        const response = await invoiceService.getAll(filters);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch invoices');
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
    });

  // Get single invoice
  const useInvoiceDetails = (id: string | null) => {
    const query = useQuery({
      queryKey: ['invoice', id],
      queryFn: async () => {
        const response = await invoiceService.getById(id!);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch invoice');
        }
        return response.result;
      },
      enabled: !!id && id.trim() !== '',
      retry: false,
      refetchOnMount: true, // يجيب البيانات كل مرة يركب فيها الكمبوننت
      refetchOnWindowFocus: true, // يعيد الجلب لما ترجع على الصفحة
    });

    return {
      ...query,
      refetchInvoice: () => {
        if (id) {
          queryClient.invalidateQueries({ queryKey: ['invoice', id] });
        }
      }
    };
  };

  // Get invoice summary
  const useInvoiceSummary = (filter: InvoiceSummaryFilterDto) =>
    useQuery({
      queryKey: ['invoiceSummary', filter],
      queryFn: async () => {
        const response = await invoiceService.getSummary(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch invoice summary'
          );
        }
        return response.result;
      },
      retry: false,
    });

  // Get invoice dashboard stats
  const useInvoiceDashboardStats = (filter: InvoiceDashboardFilterDto) =>
    useQuery({
      queryKey: ['invoiceDashboardStats', filter],
      queryFn: async () => {
        const response = await invoiceService.getDashboardStats(filter);
        if (!response.success) {
          throw new Error(
            response.message || 'Failed to fetch invoice dashboard stats'
          );
        }
        return response.result;
      },
      retry: false,
    });

  // Create or update invoice mutation
  const createOrUpdateInvoice = useMutation({
    mutationFn: async (data: CreateUpdateInvoiceDto) =>
      invoiceService.createOrUpdate(data),
    onSuccess: (_, data) => {
      toast.success(
        `Invoice has been successfully ${data.id ? 'updated' : 'created'}`
      );
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoiceSummary'] });
      queryClient.invalidateQueries({ queryKey: ['invoiceDashboardStats'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // Add payment to invoice mutation

  const addPayment = useMutation({
    mutationFn: async (data: PaymentDto) => invoiceService.addPayment(data),
    onSuccess: (_, data) => {
      toast.success('Payment added successfully');
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoiceSummary'] });
      queryClient.invalidateQueries({ queryKey: ['invoiceDashboardStats'] });
      // Invalidate the specific invoice details
      if (data.invoiceId) {
        queryClient.invalidateQueries({ queryKey: ['invoice', data.invoiceId] });
      }
    },
  });

  // Delete invoice mutation
  const deleteInvoice = useMutation({
    mutationFn: async (id: string) => {
      const response = await invoiceService.delete(id);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete invoice');
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Invoice deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoiceSummary'] });
      queryClient.invalidateQueries({ queryKey: ['invoiceDashboardStats'] });
    },
    retry: false,
  });

  return {
    useInvoicesList,
    useInvoiceDetails,
    useInvoiceSummary,
    useInvoiceDashboardStats,
    createOrUpdateInvoice,
    addPayment,
    deleteInvoice,
  };
}
