'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { useClinicStaff } from '@/lib/api/hooks/useClinicStaff';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import {
  CreateUpdateClinicStaffDto,
  ClinicStaffListDto,
} from '@/lib/api/types/clinic-staff';
import PageLayout from '@/components/layouts/PageLayout';
import {
  Users,
  MoreVertical,
  Key,
  Trash2,
  Building2,
  Edit2,
} from 'lucide-react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Button from '@/components/common/Button';
import Avatar from '@/components/common/Avatar';
import Modal from '@/components/common/Modal';
import ClinicStaffForm from '@/components/clinic/staff/ClinicStaffForm';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { LuBriefcaseMedical } from 'react-icons/lu';
import { SelectOption } from '@/lib/api/types/select-option';
import ClinicStaffCardSkeleton from '@/components/skeletons/ClinicStaffCardSkeleton';
import {
  getClinicStaffStatusClass,
  getClinicStaffStatusLabel,
} from '@/utils/textUtils';
import ChangeStaffPasswordModal from '@/components/clinic/staff/ChangeStaffPasswordModal';
import EmptyState from '@/components/common/EmptyState';
import { ShieldCheck } from 'lucide-react';
import { LogOut } from 'lucide-react';
import ManagePermissionsModal from '@/components/clinic/staff/ManagePermissionsModal';

export default function ClinicStaffPage() {
  // 1. Authentication hook
  const { user } = useAuth();

  // 2. All state hooks
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<
    CreateUpdateClinicStaffDto | undefined
  >();
  const [filters, setFilters] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    clinicId: '',
    specialtyId: undefined,
    isActive: undefined,
    cityId: undefined,
    status: undefined,
  });
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedStaffForPermissions, setSelectedStaffForPermissions] =
    useState<ClinicStaffListDto | null>(null);

  // 3. API hooks
  const {
    useClinicStaffList,
    useClinicStaffForEdit,
    deleteClinicStaff,
    useChangeStaffPassword,
    createOrUpdateClinicStaff,
  } = useClinicStaff();

  const { useSpecialtiesDropdown } = useSpecialty();

  // 4. Query hooks
  const { data: staffList, isLoading: staffListLoading } =
    useClinicStaffList(filters);
  const { data: staffForEdit } = useClinicStaffForEdit(selectedStaffId ?? '');
  const { data: specialties } = useSpecialtiesDropdown();
  const updateStaffPassword = useChangeStaffPassword();

  // 5. Effects
  useEffect(() => {
    if (user) {
      const clinicId = user.clinicInfo?.id;
      if (clinicId) {
        setHasAccess(true);
        setFilters((prev) => ({ ...prev, clinicId }));
      }
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (staffForEdit && showStaffForm) {
      setEditingStaff(staffForEdit);
    }
  }, [staffForEdit, showStaffForm]);

  // Loading and access control
  if (isLoading) {
    return <ClinicStaffCardSkeleton />;
  }

  if (!hasAccess) {
    return <div>Access Denied: No clinic associated with this user.</div>;
  }

  // Event handlers
  const handleDelete = (id: string) => {
    setSelectedStaffId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedStaffId) {
      await deleteClinicStaff.mutateAsync(selectedStaffId);
      setShowDeleteModal(false);
      setSelectedStaffId(undefined);
    }
  };

  const handleEdit = (staff: ClinicStaffListDto) => {
    setSelectedStaffId(staff.id);
    setShowStaffForm(true);
  };

  const handleAddNew = () => {
    setSelectedStaffId(undefined);
    setEditingStaff(undefined);
    setShowStaffForm(true);
  };

  const handleCloseForm = () => {
    setShowStaffForm(false);
    setEditingStaff(undefined);
    setSelectedStaffId(undefined);
  };

  const handleStaffSubmit = async (data: CreateUpdateClinicStaffDto) => {
    await createOrUpdateClinicStaff.mutateAsync(data);
    setShowStaffForm(false);
    setEditingStaff(undefined);
    setSelectedStaffId(undefined);
  };

  const handleChangePassword = (staff: ClinicStaffListDto) => {
    setSelectedStaffId(staff.id);
    setPasswordModalOpen(true);
  };

  const handlePasswordSubmit = async (data: {
    id: string;
    password: string;
  }) => {
    try {
      await updateStaffPassword.mutateAsync({
        id: data.id,
        newPassword: data.password,
      });
      setPasswordModalOpen(false);
    } catch (error) {
      console.error('Failed to update password:', error);
    }
  };

  const handleManagePermissions = (staff: ClinicStaffListDto) => {
    setSelectedStaffForPermissions(staff);
    setShowPermissionsModal(true);
  };

  const handleEndSession = () => {
    window.confirm(
      "Are you sure you want to end this user's session? They will be logged out immediately."
    );
  };

  const handleClosePermissionsModal = () => {
    setShowPermissionsModal(false);
    setSelectedStaffForPermissions(null);
  };

  return (
    <PageLayout>
      <div className="space-y-4">
        <FilterBar
          filter={filters}
          onFilterChange={(newFilter) => {
            setFilters((prev) => ({
              ...prev,
              ...newFilter,
              pageNumber: newFilter.pageNumber ?? prev.pageNumber,
              pageSize: newFilter.pageSize ?? prev.pageSize,
              sortColumn: newFilter.sortColumn ?? prev.sortColumn,
              sortDirection: newFilter.sortDirection ?? prev.sortDirection,
            }));
          }}
          onAddNew={handleAddNew}
          additionalFilters={[
            {
              icon: <LuBriefcaseMedical className="w-4 h-4" />,
              label: 'Specialty',
              options: [
                { value: '', label: 'All Specialties' },
                ...(specialties?.map((specialty: SelectOption<string>) => ({
                  value: specialty.value,
                  label: specialty.label || '',
                })) || []),
              ],
              value: String(filters.specialtyId || ''),
              onChange: (value) =>
                setFilters((prev) => ({
                  ...prev,
                  specialtyId: value,
                })),
            },
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staffListLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ClinicStaffCardSkeleton key={i} />
            ))
          ) : staffList?.items.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No Staff Members Found"
              description="Get started by adding your first staff member"
              buttonText="Add Staff Member"
              onAction={handleAddNew}
              hasFilters={
                !!(filters.searchValue || filters.role || filters.specialtyId)
              }
            />
          ) : (
            staffList?.items.map((staff) => (
              <div
                key={staff.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar
                        name={staff.personName}
                        size="lg"
                        className="rounded-xl ring-2 ring-blue-100 dark:ring-blue-900/30"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {staff.personName}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getClinicStaffStatusClass(
                            staff.status
                          )}`}
                        >
                          {getClinicStaffStatusLabel(staff.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Menu as="div" className="relative">
                      <MenuButton className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      </MenuButton>
                      <MenuItems className="w-60 absolute right-0 mt-2 origin-top-right bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 focus:outline-none z-10">
                        <div className="py-2">
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={() => handleEdit(staff)}
                                className={`${
                                  active ? 'bg-gray-50 dark:bg-gray-700' : ''
                                } flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors`}
                              >
                                <Edit2 className="w-4 h-4" />
                                Edit Staff
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={() => handleChangePassword(staff)}
                                className={`${
                                  active
                                    ? 'bg-yellow-50 dark:bg-yellow-900/20'
                                    : ''
                                } flex items-center gap-2 w-full px-4 py-2 text-sm text-yellow-700 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 transition-colors`}
                              >
                                <Key className="w-4 h-4" />
                                Change Password
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={() => handleManagePermissions(staff)}
                                className={`${
                                  active ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                } flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors`}
                              >
                                <ShieldCheck className="w-4 h-4" />
                                Manage Permissions
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={() => handleEndSession()}
                                className={`${
                                  active
                                    ? 'bg-orange-50 dark:bg-orange-900/20'
                                    : ''
                                } flex items-center gap-2 w-full px-4 py-2 text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors`}
                              >
                                <LogOut className="w-4 h-4" />
                                End Session
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={() => handleDelete(staff.id)}
                                className={`${
                                  active ? 'bg-red-50 dark:bg-red-900/20' : ''
                                } flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors`}
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Clinic Staff
                              </button>
                            )}
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium">{staff.clinicName}</span>
                  </div>
                  {staff.specialtyName && (
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <LuBriefcaseMedical className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="font-medium">{staff.specialtyName}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedStaffId(undefined);
        }}
        title="Delete Staff Member"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              isLoading={deleteClinicStaff.isPending}
            >
              Delete Staff Member
            </Button>
          </div>
        }
      >
        <p className="text-gray-600">
          Are you sure you want to delete this staff member? This action cannot
          be undone.
        </p>
      </Modal>
      {filters?.clinicId && (
        <ClinicStaffForm
          isOpen={showStaffForm}
          onClose={handleCloseForm}
          initialData={editingStaff}
          clinicId={String(filters.clinicId)}
          onSubmit={handleStaffSubmit}
        />
      )}
      <ChangeStaffPasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        staffId={selectedStaffId || ''}
        onSubmit={handlePasswordSubmit}
        isLoading={updateStaffPassword.isPending}
      />
      {selectedStaffForPermissions && (
        <ManagePermissionsModal
          isOpen={showPermissionsModal}
          onClose={handleClosePermissionsModal}
          userId={selectedStaffForPermissions.userId}
          clinicId={String(filters.clinicId)}
          staffName={selectedStaffForPermissions.personName}
        />
      )}
    </PageLayout>
  );
}
