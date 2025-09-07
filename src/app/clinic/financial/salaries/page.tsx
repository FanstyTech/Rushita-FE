'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, TextArea } from '@/components/common/form';
import { Button } from '@/components/ui/button';
import Modal from '@/components/common/Modal';
import { Column, Table } from '@/components/common/Table';
import PageLayout from '@/components/layouts/PageLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, DollarSign, Users, Calendar } from 'lucide-react';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { useSalary } from '@/lib/api/hooks/useSalary';
import { createSalarySchema, type SalaryFormData } from './validation';
import { SalaryStatus, StaffSalaryListDto } from '@/lib/api/types/salary';
import { GetClinicStaffForDropdownInput } from '@/lib/api/types/clinic-staff';
import { useClinicStaff } from '@/lib/api/hooks/useClinicStaff';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { formatDate } from '@/utils/dateTimeUtils';
import {
  getSalaryStatusColor,
  getStaffTypeColor,
  getStaffTypeLabel,
} from '@/utils/textUtils';

export default function SalariesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const clinicId = user?.clinicInfo?.id || '';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] =
    useState<StaffSalaryListDto | null>(null);

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

  const form = useForm<SalaryFormData>({
    resolver: zodResolver(createSalarySchema(t)),
    defaultValues: {
      staffId: '',
      amount: 0,
      salaryMonth: new Date().toISOString().slice(0, 7),
      status: SalaryStatus.Pending,
      paidDate: '',
      notes: '',
    },
  });
  // Create staff filter with debounced search
  const staffFilter = useMemo<GetClinicStaffForDropdownInput>(
    () => ({
      clinicId,
      filter: '', // Note: API expects 'filter'
    }),
    [clinicId]
  );

  // API hooks
  const {
    useGetSalaries,
    useGetSalarySummary,
    useCreateOrUpdateSalary,
    useDeleteSalary,
  } = useSalary();
  const { useClinicStaffForDropdown } = useClinicStaff();

  const { data: salariesData, isLoading } = useGetSalaries(filter);
  const { data: summaryData } = useGetSalarySummary({});

  const createUpdateSalaryMutation = useCreateOrUpdateSalary();
  const deleteSalaryMutation = useDeleteSalary();

  // Hooks
  const { data: doctors } = useClinicStaffForDropdown(staffFilter);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getSalaryStatusLabel = (status: SalaryStatus) => {
    const labels: { [key: number]: string } = {
      [SalaryStatus.Pending]: t('clinic.financial.salaries.statuses.pending'),
      [SalaryStatus.Paid]: t('clinic.financial.salaries.statuses.paid'),
      [SalaryStatus.Cancelled]: t(
        'clinic.financial.salaries.statuses.cancelled'
      ),
    };
    return labels[status] || t('clinic.financial.salaries.statuses.pending');
  };

  const columns: Column<StaffSalaryListDto>[] = [
    {
      header: t('clinic.financial.salaries.table.columns.staffName'),
      accessor: 'staffName',
      cell: ({ row }) => (
        <div>
          <span className="font-medium text-gray-900 dark:text-white">
            {row.original.staffName}
          </span>
          <Badge
            className={`ml-2 ${getStaffTypeColor(row.original.staffType)}`}
          >
            {getStaffTypeLabel(row.original.staffType)}
          </Badge>
        </div>
      ),
    },
    {
      header: t('clinic.financial.salaries.table.columns.amount'),
      accessor: 'amount',
      cell: ({ row }) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          {formatCurrency(row.original.amount)}
        </span>
      ),
    },
    {
      header: t('clinic.financial.salaries.table.columns.salaryMonth'),
      accessor: 'salaryMonth',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {formatDate(row.original.salaryMonth || '')}
        </span>
      ),
    },
    {
      header: t('clinic.financial.salaries.table.columns.status'),
      accessor: 'status',
      cell: ({ row }) => (
        <Badge className={getSalaryStatusColor(row.original.status)}>
          {getSalaryStatusLabel(row.original.status)}
        </Badge>
      ),
    },
    {
      header: t('clinic.financial.salaries.table.columns.paidDate'),
      accessor: 'paidDate',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {row.original.paidDate
            ? new Date(row.original.paidDate).toLocaleDateString()
            : '-'}
        </span>
      ),
    },
    {
      header: t('clinic.financial.salaries.table.columns.notes'),
      accessor: 'notes',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {row.original.notes || '-'}
        </span>
      ),
    },
    {
      header: t('clinic.financial.salaries.table.columns.actions'),
      accessor: 'id',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => handleEdit(row.original)}
            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            title={t('clinic.financial.salaries.actions.edit')}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleDelete(row.original)}
            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            title={t('clinic.financial.salaries.actions.delete')}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const onSubmit = async (formData: SalaryFormData) => {
    const payload = {
      ...formData,
      ...(selectedSalary && { id: selectedSalary.id }),
    };

    await createUpdateSalaryMutation.mutateAsync(payload);
    handleCloseModal();
  };

  const handleAdd = () => {
    setSelectedSalary(null);
    form.reset({
      staffId: '',
      amount: 0,
      salaryMonth: new Date().toISOString().split('T')[0],
      status: SalaryStatus.Pending,
      paidDate: '',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (salary: StaffSalaryListDto) => {
    setSelectedSalary(salary);
    form.reset({
      staffId: salary.staffId,
      amount: salary.amount,
      salaryMonth: salary.salaryMonth
        ? new Date(salary.salaryMonth).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      status: salary.status,
      paidDate: salary.paidDate
        ? new Date(salary.paidDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      notes: salary.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (salary: StaffSalaryListDto) => {
    setSelectedSalary(salary);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedSalary) {
      try {
        await deleteSalaryMutation.mutateAsync(selectedSalary.id);
        setIsDeleteModalOpen(false);
        setSelectedSalary(null);
      } catch (error) {
        console.error('Error deleting salary:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
    setSelectedSalary(null);
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
                  {t('clinic.financial.salaries.summary.cards.totalSalaries')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summaryData?.totalSalaries || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t('clinic.financial.salaries.summary.cards.totalAmount')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(summaryData?.totalAmount || 0)}
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
                  {t('clinic.financial.salaries.summary.cards.totalPaid')}
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(summaryData?.totalPaid || 0)}
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
                  {t('clinic.financial.salaries.summary.cards.pendingSalaries')}
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {summaryData?.pendingSalaries || 0}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatCurrency(summaryData?.pendingAmount || 0)}{' '}
                  {t('clinic.financial.salaries.summary.cards.pending')}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
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
              icon: <Users className="w-4 h-4" />,
              label: t('clinic.financial.salaries.filters.status'),
              options: [
                {
                  value: '',
                  label: t('clinic.financial.salaries.filters.allStatuses'),
                },
                ...Object.entries(SalaryStatus)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: t(
                      `clinic.financial.salaries.statuses.${key.toLowerCase()}`
                    ),
                  })),
              ],

              value: String(filter.status || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  status: value || undefined,
                })),
            },
          ]}
        />

        {/* Table */}
        <Table<StaffSalaryListDto>
          data={salariesData?.items || []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize || 10,
            pageIndex: (filter.pageNumber || 1) - 1,
            pageCount: salariesData?.totalPages || 0,
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
              {t('clinic.financial.salaries.actions.cancel')}
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={createUpdateSalaryMutation.isPending}
            >
              {selectedSalary
                ? t('clinic.financial.salaries.actions.updateSalary')
                : t('clinic.financial.salaries.actions.addSalary')}
            </Button>
          </div>
        }
        title={
          selectedSalary
            ? t('clinic.financial.salaries.form.title.edit')
            : t('clinic.financial.salaries.form.title.add')
        }
      >
        <form className="space-y-6">
          <Select
            label={t('clinic.financial.salaries.form.labels.staffMember')}
            required={true}
            value={form.watch('staffId')}
            {...form.register('staffId')}
            error={form.formState.errors.staffId?.message}
            options={doctors || []}
          />

          <Input
            label={t('clinic.financial.salaries.form.labels.amount')}
            required={true}
            type="number"
            step="0.01"
            min="0"
            startIcon={<DollarSign className="w-4 h-4" />}
            {...form.register('amount', { valueAsNumber: true })}
            error={form.formState.errors.amount?.message}
          />

          <Input
            label={t('clinic.financial.salaries.form.labels.salaryMonth')}
            required={true}
            type="date"
            {...form.register('salaryMonth')}
            error={form.formState.errors.salaryMonth?.message}
          />

          <Select
            label={t('clinic.financial.salaries.form.labels.status')}
            required={true}
            value={form.watch('status').toString()}
            {...form.register('status')}
            error={form.formState.errors.status?.message}
            options={Object.entries(SalaryStatus)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => ({
                value: value.toString(),
                label: t(
                  `clinic.financial.salaries.statuses.${key.toLowerCase()}`
                ),
              }))}
          />

          <Input
            label={t('clinic.financial.salaries.form.labels.paidDate')}
            type="date"
            {...form.register('paidDate')}
            error={form.formState.errors.paidDate?.message}
          />

          <TextArea
            label={t('clinic.financial.salaries.form.labels.notes')}
            {...form.register('notes')}
            error={form.formState.errors.notes?.message}
          />
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={t('clinic.financial.salaries.deleteModal.title')}
        message={t('clinic.financial.salaries.deleteModal.message')}
        secondaryMessage={t(
          'clinic.financial.salaries.deleteModal.secondaryMessage'
        )}
        variant="error"
        confirmText={t('clinic.financial.salaries.deleteModal.confirmText')}
        isLoading={deleteSalaryMutation.isPending}
      />
    </PageLayout>
  );
}
