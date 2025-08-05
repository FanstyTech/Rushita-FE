'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, TextArea } from '@/components/common/form';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { Column, Table } from '@/components/common/Table';
import PageLayout from '@/components/layouts/PageLayout';
import { useMedicine } from '@/lib/api/hooks/useMedicine';
import { useMedicationType } from '@/lib/api/hooks/useMedicationType';
import {
  DosageForm,
  MedicineListDto,
  MedicineStrength,
} from '@/lib/api/types/medicine';
import { SelectOption } from '@/lib/api/types/select-option';
import {
  MedicineFormData,
  ParsedMedicineData,
  medicineSchema,
} from './validation';
import { Pencil, Trash2 } from 'lucide-react';
import { FiList } from 'react-icons/fi';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
export default function MedicinePage() {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] =
    useState<MedicineListDto | null>(null);

  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    code: '',
    typeId: undefined as string | undefined,
    isActive: undefined as boolean | undefined,
  });

  // Hooks
  const {
    useMedicinesList: getMedicines,
    createMedicine,
    updateMedicine,
    deleteMedicine,
  } = useMedicine();

  const { useMedicationTypesDropdown: getMedicationTypesForDropdown } =
    useMedicationType();
  const { data: medicationTypes } = getMedicationTypesForDropdown();

  const { data: medicines, isLoading } = getMedicines(filter);

  const form = useForm<MedicineFormData>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      code: '',
      nameL: '',
      nameF: '',
      scientificName: '',
      description: '',
      medicationTypeId: '',
      isActive: 'true',
    },
  });

  // Handlers
  const onSubmit = async (formData: MedicineFormData) => {
    const payload: ParsedMedicineData = {
      code: formData.code,
      nameL: formData.nameL,
      nameF: formData.nameF,
      scientificName: formData.scientificName,
      description: formData.description,
      medicationTypeId: formData.medicationTypeId,
      isActive: formData.isActive === 'true',
      dosageForm: formData.dosageForm,
      strength: formData.strength,
      ...(selectedMedicine && { id: selectedMedicine.id }),
    };

    try {
      if (selectedMedicine) {
        await updateMedicine.mutateAsync(payload);
      } else {
        await createMedicine.mutateAsync(payload);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (medicine: MedicineListDto) => {
    setSelectedMedicine(medicine);
    form.reset({
      code: medicine.code,
      nameL: medicine.nameL,
      nameF: medicine.nameF,
      scientificName: medicine.scientificName,
      description: medicine.description,
      medicationTypeId: medicine.medicationTypeId,
      isActive: medicine.isActive ? 'true' : 'false',
      dosageForm: medicine.dosageForm,
      strength: medicine.strength,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (medicine: MedicineListDto) => {
    setSelectedMedicine(medicine);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedMedicine) {
      await deleteMedicine.mutateAsync(selectedMedicine.id);
      setIsDeleteModalOpen(false);
      setSelectedMedicine(null);
    }
  };

  const handleAdd = () => {
    setSelectedMedicine(null);
    form.reset({
      code: '',
      nameL: '',
      nameF: '',
      scientificName: '',
      description: '',
      medicationTypeId: '',
      isActive: 'true',
      dosageForm: 0,
      strength: 0,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
    setSelectedMedicine(null);
  };

  const columns: Column<MedicineListDto>[] = [
    {
      header: 'Code',
      accessor: 'code',
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
      header: 'Scientific Name',
      accessor: 'scientificName',
    },
    {
      header: 'Medication Type',
      accessor: 'medicationTypeName',
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
          additionalFilters={[
            {
              icon: <FiList className="w-4 h-4" />,
              label: 'Type',
              options: [
                {
                  value: '',
                  label: 'All Types',
                },
                ...(medicationTypes?.map((type: SelectOption<string>) => ({
                  value: type.value,
                  label: type.label || '',
                })) || []),
              ],
              value: String(filter.typeId || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  typeId: value,
                })),
            },
          ]}
        />

        {/* Table */}
        <Table<MedicineListDto>
          data={medicines?.items ?? []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: medicines?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedMedicine ? 'Edit Medicine' : 'Add New Medicine'}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={updateMedicine.isPending || createMedicine.isPending}
            >
              {selectedMedicine ? 'Save Changes' : 'Add Medicine'}
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <Input
            required={true}
            label="Code"
            {...form.register('code')}
            error={form.formState.errors.code?.message}
          />
          <Input
            required={true}
            label="Local Name"
            {...form.register('nameL')}
            error={form.formState.errors.nameL?.message}
          />
          <Input
            required={true}
            label="Foreign Name"
            {...form.register('nameF')}
            error={form.formState.errors.nameF?.message}
          />
          <Input
            required={true}
            label="Scientific Name"
            {...form.register('scientificName')}
            error={form.formState.errors.scientificName?.message}
          />
          <Select
            required={true}
            label="Medication Type"
            value={String(form.watch('medicationTypeId'))}
            {...form.register('medicationTypeId')}
            error={form.formState.errors.medicationTypeId?.message}
            options={[
              { value: '', label: 'Select Type' },
              ...(medicationTypes?.map((type: SelectOption<string>) => ({
                value: type.value,
                label: type.label || '',
              })) || []),
            ]}
          />
          <Select
            required={true}
            value={String(form.watch('dosageForm'))}
            label="Dosage Form"
            {...form.register('dosageForm')}
            error={form.formState.errors.dosageForm?.message}
            options={Object.entries(DosageForm)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => ({
                value: value.toString(),
                label: key,
              }))}
          />
          <Select
            required={true}
            value={String(form.watch('strength'))}
            label="Strength"
            {...form.register('strength')}
            error={form.formState.errors.strength?.message}
            options={Object.entries(MedicineStrength)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => ({
                value: value.toString(),
                label: key,
              }))}
          />
          <Select
            required={true}
            value={String(form.watch('isActive'))}
            label="Status"
            {...form.register('isActive')}
            error={form.formState.errors.isActive?.message}
            options={[
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Inactive' },
            ]}
          />{' '}
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
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        secondaryMessage="This action cannot be undone."
        variant="error"
        confirmText="Delete"
        isLoading={deleteMedicine.isPending}
      />
    </PageLayout>
  );
}
