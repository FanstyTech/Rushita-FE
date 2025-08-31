'use client';

import { motion, Variants } from 'framer-motion';
import {
  ShieldCheck,
  Building2,
  FileText,
  Calendar,
  Shield,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
import { formatDate } from '@/utils/dateTimeUtils';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProfileFormValues } from '@/app/patient-portal/profile/validation';

interface InsuranceInformationCardProps {
  insuranceInfo: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
    coverageType: string;
  };
  isEditing: boolean;
  formData: ProfileFormValues;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variants: Variants;
  // React Hook Form props
  register?: UseFormRegister<ProfileFormValues>;
  errors?: FieldErrors<ProfileFormValues>;
}

export function InsuranceInformationCard({
  insuranceInfo,
  isEditing,
  formData,
  onInputChange,
  variants,
  register,
  errors,
}: InsuranceInformationCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="flex items-center text-lg">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <ShieldCheck className="h-4 w-4 text-primary" />
              </div>
              {t('patientPortal.profile.insurance.title')}
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-sm">
            {t('patientPortal.profile.insurance.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {isEditing ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider">
                  {t('patientPortal.profile.insurance.provider')}
                </Label>
                <Input
                  id="insuranceProvider"
                  {...(register
                    ? register('insuranceProvider')
                    : {
                        name: 'insuranceProvider',
                        value: formData.insuranceProvider,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.insuranceProvider ? 'border-red-500' : ''
                  }`}
                />
                {errors?.insuranceProvider && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.insuranceProvider.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurancePolicyNumber">
                  {t('patientPortal.profile.insurance.policyNumber')}
                </Label>
                <Input
                  id="insurancePolicyNumber"
                  {...(register
                    ? register('insurancePolicyNumber')
                    : {
                        name: 'insurancePolicyNumber',
                        value: formData.insurancePolicyNumber,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.insurancePolicyNumber ? 'border-red-500' : ''
                  }`}
                />
                {errors?.insurancePolicyNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.insurancePolicyNumber.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="insuranceExpiryDate">
                  {t('patientPortal.profile.insurance.expiryDate')}
                </Label>
                <Input
                  id="insuranceExpiryDate"
                  type="date"
                  {...(register
                    ? register('insuranceExpiryDate')
                    : {
                        name: 'insuranceExpiryDate',
                        value: formData.insuranceExpiryDate,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.insuranceExpiryDate ? 'border-red-500' : ''
                  }`}
                />
                {errors?.insuranceExpiryDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.insuranceExpiryDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="insuranceCoverage">
                  {t('patientPortal.profile.insurance.coverageType')}
                </Label>
                <Input
                  id="insuranceCoverage"
                  {...(register
                    ? register('insuranceCoverage')
                    : {
                        name: 'insuranceCoverage',
                        value: formData.insuranceCoverage,
                        onChange: onInputChange,
                      })}
                  className={`border-border/50 focus-visible:ring-primary/20 ${
                    errors?.insuranceCoverage ? 'border-red-500' : ''
                  }`}
                />
                {errors?.insuranceCoverage && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.insuranceCoverage.message}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.insurance.provider')}
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">{insuranceInfo.provider}</span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.insurance.policyNumber')}
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary/70" />
                  <span dir="ltr" className="font-medium">
                    {insuranceInfo.policyNumber}
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.insurance.expiryDate')}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">
                    {formatDate(insuranceInfo.expiryDate)}
                  </span>
                  {new Date(insuranceInfo.expiryDate) < new Date() ? (
                    <Badge variant="destructive" className="text-xs">
                      {t('patientPortal.profile.insurance.expired')}
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-green-500/10 text-green-600 border-green-200/50 text-xs"
                    >
                      {t('patientPortal.profile.insurance.active')}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">
                  {t('patientPortal.profile.insurance.coverageType')}
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">
                    {insuranceInfo.coverageType}
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
