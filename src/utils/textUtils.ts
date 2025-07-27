/**
 * Collection of text utility functions for common text operations
 */

import { ClinicStatus } from '@/lib/api/types/clinic';
import {
  AppointmentStatus,
  BloodType,
  FrequencyType,
  Gender,
  MedicalConditionStatus,
  Relationship,
  Severity,
  VisitType,
} from '@/lib/api/types/clinic-patient';
import { ClinicStaffStatus } from '@/lib/api/types/clinic-staff';

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
    [Relationship.Father]: 'Father',
    [Relationship.Mother]: 'Mother',
    [Relationship.Sibling]: 'Sibling',
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
    [Relationship.Father]: 'bg-blue-100 text-blue-800',
    [Relationship.Mother]: 'bg-pink-100 text-pink-800',
    [Relationship.Sibling]: 'bg-yellow-100 text-yellow-800',
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
