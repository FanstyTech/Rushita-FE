export interface UserPermissionSelectionDto {
  userId: string;
  userName: string;
  clinicId?: string;
  modules: ModulePermissionsDto[];
}

export interface SaveUserPermissionsDto {
  userId: string;
  clinicId?: string;
  selectedPermissions: PermissionSelectionDto[];
  notes?: string;
}
export interface ModulePermissionsDto {
  moduleName: string;
  moduleDisplayName: string;
  permissions: PermissionSelectionDto[];
}
export interface PermissionSelectionDto {
  id: string;
  name: string;
  key: string;
  description?: string;
  module: string;
  isSelected: boolean;
  isGranted: boolean;
  expiresAt?: string;
  notes?: string;
  userPermissionId?: string;
}
