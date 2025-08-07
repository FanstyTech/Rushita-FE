'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Building } from 'lucide-react';

interface Clinic {
  id: string;
  name: string;
  color: string;
}

interface ClinicSelectionProps {
  clinics: Clinic[];
  selectedClinic: string | null;
  onClinicSelect: (clinicId: string) => void;
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

export function ClinicSelection({ clinics, selectedClinic, onClinicSelect }: ClinicSelectionProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold">اختر العيادة</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {clinics.map((clinic) => (
          <motion.div key={clinic.id} variants={itemVariants}>
            <Card
              className={cn(
                'cursor-pointer transition-all duration-200 hover:shadow-md',
                selectedClinic === clinic.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border/50 bg-card/80',
                clinic.color === 'blue' &&
                  'hover:border-blue-400/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20',
                clinic.color === 'purple' &&
                  'hover:border-purple-400/50 hover:bg-purple-50/50 dark:hover:bg-purple-950/20',
                clinic.color === 'green' &&
                  'hover:border-green-400/50 hover:bg-green-50/50 dark:hover:bg-green-950/20',
                clinic.color === 'amber' &&
                  'hover:border-amber-400/50 hover:bg-amber-50/50 dark:hover:bg-amber-950/20'
              )}
              onClick={() => onClinicSelect(clinic.id)}
            >
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <div
                  className={cn(
                    'rounded-full p-3 mb-3',
                    clinic.color === 'blue' &&
                      'bg-blue-100 dark:bg-blue-900/50',
                    clinic.color === 'purple' &&
                      'bg-purple-100 dark:bg-purple-900/50',
                    clinic.color === 'green' &&
                      'bg-green-100 dark:bg-green-900/50',
                    clinic.color === 'amber' &&
                      'bg-amber-100 dark:bg-amber-900/50'
                  )}
                >
                  <Building
                    className={cn(
                      'h-8 w-8',
                      clinic.color === 'blue' &&
                        'text-blue-600 dark:text-blue-400',
                      clinic.color === 'purple' &&
                        'text-purple-600 dark:text-purple-400',
                      clinic.color === 'green' &&
                        'text-green-600 dark:text-green-400',
                      clinic.color === 'amber' &&
                        'text-amber-600 dark:text-amber-400'
                    )}
                  />
                </div>
                <h3 className="font-medium">{clinic.name}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
