'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Trash2 } from 'lucide-react';
import { FiList } from 'react-icons/fi';

import Button from '@/components/common/Button';
import { Input, Select } from '@/components/common/form';
import { Table, type Column } from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import PageLayout from '@/components/layouts/PageLayout';

import { useRadiologyTestCategory } from '@/lib/api/hooks/useRadiologyTestCategory';
import {
  radiologyTestCategorySchema,
  type RadiologyTestCategoryFormData,
  type ParsedRadiologyTestCategoryData,
} from './validation';
import { type RadiologyTestCategoryListDto } from '@/lib/api/types/radiology-test-category';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
export default function RadiologyTestCategoryPage() {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<RadiologyTestCategoryListDto | null>(null);
  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    isActive: undefined,
  });

  // Hooks
  const {
    useRadiologyTestCategoriesList: getRadiologyTestCategories,
    createRadiologyTestCategory,
    updateRadiologyTestCategory,
    deleteRadiologyTestCategory,
    useRadiologyTestCategoriesDropdown: getRadiologyTestCategoriesForDropdown,
  } = useRadiologyTestCategory();

  const { data: categoriesResponse, isLoading } =
    getRadiologyTestCategories(filter);
  const { data: parentCategoriesResponse } =
    getRadiologyTestCategoriesForDropdown();

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RadiologyTestCategoryFormData>({
    resolver: zodResolver(radiologyTestCategorySchema),
    defaultValues: {
      nameL: '',
      nameF: '',
      parentCategoryId: '',
      isActive: 'true',
    },
  });

  // Handlers
  const onSubmit = async (formData: RadiologyTestCategoryFormData) => {
    const payload: ParsedRadiologyTestCategoryData = {
      nameL: formData.nameL,
      nameF: formData.nameF,
      parentCategoryId: formData.parentCategoryId || undefined,
      isActive: formData.isActive === 'true',
      ...(selectedCategory && { id: selectedCategory.id }),
    };

    try {
      if (selectedCategory) {
        await updateRadiologyTestCategory.mutateAsync(payload);
      } else {
        await createRadiologyTestCategory.mutateAsync(payload);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleAddClick = () => {
    setSelectedCategory(null);
    reset({
      nameL: '',
      nameF: '',
      parentCategoryId: '',
      isActive: 'true',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (category: RadiologyTestCategoryListDto) => {
    setSelectedCategory(category);
    reset({
      nameL: category.nameL,
      nameF: category.nameF,
      parentCategoryId: category.id,
      isActive: category.isActive ? 'true' : 'false',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (category: RadiologyTestCategoryListDto) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCategory) {
      await deleteRadiologyTestCategory.mutateAsync(selectedCategory.id);
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    reset();
  };

  // Table columns
  const columns: Column<RadiologyTestCategoryListDto>[] = [
    {
      header: 'Local Name',
      accessor: 'nameL',
    },
    {
      header: 'Foreign Name',
      accessor: 'nameF',
    },
    {
      header: 'Parent Category',
      accessor: 'parentCategoryName',
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
          additionalFilters={[
            {
              icon: <FiList />,
              label: 'Parent Category',
              options:
                parentCategoriesResponse?.map((category) => ({
                  value: category.value,
                  label: category.label || '',
                })) || [],
              value: String(filter.parentCategoryId || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  parentCategoryId: value || undefined,
                })),
            },
          ]}
          onAddNew={handleAddClick}
        />
        {/* Table */}
        <Table<RadiologyTestCategoryListDto>
          data={categoriesResponse?.items || []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: categoriesResponse?.totalPages || 0,
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
                updateRadiologyTestCategory.isPending ||
                createRadiologyTestCategory.isPending
              }
            >
              {selectedCategory ? 'Save Changes' : 'Add Category'}
            </Button>
          </div>
        }
        title={`${selectedCategory ? 'Edit' : 'Add'} Radiology Test Category`}
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
            label="Parent Category"
            {...register('parentCategoryId')}
            options={[
              { value: '', label: 'Select Parent Category' },
              ...(parentCategoriesResponse || []).map((category) => ({
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
        isLoading={deleteRadiologyTestCategory.isPending}
      />
    </PageLayout>
  );
}
