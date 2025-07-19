'use client';

import { PatientFormData } from '@/app/clinic/patients/validation';
import Modal from '@/components/common/Modal';
import PatientForm from './PatientForm';

interface PatientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PatientFormData) => void;
  isSubmitting?: boolean;
  initialData?: Partial<PatientFormData>;
  title?: string;
}

export default function PatientFormModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  initialData,
  title = 'Add Patient',
}: PatientFormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="7xl">
      <PatientForm
        onSubmit={(data) => {
          onSubmit(data);
        }}
        isSubmitting={isSubmitting}
        initialData={initialData}
      />
    </Modal>
  );
}
