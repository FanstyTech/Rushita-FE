'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function BookingHeader() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="icon" asChild>
        <Link href="/patient-portal/appointments">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">{t('patientPortal.appointments.booking.header.backButton')}</span>
        </Link>
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('patientPortal.appointments.booking.header.title')}</h1>
        <p className="text-muted-foreground">
          {t('patientPortal.appointments.booking.header.subtitle')}
        </p>
      </div>
    </div>
  );
}
