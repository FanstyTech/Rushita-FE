'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import { PatientFormData } from '../validation';
import PatientForm from '@/components/clinic/patients/PatientForm';
import PageLayout from '@/components/layouts/PageLayout';
import { CreateUpdateClinicPatientDto } from '@/lib/api/types/clinic-patient';

export default function PatientActionPage() {
  const router = useRouter();

  const { createOrUpdatePatient } = useClinicPatients();

  const handleSubmit = async (data: PatientFormData) => {
    try {
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
        bloodType: data.bloodType || undefined,
        height: data.height || undefined,
        weight: data.weight || undefined,
      };

      await createOrUpdatePatient.mutateAsync(formattedData);

      router.push('/clinic/patients');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
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

      <div className="bg-white rounded-xl shadow-sm p-6">
        <PatientForm
          onSubmit={handleSubmit}
          isSubmitting={createOrUpdatePatient.isPending}
        />
      </div>
    </PageLayout>
  );
}
