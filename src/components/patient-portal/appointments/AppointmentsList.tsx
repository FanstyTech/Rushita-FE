'use client';

import { motion } from 'framer-motion';
import Skeleton from '@/components/ui/Skeleton';
import { AppointmentCard } from './AppointmentCard';
import { EmptyState } from './EmptyState';
import { PatientPortalAppointmentsDto } from '@/lib/api/types/clinic-patient';

interface AppointmentsListProps {
  appointments: PatientPortalAppointmentsDto[];
  isLoading: boolean;
  activeTab: string;
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
          variants={itemVariants}
        />
      ))}
    </motion.div>
  );
}
