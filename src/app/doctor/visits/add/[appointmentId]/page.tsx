'use client';

import { useParams } from 'next/navigation';
import PageLayout from '@/components/layouts/PageLayout';
import VisitForm from '@/components/doctor/visits/components/VisitForm';

export default function AddVisitWithAppointmentPage() {
  const params = useParams();
  const appointmentId = params.appointmentId as string;

  return (
    <PageLayout>
      <VisitForm appointmentId={appointmentId} />
    </PageLayout>
  );
}
