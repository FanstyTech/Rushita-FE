'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import Avatar from '@/components/common/Avatar';
import { GetClinicsForDropdownDto } from '@/lib/api/types/clinic';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

interface ClinicSelectionProps {
  clinics: GetClinicsForDropdownDto[];
  selectedClinic: GetClinicsForDropdownDto | null;
  onClinicSelect: (clinic: GetClinicsForDropdownDto) => void;
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
  show: { opacity: 1, y: 0 },
};

export function ClinicSelection({
  clinics,
  selectedClinic,
  onClinicSelect,
}: ClinicSelectionProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold">{t('patientPortal.appointments.booking.clinicSelection.title')}</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {clinics.map((clinic) => (
          <motion.div key={clinic.value} variants={itemVariants}>
            <Card
              className={cn(
                'cursor-pointer transition-all duration-200 hover:shadow-md relative',
                selectedClinic?.value === clinic.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border/50 bg-card/80'
              )}
              onClick={() => onClinicSelect(clinic)}
            >
              {/* Booking Tag */}
              {clinic.hasBookings && (
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge
                    variant="default"
                    className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-sm"
                  >
                    {t('patientPortal.appointments.booking.clinicSelection.previousBookingsTag')}
                  </Badge>
                </div>
              )}

              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <Avatar
                  name={clinic.label || ''}
                  size="lg"
                  className="w-16 h-16 rounded-xl border-2 border-gray-100"
                />

                <h3 className="font-medium mt-3">{clinic.label}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
