export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  clinicName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  notes: string;
  createdAt: string;
  doctorAvatar?: string;
}

export interface FormData {
  id: string;
  doctorName: string;
  doctorAvatar: string;
  specialty: string;
  clinicName: string;
  date: string;
  time: string;
  status: string;
  notes: string;
  createdAt: string;
}

export interface StatusBadge {
  variant: 'outline' | 'destructive' | 'secondary';
  label: string;
  icon: React.ReactNode;
}
