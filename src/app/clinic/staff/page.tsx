'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { useClinicStaff } from '@/lib/api/hooks/useClinicStaff';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import {
  CreateUpdateClinicStaffDto,
  ClinicStaffStatus,
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
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar
                      name={staff.personName}
                      size="lg"
                      className="rounded-xl"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {staff.personName}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getClinicStaffStatusClass(
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
                      <MenuButton className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </MenuButton>
                      <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-xl shadow-lg border border-gray-100 focus:outline-none">
                        <div className="py-2">
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={() => handleEdit(staff)}
                                className={`${
                                  active ? 'bg-gray-50' : ''
                                } flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700`}
                              >
                                <Edit2 className="w-4 h-4" />
                                Edit Clinic
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={() => handleChangePassword(staff)}
                                className={`${
                                  active ? 'bg-yellow-50' : ''
                                } flex items-center gap-2 w-full px-4 py-2 text-sm text-yellow-700`}
                              >
                                <Key className="w-4 h-4" />
                                Change Password
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={() => handleDelete(staff.id)}
                                className={`${
                                  active ? 'bg-gray-50' : ''
                                } flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600`}
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

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Building2 className="w-4 h-4" />
                    <span>{staff.clinicName}</span>
                  </div>
                  {staff.specialtyName && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <LuBriefcaseMedical className="w-4 h-4" />
                      <span>{staff.specialtyName}</span>
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
    </PageLayout>
  );
}
