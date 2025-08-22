'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Printer,
  Download,
  User,
  Building,
  FileText,
  AlertCircle,
  Info,
  Beaker,
  Activity,
  Dna,
  Loader2,
  CheckCircle,
  Circle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Skeleton from '@/components/ui/Skeleton';
import { useVisitLabTest } from '@/lib/api/hooks/useVisitLabTest';
import { TestStatus } from '@/lib/api/types/visit-lab-test';
import { formatDate } from '@/utils/dateTimeUtils';
import { getTestStatusColor, getTestStatusLabel } from '@/utils/textUtils';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function LabResultDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const labTestId = params.id as string;

  // Fetch lab test details using the hook
  const { getPatientLabTestDetails } = useVisitLabTest();
  const {
    data: labResult,
    isLoading,
    error,
  } = getPatientLabTestDetails(labTestId);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>

        {/* Lab result details skeleton */}
        <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-6 w-40 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-48" />
                </div>
              </div>

              <Separator className="bg-border/50" />

              <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="grid grid-cols-4 gap-4">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              خطأ في تحميل نتيجة التحليل
            </h1>
            <p className="text-muted-foreground">
              فشل في تحميل تفاصيل نتيجة التحليل
            </p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة
          </Button>
        </div>

        <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
          <CardContent className="p-10 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="font-medium text-lg mb-1">
              فشل في تحميل نتيجة التحليل
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mb-6">
              حدث خطأ أثناء تحميل تفاصيل نتيجة التحليل. يرجى المحاولة مرة أخرى.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                إعادة المحاولة
              </Button>
              <Button variant="default" asChild>
                <Link href="/patient-portal/lab-results">
                  عرض جميع نتائج التحاليل
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Lab result not found
  if (!labResult) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              نتيجة التحليل غير موجودة
            </h1>
            <p className="text-muted-foreground">
              لم يتم العثور على نتيجة التحليل المطلوبة
            </p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة
          </Button>
        </div>

        <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
          <CardContent className="p-10 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg mb-1">
              نتيجة التحليل غير موجودة
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              لم يتم العثور على نتيجة التحليل المطلوبة. قد تكون النتيجة قد تم
              حذفها أو أن الرابط غير صحيح.
            </p>
            <Button variant="default" className="mt-6" asChild>
              <Link href="/patient-portal/lab-results">
                عرض جميع نتائج التحاليل
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/patient-portal/lab-results">
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة للنتائج
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {labResult.labTestName}
            </h1>
            <p className="text-muted-foreground">
              {labResult.doctorName} - {labResult.specialtyName}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-white">
                    {labResult.doctorName}
                  </h2>
                  <p className="text-white/80">
                    {labResult.specialtyName} - {labResult.clinicName}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">تفاصيل التحليل</TabsTrigger>
                <TabsTrigger value="results">النتائج</TabsTrigger>
                <TabsTrigger value="notes">الملاحظات</TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      معلومات التحليل
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          كود التحليل:
                        </span>
                        <span className="font-medium">
                          {labResult.labTestCode}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          تاريخ الطلب:
                        </span>
                        <span className="font-medium">
                          {formatDate(labResult.requestDate)}
                        </span>
                      </div>
                      {labResult.resultDate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            تاريخ النتيجة:
                          </span>
                          <span className="font-medium">
                            {formatDate(labResult.resultDate)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Activity className="h-5 w-5 text-green-500" />
                      حالة التحليل
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">الحالة:</span>
                        <Badge
                          variant={'default'}
                          className={cn(getTestStatusColor(labResult.status))}
                        >
                          {labResult.status === TestStatus.Completed ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : labResult.status === TestStatus.Pending ? (
                            <Clock className="h-3 w-3" />
                          ) : labResult.status === TestStatus.InProgress ? (
                            <Loader2 className="h-3 w-3" />
                          ) : (
                            <Circle className="h-3 w-3" />
                          )}{' '}
                          {getTestStatusLabel(labResult.status)}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          نوع التحليل:
                        </span>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700"
                        >
                          {labResult.labTestCategoryName}
                        </Badge>
                      </div>
                      {labResult.abnormalFlags > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            نتائج غير طبيعية:
                          </span>
                          <Badge
                            variant="outline"
                            className="bg-yellow-50 text-yellow-700"
                          >
                            {labResult.abnormalFlags} معايير
                          </Badge>
                        </div>
                      )}
                      {labResult.criticalFlags > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            نتائج حرجة:
                          </span>
                          <Badge variant="destructive">
                            {labResult.criticalFlags} معايير
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Results Tab */}
              <TabsContent value="results" className="space-y-6">
                {labResult.result ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Dna className="h-5 w-5 text-purple-500" />
                      نتائج التحليل
                    </h3>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm">
                        {labResult.result}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                      <Beaker className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">
                      النتائج قيد المعالجة
                    </h3>
                    <p className="text-muted-foreground">
                      النتائج التفصيلية ستكون متاحة بعد اكتمال التحليل
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    الملاحظات والتوصيات
                  </h3>
                  {labResult.notes ? (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <p className="text-sm">{labResult.notes}</p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                        <Info className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">
                        لا توجد ملاحظات
                      </h3>
                      <p className="text-muted-foreground">
                        لم يتم إضافة أي ملاحظات خاصة لهذا التحليل
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Visit Information */}
      <motion.div variants={itemVariants}>
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              معلومات الزيارة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">رقم الزيارة</p>
                <p className="font-medium">{labResult.visitNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">العيادة</p>
                <p className="font-medium">{labResult.clinicName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">التخصص</p>
                <p className="font-medium">{labResult.specialtyName}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
