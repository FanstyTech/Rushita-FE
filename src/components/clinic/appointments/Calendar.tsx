'use client';

import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { AppointmentListDto, VisitType } from '@/lib/api/types/appointment';
import { Card } from '@/components/ui/card';
import { formatTimeForAPI } from '@/utils/dateTimeUtils';

interface CalendarProps {
  appointments: AppointmentListDto[];
  onDaySelect: (date: Date) => void;
  selectedDate?: Date;
}

export function Calendar({
  appointments,
  onDaySelect,
  selectedDate,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <Card>
      {/* Calendar Header */}
      <div className="px-6 py-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={previousMonth}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium  py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((day) => {
            const dayAppointments = appointments.filter(
              (apt) =>
                format(new Date(apt.date), 'yyyy-MM-dd') ===
                format(day, 'yyyy-MM-dd')
            );

            return (
              <button
                key={day.toString()}
                onClick={() => onDaySelect(day)}
                className={`
                  dark:bg-gray-900 
                  min-h-[100px] p-2 border rounded-lg relative
                  ${isSameMonth(day, currentMonth) ? 'bg-white' : 'bg-gray-50'}
                  ${
                    selectedDate && isSameDay(day, selectedDate)
                      ? 'border-blue-500 ring-1 ring-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <time
                  dateTime={format(day, 'yyyy-MM-dd')}
                  className={`
                    block text-sm
                    ${
                      isSameMonth(day, currentMonth)
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-400 dark:text-white'
                    }
                  `}
                >
                  {format(day, 'd')}
                </time>
                {dayAppointments.length > 0 && (
                  <div className="mt-1">
                    {dayAppointments.slice(0, 2).map((apt) => (
                      <div
                        key={apt.id}
                        className="text-xs px-1 py-0.5 rounded bg-blue-50 text-blue-700 mb-1 truncate"
                      >
                        {formatTimeForAPI(apt.startTime)} -{' '}
                        {VisitType[apt.type]}
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{dayAppointments.length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
