# Rousheta Frontend Page Creation Guide

## Overview

This guide explains how to create a new lookup page in the Rousheta Frontend application. It follows a standardized approach for consistency and maintainability.

## Prerequisites

- Node.js and npm installed
- Access to the Rousheta-FE repository
- Basic understanding of React, TypeScript, and Tailwind CSS

## Project Structure

```
src/
├── app/
│   └── admin/
│       └── lookups/
│           └── [feature]/
│               ├── page.tsx
│               └── validation.ts
├── lib/
│   └── api/
│       ├── types/
│       │   └── [feature].ts
│       ├── services/
│       │   └── [feature].service.ts
│       └── hooks/
│           └── use[Feature].ts
└── components/
    └── Sidebar.tsx
```

## Step-by-Step Guide

## Table of Contents

1. [API Configuration](#1-api-configuration)
2. [Types Definition](#2-types-definition)
3. [API Service Creation](#3-api-service-creation)
4. [React Query Hooks](#4-react-query-hooks)
5. [Page Component Creation](#5-page-component-creation)
6. [Form Validation](#6-form-validation)

## 1. API Configuration

First, define your API endpoints in `src/lib/api/config.ts`:

```typescript
export const API_ENDPOINTS = {
  entity: {
    LIST: '/entity/getAll',
    CREATE_OR_UPDATE: '/entity/CreateOrUpdate',
    DELETE: '/entity/Delete',
    GET_ONE: '/entity/:id',
  },
} as const;
```

## 2. Types Definition

Create a new file in `src/lib/api/types/[entity].ts`:

```typescript
import { PaginationRequest, PaginationResponse } from '../types/pagination';

// Base DTO
export interface EntityDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  description?: string;
  isActive: boolean;
}

// Create/Update DTO
export interface CreateUpdateEntityDto {
  id?: string;
  nameL: string;
  nameF: string;
  description?: string;
  isActive: boolean;
}

// List DTO (for table display)
export interface EntityListDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  description?: string;
  isActive: boolean;
}

// Filter DTO
export interface EntityFilterDto extends PaginationRequest {
  nameL?: string;
  nameF?: string;
  isActive?: boolean;
}
```

## 3. API Service Creation

Create a new file in `src/lib/api/services/[entity].service.ts`:

```typescript
import {
  EntityDto,
  CreateUpdateEntityDto,
  EntityListDto,
  EntityFilterDto,
} from '../types/entity';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

const convertFilterToParams = (
  filter: EntityFilterDto
): Record<string, string> => {
  const params: Record<string, string> = {};
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params[key] = String(value);
    }
  });
  return params;
};

export const entityService = {
  async getAll(
    filter: EntityFilterDto
  ): Promise<ApiResponse<PaginationResponse<EntityListDto>>> {
    return apiClient.get(API_ENDPOINTS.entity.LIST, {
      params: convertFilterToParams(filter),
    });
  },

  async getById(id: string): Promise<ApiResponse<EntityDto>> {
    return apiClient.get(API_ENDPOINTS.entity.GET_ONE.replace(':id', id));
  },

  async create(data: CreateUpdateEntityDto): Promise<ApiResponse<EntityDto>> {
    return apiClient.post(API_ENDPOINTS.entity.CREATE_OR_UPDATE, data);
  },

  async update(data: CreateUpdateEntityDto): Promise<ApiResponse<EntityDto>> {
    return apiClient.post(API_ENDPOINTS.entity.CREATE_OR_UPDATE, data);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.entity.DELETE, {
      params: { id },
    });
  },
};
```

## 4. React Query Hooks

Create a new file in `src/lib/api/hooks/use[Entity].ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { entityService } from '../services/entity.service';
import type { EntityFilterDto, CreateUpdateEntityDto } from '../types/entity';
import { toast } from '@/components/ui/Toast';

export function useEntity() {
  const queryClient = useQueryClient();

  const getEntities = (filter: EntityFilterDto) =>
    useQuery({
      queryKey: ['entities', filter],
      retry: false,
      queryFn: async () => {
        const response = await entityService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const getEntity = (id: string) =>
    useQuery({
      queryKey: ['entity', id],
      queryFn: async () => {
        const response = await entityService.getById(id);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.result;
      },
    });

  const createEntity = useMutation({
    mutationFn: async (data: CreateUpdateEntityDto) => {
      const response = await entityService.create(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Entity created successfully');
      queryClient.invalidateQueries(['entities']);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateEntity = useMutation({
    mutationFn: async (data: CreateUpdateEntityDto) => {
      const response = await entityService.update(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Entity updated successfully');
      queryClient.invalidateQueries(['entities']);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteEntity = useMutation({
    mutationFn: async (id: string) => {
      const response = await entityService.delete(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => {
      toast.success('Entity deleted successfully');
      queryClient.invalidateQueries(['entities']);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    getEntities,
    getEntity,
    createEntity,
    updateEntity,
    deleteEntity,
  };
}
```

## 5. Page Component Creation

Create a new file in `src/app/admin/lookups/[feature]/page.tsx`. Follow this template which includes all common patterns:

```typescript
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { FiSearch } from 'react-icons/fi';
import {
  Table,
  Button,
  Modal,
  Input,
  Select,
  Badge,
  IconButton,
  ConfirmationModal,
} from '@/components/common';
import { useEntity } from '@/lib/api/hooks/useEntity';
import { entitySchema } from './validation';
import type {
  EntityDto,
  EntityListDto,
  EntityFilterDto,
  EntityFormData,
} from '@/lib/api/types/entity';

export default function EntityPage() {
  // States
  const [filter, setFilter] = useState<EntityFilterDto>({
    pageNumber: 1,
    pageSize: 5,
    searchValue: '',
    isActive: undefined,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<EntityListDto | null>(null);

  // Hooks
  const {
    getEntities,
    createEntity,
    updateEntity,
    deleteEntity,
  } = useEntity();

  const { data: entities, isLoading } = getEntities(filter);

  const form = useForm({
    resolver: zodResolver(entitySchema),
    defaultValues: {
      nameL: '',
      nameF: '',
      description: '',
      isActive: 'true',
    },
  });

  // Handlers
  const handleAdd = () => {
    form.reset({
      nameL: '',
      nameF: '',
      description: '',
      isActive: 'true',
    });
    setSelectedEntity(null);
    setIsModalOpen(true);
  };

  const handleEdit = (entity: EntityListDto) => {
    form.reset({
      nameL: entity.nameL,
      nameF: entity.nameF,
      description: entity.description ?? '',
      isActive: entity.isActive ? 'true' : 'false',
    });
    setSelectedEntity(entity);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEntity(null);
    form.reset();
  };

  const handleDeleteClick = (entity: EntityListDto) => {
    setSelectedEntity(entity);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedEntity) return;

    try {
      await deleteEntity.mutateAsync(selectedEntity.id);
      setIsDeleteModalOpen(false);
      setSelectedEntity(null);
    } catch (error) {
      console.error('Failed to delete entity:', error);
    }
  };

  const onSubmit = async (formData: any) => {
    const payload = {
      nameL: formData.nameL,
      nameF: formData.nameF,
      description: formData.description,
      isActive: formData.isActive === 'true',
    };

    try {
      if (selectedEntity) {
        await updateEntity.mutateAsync({
          id: selectedEntity.id,
          ...payload,
        });
      } else {
        await createEntity.mutateAsync(payload);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save entity:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Entities</h1>
        <Button onClick={handleAdd} leftIcon={<Plus className="h-4 w-4" />}>
          Add New
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            value={filter.searchValue}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                searchValue: e.target.value,
              }))
            }
            leftIcon={<FiSearch className="h-4 w-4 text-gray-400" />}
          />
          <Select
            value={filter.isActive?.toString() ?? ''}
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
          />
        </div>

        {/* Clear Filters */}
        {(filter.searchValue || filter.isActive !== undefined) && (
          <>
            {/* Divider */}
            <div className="h-8 w-px bg-gray-200"></div>
            <Button
              variant="ghost"
              onClick={() =>
                setFilter((prev) => ({
                  ...prev,
                  searchValue: '',
                  isActive: undefined,
                }))
              }
            >
              Clear Filters
            </Button>
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedEntity ? 'Edit Entity' : 'Add New Entity'}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={updateEntity.isPending || createEntity.isPending}
            >
              {selectedEntity ? 'Save Changes' : 'Add Entity'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
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
          <Select
            label="Status"
            {...form.register('isActive')}
            error={form.formState.errors.isActive?.message}
            options={[
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Inactive' },
            ]}
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Entity"
        message="Are you sure you want to delete this entity? This action cannot be undone."
        isLoading={deleteEntity.isPending}
      />

      {/* Table */}
      <div className="mt-6 rounded-md border">
        <Table
          data={entities?.items ?? []}
          columns={[
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
              cell: ({ row }) => (
                <Badge
                  variant={row.original.isActive ? 'success' : 'error'}
                >
                  {row.original.isActive ? 'Active' : 'Inactive'}
                </Badge>
              ),
            },
            {
              header: 'Actions',
              cell: ({ row }) => (
                <div className="flex items-center gap-2">
                  <IconButton
                    onClick={() => handleEdit(row.original)}
                    icon={<Pencil className="h-4 w-4" />}
                    variant="ghost"
                  />
                  <IconButton
                    onClick={() => handleDeleteClick(row.original)}
                    icon={<Trash2 className="h-4 w-4" />}
                    variant="ghost"
                  />
                </div>
              ),
            },
          ]}
          pagination={{
            pageSize: filter.pageSize,
            pageNumber: filter.pageNumber,
            totalItems: entities?.totalItems ?? 0,
            onPageChange: (page) =>
              setFilter((prev) => ({ ...prev, pageNumber: page })),
          }}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
    resolver: zodResolver(entitySchema),
    defaultValues: {
      nameL: '',
      nameF: '',
      description: '',
      isActive: 'true',
    },
  });

  // Handlers
  const handleSubmit = (data: any) => {
    const payload = {
      ...data,
      isActive: data.isActive === 'true',
      ...(selectedEntity && { id: selectedEntity.id }),
    };

    if (selectedEntity) {
      updateEntity.mutate(payload);
    } else {
      createEntity.mutate(payload);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEntity(null);
    form.reset();
  };

  const handleEdit = (entity: EntityListDto) => {
    setSelectedEntity(entity);
    form.reset({
      nameL: entity.nameL,
      nameF: entity.nameF,
      description: entity.description || '',
      isActive: entity.isActive.toString(),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entity?')) {
      deleteEntity.mutate(id);
    }
  };

  // Table columns
  const columns = [
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
      accessor: (row: EntityListDto) => (
        <span className={row.isActive ? 'text-green-600' : 'text-red-600'}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (row: EntityListDto) => (
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => handleEdit(row)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Entity Management</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Entity
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <Table
          data={entitiesData?.items || []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: entitiesData?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedEntity ? 'Edit Entity' : 'Add New Entity'}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={updateEntity.isPending || createEntity.isPending}
            >
              {selectedEntity ? 'Save Changes' : 'Add Entity'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
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
          <Select
            label="Status"
            {...form.register('isActive')}
            error={form.formState.errors.isActive?.message}
            options={[
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Inactive' },
            ]}
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Entity"
        message="Are you sure you want to delete this entity? This action cannot be undone."
        isLoading={deleteEntity.isPending}
      />

      {/* Table */}
      <div className="mt-6 rounded-md border">
        <Table
          data={entities?.items ?? []}
          columns={[
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
              cell: ({ row }) => (
                <Badge
                  variant={row.original.isActive ? 'success' : 'error'}
                >
                  {row.original.isActive ? 'Active' : 'Inactive'}
                </Badge>
              ),
            },
            {
              header: 'Actions',
              cell: ({ row }) => (
                <div className="flex items-center gap-2">
                  <IconButton
                    onClick={() => handleEdit(row.original)}
                    icon={<Pencil className="h-4 w-4" />}
                    variant="ghost"
                  />
                  <IconButton
                    onClick={() => handleDeleteClick(row.original)}
                    icon={<Trash2 className="h-4 w-4" />}
                    variant="ghost"
                  />
                </div>
              ),
            },
          ]}
          pagination={{
            pageSize: filter.pageSize,
            pageNumber: filter.pageNumber,
            totalItems: entities?.totalItems ?? 0,
            onPageChange: (page) =>
              setFilter((prev) => ({ ...prev, pageNumber: page })),
          }}
          isLoading={isLoading}
        />
      </div>
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                type="button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={createEntity.isPending || updateEntity.isPending}
              >
                {selectedEntity ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
```

## 6. Form Validation

Create validation schema in `src/app/admin/[module]/[entity]/validation.ts`:

```typescript
import { z } from 'zod';

export const entitySchema = z.object({
  nameL: z
    .string()
    .min(3, 'Local name must be at least 3 characters')
    .max(100, 'Local name must not exceed 100 characters'),
  nameF: z
    .string()
    .min(3, 'Foreign name must be at least 3 characters')
    .max(100, 'Foreign name must not exceed 100 characters'),
  description: z.string().optional(),
  isActive: z.enum(['true', 'false']),
});
```

## Key Differences from Standard Pattern

1. **API Endpoints**

   - Uses consistent endpoint naming: `getAll`, `CreateOrUpdate`, `Delete`
   - Single endpoint for both create and update operations

2. **DTOs**

   - `id` is string type instead of number
   - Includes `name` field in addition to `nameL` and `nameF`
   - `CreateUpdateEntityDto` includes optional `id` for updates

3. **Service Layer**

   - Uses object export pattern instead of class
   - Includes `convertFilterToParams` utility
   - Single endpoint for create/update operations

4. **React Query Hooks**

   - All hooks bundled in a single `useEntity` function
   - Includes toast notifications for success/error
   - Automatic query invalidation on mutations

5. **Component Structure**
   - Uses common components: `Table`, `Button`, `Modal`, `Input`, `Select`
   - Implements pagination through the Table component
   - Form state reset on modal close
   - Confirmation dialog for delete operations

## Best Practices

1. **Type Safety**

   - Use TypeScript for all files
   - Define proper interfaces for DTOs
   - Use strict type checking

2. **State Management**

   - Use React Query for server state
   - Local state for UI elements
   - Form state with react-hook-form

3. **Error Handling**

   - Toast notifications for feedback
   - Form validation with Zod
   - API error handling

4. **Code Organization**

   - Consistent file structure
   - Clear separation of concerns
   - Reusable components

5. **Performance**
   - Pagination support
   - Optimistic updates
   - Proper cache invalidation
