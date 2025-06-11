export const PermissionKeys = {
  // Clinic Management
  MANAGE_CLINIC_SETTINGS: 'clinic.settings.manage',
  VIEW_CLINIC_SETTINGS: 'clinic.settings.view',

  // Staff Management
  MANAGE_STAFF: 'clinic.staff.manage',
  VIEW_STAFF: 'clinic.staff.view',
  MANAGE_STAFF_ROLES: 'clinic.staff.roles.manage',

  // Patient Management
  MANAGE_PATIENTS: 'clinic.patients.manage',
  VIEW_PATIENTS: 'clinic.patients.view',
  VIEW_PATIENT_HISTORY: 'clinic.patients.history.view',

  // Appointment Management
  MANAGE_APPOINTMENTS: 'clinic.appointments.manage',
  VIEW_APPOINTMENTS: 'clinic.appointments.view',
  CANCEL_APPOINTMENTS: 'clinic.appointments.cancel',

  // Financial Management
  MANAGE_FINANCIALS: 'clinic.financials.manage',
  VIEW_FINANCIALS: 'clinic.financials.view',
  MANAGE_INVOICES: 'clinic.financials.invoices.manage',

  // Medical Records
  MANAGE_MEDICAL_RECORDS: 'clinic.medical.records.manage',
  VIEW_MEDICAL_RECORDS: 'clinic.medical.records.view',

  // Inventory Management
  MANAGE_INVENTORY: 'clinic.inventory.manage',
  VIEW_INVENTORY: 'clinic.inventory.view',

  // Laboratory
  MANAGE_LAB_TESTS: 'laboratory.manage',
  VIEW_LAB_TESTS: 'laboratory.view',

  // Pharmacy
  MANAGE_PRESCRIPTIONS: 'pharmacy.prescriptions.manage',
  DISPENSE_MEDICATION: 'pharmacy.medication.dispense',
  VIEW_PRESCRIPTIONS: 'pharmacy.prescriptions.view',

  // Reports
  GENERATE_REPORTS: 'reports.generate',
  VIEW_REPORTS: 'reports.view',

  // Notifications
  MANAGE_NOTIFICATIONS: 'notifications.manage',
  VIEW_NOTIFICATIONS: 'notifications.view',

  // System
  MANAGE_SYSTEM_SETTINGS: 'system.settings.manage',
  VIEW_AUDIT_LOGS: 'system.auditlogs.view',

  // Dashboard
  ACCESS_CLINIC_DASHBOARD: 'clinic.dashboard.access',
  ACCESS_ADMIN_DASHBOARD: 'admin.dashboard.access',
  ACCESS_DOCTOR_DASHBOARD: 'doctor.dashboard.access',

  // Doctor Specific
  MANAGE_TREATMENTS: 'doctor.treatments.manage',
  VIEW_TREATMENTS: 'doctor.treatments.view',
  MANAGE_LEAVES: 'doctor.leaves.manage',
  VIEW_LEAVES: 'doctor.leaves.view',
  VIEW_PROFILE: 'doctor.profile.view',
  MANAGE_PROFILE: 'doctor.profile.manage',

  // Admin Specific
  MANAGE_CLINICS: 'admin.clinics.manage',
  VIEW_CLINICS: 'admin.clinics.view',
  CREATE_CLINICS: 'admin.clinics.create',
  VIEW_USERS: 'admin.users.view',
  MANAGE_USERS: 'admin.users.manage',

  // Admin Reports
  VIEW_PERFORMANCE_REPORTS: 'admin.reports.performance.view',
  VIEW_ANALYTICS_REPORTS: 'admin.reports.analytics.view',

  // Admin Lookups
  MANAGE_LOOKUPS: 'admin.lookups.manage',
  VIEW_SPECIALTY: 'admin.lookups.specialty.view',
  VIEW_COUNTRY: 'admin.lookups.country.view',
  VIEW_CITY: 'admin.lookups.city.view',
  VIEW_CLINIC_TYPE: 'admin.lookups.clinic.type.view',
  VIEW_RADIOLOGY_TEST_CATEGORY: 'admin.lookups.radiology.category.view',
  VIEW_RADIOLOGY_TEST: 'admin.lookups.radiology.test.view',
  VIEW_MEDICATION_TYPE: 'admin.lookups.medication.type.view',
  VIEW_MEDICINE: 'admin.lookups.medicine.view',
  VIEW_LAB_TEST_CATEGORY: 'admin.lookups.lab.category.view',
  VIEW_LAB_TEST: 'admin.lookups.lab.test.view',
  VIEW_DIAGNOSIS_CATEGORY: 'admin.lookups.diagnosis.category.view',
  VIEW_DIAGNOSIS: 'admin.lookups.diagnosis.view',
  VIEW_DENTAL_PROCEDURE: 'admin.lookups.dental.procedure.view',
} as const;

export type PermissionKey =
  (typeof PermissionKeys)[keyof typeof PermissionKeys];
