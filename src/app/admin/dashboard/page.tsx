'use client';

import PageLayout from '@/components/layouts/PageLayout';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';
import { GrowthOverviewChart } from '@/components/Chart/GrowthOverviewChart';
import CardList from '@/components/CardList';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data
const mockData = {
  stats: {
    totalClinics: 24,
    activeUsers: 1429,
    totalAppointments: 3842,
    clinicsChange: 2,
    usersChange: 142,
    appointmentsChange: 8,
  },
  chartData: {
    weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      patients: [120, 145, 132, 168, 158, 142, 138],
      appointments: [145, 162, 155, 180, 172, 168, 152],
    },
    monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      patients: [210, 245, 232, 268],
      appointments: [245, 262, 255, 280],
    },
    yearly: {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      patients: [650, 590, 800, 810, 960, 890, 920, 850, 910, 870, 930, 950],
      appointments: [
        820, 780, 920, 980, 1100, 1050, 1080, 990, 1040, 980, 1060, 1100,
      ],
    },
  },
  activities: [
    {
      id: 1,
      type: 'clinic_added',
      clinic: 'City Medical Center',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'user_joined',
      name: 'Dr. Sarah Wilson',
      role: 'Doctor',
      time: '4 hours ago',
    },
    {
      id: 3,
      type: 'appointment_surge',
      clinic: 'Metro Hospital',
      count: 25,
      time: '6 hours ago',
    },
    { id: 4, type: 'system_update', version: '2.1.0', time: '12 hours ago' },
  ],
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AdminDashboard() {
  const stats = mockData.stats;
  // const activities = mockData.activities;

  const statsCards = [
    {
      title: 'Total Clinics',
      value: stats.totalClinics.toLocaleString(),
      change: `${stats.clinicsChange > 0 ? '+' : ''}${stats.clinicsChange}`,
      changeType: stats.clinicsChange >= 0 ? 'increase' : 'decrease',
      bgGradient: 'from-blue-500 to-blue-600',
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      change: `${stats.usersChange > 0 ? '+' : ''}${stats.usersChange}`,
      changeType: stats.usersChange >= 0 ? 'increase' : 'decrease',
      bgGradient: 'from-emerald-500 to-emerald-600',
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Total Appointments',
      value: stats.totalAppointments.toLocaleString(),
      change: `${stats.appointmentsChange > 0 ? '+' : ''}${stats.appointmentsChange
        }%`,
      changeType: stats.appointmentsChange >= 0 ? 'increase' : 'decrease',
      bgGradient: 'from-violet-500 to-violet-600',
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];
  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 shadow-lg`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80">
                      {stat.title}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p
                      className={`mt-2 text-sm inline-flex items-center rounded-full px-2 py-1 ${stat.changeType === 'increase'
                        ? 'bg-green-400/20 text-green-100'
                        : 'bg-red-400/20 text-red-100'
                        }`}
                    >
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                    {stat.icon}
                  </div>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3 }}

            className="lg:col-span-2 "
          >

            <GrowthOverviewChart />
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className=" rounded-xl shadow border bg-white  dark:bg-primary-foreground p-4 "
          >
            <CardList />

          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
