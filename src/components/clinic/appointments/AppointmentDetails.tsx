import { Button } from '@/components/ui/button';
import { AppointmentListDto } from '@/lib/api/types/appointment';
import { formatTimeForAPI } from '@/utils/dateTimeUtils';
import { format } from 'date-fns';

import {
  getAppointmentStatusClass,
  getAppointmentStatusLabel,
  getVisitTypeClass,
  getVisitTypeLabel,
} from '@/utils/textUtils';
import {
  ClipboardIcon,
  ClockIcon,
  HeartIcon,
  PencilIcon,
  PhoneIcon,
  UserCircleIcon,
  UserIcon,
} from 'lucide-react';
import router from 'next/router';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';

interface AppointmentDetailsProps {
  detailAppointment: AppointmentListDto;
  setShowAppointmentDetail: (close: boolean) => void;
  handleEditAppointment: (data: AppointmentListDto) => void;
}

export default function AppointmentDetails({
  detailAppointment,
  setShowAppointmentDetail,
  handleEditAppointment,
}: AppointmentDetailsProps) {
  const { t } = useTranslation();
  console.log('detailAppointment', detailAppointment);
  return (
    <>
      {' '}
      {detailAppointment && (
        <div className="p-6 dark:bg-gray-800 dark:text-gray-100">
          {/* Modal Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {detailAppointment.patientName}
              </h2>
              <div className="flex items-center gap-3">
                <Badge
                  className={`${getVisitTypeClass(
                    detailAppointment.type
                  )} border dark:border-gray-600`}
                >
                  {getVisitTypeLabel(detailAppointment.type)}
                </Badge>
                <Badge
                  className={`${getAppointmentStatusClass(
                    detailAppointment.status
                  )} border dark:border-gray-600`}
                >
                  {getAppointmentStatusLabel(detailAppointment.status)}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowAppointmentDetail(false);
                  handleEditAppointment(detailAppointment);
                }}
                className="gap-2 dark:border-gray-600 dark:text-gray-100"
              >
                <PencilIcon className="h-4 w-4" />
                {t('clinic.appointments.actions.edit')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowAppointmentDetail(false);
                  router.push(
                    `/clinic/doctor/visits/add/${detailAppointment?.id}`
                  );
                }}
                className="gap-2 dark:border-gray-600 dark:text-gray-100"
              >
                <ClipboardIcon className="h-4 w-4" />
                {t('clinic.appointments.details.startVisit')}
              </Button>
            </div>
          </div>

          {/* Appointment Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Date & Time */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-700 dark:to-indigo-800 rounded-xl p-4 border border-blue-200 dark:border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <ClockIcon className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {t('clinic.appointments.details.dateTime')}
                </h3>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {format(
                    new Date(detailAppointment.date),
                    'EEEE, MMMM d, yyyy'
                  )}
                </p>
                <p className="text-blue-600 font-medium dark:text-blue-400">
                  {formatTimeForAPI(detailAppointment.startTime)} -{' '}
                  {formatTimeForAPI(detailAppointment.endTime)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('clinic.appointments.details.duration')}:{' '}
                  {(() => {
                    const start = new Date(
                      `2000-01-01T${detailAppointment.startTime}`
                    );
                    const end = new Date(
                      `2000-01-01T${detailAppointment.endTime}`
                    );
                    const diff =
                      (end.getTime() - start.getTime()) / (1000 * 60);
                    return `${diff} ${t(
                      'clinic.appointments.details.minutes'
                    )}`;
                  })()}
                </p>
              </div>
            </div>

            {/* Doctor Information */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-700 dark:to-green-800 rounded-xl p-4 border border-emerald-200 dark:border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <UserCircleIcon className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {t('clinic.appointments.details.assignedDoctor')}
                </h3>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Dr. {detailAppointment.staffName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('clinic.appointments.details.staffId')}:
                  {/* {detailAppointment.staffId.slice(-6)} */}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-emerald-600 font-medium dark:text-emerald-400">
                    {t('clinic.appointments.details.available')}
                  </span>
                </div>
              </div>
            </div>

            {/* Patient Information */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-700 dark:to-pink-800 rounded-xl p-4 border border-purple-200 dark:border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <UserIcon className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {t('clinic.appointments.details.patientDetails')}
                </h3>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {detailAppointment.patientName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('clinic.appointments.details.patientId')}:
                  {/* {detailAppointment.patientId.slice(-8)} */}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <PhoneIcon className="h-3 w-3 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t('clinic.appointments.details.contactAvailable')}
                  </span>
                </div>
              </div>
            </div>

            {/* Treatment Details */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-700 dark:to-orange-800 rounded-xl p-4 border border-amber-200 dark:border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <HeartIcon className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {t('clinic.appointments.details.treatment')}
                </h3>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {getVisitTypeLabel(detailAppointment.type)}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className={`w-2 h-2 ${getVisitTypeClass(
                      detailAppointment.type
                    )} rounded-full`}
                  ></div>
                  <span className="text-sm text-amber-600 font-medium dark:text-amber-400">
                    {getAppointmentStatusLabel(detailAppointment.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {detailAppointment.notes && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <ClipboardIcon className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {t('clinic.appointments.details.notes')}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {detailAppointment.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
