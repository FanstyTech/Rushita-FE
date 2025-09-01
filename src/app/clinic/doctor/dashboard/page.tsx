'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layouts/PageLayout';
import DoctorDashboardSkeleton from '@/components/skeletons/doctor/DoctorDashboardSkeleton';
import { useDoctorDashboard } from '@/lib/api/hooks/useDoctorDashboard';
import { TimeRange } from '@/lib/api/types/clinic';
import {
  Users,
  Calendar,
  CheckCircle,
  Activity,
  TrendingUp,
  TrendingDown,
  FileText,
  Phone,
} from 'lucide-react';
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
import {
  getAppointmentStatusLabel,
  getAppointmentStatusStyle,
  getTimeRangeLabel,
} from '@/utils/textUtils';
import { AppointmentStatus } from '@/lib/api/types/appointment';

// Register ChartJS components
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

export default function DoctorDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.Weekly);

  const { useGetDashboard: getDashboard } = useDoctorDashboard();
  const { data: dashboardData, isLoading, error } = getDashboard({ timeRange });

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Stats card configuration
  const statsCards = [
    {
      title: 'إجمالي المرضى',
      value: dashboardData?.stats?.totalPatients || 0,
      change: dashboardData?.stats?.patientsChange || 0,
      icon: Users,
      bgGradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'مواعيد اليوم',
      value: dashboardData?.stats?.todayAppointments || 0,
      change: dashboardData?.stats?.appointmentsChange || 0,
      icon: Calendar,
      bgGradient: 'from-purple-500 to-purple-600',
    },
    {
      title: 'مكتملة اليوم',
      value: dashboardData?.stats?.completedToday || 0,
      change: dashboardData?.stats?.completedChange || 0,
      icon: CheckCircle,
      bgGradient: 'from-green-500 to-green-600',
    },
    {
      title: 'إجمالي الزيارات',
      value: dashboardData?.stats?.totalVisits || 0,
      change: dashboardData?.stats?.visitsChange || 0,
      icon: Activity,
      bgGradient: 'from-emerald-500 to-emerald-600',
    },
  ];

  // Get current chart data based on timeRange
  const getCurrentChartData = () => {
    switch (timeRange) {
      case TimeRange.Daily:
        return dashboardData?.chartData?.daily;
      case TimeRange.Weekly:
        return dashboardData?.chartData?.weekly;
      case TimeRange.Monthly:
        return dashboardData?.chartData?.monthly;
      default:
        return dashboardData?.chartData?.weekly;
    }
  };

  const currentChartData = getCurrentChartData();

  // Chart configurations
  const lineChartData = {
    labels: currentChartData?.labels || [],
    datasets: [
      {
        label: 'Total Appointments',
        data: currentChartData?.appointments || [],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
      },
      {
        label: 'Completed',
        data: currentChartData?.completed || [],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
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

  const doughnutData = {
    labels: dashboardData?.appointmentStatus?.statusCounts?.map((s) =>
      getAppointmentStatusLabel(s.status)
    ),
    datasets: [
      {
        data: dashboardData?.appointmentStatus?.statusCounts?.map(
          (s) => s.count
        ),
        backgroundColor: dashboardData?.appointmentStatus?.statusCounts?.map(
          (s) => getAppointmentStatusStyle(s.status).chartColor
        ),
        borderColor: dashboardData?.appointmentStatus?.statusCounts?.map(
          (s) => getAppointmentStatusStyle(s.status).chartBorderColor
        ),
        borderWidth: 2,
      },
    ],
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

  // Activity helper functions
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'appointment':
      case 'registration':
        return Calendar;
      case 'prescription':
        return FileText;
      case 'visit':
      case 'completion':
        return CheckCircle;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'appointment':
      case 'registration':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400';
      case 'prescription':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400';
      case 'visit':
      case 'completion':
        return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400';
      case 'cancellation':
        return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <PageLayout>
        <DoctorDashboardSkeleton />
      </PageLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-500 text-lg font-medium mb-2">
              خطأ في تحميل البيانات
            </div>
            <div className="text-gray-500">
              {error.message || 'حدث خطأ أثناء تحميل بيانات لوحة التحكم'}
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Stats Cards */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((card, index) => {
              const IconComponent = card.icon;
              const isPositive = card.change >= 0;
              const TrendIcon = isPositive ? TrendingUp : TrendingDown;

              return (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                  <div
                    className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${card.bgGradient}`}
                  />

                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {card.title}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        {card.value.toLocaleString()}
                      </p>
                      <div className="mt-3 flex items-center">
                        <TrendIcon
                          className={`w-4 h-4 mr-1 ${
                            isPositive ? 'text-green-500' : 'text-red-500'
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isPositive ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {isPositive ? '+' : ''}
                          {card.change}%
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          من الشهر الماضي
                        </span>
                      </div>
                    </div>
                    <div
                      className={`rounded-xl bg-gradient-to-br ${card.bgGradient} p-3 text-white shadow-lg`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
                Appointments Overview
              </h3>
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                {Object.values(TimeRange)
                  .filter((v) => typeof v === 'number')
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
                    No data available for this time range
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
              Appointment Status
            </h3>
            <div className="h-[300px]">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Appointments & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              المواعيد القادمة
            </h3>
            <div className="space-y-4">
              {dashboardData?.upcomingAppointments?.length ? (
                dashboardData.upcomingAppointments
                  .slice(0, 4)
                  .map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            appointment.status === AppointmentStatus.Confirmed
                              ? 'bg-green-500'
                              : appointment.status ===
                                AppointmentStatus.Scheduled
                              ? 'bg-blue-500'
                              : 'bg-amber-500'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {appointment.patientName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {appointment.time} - {appointment.type}
                          {appointment.patientPhone && (
                            <span className="flex items-center mt-1">
                              <Phone className="w-3 h-3 mr-1" />
                              {appointment.patientPhone}
                            </span>
                          )}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          getAppointmentStatusStyle(appointment.status)
                            .className
                        }`}
                      >
                        {getAppointmentStatusStyle(appointment.status).label}
                      </span>
                    </motion.div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    لا توجد مواعيد قادمة
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
              الأنشطة الأخيرة
            </h3>
            <div className="space-y-4">
              {dashboardData?.recentActivities?.length ? (
                dashboardData.recentActivities
                  .slice(0, 5)
                  .map((activity, index) => {
                    const IconComponent = getActivityIcon(activity.type);

                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div
                          className={`rounded-full p-2 ${getActivityColor(
                            activity.type
                          )}`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {activity.patientName}
                          </p>
                          {activity.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {activity.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    لا توجد أنشطة حديثة
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PageLayout>
  );
}
