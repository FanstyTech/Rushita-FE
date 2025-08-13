'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PatientPortalAppointmentsDto } from '@/lib/api/types/clinic-patient';
import { formatDate } from '@/utils/dateTimeUtils';
import {
  getAppointmentStatusClass,
  getAppointmentStatusLabel,
} from '@/utils/textUtils';
import { cn } from '@/lib/utils';

interface AppointmentsCardProps {
  appointments: PatientPortalAppointmentsDto[];
  variants: any;
}

export function AppointmentsCard({
  appointments,
  variants,
}: AppointmentsCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50 h-full">
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="flex items-center text-lg">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              {t('patientPortal.dashboard.appointments.title')}
            </CardTitle>
            <Badge variant="outline" className="font-normal">
              {appointments.length}{' '}
              {t('patientPortal.dashboard.appointments.appointmentsCount')}
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground text-sm">
            {t('patientPortal.dashboard.appointments.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {appointments.length > 0 ? (
            <div className="space-y-5">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="group relative flex flex-col gap-3 rounded-lg p-3 transition-all hover:bg-accent/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11 border-2 border-primary/10 shadow-sm">
                      <AvatarImage
                        // src={appointment.doctorAvatar}
                        alt={appointment.doctorName}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {appointment.doctorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-base">
                            {appointment.doctorName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {appointment.doctorSpecialization}
                          </p>
                        </div>
                        <Badge
                          className={cn(
                            getAppointmentStatusClass(appointment.status)
                          )}
                        >
                          {getAppointmentStatusLabel(appointment.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-1 text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary/70" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1.5 text-primary/70" />
                        <span>{appointment.startTime}</span>
                      </div>
                    </div>
                    <div className="text-xs px-2 py-0.5 rounded-full bg-muted">
                      {appointment.clinicName}
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-1 text-xs bg-muted/50 p-2 rounded-md text-muted-foreground">
                      <span className="font-medium">
                        {t('patientPortal.dashboard.appointments.notes')}
                      </span>{' '}
                      {appointment.notes}
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <Link
                      href={`/patient-portal/appointments/${appointment.id}`}
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
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">
                {t('patientPortal.dashboard.appointments.noAppointments.title')}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {t(
                  'patientPortal.dashboard.appointments.noAppointments.description'
                )}
              </p>
              <Button className="mt-4" size="sm" asChild>
                <Link href="/patient-portal/appointments/book">
                  {t(
                    'patientPortal.dashboard.appointments.noAppointments.button'
                  )}
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button variant="outline" className="w-full group" asChild>
            <Link
              href="/patient-portal/appointments"
              className="flex items-center justify-center"
            >
              {t('patientPortal.dashboard.appointments.viewAll')}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
