export enum BookingConditionType {
  General = 1, // شروط عامة
  Cancellation = 2, // شروط الإلغاء
  Payment = 3, // شروط الدفع
  Preparation = 4, // شروط التحضير للموعد
  Documentation = 5, // شروط الوثائق المطلوبة
  Health = 6, // شروط صحية
  Other = 7, // شروط أخرى
}

export interface ClinicBookingConditionDto {
  id?: string;
  titleL: string; // Arabic title
  titleF: string; // English title
  descriptionL?: string; // Arabic description
  descriptionF?: string; // English description
  displayOrder: number;
  isActive: boolean;
  isRequired: boolean;
  conditionType: BookingConditionType;
}

export interface ClinicSettingsDto {
  clinicId: string;

  // Appointment Settings
  appointmentDuration: number;
  allowOnlineBooking: boolean;
  requireApproval: boolean;
  maxAdvanceBookingDays: number;
  cancellationHours: number;
  allowRecurring: boolean;
  recurringTypes: string[];

  // Booking Conditions
  bookingConditions: ClinicBookingConditionDto[];

  // Notification Settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  reminderHours: number;

  // System Settings
  defaultCurrencyId?: string;
  defaultLanguage: string;
  timezone: string;
}

export interface SaveClinicSettingsDto {
  // Appointment Settings
  appointmentDuration: number;
  allowOnlineBooking: boolean;
  requireApproval: boolean;
  maxAdvanceBookingDays: number;
  cancellationHours: number;
  allowRecurring: boolean;
  recurringTypes: string[];

  // Booking Conditions
  bookingConditions?: ClinicBookingConditionDto[];

  // Notification Settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  reminderHours: number;

  // System Settings
  defaultCurrencyId?: string;
  defaultLanguage: string;
  timezone: string;
}

export interface CreateUpdateBookingConditionDto {
  id?: string;
  titleL: string;
  titleF: string;
  descriptionL?: string;
  descriptionF?: string;
  displayOrder: number;
  isActive: boolean;
  isRequired: boolean;
  conditionType: BookingConditionType;
}
