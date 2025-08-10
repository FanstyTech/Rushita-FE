'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
  upcomingAppointments,
  activeMedications,
  recentVisits,
  notifications,
  healthAlerts,
  healthMetrics,
  formatDate,
  formatRelativeTime,
} from '@/components/patient-portal/dashboard';
import { containerVariants, itemVariants } from '@/utils/patientPortalUtils';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
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
            className="space-y-6"
          >
            <AppointmentsCard
              appointments={upcomingAppointments}
              variants={itemVariants}
              formatDate={formatDate}
            />

            <MedicationsCard
              medications={activeMedications}
              variants={itemVariants}
              formatDate={formatDate}
            />

            <RecentVisitsCard
              visits={recentVisits}
              variants={itemVariants}
              formatDate={formatDate}
              // formatRelativeTime={formatRelativeTime}
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
            <HealthMetricsCard
              metrics={healthMetrics}
              variants={itemVariants}
            />
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
