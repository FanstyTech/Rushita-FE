'use client';

import { useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Table, type Column } from '@/components/common/Table';
import { ActivitySquare, Eye, Pencil, Trash2 } from 'lucide-react';
import { useVisit } from '@/lib/api/hooks/useVisit';
import { VisitListDto, VisitStatus } from '@/lib/api/types/visit';
import {
  getVisitStatusClass,
  getVisitStatusLabel,
  getVisitTypeLabel,
} from '@/utils/textUtils';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ConfirmationModal } from '@/components/common';

export default function VisitsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const clinicId = user?.clinicInfo?.id || '';
  // States
  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    isActive: undefined as boolean | undefined,
    clinicId: clinicId,
  });

  // Get visits using the hook
  const { useVisitList: getVisits, deleteVisit } = useVisit();
  const { data: visitsData, isLoading } = getVisits(filter);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<VisitListDto | null>(null);
  const visits = visitsData?.items || [];

  const handleDelete = async (price: VisitListDto) => {
    setSelectedVisit(price);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = async () => {
    if (selectedVisit) {
      await deleteVisit.mutateAsync(selectedVisit.id);
      setIsDeleteModalOpen(false);
      setSelectedVisit(null);
    }
  };
  const columns: Column<VisitListDto>[] = [
    {
      header: 'Visit #',
      accessor: 'visitNumber',
    },
    {
      header: 'Patient Name',
      accessor: 'patientName',
    },
    {
      header: 'Doctor',
      accessor: 'staffName',
    },
    {
      header: 'Date',
      accessor: 'createdAt',
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString('en-SA'),
    },
    {
      header: 'Type',
      accessor: 'type',
      cell: ({ row }) => {
        const visitType = row.original.type;
        return getVisitTypeLabel(visitType);
      },
    },
    {
      header: 'Status',
      accessor: 'currentStatus',
      cell: ({ row }) => {
        const status = row.original.currentStatus;
        const statusClass = getVisitStatusClass(status);
        const statusText = getVisitStatusLabel(status);

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}
          >
            {statusText}
          </span>
        );
      },
    },
    {
      header: '',
      accessor: 'id',
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={() =>
              router.push(`/clinic/doctor/visits/${row.original.id}`)
            }
            variant="ghost"
            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            title="View visit details"
          >
            <Eye className="w-4 h-4 " />
          </Button>
          <Button
            onClick={() =>
              router.push(`/clinic/doctor/visits/${row.original.id}/edit`)
            }
            variant="ghost"
            className="p-1 text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors"
            title="Edit visit details"
          >
            <Pencil className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            onClick={() => handleDelete(row.original)}
            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
      className: 'w-20',
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-4">
        <FilterBar
          filter={filter}
          haveStatusFilter={false}
          onFilterChange={(newFilter) => {
            setFilter((prev) => ({
              ...prev,
              ...newFilter,
              pageNumber: newFilter.pageNumber ?? prev.pageNumber,
              pageSize: newFilter.pageSize ?? prev.pageSize,
              sortColumn: newFilter.sortColumn ?? prev.sortColumn,
              sortDirection: newFilter.sortDirection ?? prev.sortDirection,
            }));
          }}
          additionalFilters={[
            {
              icon: <ActivitySquare className="w-4 h-4" />,
              label: 'Status',
              options: [
                { value: '', label: 'All Status' },
                ...(Object.entries(VisitStatus)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: key,
                  })) || []),
              ],
              value: String(filter.status || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  status: value,
                })),
            },
          ]}
          onAddNew={() => router.push('/clinic/doctor/visits/add')}
        />

        {/* Table */}
        <Table<VisitListDto>
          data={visits}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize || 5,
            pageIndex: filter.pageNumber - 1,
            pageCount: visitsData?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete visit"
          message="Are you sure you want to delete this visit?"
          secondaryMessage="This action cannot be undone."
          variant="error"
          confirmText="Delete"
          isLoading={deleteVisit.isPending}
        />
      </div>
    </PageLayout>
  );
}
