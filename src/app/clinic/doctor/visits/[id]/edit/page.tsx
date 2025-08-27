'use client';
import { FC } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import VisitForm from '@/components/doctor/visits/components/VisitForm';
import { useParams } from 'next/navigation';

const EditVisitPage: FC = () => {
  const params = useParams();
  const visitId = params?.id as string;

  return (
    <PageLayout>
      <VisitForm visitId={visitId} />
    </PageLayout>
  );
};

export default EditVisitPage;
