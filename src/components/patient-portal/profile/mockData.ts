import {
  PatientData,
  EmergencyContact,
  InsuranceInfo,
  HealthIndicators,
} from './types';

export const mockPatientData: PatientData = {
  name: 'أحمد محمد علي',
  email: 'ahmed.mohamed@example.com',
  phone: '0501234567',
  dateOfBirth: '1985-03-15',
  gender: 'male',
  nationalId: '1234567890',
  address: 'شارع الملك فهد، الرياض، المملكة العربية السعودية',
  medicalFileNumber: 'MF-2024-001',
  registrationDate: '2020-01-15',
  bloodType: 'O+',
  height: 175,
  weight: 75,
  allergies: 'حساسية من البنسلين',
  chronicDiseases: 'لا يوجد',
  medications: 'فيتامين د، أوميغا 3',
};

export const mockEmergencyContact: EmergencyContact = {
  name: 'فاطمة أحمد علي',
  relation: 'زوجة',
  phone: '0509876543',
};

export const mockInsuranceInfo: InsuranceInfo = {
  provider: 'شركة التأمين السعودية',
  policyNumber: 'POL-2024-001234',
  expiryDate: '2025-12-31',
  coverageType: 'تغطية شاملة',
  copayment: 20,
  annualLimit: 50000,
  exclusions: 'العلاجات التجميلية، زراعة الأعضاء',
  notes: 'تغطية تشمل جميع المستشفيات المعتمدة',
};

export const mockHealthIndicators: HealthIndicators = {
  bloodPressure: {
    systolic: 125,
    diastolic: 82,
    status: 'elevated',
    lastUpdated: '2025-07-15',
    trend: 'stable',
  },
  bloodSugar: {
    value: 95,
    status: 'normal',
    lastUpdated: '2025-07-15',
    trend: 'improving',
  },
  heartRate: {
    value: 72,
    status: 'normal',
    lastUpdated: '2025-07-15',
    trend: 'stable',
  },
  cholesterol: {
    total: 190,
    hdl: 55,
    ldl: 120,
    status: 'normal',
    lastUpdated: '2025-06-20',
    trend: 'stable',
  },
  // Add the missing weight property
  weight: {
    value: 75,
    change: -1.5,
    lastUpdated: '2025-07-15',
    trend: 'improving',
  },
};
