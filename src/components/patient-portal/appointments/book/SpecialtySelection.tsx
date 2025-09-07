'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stethoscope } from 'lucide-react';
import { SelectOption } from '@/lib/api/types/select-option';
import { useTranslation } from 'react-i18next';

interface SpecialtySelectionProps {
  specialties: SelectOption<string>[];
  selectedSpecialty: SelectOption | null;
  onSpecialtySelect: (specialty: SelectOption) => void;
  onPrevStep: () => void;
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

export function SpecialtySelection({
  specialties,
  selectedSpecialty,
  onSpecialtySelect,
  onPrevStep,
}: SpecialtySelectionProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold">{t('patientPortal.appointments.booking.specialtySelection.title')}</h2>
      {specialties.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {specialties.map((specialty) => (
            <motion.div key={specialty.value} variants={itemVariants}>
              <Card
                className={cn(
                  'cursor-pointer transition-all duration-200 hover:shadow-md backdrop-blur-sm',
                  selectedSpecialty?.value === specialty.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border/50 bg-card/80'
                )}
                onClick={() => onSpecialtySelect(specialty)}
              >
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  <div className="rounded-full p-3 mb-3 bg-green-100 dark:bg-green-900/50">
                    <Stethoscope className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium">{specialty.label}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Stethoscope className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">
              {t('patientPortal.appointments.booking.specialtySelection.emptyState.title')}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('patientPortal.appointments.booking.specialtySelection.emptyState.message')}
            </p>
            <Button className="mt-4" onClick={onPrevStep}>
              {t('patientPortal.appointments.booking.specialtySelection.emptyState.backButton')}
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
