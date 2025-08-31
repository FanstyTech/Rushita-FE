'use client';

import {
  CalendarIcon,
  CalendarDaysIcon,
  ViewColumnsIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import {
  AppointmentListDto,
  AppointmentStatus,
} from '@/lib/api/types/appointment';
import { useTranslation } from 'react-i18next';

interface AppointmentHeaderProps {
  appointmentsByStatus: Record<AppointmentStatus, AppointmentListDto[]>;
  viewMode: 'schedule' | 'kanban';
  setViewMode: (mode: 'schedule' | 'kanban') => void;
  handleAddNewAppointment: () => void;
}

export default function AppointmentHeader({
  appointmentsByStatus,
  viewMode,
  setViewMode,
  handleAddNewAppointment,
}: AppointmentHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        {/* Left Section - Title and Stats */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <CalendarIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('clinic.appointments.pageTitle')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('clinic.appointments.description')}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-blue-900/20 rounded-lg">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                {appointmentsByStatus[AppointmentStatus.Pending]?.length || 0}{' '}
                {t('clinic.appointments.statuses.pending')}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                {appointmentsByStatus[AppointmentStatus.Scheduled]?.length || 0}{' '}
                {t('clinic.appointments.statuses.scheduled')}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                {appointmentsByStatus[AppointmentStatus.Confirmed]?.length || 0}{' '}
                {t('clinic.appointments.statuses.confirmed')}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                {appointmentsByStatus[AppointmentStatus.InProgress]?.length ||
                  0}{' '}
                {t('clinic.appointments.statuses.inProgress')}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                {appointmentsByStatus[AppointmentStatus.Completed]?.length || 0}{' '}
                {t('clinic.appointments.statuses.completed')}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-red-700 dark:text-red-400">
                {appointmentsByStatus[AppointmentStatus.Cancelled]?.length || 0}{' '}
                {t('clinic.appointments.statuses.cancelled')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          {/* View Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <Button
              variant={viewMode === 'schedule' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('schedule')}
              className="gap-2 px-4"
            >
              <CalendarDaysIcon className="h-4 w-4" />
              {t('clinic.appointments.viewModes.schedule')}
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="gap-2 px-4"
            >
              <ViewColumnsIcon className="h-4 w-4" />
              {t('clinic.appointments.viewModes.kanban')}
            </Button>
          </div>

          <Button
            onClick={handleAddNewAppointment}
            className="gap-2 px-6 py-2.5 "
          >
            <PlusIcon className="h-4 w-4" />
            {t('clinic.appointments.actions.addNew')}
          </Button>
        </div>
      </div>
    </div>
  );
}
