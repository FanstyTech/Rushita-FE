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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/common/form';
import { Badge } from '@/components/ui/badge';
import { calculateBMI, getBMICategory } from '@/utils/patientPortalUtils';
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormSetValue,
} from 'react-hook-form';
import { ProfileFormValues } from '@/app/patient-portal/profile/validation';

interface MedicalInformationCardProps {
  patientData: {
    bloodType: string;
    height: number;
    weight: number;
    allergies: string;
    chronicDiseases: string;
  };
  isEditing: boolean;
  formData: ProfileFormValues;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variants: any;
  // React Hook Form props
  register?: UseFormRegister<ProfileFormValues>;
  errors?: FieldErrors<ProfileFormValues>;
  control?: Control<ProfileFormValues>;
  setValue?: UseFormSetValue<ProfileFormValues>;
}

export function MedicalInformationCard({
  patientData,
  isEditing,
  formData,
  onInputChange,
  variants,
  register,
  errors,
  control,
  setValue,
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
              <div className="space-y-2">
                <Label htmlFor="bloodType">{t('patientPortal.profile.medicalInfo.bloodType')}</Label>
                <Input
                  id="bloodType"
                  {...(register
                    ? register('bloodType')
                    : {
                        name: 'bloodType',
                        value: formData.bloodType,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.bloodType ? 'border-red-500' : ''
                  }`}
                />
                {errors?.bloodType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bloodType.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">{t('patientPortal.profile.medicalInfo.height')} ({t('patientPortal.profile.medicalInfo.cm')})</Label>
                <Input
                  id="height"
                  type="number"
                  {...(register
                    ? register('height', { valueAsNumber: true })
                    : {
                        name: 'height',
                        value: formData.height,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.height ? 'border-red-500' : ''
                  }`}
                />
                {errors?.height && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.height.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">{t('patientPortal.profile.medicalInfo.weight')} ({t('patientPortal.profile.medicalInfo.kg')})</Label>
                <Input
                  id="weight"
                  type="number"
                  {...(register
                    ? register('weight', { valueAsNumber: true })
                    : {
                        name: 'weight',
                        value: formData.weight,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.weight ? 'border-red-500' : ''
                  }`}
                />
                {errors?.weight && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.weight.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">{t('patientPortal.profile.medicalInfo.allergies')}</Label>
                <Input
                  id="allergies"
                  {...(register
                    ? register('allergies')
                    : {
                        name: 'allergies',
                        value: formData.allergies,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.allergies ? 'border-red-500' : ''
                  }`}
                />
                {errors?.allergies && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.allergies.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="chronicDiseases">{t('patientPortal.profile.medicalInfo.chronicDiseases')}</Label>
                <Input
                  id="chronicDiseases"
                  {...(register
                    ? register('chronicDiseases')
                    : {
                        name: 'chronicDiseases',
                        value: formData.chronicDiseases,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.chronicDiseases ? 'border-red-500' : ''
                  }`}
                />
                {errors?.chronicDiseases && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.chronicDiseases.message}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.medicalInfo.bloodType')}
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">{patientData.bloodType}</span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.medicalInfo.bmi')}
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">
                    {calculateBMI(
                      patientData.height,
                      patientData.weight
                    ).toFixed(1)}
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {getBMICategory(
                      calculateBMI(patientData.height, patientData.weight)
                    )}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.medicalInfo.height')}
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">{patientData.height} {t('patientPortal.profile.medicalInfo.cm')}</span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.medicalInfo.weight')}
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">{patientData.weight} {t('patientPortal.profile.medicalInfo.kg')}</span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.medicalInfo.allergies')}
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-primary/70 mt-0.5" />
                  <span className="font-medium">
                    {patientData.allergies || t('patientPortal.profile.medicalInfo.noAllergies')}
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
                    {patientData.chronicDiseases || t('patientPortal.profile.medicalInfo.noChronicDiseases')}
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
