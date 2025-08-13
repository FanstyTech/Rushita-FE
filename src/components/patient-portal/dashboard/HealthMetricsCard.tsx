'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Activity,
  Heart,
  Droplets,
  Scale,
  Zap,
  TrendingUp,
  Star,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/dateTimeUtils';
import { calculateBMI, getBMICategory } from '../profile';
import {
  BMICategory,
  MetricStatus,
  PatientPortalDashboardDto,
} from '@/lib/api/types/clinic-patient';
import {
  getBMICategoryClass,
  getBMICategoryLabel,
  getMetricStatusClass,
  getMetricStatusLabel,
} from '@/utils/textUtils';

interface HealthMetricsCardProps {
  metrics: PatientPortalDashboardDto;
  variants: any;
}

export function HealthMetricsCard({
  metrics,
  variants,
}: HealthMetricsCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardHeader className="p-6">
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 text-primary mr-2" />
            {t('patientPortal.dashboard.healthMetrics.title')}
          </CardTitle>
          <CardDescription>
            {t('patientPortal.dashboard.healthMetrics.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Blood pressure */}
            <div className="rounded-lg border p-4 bg-card/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/50">
                    <Heart className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <h4 className="font-medium">
                    {t(
                      'patientPortal.dashboard.healthMetrics.bloodPressure.title'
                    )}
                  </h4>
                </div>
                <Badge
                  className={getMetricStatusClass(
                    metrics.healthIndicators?.bloodPressure.status ||
                      MetricStatus.Unknown
                  )}
                >
                  {getMetricStatusLabel(
                    metrics.healthIndicators?.bloodPressure.status ||
                      MetricStatus.Unknown
                  )}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-xl">
                    {metrics.healthIndicators?.bloodPressure.systolic}/
                    {metrics.healthIndicators?.bloodPressure.diastolic}
                  </span>{' '}
                  <span className="text-xs text-muted-foreground">mmHg</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {t(
                  'patientPortal.dashboard.healthMetrics.bloodPressure.lastUpdate'
                )}{' '}
                {formatDate(
                  metrics?.healthIndicators?.bloodPressure?.lastUpdated || ''
                )}
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>
                    {t(
                      'patientPortal.dashboard.healthMetrics.bloodPressure.trend'
                    )}
                  </span>
                </div>
                {metrics.healthIndicators?.bloodPressure.history && (
                  <div className="h-10 flex items-end gap-1">
                    {metrics.healthIndicators?.bloodPressure?.history.map(
                      (reading, index) => (
                        <div
                          key={index}
                          className="relative flex-1 bg-red-100 dark:bg-red-900/30 rounded-t"
                          style={{
                            height: `${
                              ((reading?.systolic || 0) / 200) * 100
                            }%`,
                            opacity: 0.5 + index * 0.25,
                          }}
                        >
                          <div
                            className="absolute bottom-0 w-full bg-red-200 dark:bg-red-800/50 rounded-t"
                            style={{
                              height: `${
                                ((reading?.diastolic || 0) /
                                  (reading?.systolic || 0)) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Blood sugar */}
            <div className="rounded-lg border p-4 bg-card/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/50">
                    <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-medium">
                    {t(
                      'patientPortal.dashboard.healthMetrics.bloodSugar.title'
                    )}
                  </h4>
                </div>
                <Badge
                  className={getMetricStatusClass(
                    metrics.healthIndicators?.bloodSugar.status ||
                      MetricStatus.Unknown
                  )}
                >
                  {getMetricStatusLabel(
                    metrics.healthIndicators?.bloodSugar.status ||
                      MetricStatus.Unknown
                  )}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-xl">
                    {metrics.healthIndicators?.bloodSugar.value}
                  </span>{' '}
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {t(
                  'patientPortal.dashboard.healthMetrics.bloodSugar.lastUpdate'
                )}{' '}
                {formatDate(
                  metrics?.healthIndicators?.bloodSugar.lastUpdated || ''
                )}
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>
                    {t(
                      'patientPortal.dashboard.healthMetrics.bloodSugar.trend'
                    )}
                  </span>
                </div>
                <div className="h-10 flex items-end gap-1">
                  {metrics?.healthIndicators?.bloodSugar?.history &&
                    metrics?.healthIndicators?.bloodSugar?.history.map(
                      (reading, index) => (
                        <div
                          key={index}
                          className="relative flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-t"
                          style={{
                            height: `${(reading / 200) * 100}%`,
                            opacity: 0.5 + index * 0.25,
                          }}
                        ></div>
                      )
                    )}
                </div>
              </div>
            </div>

            {/* Weight */}
            <div className="rounded-lg border p-4 bg-card/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/50">
                    <Scale className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-medium">
                    {t('patientPortal.dashboard.healthMetrics.weight.title')}
                  </h4>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-xl">
                    {metrics.medicalInfo?.weight}
                  </span>{' '}
                  <span className="text-xs text-muted-foreground">
                    {t('patientPortal.profile.medicalInfo.kg')}
                  </span>
                </div>
              </div>
            </div>

            {/* Heart rate */}
            <div className="rounded-lg border p-4 bg-card/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/50">
                    <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-medium">
                    {t('patientPortal.dashboard.healthMetrics.heartRate.title')}
                  </h4>
                </div>
                <Badge
                  className={getMetricStatusClass(
                    metrics.healthIndicators?.heartRate.status ||
                      MetricStatus.Unknown
                  )}
                >
                  {getMetricStatusLabel(
                    metrics.healthIndicators?.heartRate.status ||
                      MetricStatus.Unknown
                  )}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-xl">
                    {metrics.healthIndicators?.heartRate.value}
                  </span>{' '}
                  <span className="text-xs text-muted-foreground">BPM</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {t(
                  'patientPortal.dashboard.healthMetrics.heartRate.lastUpdate'
                )}{' '}
                {formatDate(
                  metrics.healthIndicators?.heartRate.lastUpdated || ''
                )}
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>
                    {t('patientPortal.dashboard.healthMetrics.heartRate.trend')}
                  </span>
                </div>
                <div className="h-10 flex items-end gap-1">
                  {metrics.healthIndicators?.heartRate.history &&
                    metrics?.healthIndicators.heartRate.history.map(
                      (reading, index) => (
                        <div
                          key={index}
                          className="relative flex-1 bg-purple-100 dark:bg-purple-900/30 rounded-t"
                          style={{
                            height: `${(reading / 120) * 100}%`,
                            opacity: 0.5 + index * 0.25,
                          }}
                        ></div>
                      )
                    )}
                </div>
              </div>
            </div>

            {/* Cholesterol */}
            <div className="rounded-lg border p-4 bg-card/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/50">
                    <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h4 className="font-medium">
                    {t(
                      'patientPortal.dashboard.healthMetrics.cholesterol.title'
                    )}
                  </h4>
                </div>
                <Badge
                  className={getMetricStatusClass(
                    metrics.healthIndicators?.cholesterol.status ||
                      MetricStatus.Unknown
                  )}
                >
                  {getMetricStatusLabel(
                    metrics.healthIndicators?.cholesterol.status ||
                      MetricStatus.Unknown
                  )}
                </Badge>
              </div>
              <div className="space-y-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">
                    {t(
                      'patientPortal.dashboard.healthMetrics.cholesterol.total'
                    )}
                  </span>
                  <span className="text-sm font-medium">
                    {metrics.healthIndicators?.cholesterol.total}{' '}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">HDL</span>
                  <span className="text-sm font-medium">
                    {metrics.healthIndicators?.cholesterol.hdl}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">LDL</span>
                  <span className="text-sm font-medium">
                    {metrics.healthIndicators?.cholesterol.ldl}
                  </span>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {t(
                  'patientPortal.dashboard.healthMetrics.cholesterol.lastUpdate'
                )}{' '}
                {formatDate(
                  metrics.healthIndicators?.cholesterol.lastUpdated || ''
                )}
              </div>
            </div>

            {/* BMI Calculation */}
            <div className="rounded-lg border p-4 bg-card/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-cyan-100 p-2 dark:bg-cyan-900/50">
                    <Star className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h4 className="font-medium">
                    {t('patientPortal.dashboard.healthMetrics.bmi.title')}
                  </h4>
                </div>
                <Badge
                  className={getBMICategoryClass(
                    metrics.medicalInfo?.bmiCategory || BMICategory.Normal
                  )}
                >
                  {metrics.medicalInfo?.bmiCategory &&
                    getBMICategoryLabel(metrics.medicalInfo?.bmiCategory)}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-xl">
                    {/* {calculateBMI(metrics.weight.value, 170).toFixed(1)} */}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {' '}
                    {t('patientPortal.dashboard.healthMetrics.bmi.unit')}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200 dark:bg-cyan-900 dark:text-cyan-300">
                        {metrics.medicalInfo?.bmiValue}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                    <div
                      style={{
                        width: `${Math.min(
                          100,
                          (metrics.medicalInfo?.bmiValue || 0) * 100
                        )}%`,
                      }}
                      className={cn(
                        'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center',
                        getBMICategoryClass(
                          metrics.medicalInfo?.bmiCategory || BMICategory.Normal
                        )
                      )}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {t('patientPortal.dashboard.healthMetrics.bmi.calculated')}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6">
          <Button variant="outline" className="w-full group" asChild>
            <Link
              href="/patient-portal/health-metrics"
              className="flex items-center justify-center"
            >
              {t('patientPortal.dashboard.healthMetrics.viewMore')}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
