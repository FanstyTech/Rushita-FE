export interface Patient {
  id: string;
  name: string;
  age: number;
  dateOfBirth: string;
  bloodType: string;
  phone: string;
  email: string;
  medicalHistory: string[];
  lastVisit?: string;
  gender: 'male' | 'female';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}

// Mock data
export const patients: Patient[] = [
  {
    id: "P001",
    age: 35,
    name: "John Doe",
    dateOfBirth: "1990-05-15",
    bloodType: "A+",
    phone: "+967 123-456-789",
    email: "john.doe@email.com",
    medicalHistory: ["Diabetes Type 2", "Hypertension"],
    lastVisit: "2025-05-15",
    gender: "male",
    address: "123 Main St, Sana'a",
    emergencyContact: {
      name: "Jane Doe",
      phone: "+967 987-654-321",
      relation: "Spouse"
    }
  },
  {
    id: "P002",
    age: 25,
    name: "Sarah Ahmed",
    dateOfBirth: "1997-08-23",
    bloodType: "O+",
    phone: "+967 234-567-890",
    email: "sarah.ahmed@email.com",
    medicalHistory: ["Asthma"],
    lastVisit: "2025-05-10",
    gender: "female",
    address: "456 Park Ave, Aden",
    emergencyContact: {
      name: "Mohammed Ahmed",
      phone: "+967 876-543-210",
      relation: "Father"
    }
  },
  {
    id: "P003",
    age: 45,
    name: "Mohammed Ali",
    dateOfBirth: "1983-12-01",
    bloodType: "B-",
    phone: "+967 345-678-901",
    email: "mohammed.ali@email.com",
    medicalHistory: ["Allergies", "High Cholesterol"],
    lastVisit: "2025-05-01",
    gender: "male",
    address: "789 Oak Rd, Taiz",
    emergencyContact: {
      name: "Fatima Ali",
      phone: "+967 765-432-109",
      relation: "Sister"
    }
  }
];

// Mock API functions
export const patientAPI = {
  // Get all patients
  getAllPatients: async (): Promise<Patient[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return patients;
  },

  // Get patient by ID
  getPatientById: async (id: string): Promise<Patient | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const patient = patients.find(p => p.id === id);
    return patient || null;
  },

  // Search patients
  searchPatients: async (query: string): Promise<Patient[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const lowercaseQuery = query.toLowerCase();
    return patients.filter(patient =>
      patient.name.toLowerCase().includes(lowercaseQuery) ||
      patient.id.toLowerCase().includes(lowercaseQuery) ||
      patient.phone.includes(query)
    );
  },

  // Advanced search
  advancedSearch: async (filters: {
    name?: string;
    id?: string;
    phone?: string;
    email?: string;
    dateOfBirthFrom?: string;
    dateOfBirthTo?: string;
    bloodType?: string;
    gender?: 'male' | 'female';
  }): Promise<Patient[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return patients.filter(patient => {
      if (filters.name && !patient.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
      if (filters.id && !patient.id.includes(filters.id)) return false;
      if (filters.phone && !patient.phone.includes(filters.phone)) return false;
      if (filters.bloodType && patient.bloodType !== filters.bloodType) return false;
      if (filters.gender && patient.gender !== filters.gender) return false;
      if (filters.dateOfBirthFrom && patient.dateOfBirth < filters.dateOfBirthFrom) return false;
      if (filters.dateOfBirthTo && patient.dateOfBirth > filters.dateOfBirthTo) return false;
      return true;
    });
  },

  // Add new patient
  addPatient: async (patientData: Omit<Patient, 'id'>): Promise<Patient> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const newPatient: Patient = {
      ...patientData,
      id: `P${String(patients.length + 1).padStart(3, '0')}`, // Generate ID like P004
    };
    
    patients.push(newPatient);
    return newPatient;
  },

  // Update patient
  updatePatient: async (id: string, patientData: Partial<Patient>): Promise<Patient | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = patients.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    patients[index] = { ...patients[index], ...patientData };
    return patients[index];
  },

  // Delete patient
  deletePatient: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = patients.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    patients.splice(index, 1);
    return true;
  }
};