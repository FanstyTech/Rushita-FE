# Frontend Page Creation Guide

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

Create a new file in `src/app/admin/[module]/[entity]/page.tsx`:

```typescript
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { Table, Button, Modal, Input, Select } from '@/components/common';
import { useEntity } from '@/lib/api/hooks/useEntity';
import { entitySchema } from './validation';
import type { EntityListDto, EntityFilterDto } from '@/lib/api/types/entity';

export default function EntityPage() {
  // State
  const [filter, setFilter] = useState<EntityFilterDto>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<EntityListDto | null>(
    null
  );

  // Hooks
  const { getEntities, createEntity, updateEntity, deleteEntity } = useEntity();

  const { data: entitiesData, isLoading } = getEntities(filter);

  // Form
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedEntity ? 'Edit Entity' : 'Add Entity'}
      >
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
            <div className="flex justify-end gap-2">
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
