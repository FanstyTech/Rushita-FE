'use client';

import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
} from 'date-fns';
import { ar } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppointmentCalendarProps {
  selectedDate?: Date | null;
  onSelect: (date: Date) => void;
  disabled?: (date: Date) => boolean;
}

export function AppointmentCalendar({
  selectedDate,
  onSelect,
  disabled,
}: AppointmentCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Arabic weekday names
  const weekdays = [
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ];

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="px-6 py-3 border-b border-border/50 bg-muted/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={previousMonth}
            className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50 transition-colors"
            aria-label="الشهر السابق"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <h2 className="text-base font-medium">
            {format(currentMonth, 'MMMM yyyy', { locale: ar })}
          </h2>

          <button
            onClick={nextMonth}
            className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50 transition-colors"
            aria-label="الشهر التالي"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((day) => {
            const isDisabled = disabled ? disabled(day) : false;
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isDayToday = isToday(day);

            return (
              <button
                key={day.toString()}
                onClick={() => !isDisabled && onSelect(day)}
                disabled={isDisabled}
                className={cn(
                  'h-10 w-full rounded-md flex items-center justify-center relative transition-all',
                  isSameMonth(day, currentMonth)
                    ? 'text-foreground'
                    : 'text-muted-foreground opacity-50',
                  isDisabled
                    ? 'opacity-40 cursor-not-allowed bg-muted/20'
                    : 'hover:bg-primary/10 hover:text-primary',
                  isSelected &&
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                  isDayToday &&
                    !isSelected &&
                    'border border-primary/50 text-primary'
                )}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>
                  {format(day, 'd')}
                </time>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
