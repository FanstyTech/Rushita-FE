'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import ClinicForm from '../../add/ClinicForm';
import PageLayout from '@/components/layouts/PageLayout';
import { useClinic } from '@/lib/api/hooks/useClinic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function EditClinicPage() {
  const params = useParams();
  const clinicId = params.id as string;
  const { useClinicForEdit } = useClinic();

  const { data: clinic, isLoading } = useClinicForEdit(clinicId);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </PageLayout>
    );
  }

  if (!clinic) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Clinic not found</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <ClinicForm initialData={clinic} />
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
}
