# Rushita Frontend API Integration Guide

## Overview

This guide provides a comprehensive approach to adding new API integrations in the Rushita Frontend project. It covers the complete workflow from defining types to implementing React hooks and components.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Step-by-Step Implementation](#step-by-step-implementation)
4. [Best Practices](#best-practices)
5. [Common Patterns](#common-patterns)
6. [Error Handling](#error-handling)
7. [Testing](#testing)
8. [Examples](#examples)

## Prerequisites

- Node.js and npm installed
- Access to the Rushita-FE repository
- Understanding of TypeScript, React, and TanStack Query
- Knowledge of the existing API structure

## Project Structure

```
src/lib/api/
├── config.ts                    # API endpoints configuration
├── client.ts                    # HTTP client with authentication
├── types/
│   ├── [entity].ts             # TypeScript interfaces
│   ├── pagination.ts           # Pagination types
│   └── api.ts                  # Common API response types
├── services/
│   └── [entity].service.ts     # API service functions
└── hooks/
    └── use[Entity].ts          # React Query hooks
```

## Step-by-Step Implementation

### Step 1: Define API Endpoints

Add your API endpoints to `src/lib/api/config.ts`:

```typescript
export const API_ENDPOINTS = {
  // ... existing endpoints
  
  // New entity endpoints
  newEntity: {
    LIST: '/newEntity/getAll',
    CREATE_OR_UPDATE: '/newEntity/CreateOrUpdate',
    DELETE: '/newEntity/Delete',
    GET_ONE: '/newEntity/:id',
    GET_FOR_DROPDOWN: '/newEntity/getForDropdown',
    UPDATE_STATUS: '/newEntity/updateStatus',
  },
} as const;
```

**Endpoint Naming Conventions:**
- Use camelCase for endpoint names
- Follow RESTful conventions
- Include specific actions like `getForDropdown`, `updateStatus`
- Use `:id` placeholder for dynamic parameters

### Step 2: Define TypeScript Types

Create a new file `src/lib/api/types/[entity].ts`:

```typescript
import { PaginationRequest, PaginationResponse } from './pagination';

// Base entity interface
export interface EntityDto {
  id: string;
  nameL: string;           // Arabic name
  nameF: string;           // English name
  name: string;            // Computed name based on current language
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Create/Update DTO
export interface CreateUpdateEntityDto {
  id?: string;             // Optional for create operations
  nameL: string;
  nameF: string;
  description?: string;
  isActive: boolean;
}

// List DTO (optimized for table display)
export interface EntityListDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

// Filter DTO for search and filtering
export interface EntityFilterDto extends PaginationRequest {
  nameL?: string;
  nameF?: string;
  isActive?: boolean;
  searchValue?: string;    // General search across multiple fields
}

// Dropdown option DTO
export interface EntitySelectOption {
  value: string;
  label: string;
}

// Status update DTO
export interface UpdateEntityStatusDto {
  id: string;
  isActive: boolean;
}
```

**Type Naming Conventions:**
- Use `Dto` suffix for data transfer objects
- Use `FilterDto` for search/filter parameters
- Use `SelectOption` for dropdown options
- Include both Arabic (`nameL`) and English (`nameF`) fields
- Always include `isActive` for soft delete support

### Step 3: Create API Service

Create a new file `src/lib/api/services/[entity].service.ts`:

```typescript
import {
  EntityDto,
  CreateUpdateEntityDto,
  EntityListDto,
  EntityFilterDto,
  EntitySelectOption,
  UpdateEntityStatusDto,
} from '../types/entity';
import type { PaginationResponse } from '../types/pagination';
import type { ApiResponse } from '../types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

// Helper function to convert filter to query parameters
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
  // Get paginated list
  async getAll(
    filter: EntityFilterDto
  ): Promise<ApiResponse<PaginationResponse<EntityListDto>>> {
    return apiClient.get(API_ENDPOINTS.newEntity.LIST, {
      params: convertFilterToParams(filter),
    });
  },

  // Get single entity by ID
  async getById(id: string): Promise<ApiResponse<EntityDto>> {
    return apiClient.get(API_ENDPOINTS.newEntity.GET_ONE.replace(':id', id));
  },

  // Create new entity
  async create(data: CreateUpdateEntityDto): Promise<ApiResponse<EntityDto>> {
    return apiClient.post(API_ENDPOINTS.newEntity.CREATE_OR_UPDATE, data);
  },

  // Update existing entity
  async update(data: CreateUpdateEntityDto): Promise<ApiResponse<EntityDto>> {
    return apiClient.post(API_ENDPOINTS.newEntity.CREATE_OR_UPDATE, data);
  },

  // Create or update (handles both cases)
  async createOrUpdate(data: CreateUpdateEntityDto): Promise<ApiResponse<EntityDto>> {
    return apiClient.post(API_ENDPOINTS.newEntity.CREATE_OR_UPDATE, data);
  },

  // Delete entity
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.newEntity.DELETE, {
      params: { id },
    });
  },

  // Get dropdown options
  async getForDropdown(): Promise<ApiResponse<EntitySelectOption[]>> {
    return apiClient.get(API_ENDPOINTS.newEntity.GET_FOR_DROPDOWN);
  },

  // Update entity status
  async updateStatus(data: UpdateEntityStatusDto): Promise<ApiResponse<void>> {
    return apiClient.put(API_ENDPOINTS.newEntity.UPDATE_STATUS, data);
  },
};
```

**Service Best Practices:**
- Use consistent method naming
- Include helper functions for parameter conversion
- Handle both create and update in single method
- Support all CRUD operations
- Include specialized methods for dropdowns and status updates

### Step 4: Create React Query Hooks

Create a new file `src/lib/api/hooks/use[Entity].ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { entityService } from '../services/entity.service';
import type {
  EntityFilterDto,
  CreateUpdateEntityDto,
  UpdateEntityStatusDto,
} from '../types/entity';
import { toast } from '@/components/ui/Toast';

export function useEntity() {
  const queryClient = useQueryClient();

  // Query keys for cache management
  const queryKeys = {
    all: ['entities'] as const,
    lists: () => [...queryKeys.all, 'list'] as const,
    list: (filter: EntityFilterDto) => [...queryKeys.lists(), filter] as const,
    details: () => [...queryKeys.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.details(), id] as const,
    dropdown: () => [...queryKeys.all, 'dropdown'] as const,
  };

  // Get paginated list
  const getEntities = (filter: EntityFilterDto) =>
    useQuery({
      queryKey: queryKeys.list(filter),
      queryFn: async () => {
        const response = await entityService.getAll(filter);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch entities');
        }
        return response.result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
    });

  // Get single entity
  const getEntity = (id: string) =>
    useQuery({
      queryKey: queryKeys.detail(id),
      queryFn: async () => {
        const response = await entityService.getById(id);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch entity');
        }
        return response.result;
      },
      enabled: !!id,
    });

  // Get dropdown options
  const getEntityDropdown = () =>
    useQuery({
      queryKey: queryKeys.dropdown(),
      queryFn: async () => {
        const response = await entityService.getForDropdown();
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch dropdown data');
        }
        return response.result;
      },
      staleTime: 30 * 60 * 1000, // 30 minutes
    });

  // Create/Update mutation
  const createOrUpdateEntity = useMutation({
    mutationFn: async (data: CreateUpdateEntityDto) => {
      const response = await entityService.createOrUpdate(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to save entity');
      }
      return response.result;
    },
    onSuccess: (data, variables) => {
      const isUpdate = !!variables.id;
      toast.success(
        isUpdate ? 'Entity updated successfully' : 'Entity created successfully'
      );
      
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      if (variables.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.detail(variables.id) });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Delete mutation
  const deleteEntity = useMutation({
    mutationFn: async (id: string) => {
      const response = await entityService.delete(id);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete entity');
      }
    },
    onSuccess: () => {
      toast.success('Entity deleted successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update status mutation
  const updateEntityStatus = useMutation({
    mutationFn: async (data: UpdateEntityStatusDto) => {
      const response = await entityService.updateStatus(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to update status');
      }
    },
    onSuccess: () => {
      toast.success('Status updated successfully');
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    // Queries
    getEntities,
    getEntity,
    getEntityDropdown,
    
    // Mutations
    createOrUpdateEntity,
    deleteEntity,
    updateEntityStatus,
    
    // Query keys (for manual cache management)
    queryKeys,
  };
}
```

**Hook Best Practices:**
- Use structured query keys for cache management
- Implement proper error handling with toast notifications
- Set appropriate stale times for different data types
- Invalidate relevant queries after mutations
- Provide both queries and mutations in single hook
- Use TypeScript for type safety

### Step 5: Usage in Components

Example usage in a React component:

```typescript
import { useState } from 'react';
import { useEntity } from '@/lib/api/hooks/useEntity';
import type { EntityFilterDto, CreateUpdateEntityDto } from '@/lib/api/types/entity';

export function EntityListPage() {
  const [filter, setFilter] = useState<EntityFilterDto>({
    pageNumber: 1,
    pageSize: 10,
    searchValue: '',
    isActive: true,
  });

  const {
    getEntities,
    createOrUpdateEntity,
    deleteEntity,
    updateEntityStatus,
  } = useEntity();

  const { data, isLoading, error } = getEntities(filter);

  const handleCreate = async (formData: CreateUpdateEntityDto) => {
    await createOrUpdateEntity.mutateAsync(formData);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this entity?')) {
      await deleteEntity.mutateAsync(id);
    }
  };

  const handleStatusToggle = async (id: string, isActive: boolean) => {
    await updateEntityStatus.mutateAsync({ id, isActive });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
}
```

## Best Practices

### 1. Type Safety
- Always define proper TypeScript interfaces
- Use strict typing for all API responses
- Avoid `any` type usage
- Define separate DTOs for different operations

### 2. Error Handling
- Implement consistent error handling across all services
- Use toast notifications for user feedback
- Log errors for debugging
- Handle network errors gracefully

### 3. Caching Strategy
- Set appropriate stale times for different data types
- Use structured query keys for cache management
- Invalidate relevant queries after mutations
- Consider cache persistence for better UX

### 4. Performance
- Implement pagination for large datasets
- Use optimistic updates where appropriate
- Debounce search inputs
- Implement proper loading states

### 5. Security
- Always validate input data
- Handle authentication errors properly
- Sanitize user inputs
- Use HTTPS in production

## Common Patterns

### 1. CRUD Operations
```typescript
// Standard CRUD pattern
const entityService = {
  getAll: (filter) => apiClient.get(endpoint, { params: filter }),
  getById: (id) => apiClient.get(`${endpoint}/${id}`),
  create: (data) => apiClient.post(endpoint, data),
  update: (data) => apiClient.put(`${endpoint}/${data.id}`, data),
  delete: (id) => apiClient.delete(`${endpoint}/${id}`),
};
```

### 2. Dropdown Data
```typescript
// Dropdown pattern for select components
const getForDropdown = () => apiClient.get(`${endpoint}/dropdown`);
```

### 3. Status Updates
```typescript
// Status toggle pattern
const updateStatus = (id, isActive) => 
  apiClient.put(`${endpoint}/status`, { id, isActive });
```

### 4. File Upload
```typescript
// File upload pattern
const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post(`${endpoint}/upload`, formData);
};
```

## Error Handling

### 1. API Error Types
```typescript
export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}
```

### 2. Error Handling in Services
```typescript
const handleApiError = (error: any) => {
  if (error.statusCode === 401) {
    // Handle authentication error
    window.location.href = '/auth/login';
  } else if (error.statusCode === 403) {
    toast.error('You do not have permission to perform this action');
  } else {
    toast.error(error.message || 'An unexpected error occurred');
  }
};
```

### 3. Error Boundaries
```typescript
// Implement error boundaries for component-level error handling
class EntityErrorBoundary extends React.Component {
  // Error boundary implementation
}
```

## Testing

### 1. Service Testing
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useEntity } from '@/lib/api/hooks/useEntity';

describe('useEntity', () => {
  it('should fetch entities successfully', async () => {
    const { result } = renderHook(() => useEntity());
    
    await waitFor(() => {
      expect(result.current.getEntities.isSuccess).toBe(true);
    });
  });
});
```

### 2. Mock API Responses
```typescript
// Mock API responses for testing
const mockEntityResponse = {
  success: true,
  result: {
    items: [],
    pageNumber: 1,
    totalPages: 0,
    totalCount: 0,
  },
};
```

## Examples

### Complete Entity Integration Example

See the following files for a complete example:
- `src/lib/api/types/clinic.ts`
- `src/lib/api/services/clinic.service.ts`
- `src/lib/api/hooks/useClinic.ts`

### Advanced Patterns

1. **Bulk Operations**
```typescript
const bulkDelete = (ids: string[]) => 
  apiClient.post(`${endpoint}/bulk-delete`, { ids });
```

2. **Export/Import**
```typescript
const exportData = (filter) => 
  apiClient.get(`${endpoint}/export`, { params: filter });

const importData = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post(`${endpoint}/import`, formData);
};
```

3. **Real-time Updates**
```typescript
// Using WebSocket or Server-Sent Events
const useRealtimeEntity = () => {
  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE_URL}/entity/stream`);
    // Handle real-time updates
  }, []);
};
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend allows frontend domain
   - Check API base URL configuration

2. **Authentication Issues**
   - Verify token storage and refresh logic
   - Check authorization headers

3. **Type Errors**
   - Ensure all types are properly exported
   - Check for circular dependencies

4. **Cache Issues**
   - Clear query cache if needed
   - Check query key structure

### Debug Tips

1. Use React Query DevTools for debugging
2. Check network tab for API requests
3. Verify environment variables
4. Test API endpoints directly

## Conclusion

This guide provides a comprehensive approach to adding new API integrations in the Rushita Frontend project. Follow these patterns consistently to maintain code quality and ensure a smooth development experience.

For additional help, refer to:
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/) 