'use client';

import { useState, useMemo } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Table } from '@/components/common/Table';
import { Eye, MoreVertical, Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
    return mockTreatments.filter(treatment => {
      const matchesSearch = 
        treatment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        treatment.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || treatment.status === statusFilter;
      
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
      accessor: (treatment: Treatment) => new Date(treatment.startDate).toLocaleDateString('en-SA'),
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
      accessor: (treatment: Treatment) => `${treatment.cost.toLocaleString()} SAR`,
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
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900"></h2>
          <button
            onClick={() => router.push('/doctor/treatments/add')}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            New Treatment
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Treatments
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search by patient name or diagnosis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full px-4 py-2 text-gray-700 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full px-4 py-2 text-gray-700 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="all">All Status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="block w-full px-4 py-2 text-gray-700 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="block w-full px-4 py-2 text-gray-700 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setDateRange({ start: '', end: '' });
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>

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
    </PageLayout>
  );
}