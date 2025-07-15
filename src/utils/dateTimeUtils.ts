/**
 * Utility functions for handling dates and times in forms
 */

/**
 * Convert date string to ISO string for API submission
 */
export const convertDateToISO = (dateString: string): string => {
  if (!dateString) return '';
  return new Date(dateString).toISOString();
};

/**
 * Convert time string to proper format for API submission
 * Expected format: "HH:mm" or "HH:mm:ss"
 */
export const formatTimeForAPI = (timeString: string): string => {
  if (!timeString) return '';
  
  // If time is already in HH:mm format, return as is
  if (/^\d{2}:\d{2}$/.test(timeString)) {
    return timeString;
  }
  
  // If time is in HH:mm:ss format, return as is
  if (/^\d{2}:\d{2}:\d{2}$/.test(timeString)) {
    return timeString;
  }
  
  // If time is in Date object format, extract time part
  if (timeString.includes('T')) {
    return timeString.split('T')[1].substring(0, 5); // Extract HH:mm
  }
  
  return timeString;
};

/**
 * Convert date and time strings to proper format for appointment submission
 */
export const formatAppointmentDateTime = (
  date: string,
  startTime: string,
  endTime: string
) => {
  return {
    date: convertDateToISO(date),
    startTime: formatTimeForAPI(startTime),
    endTime: formatTimeForAPI(endTime),
  };
};

/**
 * Format date for display in forms (YYYY-MM-DD)
 */
export const formatDateForInput = (date: string | Date): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
};

/**
 * Format time for display in forms (HH:mm)
 */
export const formatTimeForInput = (time: string): string => {
  if (!time) return '';
  
  // If time is in HH:mm:ss format, extract HH:mm
  if (/^\d{2}:\d{2}:\d{2}$/.test(time)) {
    return time.substring(0, 5);
  }
  
  return time;
};

/**
 * Validate appointment time range
 */
export const validateAppointmentTime = (
  startTime: string,
  endTime: string
): boolean => {
  if (!startTime || !endTime) return false;
  
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  
  return start < end;
};

/**
 * Get time difference in minutes
 */
export const getTimeDifferenceInMinutes = (
  startTime: string,
  endTime: string
): number => {
  if (!startTime || !endTime) return 0;
  
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
};

/**
 * Convert API response data for form display
 */
export const convertApiDataForForm = (appointment: any) => {
  return {
    ...appointment,
    date: formatDateForInput(appointment.date),
    startTime: formatTimeForInput(appointment.startTime),
    endTime: formatTimeForInput(appointment.endTime),
  };
};

/**
 * Convert form data for API submission
 */
export const convertFormDataForAPI = (formData: any) => {
  const { date, startTime, endTime } = formatAppointmentDateTime(
    formData.date,
    formData.startTime,
    formData.endTime
  );
  
  return {
    ...formData,
    date,
    startTime,
    endTime,
  };
}; 