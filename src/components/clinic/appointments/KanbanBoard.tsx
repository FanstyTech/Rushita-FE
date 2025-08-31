'use client';

import {
  AppointmentListDto,
  AppointmentStatus,
} from '@/lib/api/types/appointment';
import AppointmentCard from './AppointmentCard';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon as ClockSolidIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { CircleDashed } from 'lucide-react';

interface KanbanBoardProps {
  appointmentsByStatus: Record<AppointmentStatus, AppointmentListDto[]>;
  filteredAppointments: AppointmentListDto[];
  onStatusChange: (appointmentId: string, newStatus: AppointmentStatus) => void;
  onEdit: (appointment: AppointmentListDto) => void;
  onShowDetails: (appointment: AppointmentListDto) => void;
  onStartVisit: (appointmentId: string) => void;
}

export default function KanbanBoard({
  appointmentsByStatus,
  filteredAppointments,
  onStatusChange,
  onEdit,
  onShowDetails,
  onStartVisit,
}: KanbanBoardProps) {
  const { t } = useTranslation();

  const KANBAN_COLUMNS = [
    {
      id: 'pending',
      title: t('clinic.appointments.kanban.pending'),
      status: AppointmentStatus.Pending,
      gradient: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      icon: CircleDashed,
      iconColor: 'text-gray-600',
      count: 0,
    },
    {
      id: 'scheduled',
      title: t('clinic.appointments.kanban.scheduled'),
      status: AppointmentStatus.Scheduled,
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      icon: ClockSolidIcon,
      iconColor: 'text-blue-600',
      count: 0,
    },
    {
      id: 'confirmed',
      title: t('clinic.appointments.kanban.confirmed'),
      status: AppointmentStatus.Confirmed,
      gradient: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      icon: CheckCircleIcon,
      iconColor: 'text-emerald-600',
      count: 0,
    },
    {
      id: 'in-progress',
      title: t('clinic.appointments.kanban.inProgress'),
      status: AppointmentStatus.InProgress,
      gradient: 'from-amber-500 to-amber-600',
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
      borderColor: 'border-amber-200',
      icon: ExclamationTriangleIcon,
      iconColor: 'text-amber-600',
      count: 0,
    },
    {
      id: 'completed',
      title: t('clinic.appointments.kanban.completed'),
      status: AppointmentStatus.Completed,
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      borderColor: 'border-green-200',
      icon: CheckCircleIcon,
      iconColor: 'text-green-600',
      count: 0,
    },
    {
      id: 'cancelled',
      title: t('clinic.appointments.kanban.cancelled'),
      status: AppointmentStatus.Cancelled,
      gradient: 'from-red-500 to-red-600',
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      borderColor: 'border-red-200',
      icon: XCircleIcon,
      iconColor: 'text-red-600',
      count: 0,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex gap-6 pb-6 px-2 overflow-x-auto custom-scrollbar">
        {KANBAN_COLUMNS.map((column) => {
          const appointments = appointmentsByStatus[column.status] || [];
          return (
            <div key={column.id} className="flex flex-col w-80 flex-shrink-0">
              {/* Column Header */}
              <div className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <column.icon className={`h-4 w-4 ${column.iconColor}`} />
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {column.title}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-medium ${column.iconColor} bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded`}
                  >
                    {appointments.length}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1">
                <div
                  className={`bg-gradient-to-r ${column.gradient} h-1 transition-all duration-300`}
                  style={{
                    width: `${Math.min(
                      (appointments.length /
                        Math.max(filteredAppointments.length, 1)) *
                        100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>

              {/* Column Content */}
              <div
                className="bg-white dark:bg-gray-800 border-l-2 border-r-2 border-b-2 border-gray-200 dark:border-gray-700 rounded-b-lg p-4 min-h-96 flex-1 max-h-[500px] overflow-y-auto custom-scrollbar"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add(
                    'bg-blue-50',
                    'dark:bg-blue-900/20',
                    'border-blue-300',
                    'dark:border-blue-600'
                  );
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove(
                    'bg-blue-50',
                    'dark:bg-blue-900/20',
                    'border-blue-300',
                    'dark:border-blue-600'
                  );
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove(
                    'bg-blue-50',
                    'dark:bg-blue-900/20',
                    'border-blue-300',
                    'dark:border-blue-600'
                  );

                  const appointmentId = e.dataTransfer.getData('appointmentId');
                  const currentStatusStr =
                    e.dataTransfer.getData('currentStatus');

                  // convert string → number
                  const currentStatusNum = Number(currentStatusStr);

                  // validate it's actually a valid AppointmentStatus
                  const isValidStatus =
                    Object.values(AppointmentStatus).includes(currentStatusNum);

                  if (
                    appointmentId &&
                    isValidStatus &&
                    currentStatusNum !== column.status
                  ) {
                    onStatusChange(appointmentId, column.status);
                  }
                }}
              >
                <div className="space-y-3">
                  {appointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      columnStatus={column.status}
                      onStatusChange={onStatusChange}
                      onEdit={onEdit}
                      onShowDetails={onShowDetails}
                      onStartVisit={onStartVisit}
                    />
                  ))}

                  {/* Empty State */}
                  {appointments.length === 0 && (
                    <div className="text-center py-8">
                      <column.icon
                        className={`h-12 w-12 mx-auto mb-3 ${column.iconColor} opacity-30`}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('clinic.appointments.messages.noAppointments')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
