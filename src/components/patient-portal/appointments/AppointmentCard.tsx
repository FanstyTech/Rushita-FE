'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  Clock,
  X,
  AlertCircle,
  User,
  Stethoscope,
} from 'lucide-react';
import { formatDate, formatTime } from '@/utils/dateTimeUtils';
import { PatientPortalAppointmentsDto } from '@/lib/api/types/clinic-patient';
import {
  getAppointmentStatusClass,
  getAppointmentStatusLabel,
} from '@/utils/textUtils';
import { AppointmentStatus } from '@/lib/api/types/appointment';

interface AppointmentCardProps {
  appointment: PatientPortalAppointmentsDto;
  variants: Variants;
}

export function AppointmentCard({
  appointment,
  variants,
}: AppointmentCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div variants={variants}>
      <Card
        className={cn(
          'overflow-hidden transition-all duration-300 hover:shadow-md'
        )}
      >
        <CardContent className={cn('p-6')}>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14 border-2 border-primary/10 ring-2 ring-primary/5">
                <AvatarImage alt={appointment.doctorName} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="font-semibold text-lg">
                      {appointment.doctorName}
                    </h3>
                    <Badge
                      variant="outline"
                      className="mr-2 bg-primary/5 border-primary/10"
                    >
                      <Stethoscope className="h-3 w-3 mr-1" />
                      {appointment.doctorSpecialization}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    {appointment.clinicName}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-primary/5 border-primary/10 text-xs px-2 py-0.5"
                    >
                      <Calendar className="h-3 w-3" />
                      {formatDate(appointment.date)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-primary/5 border-primary/10 text-xs px-2 py-0.5"
                    >
                      <Clock className="h-3 w-3" />
                      {formatTime(appointment.date)}
                    </Badge>
                    <Badge
                      className={cn(
                        'flex items-center gap-1 text-xs px-2 py-0.5',
                        getAppointmentStatusClass(appointment.status)
                      )}
                    >
                      {getAppointmentStatusLabel(appointment.status)}
                    </Badge>
                  </div>
                  {appointment.notes && (
                    <div className="mt-3 text-sm flex items-start p-2 bg-muted/30 rounded-md">
                      <AlertCircle className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-muted-foreground" />
                      <span>
                        {t('patientPortal.appointments.list.card.notes')}:{' '}
                        {appointment.notes}
                      </span>
                    </div>
                  )}
                </>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:self-center">
              <Button
                size="sm"
                asChild
                className="bg-primary hover:bg-primary/90 h-7 px-3 text-xs rounded-md"
              >
                <Link
                  href={`/patient-portal/appointments/${appointment.id}`}
                  className="flex items-center gap-1.5"
                >
                  <Calendar className="h-3 w-3" />
                  <span>
                    {t('patientPortal.appointments.list.card.details')}
                  </span>
                </Link>
              </Button>

              {appointment.status === AppointmentStatus.Confirmed && (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive/20 bg-destructive/5 hover:bg-destructive/10 text-destructive h-7 px-3 text-xs rounded-md flex items-center gap-1.5"
                >
                  <X className="h-3 w-3" />
                  <span>
                    {t('patientPortal.appointments.list.card.cancel')}
                  </span>
                </Button>
              )}
              {appointment.status === AppointmentStatus.Completed && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1.5 border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 rounded-md px-4 py-2 h-9"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {t('patientPortal.appointments.list.card.requestFollowUp')}
                  </span>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
