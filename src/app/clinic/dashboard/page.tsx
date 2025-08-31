'use client';

import { useClinic } from '@/lib/api/hooks/useClinic';
import { TimeRange } from '@/lib/api/types/clinic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/layouts/PageLayout';
import ClinicDashboardSkeleton from '@/components/skeletons/clinic/ClinicDashboardSkeleton';
import { Line, Doughnut } from 'react-chartjs-2';
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
  CurrencyDollarIcon,
  CheckCircleIcon,
  UserIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  CogIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import {
  getAppointmentStatusLabel,
  getAppointmentStatusStyle,
  getTimeRangeLabel,
  getVisitTypeLabel,
} from '@/utils/textUtils';
import { formatTimeForInput } from '@/utils/dateTimeUtils';
import { AppointmentStatus } from '@/lib/api/types/appointment';

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

export default function ClinicDashboard() {
  const router = useRouter();
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.Weekly);

  const { useClinicDashboard } = useClinic();

  const {
    data: dashboardData,
    isLoading,
    error,
  } = useClinicDashboard({ timeRange });

  // Show loading state
  if (isLoading) {
    return (
      <PageLayout>
        <ClinicDashboardSkeleton />
      </PageLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <ExclamationCircleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">{t('clinic.dashboard.errorLoading')}</p>
            <p className="text-gray-500 text-sm mt-2">{error.message}</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Use dashboard data
  const stats = dashboardData?.stats;
  const chartData = dashboardData?.chartData;
  const appointmentStatus = dashboardData?.appointmentStatus;
  const upcomingAppointments = dashboardData?.upcomingAppointments;
  const recentActivities = dashboardData?.recentActivities;

  // Get current chart data based on timeRange
  const getCurrentChartData = () => {
    switch (timeRange) {
      case TimeRange.Daily:
        return chartData?.daily;
      case TimeRange.Weekly:
        return chartData?.weekly;
      case TimeRange.Monthly:
        return chartData?.monthly;
      default:
        return chartData?.weekly;
    }
  };

  const currentChartData = getCurrentChartData();

  // Enhanced stats cards with better design
  const statsCards = [
    {
      title: t('clinic.dashboard.stats.totalPatients'),
      value: stats?.totalPatients?.toLocaleString() || '0',
      change: stats?.patientsChange || 0,
      icon: <UserGroupIcon className="w-6 h-6" />,
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      title: t('clinic.dashboard.stats.todayAppointments'),
      value: stats?.todayAppointments?.toString() || '0',
      change: stats?.appointmentsChange || 0,
      icon: <CalendarIcon className="w-6 h-6" />,
      color: 'purple',
      bgGradient: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-200',
    },
    {
      title: t('clinic.dashboard.stats.completedToday'),
      value: stats?.completedToday?.toString() || '0',
      change: stats?.completedChange || 0,
      icon: <CheckCircleIcon className="w-6 h-6" />,
      color: 'green',
      bgGradient: 'from-green-500 to-green-600',
      borderColor: 'border-green-200',
    },
    {
      title: t('clinic.dashboard.stats.todayRevenue'),
      value: `$${stats?.todayRevenue?.toLocaleString() || '0'}`,
      change: stats?.revenueChange || 0,
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      color: 'emerald',
      bgGradient: 'from-emerald-500 to-emerald-600',
      borderColor: 'border-emerald-200',
    },
  ];

  // Quick Actions
  const quickActions = [
    {
      title: t('clinic.dashboard.quickActions.newPatientRegistration.title'),
      icon: <UserIcon className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: t(
        'clinic.dashboard.quickActions.newPatientRegistration.description'
      ),
      action: () => router.push('/clinic/patients/add'),
    },
    {
      title: t('clinic.dashboard.quickActions.scheduleAppointment.title'),
      icon: <CalendarIcon className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: t(
        'clinic.dashboard.quickActions.scheduleAppointment.description'
      ),
      action: () => router.push('/clinic/appointments'),
    },
    {
      title: t('clinic.dashboard.quickActions.viewPatientRecords.title'),
      icon: <DocumentTextIcon className="w-5 h-5" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: t(
        'clinic.dashboard.quickActions.viewPatientRecords.description'
      ),
      action: () => router.push('/clinic/patients'),
    },
    {
      title: t('clinic.dashboard.quickActions.settings.title'),
      icon: <CogIcon className="w-5 h-5" />,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      description: t('clinic.dashboard.quickActions.settings.description'),
      action: () => router.push('/clinic/settings'),
    },
  ];

  // Chart data from API
  const lineChartData = {
    labels: currentChartData?.labels || [],
    datasets: [
      {
        label: t('clinic.dashboard.charts.totalAppointments'),
        data: currentChartData?.appointments || [],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
      },
      {
        label: t('clinic.dashboard.charts.completed'),
        data: currentChartData?.completed || [],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
      },
    ],
  };

  const doughnutData = {
    labels: appointmentStatus?.statusCounts?.map((s) =>
      getAppointmentStatusLabel(s.status)
    ),
    datasets: [
      {
        data: appointmentStatus?.statusCounts.map((s) => s.count),
        backgroundColor: appointmentStatus?.statusCounts
          .map((s) => getAppointmentStatusStyle(s.status).chartColor)
          .slice(0, appointmentStatus?.statusCounts.length),
        borderColor: appointmentStatus?.statusCounts
          .map((s) => getAppointmentStatusStyle(s.status).chartBorderColor)
          .slice(0, appointmentStatus?.statusCounts.length),

        borderWidth: 2,
      },
    ],
  };

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
                      {t('clinic.dashboard.stats.changeFromYesterday')}
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

        {/* Quick Actions */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {t('clinic.dashboard.quickActions.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <div
                key={action.title}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
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
                <button
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick={action.action}
                >
                  {t('clinic.dashboard.quickActions.takeAction')}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointments Chart */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('clinic.dashboard.charts.appointmentsOverview')}
              </h3>
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                {Object.values(TimeRange)
                  .filter((v) => typeof v === 'number') // keep only numbers
                  .map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range as TimeRange)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        timeRange === range
                          ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {getTimeRangeLabel(range as TimeRange)}
                    </button>
                  ))}
              </div>
            </div>
            <div className="h-[350px]">
              {currentChartData ? (
                <Line data={lineChartData} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">
                    {t('clinic.dashboard.charts.noDataAvailable')}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Appointment Status Chart */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              {t('clinic.dashboard.charts.appointmentStatus')}
            </h3>
            <div className="h-[300px]">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              {t('clinic.dashboard.upcomingAppointments.title')}
            </h3>
            <div className="space-y-4">
              {upcomingAppointments && upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          appointment.status === AppointmentStatus.Confirmed
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {appointment.patientName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {formatTimeForInput(appointment.time || '')} -{' '}
                        {getVisitTypeLabel(appointment.type)}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        appointment.status === AppointmentStatus.Confirmed
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {getAppointmentStatusLabel(appointment.status)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {t('clinic.dashboard.upcomingAppointments.noAppointments')}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              {t('clinic.dashboard.recentActivities.title')}
            </h3>
            <div className="space-y-4">
              {recentActivities && recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div
                      className={`rounded-full p-2 ${
                        activity.type === 'registration'
                          ? 'bg-blue-100 text-blue-600'
                          : activity.type === 'completion'
                          ? 'bg-green-100 text-green-600'
                          : activity.type === 'payment'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {activity.type === 'registration' && (
                        <UserIcon className="w-4 h-4" />
                      )}
                      {activity.type === 'completion' && (
                        <CheckCircleIcon className="w-4 h-4" />
                      )}
                      {activity.type === 'payment' && (
                        <CurrencyDollarIcon className="w-4 h-4" />
                      )}
                      {activity.type === 'cancellation' && (
                        <ExclamationTriangleIcon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {activity.patientName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <InformationCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {t('clinic.dashboard.recentActivities.noActivities')}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
