'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Search as FiSearch,
  Pencil,
  Trash2,
  PlusIcon,
  List as FiList,
} from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import { Input, Select } from '@/components/common/form';
import Dropdown from '@/components/common/Dropdown';
import { Column, Table } from '@/components/common/Table';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { ConfirmationModal } from '@/components/common';
import { useClinicType } from '@/lib/api/hooks/useClinicType';
import type {
  ClinicTypeListDto,
  ClinicTypeFilterDto,
} from '@/lib/api/types/clinic-type';
import {
  clinicTypeSchema,
  ClinicTypeFormData,
  ParsedClinicTypeData,
} from './validation';
import FilterBar, { FilterState } from '@/components/common/FilterBar';

export default function ClinicTypePage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // States
  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    isActive: undefined,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClinicType, setSelectedClinicType] =
    useState<ClinicTypeListDto | null>(null);

  // Hooks
  const {
    getClinicTypes,
    createClinicType,
    updateClinicType,
    deleteClinicType,
  } = useClinicType();
  const { data: clinicTypesData, isLoading } = getClinicTypes(filter);

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClinicTypeFormData>({
    resolver: zodResolver(clinicTypeSchema),
    defaultValues: {
      nameL: '',
      nameF: '',
      isActive: 'true' as const,
    },
  });

  // Handlers
  const onSubmit: SubmitHandler<ClinicTypeFormData> = async (formData) => {
    const payload: ParsedClinicTypeData = {
      nameL: formData.nameL,
      nameF: formData.nameF,
      isActive: formData.isActive === 'true',
      ...(selectedClinicType && { id: selectedClinicType.id }),
    };

    if (selectedClinicType) {
      await updateClinicType.mutate(payload);
    } else {
      await createClinicType.mutate(payload);
    }
    handleCloseModal();
  };

  const handleAddClick = () => {
    reset({
      nameL: '',
      nameF: '',
      isActive: 'true',
    });
    setSelectedClinicType(null);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setFilter({
      pageNumber: 1,
      pageSize: 5,
      sortColumn: '',
      sortDirection: '',
      searchValue: '',
      isActive: undefined,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClinicType(null);
    reset();
  };

  const handleEdit = (clinicType: ClinicTypeListDto) => {
    setSelectedClinicType(clinicType);
    reset({
      nameL: clinicType.nameL,
      nameF: clinicType.nameF,
      isActive: clinicType.isActive ? 'true' : 'false',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (clinicType: ClinicTypeListDto) => {
    setSelectedClinicType(clinicType);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedClinicType) {
      await deleteClinicType.mutateAsync(selectedClinicType.id);
      setIsDeleteModalOpen(false);
      setSelectedClinicType(null);
    }
  };

  // Table columns
  const columns: Column<ClinicTypeListDto>[] = [
    {
      header: 'Local Name',
      accessor: 'nameL',
    },
    {
      header: 'Foreign Name',
      accessor: 'nameF',
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
        <Table<ClinicTypeListDto>
          data={clinicTypesData?.items ?? []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: clinicTypesData?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`${selectedClinicType ? 'Edit' : 'Add'} Clinic Type`}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Local Name"
              {...register('nameL')}
              error={errors.nameL?.message}
            />
            <Input
              label="Foreign Name"
              {...register('nameF')}
              error={errors.nameF?.message}
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
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {selectedClinicType ? 'Update' : 'Create'}
              </Button>
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
          isLoading={deleteClinicType.isPending}
        />
      </div>
    </PageLayout>
  );
}
