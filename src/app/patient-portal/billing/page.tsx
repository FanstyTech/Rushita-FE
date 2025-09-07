'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Receipt,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  X,
  FileText,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input, Select } from '@/components/common/form/index';
import { cn } from '@/lib/utils';
import { useInvoice } from '@/lib/api/hooks/useInvoice';
import { InvoiceStatus, InvoiceFilterDto } from '@/lib/api/types/invoice';
import {
  getInvoiceStatusLabel,
  getInvoiceStatusColor,
} from '@/utils/textUtils';
import { formatDate } from '@/utils/dateTimeUtils';
import { Pagination, usePagination } from '@/components/ui/pagination';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function BillingPage() {
  const { t } = useTranslation();
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<InvoiceStatus | ''>('');
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  // Pagination hook
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination(10);

  // Build API filters object
  const buildApiFilters = () => {
    const filters: InvoiceFilterDto = {
      pageNumber: currentPage,
      pageSize: pageSize,
    };

    // Add search filter
    if (searchQuery.trim()) {
      filters.invoiceNumber = searchQuery.trim();
    }

    // Add status filter
    if (selectedStatus) {
      filters.status = selectedStatus;
    }

    return filters;
  };

  // Fetch invoices using the hook
  const { useInvoicesList } = useInvoice();
  const {
    data: invoicesData,
    isLoading,
    error,
  } = useInvoicesList(buildApiFilters());

  const invoices = invoicesData?.items || [];

  // Calculate statistics
  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce(
    (sum, invoice) => sum + invoice.totalAmount,
    0
  );
  const totalPaid = invoices.reduce(
    (sum, invoice) => sum + invoice.paidAmount,
    0
  );
  const totalUnpaid = totalAmount - totalPaid;

  // Handle filter changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusFilter = (status: InvoiceStatus | '') => {
    setSelectedStatus(status);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('');
  };

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-500 mb-2">
            {t('patientPortal.billing.list.error.title')}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {t('patientPortal.billing.list.error.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('patientPortal.billing.list.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('patientPortal.billing.list.description')}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Invoices */}
        <Card className="backdrop-blur-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {t('patientPortal.billing.list.stats.totalInvoices')}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {totalInvoices}
                </p>
              </div>
              <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/20">
                <Receipt className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Amount */}
        <Card className="backdrop-blur-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {t('patientPortal.billing.list.stats.totalAmount')}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(totalAmount)}
                </p>
              </div>
              <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/20">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Paid */}
        <Card className="backdrop-blur-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {t('patientPortal.billing.list.stats.totalPaid')}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(totalPaid)}
                </p>
              </div>
              <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/20">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unpaid */}
        <Card className="backdrop-blur-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {t('patientPortal.billing.list.stats.totalUnpaid')}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(totalUnpaid)}
                </p>
              </div>
              <div className="rounded-full p-3 bg-red-100 dark:bg-red-900/20">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters section */}
      <motion.div variants={itemVariants} initial="hidden" animate="show">
        <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
          <CardHeader className="bg-primary/5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  {t('patientPortal.billing.list.filters.filter')}
                </CardTitle>
                <CardDescription className="mt-1">
                  {t('patientPortal.billing.list.filters.description')}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs flex items-center gap-1 hover:bg-primary/10"
                onClick={handleResetFilters}
              >
                <X className="h-3 w-3" />
                {t('patientPortal.billing.list.filters.reset')}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Search input */}
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.billing.list.filters.search')}
                  placeholder={t(
                    'patientPortal.billing.list.filters.searchPlaceholder'
                  )}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  startIcon={<Search className="h-4 w-4" />}
                  fullWidth
                />
              </div>

              {/* Status filter */}
              <div className="space-y-2">
                <Select
                  label={t('patientPortal.billing.list.filters.status')}
                  value={selectedStatus}
                  onChange={(e) =>
                    handleStatusFilter(e.target.value as InvoiceStatus | '')
                  }
                  options={[
                    {
                      value: '',
                      label: t('patientPortal.billing.list.filters.statusAll'),
                    },
                    ...Object.entries(InvoiceStatus)
                      .filter(([key]) => isNaN(Number(key)))
                      .map(([, value]) => ({
                        value: value.toString(),
                        label: getInvoiceStatusLabel(value as InvoiceStatus),
                      })),
                  ]}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Invoices list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-32 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : invoices.length > 0 ? (
          invoices.map((invoice) => (
            <motion.div key={invoice.id} variants={itemVariants}>
              <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full p-3 bg-blue-500/10">
                        <Receipt className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">
                            {t('patientPortal.billing.list.card.invoiceNumber')}
                            : {invoice.invoiceNumber}
                          </h3>
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-xs',
                              getInvoiceStatusColor(invoice.status)
                            )}
                          >
                            {getInvoiceStatusLabel(invoice.status)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">
                              {t('patientPortal.billing.list.card.invoiceDate')}
                              :
                            </span>
                            <p>{formatDate(invoice.invoiceDate)}</p>
                          </div>
                          <div>
                            <span className="font-medium">
                              {t('patientPortal.billing.list.card.dueDate')}:
                            </span>
                            <p>{formatDate(invoice.dueDate)}</p>
                          </div>
                          <div>
                            <span className="font-medium">
                              {t('patientPortal.billing.list.card.totalAmount')}
                              :
                            </span>
                            <p className="font-semibold text-foreground">
                              {formatCurrency(invoice.totalAmount)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-500/20 text-blue-500 hover:bg-blue-500/10"
                        asChild
                      >
                        <Link href={`/patient-portal/billing/${invoice.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          {t('patientPortal.billing.list.card.viewDetails')}
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-500/20 text-green-500 hover:bg-green-500/10"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        {t('patientPortal.billing.list.card.downloadPDF')}
                      </Button>
                    </div>
                  </div>

                  {/* Payment summary */}
                  <div className="mt-4 pt-4 border-t border-border/30">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span>
                          {t('patientPortal.billing.list.card.paidAmount')}:{' '}
                          {formatCurrency(invoice.paidAmount)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span>
                          {t('patientPortal.billing.list.card.remainingAmount')}
                          :{' '}
                          {formatCurrency(
                            invoice.totalAmount - invoice.paidAmount
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>
                          {t('patientPortal.billing.list.card.lastPayment')}:{' '}
                          {invoice.lastPaymentDate
                            ? formatDate(invoice.lastPaymentDate)
                            : t('patientPortal.billing.list.card.noPayment')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-500" />
                        <span>
                          {t('patientPortal.billing.list.card.servicesCount')}:{' '}
                          {invoice.itemsCount || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="rounded-full p-3 bg-muted/50 mx-auto mb-3 w-fit">
                <Receipt className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">
                {t('patientPortal.billing.list.empty.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('patientPortal.billing.list.empty.description')}
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Pagination Component */}
      {invoicesData && invoicesData.totalCount > 0 && (
        <Pagination
          currentPage={invoicesData.pageNumber}
          totalPages={invoicesData.totalPages}
          totalCount={invoicesData.totalCount}
          pageSize={pageSize}
          hasPreviousPage={invoicesData.hasPreviousPage}
          hasNextPage={invoicesData.hasNextPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          showPageSizeSelector={true}
          pageSizeOptions={[5, 10, 20, 50]}
          className="mt-6"
        />
      )}
    </div>
  );
}
