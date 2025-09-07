'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import {
  AppointmentsHeader,
  AppointmentsFilters,
  AppointmentsList,
} from '@/components/patient-portal/appointments';
import { Pagination, usePagination } from '@/components/ui/pagination';
import { AlertCircle } from 'lucide-react';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { PatientAppointmentFilterDto } from '@/lib/api/types/clinic-patient';

export default function AppointmentsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Pagination hook
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination(5);

  // API hooks
  const { usePatientAppointments } = useClinicPatients();
  const { useSpecialtiesDropdown: getSpecialtiesForDropdown } = useSpecialty();

  // Build filters object for API
  const buildApiFilters = () => {
    const filters: PatientAppointmentFilterDto = {
      pageNumber: currentPage,
      pageSize: pageSize,
      isUpcoming: activeTab === 'upcoming',
    };

    // Add search filter
    if (searchQuery.trim()) {
      filters.searchValue = searchQuery.trim();
    }

    // Add specialty filter
    if (selectedSpecialty !== 'all') {
      filters.specialtyId = selectedSpecialty;
    }

    // Add status filter
    if (selectedStatus !== 'all') {
      filters.status = selectedStatus;
    }

    return filters;
  };

  // Fetch appointments with current filters and pagination
  const {
    data: appointmentsResponse,
    isLoading,
    error,
  } = usePatientAppointments(buildApiFilters());

  const { data: specialties } = getSpecialtiesForDropdown();

  // Use API data directly
  const appointmentsData = appointmentsResponse?.items || [];

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-500 mb-2">
            {t('patientPortal.appointments.messages.failedToLoad')}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {t('patientPortal.appointments.messages.retry')}
          </button>
        </div>
      </div>
    );
  }

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Handle filter changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialty(specialty);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('all');
    setSelectedStatus('all');
  };

  return (
    <div className="space-y-6">
      <AppointmentsHeader />

      <AppointmentsFilters
        specialties={specialties || []}
        searchQuery={searchQuery}
        selectedSpecialty={selectedSpecialty}
        selectedStatus={selectedStatus}
        activeTab={activeTab}
        filteredAppointmentsCount={appointmentsData.length}
        onSearchChange={handleSearchChange}
        onSpecialtyChange={handleSpecialtyChange}
        onStatusChange={handleStatusChange}
        onTabChange={handleTabChange}
        onResetFilters={handleResetFilters}
      />

      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="grid grid-cols-2 mb-4 w-full sm:w-auto h-full">
          <TabsTrigger value="upcoming" className="py-4">
            {t('patientPortal.appointments.tabs.upcoming')}
          </TabsTrigger>
          <TabsTrigger value="past" className="py-4">
            {t('patientPortal.appointments.tabs.past')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <AppointmentsList
            appointments={appointmentsData}
            isLoading={isLoading}
            activeTab={activeTab}
          />
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <AppointmentsList
            appointments={appointmentsData}
            isLoading={isLoading}
            activeTab={activeTab}
          />
        </TabsContent>
      </Tabs>

      {/* Pagination Component */}
      {appointmentsResponse && appointmentsResponse.totalCount > 0 && (
        <Pagination
          currentPage={appointmentsResponse.pageNumber}
          totalPages={appointmentsResponse.totalPages}
          totalCount={appointmentsResponse.totalCount}
          pageSize={pageSize}
          hasPreviousPage={appointmentsResponse.hasPreviousPage}
          hasNextPage={appointmentsResponse.hasNextPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          showPageSizeSelector={true}
          pageSizeOptions={[5, 10, 20, 50]}
          className="mt-6"
        />
      )}

      {/* No appointments message */}
      {!isLoading &&
        appointmentsResponse &&
        appointmentsResponse.totalCount === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <p className="text-lg font-medium mb-2">
                {t('patientPortal.appointments.messages.noAppointments')}
              </p>
              <p className="text-sm">
                {activeTab === 'upcoming'
                  ? t(
                      'patientPortal.appointments.messages.noUpcomingAppointments'
                    )
                  : t('patientPortal.appointments.messages.noPastAppointments')}
              </p>
            </div>
          </div>
        )}
    </div>
  );
}
