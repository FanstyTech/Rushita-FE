'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import PageLayout from '@/components/layouts/PageLayout';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Mock data - replace with actual API calls
const mockAppointments = [
  {
    id: 1,
    patientName: 'John Doe',
    time: '09:00 AM',
    status: 'Scheduled',
    type: 'Check-up',
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    time: '10:30 AM',
    status: 'In Progress',
    type: 'Follow-up',
  },
  {
    id: 3,
    patientName: 'Mike Johnson',
    time: '02:00 PM',
    status: 'Completed',
    type: 'Consultation',
  },
  {
    id: 4,
    patientName: 'Sarah Wilson',
    time: '03:30 PM',
    status: 'Scheduled',
    type: 'Treatment',
  },
];

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Patients Seen',
      data: [8, 12, 10, 14, 9, 6, 0],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
};

export default function DoctorDashboard() {
  const [timeFilter, setTimeFilter] = useState('today');

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Today's Patients
                </p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">24</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+12%</span>
              <span className="text-gray-400 ml-2">from yesterday</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Appointments
                </p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">8</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-purple-500 font-medium">
                Next at 10:30 AM
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Average Time
                </p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">18m</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <ClockIcon className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-400">Per patient</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Success Rate
                </p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">95%</p>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-pink-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+2%</span>
              <span className="text-gray-400 ml-2">from last month</span>
            </div>
          </motion.div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Patient Analytics
            </h2>
            <div className="flex space-x-2">
              {['today', 'week', 'month'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    timeFilter === filter
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px]">
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Today's Appointments
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {mockAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-6 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {appointment.patientName}
                  </p>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className="text-sm text-gray-500">
                      {appointment.time}
                    </span>
                    <span className="text-sm text-gray-500">
                      {appointment.type}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : appointment.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
