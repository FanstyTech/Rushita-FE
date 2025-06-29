import { UserPermissionDto } from '@/lib/api/types/auth';
import { NavItem } from '@/types/navigation';

export const hasPermission = (
  requiredPermission: string | undefined,
  userPermissions: UserPermissionDto[]
): boolean => {
  if (!requiredPermission) return true;
  return userPermissions.some((p) => p.key === requiredPermission);
};

export const filterNavItemsByPermission = (
  items: NavItem[],
  userPermissions: UserPermissionDto[]
): NavItem[] => {
  return items
    .filter((item) => hasPermission(item.permission, userPermissions))
    .map((item) => ({
      ...item,
      children: item.children
        ? filterNavItemsByPermission(item.children, userPermissions)
        : undefined,
    }))
    .filter((item) => !item.children || item.children.length > 0);
};
