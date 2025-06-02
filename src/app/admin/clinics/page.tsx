'use client';

import { useState } from 'react';

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

import { ClinicStatus } from '@/lib/api/types/clinic';
import { SelectOption } from '@/lib/api/types/select-option';
import Button from '@/components/common/Button';
import { useClinic } from '@/lib/api/hooks/useClinic';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { useCity } from '@/lib/api/hooks/useCity';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { getInitials, getStatusLabel } from '@/utils';
import Avatar from '@/components/common/Avatar';

export default function ClinicsPage() {
  const router = useRouter();
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

  const {
    getClinics: getClinicsQuery,
    getClinic: getClinicQuery,
    createOrUpdateClinic: createOrUpdateClinicMutation,
    deleteClinic: deleteClinicMutation,
    updateClinicStatus: updateClinicStatusMutation,
  } = useClinic();

  const { data: clinics, isLoading } = getClinicsQuery(filters);
  const { getCitiesForDropdown } = useCity();
  const { getSpecialtiesForDropdown } = useSpecialty();
  const { data: specialties } = getSpecialtiesForDropdown();
  const { data: cities } = getCitiesForDropdown();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this clinic?')) {
      await deleteClinicMutation.mutateAsync(id);
    }
  };

  const handleStatusChange = async (id: string, isActive: boolean) => {
    await updateClinicStatusMutation.mutateAsync({ id, isActive });
  };
  const colors = [
    '67e8f9',
    'a5b4fc',
    'fca5a5',
    '86efac',
    'fcd34d',
    'c084fc',
    '94a3b8',
    '60a5fa',
    '4ade80',
  ];
  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const imageUrl = (name: string) =>
    `https://placehold.co/400x400/${getRandomNumber(
      0,
      colors.length - 1
    )}/ffffff.png?text=${getInitials(name, 3)}&font=roboto`;
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
              value: filters.specialtyId || '',
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
              value: filters.cityId || '',
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
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Avatar name={clinic.nameF} size="lg" />
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          clinic.status === ClinicStatus.Active
                            ? 'bg-green-100 text-green-800'
                            : clinic.status === ClinicStatus.Inactive
                            ? 'bg-red-100 text-red-800'
                            : clinic.status === ClinicStatus.PendingApproval
                            ? 'bg-yellow-100 text-yellow-800'
                            : clinic.status === ClinicStatus.Rejected
                            ? 'bg-red-100 text-red-800'
                            : clinic.status === ClinicStatus.Suspended
                            ? 'bg-gray-100 text-gray-800'
                            : clinic.status === ClinicStatus.Closed
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {getStatusLabel(clinic.status || ClinicStatus.Active)}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">
                          {clinic.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {clinic.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{clinic.bio}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="inline-flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {clinic.cityName}
                    </div>
                    <div className="inline-flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      {clinic.patientsCount} patients
                    </div>
                    <div className="inline-flex items-center gap-1.5">
                      <UserRound className="w-4 h-4" />
                      {clinic.doctorsCount} doctors
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-end gap-3">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(clinic.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PageLayout>
  );
}
