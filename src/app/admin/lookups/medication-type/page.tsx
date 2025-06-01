'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Input, Select, TextArea } from '@/components/common/form';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { Column, Table } from '@/components/common/Table';
import PageLayout from '@/components/layouts/PageLayout';
import { useMedicationType } from '@/lib/api/hooks/useMedicationType';
import { MedicationTypeListDto } from '@/lib/api/types/medication-type';
import {
  MedicationTypeFormData,
  ParsedMedicationTypeData,
  medicationTypeSchema,
} from './validation';
import { Pencil, Trash2 } from 'lucide-react';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';

export default function MedicationTypePage() {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedType, setSelectedType] =
    useState<MedicationTypeListDto | null>(null);

  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    isActive: undefined as boolean | undefined,
  });

  // Hooks
  const {
    getMedicationTypes,
    createMedicationType,
    updateMedicationType,
    deleteMedicationType,
  } = useMedicationType();

  const { data: medicationTypes, isLoading } = getMedicationTypes(filter);

  const form = useForm<MedicationTypeFormData>({
    resolver: zodResolver(medicationTypeSchema),
    defaultValues: {
      nameL: '',
      nameF: '',
      description: '',
      isActive: 'true',
    },
  });

  // Handlers
  const onSubmit = async (formData: MedicationTypeFormData) => {
    const payload: ParsedMedicationTypeData = {
      nameL: formData.nameL,
      nameF: formData.nameF,
      description: formData.description,
      isActive: formData.isActive === 'true',
      ...(selectedType && { id: selectedType.id }),
    };

    try {
      if (selectedType) {
        await updateMedicationType.mutateAsync(payload);
      } else {
        await createMedicationType.mutateAsync(payload);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (type: MedicationTypeListDto) => {
    setSelectedType(type);
    form.reset({
      nameL: type.nameL,
      nameF: type.nameF,
      description: '',
      isActive: type.isActive ? 'true' : 'false',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (type: MedicationTypeListDto) => {
    setSelectedType(type);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedType) {
      await deleteMedicationType.mutateAsync(selectedType.id);
      setIsDeleteModalOpen(false);
      setSelectedType(null);
    }
  };

  const handleAdd = () => {
    setSelectedType(null);
    form.reset({
      nameL: '',
      nameF: '',
      description: '',
      isActive: 'true',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
    setSelectedType(null);
  };

  const columns: Column<MedicationTypeListDto>[] = [
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
        <Table<MedicationTypeListDto>
          data={medicationTypes?.items ?? []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: medicationTypes?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          selectedType ? 'Edit Medication Type' : 'Add New Medication Type'
        }
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={
                updateMedicationType.isPending || createMedicationType.isPending
              }
            >
              {selectedType ? 'Save Changes' : 'Add Medication Type'}
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
          <TextArea
            label="Description"
            {...form.register('description')}
            error={form.formState.errors.description?.message}
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
        isLoading={deleteMedicationType.isPending}
      />
    </PageLayout>
  );
}
