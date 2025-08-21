export interface BookingStep {
  title: string;
  icon: React.ReactNode;
  color: string;
}

export interface BookingFormData {
  selectedClinic: string | null;
  selectedSpecialty: string | null;
  selectedDoctor: string | null;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  appointmentReason: string;
}
