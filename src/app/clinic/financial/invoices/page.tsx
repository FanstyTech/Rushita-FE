'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Input, Select, TextArea } from '@/components/common/form';
import { Button } from '@/components/ui/button';
import Modal from '@/components/common/Modal';
import { Column, Table } from '@/components/common/Table';
import PageLayout from '@/components/layouts/PageLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, DollarSign, FileText, Calendar, Eye } from 'lucide-react';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { useInvoice } from '@/lib/api/hooks/useInvoice';
import { InvoiceStatus, InvoiceListDto } from '@/lib/api/types/invoice';
import { PaymentFormData, paymentSchema } from './validation';
import { PaymentMethod } from '@/lib/api/types/invoice';
import { formatDate } from '@/utils/dateTimeUtils';
import {
  getInvoiceStatusColor,
  getInvoiceStatusLabel,
  getPaymentMethodLabel,
  getServiceTypeLabel,
} from '@/utils/textUtils';

export default function InvoicesPage() {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceListDto | null>(
    null
  );

  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 10,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    status: undefined,
    fromDate: undefined,
    toDate: undefined,
  });

  // Forms
  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: 0,
      paymentDate: new Date().toISOString().split('T')[0],
      method: PaymentMethod.Cash,
      referenceNumber: '',
      notes: '',
    },
  });

  // API Hooks
  const {
    useInvoicesList,
    useInvoiceSummary,
    useInvoiceDetails,
    addPayment,
    deleteInvoice,
  } = useInvoice();

  // Get data
  const { data: invoices, isLoading } = useInvoicesList(filter);
  const { data: summary, isLoading: isLoadingSummary } = useInvoiceSummary({});
  const { data: invoice, isLoading: isLoadingInvoiceDetails, refetchInvoice } =
    useInvoiceDetails(selectedInvoice?.id || null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const columns: Column<InvoiceListDto>[] = [
    {
      header: 'Invoice #',
      accessor: 'invoiceNumber',
      cell: ({ row }) => (
        <span className="font-mono font-medium text-gray-900 dark:text-white">
          {row.original.invoiceNumber}
        </span>
      ),
    },
    {
      header: 'Patient',
      accessor: 'patientName',
      cell: ({ row }) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {row.original.patientName}
        </span>
      ),
    },
    {
      header: 'Doctor',
      accessor: 'doctorName',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {row.original.doctorName}
        </span>
      ),
    },
    {
      header: 'Total Amount',
      accessor: 'totalAmount',
      cell: ({ row }) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          {formatCurrency(row.original.totalAmount)}
        </span>
      ),
    },
    {
      header: 'Paid/Unpaid',
      accessor: 'paidAmount',
      cell: ({ row }) => (
        <div className="text-sm">
          <div className="text-green-600 dark:text-green-400">
            Paid: {formatCurrency(row.original.paidAmount)}
          </div>
          {row.original.unpaidAmount > 0 && (
            <div className="text-red-600 dark:text-red-400">
              Unpaid: {formatCurrency(row.original.unpaidAmount)}
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: ({ row }) => (
        <Badge className={getInvoiceStatusColor(row.original.status)}>
          {getInvoiceStatusLabel(row.original.status)}
        </Badge>
      ),
    },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(row.original.dueDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => handleView(row.original)}
            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </Button>
          {row.original.unpaidAmount > 0 && (
            <Button
              variant="ghost"
              onClick={() => handleAddPayment(row.original)}
              className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
              title="Add Payment"
            >
              <DollarSign className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() => handleDelete(row.original)}
            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const onSubmitPayment = async (formData: PaymentFormData) => {
    const payload = {
      ...formData,
      ...(selectedInvoice && { invoiceId: selectedInvoice?.id }),
    };
    await addPayment.mutateAsync(payload);
    handleClosePaymentModal();
  };

  const handleView = (invoice: InvoiceListDto) => {
    setSelectedInvoice(invoice);
    setIsViewModalOpen(true);
    // Force refetch the invoice details to ensure fresh data
    setTimeout(() => {
      refetchInvoice();
    }, 100);
  };

  const handleAddPayment = (invoice: InvoiceListDto) => {
    setSelectedInvoice(invoice);
    paymentForm.reset({
      amount: invoice.unpaidAmount,
      paymentDate: new Date().toISOString().split('T')[0],
      method: PaymentMethod.Cash,
      referenceNumber: '',
      notes: '',
    });
    setIsPaymentModalOpen(true);
  };

  const handleDelete = (invoice: InvoiceListDto) => {
    setSelectedInvoice(invoice);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedInvoice) {
      await deleteInvoice.mutateAsync(selectedInvoice?.id);
      setIsDeleteModalOpen(false);
      setSelectedInvoice(null);
    }
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    paymentForm.reset();
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedInvoice(null);
    // Clear the invoice data from cache when modal is closed
    if (selectedInvoice?.id) {
      queryClient.removeQueries({ queryKey: ['invoice', selectedInvoice.id] });
    }
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Invoices
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summary?.totalInvoices || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(summary?.totalAmount || 0)}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Paid
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(summary?.totalPaid || 0)}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Overdue Invoices
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {summary?.overdueInvoices || 0}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatCurrency(summary?.totalUnpaid || 0)} unpaid
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <Calendar className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Bar */}
        <FilterBar
          filter={filter}
          onFilterChange={(newFilter) => {
            setFilter((prev) => ({
              ...prev,
              ...newFilter,
              pageNumber: newFilter.pageNumber ?? prev.pageNumber,
              pageSize: newFilter.pageSize ?? prev.pageSize,
              sortColumn: newFilter.sortColumn ?? prev.sortColumn,
              sortDirection: newFilter.sortDirection ?? prev.sortDirection,
            }));
          }}
          haveStatusFilter={false}
          additionalFilters={[
            {
              icon: <FileText className="w-4 h-4" />,
              label: 'Status',
              options: [
                { value: '', label: 'All Statuses' },
                ...Object.entries(InvoiceStatus)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: key,
                  })),
              ],
              value: String(filter.status || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  status: value ? Number(value) : undefined,
                })),
            },
          ]}
        />

        {/* Table */}
        <Table<InvoiceListDto>
          data={invoices?.items || []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize || 10,
            pageIndex: (filter.pageNumber || 1) - 1,
            pageCount: invoices?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              disabled={addPayment.isPending}
              onClick={handleClosePaymentModal}
            >
              Cancel
            </Button>
            <Button
              onClick={paymentForm.handleSubmit(onSubmitPayment)}
              isLoading={addPayment.isPending}
            >
              Add Payment
            </Button>
          </div>
        }
        title="Add Payment"
      >
        <form className="space-y-6">
          <Input
            label="Amount"
            required={true}
            type="number"
            step="0.01"
            min="0"
            startIcon={<DollarSign className="w-4 h-4" />}
            {...paymentForm.register('amount', { valueAsNumber: true })}
            error={paymentForm.formState.errors.amount?.message}
          />

          <Input
            label="Payment Date"
            required={true}
            type="date"
            {...paymentForm.register('paymentDate')}
            error={paymentForm.formState.errors.paymentDate?.message}
          />

          <Select
            label="Payment Method"
            required={true}
            value={String(paymentForm.watch('method'))}
            {...paymentForm.register('method')}
            error={paymentForm.formState.errors.method?.message}
            options={Object.entries(PaymentMethod)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => ({
                value: value.toString(),
                label: key,
              }))}
          />
          {/* 
          <Input
            label="Reference Number"
            {...paymentForm.register('referenceNumber')}
            error={paymentForm.formState.errors.referenceNumber?.message}
          /> */}

          <TextArea
            label="Notes"
            {...paymentForm.register('notes')}
            error={paymentForm.formState.errors.notes?.message}
          />
        </form>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseViewModal}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleCloseViewModal();
                handleAddPayment(selectedInvoice as InvoiceListDto);
              }}
              disabled={selectedInvoice?.unpaidAmount === 0}
            >
              Add Payment
            </Button>
          </div>
        }
        title={`Invoice Details - ${selectedInvoice?.invoiceNumber}`}
        maxWidth="3xl"
      >
        {invoice && (
          <div className="space-y-6">
            {/* Invoice Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Invoice Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Invoice Number:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {invoice?.invoiceNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Invoice Date:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {invoice && formatDate(invoice?.invoiceDate || '')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Due Date:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {invoice && formatDate(invoice?.dueDate || '')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Status:
                    </span>
                    {invoice && (
                      <Badge className={getInvoiceStatusColor(invoice?.status)}>
                        {getInvoiceStatusLabel(invoice?.status)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Patient & Doctor
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Patient:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {invoice?.patientName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Doctor:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {invoice?.doctorName}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Items */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Invoice Items
              </h4>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="space-y-3">
                  {invoice?.items?.length != 0 &&
                    invoice?.items?.map((item, index) => (
                      <div
                        className="flex justify-between items-center"
                        key={index}
                      >
                        <span className="text-gray-600 dark:text-gray-400">
                          {item?.serviceType &&
                            getServiceTypeLabel(item?.serviceType)}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(item?.total)}
                        </span>
                      </div>
                    ))}

                  <hr className="border-gray-200 dark:border-gray-700" />
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-gray-900 dark:text-white">
                      Total Amount
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {invoice && formatCurrency(invoice?.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Payment Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Amount
                    </p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(invoice?.totalAmount || 0)}
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Paid Amount
                    </p>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(invoice?.paidAmount || 0)}
                    </p>
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Unpaid Amount
                    </p>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">
                      {formatCurrency(invoice?.unpaidAmount || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment History */}
            {invoice?.payments?.length != 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Payment History
                </h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="space-y-3">
                    {invoice?.payments?.map((item, index) => (
                      <div
                        className="flex justify-between items-center"
                        key={item.id}
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Payment #{index + 1}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(item.paymentDate || '')}-{' '}
                            {getPaymentMethodLabel(item.method)}
                          </p>
                        </div>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {formatCurrency(item.amount || 0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Notes
              </h4>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-gray-600 dark:text-gray-400">
                  {invoice?.notes || 'No additional notes for this invoice.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Invoice"
        message="Are you sure you want to delete this invoice?"
        secondaryMessage="This action cannot be undone."
        variant="error"
        confirmText="Delete"
        isLoading={deleteInvoice.isPending}
      />
    </PageLayout>
  );
}
