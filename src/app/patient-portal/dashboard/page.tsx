'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';

// Import components
import {
  WelcomeSection,
  QuickActions,
  AppointmentsCard,
  MedicationsCard,
  RecentVisitsCard,
  HealthMetricsCard,
  NotificationsCard,
  HealthAlertsCard,
  DashboardSkeleton,
} from '@/components/patient-portal/dashboard';
// Import data and utils
import {
  quickActions,
  notifications,
  healthAlerts,
  formatRelativeTime,
} from '@/components/patient-portal/dashboard';
import { containerVariants, itemVariants } from '@/utils/patientPortalUtils';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  // API hooks
  const { usePatientPortalDashboard } = useClinicPatients();
  const { data: dashboardData, isLoading, error } = usePatientPortalDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load dashboard data</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <WelcomeSection userName={user?.name} variants={itemVariants} />

      {/* Quick Actions */}
      <QuickActions
        actions={quickActions}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />

      {/* Tabs for different sections */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-4 w-full sm:w-auto h-full">
          <TabsTrigger value="overview" className="py-4">
            {t('patientPortal.dashboard.tabs.overview')}
          </TabsTrigger>
          <TabsTrigger value="health" className="py-4">
            {t('patientPortal.dashboard.tabs.health')}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="py-4">
            {t('patientPortal.dashboard.tabs.notifications')}
          </TabsTrigger>
        </TabsList>

        {/* Overview tab */}
        <TabsContent value="overview" className="space-y-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch"
          >
            <AppointmentsCard
              appointments={dashboardData?.recentAppointments || []}
              variants={itemVariants}
            />

            <MedicationsCard
              medications={dashboardData?.activePrescriptionsList || []}
              variants={itemVariants}
            />

            <RecentVisitsCard
              visits={dashboardData?.recentVisits || []}
              variants={itemVariants}
            />
          </motion.div>
        </TabsContent>

        {/* Health tab */}
        <TabsContent value="health" className="space-y-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {dashboardData && (
              <HealthMetricsCard
                metrics={dashboardData}
                variants={itemVariants}
              />
            )}
          </motion.div>
        </TabsContent>

        {/* Notifications tab */}
        <TabsContent value="notifications" className="space-y-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <NotificationsCard
              notifications={notifications}
              variants={itemVariants}
              formatRelativeTime={formatRelativeTime}
            />

            <HealthAlertsCard alerts={healthAlerts} variants={itemVariants} />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
