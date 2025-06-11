'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import { PatientFormData } from '../../validation';
import PatientForm from '@/components/clinic/patients/PatientForm';
import PageLayout from '@/components/layouts/PageLayout';
import { CreateUpdateClinicPatientDto } from '@/lib/api/types/clinic-patient';

export default function EditPatientPage() {
  const router = useRouter();
  const { id } = useParams();

  const { usePatientForEdit, createOrUpdatePatient } = useClinicPatients();
  const { data: patient } = usePatientForEdit(id as string);

  const handleSubmit = async (data: PatientFormData) => {
    try {
      const formattedData: CreateUpdateClinicPatientDto = {
        ...data,
        id: id as string,
        email: data.email || undefined,
        sNameF: data.sNameF || undefined,
        tNameF: data.tNameF || undefined,
        lNameF: data.lNameF || undefined,
        sNameL: data.sNameL || undefined,
        tNameL: data.tNameL || undefined,
        lNameL: data.lNameL || undefined,
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
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Patients
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <PatientForm
          onSubmit={handleSubmit}
          isSubmitting={createOrUpdatePatient.isPending}
          initialData={patient || undefined}
        />
      </div>
    </PageLayout>
  );
}
