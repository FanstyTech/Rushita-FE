'use client';

import { motion } from 'framer-motion';
import { Phone, User } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Add this import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input, Select } from '@/components/common/form';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProfileFormValues } from '@/app/patient-portal/profile/validation';
import {
  EmergencyContactDto,
  Relationship,
} from '@/lib/api/types/clinic-patient';
import { getRelationshipLabel } from '@/utils/textUtils';

interface EmergencyContactCardProps {
  emergencyContact: EmergencyContactDto;
  isEditing: boolean;
  formData: ProfileFormValues;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variants: any;
  // React Hook Form props
  register: UseFormRegister<ProfileFormValues>;
  errors?: FieldErrors<ProfileFormValues>;
}

export function EmergencyContactCard({
  emergencyContact,
  isEditing,
  formData,
  variants,
  register,
  errors,
}: EmergencyContactCardProps) {
  const { t } = useTranslation(); // Add this hook

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="flex items-center text-lg">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              {t('patientPortal.profile.emergencyContact.title')}
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-sm">
            {t('patientPortal.profile.emergencyContact.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {isEditing ? (
            <div className="grid gap-4 md:grid-cols-3">
              <Input
                label={t('patientPortal.profile.emergencyContact.name')}
                {...register('emergencyContactName')}
              />

              <Select
                label={t('patientPortal.profile.emergencyContact.relation')}
                value={formData?.emergencyContactRelation?.toString()}
                error={errors?.emergencyContactRelation?.message}
                {...register('emergencyContactRelation', {
                  valueAsNumber: true,
                })}
                options={Object.entries(Relationship)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: key,
                  }))}
              />

              <Input
                label={t('patientPortal.profile.emergencyContact.phone')}
                {...register('emergencyContactPhone')}
              />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.emergencyContact.name')}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">{emergencyContact.name}</span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.emergencyContact.relation')}
                </div>
                <span className="font-medium">
                  {emergencyContact.relationship &&
                    getRelationshipLabel(emergencyContact.relationship)}
                </span>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.emergencyContact.phone')}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary/70" />
                  <span dir="ltr" className="font-medium">
                    {emergencyContact.phone}
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
