'use client';

import { useState, useMemo } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Table, type Column } from '@/components/common/Table';
import {
  Eye,
  MoreVertical,
  Plus,
  Search as FiSearch,
  Calendar,
  AlertCircle,
  ChevronDown as FiChevronDown,
} from 'lucide-react';
import Link from 'next/link';

interface Treatment {
  id: number;
  patientName: string;
  diagnosis: string;
  treatmentPlan: string;
  startDate: string;
  status: 'Completed' | 'In Progress' | 'Scheduled';
  nextAppointment: string | null;
  cost: number;
}

// Mock data for treatments
const mockTreatments: Treatment[] = [
  {
    id: 1,
    patientName: 'Mohammed Ahmed',
    diagnosis: 'Dental Cavity',
    treatmentPlan: 'Root Canal Treatment',
    startDate: '2025-05-15',
    status: 'In Progress',
    nextAppointment: '2025-05-25',
    cost: 1500,
  },
  {
    id: 2,
    patientName: 'Sara Abdullah',
    diagnosis: 'Chronic Back Pain',
    treatmentPlan: 'Physical Therapy',
    startDate: '2025-05-10',
    status: 'Scheduled',
    nextAppointment: '2025-05-20',
    cost: 800,
  },
  {
    id: 3,
    patientName: 'Khalid Omar',
    diagnosis: 'Hypertension',
    treatmentPlan: 'Medication + Lifestyle Changes',
    startDate: '2025-05-01',
    status: 'Completed',
    nextAppointment: null,
    cost: 500,
  },
  {
    id: 4,
    patientName: 'Fatima Hassan',
    diagnosis: 'Migraine',
    treatmentPlan: 'Medication + Preventive Care',
    startDate: '2025-05-12',
    status: 'In Progress',
    nextAppointment: '2025-05-28',
    cost: 600,
  },
  {
    id: 5,
    patientName: 'Abdullah Nasser',
    diagnosis: 'Allergic Rhinitis',
    treatmentPlan: 'Immunotherapy',
    startDate: '2025-05-08',
    status: 'In Progress',
    nextAppointment: '2025-05-22',
    cost: 1200,
  },
];

interface DateRange {
  start: string;
  end: string;
}

const treatmentStatuses = ['Completed', 'In Progress', 'Scheduled'];

export default function TreatmentsPage() {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    dateRange: { start: '', end: '' },
  });
  const [activeFilter, setActiveFilter] = useState<'status' | 'date' | null>(
    null
  );

  // Filter treatments based on search query and status
  const filteredTreatments = useMemo(() => {
    return mockTreatments.filter((treatment) => {
      const matchesSearch =
        treatment.patientName
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        treatment.diagnosis
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesStatus =
        !filters.status || treatment.status === filters.status;

      const startDate = new Date(treatment.startDate);
      const startRange = filters.dateRange.start
        ? new Date(filters.dateRange.start)
        : null;
      const endRange = filters.dateRange.end
        ? new Date(filters.dateRange.end)
        : null;
      const matchesDateRange =
        (!startRange || startDate >= startRange) &&
        (!endRange || startDate <= endRange);

      return matchesSearch && matchesStatus && matchesDateRange;
    });
  }, [filters]);

  const handleFilterChange = (
    key: string,
    value: string | DateRange | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setActiveFilter(null);
  };

  const toggleFilter = (filter: 'status' | 'date') => {
    setActiveFilter((current) => (current === filter ? null : filter));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      dateRange: { start: '', end: '' },
    });
  };
  const columns: Column<Treatment>[] = [
    {
      header: 'Patient Name',
      accessor: 'patientName',
    },
    {
      header: 'Treatment Plan',
      accessor: 'treatmentPlan',
    },
    {
      header: 'Start Date',
      accessor: 'startDate',
      cell: ({ row }) =>
        new Date(row.original.startDate).toLocaleDateString('en-SA'),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: ({ row }) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.original.status === 'Completed'
              ? 'bg-green-100 text-green-800'
              : row.original.status === 'In Progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      header: 'Cost (SAR)',
      accessor: 'cost',
      cell: ({ row }) => `${row.original.cost.toLocaleString()} SAR`,
      className: 'text-right',
    },
    {
      header: '',
      accessor: 'id',
      cell: ({}) => (
        <div className="flex items-center justify-end gap-2">
          <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      ),
      className: 'w-20',
    },
  ];

  return (
    <PageLayout>
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5">
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search treatments..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-transparent focus:outline-none text-sm"
            />
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={() => toggleFilter('status')}
              className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 hover:text-primary transition-colors"
            >
              <AlertCircle className="w-4 h-4" />
              {filters.status ? filters.status : 'Status'}
              <FiChevronDown
                className={`w-4 h-4 transition-transform ${
                  activeFilter === 'status' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {activeFilter === 'status' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-fadeIn z-50">
                <div className="space-y-2">
                  {treatmentStatuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleFilterChange('status', status)}
                      className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Date Filter */}
          <div className="relative">
            <button
              onClick={() => toggleFilter('date')}
              className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Calendar className="w-4 h-4" />
              {filters.dateRange.start
                ? `${filters.dateRange.start} - ${
                    filters.dateRange.end || 'Now'
                  }`
                : 'Date Range'}
              <FiChevronDown
                className={`w-4 h-4 transition-transform ${
                  activeFilter === 'date' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {activeFilter === 'date' && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-fadeIn z-50">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) =>
                        handleFilterChange('dateRange', {
                          ...filters.dateRange,
                          start: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) =>
                        handleFilterChange('dateRange', {
                          ...filters.dateRange,
                          end: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters */}
          {(filters.search ||
            filters.status ||
            filters.dateRange.start ||
            filters.dateRange.end) && (
            <>
              {/* Divider */}
              <div className="h-8 w-px bg-gray-200"></div>
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                Clear Filters
              </button>
            </>
          )}

          {/* Add Treatment Button */}
          <Link
            href="/doctor/visits/add"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add Treatment
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6">
        <Table<Treatment>
          data={filteredTreatments}
          columns={columns}
          noDataMessage={{
            title: 'No treatments found',
            subtitle: 'No treatment plans match your search criteria.',
          }}
        />
      </div>
    </PageLayout>
  );
}
