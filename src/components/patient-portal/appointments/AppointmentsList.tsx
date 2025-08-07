'use client';

import { motion } from 'framer-motion';
import Skeleton from '@/components/ui/Skeleton';
import { AppointmentCard } from './AppointmentCard';
import { EmptyState } from './EmptyState';
import { Appointment } from './types';

interface AppointmentsListProps {
  appointments: Appointment[];
  isLoading: boolean;
  activeTab: string;
  isEditing: boolean;
  editingAppointmentId: string | null;
  formData: any;
  onCancel: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  getStatusBadge: (status: string) => any;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

export function AppointmentsList({
  appointments,
  isLoading,
  activeTab,
  isEditing,
  editingAppointmentId,
  formData,
  onCancel,
  onInputChange,
  onSelectChange,
  getStatusBadge,
}: AppointmentsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
    );
  }

  if (appointments.length === 0) {
    return <EmptyState activeTab={activeTab} />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          isEditing={isEditing}
          editingAppointmentId={editingAppointmentId}
          formData={formData}
          onCancel={onCancel}
          onInputChange={onInputChange}
          onSelectChange={onSelectChange}
          getStatusBadge={getStatusBadge}
          variants={itemVariants}
        />
      ))}
    </motion.div>
  );
}
