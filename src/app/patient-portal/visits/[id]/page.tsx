'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  Building,
  FileText,
  ArrowLeft,
  Stethoscope,
  Pill,
  Activity,
  Download,
  Printer,
  Share2,
  Info,
  AlertCircle,
  FlaskConical,
  Scan,
  Loader2,
  SquareActivity,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import { cn } from '@/lib/utils';
import Skeleton from '@/components/ui/Skeleton';
import {
  getFrequencyTypeClass,
  getFrequencyTypeLabel,
  getTestStatusLabel,
  getTestStatusColor,
} from '@/utils/textUtils';
import { TestStatus } from '@/lib/api/types/visit-lab-test';

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// Visit Details Skeleton Component
function VisitDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page header skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2 w-full md:w-2/3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      {/* Visit summary card skeleton */}
      <div>
        <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
          <CardHeader className="bg-muted/30 backdrop-blur-sm">
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Visit date and doctor info skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                <Skeleton className="h-4 w-40 mb-3" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                <Skeleton className="h-4 w-40 mb-3" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnosis section skeleton */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-6 w-1" />
                <Skeleton className="h-6 w-40" />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-xl bg-muted/20 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4 mt-2" />
                </div>
                <div className="rounded-xl bg-muted/20 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4 mt-2" />
                </div>
              </div>
            </div>

            {/* Vitals section skeleton */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-6 w-1" />
                <Skeleton className="h-6 w-40" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 border border-border/30"
                    >
                      <Skeleton className="h-9 w-9 rounded-full mx-auto mb-2" />
                      <Skeleton className="h-3 w-20 mx-auto" />
                      <Skeleton className="h-5 w-12 mx-auto mt-2" />
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs skeleton */}
      <div>
        <div className="grid grid-cols-4 mb-4 w-full sm:w-auto h-full">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-md" />
            ))}
        </div>

        {/* Tab content skeleton */}
        <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
          <CardHeader className="bg-muted/30 backdrop-blur-sm">
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-muted/20 backdrop-blur-sm rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div>
                          <Skeleton className="h-5 w-40 mb-2" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-lg bg-muted/30 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                        <Skeleton className="h-3 w-full mt-2" />
                      </div>
                      <div className="rounded-lg bg-muted/30 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                        <Skeleton className="h-3 w-full mt-2" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function VisitDetailsPage() {
  const params = useParams();
  const visitId = params?.id as string;

  // Get visit details from API
  const {
    data: visit,
    isLoading,
    error,
  } = useClinicPatients().useVisitDetails(visitId);

  // Format date to Arabic format
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Format time
  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Handle error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">خطأ في تحميل البيانات</h1>
        <p className="text-muted-foreground mb-6">
          حدث خطأ أثناء تحميل تفاصيل الزيارة. يرجى المحاولة مرة أخرى.
        </p>
        <div className="flex gap-2">
          <Button onClick={() => window.location.reload()}>
            <Loader2 className="h-4 w-4 mr-2" />
            إعادة المحاولة
          </Button>
          <Button variant="outline" asChild>
            <Link href="/patient-portal/visits">العودة إلى الزيارات</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Show loading skeleton
  if (isLoading) {
    return <VisitDetailsSkeleton />;
  }

  // Show not found
  if (!visit) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">الزيارة غير موجودة</h1>
        <p className="text-muted-foreground mb-6">
          لم يتم العثور على الزيارة المطلوبة. قد تكون تم حذفها أو أن الرابط غير
          صحيح.
        </p>
        <Button asChild>
          <Link href="/patient-portal/visits">العودة إلى الزيارات</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Page header */}
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          asChild
          className="rounded-full shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Link href="/patient-portal/visits">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">العودة</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            تفاصيل الزيارة الطبية
          </h1>
          <p className="text-muted-foreground">
            عرض تفاصيل الزيارة والتشخيص والوصفات الطبية
          </p>
        </div>
      </motion.div>

      {/* Visit details tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="details" className="w-full">
          <TabsList
            defaultValue="details"
            className="grid grid-cols-4 mb-5 w-full sm:w-auto h-full"
          >
            <TabsTrigger value="details" className="py-4">
              التفاصيل
            </TabsTrigger>
            <TabsTrigger value="medications" className="py-4">
              الأدوية
            </TabsTrigger>
            <TabsTrigger value="lab-tests" className="py-4">
              الفحوصات المخبريه
            </TabsTrigger>
            <TabsTrigger value="ray-tests" className="py-4">
              فحوصات الاشعه
            </TabsTrigger>
          </TabsList>

          {/* Details tab */}
          <TabsContent value="details" className="space-y-6">
            <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
              <CardHeader className="bg-muted/30 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  معلومات الزيارة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Visit date and time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      معلومات الزيارة
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-blue-500/10">
                          <Calendar className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">التاريخ</p>
                          <p className="text-muted-foreground">
                            {formatDate(visit.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-blue-500/10">
                          <Clock className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">الوقت</p>
                          <p className="text-muted-foreground">
                            {formatTime(visit.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-blue-500/10">
                          <FileText className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">رقم الزيارة</p>
                          <p className="text-muted-foreground">
                            {visit.visitNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Doctor and clinic info */}
                  <div className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      معلومات الطبيب والعيادة
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-blue-500/10">
                          <User className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">الطبيب</p>
                          <p className="text-muted-foreground">
                            {visit.doctorName}
                            {visit.doctorSpecialization &&
                              ` - ${visit.doctorSpecialization}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-blue-500/10">
                          <Building className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">العيادة</p>
                          <p className="text-muted-foreground">
                            {visit.clinicName}
                          </p>
                        </div>
                      </div>

                      {visit.appointmentNumber && (
                        <div className="flex items-center gap-3">
                          <div className="rounded-full p-2 bg-blue-500/10">
                            <Calendar className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">رقم الموعد</p>
                            <p className="text-muted-foreground">
                              {visit.appointmentNumber}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Symptoms and Notes */}
                <div className="my-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <div className="h-6 w-1 bg-primary rounded-full"></div>
                    الأعراض والملاحظات
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {visit.symptoms && (
                      <div className="rounded-xl bg-muted/20 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="rounded-full p-1.5 bg-amber-500/10">
                            <Activity className="h-4 w-4 text-amber-500" />
                          </div>
                          <p className="font-medium">الأعراض</p>
                        </div>
                        <p className="text-muted-foreground">
                          {visit.symptoms}
                        </p>
                      </div>
                    )}

                    {visit.notes && (
                      <div className="rounded-xl bg-muted/20 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="rounded-full p-1.5 bg-blue-500/10">
                            <FileText className="h-4 w-4 text-blue-500" />
                          </div>
                          <p className="font-medium">ملاحظات الطبيب</p>
                        </div>
                        <p className="text-muted-foreground">{visit.notes}</p>
                      </div>
                    )}

                    {visit.followUpInstructions && (
                      <div className="rounded-xl bg-muted/20 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="rounded-full p-1.5 bg-green-500/10">
                            <Calendar className="h-4 w-4 text-green-500" />
                          </div>
                          <p className="font-medium">تعليمات المتابعة</p>
                        </div>
                        <p className="text-muted-foreground">
                          {visit.followUpInstructions}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Diagnoses */}
                {visit.diagnoses && visit.diagnoses.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <div className="h-6 w-1 bg-primary rounded-full"></div>
                      التشخيصات
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {visit.diagnoses.map((diagnosis) => (
                        <div
                          key={diagnosis.id}
                          className="rounded-xl bg-muted/20 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="rounded-full p-1.5 bg-green-500/10">
                              <Stethoscope className="h-4 w-4 text-green-500" />
                            </div>
                            <p className="font-medium">
                              {diagnosis.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Follow-up */}
                {visit.nextVisitDate && (
                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <div className="h-6 w-1 bg-primary rounded-full"></div>
                      موعد المتابعة
                    </h3>
                    <div className="bg-muted/20 backdrop-blur-sm rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="rounded-full p-2 bg-blue-500/10">
                          <Calendar className="h-5 w-5 text-blue-500" />
                        </div>
                        <p className="font-medium text-lg">
                          {formatDate(visit.nextVisitDate)}
                        </p>
                      </div>
                      {visit.followUpInstructions && (
                        <p className="text-muted-foreground">
                          {visit.followUpInstructions}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medications tab */}
          <TabsContent value="medications" className="space-y-6">
            <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
              <CardHeader className="bg-muted/30 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  الأدوية الموصوفة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {visit.prescriptions && visit.prescriptions.length > 0 ? (
                  <div className="space-y-4">
                    {visit.prescriptions.map((med, index) => (
                      <motion.div
                        key={med.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-muted/20 backdrop-blur-sm rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="rounded-full p-2 bg-blue-500/10 mt-1">
                              <Pill className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-lg">
                                {med.medicineName}
                              </h3>
                              <p className="text-muted-foreground">
                                {med.dosage} -{' '}
                                {getFrequencyTypeLabel(med.frequency)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`bg-muted/50 text-foreground ${getFrequencyTypeClass(
                                med.frequency
                              )}`}
                            >
                              {getFrequencyTypeLabel(med.frequency)}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1  gap-4">
                          <div className="rounded-lg bg-muted/30 p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="rounded-full p-1 bg-amber-500/10">
                                <Info className="h-3.5 w-3.5 text-amber-500" />
                              </div>
                              <p className="text-sm font-medium">ملاحظات</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {med.notes}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="rounded-full bg-muted/50 p-3 w-fit mx-auto mb-3">
                      <Pill className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-lg mb-1">
                      لا توجد أدوية موصوفة
                    </h3>
                    <p className="text-muted-foreground">
                      لم يتم وصف أي أدوية في هذه الزيارة
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-muted/30 backdrop-blur-sm border-t border-border/50 flex justify-end">
                <Button variant="outline" size="sm" className="gap-1">
                  <Printer className="h-4 w-4" />
                  طباعة الوصفة الطبية
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Lab Tests tab */}
          <TabsContent value="lab-tests" className="space-y-6">
            <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
              <CardHeader className="bg-muted/30 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-primary" />
                  الفحوصات المخبريه
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {visit.labTests && visit.labTests.length > 0 ? (
                  <div className="space-y-4">
                    {visit.labTests.map((test, index) => (
                      <motion.div
                        key={test.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-muted/20 backdrop-blur-sm rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="rounded-full p-2 bg-blue-500/10 mt-1">
                              <FlaskConical className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-lg">
                                {test.labTestName}
                              </h3>
                              <p className="text-muted-foreground"> مخبري</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={cn(
                                'px-3 py-1 rounded-full',
                                getTestStatusColor(test.status)
                              )}
                            >
                              {getTestStatusLabel(test.status)}
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* {test.testDate && (
                            <div className="rounded-lg bg-muted/30 p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="rounded-full p-1 bg-amber-500/10">
                                  <Calendar className="h-3.5 w-3.5 text-amber-500" />
                                </div>
                                <p className="text-sm font-medium">
                                  تاريخ الفحص
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(test.testDate)}
                              </p>
                            </div>
                          )}

                          {test.status === 'Completed' && test.results && (
                            <div className="rounded-lg bg-muted/30 p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="rounded-full p-1 bg-green-500/10">
                                  <FileText className="h-3.5 w-3.5 text-green-500" />
                                </div>
                                <p className="text-sm font-medium">النتائج</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {test.results}
                              </p>
                            </div>
                          )} */}
                        </div>

                        {test.notes && (
                          <div className="mt-4">
                            <div className="rounded-lg bg-muted/30 p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="rounded-full p-1 bg-amber-500/10">
                                  <Info className="h-3.5 w-3.5 text-amber-500" />
                                </div>
                                <p className="text-sm font-medium">ملاحظات</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {test.notes}
                              </p>
                            </div>
                          </div>
                        )}

                        {test.status === TestStatus.Completed && (
                          <div className="mt-4 flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                            >
                              <Download className="h-3.5 w-3.5" />
                              تحميل التقرير
                            </Button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="rounded-full bg-muted/50 p-3 w-fit mx-auto mb-3">
                      <FlaskConical className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-lg mb-1">
                      لا توجد فحوصات مطلوبة
                    </h3>
                    <p className="text-muted-foreground">
                      لم يتم طلب أي فحوصات في هذه الزيارة
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Radiology Tests tab */}
          <TabsContent value="ray-tests" className="space-y-6">
            <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
              <CardHeader className="bg-muted/30 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <Scan className="h-5 w-5 text-primary" />
                  فحوصات الاشعه
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {visit.radiologyTests && visit.radiologyTests.length > 0 ? (
                  <div className="space-y-4">
                    {visit.radiologyTests.map((test, index) => (
                      <motion.div
                        key={test.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-muted/20 backdrop-blur-sm rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="rounded-full p-2 bg-blue-500/10 mt-1">
                              <SquareActivity className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-lg">
                                {test.radiologyTestName}
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={cn(
                                'px-3 py-1 rounded-full',
                                getTestStatusColor(test.status)
                              )}
                            >
                              {getTestStatusLabel(test.status)}
                            </Badge>
                          </div>
                        </div>

                        {test.notes && (
                          <div className="mt-4">
                            <div className="rounded-lg bg-muted/30 p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="rounded-full p-1 bg-amber-500/10">
                                  <Info className="h-3.5 w-3.5 text-amber-500" />
                                </div>
                                <p className="text-sm font-medium">ملاحظات</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {test.notes}
                              </p>
                            </div>
                          </div>
                        )}

                        {test.status === TestStatus.Completed && (
                          <div className="mt-4 flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                            >
                              <Download className="h-3.5 w-3.5" />
                              تحميل التقرير
                            </Button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="rounded-full bg-muted/50 p-3 w-fit mx-auto mb-3">
                      <FlaskConical className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-lg mb-1">
                      لا توجد صور اشعه مطلوبة
                    </h3>
                    <p className="text-muted-foreground">
                      لم يتم طلب أي صور اشعه في هذه الزيارة
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/patient-portal/visits">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة إلى الزيارات
          </Link>
        </Button>

        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            مشاركة
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            طباعة
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
