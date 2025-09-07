'use client';

import Link from 'next/link';
import { CalendarPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export function AppointmentsHeader() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('patientPortal.appointments.list.header.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('patientPortal.appointments.list.header.subtitle')}
        </p>
      </div>
      <Button asChild className="flex items-center gap-1">
        <Link href="/patient-portal/appointments/book">
          <CalendarPlus className="h-4 w-4" />
          {t('patientPortal.appointments.list.header.newAppointmentButton')}
        </Link>
      </Button>
    </div>
  );
}
