'use client';

import { useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Mock data for clinic dashboard
const mockData = {
  stats: {
    totalPatients: 1245,
    todayAppointments: 28,
    completedToday: 12,
    revenue: 3840,
    patientsChange: 24,
    appointmentsChange: 5,
    revenueChange: 840,
  },
  chartData: {
    daily: {
      labels: [
        '9 AM',
        '10 AM',
        '11 AM',
        '12 PM',
        '1 PM',
        '2 PM',
        '3 PM',
        '4 PM',
        '5 PM',
      ],
      appointments: [4, 6, 8, 5, 7, 3, 6, 4, 2],
      completed: [4, 5, 7, 4, 6, 2, 4, 3, 1],
    },
    weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      appointments: [28, 32, 25, 30, 26, 15, 10],
      completed: [25, 28, 22, 27, 23, 13, 8],
    },
    monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      appointments: [165, 178, 160, 182],
      completed: [150, 162, 148, 170],
    },
  },
  upcomingAppointments: [
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: '10:30 AM',
      type: 'Check-up',
      status: 'confirmed',
    },
    {
      id: 2,
      patient: 'Michael Brown',
      time: '11:15 AM',
      type: 'Follow-up',
      status: 'pending',
    },
    {
      id: 3,
      patient: 'Emily Davis',
      time: '2:00 PM',
      type: 'Consultation',
      status: 'confirmed',
    },
    {
      id: 4,
      patient: 'James Wilson',
      time: '3:30 PM',
      type: 'Treatment',
      status: 'confirmed',
    },
  ],
};

export default function ClinicDashboard() {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>(
    'daily'
  );
  const stats = mockData.stats;
  const currentChartData = mockData.chartData[timeRange];

  const statsCards = [
    {
      title: 'Total Patients',
      value: stats.totalPatients.toLocaleString(),
      change: `+${stats.patientsChange}`,
      icon: <UserGroupIcon className="w-6 h-6" />,
      bgGradient: 'from-blue-500 to-blue-600',
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments.toString(),
      change: `${stats.appointmentsChange > 0 ? '+' : ''}${
        stats.appointmentsChange
      }`,
      icon: <CalendarIcon className="w-6 h-6" />,
      bgGradient: 'from-purple-500 to-purple-600',
    },
    {
      title: "Today's Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      change: `+$${stats.revenueChange}`,
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      bgGradient: 'from-green-500 to-green-600',
    },
  ];

  const lineChartData = {
    labels: currentChartData.labels,
    datasets: [
      {
        label: 'Total Appointments',
        data: currentChartData.appointments,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Completed',
        data: currentChartData.completed,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              {...fadeInUp}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 shadow-lg`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-1">
                      {stat.change} from yesterday
                    </span>
                  </p>
                </div>
                <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointments Chart */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Appointments Overview
              </h3>
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                {(['daily', 'weekly', 'monthly'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      timeRange === range
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[400px]">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Upcoming Appointments */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Upcoming Appointments
            </h3>
            <div className="space-y-4">
              {mockData.upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`rounded-full p-2 ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {appointment.status === 'confirmed' ? (
                      <CheckCircleIcon className="w-6 h-6" />
                    ) : (
                      <ClockIcon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {appointment.patient}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.time} - {appointment.type}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
