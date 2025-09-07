'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  Clock,
  User,
  Building,
  FileText,
  MapPin,
  AlertTriangle,
  ArrowLeft,
  CalendarRange,
  X,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TextArea } from '@/components/common/form';
import { Input } from '@/components/common/form';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import { getAppointmentStatusStyle } from '@/utils/textUtils';
import { AppointmentStatus } from '@/lib/api/types/appointment';
import { formatDate } from '@/utils/dateTimeUtils';
import { AppointmentDetailsSkeleton } from '@/components/skeletons/AppointmentDetailsSkeleton';
import Modal from '@/components/common/Modal';

export default function AppointmentDetailsPage() {
  const { t } = useTranslation();
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);

  // Follow-up appointment form state
  const [followUpData, setFollowUpData] = useState({
    preferredDate: '',
    appointmentReason: '',
  });

  // Get appointment details from API
  const {
    useAppointmentDetails,
    updatePatientAppointment,
    bookFollowUpAppointment,
  } = useClinicPatients();
  const {
    data: appointment,
    isLoading: isLoadingAppointment,
    error,
  } = useAppointmentDetails(id);

  // Handle appointment cancellation
  const handleCancelAppointment = async () => {
    if (!appointment) return;

    await updatePatientAppointment.mutateAsync({
      id: appointment.id,
      status: AppointmentStatus.Cancelled,
      cancellationReason: cancelReason,
    });

    setShowCancelModal(false);
    setCancelReason('');
    router.push('/patient-portal/appointments');
  };

  // Handle appointment rescheduling
  const handleRescheduleAppointment = () => {
    // Simulate API call
    setTimeout(() => {
      setShowRescheduleModal(false);
      // Redirect to booking page with pre-filled data
      router.push(`/patient-portal/appointments/book?reschedule=${id}`);
    }, 1500);
  };

  // Handle booking follow-up appointment
  const handleBookFollowUp = async () => {
    if (!appointment) return;

    await bookFollowUpAppointment.mutateAsync({
      originalAppointmentId: appointment.id,
      preferredDate: followUpData.preferredDate || undefined,
      appointmentReason: followUpData.appointmentReason,
    });
    setShowFollowUpModal(false);
    router.push('/patient-portal/appointments');
  };

  // Reset follow-up form when modal opens
  const handleOpenFollowUpModal = () => {
    if (appointment) {
      setFollowUpData({
        preferredDate: '',
        appointmentReason: t(
          'patientPortal.appointments.details.modals.followUp.reasonDefault',
          {
            reason:
              appointment.notes ||
              t(
                'patientPortal.appointments.details.modals.followUp.reasonFallback'
              ),
          }
        ),
      });
    }
    setShowFollowUpModal(true);
  };

  // Loading state
  if (isLoadingAppointment) {
    return <AppointmentDetailsSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">
          {t('patientPortal.appointments.details.errors.title')}
        </h1>
        <p className="text-muted-foreground mb-6">
          {error.message ||
            t('patientPortal.appointments.details.errors.loadingMessage')}
        </p>
        <Button asChild>
          <Link href="/patient-portal/appointments">
            {t('patientPortal.appointments.details.errors.backToAppointments')}
          </Link>
        </Button>
      </div>
    );
  }

  // If appointment not found
  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">
          {t('patientPortal.appointments.details.notFound.title')}
        </h1>
        <p className="text-muted-foreground mb-6">
          {t('patientPortal.appointments.details.notFound.message')}
        </p>
        <Button asChild>
          <Link href="/patient-portal/appointments">
            {t(
              'patientPortal.appointments.details.notFound.backToAppointments'
            )}
          </Link>
        </Button>
      </div>
    );
  }

  const statusStyle = getAppointmentStatusStyle(appointment.status);
  const canCancel = appointment.status == AppointmentStatus.Pending;
  const canReschedule = false;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          asChild
          className="rounded-full border-border/50 hover:bg-muted/50"
        >
          <Link href="/patient-portal/appointments">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">
              {t('patientPortal.appointments.details.backButton')}
            </span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t('patientPortal.appointments.details.pageTitle')}
          </h1>
          <p className="text-muted-foreground">
            {t('patientPortal.appointments.details.pageSubtitle')}
          </p>
        </div>
      </div>

      {/* Appointment status */}
      <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className={`rounded-full p-3 ${statusStyle.bgClass}`}>
                <Calendar className={`h-6 w-6 ${statusStyle.textClass}`} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {appointment.doctorName}
                </h2>
                <p className="text-muted-foreground">
                  {appointment.doctorSpecialization} - {appointment.clinicName}
                </p>
              </div>
            </div>
            <Badge className={`text-sm px-3 py-1 ${statusStyle.className}`}>
              {statusStyle.label}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Appointment details */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left column: Date, time, and actions */}
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 md:col-span-1">
          <CardHeader className="bg-muted/30 backdrop-blur-sm border-b border-border/50 pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="rounded-full p-1 bg-blue-500/10">
                <Calendar className="h-4 w-4 text-blue-500" />
              </div>
              {t('patientPortal.appointments.details.appointmentInfo.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-full p-1 bg-blue-500/10 mt-0.5">
                <Calendar className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">
                  {t('patientPortal.appointments.details.appointmentInfo.date')}
                </p>
                <p className="text-muted-foreground">
                  {formatDate(appointment.date)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-full p-1 bg-amber-500/10 mt-0.5">
                <Clock className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="font-medium">
                  {t('patientPortal.appointments.details.appointmentInfo.time')}
                </p>
                <p className="text-muted-foreground">
                  {appointment.timeRange}{' '}
                </p>
              </div>
            </div>

            {appointment.notes && (
              <div className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-indigo-500/10 mt-0.5">
                  <FileText className="h-4 w-4 text-indigo-500" />
                </div>
                <div>
                  <p className="font-medium">
                    {t(
                      'patientPortal.appointments.details.appointmentInfo.notes'
                    )}
                  </p>
                  <p className="text-muted-foreground">{appointment.notes}</p>
                </div>
              </div>
            )}

            {appointment.cancellationReason && (
              <div className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-red-500/10 mt-0.5">
                  <X className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="font-medium">
                    {t(
                      'patientPortal.appointments.details.appointmentInfo.cancellationReason'
                    )}
                  </p>
                  <p className="text-muted-foreground">
                    {appointment.cancellationReason}
                  </p>
                </div>
              </div>
            )}

            <Separator className="my-2 bg-border/50" />

            <div className="space-y-3 pt-2">
              {canCancel && (
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive  hover:text-destructive-800 border-destructive/20 hover:bg-destructive/10"
                  onClick={() => setShowCancelModal(true)}
                  disabled={updatePatientAppointment.isPending}
                >
                  <X className="mr-2 h-4 w-4" />
                  {updatePatientAppointment.isPending
                    ? t('patientPortal.appointments.details.actions.canceling')
                    : t('patientPortal.appointments.details.actions.cancel')}
                </Button>
              )}

              {canReschedule && (
                <Button
                  variant="outline"
                  className="w-full justify-start border-blue-500/20 text-blue-500 hover:bg-blue-500/10"
                  onClick={() => setShowRescheduleModal(true)}
                >
                  <CalendarRange className="mr-2 h-4 w-4" />
                  {t('patientPortal.appointments.details.actions.reschedule')}
                </Button>
              )}

              {/* Follow-up appointment button */}
              {/* {appointment.status == AppointmentStatus.Completed && ( */}
              <Button
                variant="outline"
                className="w-full justify-start hover:text-green-800 border-green-500/20 text-green-500 hover:bg-green-500/10"
                onClick={handleOpenFollowUpModal}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {t('patientPortal.appointments.details.actions.bookFollowUp')}
              </Button>
              {/* )} */}
            </div>
          </CardContent>
        </Card>

        {/* Right column: Doctor and clinic info */}
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 md:col-span-2">
          <CardHeader className="bg-muted/30 backdrop-blur-sm border-b border-border/50 pb-3">
            <CardTitle className="flex items-center gap-2 text-lg ">
              <div className="rounded-full p-1 bg-purple-500/10">
                <User className="h-4 w-4 text-purple-500" />
              </div>
              {t('patientPortal.appointments.details.clinicDoctorInfo.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-5">
            {/* Doctor info */}
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center overflow-hidden border border-border/50">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {appointment.doctorName}
                </h3>
                <p className="text-muted-foreground">
                  {appointment.doctorSpecialization}
                </p>
              </div>
            </div>

            <Separator className="bg-border/50" />

            {/* Clinic info */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-green-500/10 mt-0.5">
                  <Building className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">
                    {t(
                      'patientPortal.appointments.details.clinicDoctorInfo.clinic'
                    )}
                  </p>
                  <p className="text-muted-foreground">
                    {appointment.clinicName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-red-500/10 mt-0.5">
                  <MapPin className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="font-medium">
                    {t(
                      'patientPortal.appointments.details.clinicDoctorInfo.address'
                    )}
                  </p>
                  <p className="text-muted-foreground">
                    {appointment.clinicAddress || '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* Appointment number */}
            <div className="flex items-start gap-3">
              <div className="rounded-full p-1 bg-blue-500/10 mt-0.5">
                <FileText className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">
                  {t(
                    'patientPortal.appointments.details.appointmentInfo.appointmentNumber'
                  )}
                </p>
                <p className="text-muted-foreground">
                  {appointment.appointmentNumber}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cancel Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title={t('patientPortal.appointments.details.modals.cancel.title')}
        maxWidth="2xl"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCancelModal(false)}
              disabled={updatePatientAppointment.isPending}
            >
              {t(
                'patientPortal.appointments.details.modals.cancel.cancelButton'
              )}
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelAppointment}
              isLoading={updatePatientAppointment.isPending}
            >
              {t(
                'patientPortal.appointments.details.modals.cancel.confirmButton'
              )}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            {t('patientPortal.appointments.details.modals.cancel.message')}
          </p>
          <div className="space-y-2">
            <TextArea
              id="reason"
              label={t(
                'patientPortal.appointments.details.modals.cancel.reasonLabel'
              )}
              placeholder={t(
                'patientPortal.appointments.details.modals.cancel.reasonPlaceholder'
              )}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
      </Modal>

      {/* Reschedule Modal */}
      <Modal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        title={t('patientPortal.appointments.details.modals.reschedule.title')}
        maxWidth="2xl"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowRescheduleModal(false)}
              disabled={updatePatientAppointment.isPending}
            >
              {t(
                'patientPortal.appointments.details.modals.reschedule.cancelButton'
              )}
            </Button>
            <Button
              onClick={handleRescheduleAppointment}
              isLoading={updatePatientAppointment.isPending}
            >
              {t(
                'patientPortal.appointments.details.modals.reschedule.continueButton'
              )}
            </Button>
          </div>
        }
      >
        <p className="text-muted-foreground">
          {t('patientPortal.appointments.details.modals.reschedule.message')}
        </p>
      </Modal>

      {/* Follow-up Appointment Modal */}
      <Modal
        isOpen={showFollowUpModal}
        onClose={() => setShowFollowUpModal(false)}
        title={t('patientPortal.appointments.details.modals.followUp.title')}
        maxWidth="2xl"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFollowUpModal(false)}
              disabled={bookFollowUpAppointment.isPending}
            >
              {t(
                'patientPortal.appointments.details.modals.followUp.cancelButton'
              )}
            </Button>
            <Button
              onClick={handleBookFollowUp}
              isLoading={bookFollowUpAppointment.isPending}
            >
              {t(
                'patientPortal.appointments.details.modals.followUp.bookButton'
              )}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            {t('patientPortal.appointments.details.modals.followUp.message')}
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              type="date"
              label={t(
                'patientPortal.appointments.details.modals.followUp.preferredDateLabel'
              )}
              value={followUpData.preferredDate}
              onChange={(e) =>
                setFollowUpData((prev) => ({
                  ...prev,
                  preferredDate: e.target.value,
                }))
              }
              min={new Date().toISOString().split('T')[0]} // Today as minimum date
            />
          </div>

          <TextArea
            label={t(
              'patientPortal.appointments.details.modals.followUp.reasonLabel'
            )}
            placeholder={t(
              'patientPortal.appointments.details.modals.followUp.reasonPlaceholder'
            )}
            value={followUpData.appointmentReason}
            onChange={(e) =>
              setFollowUpData((prev) => ({
                ...prev,
                appointmentReason: e.target.value,
              }))
            }
            className="min-h-[100px]"
          />

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>
                {t(
                  'patientPortal.appointments.details.modals.followUp.noteLabel'
                )}
              </strong>{' '}
              {t('patientPortal.appointments.details.modals.followUp.note')}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
