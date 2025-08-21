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
  TrendingDown,
  Calendar,
  FileText,
} from 'lucide-react';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { useExpense } from '@/lib/api/hooks/useExpense';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { ExpenseType, ClinicExpenseListDto } from '@/lib/api/types/expense';
import { ExpenseFormData, expenseSchema } from './validation';

export default function ExpensesPage() {
  const { user } = useAuth();
  const clinicId = user?.clinicInfo?.id || '';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] =
    useState<ClinicExpenseListDto | null>(null);

  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 10,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    expenseType: undefined,
    fromDate: undefined,
    toDate: undefined,
  });

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      expenseType: ExpenseType.Rent,
      amount: 0,
      expenseDate: new Date().toISOString().split('T')[0],
      description: '',
    },
  });

  // API Hooks
  const {
    useExpensesList,
    useExpenseSummary,
    createOrUpdateExpense,
    deleteExpense,
  } = useExpense();

  // Get data
  const { data: expenses, isLoading } = useExpensesList(filter);
  const { data: summary, isLoading: isLoadingSummary } = useExpenseSummary({});

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getExpenseTypeColor = (type: ExpenseType) => {
    const colors: { [key: number]: string } = {
      [ExpenseType.Rent]:
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      [ExpenseType.Utilities]:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      [ExpenseType.Salaries]:
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      [ExpenseType.Supplies]:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      [ExpenseType.Equipment]:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      [ExpenseType.Maintenance]:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      [ExpenseType.Insurance]:
        'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      [ExpenseType.Marketing]:
        'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      [ExpenseType.Other]:
        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    };
    return colors[type] || colors[ExpenseType.Other];
  };

  const getExpenseTypeLabel = (type: ExpenseType) => {
    const labels: { [key: number]: string } = {
      [ExpenseType.Rent]: 'Rent',
      [ExpenseType.Utilities]: 'Utilities',
      [ExpenseType.Salaries]: 'Salaries',
      [ExpenseType.Supplies]: 'Supplies',
      [ExpenseType.Equipment]: 'Equipment',
      [ExpenseType.Maintenance]: 'Maintenance',
      [ExpenseType.Insurance]: 'Insurance',
      [ExpenseType.Marketing]: 'Marketing',
      [ExpenseType.Other]: 'Other',
    };
    return labels[type] || 'Other';
  };

  const columns: Column<ClinicExpenseListDto>[] = [
    {
      header: 'Expense Type',
      accessor: 'expenseType',
      cell: ({ row }) => (
        <Badge className={getExpenseTypeColor(row.original.expenseType)}>
          {getExpenseTypeLabel(row.original.expenseType)}
        </Badge>
      ),
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cell: ({ row }) => (
        <span className="font-semibold text-red-600 dark:text-red-400">
          {formatCurrency(row.original.amount)}
        </span>
      ),
    },
    {
      header: 'Date',
      accessor: 'expenseDate',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(row.original.expenseDate).toLocaleDateString()}
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

  const onSubmit = async (formData: ExpenseFormData) => {
    const payload = {
      ...formData,
      clinicId,
      ...(selectedExpense && { id: selectedExpense.id }),
    };

    await createOrUpdateExpense.mutateAsync(payload);
    handleCloseModal();
  };

  const handleAdd = () => {
    setSelectedExpense(null);
    form.reset({
      expenseType: ExpenseType.Rent,
      amount: 0,
      expenseDate: new Date().toISOString().split('T')[0],
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (expense: ClinicExpenseListDto) => {
    setSelectedExpense(expense);
    form.reset({
      expenseType: expense.expenseType,
      amount: expense.amount,
      expenseDate: expense.expenseDate
        ? new Date(expense.expenseDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      description: expense.description || '',
    });

    console.log(expense);
    setIsModalOpen(true);
  };

  const handleDelete = (expense: ClinicExpenseListDto) => {
    setSelectedExpense(expense);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedExpense) {
      await deleteExpense.mutateAsync(selectedExpense.id);
      setIsDeleteModalOpen(false);
      setSelectedExpense(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
    setSelectedExpense(null);
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
                  Total Expenses
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(summary?.totalExpenses || 0)}
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <DollarSign className="w-6 h-6 text-red-600 dark:text-red-400" />
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
                  {formatCurrency(summary?.thisMonthExpenses || 0)}
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
                  Average Expenses
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(summary?.averageExpenses || 0)}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <TrendingDown className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
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
              label: 'Expense Type',
              options: [
                { value: '', label: 'All Types' },
                ...Object.entries(ExpenseType)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: key,
                  })),
              ],
              value: String(filter.expenseType || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  expenseType: value ? Number(value) : undefined,
                })),
            },
          ]}
        />

        {/* Table */}
        <Table<ClinicExpenseListDto>
          data={expenses?.items ?? []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize || 10,
            pageIndex: (filter.pageNumber || 1) - 1,
            pageCount: expenses?.totalPages || 0,
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
              isLoading={createOrUpdateExpense.isPending}
            >
              {selectedExpense ? 'Update Expense' : 'Add Expense'}
            </Button>
          </div>
        }
        title={selectedExpense ? 'Edit Expense' : 'Add New Expense'}
      >
        <form className="space-y-6">
          <Select
            label="Expense Type"
            required={true}
            value={String(form.watch('expenseType'))}
            {...form.register('expenseType', { valueAsNumber: true })}
            error={form.formState.errors.expenseType?.message}
            options={Object.entries(ExpenseType)
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
            {...form.register('expenseDate')}
            error={form.formState.errors.expenseDate?.message}
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
        title="Delete Expense"
        message="Are you sure you want to delete this expense record?"
        secondaryMessage="This action cannot be undone."
        variant="error"
        confirmText="Delete"
        isLoading={deleteExpense.isPending}
      />
    </PageLayout>
  );
}
