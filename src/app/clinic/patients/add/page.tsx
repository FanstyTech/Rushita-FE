'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import { PatientFormData } from '../validation';
import PatientForm from '@/components/clinic/patients/PatientForm';
import PageLayout from '@/components/layouts/PageLayout';
import { CreateUpdateClinicPatientDto } from '@/lib/api/types/clinic-patient';
import { toast } from '@/components/ui/Toast';

export default function PatientActionPage() {
  const router = useRouter();

  const { createOrUpdatePatient } = useClinicPatients();

  const handleSubmit = async (data: PatientFormData) => {
    // Validate required fields
    if (!data.fNameF) {
      toast.error('First name is required');
      return;
    }

    if (!data.phoneNumber) {
      toast.error('Phone number is required');
      return;
    }

    if (!data.dateOfBirth) {
      toast.error('Date of birth is required');
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
      router.push('/clinic/patients');
      router.refresh();
    }
  };

  return (
    <PageLayout>
      <div className="mb-6">
        <Link
          href="/clinic/patients"
          className="inline-flex items-center text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Patients
        </Link>
      </div>

      <PatientForm
        onSubmit={handleSubmit}
        isSubmitting={createOrUpdatePatient.isPending}
      />
    </PageLayout>
  );
}
