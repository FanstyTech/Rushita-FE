import { Doctor } from './doctors';

export type ShiftType = 'morning' | 'evening' | 'night' | 'on-call';
export type LeaveType = 'sick' | 'vacation' | 'personal' | 'other';
export type ScheduleStatus = 'approved' | 'pending' | 'rejected';

export interface DoctorSchedule {
  id: string;
  doctorId: string;
  date: string;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  isOnCall: boolean;
  status: ScheduleStatus;
}

export interface LeaveRequest {
  id: string;
  doctorId: string;
  startDate: string;
  endDate: string;
  leaveType: LeaveType;
  reason: string;
  status: ScheduleStatus;
  createdAt: string;
}

export interface WorkloadMetrics {
  doctorId: string;
  totalPatients: number;
  totalHours: number;
  onCallHours: number;
  weeklyAppointments: number;
}

// Mock data for doctor schedules
const mockSchedules: DoctorSchedule[] = [
  {
    id: '1',
    doctorId: '1',
    date: '2025-05-20',
    shiftType: 'morning',
    startTime: '08:00',
    endTime: '16:00',
    isOnCall: false,
    status: 'approved',
  },
  {
    id: '2',
    doctorId: '2',
    date: '2025-05-20',
    shiftType: 'evening',
    startTime: '16:00',
    endTime: '00:00',
    isOnCall: false,
    status: 'approved',
  },
  {
    id: '3',
    doctorId: '3',
    date: '2025-05-21',
    shiftType: 'morning',
    startTime: '08:00',
    endTime: '16:00',
    isOnCall: false,
    status: 'approved',
  },
  {
    id: '4',
    doctorId: '4',
    date: '2025-05-21',
    shiftType: 'evening',
    startTime: '16:00',
    endTime: '00:00',
    isOnCall: false,
    status: 'approved',
  },
  // Add more mock schedules as needed
];

// Mock data for leave requests
const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    doctorId: '1',
    startDate: '2025-05-25',
    endDate: '2025-05-27',
    leaveType: 'vacation',
    reason: 'Family vacation',
    status: 'pending',
    createdAt: '2025-05-20T10:00:00Z',
  },
  {
    id: '2',
    doctorId: '2',
    startDate: '2025-05-28',
    endDate: '2025-05-30',
    leaveType: 'sick',
    reason: 'Illness',
    status: 'pending',
    createdAt: '2025-05-25T10:00:00Z',
  },
  // Add more mock leave requests as needed
];

// Mock data for workload metrics
const mockWorkloadMetrics: WorkloadMetrics[] = [
  {
    doctorId: '1',
    totalPatients: 45,
    totalHours: 40,
    onCallHours: 8,
    weeklyAppointments: 25,
  },
  {
    doctorId: '2',
    totalPatients: 50,
    totalHours: 45,
    onCallHours: 10,
    weeklyAppointments: 30,
  },
  // Add more mock workload data as needed
];

// API functions
export const doctorScheduleAPI = {
  // Schedule management
  getSchedules: async (filters?: {
    doctorId?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let filteredSchedules = [...mockSchedules];

    if (filters?.doctorId) {
      filteredSchedules = filteredSchedules.filter(
        (schedule) => schedule.doctorId === filters.doctorId
      );
    }

    if (filters?.startDate) {
      filteredSchedules = filteredSchedules.filter(
        (schedule) => schedule.date >= filters.startDate!
      );
    }

    if (filters?.endDate) {
      filteredSchedules = filteredSchedules.filter(
        (schedule) => schedule.date <= filters.endDate!
      );
    }

    return filteredSchedules;
  },

  createSchedule: async (schedule: Omit<DoctorSchedule, 'id'>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newSchedule: DoctorSchedule = {
      ...schedule,
      id: Math.random().toString(36).substr(2, 9),
    };
    mockSchedules.push(newSchedule);
    return newSchedule;
  },

  // Leave management
  getLeaveRequests: async (filters?: {
    doctorId?: string;
    status?: ScheduleStatus;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let filteredRequests = [...mockLeaveRequests];

    if (filters?.doctorId) {
      filteredRequests = filteredRequests.filter(
        (request) => request.doctorId === filters.doctorId
      );
    }

    if (filters?.status) {
      filteredRequests = filteredRequests.filter(
        (request) => request.status === filters.status
      );
    }

    return filteredRequests;
  },

  createLeaveRequest: async (
    request: Omit<LeaveRequest, 'id' | 'createdAt' | 'status'>
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newRequest: LeaveRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    mockLeaveRequests.push(newRequest);
    return newRequest;
  },

  updateLeaveStatus: async (id: string, status: ScheduleStatus) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const requestIndex = mockLeaveRequests.findIndex(
      (request) => request.id === id
    );
    if (requestIndex === -1) {
      throw new Error('Leave request not found');
    }
    mockLeaveRequests[requestIndex] = {
      ...mockLeaveRequests[requestIndex],
      status,
    };
    return mockLeaveRequests[requestIndex];
  },

  // Workload metrics
  getWorkloadMetrics: async (doctorId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      doctorId,
      totalPatients: Math.floor(Math.random() * 100),
      totalHours: Math.floor(Math.random() * 160),
      onCallHours: Math.floor(Math.random() * 40),
      weeklyAppointments: Math.floor(Math.random() * 30),
    };
  },
};
