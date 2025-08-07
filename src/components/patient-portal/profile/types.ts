export interface PatientData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationalId: string;
  address: string;
  medicalFileNumber: string;
  registrationDate: string;
  bloodType: string;
  height: number;
  weight: number;
  allergies: string;
  chronicDiseases: string;
  medications: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  expiryDate: string;
  coverageType: string;
  copayment: number;
  annualLimit: number;
  exclusions: string;
  notes: string;
}

export interface HealthIndicators {
  bloodPressure: {
    systolic: number;
    diastolic: number;
    status: string;
    lastUpdated: string;
    trend: string;
  };
  heartRate: {
    value: number;
    status: string;
    lastUpdated: string;
    trend: string;
  };
  bloodSugar: {
    value: number;
    status: string;
    lastUpdated: string;
    trend: string;
  };
  weight: {
    value: number;
    change: number;
    lastUpdated: string;
    trend: string;
  };
  cholesterol: {
    total: number;
    hdl: number;
    ldl: number;
    status: string;
    lastUpdated: string;
    trend: string;
  };
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  bloodType: string;
  height: number;
  weight: number;
  allergies: string;
  chronicDiseases: string;
  medications: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  insuranceExpiryDate: string;
  insuranceCoverage: string;
}
