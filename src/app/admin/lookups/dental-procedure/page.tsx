'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select } from '@/components/common/form';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { Column, Table } from '@/components/common/Table';
import PageLayout from '@/components/layouts/PageLayout';
import { useDentalProcedure } from '@/lib/api/hooks/useDentalProcedure';
import { DentalProcedureListDto } from '@/lib/api/types/dental-procedure';
import {
  DentalProcedureFormData,
  ParsedDentalProcedureData,
  dentalProcedureSchema,
} from './validation';
import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';

export default function DentalProcedurePage() {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDentalProcedure, setSelectedDentalProcedure] =
    useState<DentalProcedureListDto | null>(null);

  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    minDefaultCost: undefined as number | undefined,
    maxDefaultCost: undefined as number | undefined,
    isActive: undefined as boolean | undefined,
  });

  // Hooks
  const {
    useDentalProceduresList: getDentalProcedures,
    createDentalProcedure,
    updateDentalProcedure,
    deleteDentalProcedure,
  } = useDentalProcedure();

  const { data: dentalProcedures, isLoading } = getDentalProcedures(filter);

  const form = useForm({
    resolver: zodResolver(dentalProcedureSchema),
    defaultValues: {
      nameL: '',
      nameF: '',
      description: '',
      color: '#000000',
      defaultCost: 0,
      isActive: 'true',
    },
  });

  // Handlers
  const onSubmit = async (formData: DentalProcedureFormData) => {
    const payload: ParsedDentalProcedureData = {
      nameL: formData.nameL,
      nameF: formData.nameF,
      description: formData.description,
      color: formData.color,
      defaultCost: Number(formData.defaultCost),
      isActive: formData.isActive === 'true',
      ...(selectedDentalProcedure && { id: selectedDentalProcedure.id }),
    };

    try {
      if (selectedDentalProcedure) {
        await updateDentalProcedure.mutateAsync(payload);
      } else {
        await createDentalProcedure.mutateAsync(payload);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (dentalProcedure: DentalProcedureListDto) => {
    setSelectedDentalProcedure(dentalProcedure);
    form.reset({
      nameL: dentalProcedure.nameL,
      nameF: dentalProcedure.nameF,
      description: '',
      color: '#000000',
      defaultCost: dentalProcedure.defaultCost,
      isActive: dentalProcedure.isActive ? 'true' : 'false',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (dentalProcedure: DentalProcedureListDto) => {
    setSelectedDentalProcedure(dentalProcedure);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedDentalProcedure) {
      await deleteDentalProcedure.mutateAsync(selectedDentalProcedure.id);
      setIsDeleteModalOpen(false);
      setSelectedDentalProcedure(null);
    }
  };

  const handleAdd = () => {
    setSelectedDentalProcedure(null);
    form.reset({
      nameL: '',
      nameF: '',
      description: '',
      color: '#000000',
      defaultCost: 0,
      isActive: 'true',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
    setSelectedDentalProcedure(null);
  };

  const columns: Column<DentalProcedureListDto>[] = [
    {
      header: 'Local Name',
      accessor: 'nameL',
    },
    {
      header: 'Foreign Name',
      accessor: 'nameF',
    },
    {
      header: 'Default Cost',
      accessor: 'defaultCost',
      cell: ({ row }) => formatCurrency(row.original.defaultCost),
    },
    {
      header: 'Status',
      accessor: 'isActive',
      cell: ({ row }) => {
        const isActive = row.original?.isActive;
        if (isActive === undefined) return null;

        return (
          <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold ${
              isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </span>
        );
      },
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
      <div className="space-y-4">
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
          onAddNew={handleAdd}
        />
        {/* Table */}
        <Table<DentalProcedureListDto>
          data={dentalProcedures?.items ?? []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: dentalProcedures?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          selectedDentalProcedure
            ? 'Edit Dental Procedure'
            : 'Add New Dental Procedure'
        }
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={
                updateDentalProcedure.isPending ||
                createDentalProcedure.isPending
              }
            >
              {selectedDentalProcedure ? 'Save Changes' : 'Add Procedure'}
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <Input
            label="Local Name"
            {...form.register('nameL')}
            error={form.formState.errors.nameL?.message}
          />
          <Input
            label="Foreign Name"
            {...form.register('nameF')}
            error={form.formState.errors.nameF?.message}
          />
          <Input
            label="Description"
            {...form.register('description')}
            error={form.formState.errors.description?.message}
          />
          <Input
            label="Color"
            type="color"
            {...form.register('color')}
            error={form.formState.errors.color?.message}
          />
          <Input
            label="Default Cost"
            type="text"
            inputMode="decimal"
            {...form.register('defaultCost')}
            error={form.formState.errors.defaultCost?.message}
          />
          <Select
            label="Status"
            {...form.register('isActive')}
            error={form.formState.errors.isActive?.message}
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
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        secondaryMessage="This action cannot be undone."
        variant="error"
        confirmText="Delete"
        isLoading={deleteDentalProcedure.isPending}
      />
    </PageLayout>
  );
}
