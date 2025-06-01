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
import { useLabTest } from '@/lib/api/hooks/useLabTest';
import { useLabTestCategory } from '@/lib/api/hooks/useLabTestCategory';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { LabTestListDto } from '@/lib/api/types/lab-test';
import { SelectOption } from '@/lib/api/types/select-option';
import {
  LabTestFormData,
  ParsedLabTestData,
  labTestSchema,
} from './validation';
import { Pencil, Trash2 } from 'lucide-react';
import { FiList, FiSearch } from 'react-icons/fi';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';

export default function LabTestPage() {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<LabTestListDto | null>(null);

  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    code: '',
    specialtyId: undefined as string | undefined,
    labTestCategoryId: undefined as string | undefined,
    isActive: undefined as boolean | undefined,
  });

  // Hooks
  const { getLabTests, createLabTest, updateLabTest, deleteLabTest } =
    useLabTest();

  const { getLabTestCategoriesForDropdown } = useLabTestCategory();
  const { data: categories } = getLabTestCategoriesForDropdown();

  const { getSpecialtiesForDropdown } = useSpecialty();
  const { data: specialties } = getSpecialtiesForDropdown();

  const { data: labTests, isLoading } = getLabTests(filter);

  const form = useForm<LabTestFormData>({
    resolver: zodResolver(labTestSchema),
    defaultValues: {
      code: '',
      nameL: '',
      nameF: '',
      description: '',
      color: '#000000',
      specialtyId: '',
      labTestCategoryId: '',
      isActive: 'true',
    },
  });

  // Handlers
  const onSubmit = async (formData: LabTestFormData) => {
    const payload: ParsedLabTestData = {
      code: formData.code,
      nameL: formData.nameL,
      nameF: formData.nameF,
      description: formData.description,
      color: formData.color,
      specialtyId: formData.specialtyId || undefined,
      labTestCategoryId: formData.labTestCategoryId || undefined,
      isActive: formData.isActive === 'true',
      ...(selectedTest && { id: selectedTest.id }),
    };

    try {
      if (selectedTest) {
        await updateLabTest.mutateAsync(payload);
      } else {
        await createLabTest.mutateAsync(payload);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (test: LabTestListDto) => {
    setSelectedTest(test);
    form.reset({
      code: test.code,
      nameL: test.nameL,
      nameF: test.nameF,
      description: '',
      color: test.color,
      specialtyId: test.id,
      labTestCategoryId: test.id,
      isActive: test.isActive ? 'true' : 'false',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (test: LabTestListDto) => {
    setSelectedTest(test);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedTest) {
      await deleteLabTest.mutateAsync(selectedTest.id);
      setIsDeleteModalOpen(false);
      setSelectedTest(null);
    }
  };

  const handleAdd = () => {
    setSelectedTest(null);
    form.reset({
      code: '',
      nameL: '',
      nameF: '',
      description: '',
      color: '#000000',
      specialtyId: '',
      labTestCategoryId: '',
      isActive: 'true',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
    setSelectedTest(null);
  };

  const columns: Column<LabTestListDto>[] = [
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
      accessor: 'labTestCategoryName',
    },
    {
      header: 'Specialty',
      accessor: 'specialtyName',
    },
    {
      header: 'Color',
      accessor: 'color',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full border border-gray-200"
            style={{ backgroundColor: row.original.color }}
          />
          <span>{row.original.color}</span>
        </div>
      ),
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
              label: 'Category',
              options: [
                {
                  value: '',
                  label: 'All Category',
                },
                ...(categories?.map((category: SelectOption<string>) => ({
                  value: category.value,
                  label: category.label || '',
                })) || []),
              ],
              value: filter.labTestCategoryId || '',
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  labTestCategoryId: value,
                })),
            },
            {
              icon: <FiList className="w-4 h-4" />,
              label: 'Specialty',
              options: [
                {
                  value: '',
                  label: 'All Specialty',
                },
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
          ]}
        />

        {/* Table */}
        <Table<LabTestListDto>
          data={labTests?.items ?? []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: labTests?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedTest ? 'Edit Lab Test' : 'Add New Lab Test'}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={updateLabTest.isPending || createLabTest.isPending}
            >
              {selectedTest ? 'Save Changes' : 'Add Lab Test'}
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <Input
            label="Code"
            {...form.register('code')}
            error={form.formState.errors.code?.message}
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
          <TextArea
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
            {...form.register('labTestCategoryId')}
            error={form.formState.errors.labTestCategoryId?.message}
            options={[
              { value: '', label: 'Select Category' },
              ...(categories?.map((category: SelectOption<string>) => ({
                value: category.value,
                label: category.label || '',
              })) || []),
            ]}
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
        isLoading={deleteLabTest.isPending}
      />
    </PageLayout>
  );
}
