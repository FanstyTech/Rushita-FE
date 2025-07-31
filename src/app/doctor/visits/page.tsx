'use client';

import { useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Table, type Column } from '@/components/common/Table';
import { ActivitySquare, Eye, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { useVisit } from '@/lib/api/hooks/useVisit';
import { VisitListDto, VisitStatus } from '@/lib/api/types/treatment';
import {
  getVisitStatusClass,
  getVisitStatusLabel,
  getVisitTypeLabel,
} from '@/utils/textUtils';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { useRouter } from 'next/navigation';

export default function VisitsPage() {
  const router = useRouter();

  // States
  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    isActive: undefined as boolean | undefined,
  });

  // Get visits using the hook
  const { useVisitList: getVisits } = useVisit();
  const { data: visitsData, isLoading } = getVisits(filter);

  const visits = visitsData?.items || [];

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
          <Link
            href={`/doctor/visits/${row.original.id}`}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            title="View details"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </Link>
          <Link
            href={`/doctor/visits/${row.original.id}/edit`}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            title="Edit visit"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </Link>
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
          onAddNew={() => router.push('/doctor/visits/add')}
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
      </div>
    </PageLayout>
  );
}
