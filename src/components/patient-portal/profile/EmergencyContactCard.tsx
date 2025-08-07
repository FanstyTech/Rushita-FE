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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/common/form';
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormSetValue,
} from 'react-hook-form';
import { ProfileFormValues } from '@/app/patient-portal/profile/validation';

interface EmergencyContactCardProps {
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
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

export function EmergencyContactCard({
  emergencyContact,
  isEditing,
  formData,
  onInputChange,
  variants,
  register,
  errors,
  control,
  setValue,
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
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">{t('patientPortal.profile.emergencyContact.name')}</Label>
                <Input
                  id="emergencyContactName"
                  {...(register
                    ? register('emergencyContactName')
                    : {
                        name: 'emergencyContactName',
                        value: formData.emergencyContactName,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.emergencyContactName ? 'border-red-500' : ''
                  }`}
                />
                {errors?.emergencyContactName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emergencyContactName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelation">{t('patientPortal.profile.emergencyContact.relation')}</Label>
                <Input
                  id="emergencyContactRelation"
                  {...(register
                    ? register('emergencyContactRelation')
                    : {
                        name: 'emergencyContactRelation',
                        value: formData.emergencyContactRelation,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.emergencyContactRelation ? 'border-red-500' : ''
                  }`}
                />
                {errors?.emergencyContactRelation && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emergencyContactRelation.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">{t('patientPortal.profile.emergencyContact.phone')}</Label>
                <Input
                  id="emergencyContactPhone"
                  {...(register
                    ? register('emergencyContactPhone')
                    : {
                        name: 'emergencyContactPhone',
                        value: formData.emergencyContactPhone,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.emergencyContactPhone ? 'border-red-500' : ''
                  }`}
                />
                {errors?.emergencyContactPhone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emergencyContactPhone.message}
                  </p>
                )}
              </div>
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
                <span className="font-medium">{emergencyContact.relation}</span>
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
