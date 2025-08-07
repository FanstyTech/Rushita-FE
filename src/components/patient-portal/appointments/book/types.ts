export interface Clinic {
  id: string;
  name: string;
  color: string;
}

export interface Specialty {
  id: string;
  name: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinicId: string;
  image?: string;
}

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
