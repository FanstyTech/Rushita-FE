'use client';

import { useState } from 'react';
import Modal from '@/components/common/Modal';

interface Permission {
  id: string;
  name: string;
  checked: boolean;
  children?: Permission[];
}

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userId: number;
}

export function PermissionsModal({ isOpen, onClose, userName, userId }: PermissionsModalProps) {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'dashboard',
      name: 'Dashboard',
      checked: false,
      children: [
        { id: 'dashboard.view', name: 'View Dashboard', checked: false },
        { id: 'dashboard.edit', name: 'Edit Dashboard', checked: false },
      ]
    },
    {
      id: 'users',
      name: 'Users',
      checked: false,
      children: [
        { id: 'users.view', name: 'View Users', checked: false },
        { id: 'users.create', name: 'Create Users', checked: false },
        { id: 'users.edit', name: 'Edit Users', checked: false },
        { id: 'users.delete', name: 'Delete Users', checked: false },
      ]
    },
    {
      id: 'settings',
      name: 'Settings',
      checked: false,
      children: [
        { id: 'settings.view', name: 'View Settings', checked: false },
        { id: 'settings.edit', name: 'Edit Settings', checked: false },
      ]
    }
  ]);

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setPermissions(prevPermissions => {
      const updatePermissionRecursively = (perms: Permission[]): Permission[] => {
        return perms.map(perm => {
          if (perm.id === permissionId) {
            // Update the permission and its children
            const updatedPerm = {
              ...perm,
              checked,
              children: perm.children?.map(child => ({
                ...child,
                checked
              }))
            };
            return updatedPerm;
          } else if (perm.children) {
            // Recursively update children
            return {
              ...perm,
              children: updatePermissionRecursively(perm.children)
            };
          }
          return perm;
        });
      };

      return updatePermissionRecursively(prevPermissions);
    });
  };

  const renderPermissionItem = (permission: Permission, level: number = 0) => {
    return (
      <div key={permission.id} className="relative">
        <div className={`flex items-center py-3 ${level > 0 ? 'pl-8' : ''}`}>
          <div className="flex items-center flex-1 space-x-3">
            <input
              type="checkbox"
              id={permission.id}
              checked={permission.checked}
              onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor={permission.id} className="text-sm font-medium text-gray-700 select-none">
              {permission.name}
            </label>
          </div>
        </div>
        {permission.children && permission.children.length > 0 && (
          <div className={`space-y-1 ${level > 0 ? 'border-l border-gray-200 ml-4' : ''}`}>
            {permission.children.map(child => renderPermissionItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const handleSave = async () => {
    try {
      // Here you would typically save the permissions
      console.log('Saving permissions for user:', userId);
      onClose();
    } catch (error) {
      console.error('Error saving permissions:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Permissions - ${userName}`}
      footer={
        <div className="flex justify-end space-x-3 px-6 py-4 bg-gray-50 -mx-6 -mb-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      }
    >
      <div className="px-1">
        <div className="space-y-1 max-h-[60vh] overflow-y-auto px-5">
          {permissions.map(permission => renderPermissionItem(permission))}
        </div>
      </div>
    </Modal>
  );
}
