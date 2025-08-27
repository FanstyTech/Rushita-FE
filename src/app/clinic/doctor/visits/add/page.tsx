'use client';

import { useSearchParams } from 'next/navigation';
import PageLayout from '@/components/layouts/PageLayout';
import VisitForm from '@/components/doctor/visits/components/VisitForm';

export default function AddTreatmentPage() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('appointmentId');
  return (
    <PageLayout>
      <VisitForm appointmentId={appointmentId?.toString()} />
    </PageLayout>
  );
}
