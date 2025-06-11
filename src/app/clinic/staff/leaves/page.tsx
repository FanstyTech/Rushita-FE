'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { useClinicStaffLeaves } from '@/lib/api/hooks/useClinicStaffLeaves';
import PageLayout from '@/components/layouts/PageLayout';
import { Calendar, CalendarDays, ActivitySquare } from 'lucide-react';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import LeaveForm from '@/components/clinic/staff/leaves/LeaveForm';
import { LeaveFormData } from './validation';
import { LeaveStatus, LeaveType } from '@/lib/api/types/clinic-staff-leave';
import { useClinicStaff } from '@/lib/api/hooks/useClinicStaff';
import { SelectOption } from '@/lib/api/types/select-option';
import LeaveCardSkeleton from '@/components/skeletons/LeaveCardSkeleton';
import EmptyState from '@/components/common/EmptyState';
import { ConfirmationModal } from '@/components/common';
import LeaveCard from '@/components/clinic/staff/leaves/LeaveCard';

export default function ClinicStaffLeavesPage() {
  // Auth and access control
  const { user } = useAuth();

  // UI state
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState<string>();
  const [filters, setFilters] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    clinicId: '',
    status: undefined as LeaveStatus | undefined,
    type: undefined as LeaveType | undefined,
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
  });
  // API hooks
  const {
    useLeavesList,
    useLeaveForEdit,
    createOrUpdateLeave,
    deleteLeave,
    updateLeaveStatus,
  } = useClinicStaffLeaves();

  const { data: leaveForEdit, isLoading } = useLeaveForEdit(
    selectedLeaveId ?? ''
  );
  const { useClinicStaffForDropdown } = useClinicStaff();
  const { data: staffList } = useClinicStaffForDropdown({
    clinicId: String(filters.clinicId),
  });
  const { data: leavesList, isLoading: leavesLoading } = useLeavesList(filters);

  // Effects
  useEffect(() => {
    if (user) {
      const clinicId = user.clinicInfo?.id;
      if (clinicId) {
        setFilters((prev) => ({ ...prev, clinicId }));
      }
    }
  }, [user]);

  // Event handlers
  const handleAddNew = () => {
    setSelectedLeaveId(undefined);
    setShowLeaveForm(true);
  };

  const handleEdit = (id: string) => {
    console.log(id);
    setSelectedLeaveId(id);
    setShowLeaveForm(true);
  };

  const handleDelete = (id: string) => {
    setSelectedLeaveId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedLeaveId) {
      await deleteLeave.mutateAsync(selectedLeaveId);
      setShowDeleteModal(false);
      setSelectedLeaveId(undefined);
    }
  };

  const handleLeaveSubmit = async (data: LeaveFormData) => {
    await createOrUpdateLeave.mutateAsync({
      ...data,
      id: selectedLeaveId,
    });
    setShowLeaveForm(false);
    setSelectedLeaveId(undefined);
  };

  const handleStatusChange = async (id: string, status: LeaveStatus) => {
    await updateLeaveStatus.mutateAsync({ id, status });
  };

  // Map clinic staff to dropdown options
  const staffOptions =
    staffList?.map((staff) => ({
      value: staff.value,
      label: staff.label || 'Unknown',
    })) || [];

  const leaveTypeOptions = Object.entries(LeaveType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      value: value.toString(),
      label: key,
    }));

  const leaveStatusOptions = Object.entries(LeaveStatus)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      value: value.toString(),
      label: key,
    }));

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
          haveStatusFilter={false}
          onAddNew={handleAddNew}
          additionalFilters={[
            {
              icon: <CalendarDays className="w-4 h-4" />,
              label: 'Type',
              options: [
                { value: '', label: 'All Types' },
                ...(leaveTypeOptions?.map((type: SelectOption<string>) => ({
                  value: type.value,
                  label: type.label || '',
                })) || []),
              ],
              value: String(filters.type || ''),
              onChange: (value) =>
                setFilters((prev) => ({
                  ...prev,
                  type: value,
                })),
            },

            {
              icon: <ActivitySquare className="w-4 h-4" />,
              label: 'Status',
              options: [
                { value: '', label: 'All Status' },
                ...(leaveStatusOptions?.map((city: SelectOption<string>) => ({
                  value: city.value,
                  label: city.label || '',
                })) || []),
              ],
              value: String(filters.status || ''),
              onChange: (value) =>
                setFilters((prev) => ({
                  ...prev,
                  status: value,
                })),
            },
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leavesLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <LeaveCardSkeleton key={i} />
            ))
          ) : leavesList?.items.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No Leave Requests Found"
              description="Get started by adding your first leave request"
              buttonText="Add Leave Request"
              onAction={handleAddNew}
              hasFilters={
                !!(filters.searchValue || filters.status || filters.type)
              }
            />
          ) : (
            leavesList?.items.map((leave) => (
              <LeaveCard
                key={leave.id}
                leave={leave}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Item"
          message="Are you sure you want to delete this item?"
          secondaryMessage="This action cannot be undone."
          variant="error"
          confirmText="Delete"
          isLoading={deleteLeave.isPending}
        />

        {/* Leave Form Modal */}
        <LeaveForm
          isOpen={showLeaveForm}
          onClose={() => {
            setShowLeaveForm(false);
            setSelectedLeaveId(undefined);
          }}
          onSubmit={handleLeaveSubmit}
          initialData={leaveForEdit || undefined}
          isLoading={createOrUpdateLeave.isPending || isLoading}
          staffOptions={staffOptions}
        />
      </div>
    </PageLayout>
  );
}
