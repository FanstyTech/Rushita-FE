'use client';

import {
  UserIcon,
  ClockIcon,
  UserCircleIcon,
  PencilIcon,
  ClipboardIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AppointmentListDto,
  AppointmentStatus,
  VisitType,
} from '@/lib/api/types/appointment';
import { formatTimeForAPI } from '@/utils/dateTimeUtils';
import { twMerge } from 'tailwind-merge';
const TREATMENT_CONFIG = {
  [VisitType.New]: {
    icon: '🦷',
    label: 'New Patient',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    dotColor: 'bg-blue-500',
  },
  [VisitType.Followup]: {
    icon: '🔄',
    label: 'Follow-up',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    dotColor: 'bg-purple-500',
  },
};
interface AppointmentCardProps {
  appointment: AppointmentListDto;
  columnStatus: AppointmentStatus;
  onStatusChange: (appointmentId: string, newStatus: AppointmentStatus) => void;
  onEdit: (appointment: AppointmentListDto) => void;
  onShowDetails: (appointment: AppointmentListDto) => void;
  onStartVisit: (appointmentId: string) => void;
}

export default function AppointmentCard({
  appointment,
  columnStatus,
  onStatusChange,
  onEdit,
  onShowDetails,
  onStartVisit,
}: AppointmentCardProps) {
  return (
    <div
      className="group bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-move hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData('appointmentId', appointment.id);
        e.dataTransfer.setData('currentStatus', appointment.status.toString());
      }}
      onClick={() => onShowDetails(appointment)}
    >
      {/* Appointment Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-white" />
            </div>
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 ${
                TREATMENT_CONFIG[appointment.type].dotColor
              } rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center`}
            >
              <span className="text-xs">
                {TREATMENT_CONFIG[appointment.type].icon}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {appointment.patientName}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {/* Patient ID: {appointment.patientId.slice(-6)} */}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge
            className={`text-xs px-2 py-1 ${
              TREATMENT_CONFIG[appointment.type].color
            } border`}
          >
            {TREATMENT_CONFIG[appointment.type].label}
          </Badge>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <ClockIcon className="h-4 w-4 text-gray-400" />
          <span className="font-medium">
            {formatTimeForAPI(appointment.startTime)} -{' '}
            {formatTimeForAPI(appointment.endTime)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <UserCircleIcon className="h-4 w-4 text-gray-400" />
          <span>Dr. {appointment.staffName}</span>
        </div>
        {appointment.notes && (
          <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-2 mt-2">
            {appointment.notes}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div
        className={twMerge(
          'flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700 ',
          columnStatus === AppointmentStatus.Cancelled ||
            columnStatus === AppointmentStatus.Completed
            ? 'flex-row-reverse'
            : ''
        )}
      >
        {columnStatus === AppointmentStatus.Pending && (
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40"
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange(appointment.id, AppointmentStatus.Scheduled);
            }}
          >
            <CalendarIcon className="h-3 w-3 mr-1" />
            Schedule
          </Button>
        )}
        {columnStatus === AppointmentStatus.Scheduled && (
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange(appointment.id, AppointmentStatus.Confirmed);
            }}
          >
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Confirm
          </Button>
        )}
        {columnStatus === AppointmentStatus.Confirmed && (
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/40"
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange(appointment.id, AppointmentStatus.InProgress);
            }}
          >
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Start
          </Button>
        )}
        {columnStatus === AppointmentStatus.InProgress && (
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/40"
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange(appointment.id, AppointmentStatus.Completed);
            }}
          >
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Complete
          </Button>
        )}

        {/* Secondary Actions */}
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="p-1.5 h-auto text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(appointment);
            }}
          >
            <PencilIcon className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="p-1.5 h-auto text-gray-400 hover:text-green-600 dark:hover:text-green-400"
            onClick={(e) => {
              e.stopPropagation();
              onStartVisit(appointment.id);
            }}
          >
            <ClipboardIcon className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
