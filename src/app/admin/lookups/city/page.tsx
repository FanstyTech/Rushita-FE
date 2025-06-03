'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Trash2 } from 'lucide-react';
import { FiList } from 'react-icons/fi';

import Button from '@/components/common/Button';
import { Input, Select } from '@/components/common/form';
import { Table, type Column } from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import PageLayout from '@/components/layouts/PageLayout';

import { useCity } from '@/lib/api/hooks/useCity';
import { useCountry } from '@/lib/api/hooks/useCountry';
import { citySchema, type CityFormData } from './validation';
import { type CityListDto } from '@/lib/api/types/city';
import { type SelectOption } from '@/lib/api/types/select-option';
import FilterBar, { FilterState } from '@/components/common/FilterBar';

type ParsedCityData = Omit<CityFormData, 'isActive'> & {
  isActive: boolean;
  id?: string;
};

export default function CityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityListDto | null>(null);

  // States
  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    isActive: undefined as boolean | undefined,
    countryId: undefined as string | undefined,
  });

  // Hooks
  const {
    useCitiesList: getCities,
    createCity,
    updateCity,
    deleteCity,
  } = useCity();
  const { useCountryDropdown: getCountryForDropdown } = useCountry();

  const { data: citiesResponse, isLoading } = getCities(filter);

  const { data: countriesResponse } = getCountryForDropdown();

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CityFormData>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      nameL: '',
      nameF: '',
      countryId: '',
      isActive: 'true',
    },
  });

  // Handlers
  const onSubmit: SubmitHandler<CityFormData> = async (formData) => {
    const payload: ParsedCityData = {
      nameL: formData.nameL,
      nameF: formData.nameF,
      countryId: formData.countryId,
      isActive: formData.isActive === 'true',
      ...(selectedCity && { id: selectedCity.id }),
    };

    try {
      if (selectedCity) {
        await updateCity.mutateAsync(payload);
      } else {
        await createCity.mutateAsync(payload);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleAddClick = () => {
    reset({
      nameL: '',
      nameF: '',
      countryId: '',
      isActive: 'true',
    });
    setSelectedCity(null);
    setIsModalOpen(true);
  };

  const handleEdit = (city: CityListDto) => {
    setSelectedCity(city);
    reset({
      nameL: city.nameL,
      nameF: city.nameF,
      countryId: city.countryId,
      isActive: city.isActive ? 'true' : 'false',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (city: CityListDto) => {
    setSelectedCity(city);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCity) {
      await deleteCity.mutateAsync(selectedCity.id);
      setIsDeleteModalOpen(false);
      setSelectedCity(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCity(null);
    reset();
  };

  // Table columns
  const columns: Column<CityListDto>[] = [
    {
      header: 'Local Name',
      accessor: 'nameL',
    },
    {
      header: 'Foreign Name',
      accessor: 'nameF',
    },
    {
      header: 'Country',
      accessor: 'countryName',
    },
    {
      header: 'Status',
      accessor: 'isActive',
      cell: ({ row }: { row: { original: CityListDto } }) => (
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
      cell: ({ row }: { row: { original: CityListDto } }) => (
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
          additionalFilters={[
            {
              icon: <FiList className="w-4 h-4" />,
              label: 'Country',
              options: [
                { value: '', label: 'All Countries' },
                ...(countriesResponse?.map((country: SelectOption<string>) => ({
                  value: country.value,
                  label: country.label || '',
                })) || []),
              ],
              value: String(filter.countryId || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  countryId: value,
                })),
            },
          ]}
        />
        <Table<CityListDto>
          data={citiesResponse?.items || []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: citiesResponse?.totalPages || 0,

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
              isLoading={updateCity.isPending || createCity.isPending}
            >
              {selectedCity ? 'Save Changes' : 'Add Country'}
            </Button>
          </div>
        }
        title={`${selectedCity ? 'Edit' : 'Add'} City`}
        maxWidth="2xl"
      >
        <form className="space-y-4">
          <Input
            label="Local Name"
            error={errors.nameL?.message}
            {...register('nameL')}
          />
          <Input
            label="Foreign Name"
            error={errors.nameF?.message}
            {...register('nameF')}
          />
          <Select
            label="Country"
            error={errors.countryId?.message}
            {...register('countryId')}
            options={[
              { value: '', label: 'Select Country' },
              ...(countriesResponse || []).map(
                (country: SelectOption<string>) => ({
                  value: country.value,
                  label: country.label || '', // Provide empty string as fallback
                })
              ),
            ]}
          />
          <Select
            label="Status"
            error={errors.isActive?.message}
            {...register('isActive')}
            options={[
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Inactive' },
            ]}
          />
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete City"
        onClose={() => setIsDeleteModalOpen(false)}
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedCity(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              isLoading={deleteCity.isPending}
            >
              Delete
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete{' '}
            <span className="font-medium">{selectedCity?.nameL}</span>? This
            action cannot be undone.
          </p>
        </div>
      </Modal>
    </PageLayout>
  );
}
