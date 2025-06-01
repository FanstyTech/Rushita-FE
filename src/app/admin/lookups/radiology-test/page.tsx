'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { FiList, FiSearch } from 'react-icons/fi';

import Button from '@/components/common/Button';
import { Input, Select, TextArea } from '@/components/common/form';
import { Table, type Column } from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import PageLayout from '@/components/layouts/PageLayout';

import { useRadiologyTest } from '@/lib/api/hooks/useRadiologyTest';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { useRadiologyTestCategory } from '@/lib/api/hooks/useRadiologyTestCategory';
import {
  radiologyTestSchema,
  type RadiologyTestFormData,
  type ParsedRadiologyTestData,
} from './validation';
import { type RadiologyTestListDto } from '@/lib/api/types/radiology-test';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
export default function RadiologyTestPage() {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<RadiologyTestListDto | null>(
    null
  );

  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    code: '',
    isActive: undefined as boolean | undefined,
    specialtyId: undefined as string | undefined,
    radiologyTestCategoryId: undefined as string | undefined,
  });

  // Hooks
  const {
    getRadiologyTests,
    createRadiologyTest,
    updateRadiologyTest,
    deleteRadiologyTest,
  } = useRadiologyTest();

  const { getSpecialtiesForDropdown } = useSpecialty();
  const { getRadiologyTestCategoriesForDropdown } = useRadiologyTestCategory();

  const { data: testsResponse, isLoading } = getRadiologyTests(filter);
  const { data: specialtiesResponse } = getSpecialtiesForDropdown();
  const { data: categoriesResponse } = getRadiologyTestCategoriesForDropdown();

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RadiologyTestFormData>({
    resolver: zodResolver(radiologyTestSchema),
    defaultValues: {
      code: '',
      nameL: '',
      nameF: '',
      description: '',
      specialtyId: '',
      radiologyTestCategoryId: '',
      isActive: 'true',
    },
  });

  // Handlers
  const onSubmit = async (formData: RadiologyTestFormData) => {
    const payload: ParsedRadiologyTestData = {
      code: formData.code,
      nameL: formData.nameL,
      nameF: formData.nameF,
      description: formData.description,
      specialtyId: formData.specialtyId || undefined,
      radiologyTestCategoryId: formData.radiologyTestCategoryId || undefined,
      isActive: formData.isActive === 'true',
      ...(selectedTest && { id: selectedTest.id }),
    };

    try {
      if (selectedTest) {
        await updateRadiologyTest.mutateAsync(payload);
      } else {
        await createRadiologyTest.mutateAsync(payload);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleAddClick = () => {
    setSelectedTest(null);
    reset({
      code: '',
      nameL: '',
      nameF: '',
      description: '',
      specialtyId: '',
      radiologyTestCategoryId: '',
      isActive: 'true',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (test: RadiologyTestListDto) => {
    setSelectedTest(test);
    reset({
      code: test.code,
      nameL: test.nameL,
      nameF: test.nameF,
      description: '',
      specialtyId: test.id,
      radiologyTestCategoryId: test.id,
      isActive: test.isActive ? 'true' : 'false',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (test: RadiologyTestListDto) => {
    setSelectedTest(test);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedTest) {
      await deleteRadiologyTest.mutateAsync(selectedTest.id);
      setIsDeleteModalOpen(false);
      setSelectedTest(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTest(null);
    reset();
  };

  const clearFilters = () => {
    setFilter({
      pageNumber: 1,
      pageSize: 5,
      sortColumn: '',
      sortDirection: '',
      searchValue: '',
      code: '',
      isActive: undefined,
      specialtyId: undefined,
      radiologyTestCategoryId: undefined,
    });
  };

  // Table columns
  const columns: Column<RadiologyTestListDto>[] = [
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
      header: 'Specialty',
      accessor: 'specialtyName',
    },
    {
      header: 'Category',
      accessor: 'radiologyTestCategoryName',
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
          onAddNew={handleAddClick}
          additionalFilters={[
            {
              icon: <FiList className="w-4 h-4" />,
              label: 'Category',
              options: [
                {
                  value: '',
                  label: 'All Categories',
                },
                ...(categoriesResponse || []).map((category) => ({
                  value: category.value,
                  label: category.label || '',
                })),
              ],
              value: filter.radiologyTestCategoryId,
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  radiologyTestCategoryId: value,
                })),
            },
            {
              icon: <FiList className="w-4 h-4" />,
              label: 'Specialty',
              options: [
                {
                  value: '',
                  label: 'All Specialties',
                },
                ...(specialtiesResponse || []).map((specialty) => ({
                  value: specialty.value,
                  label: specialty.label || '',
                })),
              ],
              value: filter.specialtyId,
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  specialtyId: value,
                })),
            },
          ]}
        />
        {/* Table */}
        <Table<RadiologyTestListDto>
          data={testsResponse?.items || []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: testsResponse?.totalPages || 0,
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
              isLoading={
                updateRadiologyTest.isPending || createRadiologyTest.isPending
              }
            >
              {selectedTest ? 'Save Changes' : 'Add Test'}
            </Button>
          </div>
        }
        title={`${selectedTest ? 'Edit' : 'Add'} Radiology Test`}
        maxWidth="2xl"
      >
        <form className="space-y-4">
          <Input
            label="Code"
            error={errors.code?.message}
            {...register('code')}
          />
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
          <TextArea
            label="Description"
            error={errors.description?.message}
            {...register('description')}
          />
          <Select
            label="Specialty"
            {...register('specialtyId')}
            options={[
              { value: '', label: 'Select Specialty' },
              ...(specialtiesResponse || []).map((specialty) => ({
                value: specialty.value,
                label: specialty.label || '',
              })),
            ]}
          />
          <Select
            label="Category"
            {...register('radiologyTestCategoryId')}
            options={[
              { value: '', label: 'Select Category' },
              ...(categoriesResponse || []).map((category) => ({
                value: category.value,
                label: category.label || '',
              })),
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
        isLoading={deleteRadiologyTest.isPending}
      />
    </PageLayout>
  );
}
