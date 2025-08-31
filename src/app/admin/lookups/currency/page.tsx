'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Trash2, Star, StarOff } from 'lucide-react';
import { FiList } from 'react-icons/fi';

import Button from '@/components/common/Button';
import { Input, Select } from '@/components/common/form';
import { Table, type Column } from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import PageLayout from '@/components/layouts/PageLayout';

import { useCurrency } from '@/lib/api/hooks/useCurrency';
import { currencySchema, type CurrencyFormData } from './validation';
import { type CurrencyListDto } from '@/lib/api/types/currency';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { ConfirmationModal } from '@/components/common';

type ParsedCurrencyData = Omit<CurrencyFormData, 'isActive' | 'isDefault'> & {
  isActive: boolean;
  isDefault: boolean;
  id?: string;
};

export default function CurrencyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyListDto | null>(null);

  // States
  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 10,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    isActive: undefined as boolean | undefined,
    isDefault: undefined as boolean | undefined,
    code: undefined as string | undefined,
  });

  // Hooks
  const {
    useCurrenciesList: getCurrencies,
    createCurrency,
    updateCurrency,
    deleteCurrency,
    setDefaultCurrency,
  } = useCurrency();

  const { data: currenciesResponse, isLoading } = getCurrencies(filter);

  // Form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CurrencyFormData>({
    resolver: zodResolver(currencySchema),
    defaultValues: {
      code: '',
      symbol: '',
      nameL: '',
      nameF: '',
      decimalPlaces: 2,
      isDefault: false,
      isActive: 'true',
      exchangeRate: undefined,
      exchangeRateDate: undefined,
    },
  });

  // Handlers
  const onSubmit: SubmitHandler<CurrencyFormData> = async (formData) => {
    const payload: ParsedCurrencyData = {
      code: formData.code.toUpperCase(),
      symbol: formData.symbol,
      nameL: formData.nameL,
      nameF: formData.nameF,
      decimalPlaces: formData.decimalPlaces,
      isDefault: formData.isDefault,
      isActive: formData.isActive === 'true',
      exchangeRate: formData.exchangeRate,
      exchangeRateDate: formData.exchangeRateDate || undefined,
      ...(selectedCurrency && { id: selectedCurrency.id }),
    };

    try {
      if (selectedCurrency) {
        await updateCurrency.mutateAsync(payload);
      } else {
        await createCurrency.mutateAsync(payload);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleAddClick = () => {
    reset({
      code: '',
      symbol: '',
      nameL: '',
      nameF: '',
      decimalPlaces: 2,
      isDefault: false,
      isActive: 'true',
      exchangeRate: undefined,
      exchangeRateDate: undefined,
    });
    setSelectedCurrency(null);
    setIsModalOpen(true);
  };

  const handleEdit = (currency: CurrencyListDto) => {
    setSelectedCurrency(currency);
    reset({
      code: currency.code,
      symbol: currency.symbol,
      nameL: currency.nameL,
      nameF: currency.nameF,
      decimalPlaces: currency.decimalPlaces,
      isDefault: currency.isDefault,
      isActive: currency.isActive ? 'true' : 'false',
      exchangeRate: currency.exchangeRate,
      exchangeRateDate: currency.exchangeRateDate,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (currency: CurrencyListDto) => {
    setSelectedCurrency(currency);
    setIsDeleteModalOpen(true);
  };

  const handleSetDefault = async (currency: CurrencyListDto) => {
    try {
      await setDefaultCurrency.mutateAsync(currency.id);
    } catch (error) {
      console.error('Error setting default currency:', error);
    }
  };

  const confirmDelete = async () => {
    if (selectedCurrency) {
      await deleteCurrency.mutateAsync(selectedCurrency.id);
      setIsDeleteModalOpen(false);
      setSelectedCurrency(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCurrency(null);
    reset();
  };

  // Table columns
  const columns: Column<CurrencyListDto>[] = [
    {
      header: 'Code',
      accessor: 'code',
    },
    {
      header: 'Symbol',
      accessor: 'symbol',
    },
    {
      header: 'Local Name',
      accessor: 'nameL',
    },
    {
      header: 'Foreign Name',
      accessor: 'nameF',
    },
    {
      header: 'Decimal Places',
      accessor: 'decimalPlaces',
    },
    {
      header: 'Default',
      accessor: 'isDefault',
      cell: ({ row }: { row: { original: CurrencyListDto } }) => (
        <div className="flex items-center gap-2">
          {row.original.isDefault ? (
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          ) : (
            <StarOff className="w-4 h-4 text-gray-400" />
          )}
          <span className="text-sm">
            {row.original.isDefault ? 'Default' : 'Not Default'}
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'isActive',
      cell: ({ row }: { row: { original: CurrencyListDto } }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.original.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: ({ row }: { row: { original: CurrencyListDto } }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          {!row.original.isDefault && (
            <button
              onClick={() => handleSetDefault(row.original)}
              className="p-1 text-yellow-600 hover:text-yellow-800 transition-colors"
              title="Set as Default"
            >
              <Star className="w-4 h-4" />
            </button>
          )}
          {!row.original.isDefault && (
            <button
              onClick={() => handleDelete(row.original)}
              className="p-1 text-red-600 hover:text-red-800 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Search and Filter Bar */}
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
          onAddNew={handleAddClick}
          additionalFilters={[
            {
              icon: <FiList className="w-4 h-4" />,
              label: 'Default Status',
              options: [
                { value: '', label: 'All' },
                { value: 'true', label: 'Default' },
                { value: 'false', label: 'Not Default' },
              ],
              value: String(filter.isDefault || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  isDefault:
                    value === 'true'
                      ? true
                      : value === 'false'
                      ? false
                      : undefined,
                })),
            },
          ]}
        />

        <Table<CurrencyListDto>
          data={currenciesResponse?.items || []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: currenciesResponse?.totalPages || 0,
            onPageChange: (pageIndex: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: pageIndex + 1 })),
          }}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              isLoading={updateCurrency.isPending || createCurrency.isPending}
            >
              {selectedCurrency ? 'Save Changes' : 'Add Currency'}
            </Button>
          </div>
        }
        title={`${selectedCurrency ? 'Edit' : 'Add'} Currency`}
        maxWidth="2xl"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Currency Code"
              error={errors.code?.message}
              {...register('code')}
              placeholder="USD"
              maxLength={10}
            />
            <Input
              label="Currency Symbol"
              error={errors.symbol?.message}
              {...register('symbol')}
              placeholder="$"
              maxLength={10}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Local Name"
              error={errors.nameL?.message}
              {...register('nameL')}
              placeholder="الدولار الأمريكي"
            />
            <Input
              label="Foreign Name"
              error={errors.nameF?.message}
              {...register('nameF')}
              placeholder="US Dollar"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Decimal Places"
              type="number"
              error={errors.decimalPlaces?.message}
              {...register('decimalPlaces', { valueAsNumber: true })}
              min={0}
              max={4}
            />
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('isDefault')}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Set as Default
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Exchange Rate"
              type="number"
              step="0.0001"
              error={errors.exchangeRate?.message}
              {...register('exchangeRate', { valueAsNumber: true })}
              placeholder="1.00"
            />
            <Input
              label="Exchange Rate Date"
              type="date"
              error={errors.exchangeRateDate?.message}
              {...register('exchangeRateDate')}
            />
          </div>

          <Select
            label="Status"
            value={watch('isActive')}
            error={errors.isActive?.message}
            {...register('isActive')}
            options={[
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Inactive' },
            ]}
          />
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Currency"
        message="Are you sure you want to delete this currency?"
        secondaryMessage="This action cannot be undone."
        variant="error"
        confirmText="Delete"
        isLoading={deleteCurrency.isPending}
      />
    </PageLayout>
  );
}
