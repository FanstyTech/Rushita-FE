// Components
export { WelcomeSection } from './WelcomeSection';
export { QuickActions } from './QuickActions';
export { AppointmentsCard } from './AppointmentsCard';
export { MedicationsCard } from './MedicationsCard';
export { RecentVisitsCard } from './RecentVisitsCard';
export { HealthMetricsCard } from './HealthMetricsCard';
export { NotificationsCard } from './NotificationsCard';
export { HealthAlertsCard } from './HealthAlertsCard';
export { DashboardSkeleton } from './DashboardSkeleton';

// Types
export type {
  Appointment,
  Medication,
  Visit,
  Notification,
  HealthAlert,
  QuickAction,
  HealthMetrics,
} from './types';

// Utils
export { formatDate, formatRelativeTime } from './utils';

// Mock Data
export {
  quickActions,
  upcomingAppointments,
  activeMedications,
  recentVisits,
  notifications,
  healthAlerts,
  healthMetrics,
} from './mockData';
