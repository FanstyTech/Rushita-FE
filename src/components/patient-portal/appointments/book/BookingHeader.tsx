'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BookingHeader() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="icon" asChild>
        <Link href="/patient-portal/appointments">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">العودة</span>
        </Link>
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">حجز موعد جديد</h1>
        <p className="text-muted-foreground">
          اختر العيادة والتخصص والطبيب والموعد المناسب لك
        </p>
      </div>
    </div>
  );
}
