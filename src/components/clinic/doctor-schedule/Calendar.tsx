'use client';

import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { DoctorSchedule } from '@/mockData/doctorSchedule';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  schedules?: DoctorSchedule[];
}

export function Calendar({
  selectedDate,
  onDateSelect,
  schedules = [],
}: CalendarProps) {
  // Get week days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(startOfWeek(selectedDate), i);
    return day;
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-7 gap-px border-b border-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="px-2 py-3 text-center text-sm font-medium text-gray-500 bg-gray-50"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {weekDays.map((day) => {
          const daySchedules = schedules.filter((schedule) =>
            isSameDay(new Date(schedule.date), day)
          );

          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={`relative h-24 bg-white p-2 hover:bg-gray-50 focus:z-10 ${
                isSameDay(day, selectedDate) ? 'bg-blue-50' : ''
              }`}
            >
              <time
                dateTime={format(day, 'yyyy-MM-dd')}
                className={`block text-sm ${
                  isSameDay(day, selectedDate)
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                {format(day, 'd')}
              </time>
              {daySchedules.length > 0 && (
                <div className="mt-2">
                  {daySchedules.slice(0, 2).map((schedule) => (
                    <div
                      key={schedule.id}
                      className={`text-xs px-1 py-0.5 rounded mb-1 truncate
                        ${
                          schedule.shiftType === 'morning'
                            ? 'bg-yellow-100 text-yellow-800'
                            : schedule.shiftType === 'evening'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                    >
                      {schedule.shiftType}
                    </div>
                  ))}
                  {daySchedules.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{daySchedules.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
