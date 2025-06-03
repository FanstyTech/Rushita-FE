'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import {
  DoctorSchedule,
  LeaveRequest,
  doctorScheduleAPI,
  ScheduleStatus,
} from '@/mockData/doctorSchedule';
import { format, startOfWeek, addDays } from 'date-fns';
import { Table, type Column } from '@/components/common/Table';
import { Doctor, doctorAPI } from '@/mockData/doctors';

const ITEMS_PER_PAGE = 10;

export default function DoctorSchedulePage() {
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDate] = useState<Date>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(leaveRequests.length / ITEMS_PER_PAGE);

  // Get paginated data
  const paginatedLeaveRequests = leaveRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [schedulesData, leaveData, doctorsData] = await Promise.all([
        doctorScheduleAPI.getSchedules(),
        doctorScheduleAPI.getLeaveRequests(),
        doctorAPI.getAllDoctors(),
      ]);
      setSchedules(schedulesData);
      setLeaveRequests(leaveData);
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleUpdateLeaveStatus = async (
    id: string,
    status: ScheduleStatus
  ) => {
    try {
      await doctorScheduleAPI.updateLeaveStatus(id, status);
      const updatedLeaveRequests = leaveRequests.map((request) => {
        if (request.id === id) {
          return { ...request, status };
        }
        return request;
      });
      setLeaveRequests(updatedLeaveRequests);
    } catch (error) {
      console.error('Failed to update leave status:', error);
    }
  };

  // Get week days for the schedule
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(startOfWeek(selectedDate), i);
    return format(day, 'yyyy-MM-dd');
  });
  const leaveRequestColumns: Column<LeaveRequest>[] = [
    {
      header: 'Doctor',
      accessor: 'doctorId',
      cell: ({ row }) =>
        doctors.find((d) => d.id === row.original.doctorId)?.name || 'Unknown',
    },
    {
      header: 'Type',
      accessor: 'leaveType',
      className: 'capitalize',
    },
    {
      header: 'Start Date',
      accessor: 'startDate',
      cell: ({ row }) =>
        format(new Date(row.original.startDate), 'MMM d, yyyy'),
    },
    {
      header: 'End Date',
      accessor: 'endDate',
      cell: ({ row }) => format(new Date(row.original.endDate), 'MMM d, yyyy'),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        const statusClasses =
          status === 'approved'
            ? 'bg-green-100 text-green-800'
            : status === 'rejected'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800';

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusClasses}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: ({ row }) => (
        <div className="relative">
          <button
            onClick={() => setOpenDropdownId(row.original.id)}
            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {openDropdownId === row.original.id && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setOpenDropdownId(null)}
              />
              <div className="absolute z-40 right-0 mt-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {row.original.status === 'pending' && (
                  <>
                    <button
                      className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        handleUpdateLeaveStatus(row.original.id, 'approved');
                        setOpenDropdownId(null);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        handleUpdateLeaveStatus(row.original.id, 'rejected');
                        setOpenDropdownId(null);
                      }}
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    // handleViewDetails(row.original)
                    setOpenDropdownId(null);
                  }}
                >
                  View Details
                </button>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Doctor Schedule Management
          </h1>
          <div className="space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Request Leave
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Add Schedule
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="doctor"
                className="block text-sm font-medium text-gray-700"
              >
                Select Doctor
              </label>
              <select
                id="doctor"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Doctors</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Weekly Schedule
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  {weekDays.map((day) => (
                    <th
                      key={day}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {format(new Date(day), 'EEE, MMM d')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {doctor.name}
                    </td>
                    {weekDays.map((day) => {
                      const schedule = schedules.find(
                        (s) => s.doctorId === doctor.id && s.date === day
                      );
                      return (
                        <td
                          key={day}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {schedule ? (
                            <div>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${
                                  schedule.shiftType === 'morning'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : schedule.shiftType === 'evening'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-purple-100 text-purple-800'
                                }`}
                              >
                                {schedule.shiftType}
                              </span>
                              <div className="mt-1 text-xs">
                                {schedule.startTime} - {schedule.endTime}
                              </div>
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Leave Requests
            </h2>
          </div>
          <div className="">
            <Table<LeaveRequest>
              data={paginatedLeaveRequests}
              columns={leaveRequestColumns}
              pagination={{
                pageSize: 10,
                pageIndex: currentPage - 1,
                pageCount: totalPages,
                onPageChange: (pageIndex: number) =>
                  setCurrentPage(pageIndex + 1),
              }}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
