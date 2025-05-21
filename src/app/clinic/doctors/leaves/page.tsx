'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  ChevronDown,
  X,
} from 'lucide-react';
import { FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi';
import PageLayout from '@/components/layouts/PageLayout';
import Modal from '@/components/common/Modal';

interface LeaveRequest {
  id: string;
  doctorId: string;
  doctorName: string;
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
    doctorId: 'doc1',
    doctorName: 'Dr. John Smith',
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
    doctorId: 'doc2',
    doctorName: 'Dr. Sarah Johnson',
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
    doctorId: 'doc3',
    doctorName: 'Dr. Michael Brown',
    startDate: '2025-06-10',
    startTime: '09:00',
    endDate: '2025-06-10',
    endTime: '17:00',
    type: 'personal',
    status: 'rejected',
    reason: 'Personal commitment',
  },
];

const mockDoctors = [
  { id: 'doc1', name: 'Dr. John Smith' },
  { id: 'doc2', name: 'Dr. Sarah Johnson' },
  { id: 'doc3', name: 'Dr. Michael Brown' },
];

const leaveTypes = ['vacation', 'sick', 'personal'];
const leaveStatuses = ['pending', 'approved', 'rejected'];

const statusColors = {
  pending: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  approved: 'border-green-200 bg-green-50 text-green-800',
  rejected: 'border-red-200 bg-red-50 text-red-800',
};

const statusIcons = {
  pending: AlertCircle,
  approved: CheckCircle,
  rejected: XCircle,
};

export default function DoctorLeaves() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(mockLeaves);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    date: '',
  });
  const [activeFilter, setActiveFilter] = useState<'type' | 'status' | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<LeaveRequest, 'id' | 'status'>>(
    {
      doctorId: '',
      doctorName: '',
      startDate: '',
      startTime: '09:00',
      endDate: '',
      endTime: '17:00',
      type: 'vacation',
      reason: '',
    }
  );

  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

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

  const handleApproveClick = (leave: LeaveRequest) => {
    setSelectedLeave(leave);
    setIsApproveModalOpen(true);
  };

  const handleRejectClick = (leave: LeaveRequest) => {
    setSelectedLeave(leave);
    setIsRejectModalOpen(true);
  };

  const handleApprove = () => {
    if (selectedLeave) {
      setLeaves((prev) =>
        prev.map((leave) =>
          leave.id === selectedLeave.id
            ? { ...leave, status: 'approved' }
            : leave
        )
      );
      setIsApproveModalOpen(false);
      setSelectedLeave(null);
    }
  };

  const handleReject = () => {
    if (selectedLeave) {
      setLeaves((prev) =>
        prev.map((leave) =>
          leave.id === selectedLeave.id
            ? { ...leave, status: 'rejected' }
            : leave
        )
      );
      setIsRejectModalOpen(false);
      setSelectedLeave(null);
    }
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
      doctorId: '',
      doctorName: '',
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
    if (name === 'doctorId') {
      const selectedDoctor = mockDoctors.find((d) => d.id === value);
      setFormData((prev) => ({
        ...prev,
        doctorId: value,
        doctorName: selectedDoctor?.name || '',
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch = leave.doctorName
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
                placeholder="Search doctors..."
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

            {/* Date Filter */}
            <div className="relative">
              <input
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="px-4 py-2.5 text-sm text-gray-600 border-0 focus:outline-none"
              />
            </div>

            {/* Clear Filters */}
            {(filters.search ||
              filters.type ||
              filters.status ||
              filters.date) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            )}

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              New Leave Request
            </button>
          </div>
        </div>

        {/* Leave Requests List or Empty State */}
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
              <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
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
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
            {filteredLeaves.map((leave) => {
              const StatusIcon = statusIcons[leave.status];
              return (
                <motion.div
                  key={leave.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {leave.doctorName}
                        </h3>
                        <p className="text-sm text-gray-500">{leave.reason}</p>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(leave.startDate).toLocaleDateString()} -{' '}
                            {new Date(leave.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {Math.ceil(
                              (new Date(leave.endDate).getTime() -
                                new Date(leave.startDate).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{' '}
                            days
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
                          statusColors[leave.status]
                        }`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        <span className="capitalize">{leave.status}</span>
                      </span>
                      {leave.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveClick(leave)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleRejectClick(leave)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            {filteredLeaves.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No leave requests found matching your filters.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Leave Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Leave Request"
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
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Doctor
              </label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className="text-gray-400 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              >
                <option value="">Select a doctor</option>
                {mockDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

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
                  className="text-gray-400 text-gray-400flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
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

      {/* Approve Confirmation Modal */}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title="Approve Leave Request"
        maxWidth="2xl"
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsApproveModalOpen(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApprove}
              className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-all"
            >
              Approve
            </button>
          </div>
        }
      >
        <div className="py-4">
          <p className="text-gray-600">
            Are you sure you want to approve the leave request for{' '}
            <span className="font-medium text-gray-900">
              {selectedLeave?.doctorName}
            </span>
            ?
          </p>
          <div className="mt-4 bg-gray-50 rounded-xl p-4 space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Date:</span>{' '}
              {selectedLeave?.startDate} to {selectedLeave?.endDate}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Type:</span> {selectedLeave?.type}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Reason:</span>{' '}
              {selectedLeave?.reason}
            </p>
          </div>
        </div>
      </Modal>

      {/* Reject Confirmation Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Reject Leave Request"
        maxWidth="2xl"
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsRejectModalOpen(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReject}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all"
            >
              Reject
            </button>
          </div>
        }
      >
        <div className="py-4">
          <p className="text-gray-600">
            Are you sure you want to reject the leave request for{' '}
            <span className="font-medium text-gray-900">
              {selectedLeave?.doctorName}
            </span>
            ?
          </p>
          <div className="mt-4 bg-gray-50 rounded-xl p-4 space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Date:</span>{' '}
              {selectedLeave?.startDate} to {selectedLeave?.endDate}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Type:</span> {selectedLeave?.type}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Reason:</span>{' '}
              {selectedLeave?.reason}
            </p>
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
}
