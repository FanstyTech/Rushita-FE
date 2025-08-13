'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Pill,
  Calendar,
  User,
  ChevronRight,
  Clock,
  AlertCircle,
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
import { PatientPortalPrescriptionsDto } from '@/lib/api/types/clinic-patient';
import { formatDate } from '@/utils/dateTimeUtils';

interface MedicationsCardProps {
  medications: PatientPortalPrescriptionsDto[];
  variants: any;
}

export function MedicationsCard({
  medications,
  variants,
}: MedicationsCardProps) {
  const { t } = useTranslation();

  // Get frequency display info
  const getFrequencyInfo = (frequency: string) => {
    switch (frequency) {
      case 'high':
        return {
          color: 'bg-destructive/10 text-destructive',
          badgeVariant: 'destructive',
          label: t('patientPortal.dashboard.medications.priority.high'),
        };
      case 'medium':
        return {
          color: 'bg-warning/10 text-warning',
          badgeVariant: 'warning',
          label: t('patientPortal.dashboard.medications.priority.medium'),
        };
      default:
        return {
          color: 'bg-primary/10 text-primary',
          badgeVariant: 'outline',
          label: t('patientPortal.dashboard.medications.priority.normal'),
        };
    }
  };

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50 h-full">
        <CardHeader className="p-6 pb-3">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="flex items-center text-lg">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Pill className="h-5 w-5 text-primary" />
              </div>
              {t('patientPortal.dashboard.medications.title')}
            </CardTitle>
            <Badge variant="secondary" className="font-normal px-2.5 py-1">
              {medications.length}{' '}
              {t('patientPortal.dashboard.medications.medicationsCount')}
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground text-sm">
            {t('patientPortal.dashboard.medications.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-3">
          {medications.length > 0 ? (
            <div className="space-y-4">
              {medications.map((medication) => {
                const frequencyInfo = getFrequencyInfo(medication.frequency);

                return (
                  <div
                    key={medication.id}
                    className="group relative flex flex-col gap-2 rounded-lg border border-border/30 p-4 transition-all hover:bg-accent/50 hover:border-border/70"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'h-12 w-12 rounded-full flex items-center justify-center shrink-0',
                            frequencyInfo.color
                          )}
                        >
                          <Pill className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium text-base">
                            {medication.medicineName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {medication.dosage}
                          </p>
                        </div>
                      </div>
                      {/* <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant={frequencyInfo.badgeVariant as any}
                              className="text-xs font-normal"
                            >
                              {frequencyInfo.label}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {t(
                                'patientPortal.dashboard.medications.frequencyTooltip'
                              )}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider> */}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="text-xs px-2.5 py-1 rounded-full bg-muted flex items-center">
                        <Calendar className="h-3 w-3 mr-1.5" />
                        <span>
                          {t('patientPortal.dashboard.medications.started')}{' '}
                          {formatDate(medication.createdAt)}
                        </span>
                      </div>
                      <div className="text-xs px-2.5 py-1 rounded-full bg-muted flex items-center">
                        <Clock className="h-3 w-3 mr-1.5" />
                        <span>{medication.frequency}</span>
                      </div>
                      <div className="text-xs px-2.5 py-1 rounded-full bg-muted flex items-center">
                        <User className="h-3 w-3 mr-1.5" />
                        <span>{medication.prescribedByName}</span>
                      </div>
                    </div>

                    {medication.instructions && (
                      <div className="mt-2 text-sm bg-muted/50 p-3 rounded-md text-muted-foreground">
                        <div className="flex items-center mb-1">
                          <AlertCircle className="h-3.5 w-3.5 mr-1.5 text-primary" />
                          <span className="font-medium text-xs">
                            {t(
                              'patientPortal.dashboard.medications.instructions'
                            )}
                          </span>
                        </div>
                        <p className="text-xs">{medication.instructions}</p>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-3 right-3 h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      asChild
                    >
                      <Link
                        href={`/patient-portal/medications/${medication.id}`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Pill className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-2">
                {t('patientPortal.dashboard.medications.noMedications.title')}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {t(
                  'patientPortal.dashboard.medications.noMedications.description'
                )}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button
            variant="outline"
            className="w-full group hover:bg-primary/10 hover:text-primary transition-colors"
            asChild
          >
            <Link
              href="/patient-portal/medications"
              className="flex items-center justify-center"
            >
              {t('patientPortal.dashboard.medications.viewAll')}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
