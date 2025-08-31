'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, TextArea } from '@/components/common/form';
import { Button } from '@/components/ui/button';
import Modal from '@/components/common/Modal';
import { Column, Table } from '@/components/common/Table';
import PageLayout from '@/components/layouts/PageLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Pencil,
  Trash2,
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
} from 'lucide-react';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { useRevenue } from '@/lib/api/hooks/useRevenue';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { RevenueType, ClinicRevenueListDto } from '@/lib/api/types/revenue';
import { RevenueFormData, revenueSchema } from './validation';

export default function RevenuePage() {
  const { user } = useAuth();
  const clinicId = user?.clinicInfo?.id || '';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRevenue, setSelectedRevenue] =
    useState<ClinicRevenueListDto | null>(null);

  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 10,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    revenueType: undefined,
    fromDate: undefined,
    toDate: undefined,
  });

  const form = useForm<RevenueFormData>({
    resolver: zodResolver(revenueSchema),

    defaultValues: {
      revenueType: RevenueType.Visit,
      amount: 0,
      revenueDate: new Date().toISOString().split('T')[0],
      description: '',
    },
  });

  // API Hooks
  const {
    useRevenuesList,
    useRevenueSummary,
    createOrUpdateRevenue,
    deleteRevenue,
  } = useRevenue();

  // Get data
  const { data: revenues, isLoading } = useRevenuesList(filter);
  const { data: summary } = useRevenueSummary({});

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getRevenueTypeColor = (type: RevenueType) => {
    const colors: { [key: number]: string } = {
      [RevenueType.Visit]:
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      [RevenueType.Donations]:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      [RevenueType.GovernmentSupport]:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      [RevenueType.Other]:
        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    };
    return colors[type] || colors[RevenueType.Other];
  };

  const getRevenueTypeLabel = (type: RevenueType) => {
    const labels: { [key: number]: string } = {
      [RevenueType.Visit]: 'Visit',
      [RevenueType.Donations]: 'Donations',
      [RevenueType.GovernmentSupport]: 'Government Support',
      [RevenueType.Other]: 'Other',
    };
    return labels[type] || 'Other';
  };

  const columns: Column<ClinicRevenueListDto>[] = [
    {
      header: 'Revenue Type',
      accessor: 'revenueType',
      cell: ({ row }) => (
        <Badge className={getRevenueTypeColor(row.original.revenueType)}>
          {getRevenueTypeLabel(row.original.revenueType)}
        </Badge>
      ),
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cell: ({ row }) => (
        <span className="font-semibold text-green-600 dark:text-green-400">
          {formatCurrency(row.original.amount)}
        </span>
      ),
    },
    {
      header: 'Date',
      accessor: 'revenueDate',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(row.original.revenueDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Description',
      accessor: 'description',
      cell: ({ row }) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {row.original.description || '-'}
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
            onClick={() => handleEdit(row.original)}
            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </Button>
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

  const onSubmit = async (formData: RevenueFormData) => {
    const payload = {
      ...formData,
      clinicId,
      ...(selectedRevenue && { id: selectedRevenue.id }),
    };

    await createOrUpdateRevenue.mutateAsync(payload);
    handleCloseModal();
  };

  const handleAdd = () => {
    setSelectedRevenue(null);
    form.reset({
      revenueType: RevenueType.Visit,
      amount: 0,
      revenueDate: new Date().toISOString().split('T')[0],
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (revenue: ClinicRevenueListDto) => {
    setSelectedRevenue(revenue);
    form.reset({
      revenueType: revenue.revenueType,
      amount: revenue.amount,
      revenueDate: revenue.revenueDate
        ? new Date(revenue.revenueDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      description: revenue.description || '',
    });

    console.log(revenue);
    setIsModalOpen(true);
  };

  const handleDelete = (revenue: ClinicRevenueListDto) => {
    setSelectedRevenue(revenue);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedRevenue) {
      await deleteRevenue.mutateAsync(selectedRevenue.id);
      setIsDeleteModalOpen(false);
      setSelectedRevenue(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
    setSelectedRevenue(null);
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
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(summary?.totalRevenue || 0)}
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
                  This Month
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(summary?.thisMonthRevenue || 0)}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Average Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(summary?.averageRevenue || 0)}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summary?.totalTransactions || 0}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
          onAddNew={handleAdd}
          additionalFilters={[
            {
              icon: <DollarSign className="w-4 h-4" />,
              label: 'Revenue Type',
              options: [
                { value: '', label: 'All Types' },
                ...Object.entries(RevenueType)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: key,
                  })),
              ],
              value: String(filter.revenueType || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  revenueType: value ? Number(value) : undefined,
                })),
            },
          ]}
        />

        {/* Table */}
        <Table<ClinicRevenueListDto>
          data={revenues?.items ?? []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize || 10,
            pageIndex: (filter.pageNumber || 1) - 1,
            pageCount: revenues?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={createOrUpdateRevenue.isPending}
            >
              {selectedRevenue ? 'Update Revenue' : 'Add Revenue'}
            </Button>
          </div>
        }
        title={selectedRevenue ? 'Edit Revenue' : 'Add New Revenue'}
      >
        <form className="space-y-6">
          <Select
            label="Revenue Type"
            required={true}
            value={String(form.watch('revenueType'))}
            {...form.register('revenueType', { valueAsNumber: true })}
            error={form.formState.errors.revenueType?.message}
            options={Object.entries(RevenueType)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => ({
                value: value.toString(),
                label: key,
              }))}
          />

          <Input
            label="Amount"
            required={true}
            type="number"
            step="0.01"
            min="0"
            startIcon={<DollarSign className="w-4 h-4" />}
            {...form.register('amount', { valueAsNumber: true })}
            error={form.formState.errors.amount?.message}
          />

          <Input
            label="Date"
            required={true}
            type="date"
            {...form.register('revenueDate')}
            error={form.formState.errors.revenueDate?.message}
          />

          <TextArea
            label="Description"
            {...form.register('description')}
            error={form.formState.errors.description?.message}
          />
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Revenue"
        message="Are you sure you want to delete this revenue record?"
        secondaryMessage="This action cannot be undone."
        variant="error"
        confirmText="Delete"
        isLoading={deleteRevenue.isPending}
      />
    </PageLayout>
  );
}
