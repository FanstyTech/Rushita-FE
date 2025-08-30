'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '@/components/layouts/PageLayout';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
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
  BarElement,
} from 'chart.js';
import { motion } from 'framer-motion';
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ServerIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ClockIcon,
  CpuChipIcon,
  CloudIcon,
  BellIcon,
  CogIcon,
  UserPlusIcon,
  DocumentTextIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

import { DatabaseIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

// Enhanced mock data for system admin dashboard
const mockData = {
  systemStats: {
    totalClinics: 47,
    activeUsers: 2847,
    totalAppointments: 15642,
    systemUptime: 99.8,
    clinicsChange: 5,
    usersChange: 234,
    appointmentsChange: 12,
    uptimeChange: 0.2,
  },
  systemHealth: {
    cpuUsage: 45,
    memoryUsage: 67,
    diskUsage: 34,
    networkLatency: 23,
    activeConnections: 1247,
    errorRate: 0.02,
  },
  revenueData: {
    totalRevenue: 847500,
    monthlyGrowth: 15.3,
    subscriptionRevenue: 645000,
    transactionFees: 202500,
  },
  userDistribution: {
    doctors: 1245,
    nurses: 856,
    admins: 234,
    patients: 12456,
  },
  clinicsByRegion: {
    labels: ['North', 'South', 'East', 'West', 'Central'],
    data: [12, 8, 15, 7, 5],
  },
  systemAlerts: [
    {
      id: 1,
      type: 'warning',
      title: 'High Memory Usage',
      message: 'System memory usage is at 85% - consider scaling',
      timestamp: '5 minutes ago',
      severity: 'medium',
    },
    {
      id: 2,
      type: 'error',
      title: 'Database Connection Issue',
      message: 'Intermittent connection issues with primary database',
      timestamp: '15 minutes ago',
      severity: 'high',
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for tonight 2-4 AM',
      timestamp: '2 hours ago',
      severity: 'low',
    },
    {
      id: 4,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily system backup completed successfully',
      timestamp: '3 hours ago',
      severity: 'low',
    },
  ],
  recentActivities: [
    {
      id: 1,
      type: 'clinic_added',
      title: 'New Clinic Registered',
      description: 'Metro Health Center joined the platform',
      timestamp: '1 hour ago',
      user: 'System',
    },
    {
      id: 2,
      type: 'user_suspended',
      title: 'User Account Suspended',
      description: 'Dr. John Smith account suspended for policy violation',
      timestamp: '3 hours ago',
      user: 'Admin Team',
    },
    {
      id: 3,
      type: 'system_update',
      title: 'System Update Deployed',
      description: 'Version 2.3.1 deployed with security patches',
      timestamp: '6 hours ago',
      user: 'DevOps',
    },
    {
      id: 4,
      type: 'payment_processed',
      title: 'Bulk Payment Processed',
      description: '$45,000 in subscription payments processed',
      timestamp: '8 hours ago',
      user: 'Payment System',
    },
  ],
  chartData: {
    userGrowth: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'New Users',
          data: [245, 312, 289, 367, 423, 456],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Active Users',
          data: [1890, 2156, 2398, 2567, 2734, 2847],
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    },
    clinicPerformance: {
      labels: ['Excellent', 'Good', 'Average', 'Needs Improvement'],
      datasets: [
        {
          data: [23, 15, 7, 2],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(239, 68, 68, 1)',
          ],
          borderWidth: 2,
        },
      ],
    },
  },
};

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>(
    'monthly'
  );
  const router = useRouter();
  const stats = mockData.systemStats;

  // Enhanced stats cards for system admin
  const statsCards = [
    {
      title: 'Total Clinics',
      value: stats.totalClinics.toString(),
      change: stats.clinicsChange,
      icon: <BuildingOfficeIcon className="w-6 h-6" />,
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      change: stats.usersChange,
      icon: <UserGroupIcon className="w-6 h-6" />,
      color: 'emerald',
      bgGradient: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Total Appointments',
      value: stats.totalAppointments.toLocaleString(),
      change: stats.appointmentsChange,
      icon: <CalendarIcon className="w-6 h-6" />,
      color: 'purple',
      bgGradient: 'from-purple-500 to-purple-600',
    },
    {
      title: 'System Uptime',
      value: `${stats.systemUptime}%`,
      change: stats.uptimeChange,
      icon: <ServerIcon className="w-6 h-6" />,
      color: 'green',
      bgGradient: 'from-green-500 to-green-600',
    },
  ];

  // System health metrics
  const healthMetrics = [
    {
      title: 'CPU Usage',
      value: `${mockData.systemHealth.cpuUsage}%`,
      icon: <CpuChipIcon className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      progress: mockData.systemHealth.cpuUsage,
      status:
        mockData.systemHealth.cpuUsage > 80
          ? 'critical'
          : mockData.systemHealth.cpuUsage > 60
          ? 'warning'
          : 'good',
    },
    {
      title: 'Memory Usage',
      value: `${mockData.systemHealth.memoryUsage}%`,
      icon: <DatabaseIcon className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      progress: mockData.systemHealth.memoryUsage,
      status:
        mockData.systemHealth.memoryUsage > 80
          ? 'critical'
          : mockData.systemHealth.memoryUsage > 60
          ? 'warning'
          : 'good',
    },
    {
      title: 'Disk Usage',
      value: `${mockData.systemHealth.diskUsage}%`,
      icon: <CloudIcon className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      progress: mockData.systemHealth.diskUsage,
      status:
        mockData.systemHealth.diskUsage > 80
          ? 'critical'
          : mockData.systemHealth.diskUsage > 60
          ? 'warning'
          : 'good',
    },
    {
      title: 'Network Latency',
      value: `${mockData.systemHealth.networkLatency}ms`,
      icon: <ClockIcon className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      progress: 100 - mockData.systemHealth.networkLatency,
      status:
        mockData.systemHealth.networkLatency > 100
          ? 'critical'
          : mockData.systemHealth.networkLatency > 50
          ? 'warning'
          : 'good',
    },
  ];

  // Admin quick actions
  const adminActions = [
    {
      title: 'Manage Clinics',
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'View and manage all clinics',
      action: () => router.push('/admin/clinics'),
    },
    {
      title: 'User Management',
      icon: <UserPlusIcon className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Manage user accounts',
      action: () => router.push('/admin/users'),
    },
    {
      title: 'System Settings',
      icon: <CogIcon className="w-5 h-5" />,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      description: 'Configure system settings',
      action: () => router.push('/admin/settings'),
    },
    {
      title: 'View Reports',
      icon: <DocumentTextIcon className="w-5 h-5" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Generate system reports',
      action: () => router.push('/admin/reports'),
    },
    {
      title: 'Monitor System',
      icon: <EyeIcon className="w-5 h-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Real-time monitoring',
      action: () => router.push('/admin/monitoring'),
    },
    {
      title: 'Security Center',
      icon: <ShieldCheckIcon className="w-5 h-5" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Security management',
      action: () => router.push('/admin/security'),
    },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.6)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.6)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
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
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              {...fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />
              <div
                className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${stat.bgGradient}`}
              />

              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <div className="mt-3 flex items-center">
                    {stat.change >= 0 ? (
                      <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stat.change >= 0 ? '+' : ''}
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      this month
                    </span>
                  </div>
                </div>
                <div
                  className={`rounded-xl bg-gradient-to-br ${stat.bgGradient} p-3 text-white shadow-lg`}
                >
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Health Metrics */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            System Health Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthMetrics.map((metric, index) => (
              <div key={metric.title} className="flex items-center space-x-4">
                <div className={`rounded-lg ${metric.bgColor} p-3`}>
                  <div className={metric.color}>{metric.icon}</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {metric.title}
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </p>
                  <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        metric.status === 'critical'
                          ? 'bg-red-500'
                          : metric.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${metric.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Admin Quick Actions */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Admin Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminActions.map((action, index) => (
              <div
                key={action.title}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group cursor-pointer"
                onClick={action.action}
              >
                <div className={`rounded-lg ${action.bgColor} p-3`}>
                  <div className={action.color}>{action.icon}</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {action.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {action.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Growth Chart */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                User Growth Analytics
              </h3>
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                {(['daily', 'weekly', 'monthly'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      timeRange === range
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[350px]">
              <Line
                data={mockData.chartData.userGrowth}
                options={chartOptions}
              />
            </div>
          </motion.div>

          {/* Clinic Performance Chart */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Clinic Performance
            </h3>
            <div className="h-[300px]">
              <Doughnut
                data={mockData.chartData.clinicPerformance}
                options={doughnutOptions}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Alerts */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
                <BellIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                System Alerts
              </h3>
            </div>
            <div className="space-y-4">
              {mockData.systemAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'error'
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                      : alert.type === 'warning'
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
                      : alert.type === 'success'
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {alert.title}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            alert.severity === 'high'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : alert.severity === 'medium'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                          }`}
                        >
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {alert.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Recent System Activities
            </h3>
            <div className="space-y-4">
              {mockData.recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div
                    className={`rounded-full p-2 ${
                      activity.type === 'clinic_added'
                        ? 'bg-blue-100 text-blue-600'
                        : activity.type === 'user_suspended'
                        ? 'bg-red-100 text-red-600'
                        : activity.type === 'system_update'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-emerald-100 text-emerald-600'
                    }`}
                  >
                    {activity.type === 'clinic_added' && (
                      <BuildingOfficeIcon className="w-4 h-4" />
                    )}
                    {activity.type === 'user_suspended' && (
                      <ExclamationTriangleIcon className="w-4 h-4" />
                    )}
                    {activity.type === 'system_update' && (
                      <CogIcon className="w-4 h-4" />
                    )}
                    {activity.type === 'payment_processed' && (
                      <CurrencyDollarIcon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        by {activity.user}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
