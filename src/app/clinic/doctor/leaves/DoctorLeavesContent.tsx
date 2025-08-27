'use client';

import { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  AlertCircle,
  ChevronDown as FiChevronDown,
  Search as FiSearch,
} from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import Modal from '@/components/common/Modal';

interface LeaveRequest {
  id: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  type: 'vacation' | 'sick' | 'personal';
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

const mockLeaves: LeaveRequest[] = [
  {
    id: '1',
    startDate: '2025-06-01',
    startTime: '09:00',
    endDate: '2025-06-05',
    endTime: '17:00',
    type: 'vacation',
    status: 'pending',
    reason: 'Annual family vacation',
  },
  {
    id: '2',
    startDate: '2025-05-25',
    startTime: '09:00',
    endDate: '2025-05-26',
    endTime: '17:00',
    type: 'sick',
    status: 'approved',
    reason: 'Medical appointment',
  },
  {
    id: '3',
    startDate: '2025-06-10',
    startTime: '09:00',
    endDate: '2025-06-10',
    endTime: '17:00',
    type: 'personal',
    status: 'rejected',
    reason: 'Personal commitment',
  },
];

const leaveTypes = ['vacation', 'sick', 'personal'];
const leaveStatuses = ['pending', 'approved', 'rejected'];

const statusClasses = {
  pending: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  approved: 'border-green-200 bg-green-50 text-green-800',
  rejected: 'border-red-200 bg-red-50 text-red-800',
};

export default function DoctorLeavesContent() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(mockLeaves);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    date: '',
  });
  const [activeFilter, setActiveFilter] = useState<'type' | 'status' | null>(
    null
  );

  const [formData, setFormData] = useState<Omit<LeaveRequest, 'id' | 'status'>>(
    {
      startDate: '',
      startTime: '09:00',
      endDate: '',
      endTime: '17:00',
      type: 'vacation',
      reason: '',
    }
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setActiveFilter(null);
  };

  const toggleFilter = (filter: 'type' | 'status') => {
    setActiveFilter((current) => (current === filter ? null : filter));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: '',
      status: '',
      date: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeave: LeaveRequest = {
      id: `leave-${Date.now()}`,
      status: 'pending',
      ...formData,
    };
    setLeaves((prev) => [newLeave, ...prev]);
    setIsModalOpen(false);
    setFormData({
      startDate: '',
      startTime: '09:00',
      endDate: '',
      endTime: '17:00',
      type: 'vacation',
      reason: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch = leave.reason
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesType = !filters.type || leave.type === filters.type;
    const matchesStatus = !filters.status || leave.status === filters.status;
    const matchesDate =
      !filters.date ||
      (leave.startDate <= filters.date && leave.endDate >= filters.date);
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  return (
    <PageLayout>
      <div className="space-y-6">
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
                placeholder="Search leaves..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-transparent focus:outline-none text-sm"
              />
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Leave Type Filter */}
            <div className="relative">
              <button
                onClick={() => toggleFilter('type')}
                className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Calendar className="w-4 h-4" />
                {filters.type
                  ? filters.type.charAt(0).toUpperCase() + filters.type.slice(1)
                  : 'Leave Type'}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeFilter === 'type' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFilter === 'type' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-fadeIn z-50">
                  <div className="space-y-2">
                    {leaveTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => handleFilterChange('type', type)}
                        className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors capitalize"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => toggleFilter('status')}
                className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 hover:text-primary transition-colors"
              >
                <AlertCircle className="w-4 h-4" />
                {filters.status
                  ? filters.status.charAt(0).toUpperCase() +
                    filters.status.slice(1)
                  : 'Status'}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeFilter === 'status' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFilter === 'status' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-fadeIn z-50">
                  <div className="space-y-2">
                    {leaveStatuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleFilterChange('status', status)}
                        className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors capitalize"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Clear Filters */}
            {(filters.search ||
              filters.type ||
              filters.status ||
              filters.date) && (
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

            {/* Add Leave Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Request Leave
            </button>
          </div>
        </div>

        {/* Leave Requests List */}
        {leaves.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="max-w-sm mx-auto">
              <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Leave Requests Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start by creating a new leave request for a doctor.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Leave Request
              </button>
            </div>
          </div>
        ) : filteredLeaves.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="max-w-sm mx-auto">
              <FiSearch className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Matching Requests
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {filteredLeaves.map((leave) => (
                <li
                  key={leave.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${
                            statusClasses[leave.status]
                          }`}
                        >
                          {leave.status}
                        </span>
                        <span className="text-sm text-gray-500 capitalize">
                          {leave.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {leave.startDate === leave.endDate ? (
                            leave.startDate
                          ) : (
                            <>
                              {leave.startDate} - {leave.endDate}
                            </>
                          )}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {leave.startTime} - {leave.endTime}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {leave.reason}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Request Leave Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request Leave"
        maxWidth="2xl"
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="leaveForm"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Submit Request
            </button>
          </div>
        }
      >
        <form id="leaveForm" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Leave Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="text-gray-400 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              >
                <option value="vacation">Vacation</option>
                <option value="sick">Sick Leave</option>
                <option value="personal">Personal Leave</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Start Date & Time
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="text-gray-400 flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="text-gray-400 w-32 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                End Date & Time
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="text-gray-400 flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="text-gray-400 w-32 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={4}
              className="text-gray-400 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              required
            />
          </div>
        </form>
      </Modal>
    </PageLayout>
  );
}
