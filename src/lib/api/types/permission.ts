// Permission DTO
export interface PermissionDto {
  id: string;
  key: string;
  name: string;
  description: string;
  module: string;
}

// Module with its permissions
export interface ModulePermissionsDto {
  module: string;
  permissions: PermissionDto[];
}

// Permission filter
export interface PermissionFilterDto {
  module?: string;
  searchTerm?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  pageNumber?: number;
  pageSize?: number;
}
