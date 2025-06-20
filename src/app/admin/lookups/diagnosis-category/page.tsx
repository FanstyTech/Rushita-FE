'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select } from '@/components/common/form';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { Column, Table } from '@/components/common/Table';
import PageLayout from '@/components/layouts/PageLayout';
import { useDiagnosisCategory } from '@/lib/api/hooks/useDiagnosisCategory';
import { DiagnosisCategoryListDto } from '@/lib/api/types/diagnosis-category';
import { SelectOption } from '@/lib/api/types/select-option';
import {
  DiagnosisCategoryFormData,
  ParsedDiagnosisCategoryData,
  diagnosisCategorySchema,
} from './validation';
import { Pencil, Trash2 } from 'lucide-react';
import { FiList } from 'react-icons/fi';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';

export default function DiagnosisCategoryPage() {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<DiagnosisCategoryListDto | null>(null);

  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    parentCategoryId: undefined as string | undefined,
    isActive: undefined as boolean | undefined,
  });

  // Hooks
  const {
    useDiagnosisCategoriesList: getDiagnosisCategories,
    useDiagnosisCategoriesDropdown: getDiagnosisCategoriesForDropdown,
    createDiagnosisCategory,
    updateDiagnosisCategory,
    deleteDiagnosisCategory,
  } = useDiagnosisCategory();

  const { data: categories } = getDiagnosisCategoriesForDropdown();
  const { data: diagnosisCategories, isLoading } =
    getDiagnosisCategories(filter);

  const form = useForm<DiagnosisCategoryFormData>({
    resolver: zodResolver(diagnosisCategorySchema),
    defaultValues: {
      nameL: '',
      nameF: '',
      parentCategoryId: '',
      isActive: 'true',
    },
  });

  // Handlers
  const onSubmit = async (formData: DiagnosisCategoryFormData) => {
    const payload: ParsedDiagnosisCategoryData = {
      nameL: formData.nameL,
      nameF: formData.nameF,
      parentCategoryId: formData.parentCategoryId || undefined,
      isActive: formData.isActive === 'true',
      ...(selectedCategory && { id: selectedCategory.id }),
    };

    try {
      if (selectedCategory) {
        await updateDiagnosisCategory.mutateAsync(payload);
      } else {
        await createDiagnosisCategory.mutateAsync(payload);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (category: DiagnosisCategoryListDto) => {
    setSelectedCategory(category);
    form.reset({
      nameL: category.nameL,
      nameF: category.nameF,
      parentCategoryId: category.id,
      isActive: category.isActive ? 'true' : 'false',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (category: DiagnosisCategoryListDto) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCategory) {
      await deleteDiagnosisCategory.mutateAsync(selectedCategory.id);
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    form.reset({
      nameL: '',
      nameF: '',
      parentCategoryId: '',
      isActive: 'true',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
    setSelectedCategory(null);
  };

  const columns: Column<DiagnosisCategoryListDto>[] = [
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
              label: 'Parent Category',
              options: [
                {
                  value: '',
                  label: 'No Parent',
                },
                ...(categories?.map((category: SelectOption<string>) => ({
                  value: category.value,
                  label: category.label || '',
                })) || []),
              ],
              value: String(filter.parentCategoryId || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  parentCategoryId: value,
                })),
            },
          ]}
        />

        {/* Table */}
        <Table<DiagnosisCategoryListDto>
          data={diagnosisCategories?.items ?? []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: diagnosisCategories?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          selectedCategory
            ? 'Edit Diagnosis Category'
            : 'Add New Diagnosis Category'
        }
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={
                updateDiagnosisCategory.isPending ||
                createDiagnosisCategory.isPending
              }
            >
              {selectedCategory ? 'Save Changes' : 'Add Category'}
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
          <Select
            label="Parent Category"
            {...form.register('parentCategoryId')}
            error={form.formState.errors.parentCategoryId?.message}
            options={[
              { value: '', label: 'No Parent' },
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
        isLoading={deleteDiagnosisCategory.isPending}
      />
    </PageLayout>
  );
}
