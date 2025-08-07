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
  Share2,
  User,
  Building,
  FileText,
  AlertCircle,
  Info,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Microscope,
  Beaker,
  Activity,
  Eye,
  Dna,
} from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Skeleton from '@/components/ui/Skeleton';

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

// Dummy lab results data with detailed test parameters
const labResults = [
  {
    id: 'lab-1',
    visitId: 'visit-1',
    testName: 'تحليل الدم الشامل (CBC)',
    testType: 'blood',
    doctorName: 'د. أحمد محمد',
    doctorSpecialty: 'طب عام',
    clinicName: 'عيادة الطب العام',
    labName: 'مختبر الشفاء',
    requestDate: '2025-07-10',
    resultDate: '2025-07-12',
    status: 'completed', // requested, in-progress, completed, cancelled
    abnormalFlags: 2, // Number of abnormal results
    criticalFlags: 0, // Number of critical results
    notes: 'يرجى مراجعة الطبيب لمناقشة نتائج التحليل',
    reportUrl: '/reports/blood-test-1.pdf',
    sampleCollectionDate: '2025-07-10',
    sampleType: 'دم وريدي',
    sampleId: 'S-20250710-001',
    testCode: 'CBC-001',
    testMethod: 'آلي - جهاز Sysmex XN-1000',
    testParameters: [
      {
        name: 'كريات الدم الحمراء (RBC)',
        value: '4.2',
        unit: 'مليون/ميكرولتر',
        referenceRange: '4.5 - 5.5',
        status: 'low', // normal, low, high, critical-low, critical-high
      },
      {
        name: 'الهيموجلوبين (Hb)',
        value: '13.5',
        unit: 'جم/ديسيلتر',
        referenceRange: '13.5 - 17.5',
        status: 'normal',
      },
      {
        name: 'الهيماتوكريت (Hct)',
        value: '38',
        unit: '%',
        referenceRange: '40 - 50',
        status: 'low',
      },
      {
        name: 'متوسط حجم الكرية (MCV)',
        value: '88',
        unit: 'فيمتولتر',
        referenceRange: '80 - 96',
        status: 'normal',
      },
      {
        name: 'متوسط هيموجلوبين الكرية (MCH)',
        value: '29',
        unit: 'بيكوجرام',
        referenceRange: '27 - 33',
        status: 'normal',
      },
      {
        name: 'متوسط تركيز هيموجلوبين الكرية (MCHC)',
        value: '33',
        unit: 'جم/ديسيلتر',
        referenceRange: '32 - 36',
        status: 'normal',
      },
      {
        name: 'كريات الدم البيضاء (WBC)',
        value: '7.5',
        unit: 'ألف/ميكرولتر',
        referenceRange: '4.5 - 11.0',
        status: 'normal',
      },
      {
        name: 'العدلات (Neutrophils)',
        value: '65',
        unit: '%',
        referenceRange: '40 - 70',
        status: 'normal',
      },
      {
        name: 'الليمفاويات (Lymphocytes)',
        value: '25',
        unit: '%',
        referenceRange: '20 - 40',
        status: 'normal',
      },
      {
        name: 'الصفائح الدموية (Platelets)',
        value: '140',
        unit: 'ألف/ميكرولتر',
        referenceRange: '150 - 450',
        status: 'low',
      },
    ],
    interpretation:
      'نتائج التحليل تشير إلى انخفاض طفيف في كريات الدم الحمراء والصفائح الدموية. قد يكون ذلك مؤشراً على فقر الدم الخفيف أو نقص في الحديد.',
    recommendations:
      'يُنصح بمراجعة الطبيب لتقييم الحالة وقد يلزم إجراء المزيد من الفحوصات أو وصف مكملات الحديد.',
  },
  {
    id: 'lab-4',
    visitId: 'visit-4',
    testName: 'تحليل الكوليسترول والدهون',
    testType: 'blood',
    doctorName: 'د. محمد علي',
    doctorSpecialty: 'قلب',
    clinicName: 'عيادة القلب',
    labName: 'مختبر الصحة',
    requestDate: '2025-05-15',
    resultDate: '2025-05-17',
    status: 'completed',
    abnormalFlags: 3,
    criticalFlags: 1,
    notes: 'مستوى الكوليسترول مرتفع، يرجى مراجعة الطبيب فوراً',
    reportUrl: '/reports/lipid-profile.pdf',
    sampleCollectionDate: '2025-05-15',
    sampleType: 'دم وريدي (صائم)',
    sampleId: 'S-20250515-003',
    testCode: 'LIPID-001',
    testMethod: 'طيف ضوئي - جهاز Cobas c501',
    testParameters: [
      {
        name: 'الكوليسترول الكلي (Total Cholesterol)',
        value: '280',
        unit: 'ملجم/ديسيلتر',
        referenceRange: '< 200',
        status: 'high',
      },
      {
        name: 'الكوليسترول عالي الكثافة (HDL)',
        value: '35',
        unit: 'ملجم/ديسيلتر',
        referenceRange: '> 40',
        status: 'low',
      },
      {
        name: 'الكوليسترول منخفض الكثافة (LDL)',
        value: '190',
        unit: 'ملجم/ديسيلتر',
        referenceRange: '< 130',
        status: 'high',
      },
      {
        name: 'الدهون الثلاثية (Triglycerides)',
        value: '320',
        unit: 'ملجم/ديسيلتر',
        referenceRange: '< 150',
        status: 'critical-high',
      },
    ],
    interpretation:
      'نتائج التحليل تشير إلى ارتفاع خطير في مستويات الدهون الثلاثية وارتفاع في الكوليسترول الكلي والكوليسترول منخفض الكثافة (LDL) مع انخفاض في الكوليسترول عالي الكثافة (HDL).',
    recommendations:
      'يجب مراجعة الطبيب فوراً لتقييم خطر الإصابة بأمراض القلب والأوعية الدموية. قد يلزم تعديل النظام الغذائي وممارسة الرياضة وربما العلاج الدوائي.',
  },
];

// Get lab result status badge variant and label
const getLabResultStatusBadge = (status: string) => {
  let variant = '';
  let label = '';
  let color = '';
  let bgColor = '';
  let borderColor = '';
  let icon = AlertCircle;

  switch (status) {
    case 'requested':
      variant = 'outline';
      label = 'تم الطلب';
      color = 'text-purple-500';
      bgColor = 'bg-purple-500/10';
      borderColor = 'border-purple-500/50';
      icon = Clock;
      break;
    case 'in-progress':
      variant = 'secondary';
      label = 'قيد التنفيذ';
      color = 'text-blue-500';
      bgColor = 'bg-blue-500/10';
      borderColor = 'border-blue-500/50';
      icon = Beaker;
      break;
    case 'completed':
      variant = 'outline';
      label = 'مكتمل';
      color = 'text-green-500';
      bgColor = 'bg-green-500/10';
      borderColor = 'border-green-500/50';
      icon = CheckCircle;
      break;
    case 'cancelled':
      variant = 'destructive';
      label = 'ملغي';
      color = 'text-destructive';
      bgColor = 'bg-destructive/10';
      borderColor = 'border-destructive/50';
      icon = XCircle;
      break;
    default:
      variant = 'outline';
      label = status;
      color = 'text-muted-foreground';
      bgColor = 'bg-muted/50';
      borderColor = 'border-muted/50';
      icon = AlertCircle;
  }

  return { variant, label, color, bgColor, borderColor, icon };
};

// Get test type badge variant and label
const getTestTypeBadge = (type: string) => {
  let variant = '';
  let label = '';
  let icon = null;

  switch (type) {
    case 'blood':
      variant = 'blood';
      label = 'دم';
      icon = Beaker;
      break;
    case 'urine':
      variant = 'urine';
      label = 'بول';
      icon = Beaker;
      break;
    case 'stool':
      variant = 'stool';
      label = 'براز';
      icon = Beaker;
      break;
    case 'imaging':
      variant = 'imaging';
      label = 'أشعة';
      icon = Eye;
      break;
    default:
      variant = 'default';
      label = type;
      icon = Microscope;
  }

  return { variant, label, icon };
};

// Get parameter status badge
const getParameterStatusBadge = (status: string) => {
  switch (status) {
    case 'normal':
      return {
        variant: 'outline',
        label: 'طبيعي',
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/50',
      };
    case 'low':
      return {
        variant: 'outline',
        label: 'منخفض',
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/50',
      };
    case 'high':
      return {
        variant: 'outline',
        label: 'مرتفع',
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/50',
      };
    case 'critical-low':
      return {
        variant: 'destructive',
        label: 'منخفض جداً',
        color: 'text-destructive',
        bgColor: 'bg-destructive/10',
        borderColor: 'border-destructive/50',
      };
    case 'critical-high':
      return {
        variant: 'destructive',
        label: 'مرتفع جداً',
        color: 'text-destructive',
        bgColor: 'bg-destructive/10',
        borderColor: 'border-destructive/50',
      };
    default:
      return {
        variant: 'outline',
        label: 'غير معروف',
        color: 'text-muted-foreground',
        bgColor: 'bg-muted/50',
        borderColor: 'border-muted/50',
      };
  }
};

export default function LabResultDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [labResult, setLabResult] = useState<any>(null);

  // Format date to Arabic format
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  useEffect(() => {
    // Simulate API call to fetch lab result details
    const fetchLabResult = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const foundLabResult = labResults.find((p) => p.id === params.id);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setLabResult(foundLabResult || null);
      } catch (error) {
        console.error('Error fetching lab result:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabResult();
  }, [params.id]);

  // Loading skeleton
  if (loading) {
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

  const labResultStatusBadge = getLabResultStatusBadge(labResult.status);
  const testTypeBadge = getTestTypeBadge(labResult.testType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {labResult.testName}
          </h1>
          <p className="text-muted-foreground">
            {labResult.doctorName} - {labResult.doctorSpecialty}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={labResultStatusBadge.variant}
            color={labResultStatusBadge.color}
            className={labResultStatusBadge.bgColor}
          >
            {labResultStatusBadge.label}
          </Badge>
          <Badge
            variant={testTypeBadge.variant}
            color="text-blue-500"
            className="bg-blue-500/10"
          >
            {testTypeBadge.label}
          </Badge>
        </div>
      </div>

      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar size="lg" className="bg-blue-500 text-white">
                <User className="h-6 w-6" />
              </Avatar>
              <div>
                <h2 className="text-lg font-medium">{labResult.doctorName}</h2>
                <p className="text-muted-foreground">
                  {labResult.doctorSpecialty}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="default" asChild>
                <Link href={labResult.reportUrl} target="_blank">
                  <Download className="h-4 w-4" />
                  تحميل التقرير
                </Link>
              </Button>
              <Button variant="default" asChild>
                <Link href={labResult.reportUrl} target="_blank">
                  <Printer className="h-4 w-4" />
                  طباعة التقرير
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">تاريخ الطلب:</h3>
                <p className="text-muted-foreground">
                  {formatDate(labResult.requestDate)}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">تاريخ النتيجة:</h3>
                <p className="text-muted-foreground">
                  {formatDate(labResult.resultDate)}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">حالة النتيجة:</h3>
                <Badge
                  variant={labResultStatusBadge.variant}
                  color={labResultStatusBadge.color}
                  className={labResultStatusBadge.bgColor}
                >
                  {labResultStatusBadge.label}
                </Badge>
              </div>
            </div>

            <Separator className="bg-border/50" />

            <div>
              <h2 className="text-lg font-medium">المعايير:</h2>
              <div className="space-y-4">
                {labResult.testParameters.map((parameter, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{parameter.name}:</h3>
                      <p className="text-muted-foreground">
                        {parameter.value} {parameter.unit}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">النطاق المرجعي:</h3>
                      <p className="text-muted-foreground">
                        {parameter.referenceRange}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">الحالة:</h3>
                      <Badge
                        variant={
                          getParameterStatusBadge(parameter.status).variant
                        }
                        color={getParameterStatusBadge(parameter.status).color}
                        className={
                          getParameterStatusBadge(parameter.status).bgColor
                        }
                      >
                        {getParameterStatusBadge(parameter.status).label}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">الملاحظات:</h3>
                      <p className="text-muted-foreground">{parameter.notes}</p>
                    </div>
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
