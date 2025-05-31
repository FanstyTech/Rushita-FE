'use client';

import { useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Table, Column } from '@/components/common/Table';
import { Plus, Search as FiSearch, Pencil, Trash2 } from 'lucide-react';
import Modal from '@/components/common/Modal';
import { Input, Select } from '@/components/common/form';
import Button from '@/components/common/Button';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import type { SpecialtyListDto } from '@/lib/api/types/specialty';

const specialtySchema = z.object({
  nameL: z
    .string()
    .min(2, 'Local name must be at least 2 characters')
    .max(50, 'Local name cannot exceed 50 characters'),
  nameF: z
    .string()
    .min(2, 'Foreign name must be at least 2 characters')
    .max(50, 'Foreign name cannot exceed 50 characters'),
  description: z.string().optional(),
  isActive: z.enum(['true', 'false']),
});

// Form data type matches exactly what the form handles
type SpecialtyFormData = z.infer<typeof specialtySchema>;

// Parsed data type includes the transformed boolean
type ParsedSpecialtyData = Omit<SpecialtyFormData, 'isActive'> & {
  isActive: boolean;
};

export default function SpecialtyPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<SpecialtyListDto | null>(null);
  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    isActive: undefined as boolean | undefined,
  });

  const clearFilters = () => {
    setFilter((prev) => ({
      ...prev,
      searchValue: '',
      isActive: undefined,
    }));
  };

  const { getSpecialties, createSpecialty, updateSpecialty, deleteSpecialty } =
    useSpecialty();
  const { data: specialtiesData, isLoading } = getSpecialties(filter);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpecialtyFormData>({
    resolver: zodResolver(specialtySchema),
    defaultValues: {
      nameL: '',
      nameF: '',
      description: '',
      isActive: 'true',
    },
  });

  const onSubmit: SubmitHandler<SpecialtyFormData> = async (formData) => {
    try {
      // Transform the data after validation
      const validatedData = specialtySchema.parse(formData);
      const data: ParsedSpecialtyData = {
        ...validatedData,
        isActive: validatedData.isActive === 'true',
      };

      if (selectedSpecialty) {
        await updateSpecialty.mutateAsync({
          ...data,
          id: selectedSpecialty.id,
        });
        setIsEditModalOpen(false);
      } else {
        await createSpecialty.mutateAsync(data);
        setIsAddModalOpen(false);
      }
      reset();
      setSelectedSpecialty(null);
    } catch (error) {
      console.error('Failed to save specialty:', error);
    }
  };

  const handleEdit = (specialty: SpecialtyListDto) => {
    setSelectedSpecialty(specialty);
    reset({
      nameL: specialty.nameL,
      nameF: specialty.nameF,
      description: specialty.description || '',
      isActive: specialty.isActive ? 'true' : 'false',
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (specialty: SpecialtyListDto) => {
    setSelectedSpecialty(specialty);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedSpecialty) {
      await deleteSpecialty.mutateAsync(selectedSpecialty.id);
      setIsDeleteModalOpen(false);
      setSelectedSpecialty(null);
    }
  };

  const handleAddClick = () => {
    reset({
      nameL: '',
      nameF: '',
      description: '',
      isActive: 'true',
    });
    setSelectedSpecialty(null);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedSpecialty(null);
    reset({
      nameL: '',
      nameF: '',
      description: '',
      isActive: 'true',
    });
  };

  const columns: Column<SpecialtyListDto>[] = [
    {
      header: 'Local Name',
      accessor: 'nameL',
    },
    {
      header: 'Foreign Name',
      accessor: 'nameF',
    },
    {
      header: 'Description',
      accessor: 'description',
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5">
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="flex-1 relative">
              <Input
                hasBorder={false}
                placeholder="Search specialties"
                value={filter.searchValue}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    searchValue: e.target.value,
                  }))
                }
                startIcon={<FiSearch className="w-4 h-4 text-gray-400" />}
                className="bg-transparent"
              />
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Status Filter */}
            <div>
              <Select
                value={
                  filter.isActive === undefined
                    ? ''
                    : filter.isActive.toString()
                }
                hasBorder={false}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    isActive:
                      e.target.value === ''
                        ? undefined
                        : e.target.value === 'true',
                  }))
                }
                options={[
                  { value: '', label: 'All Status' },
                  { value: 'true', label: 'Active' },
                  { value: 'false', label: 'Inactive' },
                ]}
                className="appearance-none px-4 py-2.5 text-sm text-gray-600 bg-transparent focus:outline-none cursor-pointer pr-10"
              />
            </div>

            {/* Clear Filters */}
            {(filter.searchValue || filter.isActive !== undefined) && (
              <>
                {/* Divider */}
                <div className="h-8 w-px bg-gray-200"></div>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Clear Filters
                </button>
              </>
            )}

            {/* Add Specialty Button */}
            <Button
              onClick={handleAddClick}
              leftIcon={<Plus className="w-4 h-4" />}
              className="ml-2"
            >
              Add Specialty
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <Table<SpecialtyListDto>
            data={specialtiesData?.items || []}
            columns={columns}
            isLoading={isLoading}
            pagination={{
              pageSize: filter.pageSize,
              pageIndex: filter.pageNumber - 1,
              pageCount: specialtiesData?.totalPages || 0,
              onPageChange: (page: number) =>
                setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
            }}
          />
        </div>
      </div>
      {/* Add/Edit Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={handleCloseModal}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              isLoading={updateSpecialty.isPending || createSpecialty.isPending}
            >
              {selectedSpecialty ? 'Save Changes' : 'Add Specialty'}
            </Button>
          </div>
        }
        title={`${selectedSpecialty ? 'Edit' : 'Add'} Specialty`}
        maxWidth="2xl"
      >
        <form className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Name (Local)"
              {...register('nameL')}
              error={errors.nameL?.message}
            />

            <Input
              label="Name (Foreign)"
              {...register('nameF')}
              error={errors.nameF?.message}
            />

            <Input
              label="Description"
              {...register('description')}
              error={errors.description?.message}
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
          </div>
        </form>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedSpecialty(null);
        }}
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedSpecialty(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              isLoading={deleteSpecialty.isPending}
            >
              Delete
            </Button>
          </div>
        }
        title="Delete Specialty"
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete the specialty "
            {selectedSpecialty?.nameL}"? This action cannot be undone.
          </p>
        </div>
      </Modal>
    </PageLayout>
  );
}
