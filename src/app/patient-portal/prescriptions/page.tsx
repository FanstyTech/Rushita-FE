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
  X,
  Microscope,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input, Select } from '@/components/common/form/index';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useVisitPrescription } from '@/lib/api/hooks/useVisitPrescription';
import {
  MedicationStatus,
  PatientPrescriptionFilterDto,
} from '@/lib/api/types/visit-prescription';
import {
  getDurationUnitLabel,
  getFrequencyTypeLabel,
  getMedicationStatusClass,
  getMedicationStatusLabel,
} from '@/utils/textUtils';
import { formatDate } from '@/utils/dateTimeUtils';
import { Pagination, usePagination } from '@/components/ui/pagination';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { SelectOption } from '@/lib/api/types/select-option';

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

export default function PrescriptionsPage() {
  const router = useRouter();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<MedicationStatus | ''>(
    ''
  );
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Pagination hook
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination(10);

  // Add state for expanded cards
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  // Toggle card expansion
  const toggleCardExpansion = (cardId: string) => {
    const newExpandedCards = new Set(expandedCards);
    if (newExpandedCards.has(cardId)) {
      newExpandedCards.delete(cardId);
    } else {
      newExpandedCards.add(cardId);
    }
    setExpandedCards(newExpandedCards);
  };

  // API hooks
  const { useSpecialtiesDropdown: getSpecialtiesForDropdown } = useSpecialty();

  // Build API filters object
  const buildApiFilters = () => {
    const filters: PatientPrescriptionFilterDto = {
      pageNumber: currentPage,
      pageSize: pageSize,
    };

    // Add search filter
    if (searchQuery.trim()) {
      filters.searchValue = searchQuery.trim();
    }

    // Add status filter
    if (selectedStatus) {
      filters.medicationStatus = selectedStatus;
    }

    // Add specialty filter
    if (selectedSpecialty !== 'all') {
      filters.specialtyId = selectedSpecialty;
    }

    return filters;
  };

  // Fetch prescriptions using the hook
  const { getPatientPortalPrescriptions } = useVisitPrescription();
  const {
    data: prescriptionsData,
    isLoading,
    error,
  } = getPatientPortalPrescriptions(buildApiFilters());

  // Fetch specialties
  const { data: specialties } = getSpecialtiesForDropdown();

  const prescriptions = prescriptionsData?.items || [];

  // Get total active prescriptions
  const activePrescriptions = prescriptions.filter(
    (prescription) => prescription.medicationStatus === MedicationStatus.Active
  ).length;

  // Get total medications
  const totalMedications = prescriptions.reduce(
    (total, prescription) => total + prescription.quantityInfo.quantity,
    0
  );

  // Handle filter changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusFilter = (status: MedicationStatus | '') => {
    setSelectedStatus(status);
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialty(specialty);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('');
    setSelectedSpecialty('all');
  };

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-500 mb-2">فشل في تحميل الوصفات الطبية</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* إجمالي الوصفات */}
        <Card className="backdrop-blur-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  إجمالي الوصفات
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {prescriptions.length}
                </p>
              </div>
              <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/20">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* وصفات سارية */}
        <Card className="backdrop-blur-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  وصفات سارية
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {activePrescriptions}
                </p>
              </div>
              <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/20">
                <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* وصفات منتهية */}
        <Card className="backdrop-blur-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  وصفات منتهية
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {prescriptions.filter(p => p.medicationStatus === MedicationStatus.Completed).length}
                </p>
              </div>
              <div className="rounded-full p-3 bg-yellow-100 dark:bg-yellow-900/20">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* وصفات منتهية الصلاحية */}
        <Card className="backdrop-blur-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  منتهية الصلاحية
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {prescriptions.filter(p => p.medicationStatus === MedicationStatus.Expired).length}
                </p>
              </div>
              <div className="rounded-full p-3 bg-red-100 dark:bg-red-900/20">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters section */}
      <motion.div variants={itemVariants} initial="hidden" animate="show">
        <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
          <CardHeader className="bg-primary/5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  تصفية النتائج
                </CardTitle>
                <CardDescription className="mt-1">
                  يمكنك تصفية الوصفات حسب الحالة أو التخصص أو البحث بالاسم
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs flex items-center gap-1 hover:bg-primary/10"
                onClick={handleResetFilters}
              >
                <X className="h-3 w-3" />
                إعادة ضبط الفلاتر
              </Button>
            </div>
          </CardHeader>

        <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Search input */}
              <div className="space-y-2">
              <Input
                  label="بحث"
                  placeholder="ابحث عن دواء، طبيب، أو تشخيص..."
                value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  startIcon={<Search className="h-4 w-4" />}
                  fullWidth
              />
            </div>

              {/* Status filter */}
              {/* <div className="space-y-2">
              <Select
                  label="حالة الوصفة"
                value={selectedStatus}
                  onChange={(e) =>
                    handleStatusFilter(e.target.value as MedicationStatus | '')
                  }
                options={[
                  { value: '', label: 'جميع الحالات' },
                    ...Object.entries(MedicationStatus)
                      .filter(([key]) => isNaN(Number(key)))
                      .map(([_, value]) => ({
                        value: value.toString(),
                        label: getMedicationStatusLabel(
                          value as MedicationStatus
                        ),
                      })),
                  ]}
                />
              </div> */}

              {/* Specialty filter */}
              <div className="space-y-2">
              <Select
                  label="التخصص"
                value={selectedSpecialty}
                  onChange={(e) => handleSpecialtyChange(e.target.value)}
                options={[
                    { value: 'all', label: 'All Specialties' },
                    ...(specialties?.map((specialty: SelectOption<string>) => ({
                      value: specialty.value,
                      label: specialty.label || '',
                    })) || []),
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>

      {/* Prescriptions list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-32 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : prescriptions.length > 0 ? (
          prescriptions.map((prescription) => (
            <motion.div key={prescription.id} variants={itemVariants}>
              <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <CardContent className="p-0">
                  {/* Header Section - Always Visible */}
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-3 bg-blue-500/10">
                          <FileText className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              وصفة طبية -{' '}
                              {prescription.doctorInfo.doctorSpecialty}
                            </h3>
                            <Badge
                              variant="outline"
                              className={cn(
                                'text-xs',
                                getMedicationStatusClass(
                                  prescription.medicationStatus
                                )
                              )}
                            >
                              {getMedicationStatusLabel(
                                prescription.medicationStatus
                              )}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            {prescription.doctorInfo.doctorName} -{' '}
                            {prescription.doctorInfo.clinicName}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatDate(prescription.doctorInfo.prescribeDate)}
                          </p>
                        </div>
                      </div>
                      
                      {/* Expand/Collapse Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCardExpansion(prescription.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {expandedCards.has(prescription.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  {expandedCards.has(prescription.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <Separator className="bg-border/50" />

                      <div className="p-6">
                        <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                          <Pill className="h-4 w-4" />
                          تفاصيل الدواء
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted/20 backdrop-blur-sm rounded-lg p-4 border border-border/30">
                            <div className="space-y-3">
                              {/* Medicine Name and Code */}
                              <div>
                                <h5 className="font-semibold text-lg">
                                  {prescription.medicineInfo.medicineName}
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                  كود: {prescription.medicineInfo.medicineCode}
                                </p>
                                {prescription.medicineInfo.scientificName && (
                                  <p className="text-xs text-muted-foreground">
                                    الاسم العلمي:{' '}
                                    {prescription.medicineInfo.scientificName}
                                  </p>
                                )}
                              </div>

                              {/* Dosage Information */}
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">
                                    الجرعة:
                                  </span>
                                  <span className="text-sm">
                                    {prescription.prescriptionDetails.dosage}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">
                                    التكرار:
                                  </span>
                                  <span className="text-sm">
                                    {getFrequencyTypeLabel(
                                      prescription.prescriptionDetails.frequency
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">
                                    المدة:
                                  </span>
                                  <span className="text-sm">
                                    {prescription.prescriptionDetails.duration}{' '}
                                    {getDurationUnitLabel(
                                      prescription.prescriptionDetails.durationUnit
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Treatment Dates */}
                          <div className="bg-muted/20 backdrop-blur-sm rounded-lg p-4 border border-border/30">
                            <h5 className="font-medium mb-3 flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              تواريخ العلاج
                            </h5>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">تاريخ الوصفة:</span>
                                <span className="text-sm">
                                  {formatDate(
                                    prescription.doctorInfo.prescribeDate
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">
                                  تاريخ انتهاء العلاج:
                                </span>
                                <span className="text-sm">
                                  {formatDate(
                                    prescription.dateInfo.treatmentEndDate
                                  )}
                                </span>
                              </div>
                              {prescription.dateInfo.expiryDate && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">
                                    تاريخ انتهاء الصلاحية:
                                  </span>
                                  <span className="text-sm">
                                    {formatDate(prescription.dateInfo.expiryDate)}
                                  </span>
                                </div>
                              )}
                              {prescription.dateInfo.lastDispensedDate && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">آخر صرف:</span>
                                  <span className="text-sm">
                                    {formatDate(
                                      prescription.dateInfo.lastDispensedDate
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {prescription.additionalInfo.diagnosis && (
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
                                  {prescription.additionalInfo.diagnosis}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {prescription.prescriptionDetails.notes && (
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
                                  {prescription.prescriptionDetails.notes}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
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

      {/* Pagination Component */}
      {prescriptionsData && prescriptionsData.totalCount > 0 && (
        <Pagination
          currentPage={prescriptionsData.pageNumber}
          totalPages={prescriptionsData.totalPages}
          totalCount={prescriptionsData.totalCount}
          pageSize={pageSize}
          hasPreviousPage={prescriptionsData.hasPreviousPage}
          hasNextPage={prescriptionsData.hasNextPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          showPageSizeSelector={true}
          pageSizeOptions={[5, 10, 20, 50]}
          className="mt-6"
        />
      )}
    </div>
  );
}
