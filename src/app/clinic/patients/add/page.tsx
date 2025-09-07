'use client';

import { useRouter } from 'next/navigation';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import { PatientFormData } from '../validation';
import PatientForm from '@/components/clinic/patients/PatientForm';
import PageLayout from '@/components/layouts/PageLayout';
import { CreateUpdateClinicPatientDto } from '@/lib/api/types/clinic-patient';
import { toast } from '@/components/ui/Toast';
import { useTranslation } from 'react-i18next';

export default function PatientActionPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const { createOrUpdatePatient } = useClinicPatients();

  const handleSubmit = async (data: PatientFormData) => {
    // Validate required fields
    if (!data.fNameF) {
      toast.error(t('clinic.patients.form.validation.firstNameRequired'));
      return;
    }

    if (!data.phoneNumber) {
      toast.error(t('clinic.patients.form.validation.phoneRequired'));
      return;
    }

    if (!data.dateOfBirth) {
      toast.error(t('clinic.patients.form.validation.dateOfBirthRequired'));
      return;
    }

    const formattedData: CreateUpdateClinicPatientDto = {
      ...data,
      fNameL: data.fNameL || undefined,
      sNameF: data.sNameF || undefined,
      tNameF: data.tNameF || undefined,
      lNameF: data.lNameF || undefined,
      sNameL: data.sNameL || undefined,
      tNameL: data.tNameL || undefined,
      lNameL: data.lNameL || undefined,
      email: data.email || undefined,
      address: data.address || undefined,
      countryId: data.countryId || undefined,
      cityId: data.cityId || undefined,
      bloodType: Number(data.bloodType) || undefined,
      height: data.height || undefined,
      weight: data.weight || undefined,
      gender: Number(data.gender),
    };

    const result = await createOrUpdatePatient.mutateAsync(formattedData);

    if (result) {
      toast.success(t('clinic.patients.form.success.patientAdded'));
      router.push('/clinic/patients');
      router.refresh();
    }
  };

  return (
    <PageLayout>
      <PatientForm
        onSubmit={handleSubmit}
        isSubmitting={createOrUpdatePatient.isPending}
      />
    </PageLayout>
  );
}
