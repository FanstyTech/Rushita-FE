'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinicId: string;
  image?: string;
}

interface Specialty {
  id: string;
  name: string;
}

interface Clinic {
  id: string;
  name: string;
}

interface DoctorSelectionProps {
  doctors: Doctor[];
  specialties: Specialty[];
  clinics: Clinic[];
  selectedDoctor: string | null;
  onDoctorSelect: (doctorId: string) => void;
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

export function DoctorSelection({ 
  doctors, 
  specialties, 
  clinics, 
  selectedDoctor, 
  onDoctorSelect, 
  onPrevStep 
}: DoctorSelectionProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold">اختر الطبيب</h2>
      {doctors.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <motion.div key={doctor.id} variants={itemVariants}>
              <Card
                className={cn(
                  'cursor-pointer transition-all duration-200 hover:shadow-md backdrop-blur-sm',
                  selectedDoctor === doctor.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border/50 bg-card/80'
                )}
                onClick={() => onDoctorSelect(doctor.id)}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center overflow-hidden">
                    <User className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {specialties.find((s) => s.id === doctor.specialty)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {clinics.find((c) => c.id === doctor.clinicId)?.name}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">
              لم يتم العثور على أطباء
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              لم يتم العثور على أطباء في هذا التخصص، يرجى اختيار تخصص آخر
            </p>
            <Button className="mt-4" onClick={onPrevStep}>
              العودة لاختيار التخصص
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
