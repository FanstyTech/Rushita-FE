import { AppointmentStatus, VisitType } from './appointment';
import { TimeRange } from './clinic';

// Main Doctor Dashboard DTO
export interface DoctorDashboardDto {
  stats: DoctorDashboardStatsDto;
  chartData: DoctorDashboardChartDataDto;
  appointmentStatus: DoctorDashboardAppointmentStatusDto;
  upcomingAppointments: DoctorDashboardUpcomingAppointmentDto[];
  recentActivities: DoctorDashboardRecentActivityDto[];
}

// Doctor Stats Cards Data
export interface DoctorDashboardStatsDto {
  totalPatients: number;
  todayAppointments: number;
  completedToday: number;
  totalVisits: number;
  patientsChange: number;
  appointmentsChange: number;
  visitsChange: number;
  completedChange: number;
  patientSatisfaction: number;
  averageWaitTime: number;
  noShowRate: number;
  pendingPrescriptions: number;
}

// Doctor Chart Data
export interface DoctorDashboardChartDataDto {
  daily: DoctorDashboardDailyDataDto | null;
  weekly: DoctorDashboardWeeklyDataDto | null;
  monthly: DoctorDashboardMonthlyDataDto | null;
}

export interface DoctorDashboardDailyDataDto {
  labels: string[];
  appointments: number[];
  completed: number[];
  visits: number[];
}

export interface DoctorDashboardWeeklyDataDto {
  labels: string[];
  appointments: number[];
  completed: number[];
  visits: number[];
}

export interface DoctorDashboardMonthlyDataDto {
  labels: string[];
  appointments: number[];
  completed: number[];
  visits: number[];
}

// Doctor Appointment Status for Doughnut Chart
export interface DoctorDashboardAppointmentStatusDto {
  statusCounts: DoctorAppointmentStatusCountDto[];
}

export interface DoctorAppointmentStatusCountDto {
  status: AppointmentStatus;
  count: number;
}

// Doctor Upcoming Appointments
export interface DoctorDashboardUpcomingAppointmentDto {
  id: string;
  patientName: string;
  time: string;
  type: VisitType;
  status: AppointmentStatus;
  avatar?: string;
  patientPhone?: string;
  patientAge: number;
}

// Doctor Recent Activities
export interface DoctorDashboardRecentActivityDto {
  id: string;
  action: string;
  patientName: string;
  time: string;
  type: string;
  description?: string;
}

// Doctor Dashboard Filter DTO
export interface DoctorDashboardFilterDto {
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  timeRange?: TimeRange;
}
