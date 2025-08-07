'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Search,
  Filter,
  FileText,
  Download,
  Printer,
  User,
  Building,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Info,
  Eye,
  Microscope,
  Beaker,
  Droplet,
  Scan,
  CheckCircle,
  Circle,
  Loader2,
  AlertTriangle,
  AlertOctagon,
  CalendarCheck,
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
import { Input, Select } from '@/components/common/form/index';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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

// Dummy lab results data
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
  },
  {
    id: 'lab-2',
    visitId: 'visit-2',
    testName: 'تحليل وظائف الكبد',
    testType: 'blood',
    doctorName: 'د. سارة خالد',
    doctorSpecialty: 'باطنية',
    clinicName: 'عيادة الباطنية',
    labName: 'مختبر الشفاء',
    requestDate: '2025-06-20',
    resultDate: '2025-06-22',
    status: 'completed',
    abnormalFlags: 1,
    criticalFlags: 0,
    notes: '',
    reportUrl: '/reports/liver-function-test.pdf',
  },
  {
    id: 'lab-3',
    visitId: 'visit-3',
    testName: 'تحليل وظائف الكلى',
    testType: 'blood',
    doctorName: 'د. سارة خالد',
    doctorSpecialty: 'باطنية',
    clinicName: 'عيادة الباطنية',
    labName: 'مختبر الشفاء',
    requestDate: '2025-06-20',
    resultDate: '2025-06-22',
    status: 'completed',
    abnormalFlags: 0,
    criticalFlags: 0,
    notes: 'نتائج التحليل طبيعية',
    reportUrl: '/reports/kidney-function-test.pdf',
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
  },
  {
    id: 'lab-5',
    visitId: 'visit-5',
    testName: 'تحليل السكر التراكمي',
    testType: 'blood',
    doctorName: 'د. خالد محمود',
    doctorSpecialty: 'غدد صماء',
    clinicName: 'عيادة الغدد الصماء',
    labName: 'مختبر الصحة',
    requestDate: '2025-04-10',
    resultDate: '2025-04-12',
    status: 'completed',
    abnormalFlags: 1,
    criticalFlags: 0,
    notes: 'مستوى السكر التراكمي مرتفع قليلاً، يرجى الالتزام بالنظام الغذائي',
    reportUrl: '/reports/hba1c-test.pdf',
  },
  {
    id: 'lab-6',
    visitId: 'visit-6',
    testName: 'تحليل البول الشامل',
    testType: 'urine',
    doctorName: 'د. فاطمة أحمد',
    doctorSpecialty: 'مسالك بولية',
    clinicName: 'عيادة المسالك البولية',
    labName: 'مختبر الشفاء',
    requestDate: '2025-03-05',
    resultDate: '2025-03-06',
    status: 'completed',
    abnormalFlags: 0,
    criticalFlags: 0,
    notes: '',
    reportUrl: '/reports/urinalysis.pdf',
  },
  {
    id: 'lab-7',
    visitId: 'visit-7',
    testName: 'تحليل الغدة الدرقية',
    testType: 'blood',
    doctorName: 'د. خالد محمود',
    doctorSpecialty: 'غدد صماء',
    clinicName: 'عيادة الغدد الصماء',
    labName: 'مختبر الصحة',
    requestDate: '2025-02-20',
    resultDate: null,
    status: 'in-progress',
    abnormalFlags: 0,
    criticalFlags: 0,
    notes: '',
    reportUrl: null,
  },
  {
    id: 'lab-8',
    visitId: 'visit-8',
    testName: 'تحليل فيتامين د',
    testType: 'blood',
    doctorName: 'د. سارة خالد',
    doctorSpecialty: 'باطنية',
    clinicName: 'عيادة الباطنية',
    labName: 'مختبر الشفاء',
    requestDate: '2025-08-01',
    resultDate: null,
    status: 'requested',
    abnormalFlags: 0,
    criticalFlags: 0,
    notes: 'يرجى الصيام لمدة 8 ساعات قبل التحليل',
    reportUrl: null,
  },
];

// Get lab result status badge variant and label
const getLabResultStatusBadge = (status: string) => {
  let variant = '';
  let label = '';

  switch (status) {
    case 'requested':
      variant = 'outline';
      label = 'تم الطلب';
      break;
    case 'in-progress':
      variant = 'secondary';
      label = 'قيد التنفيذ';
      break;
    case 'completed':
      variant = 'success';
      label = 'مكتمل';
      break;
    case 'cancelled':
      variant = 'destructive';
      label = 'ملغي';
      break;
    default:
      variant = 'outline';
      label = status;
  }

  return { variant, label };
};

// Get test type badge variant and label
const getTestTypeBadge = (type: string) => {
  let variant = '';
  let label = '';

  switch (type) {
    case 'blood':
      variant = 'blood';
      label = 'دم';
      break;
    case 'urine':
      variant = 'urine';
      label = 'بول';
      break;
    case 'stool':
      variant = 'stool';
      label = 'براز';
      break;
    case 'imaging':
      variant = 'imaging';
      label = 'أشعة';
      break;
    default:
      variant = 'default';
      label = type;
  }

  return { variant, label };
};

export default function LabResultsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  // Filter lab results based on search query and filters
  const filteredResults = labResults.filter((result) => {
    const matchesSearch =
      searchQuery === '' ||
      result.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.clinicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.labName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || result.status === statusFilter;

    const matchesType = typeFilter === 'all' || result.testType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const currentResults = filteredResults.slice(
    startIndex,
    startIndex + resultsPerPage
  );

  // Handle pagination
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate summary statistics
  const totalResults = labResults.length;
  const completedResults = labResults.filter(
    (result) => result.status === 'completed'
  ).length;
  const pendingResults = labResults.filter(
    (result) => result.status === 'requested' || result.status === 'in-progress'
  ).length;
  const abnormalResults = labResults.filter(
    (result) => result.abnormalFlags > 0 || result.criticalFlags > 0
  ).length;

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Page header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          نتائج التحاليل المخبرية
        </h1>
        <p className="text-muted-foreground">
          عرض وإدارة نتائج التحاليل المخبرية الخاصة بك
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي التحاليل</p>
                <h3 className="text-2xl font-bold">{totalResults}</h3>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Microscope className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">تحاليل مكتملة</p>
                <h3 className="text-2xl font-bold">{completedResults}</h3>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <Beaker className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  تحاليل قيد الانتظار
                </p>
                <h3 className="text-2xl font-bold">{pendingResults}</h3>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-full">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  نتائج غير طبيعية
                </p>
                <h3 className="text-2xl font-bold">{abnormalResults}</h3>
              </div>
              <div className="p-3 bg-red-500/10 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Filter className="h-5 w-5" />
            تصفية النتائج
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                بحث
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="ابحث عن اسم التحليل، الطبيب، العيادة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                الحالة
              </label>
              {/* <Select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">جميع الحالات</option>
                <option value="requested">تم الطلب</option>
                <option value="in-progress">قيد التنفيذ</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغي</option>
              </Select> */}
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                نوع التحليل
              </label>
              {/* <Select
                id="type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">جميع الأنواع</option>
                <option value="blood">دم</option>
                <option value="urine">بول</option>
                <option value="stool">براز</option>
                <option value="imaging">أشعة</option>
              </Select> */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lab results list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {currentResults.length > 0 ? (
          currentResults.map((result) => {
            const statusBadge = getLabResultStatusBadge(result.status);
            const typeBadge = getTestTypeBadge(result.testType);

            return (
              <motion.div key={result.id} variants={itemVariants}>
                <Card className="overflow-hidden backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="relative">
                    {/* Status indicator strip */}
                    <div
                      className={cn(
                        'absolute top-0 left-0 w-1 h-full',
                        result.status === 'completed'
                          ? 'bg-emerald-500'
                          : result.status === 'pending'
                          ? 'bg-amber-500'
                          : result.status === 'processing'
                          ? 'bg-blue-500'
                          : 'bg-slate-400'
                      )}
                    />

                    {/* Card header with test name and badges */}
                    <div className="border-b border-border/40 p-5 pr-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'p-2 rounded-full',
                              result.testType === 'blood'
                                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                : result.testType === 'urine'
                                ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                                : result.testType === 'imaging'
                                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400'
                            )}
                          >
                            {result.testType === 'blood' ? (
                              <Droplet className="h-5 w-5" />
                            ) : result.testType === 'urine' ? (
                              <Droplet className="h-5 w-5" />
                            ) : result.testType === 'imaging' ? (
                              <Scan className="h-5 w-5" />
                            ) : (
                              <Microscope className="h-5 w-5" />
                            )}
                          </div>
                          <h3 className="text-xl font-semibold">
                            {result.testName}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant={statusBadge.variant as any}
                            className="px-3 py-1"
                          >
                            <div className="flex items-center gap-1.5">
                              {result.status === 'completed' ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : result.status === 'pending' ? (
                                <Clock className="h-3 w-3" />
                              ) : result.status === 'processing' ? (
                                <Loader2 className="h-3 w-3" />
                              ) : (
                                <Circle className="h-3 w-3" />
                              )}
                              {statusBadge.label}
                            </div>
                          </Badge>
                          <Badge
                            variant={typeBadge.variant as any}
                            className="px-3 py-1"
                          >
                            {typeBadge.label}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-0">
                      {/* Main content */}
                      <div className="p-5 pr-6">
                        <div className="flex flex-col gap-5">
                          {/* Info grid */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Left column - Doctor & Clinic */}
                            <div className="space-y-3 md:border-l md:border-border/30 md:pl-4">
                              <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-1.5 rounded-md">
                                  <User className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    الطبيب
                                  </p>
                                  <p className="font-medium">
                                    {result.doctorName}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {result.doctorSpecialty}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="bg-blue-500/10 p-1.5 rounded-md">
                                  <Building className="h-4 w-4 text-blue-500" />
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    العيادة
                                  </p>
                                  <p className="font-medium">
                                    {result.clinicName}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Middle column - Lab & Dates */}
                            <div className="space-y-3 md:border-l md:border-border/30 md:pl-4">
                              <div className="flex items-center gap-2">
                                <div className="bg-emerald-500/10 p-1.5 rounded-md">
                                  <Microscope className="h-4 w-4 text-emerald-500" />
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    المختبر
                                  </p>
                                  <p className="font-medium">
                                    {result.labName}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="bg-purple-500/10 p-1.5 rounded-md">
                                  <Calendar className="h-4 w-4 text-purple-500" />
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    تاريخ الطلب
                                  </p>
                                  <p className="font-medium">
                                    {new Date(
                                      result.requestDate
                                    ).toLocaleDateString('ar-SA', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Right column - Result Date & Flags */}
                            <div className="space-y-3">
                              {result.resultDate && (
                                <div className="flex items-center gap-2">
                                  <div className="bg-amber-500/10 p-1.5 rounded-md">
                                    <CalendarCheck className="h-4 w-4 text-amber-500" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      تاريخ النتيجة
                                    </p>
                                    <p className="font-medium">
                                      {new Date(
                                        result.resultDate
                                      ).toLocaleDateString('ar-SA', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                      })}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Flags */}
                              <div className="flex flex-wrap gap-2">
                                {result.abnormalFlags > 0 && (
                                  <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-md text-xs">
                                    <AlertTriangle className="h-3 w-3" />
                                    <span>
                                      {result.abnormalFlags} نتائج غير طبيعية
                                    </span>
                                  </div>
                                )}
                                {result.criticalFlags > 0 && (
                                  <div className="flex items-center gap-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded-md text-xs">
                                    <AlertOctagon className="h-3 w-3" />
                                    <span>
                                      {result.criticalFlags} نتائج حرجة
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Notes */}
                          {result.notes && (
                            <div className="bg-muted/40 rounded-lg p-3 border border-border/30">
                              <div className="flex gap-2">
                                <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{result.notes}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions footer */}
                      <div className="border-t border-border/40 p-4 bg-muted/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="text-sm text-muted-foreground">
                          رقم التحليل:{' '}
                          <span className="font-mono">{result.id}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 self-end sm:self-center">
                          {result.status === 'completed' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={() => {
                                  // Handle download functionality
                                  alert('تنزيل التقرير');
                                }}
                              >
                                <Download className="h-4 w-4" />
                                <span>تنزيل</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={() => {
                                  // Handle print functionality
                                  alert('طباعة التقرير');
                                }}
                              >
                                <Printer className="h-4 w-4" />
                                <span>طباعة</span>
                              </Button>
                            </>
                          )}
                          <Button asChild>
                            <Link
                              href={`/patient-portal/lab-results/${result.id}`}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              عرض التفاصيل
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            );
          })
        ) : (
          <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <AlertCircle className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-xl font-semibold">لا توجد نتائج تحاليل</h3>
                <p className="text-muted-foreground">
                  لم يتم العثور على نتائج تحاليل تطابق معايير البحث
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 space-x-reverse mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">الصفحة السابقة</span>
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className={cn(
                      'w-8 h-8 p-0',
                      currentPage === page
                        ? 'bg-primary text-primary-foreground'
                        : ''
                    )}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">الصفحة التالية</span>
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
