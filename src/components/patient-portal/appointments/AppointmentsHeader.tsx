'use client';

import Link from 'next/link';
import { CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AppointmentsHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">المواعيد</h1>
        <p className="text-muted-foreground">
          إدارة مواعيدك الطبية وحجز مواعيد جديدة
        </p>
      </div>
      <Button asChild className="flex items-center gap-1">
        <Link href="/patient-portal/appointments/book">
          <CalendarPlus className="h-4 w-4" />
          حجز موعد جديد
        </Link>
      </Button>
    </div>
  );
}
