export interface Appointment {
  id: string;
  doctorName: string;
  doctorAvatar: string;
  specialty: string;
  clinic: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending';
  type: string;
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  image: string;
  dosage: string;
  frequency: string;
  remainingDays: number;
  totalDays: number;
  startDate: string;
  endDate: string;
  instructions: string;
  prescribedBy: string;
  refillable: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface Visit {
  id: string;
  doctorName: string;
  doctorAvatar: string;
  specialty: string;
  clinic: string;
  date: string;
  diagnosis?: string;
  treatment?: string;
  followUp: boolean;
  followUpDate?: string;
  documents: number;
  tests: number;
  reason?: string;
  type?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'medication' | 'test' | 'message' | 'system';
  time: string;
  read: boolean;
  timestamp: Date;
  actionUrl?: string | null;
  actionText?: string | null;
}

export interface HealthAlert {
  id: string;
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
  actionText?: string;
}

export interface QuickAction {
  id: string;
  titleKey: string;
  icon: any;
  url: string;
  color: 'blue' | 'purple' | 'green' | 'amber';
}

export interface HealthMetrics {
  bloodPressure: {
    systolic: number;
    diastolic: number;
    status: string;
    lastUpdated: string;
    history: Array<{ systolic: number; diastolic: number; date: Date }>;
  };
  bloodSugar: {
    value: number;
    unit: string;
    status: string;
    lastUpdated: string;
    history: Array<{ value: number; date: Date }>;
  };
  weight: {
    value: number;
    unit: string;
    trend: string;
    lastUpdated: string;
    history: Array<{ value: number; date: Date }>;
  };
  heartRate: {
    value: number;
    unit: string;
    status: string;
    lastUpdated: string;
    history: Array<{ value: number; date: Date }>;
  };
  cholesterol: {
    total: number;
    hdl: number;
    ldl: number;
    unit: string;
    status: string;
    lastUpdated: string;
  };
}
