import { Clinic, Specialty, Doctor } from './types';

export const mockSpecialties: Specialty[] = [
  { id: 'spec-1', name: 'طب عام' },
  { id: 'spec-2', name: 'أسنان' },
  { id: 'spec-3', name: 'جلدية' },
  { id: 'spec-4', name: 'عيون' },
  { id: 'spec-5', name: 'باطنية' },
  { id: 'spec-6', name: 'أطفال' },
  { id: 'spec-7', name: 'نساء وتوليد' },
  { id: 'spec-8', name: 'عظام' },
];

export const mockDoctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'د. أحمد محمد',
    specialty: 'spec-1',
    clinicId: 'clinic-1',
    image: '/images/doctors/doctor-1.jpg',
  },
  {
    id: 'doc-2',
    name: 'د. سارة خالد',
    specialty: 'spec-2',
    clinicId: 'clinic-2',
    image: '/images/doctors/doctor-2.jpg',
  },
  {
    id: 'doc-3',
    name: 'د. محمد علي',
    specialty: 'spec-3',
    clinicId: 'clinic-3',
    image: '/images/doctors/doctor-3.jpg',
  },
  {
    id: 'doc-4',
    name: 'د. فاطمة أحمد',
    specialty: 'spec-4',
    clinicId: 'clinic-4',
    image: '/images/doctors/doctor-4.jpg',
  },
  {
    id: 'doc-5',
    name: 'د. خالد محمود',
    specialty: 'spec-5',
    clinicId: 'clinic-5',
    image: '/images/doctors/doctor-5.jpg',
  },
];

export const mockClinics: Clinic[] = [
  { id: 'clinic-1', name: 'عيادة الطب العام', color: 'blue' },
  { id: 'clinic-2', name: 'عيادة الأسنان', color: 'green' },
  { id: 'clinic-3', name: 'عيادة الجلدية', color: 'purple' },
  { id: 'clinic-4', name: 'عيادة العيون', color: 'amber' },
  { id: 'clinic-5', name: 'عيادة الباطنية', color: 'blue' },
];
