'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  FileText,
  Tag,
  Calendar,
  ChevronRight,
} from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PatientPortalVisitsDto } from '@/lib/api/types/clinic-patient';
import { formatDate } from '@/utils/dateTimeUtils';

interface RecentVisitsCardProps {
  visits: PatientPortalVisitsDto[];
  variants: any;
}

export function RecentVisitsCard({ visits, variants }: RecentVisitsCardProps) {
  const { t } = useTranslation(); // Add this hook

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50 h-full flex flex-col">
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="flex items-center text-lg">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Stethoscope className="h-4 w-4 text-primary" />
              </div>
              {t('patientPortal.dashboard.recentVisits.title')}
            </CardTitle>
            <Badge variant="outline" className="font-normal">
              {visits.length}{' '}
              {t('patientPortal.dashboard.recentVisits.visitsCount')}
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground text-sm">
            {t('patientPortal.dashboard.recentVisits.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 flex-1">
          {visits.length > 0 ? (
            <div className="space-y-3">
              {visits.map((visit) => (
                <div
                  key={visit.id}
                  className="group relative rounded-lg border border-border/30 p-3 transition-all hover:bg-accent/50 hover:border-border/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Stethoscope className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm leading-tight">
                          {visit.doctorName}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {visit.clinicName}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {visit.type || 'Visit'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span>{formatDate(visit.createdAt)}</span>
                      {visit.symptoms && (
                        <span className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          {visit.symptoms.length > 20 ? `${visit.symptoms.substring(0, 20)}...` : visit.symptoms}
                        </span>
                      )}
                    </div>
                    {visit.nextVisitDate && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                        Follow-up
                      </span>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <Link href={`/patient-portal/visits/${visit.id}`}>
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-3">
                <Stethoscope className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">
                {t('patientPortal.dashboard.recentVisits.noVisits.title')}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {t('patientPortal.dashboard.recentVisits.noVisits.description')}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button variant="outline" className="w-full group" asChild>
            <Link
              href="/patient-portal/visits"
              className="flex items-center justify-center"
            >
              {t('patientPortal.dashboard.recentVisits.viewAll')}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
