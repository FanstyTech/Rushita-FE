'use client';

import { motion } from 'framer-motion';
import {
  HeartPulse,
  Droplets,
  Activity,
  Ruler,
  Scale,
  AlertCircle,
  Stethoscope,
} from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Add this import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input, Select } from '@/components/common/form';
import { Badge } from '@/components/ui/badge';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProfileFormValues } from '@/app/patient-portal/profile/validation';
import {
  BloodType,
  MedicalInformationDto,
} from '@/lib/api/types/clinic-patient';
import { getBloodTypeLabel, getBMICategoryLabel } from '@/utils/textUtils';

interface MedicalInformationCardProps {
  patientData: MedicalInformationDto;
  isEditing: boolean;
  formData: ProfileFormValues;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variants: any;
  // React Hook Form props
  register: UseFormRegister<ProfileFormValues>;
  errors?: FieldErrors<ProfileFormValues>;
}

export function MedicalInformationCard({
  patientData,
  isEditing,
  formData,
  onInputChange,
  variants,
  register,
  errors,
}: MedicalInformationCardProps) {
  const { t } = useTranslation(); // Add this hook

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="flex items-center text-lg">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <HeartPulse className="h-4 w-4 text-primary" />
              </div>
              {t('patientPortal.profile.medicalInfo.title')}
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-sm">
            {t('patientPortal.profile.medicalInfo.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {isEditing ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Select
                label={t('patientPortal.profile.medicalInfo.bloodType')}
                value={formData?.bloodType?.toString()}
                error={errors?.bloodType?.message}
                {...register('bloodType', {
                  valueAsNumber: true,
                })}
                options={Object.entries(BloodType)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: key,
                  }))}
              />

              <Input
                label={
                  t('patientPortal.profile.medicalInfo.height') +
                  ' (' +
                  t('patientPortal.profile.medicalInfo.cm') +
                  ')'
                }
                type="number"
                error={errors?.height?.message}
                {...register('height', {
                  valueAsNumber: true,
                })}
              />

              <Input
                label={
                  t('patientPortal.profile.medicalInfo.weight') +
                  ' (' +
                  t('patientPortal.profile.medicalInfo.kg') +
                  ')'
                }
                type="number"
                error={errors?.weight?.message}
                {...register('weight', {
                  valueAsNumber: true,
                })}
              />

              <Input
                label={t('patientPortal.profile.medicalInfo.allergies')}
                {...register('allergies')}
                error={errors?.allergies?.message}
              />

              <Input
                label={t('patientPortal.profile.medicalInfo.chronicDiseases')}
                {...register('chronicDiseases')}
                error={errors?.chronicDiseases?.message}
              />
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.medicalInfo.bloodType')}
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">
                    {patientData.bloodType &&
                      getBloodTypeLabel(patientData.bloodType)}
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.medicalInfo.bmi')}
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">
                    {patientData.bmiValue?.toFixed(1)}
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {patientData.bmiCategory &&
                      getBMICategoryLabel(patientData.bmiCategory)}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.medicalInfo.height')}
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">
                    {patientData.height}{' '}
                    {t('patientPortal.profile.medicalInfo.cm')}
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.medicalInfo.weight')}
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">
                    {patientData.weight}{' '}
                    {t('patientPortal.profile.medicalInfo.kg')}
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.medicalInfo.allergies')}
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-primary/70 mt-0.5" />
                  <span className="font-medium">
                    {patientData.allergies?.map((a) => a.name).join(', ') ||
                      t('patientPortal.profile.medicalInfo.noAllergies')}
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.medicalInfo.chronicDiseases')}
                </div>
                <div className="flex items-start gap-2">
                  <Stethoscope className="h-4 w-4 text-primary/70 mt-0.5" />
                  <span className="font-medium">
                    {patientData.medicalConditions
                      ?.map((c) => c.name)
                      .join(', ') ||
                      t('patientPortal.profile.medicalInfo.noChronicDiseases')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
