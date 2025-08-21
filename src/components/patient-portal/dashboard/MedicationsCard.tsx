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
import { getFrequencyTypeClass, getFrequencyTypeLabel } from '@/utils/textUtils';

interface MedicationsCardProps {
  medications: PatientPortalPrescriptionsDto[];
  variants: any;
}

export function MedicationsCard({
  medications,
  variants,
}: MedicationsCardProps) {
  const { t } = useTranslation();


  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50 h-full flex flex-col">
        <CardHeader className="p-6 pb-3">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="flex items-center text-lg">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Pill className="h-5 w-5 text-primary" />
              </div>
              {t('patientPortal.dashboard.medications.title')}
            </CardTitle>
            <Badge variant="outline" className="font-normal">
              {medications.length}{' '}
              {t('patientPortal.dashboard.medications.medicationsCount')}
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground text-sm">
            {t('patientPortal.dashboard.medications.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-3 flex-1">
          {medications.length > 0 ? (
            <div className="space-y-3">
              {medications.map((medication) => {

                return (
                  <div
                    key={medication.id}
                    className="group relative rounded-lg border border-border/30 p-3 transition-all hover:bg-accent/50 hover:border-border/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            'h-8 w-8 rounded-full flex items-center justify-center shrink-0',
                            getFrequencyTypeClass(medication.frequency)
                          )}
                        >
                          <Pill className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm leading-tight">
                            {medication.medicineName}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {medication.dosage}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          getFrequencyTypeClass(medication.frequency)
                        )}
                      >
                        {getFrequencyTypeLabel(medication.frequency)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {medication.frequency}
                        </span>
                        <span>{formatDate(medication.createdAt)}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-muted text-xs">
                        {medication.prescribedByName}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      asChild
                    >
                      <Link
                        href={`/patient-portal/medications/${medication.id}`}
                      >
                        <ChevronRight className="h-3 w-3" />
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
