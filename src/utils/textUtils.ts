/**
 * Collection of text utility functions for common text operations
 */

import { ClinicStatus, DayEnum, StaffTypeEnum } from '@/lib/api/types/clinic';
import {
  AppointmentStatus,
  BloodType,
  BMICategory,
  FrequencyType,
  Gender,
  MedicalConditionStatus,
  Relationship,
  Severity,
  VisitType,
} from '@/lib/api/types/clinic-patient';
import { ClinicStaffStatus } from '@/lib/api/types/clinic-staff';
import { DosageForm, MedicineStrength } from '@/lib/api/types/medicine';
import { ServiceType } from '@/lib/api/types/service-price';
import { VisitStatus } from '@/lib/api/types/visit';
import { TestStatus } from '@/lib/api/types/visit-lab-test';
import { PrescriptionStatus } from '@/lib/api/types/visit-prescription';

/**
 * Generates initials from a name string.
 * Takes the first letter of each word and joins them.
 * @param name - The full name to generate initials from
 * @param maxLength - Maximum number of initials to return (default: 2)
 * @returns Uppercase initials string
 * @example
 * getInitials("Medical Center") // returns "MC"
 * getInitials("City Hospital Care", 3) // returns "CHC"
 */
export const getInitials = (name: string, maxLength: number = 2): string => {
  if (!name) return '';

  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, maxLength);
};

/**
 * Truncates text to a specified length and adds ellipsis if needed.
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - String to append to truncated text (default: "...")
 * @returns Truncated text with suffix if needed
 * @example
 * truncateText("Long description text", 10) // returns "Long descr..."
 */
export const truncateText = (
  text: string,
  maxLength: number,
  suffix: string = '...'
): string => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}${suffix}`;
};

/**
 * Capitalizes the first letter of each word in a string.
 * @param text - The text to capitalize
 * @returns Text with first letter of each word capitalized
 * @example
 * toTitleCase("hello world") // returns "Hello World"
 */
export const toTitleCase = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Formats a number as currency.
 * @param amount - The amount to format
 * @param currency - Currency code (default: "USD")
 * @param locale - Locale for formatting (default: "en-US")
 * @returns Formatted currency string
 * @example
 * formatCurrency(1234.56) // returns "$1,234.56"
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Removes special characters and spaces from a string, useful for slugs/URLs.
 * @param text - The text to slugify
 * @returns URL-friendly slug
 * @example
 * slugify("Hello World!") // returns "hello-world"
 */
export const slugify = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Extracts the first paragraph from a longer text.
 * @param text - The text to extract from
 * @param maxLength - Optional maximum length for the excerpt
 * @returns First paragraph or truncated text
 * @example
 * getExcerpt("First paragraph.\n\nSecond paragraph.") // returns "First paragraph."
 */
export const getExcerpt = (text: string, maxLength?: number): string => {
  if (!text) return '';
  const firstParagraph = text.split(/\n\s*\n/)[0].trim();
  return maxLength ? truncateText(firstParagraph, maxLength) : firstParagraph;
};

/**
 * Formats a phone number into a readable format.
 * @param phone - The phone number to format
 * @param format - Format pattern (default: "(XXX) XXX-XXXX")
 * @returns Formatted phone number
 * @example
 * formatPhoneNumber("1234567890") // returns "(123) 456-7890"
 */
export const formatPhoneNumber = (
  phone: string,
  format: string = '(XXX) XXX-XXXX'
): string => {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  let result = format;
  for (let i = 0; i < digits.length && i < format.length; i++) {
    result = result.replace('X', digits[i]);
  }
  return result.includes('X') ? digits : result;
};

/**
 * Returns a human-readable label for a clinic status.
 * @param status - The clinic status to convert
 * @returns Human-readable label for the status
 * @example
 * getStatusLabel(ClinicStatus.Active) // returns "Active"
 */
export const getClinicStatusLabel = (status: ClinicStatus): string => {
  const statusMap: Record<ClinicStatus, string> = {
    [ClinicStatus.Active]: 'Active',
    [ClinicStatus.Inactive]: 'Inactive',
    [ClinicStatus.PendingApproval]: 'Pending Approval',
    [ClinicStatus.Rejected]: 'Rejected',
    [ClinicStatus.Suspended]: 'Suspended',
    [ClinicStatus.Closed]: 'Closed',
  };
  return statusMap[status] || 'Unknown';
};

export const getClinicStatusClass = (status: ClinicStatus): string => {
  const statusMap: Record<ClinicStatus, string> = {
    [ClinicStatus.Active]: 'bg-green-100 text-green-800',
    [ClinicStatus.Inactive]: 'bg-red-100 text-red-800',
    [ClinicStatus.PendingApproval]: 'bg-yellow-100 text-yellow-800',
    [ClinicStatus.Rejected]: 'bg-pink-100 text-pink-800',
    [ClinicStatus.Suspended]: 'bg-blue-100 text-blue-800',
    [ClinicStatus.Closed]: 'bg-purple-100 text-purple-800',
  };
  return statusMap[status] || 'Unknown';
};

export const getClinicStaffStatusLabel = (
  status: ClinicStaffStatus
): string => {
  const statusMap: Record<ClinicStaffStatus, string> = {
    [ClinicStaffStatus.Active]: 'Active',
    [ClinicStaffStatus.Inactive]: 'Inactive',
    [ClinicStaffStatus.OnLeave]: 'On Leave',
    [ClinicStaffStatus.Suspended]: 'Suspended',
    [ClinicStaffStatus.Terminated]: 'Terminated',
  };
  return statusMap[status] || 'Unknown';
};
export const getClinicStaffStatusClass = (
  status: ClinicStaffStatus
): string => {
  const statusMap: Record<ClinicStaffStatus, string> = {
    [ClinicStaffStatus.Active]: 'bg-green-100 text-green-800',
    [ClinicStaffStatus.Inactive]: 'bg-gray-100 text-gray-800',
    [ClinicStaffStatus.OnLeave]: 'bg-yellow-100 text-yellow-800',
    [ClinicStaffStatus.Suspended]: 'bg-blue-100 text-blue-800',
    [ClinicStaffStatus.Terminated]: 'bg-red-100 text-red-800',
  };
  return statusMap[status] || 'bg-gray-50 text-gray-400';
};

export const getGenderLabel = (gender: Gender): string => {
  const genderMap: Record<Gender, string> = {
    [Gender.Male]: 'Male',
    [Gender.Female]: 'Female',
  };
  return genderMap[gender] || 'Unknown';
};

export const getMedicalConditionStatusLabel = (
  status: MedicalConditionStatus
): string => {
  const statusMap: Record<MedicalConditionStatus, string> = {
    [MedicalConditionStatus.Controlled]: 'Controlled',
    [MedicalConditionStatus.Monitoring]: 'Monitoring',
    [MedicalConditionStatus.Critical]: 'Critical',
  };
  return statusMap[status] || 'Unknown';
};

export const getSeverityLabel = (severity: Severity): string => {
  const severityMap: Record<Severity, string> = {
    [Severity.Mild]: 'Mild',
    [Severity.Moderate]: 'Moderate',
    [Severity.Severe]: 'Severe',
  };
  return severityMap[severity] || 'Unknown';
};

export const getFrequencyTypeLabel = (frequency: FrequencyType): string => {
  const frequencyMap: Record<FrequencyType, string> = {
    [FrequencyType.Daily]: 'Daily',
    [FrequencyType.BID]: 'Twice a Day (BID)',
    [FrequencyType.TID]: 'Three Times a Day (TID)',
    [FrequencyType.QID]: 'Four Times a Day (QID)',
    [FrequencyType.Weekly]: 'Weekly',
    [FrequencyType.Monthly]: 'Monthly',
    [FrequencyType.AsNeeded]: 'As Needed',
  };
  return frequencyMap[frequency] || 'Unknown';
};

export const getRelationshipLabel = (relationship: Relationship): string => {
  const relationshipMap: Record<Relationship, string> = {
    [Relationship.Parent]: 'Parent',
    [Relationship.Spouse]: 'Spouse',
    [Relationship.Sibling]: 'Sibling',
    [Relationship.Child]: 'Child',
    [Relationship.Relative]: 'Relative',
    [Relationship.Friend]: 'Friend',
    [Relationship.Neighbor]: 'Neighbor',
    [Relationship.Other]: 'Other',
  };
  return relationshipMap[relationship] || 'Unknown';
};

export const getVisitTypeLabel = (visitType: VisitType): string => {
  const visitTypeMap: Record<VisitType, string> = {
    [VisitType.New]: 'New Visit',
    [VisitType.Followup]: 'Follow-up Visit',
  };
  return visitTypeMap[visitType] || 'Unknown';
};

export const getAppointmentStatusLabel = (
  status: AppointmentStatus
): string => {
  const statusMap: Record<AppointmentStatus, string> = {
    [AppointmentStatus.Scheduled]: 'Scheduled',
    [AppointmentStatus.Confirmed]: 'Confirmed',
    [AppointmentStatus.InProgress]: 'In Progress',
    [AppointmentStatus.Completed]: 'Completed',
    [AppointmentStatus.Cancelled]: 'Cancelled',
    [AppointmentStatus.NoShow]: 'No Show',
  };
  return statusMap[status] || 'Unknown';
};

export const getBloodTypeLabel = (status: BloodType): string => {
  // Blood type display names mapping
  const bloodTypeDisplayNames: Record<BloodType, string> = {
    [BloodType.A_Positive]: 'A+',
    [BloodType.A_Negative]: 'A-',
    [BloodType.B_Positive]: 'B+',
    [BloodType.B_Negative]: 'B-',
    [BloodType.AB_Positive]: 'AB+',
    [BloodType.AB_Negative]: 'AB-',
    [BloodType.O_Positive]: 'O+',
    [BloodType.O_Negative]: 'O-',
  };

  return bloodTypeDisplayNames[status] || 'Unknown';
};

export const getMedicalConditionStatusClass = (
  status: MedicalConditionStatus
): string => {
  const statusMap: Record<MedicalConditionStatus, string> = {
    [MedicalConditionStatus.Controlled]: 'bg-green-100 text-green-800',
    [MedicalConditionStatus.Monitoring]: 'bg-yellow-100 text-yellow-800',
    [MedicalConditionStatus.Critical]: 'bg-red-100 text-red-800',
  };
  return statusMap[status] || 'bg-gray-50 text-gray-400';
};

export const getVisitStatusLabel = (status: VisitStatus): string => {
  const visitStatusMap: Record<VisitStatus, string> = {
    [VisitStatus.Pending]: 'Pending',
    [VisitStatus.InProgress]: 'In Progress',
    [VisitStatus.Completed]: 'Completed',
    [VisitStatus.Cancelled]: 'Cancelled',
  };
  return visitStatusMap[status] || 'Unknown';
};

export const getVisitStatusClass = (status: VisitStatus): string => {
  const visitStatusMap: Record<VisitStatus, string> = {
    [VisitStatus.Pending]: 'bg-yellow-100 text-yellow-800',
    [VisitStatus.InProgress]: 'bg-blue-100 text-blue-800',
    [VisitStatus.Completed]: 'bg-green-100 text-green-800',
    [VisitStatus.Cancelled]: 'bg-red-100 text-red-800',
  };
  return visitStatusMap[status] || 'bg-gray-50 text-gray-400';
};

export const getSeverityClass = (severity: Severity): string => {
  const severityMap: Record<Severity, string> = {
    [Severity.Mild]: 'bg-green-100 text-green-800',
    [Severity.Moderate]: 'bg-yellow-100 text-yellow-800',
    [Severity.Severe]: 'bg-red-100 text-red-800',
  };
  return severityMap[severity] || 'bg-gray-50 text-gray-400';
};

export const getFrequencyTypeClass = (frequency: FrequencyType): string => {
  const frequencyMap: Record<FrequencyType, string> = {
    [FrequencyType.Daily]: 'bg-blue-100 text-blue-800',
    [FrequencyType.BID]: 'bg-teal-100 text-teal-800',
    [FrequencyType.TID]: 'bg-cyan-100 text-cyan-800',
    [FrequencyType.QID]: 'bg-indigo-100 text-indigo-800',
    [FrequencyType.Weekly]: 'bg-purple-100 text-purple-800',
    [FrequencyType.Monthly]: 'bg-pink-100 text-pink-800',
    [FrequencyType.AsNeeded]: 'bg-gray-100 text-gray-800',
  };
  return frequencyMap[frequency] || 'bg-gray-50 text-gray-400';
};

export const getRelationshipClass = (relationship: Relationship): string => {
  const relationshipMap: Record<Relationship, string> = {
    [Relationship.Parent]: 'bg-blue-100 text-blue-800',
    [Relationship.Spouse]: 'bg-pink-100 text-pink-800',
    [Relationship.Sibling]: 'bg-yellow-100 text-yellow-800',
    [Relationship.Child]: 'bg-green-100 text-green-800',
    [Relationship.Relative]: 'bg-purple-100 text-purple-800',
    [Relationship.Friend]: 'bg-teal-100 text-teal-800',
    [Relationship.Neighbor]: 'bg-cyan-100 text-cyan-800',
    [Relationship.Other]: 'bg-gray-100 text-gray-800',
  };
  return relationshipMap[relationship] || 'bg-gray-50 text-gray-400';
};

export const getVisitTypeClass = (visitType: VisitType): string => {
  const visitTypeMap: Record<VisitType, string> = {
    [VisitType.New]: 'bg-green-100 text-green-800',
    [VisitType.Followup]: 'bg-blue-100 text-blue-800',
  };
  return visitTypeMap[visitType] || 'bg-gray-50 text-gray-400';
};

export const getAppointmentStatusClass = (
  status: AppointmentStatus
): string => {
  const statusMap: Record<AppointmentStatus, string> = {
    [AppointmentStatus.Scheduled]: 'bg-blue-100 text-blue-800',
    [AppointmentStatus.Confirmed]: 'bg-green-100 text-green-800',
    [AppointmentStatus.InProgress]: 'bg-yellow-100 text-yellow-800',
    [AppointmentStatus.Completed]: 'bg-gray-100 text-gray-800',
    [AppointmentStatus.Cancelled]: 'bg-red-100 text-red-800',
    [AppointmentStatus.NoShow]: 'bg-orange-100 text-orange-800',
  };
  return statusMap[status] || 'bg-gray-50 text-gray-400';
};

export const getDayLabel = (day: DayEnum): string => {
  // Blood type display names mapping
  const dayNames: Record<DayEnum, string> = {
    [DayEnum.Sunday]: 'Sunday',
    [DayEnum.Monday]: 'Monday',
    [DayEnum.Tuesday]: 'Tuesday',
    [DayEnum.Wednesday]: 'Wednesday',
    [DayEnum.Thursday]: 'Thursday',
    [DayEnum.Friday]: 'Friday',
    [DayEnum.Saturday]: 'Saturday',
  };

  return dayNames[day] || 'unknown';
};

export const ConvartDayLabel = (day: string): number => {
  // Blood type display names mapping
  const dayNames: Record<string, DayEnum> = {
    ['Sunday']: DayEnum.Sunday,
    ['Monday']: DayEnum.Monday,
    ['Tuesday']: DayEnum.Tuesday,
    ['Wednesday']: DayEnum.Wednesday,
    ['Thursday']: DayEnum.Thursday,
    ['Friday']: DayEnum.Friday,
    ['Saturday']: DayEnum.Saturday,
  };

  return dayNames[day] || day;
};

export const GetStaffType = (StaffType: StaffTypeEnum): string => {
  const Type: Record<StaffTypeEnum, string> = {
    [StaffTypeEnum.ClinicAdministrator]: 'ClinicAdministrator',
    [StaffTypeEnum.Doctor]: 'Doctor',
    [StaffTypeEnum.Nurse]: 'Nurse',
    [StaffTypeEnum.Receptionist]: 'Receptionist',
    [StaffTypeEnum.FinancialStaff]: 'FinancialStaff',
    [StaffTypeEnum.LabTechnician]: 'LabTechnician',
    [StaffTypeEnum.Pharmacist]: 'Pharmacist',
  };
  return Type[StaffType] || 'Unknown';
};

export const getServiceTypeColor = (type: ServiceType): string => {
  const typeColorMap: Record<ServiceType, string> = {
    [ServiceType.Visit]:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    [ServiceType.Prescription]:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    [ServiceType.LabTest]:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    [ServiceType.Radiology]:
      'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    [ServiceType.Dental]:
      'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  };

  return (
    typeColorMap[type] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  );
};
export const getServiceTypeLabel = (type: ServiceType): string => {
  const typeNameMap: Record<ServiceType, string> = {
    [ServiceType.Visit]: 'Visit',
    [ServiceType.Prescription]: 'Prescription',
    [ServiceType.LabTest]: 'Lab Test',
    [ServiceType.Radiology]: 'Radiology',
    [ServiceType.Dental]: 'Dental',
  };

  return typeNameMap[type] || 'Unknown';
};
export const getTestStatusLabel = (status: TestStatus): string => {
  const statusLabelMap: Record<TestStatus, string> = {
    [TestStatus.Pending]: 'Pending',
    [TestStatus.InProgress]: 'In Progress',
    [TestStatus.Completed]: 'Completed',
    [TestStatus.Cancelled]: 'Cancelled',
    [TestStatus.Failed]: 'Failed',
  };

  return statusLabelMap[status] || 'Unknown';
};

export const getTestStatusColor = (status: TestStatus): string => {
  const statusColorMap: Record<TestStatus, string> = {
    [TestStatus.Pending]:
      'bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    [TestStatus.InProgress]:
      'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    [TestStatus.Completed]:
      'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300',
    [TestStatus.Cancelled]:
      'bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    [TestStatus.Failed]:
      'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300',
  };

  return (
    statusColorMap[status] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  );
};
export const getPrescriptionStatusColor = (
  status: PrescriptionStatus
): string => {
  const statusColorMap: Record<PrescriptionStatus, string> = {
    [PrescriptionStatus.Pending]:
      'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    [PrescriptionStatus.PartiallyDispensed]:
      'bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    [PrescriptionStatus.FullyDispensed]:
      'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300',
    [PrescriptionStatus.Cancelled]:
      'bg-red-500 text-red-700 dark:bg-red-900 dark:text-red-300',
    [PrescriptionStatus.Expired]:
      'bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  };

  return (
    statusColorMap[status] ||
    'bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
  );
};
export const getPrescriptionStatusLabel = (
  status: PrescriptionStatus
): string => {
  const statusLabelMap: Record<PrescriptionStatus, string> = {
    [PrescriptionStatus.Pending]: 'Pending',
    [PrescriptionStatus.PartiallyDispensed]: 'Partially Dispensed',
    [PrescriptionStatus.FullyDispensed]: 'Fully Dispensed',
    [PrescriptionStatus.Cancelled]: 'Cancelled',
    [PrescriptionStatus.Expired]: 'Expired',
  };

  return statusLabelMap[status] || 'Unknown';
};

export const getDosageFormLabel = (form: DosageForm): string => {
  const dosageFormLabelMap: Record<DosageForm, string> = {
    [DosageForm.Tablet]: 'Tablets',
    [DosageForm.Capsule]: 'Capsules',
    [DosageForm.Syrup]: 'Syrup',
    [DosageForm.Injection]: 'Injection',
    [DosageForm.Cream]: 'Cream',
    [DosageForm.Drops]: 'Drops',
    [DosageForm.Inhaler]: 'Inhaler',
    [DosageForm.Other]: 'Other',
  };

  return dosageFormLabelMap[form] || 'Unknown';
};
export const getMedicineStrengthLabel = (
  strength: MedicineStrength
): string => {
  const medicineStrengthLabelMap: Record<MedicineStrength, string> = {
    [MedicineStrength.Mg250]: 'Mg 250',
    [MedicineStrength.Mg500]: 'Mg 500',
    [MedicineStrength.Mg1000]: 'Mg 1000',
    [MedicineStrength.Other]: 'Other',
  };

  return medicineStrengthLabelMap[strength] || 'Unknown';
};
export const getBMICategoryLabel = (category: BMICategory): string => {
  const bmiCategoryLabelMap: Record<BMICategory, string> = {
    [BMICategory.Underweight]: 'Underweight',
    [BMICategory.Normal]: 'Normal',
    [BMICategory.Overweight]: 'Overweight',
    [BMICategory.Obese]: 'Obese',
  };

  return bmiCategoryLabelMap[category] || 'Unknown';
};
