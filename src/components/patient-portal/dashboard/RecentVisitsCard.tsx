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
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50 h-full">
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
        <CardContent className="p-6">
          {visits.length > 0 ? (
            <div className="space-y-4">
              {visits.map((visit) => (
                <div
                  key={visit.id}
                  className="group relative flex flex-col gap-2 rounded-lg p-3 transition-all hover:bg-accent/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-11 w-11 border-2 border-primary/10 shadow-sm">
                        <AvatarImage
                          // src={visit.doctorAvatar}
                          alt={visit.doctorName}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {visit.doctorName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-base">
                          {visit.doctorName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {/* {visit.specialty}  */}
                          todo - {visit.clinicName}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-xs px-2 py-0.5 rounded-full bg-muted">
                        {/* {formatRelativeTime(visit.date)} */}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(visit.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {visit.symptoms && (
                      <div className="text-xs px-2 py-0.5 rounded-full bg-muted flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        <span>{visit.symptoms}</span>
                      </div>
                    )}
                    {visit.type && (
                      <div className="text-xs px-2 py-0.5 rounded-full bg-muted flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        <span>{visit.type}</span>
                      </div>
                    )}
                  </div>

                  {visit.diagnoses && (
                    <div className="mt-2 text-xs bg-muted/50 p-2 rounded-md text-muted-foreground">
                      <span className="font-medium">
                        {t('patientPortal.dashboard.recentVisits.diagnosis')}
                      </span>{' '}
                      {visit.diagnoses
                        .map((diagnosis) => diagnosis.description)
                        .join(', ')}
                    </div>
                  )}

                  {visit.nextVisitDate && visit.nextVisitDate && (
                    <div className="mt-1 text-xs flex items-center text-primary">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {t('patientPortal.dashboard.recentVisits.followUp')}{' '}
                        {formatDate(visit.nextVisitDate)}
                      </span>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <Link href={`/patient-portal/visits/${visit.id}`}>
                      <ChevronRight className="h-4 w-4" />
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
