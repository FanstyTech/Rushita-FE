'use client';

import React, { useState, useMemo } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  PencilIcon,
  ClipboardIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  addWeeks,
  subWeeks,
} from 'date-fns';
import { AppointmentListDto, VisitType } from '@/lib/api/types/appointment';
import { Button } from '@/components/ui/button';
import { formatTimeForAPI } from '@/utils/dateTimeUtils';

interface CalendarProps {
  appointments: AppointmentListDto[];
  onDaySelect: (date: Date) => void;
  selectedDate?: Date;
  onAppointmentClick?: (appointment: AppointmentListDto) => void;
}

// Treatment type configuration
const TREATMENT_CONFIG = {
  [VisitType.New]: {
    label: 'New Patient',
    color:
      'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700',
    dotColor: 'bg-blue-500',
  },
  [VisitType.Followup]: {
    label: 'Follow-up',
    color:
      'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700',
    dotColor: 'bg-purple-500',
  },
};

// Time slots for the calendar - focusing on business hours but including early morning
const TIME_SLOTS = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

export function Calendar({
  appointments,
  onDaySelect,
  selectedDate,
  onAppointmentClick,
}: CalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentListDto | null>(null);

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const previousWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

  // Group appointments by day and time
  const appointmentsByDay = useMemo(() => {
    const grouped: Record<string, AppointmentListDto[]> = {};

    appointments.forEach((apt) => {
      const dayKey = format(new Date(apt.date), 'yyyy-MM-dd');
      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
      }
      grouped[dayKey].push(apt);
    });

    return grouped;
  }, [appointments]);

  // Calculate appointment position and height
  const getAppointmentStyle = (appointment: AppointmentListDto) => {
    const startTime = appointment.startTime.split(':');
    const endTime = appointment.endTime.split(':');

    const startHour = parseInt(startTime[0]);
    const startMinute = parseInt(startTime[1]);
    const endHour = parseInt(endTime[0]);
    const endMinute = parseInt(endTime[1]);

    // Calculate position from 0 AM (first slot)
    const startPosition = ((startHour - 0) * 60 + startMinute) / 60;
    const duration =
      ((endHour - startHour) * 60 + (endMinute - startMinute)) / 60;

    return {
      top: `${startPosition * 48}px`, // 48px per hour
      height: `${Math.max(duration * 48 - 4, 48)}px`, // Minimum 48px height
    };
  };

  const handleAppointmentClick = (
    appointment: AppointmentListDto,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    setSelectedAppointment(appointment);
    if (onAppointmentClick) {
      onAppointmentClick(appointment);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-gradient-to-r from-blue-50 dark:from-blue-900/30 to-indigo-50 dark:to-indigo-900/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {format(weekStart, 'MMMM yyyy')}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={previousWeek}
              className="p-2"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(new Date())}
              className="px-3 py-2 text-sm"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextWeek}
              className="p-2"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Week View Calendar */}
      <div className="flex">
        {/* Time Column */}
        <div className="w-20 bg-gray-50 dark:bg-gray-900/30 border-r border-gray-200 dark:border-gray-700">
          <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              GMT+7
            </span>
          </div>
          {TIME_SLOTS.map((time) => (
            <div
              key={time}
              className="h-12 border-b border-gray-200 dark:border-gray-700 flex items-start justify-center pt-1"
            >
              <span className="text-xs font-medium text-gray-600 dark:text-gray-500">
                {(() => {
                  const hour = parseInt(time.split(':')[0]);
                  if (hour === 0) return '12:00AM';
                  if (hour === 12) return '12:00PM';
                  if (hour > 12) return `${hour - 12}:00PM`;
                  return `${hour}:00AM`;
                })()}
              </span>
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="flex-1 overflow-x-auto">
          <div className="grid grid-cols-7 min-w-full">
            {weekDays.map((day, dayIndex) => {
              const dayKey = format(day, 'yyyy-MM-dd');
              const dayAppointments = appointmentsByDay[dayKey] || [];
              const isToday = isSameDay(day, new Date());
              const isSelected = selectedDate && isSameDay(day, selectedDate);

              return (
                <div
                  key={dayKey}
                  className="border-r border-gray-200 dark:border-gray-700 last:border-r-0"
                >
                  {/* Day Header */}
                  <div
                    className={`h-16 border-b border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/30 ${
                      isSelected ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                    }`}
                    onClick={() => onDaySelect(day)}
                  >
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      {format(day, 'EEE')}
                    </span>
                    <span
                      className={`text-lg font-semibold ${
                        isToday
                          ? 'bg-blue-600 dark:bg-blue-500 text-white'
                          : isSelected
                          ? 'text-blue-600 dark:text-blue-500'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {format(day, 'd')}
                    </span>
                  </div>

                  {/* Time Slots */}
                  <div className="relative">
                    {TIME_SLOTS.map((time, timeIndex) => (
                      <div
                        key={`${dayKey}-${time}`}
                        className="h-12 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-25 dark:hover:bg-gray-900/30"
                      />
                    ))}

                    {/* Appointments */}
                    {dayAppointments.map((appointment, index) => {
                      const style = getAppointmentStyle(appointment);
                      return (
                        <div
                          key={appointment.id}
                          className="absolute left-0.5 right-0.5 z-10 cursor-pointer group"
                          style={style}
                          onClick={(e) =>
                            handleAppointmentClick(appointment, e)
                          }
                        >
                          <div
                            className={`h-full rounded-lg p-3 border-l-4 shadow-sm hover:shadow-md transition-shadow ${
                              appointment.type === VisitType.New
                                ? TREATMENT_CONFIG[VisitType.New].color
                                : appointment.type === VisitType.Followup
                                ? TREATMENT_CONFIG[VisitType.Followup].color
                                : 'bg-gray-50 dark:bg-gray-900/30 border-l-gray-500 dark:border-l-gray-700'
                            }`}
                          >
                            {/* Patient Name */}
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-5 h-5 bg-gray-400 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                                <UserIcon className="h-3 w-3 text-white" />
                              </div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                                {appointment.patientName}
                              </h4>
                            </div>
                          </div>

                          {/* Hover Tooltip */}
                          <div className="absolute left-full top-0 ml-2 w-72 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[99999]">
                            {/* Patient Header */}
                            <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <div className="w-10 h-10 bg-blue-500 dark:bg-blue-500 rounded-full flex items-center justify-center">
                                    <UserIcon className="h-5 w-5 text-white" />
                                  </div>
                                  <div
                                    className={`absolute -bottom-1 -right-1 w-4 h-4 ${
                                      TREATMENT_CONFIG[appointment.type]
                                        .dotColor
                                    } rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center`}
                                  ></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                                    {appointment.patientName}
                                  </h3>
                                  <div className="text-xs text-gray-600 dark:text-gray-500 space-y-1">
                                    <div className="flex items-center gap-1">
                                      <PhoneIcon className="h-3 w-3" />
                                      <span>+12383843</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <EnvelopeIcon className="h-3 w-3" />
                                      <span className="truncate">
                                        patient@email.com
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="p-4">
                              {/* Treatment & Doctor */}
                              <div className="grid grid-cols-2 gap-3 mb-4">
                                <div>
                                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Treatment
                                  </p>
                                  <div
                                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                                      TREATMENT_CONFIG[appointment.type].color
                                    }`}
                                  >
                                    {TREATMENT_CONFIG[appointment.type].label}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Doctor
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 dark:bg-green-500 rounded-full"></div>
                                    <span className="text-xs text-gray-700 dark:text-gray-500 truncate">
                                      Dr. {appointment.staffName}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Time Schedule */}
                              <div className="mb-4">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                                  Schedule
                                </p>
                                <div className="bg-gray-50 dark:bg-gray-900/30 rounded p-3 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-blue-500 dark:bg-blue-500 rounded-full"></div>
                                      <span className="text-xs text-gray-700 dark:text-gray-500">
                                        {
                                          TREATMENT_CONFIG[appointment.type]
                                            .label
                                        }
                                      </span>
                                    </div>
                                    <span className="text-xs font-medium text-blue-600 dark:text-blue-500 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                                      {formatTimeForAPI(appointment.startTime)}
                                    </span>
                                  </div>
                                  {appointment.type === VisitType.New && (
                                    <>
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <div className="w-2 h-2 bg-purple-500 dark:bg-purple-500 rounded-full"></div>
                                          <span className="text-xs text-gray-700 dark:text-gray-500">
                                            Prosthetic Tooth
                                          </span>
                                        </div>
                                        <span className="text-xs font-medium text-purple-600 dark:text-purple-500 bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded">
                                          {(() => {
                                            const start = new Date(
                                              `2000-01-01T${appointment.startTime}`
                                            );
                                            const next = new Date(
                                              start.getTime() + 30 * 60000
                                            );
                                            return next.toLocaleTimeString(
                                              'en-US',
                                              {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false,
                                              }
                                            );
                                          })()}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <div className="w-2 h-2 bg-green-500 dark:bg-green-500 rounded-full"></div>
                                          <span className="text-xs text-gray-700 dark:text-gray-500">
                                            Post-Surgical Care
                                          </span>
                                        </div>
                                        <span className="text-xs font-medium text-green-600 dark:text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">
                                          {(() => {
                                            const start = new Date(
                                              `2000-01-01T${appointment.startTime}`
                                            );
                                            const next = new Date(
                                              start.getTime() + 60 * 60000
                                            );
                                            return next.toLocaleTimeString(
                                              'en-US',
                                              {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false,
                                              }
                                            );
                                          })()}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-3 mb-4">
                                <Button
                                  variant="outline"
                                  className="bg-teal-100 text-teal-800"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Edit appointment logic
                                  }}
                                >
                                  <PencilIcon className="h-4 w-4" />
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  className="bg-blue-100 text-blue-800"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Start visit logic
                                  }}
                                >
                                  <ClipboardIcon className="h-4 w-4" />
                                  Start Visit
                                </Button>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-pink-100 text-pink-800"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Cancel appointment logic
                                  }}
                                >
                                  <TrashIcon className="h-3 w-3" />
                                  Cancel
                                </Button>
                              </div>

                              {/* Patient Details Button */}
                              <Button className="w-full bg-gray-100 dark:bg-gray-900/30 hover:bg-gray-200 dark:hover:bg-gray-900/50 text-gray-700 dark:text-gray-500 text-xs font-medium py-2 px-3 rounded-md border border-gray-200 dark:border-gray-700 transition-colors flex items-center justify-center gap-1">
                                See Patient Details
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </Button>

                              {/* Time Display */}
                              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-center">
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-500">
                                  {formatTimeForAPI(appointment.startTime)} -{' '}
                                  {formatTimeForAPI(appointment.endTime)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Time Indicator */}
      <div className="absolute left-20 right-0 pointer-events-none">
        {(() => {
          const now = new Date();
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();

          if (currentHour >= 0 && currentHour <= 23) {
            const position = ((currentHour - 0) * 60 + currentMinute) / 60;
            return (
              <div
                className="absolute left-0 right-0 border-t-2 border-red-500 dark:border-red-500 z-20"
                style={{ top: `${16 + position * 32}px` }}
              >
                <div className="absolute -left-2 -top-1 w-3 h-3 bg-red-500 dark:bg-red-500 rounded-full" />
                <div className="absolute left-2 -top-2 text-xs font-medium text-red-500 dark:text-red-500">
                  {format(now, 'HH:mm')}
                </div>
              </div>
            );
          }
          return null;
        })()}
      </div>
    </div>
  );
}
export default Calendar;
