'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import PageLayout from '@/components/layouts/PageLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Trash2 } from 'lucide-react';
import { Input, Select } from '@/components/common/form';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { Column, Table } from '@/components/common/Table';
import { useCountry } from '@/lib/api/hooks/useCountry';
import {
  countrySchema,
  CountryFormData,
  ParsedCountryData,
} from './validation';
import type { CountryListDto } from '@/lib/api/types/country';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';

export default function CountryPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // States
  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    isActive: undefined as boolean | undefined,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryListDto | null>(
    null
  );

  // Hooks
  const {
    useCountriesList: getCountries,
    createCountry,
    updateCountry,
    deleteCountry,
  } = useCountry();

  const { data: countriesData, isLoading } = getCountries(filter);

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CountryFormData>({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      nameL: '',
      nameF: '',
      code: '',
      phoneCode: '',
      isActive: 'true' as const,
    },
  });

  // Handlers
  const onSubmit: SubmitHandler<CountryFormData> = async (formData) => {
    const payload: ParsedCountryData = {
      ...formData,
      isActive: formData.isActive === 'true',
      ...(selectedCountry && { id: selectedCountry.id }),
    };

    if (selectedCountry) {
      updateCountry.mutate(payload);
    } else {
      createCountry.mutate(payload);
    }
    handleCloseModal();
  };
  const handleAddClick = () => {
    reset({
      nameL: '',
      nameF: '',
      phoneCode: '',
      code: '',
      isActive: 'true',
    });
    setSelectedCountry(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
    reset();
  };

  const handleEdit = (country: CountryListDto) => {
    setSelectedCountry(country);
    reset({
      nameL: country.nameL,
      nameF: country.nameF,
      phoneCode: country.phoneCode || '',
      code: country.code || '',
      isActive: country.isActive ? 'true' : 'false',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (specialty: CountryListDto) => {
    setSelectedCountry(specialty);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCountry) {
      await deleteCountry.mutateAsync(selectedCountry.id);
      setIsDeleteModalOpen(false);
      setSelectedCountry(null);
    }
  };

  // Table columns
  const columns: Column<CountryListDto>[] = [
    {
      header: 'Local Name',
      accessor: 'nameL',
    },
    {
      header: 'Foreign Name',
      accessor: 'nameF',
    },
    {
      header: 'Code',
      accessor: 'code',
    },
    {
      header: 'Phone Code',
      accessor: 'phoneCode',
    },
    {
      header: 'Status',
      accessor: 'isActive',
      cell: ({ row }) => (
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
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.original)}
            className="p-1 text-red-600 hover:text-red-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
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
        />
        {/* Table */}
        <Table<CountryListDto>
          data={countriesData?.items || []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: countriesData?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
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
              isLoading={updateCountry.isPending || updateCountry.isPending}
            >
              {selectedCountry ? 'Save Changes' : 'Add Country'}
            </Button>
          </div>
        }
        title={`${selectedCountry ? 'Edit' : 'Add'} Country`}
        maxWidth="2xl"
      >
        <form className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Name (Local)"
              {...register('nameL')}
              error={errors.nameL?.message}
            />
            <Input
              label="Name (Foreign)"
              {...register('nameF')}
              error={errors.nameF?.message}
            />
            <Input
              label="Country Code"
              {...register('code')}
              error={errors.code?.message}
            />{' '}
            <Input
              label="Phone Code"
              {...register('phoneCode')}
              error={errors.code?.message}
            />
            <Select
              label="Status"
              {...register('isActive')}
              error={errors.isActive?.message}
              options={[
                { value: 'true', label: 'Active' },
                { value: 'false', label: 'Inactive' },
              ]}
            />
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        secondaryMessage="This action cannot be undone."
        variant="error"
        confirmText="Delete"
        isLoading={deleteCountry.isPending}
      />
    </PageLayout>
  );
}
