'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PageLayout from '@/components/layouts/PageLayout';
import {
  Users,
  Edit2,
  Trash2,
  Building2,
  MoreVertical,
  Key,
} from 'lucide-react';
import { Menu } from '@headlessui/react';
import { useClinicStaff } from '@/lib/api/hooks/useClinicStaff';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import {
  CreateUpdateClinicStaffDto,
  ClinicStaffStatus,
  ClinicStaffListDto,
} from '@/lib/api/types/clinic-staff';
import Button from '@/components/common/Button';
import Avatar from '@/components/common/Avatar';
import Modal from '@/components/common/Modal';
import ClinicStaffForm from './ClinicStaffForm';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { LuBriefcaseMedical } from 'react-icons/lu';
import { SelectOption } from '@/lib/api/types/select-option';
import ClinicStaffCardSkeleton from '@/components/skeletons/ClinicStaffCardSkeleton';
import {
  getClinicStaffStatusClass,
  getClinicStaffStatusLabel,
} from '@/utils/textUtils';
import ChangeStaffPasswordModal from './ChangeStaffPasswordModal';

export default function ClinicStaffPage() {
  const params = useParams();
  const clinicId = params.id as string;
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string>();
  const [filters, setFilters] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    clinicId: clinicId,
    specialtyId: undefined as string | undefined,
    isActive: undefined as boolean | undefined,
    cityId: undefined as string | undefined,
    status: undefined as ClinicStaffStatus | undefined,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<
    CreateUpdateClinicStaffDto | undefined
  >();

  const {
    useClinicStaffList,
    useClinicStaffForEdit,
    createOrUpdateClinicStaff,
    deleteClinicStaff,
    useChangeStaffPassword,
  } = useClinicStaff();

  const updateStaffPassword = useChangeStaffPassword();

  const { data: staffForEdit } = useClinicStaffForEdit(selectedStaffId ?? '');

  const { useSpecialtiesDropdown } = useSpecialty();
  const { data: specialties } = useSpecialtiesDropdown();

  const { data: staffList, isLoading } = useClinicStaffList(filters);

  const handleDelete = (id: string) => {
    setSelectedStaffId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
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

  const handleStaffSubmit = async (data: CreateUpdateClinicStaffDto) => {
    await createOrUpdateClinicStaff.mutateAsync(data);
    setShowStaffForm(false);
    setEditingStaff(undefined);
    setSelectedStaffId(undefined);
  };

  const handleCloseForm = () => {
    setShowStaffForm(false);
    setEditingStaff(undefined);
    setSelectedStaffId(undefined);
  };
  const handleChangePassword = (staff: ClinicStaffListDto) => {
    setSelectedStaffId(staff.id);
    setPasswordModalOpen(true);
  };
  useEffect(() => {
    if (staffForEdit && showStaffForm) {
      setEditingStaff(staffForEdit);
    }
  }, [staffForEdit, showStaffForm]);

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
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ClinicStaffCardSkeleton key={i} />
            ))
          ) : staffList?.items.length === 0 ? (
            <div className="col-span-3">
              <div className="relative bg-white rounded-3xl p-12 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <Users className="w-12 h-12 text-white mb-3" />
                </div>

                <div className="mt-8 space-y-3">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    No Staff Members Found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {filters.searchValue || filters.role
                      ? 'Try adjusting your search or filter criteria'
                      : 'Get started by adding your first staff member'}
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddNew}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors duration-200"
                  >
                    Add Staff Member
                  </Button>
                </div>
              </div>
            </div>
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
                      <Menu.Button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </Menu.Button>
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-xl shadow-lg border border-gray-100 focus:outline-none">
                        <div className="py-2">
                          <Menu.Item>
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
                          </Menu.Item>
                          <Menu.Item>
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
                          </Menu.Item>
                          <Menu.Item>
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
                          </Menu.Item>
                        </div>
                      </Menu.Items>
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
              onClick={handleDeleteConfirm}
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

      <ClinicStaffForm
        isOpen={showStaffForm}
        onClose={handleCloseForm}
        initialData={editingStaff}
        clinicId={clinicId}
        onSubmit={handleStaffSubmit}
      />
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
