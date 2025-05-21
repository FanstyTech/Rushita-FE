'use client';

import { useState, useMemo } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Table } from '@/components/common/Table';
import { Eye, MoreVertical, Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
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

export default function TreatmentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange>({ start: '', end: '' });
  const itemsPerPage = 5;
  const router = useRouter();

  // Filter treatments based on search query and status
  const filteredTreatments = useMemo(() => {
    return mockTreatments.filter((treatment) => {
      const matchesSearch =
        treatment.patientName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        treatment.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || treatment.status === statusFilter;

      const startDate = new Date(treatment.startDate);
      const startRange = dateRange.start ? new Date(dateRange.start) : null;
      const endRange = dateRange.end ? new Date(dateRange.end) : null;
      const matchesDateRange =
        (!startRange || startDate >= startRange) &&
        (!endRange || startDate <= endRange);

      return matchesSearch && matchesStatus && matchesDateRange;
    });
  }, [searchQuery, statusFilter, dateRange]);

  const columns = [
    {
      header: 'Patient Name',
      accessor: 'patientName' as keyof Treatment,
      className: 'font-medium text-gray-900',
    },

    {
      header: 'Treatment Plan',
      accessor: 'treatmentPlan' as keyof Treatment,
    },
    {
      header: 'Start Date',
      accessor: (treatment: Treatment) =>
        new Date(treatment.startDate).toLocaleDateString('en-SA'),
    },
    {
      header: 'Status',
      accessor: (treatment: Treatment) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            treatment.status === 'Completed'
              ? 'bg-green-100 text-green-800'
              : treatment.status === 'In Progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {treatment.status}
        </span>
      ),
    },

    {
      header: 'Cost (SAR)',
      accessor: (treatment: Treatment) =>
        `${treatment.cost.toLocaleString()} SAR`,
      className: 'text-right',
    },
    {
      header: '',
      accessor: (treatment: Treatment) => (
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
      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Treatments
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage and track patient treatments
              </p>
            </div>
            <Link
              href="/doctor/treatments/add"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              New Treatment
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 sm:p-6">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 sm:space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Search Input */}
              <div className="lg:col-span-5">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Search
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by patient name or diagnosis..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 text-gray-900 placeholder:text-gray-400 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors sm:text-sm"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="lg:col-span-3">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full px-4 py-2.5 text-gray-900 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors sm:text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>

              {/* Date Range Filter */}
              <div className="lg:col-span-4">
                <label
                  htmlFor="dateRange"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      type="date"
                      id="startDate"
                      value={dateRange.start}
                      onChange={(e) =>
                        setDateRange((prev) => ({
                          ...prev,
                          start: e.target.value,
                        }))
                      }
                      className="block w-full px-3 py-2.5 text-gray-900 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors sm:text-sm"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      id="endDate"
                      value={dateRange.end}
                      onChange={(e) =>
                        setDateRange((prev) => ({
                          ...prev,
                          end: e.target.value,
                        }))
                      }
                      className="block w-full px-3 py-2.5 text-gray-900 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setDateRange({ start: '', end: '' });
                }}
                className="px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6">
        <Table<Treatment>
          data={filteredTreatments}
          columns={columns}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredTreatments.length / itemsPerPage)}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredTreatments.length}
          noDataMessage={{
            title: 'No treatments found',
            subtitle: 'No treatment plans match your search criteria.',
          }}
        />
      </div>
    </PageLayout>
  );
}
