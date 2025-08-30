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
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ClinicCardSkeleton from '@/components/skeletons/ClinicCardSkeleton';
import { FiMapPin } from 'react-icons/fi';
import { LuBriefcaseMedical } from 'react-icons/lu';

import { ClinicStatus, ClinicListDto } from '@/lib/api/types/clinic';
import { SelectOption } from '@/lib/api/types/select-option';
import Modal from '@/components/common/Modal';
import { useClinic } from '@/lib/api/hooks/useClinic';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { useCity } from '@/lib/api/hooks/useCity';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { getClinicStatusLabel, getClinicStatusClass } from '@/utils';
import Avatar from '@/components/common/Avatar';
import { TextArea } from '@/components/common';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/common/EmptyState';

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
    pageSize: 5000,
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
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
            <EmptyState
              icon={Users}
              title=" No clinics found"
              description="Try adjusting your search filters or add a new clinic to get started"
              buttonText="Add New Clinic"
              onAction={() => router.push('/admin/clinics/add')}
              hasFilters={
                !!(filters.searchValue || filters.role || filters.specialtyId)
              }
            />
          ) : (
            clinics?.items.map((clinic) => (
              <Card className="p-0" key={clinic.id}>
                <div className="px-6 pt-6">
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
                        <h3 className="text-lg font-semibold text-foreground mb-1">
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent asChild>
                          <div className="bg-white dark:bg-gray-800">
                            <DropdownMenuItem className="">
                              <button
                                onClick={() => handleStatusChange(clinic)}
                                className="w-full flex gap-2  px-2 py-1.5 text-start text-sm text-gray-700 dark:text-gray-300"
                              >
                                <Star className="w-4 h-4" />
                                Change Status
                              </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <button
                                className=" w-full flex gap-2 px-2 py-1.5 text-start text-sm text-gray-700 dark:text-gray-300"
                                onClick={() =>
                                  router.push(
                                    `/admin/clinics/staff/${clinic.id}`
                                  )
                                }
                              >
                                <Users className="w-4 h-4" />
                                Manage Staff
                              </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <button
                                onClick={() => handleEdit(clinic.id)}
                                className=" w-full flex gap-2 px-2 py-1.5 text-start text-sm text-gray-700 dark:text-gray-300"
                              >
                                <Edit2 className="w-4 h-4" />
                                Edit Clinic
                              </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <button
                                onClick={() => handleDelete(clinic.id)}
                                className=" w-full flex gap-2 px-2 py-1.5 text-start text-sm text-gray-700 dark:text-gray-300"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Clinic
                              </button>
                            </DropdownMenuItem>
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="grid xl:grid-cols-3 xsm:grid-cols-3 grid-cols-1   md:grid-cols-2 gap-1 mb-4">
                    <div className=" flex flex-wrap items-center gap-2 p-3 text-foreground/70 bg-gray-50 dark:bg-black/15 rounded-xl">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-xs  ">Location</div>
                        <div className="text-sm font-medium ">
                          {clinic.cityName}
                        </div>
                      </div>
                    </div>
                    <div className="flex  flex-wrap items-center  gap-2 p-3 text-foreground/70 bg-gray-50 dark:bg-black/15 rounded-xl">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-xs ">Patients</div>
                        <div className="text-sm font-medium ">
                          {clinic.patientsCount}
                        </div>
                      </div>
                    </div>
                    <div className="flex  flex-wrap xl:col-span-1  md:col-span-2 items-center gap-2 p-3 text-foreground/70 bg-gray-50 dark:bg-black/15 rounded-xl">
                      <UserRound className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-xs ">Doctors</div>
                        <div className="text-sm font-medium ">
                          {clinic.doctorsCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </motion.div>

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
              variant="lineargradian"
              disabled={updateClinicStatusMutation.isPending}
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
              className="w-16 h-16 rounded-xl border border-foreground"
            />
            <div>
              <h3 className="text-lg font-semibold ">{selectedClinic?.name}</h3>
              <p className="text-sm text-foreground/90">
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
            <label className="block text-sm font-medium ">
              Select New Status
            </label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(ClinicStatus)
                .filter(([, value]) => typeof value === 'number')
                .map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedStatus(value as ClinicStatus)}
                    className={`relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all text-foreground ${
                      selectedStatus === value
                        ? 'ring-2 ring-primary-500 ring-offset-2 bg-primary-50'
                        : 'hover:bg-gray-900 border border-gray-200'
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
            <label className="block text-sm font-medium ">
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
