'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  hasAppointments: boolean;
}

export function Pagination({ hasAppointments }: PaginationProps) {
  if (!hasAppointments) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
      <Button variant="outline" size="icon" disabled>
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">الصفحة السابقة</span>
      </Button>
      <Button variant="outline" size="sm" className="font-medium">
        1
      </Button>
      <Button variant="outline" size="icon" disabled>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">الصفحة التالية</span>
      </Button>
    </div>
  );
}
