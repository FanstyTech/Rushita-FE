export interface RoleDto {
  id: string;
  name: string;
  description: string;
  isSystemRole: boolean;
  clinicId?: string;
}

export interface RoleDetailDto extends RoleDto {
  permissions: PermissionDto[];
}

export interface RoleFilterDto {
  clinicId?: string;
  includeSystemRoles?: boolean;
}

export interface CreateRoleDto {
  name: string;
  description: string;
  clinicId?: string;
  permissionIds: string[];
}

export interface UpdateRoleDto {
  name: string;
  description: string;
}

export interface UpdateRolePermissionsDto {
  permissionIds: string[];
}

export interface UpdateUserRolesDto {
  roleIds: string[];
}

export interface PermissionDto {
  id: string;
  name: string;
  key: string;
  description: string;
  module: string;
}

export interface ModulePermissionsDto {
  module: string;
  permissions: PermissionDto[];
}

export interface PermissionFilterDto {
  module?: string;
}
