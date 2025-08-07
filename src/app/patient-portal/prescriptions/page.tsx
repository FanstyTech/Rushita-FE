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
  Pill,
  User,
  Building,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Info,
  Eye,
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

// Dummy prescriptions data
const prescriptions = [
  {
    id: 'presc-1',
    visitId: 'visit-1',
    doctorName: 'د. أحمد محمد',
    doctorSpecialty: 'طب عام',
    clinicName: 'عيادة الطب العام',
    date: '2025-07-10',
    status: 'active', // active, completed, cancelled
    medications: [
      {
        name: 'ديكلوفيناك',
        dosage: '50 مجم',
        frequency: 'مرتين يومياً',
        duration: '7 أيام',
        instructions: 'يؤخذ بعد الطعام',
        refillable: true,
        refillsRemaining: 2,
      },
      {
        name: 'باراسيتامول',
        dosage: '500 مجم',
        frequency: 'عند الحاجة',
        duration: 'حسب الحاجة',
        instructions: 'يؤخذ عند الشعور بالألم، بحد أقصى 4 مرات في اليوم',
        refillable: false,
        refillsRemaining: 0,
      },
    ],
    diagnosis: 'التهاب المفاصل الروماتويدي',
    notes: 'يجب مراجعة الطبيب بعد انتهاء الوصفة',
  },
  {
    id: 'presc-2',
    visitId: 'visit-2',
    doctorName: 'د. سارة خالد',
    doctorSpecialty: 'أسنان',
    clinicName: 'عيادة الأسنان',
    date: '2025-06-20',
    status: 'active',
    medications: [
      {
        name: 'أموكسيسيلين',
        dosage: '500 مجم',
        frequency: '3 مرات يومياً',
        duration: '5 أيام',
        instructions: 'يؤخذ قبل الطعام بساعة',
        refillable: false,
        refillsRemaining: 0,
      },
      {
        name: 'إيبوبروفين',
        dosage: '400 مجم',
        frequency: 'عند الحاجة',
        duration: '3 أيام',
        instructions: 'يؤخذ بعد الطعام عند الشعور بالألم',
        refillable: false,
        refillsRemaining: 0,
      },
    ],
    diagnosis: 'تسوس في الضرس العلوي الأيمن',
    notes: '',
  },
  {
    id: 'presc-3',
    visitId: 'visit-3',
    doctorName: 'د. محمد علي',
    doctorSpecialty: 'جلدية',
    clinicName: 'عيادة الجلدية',
    date: '2025-05-15',
    status: 'completed',
    medications: [
      {
        name: 'هيدروكورتيزون كريم',
        dosage: '1%',
        frequency: 'مرتين يومياً',
        duration: '10 أيام',
        instructions: 'يوضع على المنطقة المصابة بطبقة رقيقة',
        refillable: true,
        refillsRemaining: 0,
      },
      {
        name: 'سيتريزين',
        dosage: '10 مجم',
        frequency: 'مرة واحدة يومياً',
        duration: '14 يوم',
        instructions: 'يؤخذ قبل النوم',
        refillable: false,
        refillsRemaining: 0,
      },
    ],
    diagnosis: 'التهاب جلدي تحسسي',
    notes: 'تجنب استخدام الصابون المعطر والمنظفات القوية',
  },
  {
    id: 'presc-4',
    visitId: 'visit-5',
    doctorName: 'د. خالد محمود',
    doctorSpecialty: 'باطنية',
    clinicName: 'عيادة الباطنية',
    date: '2025-07-05',
    status: 'active',
    medications: [
      {
        name: 'أتورفاستاتين',
        dosage: '20 مجم',
        frequency: 'مرة واحدة يومياً',
        duration: '30 يوم',
        instructions: 'يؤخذ في المساء',
        refillable: true,
        refillsRemaining: 5,
      },
      {
        name: 'أملوديبين',
        dosage: '5 مجم',
        frequency: 'مرة واحدة يومياً',
        duration: '30 يوم',
        instructions: 'يؤخذ في الصباح',
        refillable: true,
        refillsRemaining: 5,
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
      };
    case 'completed':
      return {
        variant: 'secondary',
        label: 'منتهية',
        color: 'text-secondary-foreground',
        bgColor: 'bg-secondary/10',
        borderColor: 'border-secondary/50',
      };
    case 'cancelled':
      return {
        variant: 'destructive',
        label: 'ملغية',
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

export default function PrescriptionsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const prescriptionsPerPage = 5;

  // Format date to Arabic format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Filter prescriptions based on search query, status, and specialty
  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      searchQuery === '' ||
      prescription.doctorName.includes(searchQuery) ||
      prescription.doctorSpecialty.includes(searchQuery) ||
      prescription.clinicName.includes(searchQuery) ||
      prescription.diagnosis.includes(searchQuery) ||
      prescription.medications.some((med) => med.name.includes(searchQuery));

    const matchesStatus =
      selectedStatus === '' || prescription.status === selectedStatus;
    const matchesSpecialty =
      selectedSpecialty === '' ||
      prescription.doctorSpecialty === selectedSpecialty;

    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  // Sort prescriptions by date (newest first)
  const sortedPrescriptions = [...filteredPrescriptions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Pagination
  const indexOfLastPrescription = currentPage * prescriptionsPerPage;
  const indexOfFirstPrescription =
    indexOfLastPrescription - prescriptionsPerPage;
  const currentPrescriptions = sortedPrescriptions.slice(
    indexOfFirstPrescription,
    indexOfLastPrescription
  );
  const totalPages = Math.ceil(
    sortedPrescriptions.length / prescriptionsPerPage
  );

  // Get unique specialties from prescriptions
  const specialties = Array.from(
    new Set(prescriptions.map((prescription) => prescription.doctorSpecialty))
  );

  // Get total active prescriptions
  const activePrescriptions = prescriptions.filter(
    (prescription) => prescription.status === 'active'
  ).length;

  // Get total medications
  const totalMedications = prescriptions.reduce(
    (total, prescription) => total + prescription.medications.length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">الوصفات الطبية</h1>
        <p className="text-muted-foreground">
          عرض وإدارة الوصفات الطبية الخاصة بك
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">وصفات سارية</p>
                <p className="text-3xl font-bold">{activePrescriptions}</p>
              </div>
              <div className="rounded-full p-3 bg-green-500/10">
                <FileText className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الأدوية</p>
                <p className="text-3xl font-bold">{totalMedications}</p>
              </div>
              <div className="rounded-full p-3 bg-blue-500/10">
                <Pill className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                id="search"
                placeholder="البحث عن وصفة أو دواء..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startIcon={<Search className="h-4 w-4 text-muted-foreground" />}
              />
            </div>

            <div>
              <Select
                id="status"
                placeholder="حالة الوصفة"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                options={[
                  { value: '', label: 'جميع الحالات' },
                  { value: 'active', label: 'سارية' },
                  { value: 'completed', label: 'منتهية' },
                  { value: 'cancelled', label: 'ملغية' },
                ]}
              />
            </div>

            <div>
              <Select
                id="specialty"
                placeholder="التخصص"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                options={[
                  { value: '', label: 'جميع التخصصات' },
                  ...specialties.map((specialty) => ({
                    value: specialty,
                    label: specialty,
                  })),
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {currentPrescriptions.length > 0 ? (
          currentPrescriptions.map((prescription) => (
            <motion.div key={prescription.id} variants={itemVariants}>
              <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-3 bg-blue-500/10">
                          <FileText className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              وصفة طبية - {prescription.doctorSpecialty}
                            </h3>
                            <Badge
                              variant={
                                getPrescriptionStatusBadge(prescription.status)
                                  .variant as any
                              }
                              className={cn(
                                'text-xs',
                                getPrescriptionStatusBadge(prescription.status)
                                  .color,
                                getPrescriptionStatusBadge(prescription.status)
                                  .bgColor,
                                getPrescriptionStatusBadge(prescription.status)
                                  .borderColor
                              )}
                            >
                              {
                                getPrescriptionStatusBadge(prescription.status)
                                  .label
                              }
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            {prescription.doctorName} -{' '}
                            {prescription.clinicName}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatDate(prescription.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-500/20 text-blue-500 hover:bg-blue-500/10"
                          asChild
                        >
                          <Link
                            href={`/patient-portal/prescriptions/${prescription.id}`}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            عرض التفاصيل
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500/20 text-green-500 hover:bg-green-500/10"
                        >
                          <Printer className="h-4 w-4 mr-1" />
                          طباعة
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="p-6">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <Pill className="h-4 w-4" />
                      الأدوية ({prescription.medications.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {prescription.medications.map((med, index) => (
                        <div
                          key={index}
                          className="bg-muted/20 backdrop-blur-sm rounded-lg p-4 border border-border/30"
                        >
                          <div className="flex items-start gap-3">
                            <div className="rounded-full p-1.5 bg-blue-500/10 mt-0.5">
                              <Pill className="h-4 w-4 text-blue-500" />
                            </div>
                            <div>
                              <p className="font-medium">{med.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {med.dosage} - {med.frequency} - {med.duration}
                              </p>
                              {med.refillable && med.refillsRemaining > 0 && (
                                <Badge
                                  variant="outline"
                                  className="mt-2 text-xs border-amber-500/50 text-amber-500 bg-amber-500/10"
                                >
                                  يمكن إعادة الصرف ({med.refillsRemaining} مرات)
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {prescription.diagnosis && (
                    <>
                      <Separator className="bg-border/50" />
                      <div className="p-6">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full p-1.5 bg-green-500/10 mt-0.5">
                            <Info className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">التشخيص</p>
                            <p className="text-muted-foreground">
                              {prescription.diagnosis}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {prescription.notes && (
                    <>
                      <Separator className="bg-border/50" />
                      <div className="p-6">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full p-1.5 bg-amber-500/10 mt-0.5">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                          </div>
                          <div>
                            <p className="font-medium">ملاحظات</p>
                            <p className="text-muted-foreground">
                              {prescription.notes}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="rounded-full p-3 bg-muted/50 mx-auto mb-3 w-fit">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">لا توجد وصفات طبية</h3>
              <p className="text-muted-foreground">
                لم يتم العثور على وصفات طبية تطابق معايير البحث
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-full border-border/50 hover:bg-muted/50"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">الصفحة السابقة</span>
          </Button>
          <span className="text-sm text-muted-foreground">
            صفحة {currentPage} من {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-full border-border/50 hover:bg-muted/50"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">الصفحة التالية</span>
          </Button>
        </div>
      )}
    </div>
  );
}
