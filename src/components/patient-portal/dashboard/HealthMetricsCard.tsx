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

interface HealthMetrics {
  bloodPressure: {
    systolic: number;
    diastolic: number;
    status: string;
    lastUpdated: string;
    history: Array<{ systolic: number; diastolic: number; date: Date }>;
  };
  bloodSugar: {
    value: number;
    unit: string;
    status: string;
    lastUpdated: string;
    history: Array<{ value: number; date: Date }>;
  };
  weight: {
    value: number;
    unit: string;
    trend: string;
    lastUpdated: string;
    history: Array<{ value: number; date: Date }>;
  };
  heartRate: {
    value: number;
    unit: string;
    status: string;
    lastUpdated: string;
    history: Array<{ value: number; date: Date }>;
  };
  cholesterol: {
    total: number;
    hdl: number;
    ldl: number;
    unit: string;
    status: string;
    lastUpdated: string;
  };
}

interface HealthMetricsCardProps {
  metrics: HealthMetrics;
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
                  variant={
                    metrics.bloodPressure.status === 'normal'
                      ? 'outline'
                      : metrics.bloodPressure.status === 'elevated'
                      ? 'secondary'
                      : 'destructive'
                  }
                  className="text-xs"
                >
                  {metrics.bloodPressure.status === 'normal'
                    ? t(
                        'patientPortal.dashboard.healthMetrics.bloodPressure.normal'
                      )
                    : metrics.bloodPressure.status === 'elevated'
                    ? t(
                        'patientPortal.dashboard.healthMetrics.bloodPressure.elevated'
                      )
                    : t(
                        'patientPortal.dashboard.healthMetrics.bloodPressure.high'
                      )}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-xl">
                    {metrics.bloodPressure.systolic}/
                    {metrics.bloodPressure.diastolic}
                  </span>{' '}
                  <span className="text-xs text-muted-foreground">mmHg</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {t(
                  'patientPortal.dashboard.healthMetrics.bloodPressure.lastUpdate'
                )}{' '}
                {formatDate(metrics?.bloodPressure?.lastUpdated || '')}
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>
                    {t(
                      'patientPortal.dashboard.healthMetrics.bloodPressure.trend'
                    )}
                  </span>
                </div>
                <div className="h-10 flex items-end gap-1">
                  {metrics.bloodPressure.history.map((reading, index) => (
                    <div
                      key={index}
                      className="relative flex-1 bg-red-100 dark:bg-red-900/30 rounded-t"
                      style={{
                        height: `${(reading.systolic / 200) * 100}%`,
                        opacity: 0.5 + index * 0.25,
                      }}
                    >
                      <div
                        className="absolute bottom-0 w-full bg-red-200 dark:bg-red-800/50 rounded-t"
                        style={{
                          height: `${
                            (reading.diastolic / reading.systolic) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
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
                  variant={
                    metrics.bloodSugar.status === 'normal'
                      ? 'outline'
                      : metrics.bloodSugar.status === 'elevated'
                      ? 'secondary'
                      : 'destructive'
                  }
                  className="text-xs"
                >
                  {metrics.bloodSugar.status === 'normal'
                    ? t(
                        'patientPortal.dashboard.healthMetrics.bloodSugar.normal'
                      )
                    : metrics.bloodSugar.status === 'elevated'
                    ? t(
                        'patientPortal.dashboard.healthMetrics.bloodSugar.elevated'
                      )
                    : t(
                        'patientPortal.dashboard.healthMetrics.bloodSugar.high'
                      )}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-xl">
                    {metrics.bloodSugar.value}
                  </span>{' '}
                  <span className="text-xs text-muted-foreground">
                    {metrics.bloodSugar.unit}
                  </span>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {t(
                  'patientPortal.dashboard.healthMetrics.bloodSugar.lastUpdate'
                )}{' '}
                {formatDate(metrics.bloodSugar.lastUpdated)}
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
                  {metrics.bloodSugar.history.map((reading, index) => (
                    <div
                      key={index}
                      className="relative flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-t"
                      style={{
                        height: `${(reading.value / 200) * 100}%`,
                        opacity: 0.5 + index * 0.25,
                      }}
                    ></div>
                  ))}
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
                <Badge
                  variant="outline"
                  className={cn(
                    'text-xs',
                    metrics.weight.trend === 'increasing' &&
                      'text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-900/20',
                    metrics.weight.trend === 'decreasing' &&
                      'text-green-600 border-green-300 bg-green-50 dark:bg-green-900/20'
                  )}
                >
                  {metrics.weight.trend === 'stable'
                    ? t('patientPortal.dashboard.healthMetrics.weight.stable')
                    : metrics.weight.trend === 'increasing'
                    ? t(
                        'patientPortal.dashboard.healthMetrics.weight.increasing'
                      )
                    : t(
                        'patientPortal.dashboard.healthMetrics.weight.decreasing'
                      )}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-xl">
                    {metrics.weight.value}
                  </span>{' '}
                  <span className="text-xs text-muted-foreground">
                    {metrics.weight.unit}
                  </span>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {t('patientPortal.dashboard.healthMetrics.weight.lastUpdate')}{' '}
                {formatDate(metrics.weight.lastUpdated)}
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>
                    {t('patientPortal.dashboard.healthMetrics.weight.trend')}
                  </span>
                </div>
                <div className="h-10 flex items-end gap-1">
                  {metrics.weight.history.map((reading, index) => (
                    <div
                      key={index}
                      className="relative flex-1 bg-green-100 dark:bg-green-900/30 rounded-t"
                      style={{
                        height: `${(reading.value / 100) * 100}%`,
                        opacity: 0.5 + index * 0.25,
                      }}
                    ></div>
                  ))}
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
                  variant={
                    metrics.heartRate.status === 'normal'
                      ? 'outline'
                      : 'secondary'
                  }
                  className="text-xs"
                >
                  {metrics.heartRate.status === 'normal'
                    ? t(
                        'patientPortal.dashboard.healthMetrics.heartRate.normal'
                      )
                    : t(
                        'patientPortal.dashboard.healthMetrics.heartRate.abnormal'
                      )}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-xl">
                    {metrics.heartRate.value}
                  </span>{' '}
                  <span className="text-xs text-muted-foreground">
                    {metrics.heartRate.unit}
                  </span>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {t(
                  'patientPortal.dashboard.healthMetrics.heartRate.lastUpdate'
                )}{' '}
                {formatDate(metrics.heartRate.lastUpdated)}
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>
                    {t('patientPortal.dashboard.healthMetrics.heartRate.trend')}
                  </span>
                </div>
                <div className="h-10 flex items-end gap-1">
                  {metrics.heartRate.history.map((reading, index) => (
                    <div
                      key={index}
                      className="relative flex-1 bg-purple-100 dark:bg-purple-900/30 rounded-t"
                      style={{
                        height: `${(reading.value / 120) * 100}%`,
                        opacity: 0.5 + index * 0.25,
                      }}
                    ></div>
                  ))}
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
                  variant={
                    metrics.cholesterol.status === 'normal'
                      ? 'outline'
                      : 'secondary'
                  }
                  className="text-xs"
                >
                  {metrics.cholesterol.status === 'normal'
                    ? t(
                        'patientPortal.dashboard.healthMetrics.cholesterol.normal'
                      )
                    : t(
                        'patientPortal.dashboard.healthMetrics.cholesterol.high'
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
                    {metrics.cholesterol.total} {metrics.cholesterol.unit}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">HDL</span>
                  <span className="text-sm font-medium">
                    {metrics.cholesterol.hdl} {metrics.cholesterol.unit}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">LDL</span>
                  <span className="text-sm font-medium">
                    {metrics.cholesterol.ldl} {metrics.cholesterol.unit}
                  </span>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {t(
                  'patientPortal.dashboard.healthMetrics.cholesterol.lastUpdate'
                )}{' '}
                {formatDate(metrics.cholesterol.lastUpdated)}
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
                {/* <Badge
                  variant={
                    getBMICategory(calculateBMI(metrics.weight.value, 170)) ===
                    'normal'
                      ? 'outline'
                      : getBMICategory(
                          calculateBMI(metrics.weight.value, 170)
                        ) === 'overweight'
                      ? 'secondary'
                      : 'destructive'
                  }
                  className="text-xs"
                >
                  {getBMICategory(calculateBMI(metrics.weight.value, 170)) ===
                  'underweight'
                    ? t('patientPortal.dashboard.healthMetrics.bmi.underweight')
                    : getBMICategory(
                        calculateBMI(metrics.weight.value, 170)
                      ) === 'normal'
                    ? t('patientPortal.dashboard.healthMetrics.bmi.normal')
                    : getBMICategory(
                        calculateBMI(metrics.weight.value, 170)
                      ) === 'overweight'
                    ? t('patientPortal.dashboard.healthMetrics.bmi.overweight')
                    : t('patientPortal.dashboard.healthMetrics.bmi.obese')}
                </Badge> */}
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
                        {/* {getBMICategory(
                          calculateBMI(metrics.weight.value, 170)
                        )} */}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                    {/* <div
                      style={{
                        width: `${Math.min(
                          100,
                          (calculateBMI(metrics.weight.value, 170) / 40) * 100
                        )}%`,
                      }}
                      className={cn(
                        'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center',
                        getBMICategory(
                          calculateBMI(metrics.weight.value, 170)
                        ) === 'underweight' && 'bg-blue-500',
                        getBMICategory(
                          calculateBMI(metrics.weight.value, 170)
                        ) === 'normal' && 'bg-green-500',
                        getBMICategory(
                          calculateBMI(metrics.weight.value, 170)
                        ) === 'overweight' && 'bg-yellow-500',
                        getBMICategory(
                          calculateBMI(metrics.weight.value, 170)
                        ) === 'obese' && 'bg-red-500'
                      )}
                    ></div> */}
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
