import { PaginationRequest } from './pagination';

export enum VisitType {
  New = 1,
  Followup,
}

export enum AppointmentStatus {
  Scheduled = 1,
  Confirmed,
  InProgress,
  Completed,
  Cancelled,
  NoShow,
}

export interface AppointmentDto {
  id: string;
  appointmentNumber: string;
  staffName: string;
  clinicName: string;
  date: string;
  startTime: string;
  endTime: string;
  type: VisitType;
  status: AppointmentStatus;
  cancellationReason?: string;
  notes?: string;
  patientId: string;
  staffId: string;
  clinicId: string;
}

export interface AppointmentFilterDto extends PaginationRequest {
  clinicId?: string;
  date?: string;
}

export interface AppointmentListDto {
  id: string;
  appointmentNumber: string;
  staffName: string;
  clinicName: string;
  patientName: string;
  type: VisitType;
  status: AppointmentStatus;
  date: string;
  startTime: string;
  endTime: string;
}

export interface CreateUpdateAppointmentDto {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: VisitType;
  status: AppointmentStatus;
  cancellationReason?: string;
  notes?: string;
  patientId: string;
  staffId: string;
  clinicId: string;
}
export interface UpdateAppointmentStatusDto {
  id: string;
  status: AppointmentStatus;
  cancellationReason?: string;
}
