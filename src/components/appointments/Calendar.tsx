'use client';

import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { Appointment } from '@/mockData/appointments';

interface CalendarProps {
  appointments: Appointment[];
  onDaySelect: (date: Date) => void;
  selectedDate?: Date;
}

export function Calendar({ appointments, onDaySelect, selectedDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Calendar Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
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
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((day, dayIdx) => {
            const dayAppointments = appointments.filter(
              (apt) => apt.date === format(day, 'yyyy-MM-dd')
            );

            return (
              <button
                key={day.toString()}
                onClick={() => onDaySelect(day)}
                className={`
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
                    ${isSameMonth(day, currentMonth) ? 'text-gray-900' : 'text-gray-400'}
                  `}
                >
                  {format(day, 'd')}
                </time>
                {dayAppointments.length > 0 && (
                  <div className="mt-1">
                    {dayAppointments.slice(0, 2).map((apt, idx) => (
                      <div
                        key={apt.id}
                        className="text-xs px-1 py-0.5 rounded bg-blue-50 text-blue-700 mb-1 truncate"
                      >
                        {apt.startTime} - {apt.type}
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
    </div>
  );
}
