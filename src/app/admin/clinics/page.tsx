'use client';

import { useState, useEffect } from 'react';

import PageLayout from '@/components/layouts/PageLayout';
import {
  MapPin,
  Edit2,
  Trash2,
  MoreVertical,
  Users,
  UserRound,
  Star,
  Building2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ClinicCardSkeleton from '@/components/skeletons/ClinicCardSkeleton';
import { FiMapPin } from 'react-icons/fi';
import { LuBriefcaseMedical } from 'react-icons/lu';

import { ClinicStatus, ClinicListDto } from '@/lib/api/types/clinic';
import { SelectOption } from '@/lib/api/types/select-option';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { useClinic } from '@/lib/api/hooks/useClinic';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { useCity } from '@/lib/api/hooks/useCity';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { getClinicStatusLabel, getClinicStatusClass } from '@/utils';
import Avatar from '@/components/common/Avatar';
import { TextArea } from '@/components/common';
import { Menu } from '@headlessui/react';
import { Fragment } from 'react';

export default function ClinicsPage() {
  const router = useRouter();
  const [selectedClinic, setSelectedClinic] = useState<ClinicListDto | null>(
    null
  );
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusReason, setStatusReason] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ClinicStatus | null>(
    null
  );
  const [filters, setFilters] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    specialtyId: undefined as string | undefined,
    isActive: undefined as boolean | undefined,
    cityId: undefined as string | undefined,
    status: undefined as ClinicStatus | undefined,
  });

  const [openStatusId, setOpenStatusId] = useState<string | null>(null);

  const {
    useClinicsList: getClinicsQuery,
    deleteClinic: deleteClinicMutation,
    updateClinicStatus: updateClinicStatusMutation,
  } = useClinic();

  const { data: clinics, isLoading } = getClinicsQuery(filters);
  const { useCitiesDropdown: getCitiesForDropdown } = useCity();
  const { useSpecialtiesDropdown: getSpecialtiesForDropdown } = useSpecialty();
  const { data: specialties } = getSpecialtiesForDropdown();
  const { data: cities } = getCitiesForDropdown({
    filter: '',
    countryId: '',
    all: true,
  });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this clinic?')) {
      await deleteClinicMutation.mutateAsync(id);
    }
  };

  const handleStatusChange = (clinic: ClinicListDto) => {
    setSelectedClinic(clinic);
    setShowStatusModal(true);
  };

  const handleStatusConfirm = async () => {
    if (!selectedClinic || selectedStatus === null) return;

    try {
      await updateClinicStatusMutation.mutateAsync({
        clinicId: selectedClinic.id,
        status: selectedStatus,
        reason: statusReason.trim() || undefined,
      });
      setShowStatusModal(false);
      setSelectedClinic(null);
      setStatusReason('');
      setSelectedStatus(null);
    } catch (error) {
      console.error('Failed to update clinic status:', error);
    }
  };

  const handleEdit = (clinicId: string) => {
    router.push(`/admin/clinics/edit/${clinicId}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openStatusId &&
        !(event.target as Element).closest('.status-dropdown')
      ) {
        setOpenStatusId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openStatusId]);

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
          onAddNew={() => router.push('/admin/clinics/add')}
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
            {
              icon: <FiMapPin className="w-4 h-4" />,
              label: 'City',
              options: [
                { value: '', label: 'All Cities' },
                ...(cities?.map((city: SelectOption<string>) => ({
                  value: city.value,
                  label: city.label || '',
                })) || []),
              ],
              value: String(filters.cityId || ''),
              onChange: (value) =>
                setFilters((prev) => ({
                  ...prev,
                  cityId: value,
                })),
            },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ClinicCardSkeleton key={i} />
            ))
          ) : clinics?.items.length === 0 ? (
            <div className="col-span-3">
              <div className="relative bg-white rounded-3xl p-12 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <Building2 className="w-12 h-12 text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
                </div>

                <div className="mt-8 space-y-3">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    No clinics found
                  </h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    Try adjusting your search filters or add a new clinic to get
                    started
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => {
                      setFilters({
                        pageNumber: 1,
                        pageSize: 5,
                        sortColumn: '',
                        sortDirection: '',
                        searchValue: '',
                        specialtyId: undefined,
                        isActive: undefined,
                        cityId: undefined,
                        status: undefined,
                      });
                    }}
                    className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
                  >
                    Clear Filters
                  </Button>
                  <Button
                    onClick={() => router.push('/admin/clinics/add')}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors duration-200"
                  >
                    Add New Clinic
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            clinics?.items.map((clinic) => (
              <div
                key={clinic.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16">
                        <Avatar
                          name={clinic.name}
                          size="lg"
                          className="w-16 h-16 rounded-xl border-2 border-gray-100"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getClinicStatusClass(
                            clinic.status || ClinicStatus.Active
                          )}`}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {clinic.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getClinicStatusClass(
                              clinic.status || ClinicStatus.Active
                            )}`}
                          >
                            {getClinicStatusLabel(
                              clinic.status || ClinicStatus.Active
                            )}
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
                                  onClick={() => handleStatusChange(clinic)}
                                  className={`${
                                    active ? 'bg-gray-50' : ''
                                  } flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700`}
                                >
                                  <Star className="w-4 h-4" />
                                  Change Status
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() =>
                                    router.push(
                                      `/admin/clinics/${clinic.id}/staff`
                                    )
                                  }
                                  className={`${
                                    active ? 'bg-gray-50' : ''
                                  } flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700`}
                                >
                                  <Users className="w-4 h-4" />
                                  Manage Staff
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleEdit(clinic.id)}
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
                                  onClick={() => handleDelete(clinic.id)}
                                  className={`${
                                    active ? 'bg-gray-50' : ''
                                  } flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete Clinic
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Menu>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Location</div>
                        <div className="text-sm font-medium text-gray-900">
                          {clinic.cityName}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Patients</div>
                        <div className="text-sm font-medium text-gray-900">
                          {clinic.patientsCount}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                      <UserRound className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Doctors</div>
                        <div className="text-sm font-medium text-gray-900">
                          {clinic.doctorsCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal
        isOpen={showStatusModal}
        onClose={() => {
          setShowStatusModal(false);
          setSelectedClinic(null);
          setStatusReason('');
          setSelectedStatus(null);
        }}
        title="Update Clinic Status"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowStatusModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStatusConfirm}
              isLoading={updateClinicStatusMutation.isPending}
              variant="primary"
            >
              Update Status
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Avatar
              name={selectedClinic?.name || ''}
              size="lg"
              className="w-16 h-16 rounded-xl border-2 border-gray-100"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedClinic?.name}
              </h3>
              <p className="text-sm text-gray-500">
                Current Status:{' '}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getClinicStatusClass(
                    selectedClinic?.status || ClinicStatus.Active
                  )}`}
                >
                  {getClinicStatusLabel(
                    selectedClinic?.status || ClinicStatus.Active
                  )}
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Select New Status
            </label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(ClinicStatus)
                .filter(([key, value]) => typeof value === 'number')
                .map(([key, value]) => (
                  <button
                    key={value}
                    onClick={() => setSelectedStatus(value as ClinicStatus)}
                    className={`relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all text-gray-900 ${
                      selectedStatus === value
                        ? 'ring-2 ring-primary-500 ring-offset-2 bg-primary-50'
                        : 'hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${getClinicStatusClass(
                        value as ClinicStatus
                      )}`}
                    />
                    {getClinicStatusLabel(value as ClinicStatus)}
                  </button>
                ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Reason for Status Change
            </label>
            <TextArea
              value={statusReason}
              onChange={(e) => setStatusReason(e.target.value)}
              placeholder="Enter the reason for changing the status..."
              className="w-full min-h-[100px]"
            />
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
}
