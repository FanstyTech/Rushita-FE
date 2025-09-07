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
import { formatRelativeTime } from '@/components/patient-portal/dashboard';
import { containerVariants, itemVariants } from '@/utils/patientPortalUtils';
import { CalendarCheck, FilePlus2, Stethoscope, User } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'medication' | 'test' | 'message' | 'system';
  time: string;
  read: boolean;
  timestamp: Date;
  actionUrl?: string | null;
  actionText?: string | null;
}

interface QuickAction {
  id: string;
  titleKey: string;
  icon: React.ElementType;
  url: string;
  color: 'blue' | 'purple' | 'green' | 'amber';
}
interface HealthAlert {
  id: string;
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
  actionText?: string;
}
const notifications: Notification[] = [
  {
    id: '1',
    title: 'patientPortal.dashboard.notifications.appointmentConfirmed',
    message:
      'patientPortal.dashboard.notifications.messages.appointmentConfirmed',
    type: 'appointment',
    time: '30 patientPortal.dashboard.notifications.timeUnits.minutes',
    read: false,
    timestamp: new Date(2023, 9, 15, 9, 30),
    actionUrl: '/patient-portal/appointments/123',
    actionText: 'patientPortal.dashboard.notifications.viewAppointment',
  },
  {
    id: '2',
    title: 'patientPortal.dashboard.notifications.testResultsReady',
    message: 'patientPortal.dashboard.notifications.messages.testResultsReady',
    type: 'test',
    time: '3 patientPortal.dashboard.notifications.timeUnits.hours',
    read: true,
    timestamp: new Date(2023, 9, 15, 7, 0),
    actionUrl: '/patient-portal/tests/456',
    actionText: 'patientPortal.dashboard.notifications.viewResults',
  },
  {
    id: '3',
    title: 'patientPortal.dashboard.notifications.medicationReminder',
    message:
      'patientPortal.dashboard.notifications.messages.medicationReminder',
    type: 'medication',
    time: '12 patientPortal.dashboard.notifications.timeUnits.hours',
    read: false,
    timestamp: new Date(2023, 9, 14, 21, 0),
    actionUrl: '/patient-portal/medications',
    actionText: 'patientPortal.dashboard.notifications.viewMedications',
  },
  {
    id: '4',
    title: 'patientPortal.dashboard.notifications.newDoctorMessage',
    message: 'patientPortal.dashboard.notifications.messages.newDoctorMessage',
    type: 'message',
    time: '1 patientPortal.dashboard.notifications.timeUnits.days',
    read: true,
    timestamp: new Date(2023, 9, 14, 14, 30),
    actionUrl: '/patient-portal/messages/789',
    actionText: 'patientPortal.dashboard.notifications.readMessage',
  },
  {
    id: '5',
    title: 'patientPortal.dashboard.notifications.systemUpdate',
    message: 'patientPortal.dashboard.notifications.messages.systemUpdate',
    type: 'system',
    time: '2 patientPortal.dashboard.notifications.timeUnits.days',
    read: true,
    timestamp: new Date(2023, 9, 13, 10, 0),
    actionUrl: null,
    actionText: null,
  },
];

const healthAlerts: HealthAlert[] = [
  {
    id: '1',
    title: 'patientPortal.dashboard.healthAlerts.highBloodPressure',
    message: 'patientPortal.dashboard.healthAlerts.messages.highBloodPressure',
    priority: 'high',
    actionUrl: '/patient-portal/appointments/new',
    actionText:
      'patientPortal.dashboard.healthAlerts.bookAppointmentWithDoctor',
  },
  {
    id: '2',
    title: 'patientPortal.dashboard.healthAlerts.vaccinationReminder',
    message:
      'patientPortal.dashboard.healthAlerts.messages.vaccinationReminder',
    priority: 'medium',
    actionUrl: '/patient-portal/vaccinations',
    actionText:
      'patientPortal.dashboard.healthAlerts.bookVaccinationAppointment',
  },
  {
    id: '3',
    title: 'patientPortal.dashboard.healthAlerts.healthDataUpdate',
    message: 'patientPortal.dashboard.healthAlerts.messages.healthDataUpdate',
    priority: 'low',
    actionUrl: '/patient-portal/health-metrics/update',
    actionText: 'patientPortal.dashboard.healthAlerts.updateHealthData',
  },
];

const quickActions: QuickAction[] = [
  {
    id: 'action-1',
    titleKey: 'patientPortal.dashboard.quickActions.bookAppointment',
    icon: CalendarCheck,
    url: '/patient-portal/appointments/book',
    color: 'blue',
  },
  {
    id: 'action-2',
    titleKey: 'patientPortal.dashboard.quickActions.requestConsultation',
    icon: Stethoscope,
    url: '/patient-portal/telemedicine',
    color: 'purple',
  },
  {
    id: 'action-3',
    titleKey: 'patientPortal.dashboard.quickActions.requestPrescription',
    icon: FilePlus2,
    url: '/patient-portal/prescriptions/request',
    color: 'green',
  },
  {
    id: 'action-4',
    titleKey: 'patientPortal.dashboard.quickActions.profile',
    icon: User,
    url: '/patient-portal/profile',
    color: 'amber',
  },
];

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
          <p className="text-red-500 mb-2">
            {t('patientPortal.dashboard.errors.failedToLoadDashboard')}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {t('patientPortal.dashboard.errors.retry')}
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
