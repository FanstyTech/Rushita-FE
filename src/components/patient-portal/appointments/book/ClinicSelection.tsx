'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Building } from 'lucide-react';
import { SelectOption } from '@/lib/api/types/select-option';
import Avatar from '@/components/common/Avatar';
import { backgroundColor } from '@/utils/textUtils';

interface ClinicSelectionProps {
  clinics: SelectOption<string>[];
  selectedClinic: SelectOption | null;
  onClinicSelect: (clinic: SelectOption) => void;
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
          <motion.div key={clinic.value} variants={itemVariants}>
            <Card
              className={cn(
                'cursor-pointer transition-all duration-200 hover:shadow-md',
                selectedClinic?.value === clinic.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border/50 bg-card/80'
              )}
              onClick={() => onClinicSelect(clinic)}
            >
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
