'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  Heart,
  Droplets,
  TrendingUp,
  HeartPulse,
} from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Add this import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/common/form';
import { formatDate } from '@/utils/dateTimeUtils';
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormSetValue,
} from 'react-hook-form';
import { ProfileFormValues } from '@/app/patient-portal/profile/validation';

interface HealthIndicatorsCardProps {
  healthIndicators: {
    bloodPressure: {
      systolic: number;
      diastolic: number;
      status: string;
      lastUpdated: string;
      trend: string;
    };
    heartRate: {
      value: number;
      status: string;
      lastUpdated: string;
      trend: string;
    };
    bloodSugar: {
      value: number;
      status: string;
      lastUpdated: string;
      trend: string;
    };
    weight: {
      value: number;
      change: number;
      lastUpdated: string;
      trend: string;
    };
    cholesterol: {
      total: number;
      hdl: number;
      ldl: number;
      status: string;
      trend: string;
      lastUpdated: string;
    };
  };
  variants: any;
  isEditing: boolean;
  formData?: ProfileFormValues;
  // React Hook Form props
  register?: UseFormRegister<ProfileFormValues>;
  errors?: FieldErrors<ProfileFormValues>;
  control?: Control<ProfileFormValues>;
  setValue?: UseFormSetValue<ProfileFormValues>;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function HealthIndicatorsCard({
  healthIndicators,
  variants,
  isEditing,
  formData,
  register,
  errors,
  control,
  setValue,
  onInputChange,
}: HealthIndicatorsCardProps) {
  const { t } = useTranslation(); // Add this hook

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="flex items-center text-lg">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              {t('patientPortal.profile.healthIndicators.title')}
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-sm">
            {t('patientPortal.profile.healthIndicators.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {/* Blood pressure */}
            <div className="rounded-lg border p-4 bg-card/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/50">
                    <Heart className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <h4 className="font-medium">{t('patientPortal.profile.healthIndicators.bloodPressure.title')}</h4>
                </div>

                <Badge
                  variant={
                    healthIndicators.bloodPressure.status === 'normal'
                      ? 'outline'
                      : healthIndicators.bloodPressure.status === 'elevated'
                      ? 'secondary'
                      : 'destructive'
                  }
                  className="text-xs"
                >
                  {healthIndicators.bloodPressure.status === 'normal'
                    ? t('patientPortal.profile.healthIndicators.bloodPressure.normal')
                    : healthIndicators.bloodPressure.status === 'elevated'
                    ? t('patientPortal.profile.healthIndicators.bloodPressure.elevated')
                    : t('patientPortal.profile.healthIndicators.bloodPressure.high')}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        {...(register
                          ? register('bloodPressureSystolic', {
                              valueAsNumber: true,
                            })
                          : {})}
                        className={`w-20 h-8 text-center ${
                          errors?.bloodPressureSystolic ? 'border-red-500' : ''
                        }`}
                      />
                      <span>/</span>
                      <Input
                        type="number"
                        {...(register
                          ? register('bloodPressureDiastolic', {
                              valueAsNumber: true,
                            })
                          : {})}
                        className={`w-20 h-8 text-center ${
                          errors?.bloodPressureDiastolic ? 'border-red-500' : ''
                        }`}
                      />
                      <span className="text-xs text-muted-foreground">
                        mmHg
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="font-bold text-xl">
                        {healthIndicators.bloodPressure.systolic}/
                        {healthIndicators.bloodPressure.diastolic}
                      </span>{' '}
                      <span className="text-xs text-muted-foreground">
                        mmHg
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(healthIndicators.bloodPressure.lastUpdated)}
                  </span>
                  {healthIndicators.bloodPressure.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-destructive" />
                  ) : healthIndicators.bloodPressure.trend === 'down' ? (
                    <TrendingUp className="h-3 w-3 text-green-500 transform rotate-180" />
                  ) : null}
                </div>
              </div>
              {(errors?.bloodPressureSystolic ||
                errors?.bloodPressureDiastolic) &&
                isEditing && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors?.bloodPressureSystolic?.message ||
                      errors?.bloodPressureDiastolic?.message}
                  </p>
                )}
            </div>

            {/* Heart rate */}
            <div className="rounded-lg border p-4 bg-card/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-pink-100 p-2 dark:bg-pink-900/50">
                    <HeartPulse className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h4 className="font-medium">{t('patientPortal.profile.healthIndicators.heartRate.title')}</h4>
                </div>
                <Badge
                  variant={
                    healthIndicators.heartRate.status === 'normal'
                      ? 'outline'
                      : healthIndicators.heartRate.status === 'elevated'
                      ? 'secondary'
                      : 'destructive'
                  }
                  className="text-xs"
                >
                  {healthIndicators.heartRate.status === 'normal'
                    ? t('patientPortal.profile.healthIndicators.heartRate.normal')
                    : healthIndicators.heartRate.status === 'elevated'
                    ? t('patientPortal.profile.healthIndicators.heartRate.elevated')
                    : t('patientPortal.profile.healthIndicators.heartRate.high')}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        {...(register
                          ? register('heartRateValue', { valueAsNumber: true })
                          : {})}
                        className={`w-20 h-8 text-center ${
                          errors?.heartRateValue ? 'border-red-500' : ''
                        }`}
                      />
                      <span className="text-xs text-muted-foreground">BPM</span>
                    </div>
                  ) : (
                    <>
                      <span className="font-bold text-xl">
                        {healthIndicators.heartRate.value}
                      </span>{' '}
                      <span className="text-xs text-muted-foreground">BPM</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(healthIndicators.heartRate.lastUpdated)}
                  </span>
                  {healthIndicators.heartRate.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-destructive" />
                  ) : healthIndicators.heartRate.trend === 'down' ? (
                    <TrendingUp className="h-3 w-3 text-green-500 transform rotate-180" />
                  ) : null}
                </div>
              </div>
              {errors?.heartRateValue && isEditing && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.heartRateValue.message}
                </p>
              )}
            </div>

            {/* Blood sugar */}
            <div className="rounded-lg border p-4 bg-card/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/50">
                    <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-medium">{t('patientPortal.profile.healthIndicators.bloodSugar.title')}</h4>
                </div>
                <Badge
                  variant={
                    healthIndicators.bloodSugar.status === 'normal'
                      ? 'outline'
                      : healthIndicators.bloodSugar.status === 'elevated'
                      ? 'secondary'
                      : 'destructive'
                  }
                  className="text-xs"
                >
                  {healthIndicators.bloodSugar.status === 'normal'
                    ? t('patientPortal.profile.healthIndicators.bloodSugar.normal')
                    : healthIndicators.bloodSugar.status === 'elevated'
                    ? t('patientPortal.profile.healthIndicators.bloodSugar.elevated')
                    : t('patientPortal.profile.healthIndicators.bloodSugar.high')}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        {...(register
                          ? register('bloodSugarValue', { valueAsNumber: true })
                          : {})}
                        className={`w-20 h-8 text-center ${
                          errors?.bloodSugarValue ? 'border-red-500' : ''
                        }`}
                      />
                      <span className="text-xs text-muted-foreground">
                        mg/dL
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="font-bold text-xl">
                        {healthIndicators.bloodSugar.value}
                      </span>{' '}
                      <span className="text-xs text-muted-foreground">
                        mg/dL
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(healthIndicators.bloodSugar.lastUpdated)}
                  </span>
                  {healthIndicators.bloodSugar.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-destructive" />
                  ) : healthIndicators.bloodSugar.trend === 'down' ? (
                    <TrendingUp className="h-3 w-3 text-green-500 transform rotate-180" />
                  ) : null}
                </div>
              </div>
              {errors?.bloodSugarValue && isEditing && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.bloodSugarValue.message}
                </p>
              )}
            </div>

            {/* Cholesterol */}
            <div className="rounded-lg border p-4 bg-card/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/50">
                    <Activity className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h4 className="font-medium">{t('patientPortal.profile.healthIndicators.cholesterol.title')}</h4>
                </div>
                <Badge
                  variant={
                    healthIndicators.cholesterol.status === 'normal'
                      ? 'outline'
                      : healthIndicators.cholesterol.status === 'elevated'
                      ? 'secondary'
                      : 'destructive'
                  }
                  className="text-xs"
                >
                  {healthIndicators.cholesterol.status === 'normal'
                    ? t('patientPortal.profile.healthIndicators.cholesterol.normal')
                    : healthIndicators.cholesterol.status === 'elevated'
                    ? t('patientPortal.profile.healthIndicators.cholesterol.elevated')
                    : t('patientPortal.profile.healthIndicators.cholesterol.high')}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {t('patientPortal.profile.healthIndicators.cholesterol.total')}:
                    </span>
                    {isEditing ? (
                      <Input
                        type="number"
                        {...(register
                          ? register('cholesterolTotal', {
                              valueAsNumber: true,
                            })
                          : {})}
                        className={`w-20 h-7 text-center ${
                          errors?.cholesterolTotal ? 'border-red-500' : ''
                        }`}
                      />
                    ) : (
                      <span>{healthIndicators.cholesterol.total}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">HDL:</span>
                    {isEditing ? (
                      <Input
                        type="number"
                        {...(register
                          ? register('cholesterolHDL', { valueAsNumber: true })
                          : {})}
                        className={`w-20 h-7 text-center ${
                          errors?.cholesterolHDL ? 'border-red-500' : ''
                        }`}
                      />
                    ) : (
                      <span>{healthIndicators.cholesterol.hdl}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">LDL:</span>
                    {isEditing ? (
                      <Input
                        type="number"
                        {...(register
                          ? register('cholesterolLDL', { valueAsNumber: true })
                          : {})}
                        className={`w-20 h-7 text-center ${
                          errors?.cholesterolLDL ? 'border-red-500' : ''
                        }`}
                      />
                    ) : (
                      <span>{healthIndicators.cholesterol.ldl}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {formatDate(healthIndicators.cholesterol.lastUpdated)}
                  </span>
                  <span className="text-muted-foreground">mg/dL</span>
                </div>
              </div>
              {(errors?.cholesterolTotal ||
                errors?.cholesterolHDL ||
                errors?.cholesterolLDL) &&
                isEditing && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors?.cholesterolTotal?.message ||
                      errors?.cholesterolHDL?.message ||
                      errors?.cholesterolLDL?.message}
                  </p>
                )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
