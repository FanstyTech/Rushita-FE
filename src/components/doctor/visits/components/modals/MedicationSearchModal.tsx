'use client';

import { Input, Table } from '@/components/common';
import Modal from '@/components/common/Modal';
import { type Column } from '@/components/common/Table';
import { MedicineListDto } from '@/lib/api/types/medicine';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { FilterState } from '@/components/common/FilterBar';
import { PaginationResponse } from '@/lib/api/types/pagination';

interface MedicationSearchModalProps {
  isLoading: boolean;
  isOpen: boolean;
  medications: PaginationResponse<MedicineListDto> | null | undefined;
  searchQuery: string;
  filter: FilterState;
  setFilter: (
    filter: FilterState | ((prev: FilterState) => FilterState)
  ) => void;
  setSearchQuery: (query: string) => void;
  onClose: () => void;
  onSelectMedication: (medication: MedicineListDto) => void;
}

export default function MedicationSearchModal({
  isOpen,
  medications,
  isLoading,
  searchQuery,
  filter,
  setFilter,
  setSearchQuery,
  onClose,
  onSelectMedication,
}: MedicationSearchModalProps) {
  const columns: Column<MedicineListDto>[] = [
    {
      header: 'Code',
      accessor: 'code',
    },
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Scientific Name',
      accessor: 'scientificName',
    },
    {
      header: 'Medication Type',
      accessor: 'medicationTypeName',
    },

    {
      header: 'Actions',
      accessor: 'id',
      cell: ({ row }) => (
        <button
          onClick={() => onSelectMedication(row.original)}
          className="text-blue-600 hover:text-blue-900 flex items-center"
        >
          <CheckCircleIcon className="h-5 w-5 mr-1" />
          Select
        </button>
      ),
      className: 'text-right',
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Search Medications"
      maxWidth="6xl"
    >
      <div className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by medication name, category, or manufacturer..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            startIcon={
              <svg
                className="w-4 h-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </div>

        <Table<MedicineListDto>
          data={medications?.items ?? []}
          columns={columns}
          isLoading={isLoading}
          noDataMessage={{
            title: 'No medications found',
            subtitle: 'Try adjusting your search terms',
          }}
          pagination={{
            pageSize: filter.pageSize,
            pageIndex: filter.pageNumber - 1,
            pageCount: medications?.totalPages ?? 0,
            onPageChange: (page: number) =>
              setFilter({ ...filter, pageNumber: page + 1 }),
          }}
        />
      </div>
    </Modal>
  );
}
