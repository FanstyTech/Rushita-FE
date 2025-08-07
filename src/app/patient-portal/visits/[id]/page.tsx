'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  FileCheck,
  Activity,
  Download,
  Printer,
  Share2,
  ChevronDown,
  ChevronUp,
  Info,
  AlertCircle,
  FlaskConical,
  Scan,
  Eye,
  FileImage,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { cn } from '@/lib/utils';
import Skeleton from '@/components/ui/Skeleton';

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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Dummy visit data
const visits = [
  {
    id: 'visit-1',
    doctorName: 'د. أحمد محمد',
    doctorSpecialty: 'طب عام',
    clinicName: 'عيادة الطب العام',
    date: '2025-07-10',
    time: '10:00',
    duration: 30, // minutes
    type: 'routine', // routine, follow-up, emergency
    chiefComplaint: 'صداع وألم في المفاصل',
    diagnosis: 'التهاب المفاصل الروماتويدي',
    notes:
      'المريض يعاني من آلام في المفاصل منذ أسبوعين. تم وصف مضادات التهاب وراحة لمدة 3 أيام.',
    vitals: {
      temperature: 37.2,
      bloodPressure: '120/80',
      heartRate: 72,
      respiratoryRate: 16,
      oxygenSaturation: 98,
      weight: 75,
      height: 175,
    },
    medications: [
      {
        name: 'ديكلوفيناك',
        dosage: '50 مجم',
        frequency: 'مرتين يومياً',
        duration: '7 أيام',
        instructions: 'يؤخذ بعد الطعام',
      },
      {
        name: 'باراسيتامول',
        dosage: '500 مجم',
        frequency: 'عند الحاجة',
        duration: 'حسب الحاجة',
        instructions: 'يؤخذ عند الشعور بالألم، بحد أقصى 4 مرات في اليوم',
      },
    ],
    labTests: [
      {
        name: 'تحليل الدم الكامل',
        status: 'completed',
        date: '2025-07-10',
        results: 'طبيعي',
        reportUrl: '/reports/blood-test-1.pdf',
      },
      {
        name: 'أشعة سينية للمفاصل',
        status: 'pending',
        date: '2025-07-15',
        results: '',
        reportUrl: '',
      },
    ],
    followUp: {
      recommended: true,
      date: '2025-07-24',
      notes: 'متابعة بعد أسبوعين لتقييم الاستجابة للعلاج',
    },
    hasDocuments: true,
    hasPrescriptions: true,
    documents: [
      {
        id: 'doc-1',
        name: 'تقرير فحص الدم',
        type: 'report',
        date: '2025-07-10',
      },
      {
        id: 'doc-2',
        name: 'وصفة طبية',
        type: 'prescription',
        date: '2025-07-10',
      },
    ],
  },
  {
    id: 'visit-2',
    doctorName: 'د. سارة خالد',
    doctorSpecialty: 'أسنان',
    clinicName: 'عيادة الأسنان',
    date: '2025-06-20',
    time: '14:30',
    duration: 45, // minutes
    type: 'routine',
    chiefComplaint: 'ألم في الضرس الخلفي',
    diagnosis: 'تسوس في الضرس العلوي الأيمن',
    notes:
      'تم إجراء حشو مؤقت للضرس المتضرر. يحتاج المريض لعلاج جذور في الزيارة القادمة.',
    vitals: {
      temperature: 36.8,
      bloodPressure: '118/78',
      heartRate: 68,
      respiratoryRate: 14,
      oxygenSaturation: 99,
      weight: 75,
      height: 175,
    },
    medications: [
      {
        name: 'أموكسيسيلين',
        dosage: '500 مجم',
        frequency: '3 مرات يومياً',
        duration: '5 أيام',
        instructions: 'يؤخذ قبل الطعام بساعة',
      },
      {
        name: 'إيبوبروفين',
        dosage: '400 مجم',
        frequency: 'عند الحاجة',
        duration: '3 أيام',
        instructions: 'يؤخذ بعد الطعام عند الشعور بالألم',
      },
    ],
    labTests: [],
    followUp: {
      recommended: true,
      date: '2025-06-27',
      notes: 'متابعة لإجراء علاج الجذور',
    },
    hasDocuments: true,
    hasPrescriptions: true,
  },
];

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
  const id = params?.id as string;
  const [isLoading, setIsLoading] = useState(true);

  // Find visit by ID
  const visit = visits.find((v) => v.id === params.id);

  // Format date to Arabic format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <VisitDetailsSkeleton />;
  }

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
                            {formatDate(visit.date)}
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
                            {visit.time} ({visit.duration} دقيقة)
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
                            {visit.doctorName} - {visit.doctorSpecialty}
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
                    </div>
                  </div>
                </div>

                <div className="my-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <div className="h-6 w-1 bg-primary rounded-full"></div>
                    التشخيص والملاحظات
                  </h3>

                  {/* Chief complaint and diagnosis */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="rounded-xl bg-muted/20 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full p-1.5 bg-amber-500/10">
                          <Activity className="h-4 w-4 text-amber-500" />
                        </div>
                        <p className="font-medium">سبب الزيارة</p>
                      </div>
                      <p className="text-muted-foreground">
                        {visit.chiefComplaint}
                      </p>
                    </div>

                    <div className="rounded-xl bg-muted/20 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full p-1.5 bg-green-500/10">
                          <Stethoscope className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="font-medium">التشخيص</p>
                      </div>
                      <p className="text-muted-foreground">{visit.diagnosis}</p>
                    </div>

                    <div className="rounded-xl bg-muted/20 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full p-1.5 bg-blue-500/10">
                          <FileText className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="font-medium">ملاحظات الطبيب</p>
                      </div>
                      <p className="text-muted-foreground">{visit.notes}</p>
                    </div>
                  </div>
                </div>

                {/* Vitals */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <div className="h-6 w-1 bg-primary rounded-full"></div>
                    العلامات الحيوية
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                      <div className="rounded-full p-2 bg-red-500/10 mx-auto mb-2">
                        <Activity className="h-5 w-5 text-red-500" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        درجة الحرارة
                      </p>
                      <p className="font-semibold text-lg">
                        {visit.vitals.temperature} °C
                      </p>
                    </div>

                    <div className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                      <div className="rounded-full p-2 bg-blue-500/10 mx-auto mb-2">
                        <Activity className="h-5 w-5 text-blue-500" />
                      </div>
                      <p className="text-sm text-muted-foreground">ضغط الدم</p>
                      <p className="font-semibold text-lg">
                        {visit.vitals.bloodPressure}
                      </p>
                    </div>

                    <div className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                      <div className="rounded-full p-2 bg-pink-500/10 mx-auto mb-2">
                        <Activity className="h-5 w-5 text-pink-500" />
                      </div>
                      <p className="text-sm text-muted-foreground">النبض</p>
                      <p className="font-semibold text-lg">
                        {visit.vitals.heartRate}{' '}
                        <span className="text-sm font-normal">نبضة/دقيقة</span>
                      </p>
                    </div>

                    <div className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                      <div className="rounded-full p-2 bg-indigo-500/10 mx-auto mb-2">
                        <Activity className="h-5 w-5 text-indigo-500" />
                      </div>
                      <p className="text-sm text-muted-foreground">التنفس</p>
                      <p className="font-semibold text-lg">
                        {visit.vitals.respiratoryRate}{' '}
                        <span className="text-sm font-normal">مرة/دقيقة</span>
                      </p>
                    </div>

                    <div className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                      <div className="rounded-full p-2 bg-cyan-500/10 mx-auto mb-2">
                        <Activity className="h-5 w-5 text-cyan-500" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        تشبع الأكسجين
                      </p>
                      <p className="font-semibold text-lg">
                        {visit.vitals.oxygenSaturation}%
                      </p>
                    </div>

                    <div className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                      <div className="rounded-full p-2 bg-amber-500/10 mx-auto mb-2">
                        <Activity className="h-5 w-5 text-amber-500" />
                      </div>
                      <p className="text-sm text-muted-foreground">الوزن</p>
                      <p className="font-semibold text-lg">
                        {visit.vitals.weight}{' '}
                        <span className="text-sm font-normal">كجم</span>
                      </p>
                    </div>

                    <div className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                      <div className="rounded-full p-2 bg-green-500/10 mx-auto mb-2">
                        <Activity className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-sm text-muted-foreground">الطول</p>
                      <p className="font-semibold text-lg">
                        {visit.vitals.height}{' '}
                        <span className="text-sm font-normal">سم</span>
                      </p>
                    </div>

                    <div className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 border border-border/30">
                      <div className="rounded-full p-2 bg-purple-500/10 mx-auto mb-2">
                        <Activity className="h-5 w-5 text-purple-500" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        مؤشر كتلة الجسم
                      </p>
                      <p className="font-semibold text-lg">
                        {(
                          visit.vitals.weight /
                          Math.pow(visit.vitals.height / 100, 2)
                        ).toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Follow-up */}
                {visit.followUp.recommended && (
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
                          {formatDate(visit.followUp.date)}
                        </p>
                      </div>
                      <p className="text-muted-foreground">
                        {visit.followUp.notes}
                      </p>
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
                {visit.medications.length > 0 ? (
                  <div className="space-y-4">
                    {visit.medications.map((med, index) => (
                      <motion.div
                        key={index}
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
                                {med.name}
                              </h3>
                              <p className="text-muted-foreground">
                                {med.dosage} - {med.frequency}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-muted/50 text-foreground"
                            >
                              {med.duration}
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="rounded-lg bg-muted/30 p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="rounded-full p-1 bg-amber-500/10">
                                <Info className="h-3.5 w-3.5 text-amber-500" />
                              </div>
                              <p className="text-sm font-medium">
                                طريقة الاستخدام
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {med.instructions}
                            </p>
                          </div>

                          <div className="rounded-lg bg-muted/30 p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="rounded-full p-1 bg-red-500/10">
                                <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                              </div>
                              <p className="text-sm font-medium">تحذيرات</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {'لا توجد تحذيرات خاصة'}
                              {/* {med.warnings || 'لا توجد تحذيرات خاصة'} */}
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
          {/* Tests tab */}
          <TabsContent value="lab-tests" className="space-y-6">
            <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
              <CardHeader className="bg-muted/30 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-primary" />
                  الفحوصات المخبريه
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {visit.labTests.length > 0 ? (
                  <div className="space-y-4">
                    {visit.labTests.map((test, index) => (
                      <motion.div
                        key={index}
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
                                {test.name}
                              </h3>
                              <p className="text-muted-foreground">فحص مخبري</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={cn(
                                'px-3 py-1 rounded-full',
                                test.status === 'completed'
                                  ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                                  : test.status === 'pending'
                                  ? 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20'
                                  : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
                              )}
                            >
                              {test.status === 'completed'
                                ? 'مكتمل'
                                : test.status === 'pending'
                                ? 'قيد الانتظار'
                                : 'قيد التنفيذ'}
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="rounded-lg bg-muted/30 p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="rounded-full p-1 bg-amber-500/10">
                                <Calendar className="h-3.5 w-3.5 text-amber-500" />
                              </div>
                              <p className="text-sm font-medium">تاريخ الفحص</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {test.date
                                ? formatDate(test.date)
                                : 'لم يتم تحديد موعد بعد'}
                            </p>
                          </div>

                          {test.status === 'completed' && (
                            <div className="rounded-lg bg-muted/30 p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="rounded-full p-1 bg-green-500/10">
                                  <FileText className="h-3.5 w-3.5 text-green-500" />
                                </div>
                                <p className="text-sm font-medium">النتائج</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {test.results || 'لا توجد نتائج مسجلة'}
                              </p>
                            </div>
                          )}
                        </div>

                        {test.status === 'completed' && (
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
          </TabsContent>{' '}
          {/* Tests tab */}
          <TabsContent value="ray-tests" className="space-y-6">
            <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
              <CardHeader className="bg-muted/30 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-primary" />
                  فحوصات الاشعه
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {visit.labTests.length > 0 ? (
                  <div className="space-y-4">
                    {visit.labTests.map((test, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-muted/20 backdrop-blur-sm rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="rounded-full p-2 bg-blue-500/10 mt-1">
                              <Scan className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-lg">
                                {test.name}
                              </h3>
                              <p className="text-muted-foreground">فحص أشعة</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={cn(
                                'px-3 py-1 rounded-full',
                                test.status === 'completed'
                                  ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                                  : test.status === 'pending'
                                  ? 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20'
                                  : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
                              )}
                            >
                              {test.status === 'completed'
                                ? 'مكتمل'
                                : test.status === 'pending'
                                ? 'قيد الانتظار'
                                : 'قيد التنفيذ'}
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="rounded-lg bg-muted/30 p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="rounded-full p-1 bg-amber-500/10">
                                <Calendar className="h-3.5 w-3.5 text-amber-500" />
                              </div>
                              <p className="text-sm font-medium">تاريخ الفحص</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {test.date
                                ? formatDate(test.date)
                                : 'لم يتم تحديد موعد بعد'}
                            </p>
                          </div>

                          {test.status === 'completed' && (
                            <div className="rounded-lg bg-muted/30 p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="rounded-full p-1 bg-green-500/10">
                                  <FileText className="h-3.5 w-3.5 text-green-500" />
                                </div>
                                <p className="text-sm font-medium">النتائج</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {test.results || 'لا توجد نتائج مسجلة'}
                              </p>
                            </div>
                          )}
                        </div>

                        {test.status === 'completed' && (
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
          {/* Documents tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
              <CardHeader className="bg-muted/30 backdrop-blur-sm">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  المستندات والتقارير
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {visit.documents && visit.documents.length > 0 ? (
                  <div className="space-y-4">
                    {visit.documents.map((doc, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-muted/20 backdrop-blur-sm rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-border/30"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="rounded-full p-2 bg-blue-500/10 mt-1">
                              {doc.type === 'report' ? (
                                <FileText className="h-5 w-5 text-blue-500" />
                              ) : doc.type === 'prescription' ? (
                                <Pill className="h-5 w-5 text-green-500" />
                              ) : (
                                <FileImage className="h-5 w-5 text-purple-500" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium text-lg">
                                {doc.name}
                              </h3>
                              <p className="text-muted-foreground">
                                {doc.type === 'report'
                                  ? 'تقرير طبي'
                                  : doc.type === 'prescription'
                                  ? 'وصفة طبية'
                                  : 'صورة طبية'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 px-3 py-1 rounded-full">
                              {formatDate(doc.date)}
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            عرض
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Download className="h-3.5 w-3.5" />
                            تحميل
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="rounded-full bg-muted/50 p-3 w-fit mx-auto mb-3">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-lg mb-1">
                      لا توجد مستندات
                    </h3>
                    <p className="text-muted-foreground">
                      لا توجد مستندات أو تقارير مرتبطة بهذه الزيارة
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
