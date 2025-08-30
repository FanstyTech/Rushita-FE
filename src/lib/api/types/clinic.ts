import { AppointmentStatus, VisitType } from './appointment';
import { StaffType } from './clinic-staff';
import { SelectOption } from './select-option';

export enum ClinicStatus {
  Active = 1,
  Inactive,
  PendingApproval,
  Rejected,
  Suspended,
  Closed,
}

export enum DayEnum {
  Sunday = 1,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export enum TimeRange {
  Daily = 0,
  Weekly = 1,
  Monthly = 2,
}

export enum StaffTypeEnum {
  Doctor = 1,
  Nurse = 2,
  Receptionist = 3,
  FinancialStaff = 4,
  ClinicAdministrator = 5,
  LabTechnician = 6,
  Pharmacist = 7,
}

export interface ClinicDto {
  id: string;
  nameL: string;
  nameF: string;
  name: string;
  bio?: string;
  email?: string;
  address?: string;
  phoneNumber: string;
  cityId?: string;
  clinicTypeId?: string;
  latitude?: number;
  longitude?: number;
  workingHours: WorkingHours[];
  specialtiess: Specialtiessdto[];
  staffdto: staffdto[];
}

export interface Specialtiessdto {
  id: string;
  specialties: string;
}
export interface staffdto {
  id: string;
  name: string;
  staffType: StaffType;
  specialty: string;
}

export interface WorkingHours {
  day: DayEnum;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface CreateUpdateClinicDto {
  id?: string;
  nameL: string;
  nameF: string;
  phoneNumber: string;
  bio?: string;
  email?: string;
  cityId?: string;
  countryId?: string;
  clinicTypeId?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  specialtyIds: string[];
  hours: WorkingHours[];
  social?: {
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface ClinicListDto extends ClinicDto {
  clinicTypeName?: string;
  cityName?: string;
  specialties?: SelectOption<string>[];
  status?: ClinicStatus;
  rating?: number;
  doctorsCount?: number;
  patientsCount?: number;
}

export interface ClinicFilterDto {
  pageNumber: number;
  pageSize: number;
  sortColumn?: string;
  sortDirection?: string;
  searchValue?: string;
  cityId?: string;
  specialtyId?: string;
  clinicTypeId?: string;
  status?: ClinicStatus;
}

export interface GetUserInfoDto {
  email?: string;
  bio?: string;
  phoneNumber?: string;
  address: string;
}
export interface GetClinicsForDropdownDto extends SelectOption {
  hasBookings: boolean;
}

// Dashboard Types - Updated to match backend DTO
export interface ClinicDashboardDto {
  stats: DashboardStatsDto;
  chartData: DashboardChartDataDto;
  appointmentStatus: DashboardAppointmentStatusDto;
  upcomingAppointments: DashboardUpcomingAppointmentDto[];
  recentActivities: DashboardRecentActivityDto[];
}

export interface DashboardStatsDto {
  totalPatients: number;
  todayAppointments: number;
  completedToday: number;
  todayRevenue: number;
  patientsChange: number;
  appointmentsChange: number;
  revenueChange: number;
  completedChange: number;
  patientSatisfaction: number;
  averageWaitTime: number;
  noShowRate: number;
}

export interface DashboardChartDataDto {
  daily: DashboardDailyDataDto | null;
  weekly: DashboardWeeklyDataDto | null;
  monthly: DashboardMonthlyDataDto | null;
}

export interface DashboardDailyDataDto {
  labels: string[];
  appointments: number[];
  completed: number[];
}

export interface DashboardWeeklyDataDto {
  labels: string[];
  appointments: number[];
  completed: number[];
}

export interface DashboardMonthlyDataDto {
  labels: string[];
  appointments: number[];
  completed: number[];
}

export interface DashboardAppointmentStatusDto {
  statusCounts: AppointmentStatusCountDto[];
}

export interface AppointmentStatusCountDto {
  status: AppointmentStatus;
  count: number;
}
export interface DashboardUpcomingAppointmentDto {
  id: string;
  patientName: string;
  time: string;
  type: VisitType;
  status: AppointmentStatus;
  avatar?: string;
}

export interface DashboardRecentActivityDto {
  id: string;
  action: string;
  patientName: string;
  time: string;
  type: string;
}

export interface ClinicDashboardFilterDto {
  startDate?: string;
  endDate?: string;
  timeRange?: TimeRange;
}
