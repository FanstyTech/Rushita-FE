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
import { useDiagnosis } from '@/lib/api/hooks/useDiagnosis';
import { useDiagnosisCategory } from '@/lib/api/hooks/useDiagnosisCategory';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { DiagnosisListDto } from '@/lib/api/types/diagnosis';
import { SelectOption } from '@/lib/api/types/select-option';
import {
  DiagnosisFormData,
  ParsedDiagnosisData,
  diagnosisSchema,
} from './validation';
import { Pencil, Trash2 } from 'lucide-react';
import { FiList, FiSearch } from 'react-icons/fi';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';

export default function DiagnosisPage() {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] =
    useState<DiagnosisListDto | null>(null);

  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    code: '',
    specialtyId: undefined as string | undefined,
    diagnosisCategoryId: undefined as string | undefined,
    isActive: undefined as boolean | undefined,
  });

  // Hooks
  const { getDiagnoses, createDiagnosis, updateDiagnosis, deleteDiagnosis } =
    useDiagnosis();

  const { getDiagnosisCategoriesForDropdown } = useDiagnosisCategory();
  const { data: categories } = getDiagnosisCategoriesForDropdown();

  const { getSpecialtiesForDropdown } = useSpecialty();
  const { data: specialties } = getSpecialtiesForDropdown();

  const { data: diagnoses, isLoading } = getDiagnoses(filter);

  const form = useForm<DiagnosisFormData>({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
      code: '',
      nameL: '',
      nameF: '',
      description: '',
      commonSymptoms: '',
      commonMedications: '',
      recommendedTests: '',
      riskFactors: '',
      specialtyId: '',
      diagnosisCategoryId: '',
      isActive: 'true',
    },
  });

  // Handlers
  const onSubmit = async (formData: DiagnosisFormData) => {
    const payload: ParsedDiagnosisData = {
      code: formData.code,
      nameL: formData.nameL,
      nameF: formData.nameF,
      description: formData.description,
      commonSymptoms: formData.commonSymptoms,
      commonMedications: formData.commonMedications,
      recommendedTests: formData.recommendedTests,
      riskFactors: formData.riskFactors,
      specialtyId: formData.specialtyId || undefined,
      diagnosisCategoryId: formData.diagnosisCategoryId || undefined,
      isActive: formData.isActive === 'true',
      ...(selectedDiagnosis && { id: selectedDiagnosis.id }),
    };

    try {
      if (selectedDiagnosis) {
        await updateDiagnosis.mutateAsync(payload);
      } else {
        await createDiagnosis.mutateAsync(payload);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (diagnosis: DiagnosisListDto) => {
    setSelectedDiagnosis(diagnosis);
    form.reset({
      code: diagnosis.code,
      nameL: diagnosis.nameL,
      nameF: diagnosis.nameF,
      description: '',
      commonSymptoms: '',
      commonMedications: '',
      recommendedTests: '',
      riskFactors: '',
      specialtyId: diagnosis.id,
      diagnosisCategoryId: diagnosis.id,
      isActive: diagnosis.isActive ? 'true' : 'false',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (diagnosis: DiagnosisListDto) => {
    setSelectedDiagnosis(diagnosis);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedDiagnosis) {
      await deleteDiagnosis.mutateAsync(selectedDiagnosis.id);
      setIsDeleteModalOpen(false);
      setSelectedDiagnosis(null);
    }
  };

  const handleAdd = () => {
    setSelectedDiagnosis(null);
    form.reset({
      code: '',
      nameL: '',
      nameF: '',
      description: '',
      commonSymptoms: '',
      commonMedications: '',
      recommendedTests: '',
      riskFactors: '',
      specialtyId: '',
      diagnosisCategoryId: '',
      isActive: 'true',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
    setSelectedDiagnosis(null);
  };

  const columns: Column<DiagnosisListDto>[] = [
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
      header: 'Category',
      accessor: 'diagnosisCategoryName',
    },
    {
      header: 'Specialty',
      accessor: 'specialtyName',
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
              label: 'Specialty',
              options: [
                { value: '', label: 'All Specialties' },
                ...(specialties?.map((specialty: SelectOption<string>) => ({
                  value: specialty.value,
                  label: specialty.label || '',
                })) || []),
              ],
              value: filter.specialtyId || '',
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  specialtyId: value,
                })),
            },
            {
              icon: <FiList className="w-4 h-4" />,
              label: 'Category',
              options: [
                { value: '', label: 'All Categories' },
                ...(categories?.map((category: SelectOption<string>) => ({
                  value: category.value,
                  label: category.label || '',
                })) || []),
              ],
              value: filter.diagnosisCategoryId || '',
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  diagnosisCategoryId: value,
                })),
            },
            {
              icon: <FiList className="w-4 h-4" />,
              label: 'Status',
              options: [
                { value: '', label: 'All Status' },
                { value: 'true', label: 'Active' },
                { value: 'false', label: 'Inactive' },
              ],
              value:
                filter.isActive === undefined ? '' : filter.isActive.toString(),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  isActive: value === '' ? undefined : value === 'true',
                })),
            },
          ]}
        />

        {/* Table */}
        <Table<DiagnosisListDto>
          data={diagnoses?.items ?? []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: diagnoses?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedDiagnosis ? 'Edit Diagnosis' : 'Add New Diagnosis'}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={updateDiagnosis.isPending || createDiagnosis.isPending}
            >
              {selectedDiagnosis ? 'Save Changes' : 'Add Diagnosis'}
            </Button>
          </div>
        }
        maxWidth="4xl"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Code"
              {...form.register('code')}
              error={form.formState.errors.code?.message}
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
            <Select
              label="Specialty"
              {...form.register('specialtyId')}
              error={form.formState.errors.specialtyId?.message}
              options={[
                { value: '', label: 'Select Specialty' },
                ...(specialties?.map((specialty: SelectOption<string>) => ({
                  value: specialty.value,
                  label: specialty.label || '',
                })) || []),
              ]}
            />
            <Select
              label="Category"
              {...form.register('diagnosisCategoryId')}
              error={form.formState.errors.diagnosisCategoryId?.message}
              options={[
                { value: '', label: 'Select Category' },
                ...(categories?.map((category: SelectOption<string>) => ({
                  value: category.value,
                  label: category.label || '',
                })) || []),
              ]}
            />
          </div>
          <TextArea
            label="Description"
            {...form.register('description')}
            error={form.formState.errors.description?.message}
            rows={3}
          />
          <TextArea
            label="Common Symptoms"
            {...form.register('commonSymptoms')}
            error={form.formState.errors.commonSymptoms?.message}
            rows={3}
          />
          <TextArea
            label="Common Medications"
            {...form.register('commonMedications')}
            error={form.formState.errors.commonMedications?.message}
            rows={3}
          />
          <TextArea
            label="Recommended Tests"
            {...form.register('recommendedTests')}
            error={form.formState.errors.recommendedTests?.message}
            rows={3}
          />
          <TextArea
            label="Risk Factors"
            {...form.register('riskFactors')}
            error={form.formState.errors.riskFactors?.message}
            rows={3}
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
        isLoading={deleteDiagnosis.isPending}
      />
    </PageLayout>
  );
}
