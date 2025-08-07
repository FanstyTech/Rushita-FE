'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pill, Calendar, User, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Add this import
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

interface Medication {
  id: string;
  name: string;
  image: string;
  dosage: string;
  frequency: string;
  remainingDays: number;
  totalDays: number;
  startDate: string;
  endDate: string;
  instructions: string;
  prescribedBy: string;
  refillable: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface MedicationsCardProps {
  medications: Medication[];
  variants: any;
  formatDate: (date: string) => string;
}

export function MedicationsCard({ medications, variants, formatDate }: MedicationsCardProps) {
  const { t } = useTranslation(); // Add this hook

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50 h-full">
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="flex items-center text-lg">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Pill className="h-4 w-4 text-primary" />
              </div>
              {t('patientPortal.dashboard.medications.title')}
            </CardTitle>
            <Badge variant="outline" className="font-normal">
              {medications.length} {t('patientPortal.dashboard.medications.medicationsCount')}
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground text-sm">
            {t('patientPortal.dashboard.medications.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {medications.length > 0 ? (
            <div className="space-y-4">
              {medications.map((medication) => (
                <div
                  key={medication.id}
                  className="group relative flex flex-col gap-2 rounded-lg p-3 transition-all hover:bg-accent/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'h-10 w-10 rounded-full flex items-center justify-center shrink-0',
                          medication.priority === 'high'
                            ? 'bg-destructive/10 text-destructive'
                            : medication.priority === 'medium'
                            ? 'bg-warning/10 text-warning'
                            : 'bg-primary/10 text-primary'
                        )}
                      >
                        <Pill className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-base">
                          {medication.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {medication.dosage} - {medication.frequency}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        medication.priority === 'high'
                          ? 'destructive'
                          : medication.priority === 'medium'
                          ? 'secondary'
                          : 'outline'
                      }
                      className="text-xs font-normal"
                    >
                      {medication.priority === 'high'
                        ? t('patientPortal.dashboard.medications.priority.high')
                        : medication.priority === 'medium'
                        ? t('patientPortal.dashboard.medications.priority.medium')
                        : t('patientPortal.dashboard.medications.priority.normal')}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-1">
                    <div className="text-xs px-2 py-0.5 rounded-full bg-muted flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {t('patientPortal.dashboard.medications.started')} {formatDate(medication.startDate)}
                      </span>
                    </div>
                    {medication.endDate && (
                      <div className="text-xs px-2 py-0.5 rounded-full bg-muted flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {t('patientPortal.dashboard.medications.ends')} {formatDate(medication.endDate)}
                        </span>
                      </div>
                    )}
                    <div className="text-xs px-2 py-0.5 rounded-full bg-muted flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>{medication.prescribedBy}</span>
                    </div>
                  </div>

                  {medication.instructions && (
                    <div className="mt-2 text-xs bg-muted/50 p-2 rounded-md text-muted-foreground">
                      <span className="font-medium">{t('patientPortal.dashboard.medications.instructions')}</span>{' '}
                      {medication.instructions}
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <Link
                      href={`/patient-portal/medications/${medication.id}`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-3">
                <Pill className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">
                {t('patientPortal.dashboard.medications.noMedications.title')}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {t('patientPortal.dashboard.medications.noMedications.description')}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button variant="outline" className="w-full group" asChild>
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
