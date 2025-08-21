'use client';

import { useState, useMemo } from 'react';
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
import { salarySchema, type SalaryFormData } from './validation';
import { SalaryStatus, StaffSalaryListDto } from '@/lib/api/types/salary';
import {
  GetClinicStaffForDropdownInput,
  StaffType,
} from '@/lib/api/types/clinic-staff';
import { useClinicStaff } from '@/lib/api/hooks/useClinicStaff';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { formatDate } from '@/utils/dateTimeUtils';
import {
  getSalaryStatusColor,
  getStaffTypeColor,
  getStaffTypeLabel,
} from '@/utils/textUtils';

export default function SalariesPage() {
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
    resolver: zodResolver(salarySchema),
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

  const columns: Column<StaffSalaryListDto>[] = [
    {
      header: 'Staff Name',
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
      header: 'Amount',
      accessor: 'amount',
      cell: ({ row }) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          {formatCurrency(row.original.amount)}
        </span>
      ),
    },
    {
      header: 'Salary Month',
      accessor: 'salaryMonth',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {formatDate(row.original.salaryMonth || '')}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: ({ row }) => (
        <Badge className={getSalaryStatusColor(row.original.status)}>
          {SalaryStatus[row.original.status]}
        </Badge>
      ),
    },
    {
      header: 'Paid Date',
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
      header: 'Notes',
      accessor: 'notes',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {row.original.notes || '-'}
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
                  Total Salaries
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
                  Total Amount
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
                  Total Paid
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
                  Pending Salaries
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {summaryData?.pendingSalaries || 0}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatCurrency(summaryData?.pendingAmount || 0)} pending
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
              label: 'Status',
              options: [
                { value: '', label: 'All Statuses' },
                ...Object.entries(SalaryStatus)
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
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={createUpdateSalaryMutation.isPending}
            >
              {selectedSalary ? 'Update Salary' : 'Add Salary'}
            </Button>
          </div>
        }
        title={selectedSalary ? 'Edit Salary' : 'Add New Salary'}
      >
        <form className="space-y-6">
          <Select
            label="Staff Member"
            required={true}
            value={form.watch('staffId')}
            {...form.register('staffId')}
            error={form.formState.errors.staffId?.message}
            options={doctors || []}
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
            label="Salary Month"
            required={true}
            type="date"
            {...form.register('salaryMonth')}
            error={form.formState.errors.salaryMonth?.message}
          />

          <Select
            label="Status"
            required={true}
            value={form.watch('status').toString()}
            {...form.register('status')}
            error={form.formState.errors.status?.message}
            options={Object.entries(SalaryStatus)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => ({
                value: value.toString(),
                label: key,
              }))}
          />

          <Input
            label="Paid Date"
            type="date"
            {...form.register('paidDate')}
            error={form.formState.errors.paidDate?.message}
          />

          <TextArea
            label="Notes"
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
        title="Delete Salary"
        message="Are you sure you want to delete this salary record?"
        secondaryMessage="This action cannot be undone."
        variant="error"
        confirmText="Delete"
        isLoading={deleteSalaryMutation.isPending}
      />
    </PageLayout>
  );
}
