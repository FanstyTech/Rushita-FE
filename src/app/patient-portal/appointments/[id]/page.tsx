'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  Building,
  FileText,
  MapPin,
  Phone,
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
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Dummy appointment data
const appointments = [
  {
    id: 'app-1',
    doctorName: 'د. أحمد محمد',
    doctorSpecialty: 'طب عام',
    doctorImage: '/images/doctors/doctor-1.jpg',
    clinicName: 'عيادة الطب العام',
    clinicAddress: 'الطابق الثاني، المبنى الرئيسي',
    clinicPhone: '0123456789',
    date: '2025-08-10',
    time: '10:00',
    duration: 30, // minutes
    status: 'confirmed', // confirmed, cancelled, completed
    notes: 'فحص دوري',
    createdAt: '2025-07-30',
    instructions: 'يرجى إحضار التقارير الطبية السابقة وبطاقة التأمين.',
    canCancel: true,
    canReschedule: true,
  },
  {
    id: 'app-2',
    doctorName: 'د. سارة خالد',
    doctorSpecialty: 'أسنان',
    doctorImage: '/images/doctors/doctor-2.jpg',
    clinicName: 'عيادة الأسنان',
    clinicAddress: 'الطابق الثالث، المبنى الرئيسي',
    clinicPhone: '0123456790',
    date: '2025-08-15',
    time: '14:30',
    duration: 45, // minutes
    status: 'confirmed',
    notes: 'تنظيف أسنان',
    createdAt: '2025-08-01',
    instructions: 'يرجى تجنب تناول الطعام قبل الموعد بساعتين.',
    canCancel: true,
    canReschedule: true,
  },
  {
    id: 'app-3',
    doctorName: 'د. محمد علي',
    doctorSpecialty: 'جلدية',
    doctorImage: '/images/doctors/doctor-3.jpg',
    clinicName: 'عيادة الجلدية',
    clinicAddress: 'الطابق الأول، مبنى العيادات التخصصية',
    clinicPhone: '0123456791',
    date: '2025-07-25',
    time: '09:15',
    duration: 30, // minutes
    status: 'completed',
    notes: 'فحص حساسية جلدية',
    createdAt: '2025-07-15',
    instructions: '',
    canCancel: false,
    canReschedule: false,
  },
  {
    id: 'app-4',
    doctorName: 'د. فاطمة أحمد',
    doctorSpecialty: 'عيون',
    doctorImage: '/images/doctors/doctor-4.jpg',
    clinicName: 'عيادة العيون',
    clinicAddress: 'الطابق الثاني، مبنى العيادات التخصصية',
    clinicPhone: '0123456792',
    date: '2025-07-20',
    time: '11:30',
    duration: 30, // minutes
    status: 'cancelled',
    notes: 'فحص نظر',
    createdAt: '2025-07-10',
    instructions: '',
    canCancel: false,
    canReschedule: false,
  },
  {
    id: 'app-5',
    doctorName: 'د. خالد محمود',
    doctorSpecialty: 'باطنية',
    doctorImage: '/images/doctors/doctor-5.jpg',
    clinicName: 'عيادة الباطنية',
    clinicAddress: 'الطابق الرابع، المبنى الرئيسي',
    clinicPhone: '0123456793',
    date: '2025-08-20',
    time: '13:00',
    duration: 30, // minutes
    status: 'confirmed',
    notes: 'متابعة حالة',
    createdAt: '2025-08-02',
    instructions: 'يرجى الصيام لمدة 8 ساعات قبل الموعد.',
    canCancel: true,
    canReschedule: true,
  },
];

// Get status badge variant and label
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'confirmed':
      return {
        variant: 'outline',
        label: 'مؤكد',
        color: 'text-green-500',
      };
    case 'cancelled':
      return {
        variant: 'destructive',
        label: 'ملغي',
        color: 'text-destructive',
      };
    case 'completed':
      return {
        variant: 'secondary',
        label: 'مكتمل',
        color: 'text-secondary-foreground',
      };
    default:
      return {
        variant: 'outline',
        label: 'غير معروف',
        color: 'text-muted-foreground',
      };
  }
};

export default function AppointmentDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);

  // Find appointment by ID
  const appointment = appointments.find((app) => app.id === params.id);

  // Format date to Arabic format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Handle appointment cancellation
  const handleCancelAppointment = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowCancelDialog(false);
      // Redirect to appointments page
      router.push('/patient-portal/appointments');
    }, 1500);
  };

  // Handle appointment rescheduling
  const handleRescheduleAppointment = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowRescheduleDialog(false);
      // Redirect to booking page with pre-filled data
      router.push(`/patient-portal/appointments/book?reschedule=${params.id}`);
    }, 1500);
  };

  // If appointment not found
  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">الموعد غير موجود</h1>
        <p className="text-muted-foreground mb-6">
          لم يتم العثور على الموعد المطلوب. قد يكون تم حذفه أو أن الرابط غير
          صحيح.
        </p>
        <Button asChild>
          <Link href="/patient-portal/appointments">العودة إلى المواعيد</Link>
        </Button>
      </div>
    );
  }

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
            <span className="sr-only">العودة</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">تفاصيل الموعد</h1>
          <p className="text-muted-foreground">عرض تفاصيل الموعد وإدارته</p>
        </div>
      </div>

      {/* Appointment status */}
      <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`rounded-full p-3 ${
                  appointment.status === 'confirmed'
                    ? 'bg-green-500/10'
                    : appointment.status === 'cancelled'
                    ? 'bg-destructive/10'
                    : 'bg-secondary/10'
                }`}
              >
                <Calendar
                  className={`h-6 w-6 ${
                    appointment.status === 'confirmed'
                      ? 'text-green-500'
                      : appointment.status === 'cancelled'
                      ? 'text-destructive'
                      : 'text-secondary-foreground'
                  }`}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {appointment.doctorName}
                </h2>
                <p className="text-muted-foreground">
                  {appointment.doctorSpecialty} - {appointment.clinicName}
                </p>
              </div>
            </div>
            <Badge
              variant={
                appointment.status === 'confirmed'
                  ? 'outline'
                  : appointment.status === 'cancelled'
                  ? 'destructive'
                  : 'secondary'
              }
              className={`text-sm px-3 py-1 ${
                appointment.status === 'confirmed'
                  ? 'border-green-500/50 text-green-500 bg-green-500/10'
                  : appointment.status === 'cancelled'
                  ? ''
                  : 'border-secondary/50'
              }`}
            >
              {getStatusBadge(appointment.status).label}
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
              معلومات الموعد
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-full p-1 bg-blue-500/10 mt-0.5">
                <Calendar className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">التاريخ</p>
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
                <p className="font-medium">الوقت</p>
                <p className="text-muted-foreground">
                  {appointment.time} ({appointment.duration} دقيقة)
                </p>
              </div>
            </div>

            {appointment.notes && (
              <div className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-indigo-500/10 mt-0.5">
                  <FileText className="h-4 w-4 text-indigo-500" />
                </div>
                <div>
                  <p className="font-medium">ملاحظات</p>
                  <p className="text-muted-foreground">{appointment.notes}</p>
                </div>
              </div>
            )}

            <Separator className="my-2 bg-border/50" />

            <div className="space-y-3 pt-2">
              {appointment.status === 'confirmed' && appointment.canCancel && (
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/10"
                  onClick={() => setShowCancelDialog(true)}
                >
                  <X className="mr-2 h-4 w-4" />
                  إلغاء الموعد
                </Button>
              )}

              {appointment.status === 'confirmed' &&
                appointment.canReschedule && (
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/20 text-blue-500 hover:bg-blue-500/10"
                    onClick={() => setShowRescheduleDialog(true)}
                  >
                    <CalendarRange className="mr-2 h-4 w-4" />
                    إعادة جدولة الموعد
                  </Button>
                )}

              {appointment.status === 'completed' && (
                <Button
                  variant="outline"
                  className="w-full justify-start border-green-500/20 text-green-500 hover:bg-green-500/10"
                  asChild
                >
                  <Link href="/patient-portal/appointments/book">
                    <Calendar className="mr-2 h-4 w-4" />
                    حجز موعد متابعة
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right column: Doctor and clinic info */}
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 md:col-span-2">
          <CardHeader className="bg-muted/30 backdrop-blur-sm border-b border-border/50 pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="rounded-full p-1 bg-purple-500/10">
                <User className="h-4 w-4 text-purple-500" />
              </div>
              تفاصيل العيادة والطبيب
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
                  {appointment.doctorSpecialty}
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
                  <p className="font-medium">العيادة</p>
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
                  <p className="font-medium">العنوان</p>
                  <p className="text-muted-foreground">
                    {appointment.clinicAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-blue-500/10 mt-0.5">
                  <Phone className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">رقم الهاتف</p>
                  <p className="text-muted-foreground">
                    {appointment.clinicPhone}
                  </p>
                </div>
              </div>
            </div>

            {appointment.instructions && (
              <>
                <Separator className="bg-border/50" />
                <div className="rounded-md bg-muted/30 p-4 border border-border/50">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1 bg-amber-500/10 mt-0.5">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium">تعليمات</p>
                      <p className="text-muted-foreground">
                        {appointment.instructions}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إلغاء الموعد</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في إلغاء هذا الموعد؟ لا يمكن التراجع عن هذا
              الإجراء.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">سبب الإلغاء (اختياري)</Label>
              <TextArea
                id="reason"
                placeholder="يرجى ذكر سبب الإلغاء..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              disabled={isLoading}
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelAppointment}
              disabled={isLoading}
            >
              {isLoading ? 'جاري الإلغاء...' : 'تأكيد الإلغاء'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Dialog */}
      <Dialog
        open={showRescheduleDialog}
        onOpenChange={setShowRescheduleDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إعادة جدولة الموعد</DialogTitle>
            <DialogDescription>
              سيتم توجيهك إلى صفحة حجز المواعيد لاختيار وقت جديد.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRescheduleDialog(false)}
              disabled={isLoading}
            >
              إلغاء
            </Button>
            <Button onClick={handleRescheduleAppointment} disabled={isLoading}>
              {isLoading ? 'جاري التوجيه...' : 'متابعة'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
