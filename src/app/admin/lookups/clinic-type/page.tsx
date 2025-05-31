'use client';

import { useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Table } from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import { Input, Select, Textarea } from '@/components/common/form';
import {
  Search as FiSearch,
  Trash2 as FiTrash2,
  Edit as FiEdit,
  Plus as FiPlus,
} from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const clinicTypeSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(
      /^[a-zA-Z\s-]+$/,
      'Name can only contain letters, spaces, and hyphens'
    ),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters'),
  status: z.enum(['active', 'inactive']),
});

type ClinicTypeFormData = z.infer<typeof clinicTypeSchema>;

interface ClinicType {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const mockClinicTypes: ClinicType[] = [
  {
    id: '1',
    name: 'General Practice',
    description: 'Primary healthcare clinic for general medical services',
    status: 'active',
    createdAt: '2023-01-01',
  },
  {
    id: '2',
    name: 'Dental Clinic',
    description: 'Specialized clinic for dental and oral health services',
    status: 'active',
    createdAt: '2023-01-02',
  },
  {
    id: '3',
    name: 'Eye Care Center',
    description: 'Specialized clinic for vision and eye health services',
    status: 'active',
    createdAt: '2023-01-03',
  },
];

export default function ClinicTypePage() {
  const [clinicTypes, setClinicTypes] = useState<ClinicType[]>(mockClinicTypes);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClinicType, setSelectedClinicType] =
    useState<ClinicType | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ClinicTypeFormData>({
    resolver: zodResolver(clinicTypeSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      status: 'active',
    },
  });

  const onSubmit = async (data: ClinicTypeFormData) => {
    if (selectedClinicType) {
      // Edit mode
      setClinicTypes((prev) =>
        prev.map((type) =>
          type.id === selectedClinicType.id
            ? {
                ...type,
                ...data,
              }
            : type
        )
      );
      setIsEditModalOpen(false);
    } else {
      // Add mode
      const newClinicType: ClinicType = {
        id: `type-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        ...data,
      };
      setClinicTypes((prev) => [newClinicType, ...prev]);
      setIsAddModalOpen(false);
    }

    reset();
    setSelectedClinicType(null);
  };

  const handleEdit = (type: ClinicType) => {
    setSelectedClinicType(type);
    setValue('name', type.name);
    setValue('description', type.description);
    setValue('status', type.status);
    setIsEditModalOpen(true);
  };

  const handleDelete = (type: ClinicType) => {
    setSelectedClinicType(type);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedClinicType) {
      setClinicTypes((prev) =>
        prev.filter((type) => type.id !== selectedClinicType.id)
      );
      setIsDeleteModalOpen(false);
      setSelectedClinicType(null);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
    });
  };

  const filteredClinicTypes = clinicTypes.filter((type) => {
    const matchesSearch =
      type.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      type.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status
      ? type.status === filters.status
      : true;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      header: 'Name',
      accessor: (row: ClinicType) => (
        <span className="font-medium">{row.name}</span>
      ),
    },
    {
      header: 'Description',
      accessor: (row: ClinicType) => (
        <span className="text-gray-600">{row.description}</span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: ClinicType) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
            row.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Created At',
      accessor: (row: ClinicType) => (
        <span className="text-gray-600">{row.createdAt}</span>
      ),
    },
    {
      header: 'Actions',
      accessor: (row: ClinicType) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const itemsPerPage = 10;

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
                placeholder="Search clinic types..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                startIcon={<FiSearch className="w-4 h-4 text-gray-400" />}
                className="bg-transparent"
              />
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Status Filter */}
            <div>
              <Select
                value={filters.status}
                hasBorder={false}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                options={[
                  { value: '', label: 'All Status' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ]}
                className="appearance-none px-4 py-2.5 text-sm text-gray-600 bg-transparent focus:outline-none cursor-pointer pr-10"
              />
            </div>

            {/* Clear Filters */}
            {(filters.search || filters.status) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Clear Filters
              </button>
            )}

            {/* Add Clinic Type Button */}
            <button
              onClick={() => {
                reset();
                setIsAddModalOpen(true);
              }}
              className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Add Clinic Type
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <Table<ClinicType>
            data={filteredClinicTypes}
            columns={columns}
            currentPage={1}
            totalPages={Math.ceil(filteredClinicTypes.length / itemsPerPage)}
            onPageChange={() => {}}
            itemsPerPage={itemsPerPage}
            totalItems={filteredClinicTypes.length}
            noDataMessage={{
              title: 'No clinic types found',
              subtitle: 'Try adjusting your search or filters',
            }}
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedClinicType(null);
          reset();
        }}
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                setSelectedClinicType(null);
                reset();
              }}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {selectedClinicType ? 'Save Changes' : 'Add Clinic Type'}
            </button>
          </div>
        }
        title={`${selectedClinicType ? 'Edit' : 'Add'} Clinic Type`}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Name"
              {...register('name')}
              error={errors.name?.message}
              helperText="Enter clinic type name (letters, spaces, and hyphens only)"
              placeholder="Enter clinic type name"
            />

            <Textarea
              label="Description"
              {...register('description')}
              error={errors.description?.message}
              helperText="Enter clinic type description"
              placeholder="Enter clinic type description"
              rows={4}
            />

            <Select
              label="Status"
              {...register('status')}
              error={errors.status?.message}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
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
          setSelectedClinicType(null);
        }}
        title="Delete Clinic Type"
        maxWidth="2xl"
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedClinicType(null);
              }}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all"
            >
              Delete
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this clinic type? This action cannot
            be undone.
          </p>
        </div>
      </Modal>
    </PageLayout>
  );
}
