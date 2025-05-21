export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

// Mock data for doctors
const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Ahmed Abdullah',
    specialization: 'General Medicine',
    email: 'ahmed.abdullah@clinic.com',
    phone: '+966-50-1234567',
    status: 'active',
  },
  {
    id: '2',
    name: 'Dr. Sara Mohammed',
    specialization: 'Pediatrics',
    email: 'sara.mohammed@clinic.com',
    phone: '+966-50-2345678',
    status: 'active',
  },
  {
    id: '3',
    name: 'Dr. Khalid Omar',
    specialization: 'Dentistry',
    email: 'khalid.omar@clinic.com',
    phone: '+966-50-3456789',
    status: 'active',
  },
  {
    id: '4',
    name: 'Dr. Fatima Hassan',
    specialization: 'Cardiology',
    email: 'fatima.hassan@clinic.com',
    phone: '+966-50-4567890',
    status: 'active',
  },
];

// API functions for doctors
export const doctorAPI = {
  getAllDoctors: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...mockDoctors];
  },

  getDoctorById: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockDoctors.find((doctor) => doctor.id === id) || null;
  },

  searchDoctors: async (query: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const lowercaseQuery = query.toLowerCase();
    return mockDoctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(lowercaseQuery) ||
        doctor.specialization.toLowerCase().includes(lowercaseQuery)
    );
  },

  updateDoctorStatus: async (id: string, status: 'active' | 'inactive') => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const doctorIndex = mockDoctors.findIndex((d) => d.id === id);
    if (doctorIndex !== -1) {
      mockDoctors[doctorIndex] = {
        ...mockDoctors[doctorIndex],
        status,
      };
      return mockDoctors[doctorIndex];
    }
    return null;
  },
};
