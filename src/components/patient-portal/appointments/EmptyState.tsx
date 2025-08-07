'use client';

import Link from 'next/link';
import { Calendar, CalendarPlus } from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  activeTab: string;
}

export function EmptyState({ activeTab }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Calendar className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-medium mb-2">لا توجد مواعيد</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {activeTab === 'upcoming'
            ? 'ليس لديك مواعيد قادمة تطابق معايير البحث الخاصة بك'
            : 'ليس لديك مواعيد سابقة تطابق معايير البحث الخاصة بك'}
        </p>
        <Button className="mt-6 gap-2" asChild>
          <Link href="/patient-portal/appointments/book">
            <CalendarPlus className="h-4 w-4 mr-1" />
            حجز موعد جديد
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
