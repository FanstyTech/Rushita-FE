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
  Pill,
  FileText,
  AlertCircle,
  Info,
  ChevronLeft,
  CheckCircle,
  XCircle,
  CalendarClock,
  CalendarRange,
  Stethoscope,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import Skeleton from '@/components/ui/Skeleton';

// Local interfaces for mock data structure
interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  refillable: boolean;
  refillsRemaining: number;
  sideEffects: string;
  contraindications: string;
}

interface PrescriptionData {
  id: string;
  prescriptionNumber: string;
  visitId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorId: string;
  clinicName: string;
  clinicId: string;
  date: string;
  issuedDate: string;
  expiryDate: string;
  status: string;
  medications: MedicationItem[];
  diagnosis: string;
  notes: string;
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Dummy prescription data
const prescriptions = [
  {
    id: 'presc-1',
    prescriptionNumber: 'RX-2025-0001',
    visitId: 'visit-1',
    doctorName: 'د. أحمد محمد',
    doctorSpecialty: 'طب عام',
    doctorId: 'doc-1',
    clinicName: 'عيادة الطب العام',
    clinicId: 'clinic-1',
    date: '2025-07-10',
    issuedDate: '2025-07-10',
    expiryDate: '2025-08-10',
    status: 'active', // active, completed, cancelled
    medications: [
      {
        id: 'med-1',
        name: 'ديكلوفيناك',
        dosage: '50 مجم',
        frequency: 'مرتين يومياً',
        duration: '7 أيام',
        instructions: 'يؤخذ بعد الطعام',
        refillable: true,
        refillsRemaining: 2,
        sideEffects: 'قد يسبب اضطرابات في المعدة، دوخة، صداع',
        contraindications:
          'لا يستخدم مع أدوية تسييل الدم، أو في حالات قرحة المعدة',
      },
      {
        id: 'med-2',
        name: 'باراسيتامول',
        dosage: '500 مجم',
        frequency: 'عند الحاجة',
        duration: 'حسب الحاجة',
        instructions: 'يؤخذ عند الشعور بالألم، بحد أقصى 4 مرات في اليوم',
        refillable: false,
        refillsRemaining: 0,
        sideEffects:
          'نادراً ما يسبب آثاراً جانبية عند استخدامه بالجرعات الموصى بها',
        contraindications: 'الحساسية من الباراسيتامول، أمراض الكبد الشديدة',
      },
    ],
    diagnosis: 'التهاب المفاصل الروماتويدي',
    notes: 'يجب مراجعة الطبيب بعد انتهاء الوصفة',
  },
  {
    id: 'presc-2',
    prescriptionNumber: 'RX-2025-0002',
    visitId: 'visit-2',
    doctorName: 'د. سارة خالد',
    doctorSpecialty: 'أسنان',
    doctorId: 'doc-2',
    clinicName: 'عيادة الأسنان',
    clinicId: 'clinic-2',
    date: '2025-06-20',
    issuedDate: '2025-06-20',
    expiryDate: '2025-07-20',
    status: 'active',
    medications: [
      {
        id: 'med-3',
        name: 'أموكسيسيلين',
        dosage: '500 مجم',
        frequency: '3 مرات يومياً',
        duration: '5 أيام',
        instructions: 'يؤخذ قبل الطعام بساعة',
        refillable: false,
        refillsRemaining: 0,
        sideEffects: 'إسهال، غثيان، طفح جلدي',
        contraindications: 'الحساسية من البنسلين أو السيفالوسبورين',
      },
      {
        id: 'med-4',
        name: 'إيبوبروفين',
        dosage: '400 مجم',
        frequency: 'عند الحاجة',
        duration: '3 أيام',
        instructions: 'يؤخذ بعد الطعام عند الشعور بالألم',
        refillable: false,
        refillsRemaining: 0,
        sideEffects: 'اضطرابات في المعدة، دوخة، صداع',
        contraindications: 'قرحة المعدة، الربو، فشل القلب الاحتقاني',
      },
    ],
    diagnosis: 'تسوس في الضرس العلوي الأيمن',
    notes: '',
  },
  {
    id: 'presc-3',
    prescriptionNumber: 'RX-2025-0003',
    visitId: 'visit-3',
    doctorName: 'د. محمد علي',
    doctorSpecialty: 'جلدية',
    doctorId: 'doc-3',
    clinicName: 'عيادة الجلدية',
    clinicId: 'clinic-3',
    date: '2025-05-15',
    issuedDate: '2025-05-15',
    expiryDate: '2025-06-15',
    status: 'completed',
    medications: [
      {
        id: 'med-5',
        name: 'هيدروكورتيزون كريم',
        dosage: '1%',
        frequency: 'مرتين يومياً',
        duration: '10 أيام',
        instructions: 'يوضع على المنطقة المصابة بطبقة رقيقة',
        refillable: true,
        refillsRemaining: 0,
        sideEffects: 'احمرار، حكة، جفاف الجلد',
        contraindications: 'العدوى الفطرية أو البكتيرية في الجلد',
      },
      {
        id: 'med-6',
        name: 'سيتريزين',
        dosage: '10 مجم',
        frequency: 'مرة واحدة يومياً',
        duration: '14 يوم',
        instructions: 'يؤخذ قبل النوم',
        refillable: false,
        refillsRemaining: 0,
        sideEffects: 'نعاس، جفاف الفم، صداع',
        contraindications: 'الحساسية من السيتريزين، مرضى الكلى الشديد',
      },
    ],
    diagnosis: 'التهاب جلدي تحسسي',
    notes: 'تجنب استخدام الصابون المعطر والمنظفات القوية',
  },
  {
    id: 'presc-4',
    prescriptionNumber: 'RX-2025-0004',
    visitId: 'visit-5',
    doctorName: 'د. خالد محمود',
    doctorSpecialty: 'باطنية',
    doctorId: 'doc-4',
    clinicName: 'عيادة الباطنية',
    clinicId: 'clinic-4',
    date: '2025-07-05',
    issuedDate: '2025-07-05',
    expiryDate: '2025-08-05',
    status: 'active',
    medications: [
      {
        id: 'med-7',
        name: 'أتورفاستاتين',
        dosage: '20 مجم',
        frequency: 'مرة واحدة يومياً',
        duration: '30 يوم',
        instructions: 'يؤخذ في المساء',
        refillable: true,
        refillsRemaining: 5,
        sideEffects: 'آلام العضلات، صداع، اضطرابات في المعدة',
        contraindications: 'أمراض الكبد النشطة، الحمل والرضاعة',
      },
      {
        id: 'med-8',
        name: 'أملوديبين',
        dosage: '5 مجم',
        frequency: 'مرة واحدة يومياً',
        duration: '30 يوم',
        instructions: 'يؤخذ في الصباح',
        refillable: true,
        refillsRemaining: 5,
        sideEffects: 'صداع، دوار، تورم في القدمين',
        contraindications: 'انخفاض ضغط الدم الشديد، صدمة قلبية',
      },
    ],
    diagnosis: 'ارتفاع ضغط الدم وارتفاع الكوليسترول',
    notes: 'يجب متابعة ضغط الدم يومياً وتسجيل القراءات',
  },
];

// Get prescription status badge variant and label
const getPrescriptionStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return {
        variant: 'outline',
        label: 'سارية',
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/50',
        icon: CheckCircle,
      };
    case 'completed':
      return {
        variant: 'secondary',
        label: 'منتهية',
        color: 'text-secondary-foreground',
        bgColor: 'bg-secondary/10',
        borderColor: 'border-secondary/50',
        icon: Clock,
      };
    case 'cancelled':
      return {
        variant: 'destructive',
        label: 'ملغية',
        color: 'text-destructive',
        bgColor: 'bg-destructive/10',
        borderColor: 'border-destructive/50',
        icon: XCircle,
      };
    default:
      return {
        variant: 'outline',
        label: 'غير معروف',
        color: 'text-muted-foreground',
        bgColor: 'bg-muted/50',
        borderColor: 'border-muted/50',
        icon: AlertCircle,
      };
  }
};

export default function PrescriptionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [prescription, setPrescription] = useState<PrescriptionData | null>(null);

  // Format date to Arabic format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  useEffect(() => {
    // Simulate API call to fetch prescription details
    const fetchPrescription = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const foundPrescription = prescriptions.find((p) => p.id === params.id);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setPrescription(foundPrescription || null);
      } catch (error) {
        console.error('Error fetching prescription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
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

        {/* Prescription details skeleton */}
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
              <div className="grid gap-4 md:grid-cols-2">
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
                  {[1, 2].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardHeader className="p-4">
                        <Skeleton className="h-5 w-40" />
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prescription not found
  if (!prescription) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              الوصفة الطبية غير موجودة
            </h1>
            <p className="text-muted-foreground">
              لم يتم العثور على الوصفة الطبية المطلوبة
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
              الوصفة الطبية غير موجودة
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              لم يتم العثور على الوصفة الطبية المطلوبة. قد تكون الوصفة قد تم
              حذفها أو أن الرابط غير صحيح.
            </p>
            <Button variant="default" className="mt-6" asChild>
              <Link href="/patient-portal/prescriptions">
                عرض جميع الوصفات الطبية
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get status badge
  const statusBadge = getPrescriptionStatusBadge(prescription.status);
  const StatusIcon = statusBadge.icon;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            الوصفة الطبية{' '}
            <span className="text-muted-foreground">
              #{prescription.prescriptionNumber}
            </span>
          </h1>
          <p className="text-muted-foreground">
            تفاصيل الوصفة الطبية والأدوية الموصوفة
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة
          </Button>
        </div>
      </div>

      {/* Prescription details */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-primary/10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {prescription.doctorName
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">
                    {prescription.doctorName}
                  </h2>
                  <p className="text-muted-foreground">
                    {prescription.doctorSpecialty} - {prescription.clinicName}
                  </p>
                </div>
              </div>
              <Badge
                variant={'outline'}
                className={cn(
                  'text-sm flex items-center gap-1 px-3 py-1',
                  statusBadge.color,
                  statusBadge.bgColor,
                  statusBadge.borderColor
                )}
              >
                <StatusIcon className="h-4 w-4" />
                {statusBadge.label}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 pt-0">
            <div className="space-y-6">
              {/* Prescription dates */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-md bg-muted/30 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <Calendar className="h-4 w-4 text-primary/70" />
                    تاريخ الوصفة
                  </div>
                  <p>{formatDate(prescription.date)}</p>
                </div>
                <div className="rounded-md bg-muted/30 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <CalendarClock className="h-4 w-4 text-primary/70" />
                    تاريخ الإصدار
                  </div>
                  <p>{formatDate(prescription.issuedDate)}</p>
                </div>
                <div className="rounded-md bg-muted/30 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <CalendarRange className="h-4 w-4 text-primary/70" />
                    تاريخ الانتهاء
                  </div>
                  <p>{formatDate(prescription.expiryDate)}</p>
                </div>
              </div>

              <Separator className="bg-border/50" />

              {/* Medications */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary/70" />
                  الأدوية الموصوفة ({prescription.medications.length})
                </h3>

                <div className="space-y-4">
                  {prescription.medications.map((medication: MedicationItem) => (
                    <Card
                      key={medication.id}
                      className="overflow-hidden border border-border/50"
                    >
                      <CardHeader className="bg-muted/20 p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium">
                            {medication.name}
                          </h4>
                          {medication.refillable &&
                            medication.refillsRemaining > 0 && (
                              <Badge
                                variant="outline"
                                className="border-amber-500/50 text-amber-500 bg-amber-500/10"
                              >
                                يمكن إعادة الصرف ({medication.refillsRemaining}{' '}
                                مرات)
                              </Badge>
                            )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="grid gap-4 md:grid-cols-3 mb-4">
                          <div>
                            <p className="text-sm font-medium mb-1">الجرعة</p>
                            <p className="text-muted-foreground">
                              {medication.dosage}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">التكرار</p>
                            <p className="text-muted-foreground">
                              {medication.frequency}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">المدة</p>
                            <p className="text-muted-foreground">
                              {medication.duration}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-1">
                              تعليمات الاستخدام
                            </p>
                            <p className="text-muted-foreground bg-muted/20 p-2 rounded-md">
                              {medication.instructions}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-1 flex items-center gap-1">
                              <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                              الآثار الجانبية المحتملة
                            </p>
                            <p className="text-muted-foreground bg-amber-500/5 p-2 rounded-md border border-amber-500/10">
                              {medication.sideEffects}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-1 flex items-center gap-1">
                              <XCircle className="h-3.5 w-3.5 text-destructive" />
                              موانع الاستعمال
                            </p>
                            <p className="text-muted-foreground bg-destructive/5 p-2 rounded-md border border-destructive/10">
                              {medication.contraindications}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Diagnosis */}
              {prescription.diagnosis && (
                <>
                  <Separator className="bg-border/50" />
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-primary/70" />
                      التشخيص
                    </h3>
                    <Card className="border border-border/50">
                      <CardContent className="p-4">
                        <p>{prescription.diagnosis}</p>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {/* Notes */}
              {prescription.notes && (
                <>
                  <Separator className="bg-border/50" />
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary/70" />
                      ملاحظات وتعليمات
                    </h3>
                    <Card className="border border-border/50">
                      <CardContent className="p-4">
                        <p>{prescription.notes}</p>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {/* Related visit */}
              <Separator className="bg-border/50" />
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary/70" />
                  الزيارة المرتبطة
                </h3>
                <Button variant="outline" asChild>
                  <Link href={`/patient-portal/visits/${prescription.visitId}`}>
                    عرض تفاصيل الزيارة
                    <ChevronLeft className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6 bg-muted/20 flex flex-wrap gap-3">
            <Button className="gap-2">
              <Printer className="h-4 w-4" />
              طباعة الوصفة
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              تنزيل PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              مشاركة
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
