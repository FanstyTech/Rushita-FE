'use client';

import { motion, Variants } from 'framer-motion';
import { Pill } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Add this import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/common/form';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProfileFormValues } from '@/app/patient-portal/profile/validation';

interface MedicationHistoryCardProps {
  medications: string;
  isEditing: boolean;
  formData: ProfileFormValues;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variants: Variants;
  // React Hook Form props
  register?: UseFormRegister<ProfileFormValues>;
  errors?: FieldErrors<ProfileFormValues>;
}

export function MedicationHistoryCard({
  medications,
  isEditing,
  formData,
  onInputChange,
  variants,
  register,
  errors,
}: MedicationHistoryCardProps) {
  const { t } = useTranslation(); // Add this hook

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="flex items-center text-lg">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Pill className="h-4 w-4 text-primary" />
              </div>
              {t('patientPortal.profile.medicationHistory.title')}
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-sm">
            {t('patientPortal.profile.medicationHistory.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {isEditing ? (
            <div className="space-y-2">
              <Label htmlFor="medications">
                {t(
                  'patientPortal.profile.medicationHistory.currentMedications'
                )}
              </Label>
              <Input
                id="medications"
                {...(register
                  ? register('medications')
                  : {
                      name: 'medications',
                      value: formData.medications,
                      onChange: onInputChange,
                    })}
                className={`border-border/50 focus-visible:ring-primary/20 ${
                  errors?.medications ? 'border-red-500' : ''
                }`}
              />
              {errors?.medications && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.medications.message}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
              <div className="text-sm font-medium text-muted-foreground">
                {t(
                  'patientPortal.profile.medicationHistory.currentMedications'
                )}
              </div>
              <div className="flex items-start gap-2">
                <Pill className="h-4 w-4 text-primary/70 mt-0.5" />
                <span className="font-medium">
                  {medications ||
                    t(
                      'patientPortal.profile.medicationHistory.noCurrentMedications'
                    )}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
