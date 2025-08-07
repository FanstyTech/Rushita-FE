'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Search,
  Filter,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  User,
  Building,
  Stethoscope,
  Pill,
  FileCheck,
  ArrowUpRight,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Skeleton from '@/components/ui/Skeleton';

// Import custom form components
import { Input, Select } from '@/components/common/form/index';

// Animation variants for staggered animations
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
      },
      {
        name: 'باراسيتامول',
        dosage: '500 مجم',
        frequency: 'عند الحاجة',
        duration: 'حسب الحاجة',
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
      },
      {
        name: 'إيبوبروفين',
        dosage: '400 مجم',
        frequency: 'عند الحاجة',
        duration: '3 أيام',
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
  {
    id: 'visit-3',
    doctorName: 'د. محمد علي',
    doctorSpecialty: 'جلدية',
    clinicName: 'عيادة الجلدية',
    date: '2025-05-15',
    time: '09:15',
    duration: 30, // minutes
    type: 'follow-up',
    chiefComplaint: 'طفح جلدي',
    diagnosis: 'التهاب جلدي تحسسي',
    notes:
      'تحسن الطفح الجلدي بنسبة 70%. يستمر المريض في استخدام الكريم الموصوف.',
    vitals: {
      temperature: 36.9,
      bloodPressure: '122/82',
      heartRate: 70,
      respiratoryRate: 15,
      oxygenSaturation: 98,
      weight: 74,
      height: 175,
    },
    medications: [
      {
        name: 'هيدروكورتيزون كريم',
        dosage: '1%',
        frequency: 'مرتين يومياً',
        duration: '14 يوم',
      },
      {
        name: 'سيتريزين',
        dosage: '10 مجم',
        frequency: 'مرة يومياً',
        duration: '10 أيام',
      },
    ],
    labTests: [
      {
        name: 'فحص الحساسية',
        status: 'completed',
        date: '2025-05-10',
        results: 'حساسية من حبوب اللقاح والغبار',
        reportUrl: '/reports/allergy-test-1.pdf',
      },
    ],
    followUp: {
      recommended: true,
      date: '2025-05-29',
      notes: 'متابعة بعد أسبوعين لتقييم الاستجابة للعلاج',
    },
    hasDocuments: true,
    hasPrescriptions: true,
  },
  {
    id: 'visit-4',
    doctorName: 'د. فاطمة أحمد',
    doctorSpecialty: 'عيون',
    clinicName: 'عيادة العيون',
    date: '2025-04-20',
    time: '11:30',
    duration: 30, // minutes
    type: 'routine',
    chiefComplaint: 'ضعف في الرؤية',
    diagnosis: 'قصر نظر',
    notes: 'تم إجراء فحص شامل للعين. يحتاج المريض لنظارة طبية جديدة.',
    vitals: {
      temperature: 37.0,
      bloodPressure: '120/80',
      heartRate: 72,
      respiratoryRate: 16,
      oxygenSaturation: 98,
      weight: 75,
      height: 175,
    },
    medications: [],
    labTests: [],
    followUp: {
      recommended: true,
      date: '2025-10-20',
      notes: 'متابعة بعد 6 أشهر',
    },
    hasDocuments: true,
    hasPrescriptions: false,
  },
  {
    id: 'visit-5',
    doctorName: 'د. خالد محمود',
    doctorSpecialty: 'باطنية',
    clinicName: 'عيادة الباطنية',
    date: '2025-03-10',
    time: '13:00',
    duration: 30, // minutes
    type: 'emergency',
    chiefComplaint: 'ألم شديد في البطن',
    diagnosis: 'التهاب المعدة الحاد',
    notes:
      'المريض يعاني من ألم شديد في البطن مع غثيان وقيء. تم وصف مضادات حيوية ومضادات للحموضة.',
    vitals: {
      temperature: 37.8,
      bloodPressure: '130/85',
      heartRate: 88,
      respiratoryRate: 18,
      oxygenSaturation: 97,
      weight: 74,
      height: 175,
    },
    medications: [
      {
        name: 'أوميبرازول',
        dosage: '20 مجم',
        frequency: 'مرة يومياً',
        duration: '14 يوم',
      },
      {
        name: 'سيبروفلوكساسين',
        dosage: '500 مجم',
        frequency: 'مرتين يومياً',
        duration: '7 أيام',
      },
      {
        name: 'ميتوكلوبراميد',
        dosage: '10 مجم',
        frequency: 'عند الحاجة',
        duration: '3 أيام',
      },
    ],
    labTests: [
      {
        name: 'تحليل الدم الكامل',
        status: 'completed',
        date: '2025-03-10',
        results: 'ارتفاع في كريات الدم البيضاء',
        reportUrl: '/reports/blood-test-2.pdf',
      },
      {
        name: 'أشعة بطن',
        status: 'completed',
        date: '2025-03-10',
        results: 'التهاب في المعدة',
        reportUrl: '/reports/abdomen-xray-1.pdf',
      },
    ],
    followUp: {
      recommended: true,
      date: '2025-03-17',
      notes: 'متابعة بعد أسبوع',
    },
    hasDocuments: true,
    hasPrescriptions: true,
  },
];

// Get visit type badge variant and label
const getVisitTypeBadge = (type: string) => {
  switch (type) {
    case 'routine':
      return {
        variant: 'outline',
        label: 'فحص روتيني',
        color:
          'text-blue-500 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
      };
    case 'follow-up':
      return {
        variant: 'secondary',
        label: 'متابعة',
        color:
          'text-purple-500 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800',
      };
    case 'emergency':
      return {
        variant: 'destructive',
        label: 'طارئ',
        color: 'text-destructive bg-destructive/10 border-destructive/20',
      };
    default:
      return {
        variant: 'outline',
        label: 'غير معروف',
        color: 'text-muted-foreground',
      };
  }
};

export default function VisitsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const visitsPerPage = 5;

  // Format date to Arabic format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Filter visits based on search query, specialty, and type
  const filteredVisits = visits.filter((visit) => {
    const matchesSearch =
      searchQuery === '' ||
      visit.doctorName.includes(searchQuery) ||
      visit.doctorSpecialty.includes(searchQuery) ||
      visit.clinicName.includes(searchQuery) ||
      visit.diagnosis.includes(searchQuery) ||
      visit.chiefComplaint.includes(searchQuery);

    const matchesSpecialty =
      selectedSpecialty === '' || visit.doctorSpecialty === selectedSpecialty;
    const matchesType = selectedType === '' || visit.type === selectedType;

    return matchesSearch && matchesSpecialty && matchesType;
  });

  // Sort visits by date (newest first)
  const sortedVisits = [...filteredVisits].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Pagination
  const indexOfLastVisit = currentPage * visitsPerPage;
  const indexOfFirstVisit = indexOfLastVisit - visitsPerPage;
  const currentVisits = sortedVisits.slice(indexOfFirstVisit, indexOfLastVisit);
  const totalPages = Math.ceil(sortedVisits.length / visitsPerPage);

  // Get unique specialties from visits
  const specialties = Array.from(
    new Set(visits.map((visit) => visit.doctorSpecialty))
  );

  // Visit types
  const visitTypes = [
    { value: 'routine', label: 'فحص روتيني' },
    { value: 'follow-up', label: 'متابعة' },
    { value: 'emergency', label: 'طارئ' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Page header skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        {/* Filter section skeleton */}
        <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center justify-between mb-1">
              <Skeleton className="h-8 w-40" />
            </div>
            <Skeleton className="h-4 w-full max-w-md" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Visits list skeleton */}
        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50"
              >
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-5 w-40 mb-1" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-md bg-muted/50 p-3">
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="rounded-md bg-muted/50 p-3">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-6 w-28 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Skeleton className="h-10 w-full rounded-md" />
                </CardFooter>
              </Card>
            ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <Skeleton className="h-8 w-8 rounded-md" />
          <div className="flex items-center gap-1">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-md" />
              ))}
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            سجل الزيارات الطبية
          </h1>
          <p className="text-muted-foreground">
            عرض سجل زياراتك الطبية السابقة والاطلاع على التشخيصات والوصفات
            الطبية
          </p>
        </div>
      </div>

      {/* Filters */}
      <motion.div variants={itemVariants} initial="hidden" animate="show">
        <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center justify-between mb-1">
              <CardTitle className="flex items-center text-lg">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Filter className="h-4 w-4 text-primary" />
                </div>
                تصفية النتائج
              </CardTitle>
            </div>
            <CardDescription className="text-muted-foreground text-sm">
              يمكنك تصفية الزيارات حسب التخصص أو نوع الزيارة أو البحث بالاسم
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Input
                  label="بحث"
                  placeholder="ابحث عن طبيب، تشخيص، أو شكوى..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startIcon={<Search className="h-4 w-4" />}
                  fullWidth
                />
              </div>
              <div className="space-y-2">
                <Select
                  label="التخصص"
                  placeholder="اختر التخصص"
                  options={[
                    { value: '', label: 'جميع التخصصات' },
                    ...specialties.map((specialty) => ({
                      value: specialty,
                      label: specialty,
                    })),
                  ]}
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  startIcon={<Stethoscope className="h-4 w-4" />}
                  fullWidth
                />
              </div>
              <div className="space-y-2">
                <Select
                  label="نوع الزيارة"
                  placeholder="اختر نوع الزيارة"
                  options={[
                    { value: '', label: 'جميع الأنواع' },
                    ...visitTypes,
                  ]}
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  startIcon={<Calendar className="h-4 w-4" />}
                  fullWidth
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Visits list */}
      {loading ? (
        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50"
              >
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-4 w-full max-w-[200px]" />
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
        </div>
      ) : currentVisits.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {currentVisits.map((visit) => (
            <motion.div key={visit.id} variants={itemVariants}>
              <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50 hover:shadow-lg transition-all duration-200">
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Stethoscope className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {visit.doctorName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {visit.doctorSpecialty} - {visit.clinicName}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={cn(
                        'font-normal',
                        visit.type && getVisitTypeBadge(visit.type).color
                      )}
                    >
                      {visit.type && getVisitTypeBadge(visit.type).label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5 text-primary/70" />
                        <span>{formatDate(visit.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1.5 text-primary/70" />
                        <span>{visit.time}</span>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-md bg-muted/50 p-3">
                        <p className="text-sm font-medium mb-1">
                          الشكوى الرئيسية
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {visit.chiefComplaint}
                        </p>
                      </div>
                      <div className="rounded-md bg-muted/50 p-3">
                        <p className="text-sm font-medium mb-1">التشخيص</p>
                        <p className="text-sm text-muted-foreground">
                          {visit.diagnosis}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {visit.hasPrescriptions && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800"
                        >
                          <Pill className="h-3 w-3 mr-1" />
                          وصفة طبية
                        </Badge>
                      )}
                      {visit.hasDocuments && (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          مستندات
                        </Badge>
                      )}
                      {visit.labTests && visit.labTests.length > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800"
                        >
                          <FileCheck className="h-3 w-3 mr-1" />
                          {visit.labTests.length} تحاليل
                        </Badge>
                      )}
                      {visit.followUp && visit.followUp.recommended && (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800"
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          متابعة
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="default" className="w-full group" asChild>
                    <Link
                      href={`/patient-portal/visits/${visit.id}`}
                      className="flex items-center justify-center"
                    >
                      عرض تفاصيل الزيارة
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} initial="hidden" animate="show">
          <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
            <CardContent className="p-10 flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-1">لا توجد زيارات</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                لم يتم العثور على أي زيارات تطابق معايير البحث. يرجى تعديل
                معايير البحث أو حجز موعد جديد.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="flex justify-center items-center gap-2 mt-6"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  'h-8 w-8 p-0',
                  currentPage === page && 'bg-primary text-primary-foreground'
                )}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
