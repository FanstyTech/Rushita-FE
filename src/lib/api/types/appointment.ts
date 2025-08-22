import { PaginationRequest } from './pagination';
import { SelectOption } from './select-option';

export enum VisitType {
  New = 1,
  Followup,
}

export enum AppointmentStatus {
  Pending = 1,
  Scheduled = 2,
  Confirmed = 3,
  InProgress = 4,
  Completed = 5,
  Cancelled = 6,
  NoShow = 7,
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
  type?: VisitType;
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
  notes?: string;
}

export interface CreateUpdateAppointmentDto {
  id?: string;
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

export interface GetAppointmentForEditDto extends CreateUpdateAppointmentDto {
  appointmentNumber: string;
  patientName: string;
  patient: SelectOption<string>;
  staff: SelectOption<string>;
}
