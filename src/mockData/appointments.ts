import { Patient } from './patients';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'checkup' | 'followup' | 'emergency' | 'dental';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'waiting';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentWithDetails extends Appointment {
  patient: Patient;
  doctor: {
    id: string;
    name: string;
    specialty: string;
  };
}

// Mock data
const appointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2024-03-20',
    startTime: '09:00',
    endTime: '09:30',
    type: 'checkup',
    status: 'scheduled',
    notes: 'Regular checkup',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    date: '2024-03-21',
    startTime: '14:30',
    endTime: '15:00',
    type: 'followup',
    status: 'scheduled',
    notes: 'Follow-up after medication change',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  }
];

export const appointmentAPI = {
  // Get all appointments
  getAppointments: async (filters?: {
    startDate?: string;
    endDate?: string;
    doctorId?: string;
    patientId?: string;
    status?: Appointment['status'];
  }): Promise<Appointment[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredAppointments = [...appointments];
    
    if (filters) {
      if (filters.startDate) {
        filteredAppointments = filteredAppointments.filter(a => a.date >= filters.startDate!);
      }
      if (filters.endDate) {
        filteredAppointments = filteredAppointments.filter(a => a.date <= filters.endDate!);
      }
      if (filters.doctorId) {
        filteredAppointments = filteredAppointments.filter(a => a.doctorId === filters.doctorId);
      }
      if (filters.patientId) {
        filteredAppointments = filteredAppointments.filter(a => a.patientId === filters.patientId);
      }
      if (filters.status) {
        filteredAppointments = filteredAppointments.filter(a => a.status === filters.status);
      }
    }
    
    return filteredAppointments;
  },

  // Create new appointment
  createAppointment: async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newAppointment: Appointment = {
      ...appointment,
      id: String(appointments.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    appointments.push(newAppointment);
    return newAppointment;
  },

  // Update appointment
  updateAppointment: async (id: string, updates: Partial<Appointment>): Promise<Appointment> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = appointments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Appointment not found');
    
    appointments[index] = {
      ...appointments[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    return appointments[index];
  },

  // Delete appointment
  deleteAppointment: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = appointments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Appointment not found');
    
    appointments.splice(index, 1);
  }
};