'use client';

import { useState, useEffect } from 'react';
import { usePermission } from '@/lib/api/hooks/usePermission';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import {
  Check,
  Clock,
  FileText,
  ChevronDown,
  ChevronUp,
  Settings,
  Zap,
  Target,
  X,
  Plus,
  FolderOpen,
} from 'lucide-react';
import { PermissionSelectionDto } from '@/lib/api/types/permission';

interface ManagePermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  clinicId: string;
  staffName: string;
}

export default function ManagePermissionsModal({
  isOpen,
  onClose,
  userId,
  clinicId,
  staffName,
}: ManagePermissionsModalProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<
    PermissionSelectionDto[]
  >([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );

  const { useUserPermissionSelection, saveUserPermissions } = usePermission();

  const {
    data: userPermissions,
    isLoading,
    error,
  } = useUserPermissionSelection(userId, clinicId);
  const savePermissionsMutation = saveUserPermissions;

  useEffect(() => {
    if (userPermissions) {
      const allPermissions = userPermissions.modules.flatMap(
        (module) => module.permissions
      );
      setSelectedPermissions(allPermissions.filter((p) => p.isSelected));
      // Keep all modules collapsed by default
      setExpandedModules(new Set());
    }
  }, [userPermissions]);

  const handlePermissionToggle = (permission: PermissionSelectionDto) => {
    setSelectedPermissions((prev) => {
      const exists = prev.find((p) => p.id === permission.id);
      if (exists) {
        return prev.filter((p) => p.id !== permission.id);
      } else {
        return [...prev, { ...permission, isSelected: true }];
      }
    });
  };

  const handleSave = async () => {
    if (!userPermissions) return;

    setIsSubmitting(true);
    try {
      await savePermissionsMutation.mutateAsync({
        userId: userId,
        clinicId: clinicId,
        selectedPermissions: selectedPermissions,
        notes: notes.trim() || undefined,
      });
      onClose();
    } catch (error) {
      console.error('Failed to save permissions:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectAllInModule = (moduleName: string, select: boolean) => {
    if (!userPermissions) return;

    const modulePermissions =
      userPermissions.modules.find((m) => m.moduleName === moduleName)
        ?.permissions || [];

    if (select) {
      setSelectedPermissions((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newPermissions = modulePermissions.filter(
          (p) => !existingIds.has(p.id)
        );
        return [
          ...prev,
          ...newPermissions.map((p) => ({ ...p, isSelected: true })),
        ];
      });
    } else {
      setSelectedPermissions((prev) =>
        prev.filter((p) => !modulePermissions.some((mp) => mp.id === p.id))
      );
    }
  };

  const toggleModuleExpansion = (moduleName: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleName)) {
        newSet.delete(moduleName);
      } else {
        newSet.add(moduleName);
      }
      return newSet;
    });
  };

  const filteredModules =
    userPermissions?.modules
      .map((module) => ({
        ...module,
      }))
      .filter((module) => module.permissions.length > 0) || [];

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Loading permissions...">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Error">
        <div className="text-center py-8">
          <p className="text-red-600">Failed to load permissions</p>
          <Button onClick={onClose} className="mt-4">
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage Permissions - ${staffName}`}
      maxWidth="6xl"
    >
      <div className="space-y-6">
        {/* Professional Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bulk Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Bulk Selection
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const allPermissions =
                      userPermissions?.modules.flatMap((m) => m.permissions) ||
                      [];
                    setSelectedPermissions(
                      allPermissions.map((p) => ({ ...p, isSelected: true }))
                    );
                  }}
                  className="justify-start text-left"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Select All Permissions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPermissions([])}
                  className="justify-start text-left"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Selections
                </Button>
              </div>
            </div>

            {/* Smart Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  Smart Selection
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const grantedPermissions =
                      userPermissions?.modules.flatMap((m) => m.permissions) ||
                      [];
                    setSelectedPermissions(
                      grantedPermissions
                        .filter((p) => p.isGranted)
                        .map((p) => ({ ...p, isSelected: true }))
                    );
                  }}
                  className="justify-start text-left"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Select Currently Granted
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const allPermissions =
                      userPermissions?.modules.flatMap((m) => m.permissions) ||
                      [];
                    const grantedIds = new Set(
                      allPermissions.filter((p) => p.isGranted).map((p) => p.id)
                    );
                    setSelectedPermissions(
                      allPermissions
                        .filter((p) => !grantedIds.has(p.id))
                        .map((p) => ({ ...p, isSelected: true }))
                    );
                  }}
                  className="justify-start text-left"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Select Non-Granted Only
                </Button>
              </div>
            </div>

            {/* Module Management */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">
                  Module Management
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setExpandedModules(
                      new Set(
                        userPermissions?.modules.map((m) => m.moduleName) || []
                      )
                    );
                  }}
                  className="justify-start text-left"
                >
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Expand All Modules
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExpandedModules(new Set())}
                  className="justify-start text-left"
                >
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Collapse All Modules
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {userPermissions?.modules.flatMap((m) => m.permissions)
                    .length || 0}
                </div>
                <div className="text-xs text-gray-600">Total Permissions</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {userPermissions?.modules
                    .flatMap((m) => m.permissions)
                    .filter((p) => p.isGranted).length || 0}
                </div>
                <div className="text-xs text-gray-600">Currently Granted</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedPermissions.length}
                </div>
                <div className="text-xs text-gray-600">Selected</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {userPermissions?.modules.length || 0}
                </div>
                <div className="text-xs text-gray-600">Modules</div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="Add notes about the granted permissions..."
          />
        </div>

        {/* Permissions by Module - Enhanced Header */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredModules.map((module) => {
            const isExpanded = expandedModules.has(module.moduleName);
            const moduleSelectedCount = module.permissions.filter((p) =>
              selectedPermissions.some((sp) => sp.id === p.id)
            ).length;
            const moduleGrantedCount = module.permissions.filter(
              (p) => p.isGranted
            ).length;
            const moduleTotalCount = module.permissions.length;

            return (
              <div
                key={module.moduleName}
                className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Enhanced Module Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleModuleExpansion(module.moduleName)}
                        className="p-2 hover:bg-white rounded-lg transition-colors border border-gray-200"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {module.moduleDisplayName}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {moduleTotalCount} Total
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {moduleGrantedCount} Granted
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {moduleSelectedCount} Selected
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${
                                moduleTotalCount > 0
                                  ? (moduleSelectedCount / moduleTotalCount) *
                                    100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Module Actions */}
                    <div className="flex items-center gap-3">
                      {isExpanded && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleSelectAllInModule(module.moduleName, true)
                            }
                            className="flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Select All
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleSelectAllInModule(module.moduleName, false)
                            }
                            className="flex items-center gap-1"
                          >
                            <X className="w-3 h-3" />
                            Clear All
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Permissions List - Collapsible */}
                {isExpanded && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {module.permissions.map((permission) => {
                        const isSelected = selectedPermissions.some(
                          (p) => p.id === permission.id
                        );
                        const isCurrentlyGranted = permission.isGranted;

                        return (
                          <div
                            key={permission.id}
                            className={`p-4 rounded-lg border transition-all duration-200 ${
                              isSelected
                                ? 'bg-blue-50 border-blue-200 shadow-sm'
                                : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <button
                                onClick={() =>
                                  handlePermissionToggle(permission)
                                }
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                                  isSelected
                                    ? 'bg-blue-600 border-blue-600'
                                    : 'border-gray-300 hover:border-blue-400'
                                }`}
                              >
                                {isSelected && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </button>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold text-gray-900 truncate">
                                    {permission.name}
                                  </span>
                                  {isCurrentlyGranted && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex-shrink-0">
                                      Currently Granted
                                    </span>
                                  )}
                                </div>

                                {permission.description && (
                                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {permission.description}
                                  </p>
                                )}

                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    <span className="truncate font-mono">
                                      {permission.key}
                                    </span>
                                  </span>
                                  {permission.expiresAt && (
                                    <span className="flex items-center gap-1 flex-shrink-0">
                                      <Clock className="w-3 h-3" />
                                      Expires:{' '}
                                      {new Date(
                                        permission.expiresAt
                                      ).toLocaleDateString('en-US')}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {permission.notes && (
                              <div className="mt-3 text-xs text-gray-500 bg-gray-50 p-2 rounded border-l-2 border-blue-200">
                                <span className="font-medium">Notes:</span>{' '}
                                {permission.notes}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-blue-900">
                Total Selected Permissions: {selectedPermissions.length}
              </span>
              <span className="text-sm text-blue-700">
                out of{' '}
                {userPermissions?.modules.flatMap((m) => m.permissions)
                  .length || 0}{' '}
                available permissions
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {filteredModules.length} modules displayed
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Save Permissions
          </Button>
        </div>
      </div>
    </Modal>
  );
}
