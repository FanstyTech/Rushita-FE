'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Search,
  Filter,
  FileText,
  Stethoscope,
  Pill,
  FileCheck,
  ArrowUpRight,
  AlertCircle,
  X,
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
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Skeleton from '@/components/ui/Skeleton';
import { Input, Select } from '@/components/common/form/index';
import { getVisitTypeLabel } from '@/utils/textUtils';
import { formatDate, formatTime } from '@/utils/dateTimeUtils';
import { VisitType } from '@/lib/api/types/appointment';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { SelectOption } from '@/lib/api/types/select-option';
import { Pagination, usePagination } from '@/components/ui/pagination';

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

export default function VisitsPage() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Pagination hook
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination(10);

  // API hooks
  const { usePatientVisits } = useClinicPatients();
  const { useSpecialtiesDropdown: getSpecialtiesForDropdown } = useSpecialty();

  // Build API filters object
  const buildApiFilters = () => {
    const filters: any = {
      pageNumber: currentPage,
      pageSize: pageSize,
    };

    // Add search filter
    if (searchQuery.trim()) {
      filters.searchValue = searchQuery.trim();
    }

    // Add specialty filter
    if (selectedSpecialty !== 'all') {
      filters.specialtyId = selectedSpecialty;
    }

    // Add visit type filter
    if (selectedType !== 'all') {
      filters.type = selectedType;
    }

    return filters;
  };

  // Fetch visits with current filters and pagination
  const {
    data: visitsResponse,
    isLoading,
    error,
  } = usePatientVisits(buildApiFilters());

  const { data: specialties } = getSpecialtiesForDropdown();

  // Use API data directly
  const visits = visitsResponse?.items || [];

  // Handle filter changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialty(specialty);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('all');
    setSelectedType('all');
  };

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-500 mb-2">Failed to load visits</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
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
                  يمكنك تصفية الزيارات حسب التخصص أو نوع الزيارة أو البحث بالاسم
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
            <div className="grid gap-4 md:grid-cols-3">
              {/* Search input */}
              <div className="space-y-2">
                <Input
                  label="بحث"
                  placeholder="ابحث عن طبيب، تشخيص، أو شكوى..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  startIcon={<Search className="h-4 w-4" />}
                  fullWidth
                />
              </div>

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

              {/* Visit type filter */}
              <div className="space-y-2">
                <Select
                  label="نوع الزيارة"
                  value={selectedType}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  options={[
                    { value: 'all', label: 'All' },
                    ...Object.entries(VisitType)
                      .filter(([key]) => isNaN(Number(key)))
                      .map(([_, value]) => ({
                        value: value.toString(),
                        label: getVisitTypeLabel(value as VisitType),
                      })),
                  ]}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {isLoading && (
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
                <CardContent className="p-6 pt-0">
                  <Skeleton className="h-10 w-full rounded-md" />
                </CardContent>
              </Card>
            ))}
        </div>
      )}
      {/* Visits list */}
      {visits.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {visits.map((visit) => (
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
                          {visit.doctorSpecialization} - {visit.clinicName}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={cn(
                        'font-normal',
                        visit.type && getVisitTypeLabel(visit.type)
                      )}
                    >
                      {visit.type && getVisitTypeLabel(visit.type)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex flex-col gap-4">
                    {/* Visit date and time */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5 text-primary/70" />
                        <span>{formatDate(visit.createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1.5 text-primary/70" />
                        <span>{formatTime(visit.createdAt)}</span>
                      </div>
                    </div>

                    {/* Symptoms and diagnosis */}
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-md bg-muted/50 p-3">
                        <p className="text-sm font-medium mb-1">
                          الشكوى الرئيسية
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {visit.symptoms || 'غير محدد'}
                        </p>
                      </div>
                      <div className="rounded-md bg-muted/50 p-3">
                        <p className="text-sm font-medium mb-1">التشخيص</p>
                        <p className="text-sm text-muted-foreground">
                          {visit.diagnoses
                            ?.map((d: any) => d.description)
                            .join(', ') || 'تحت المراجعة'}
                        </p>
                      </div>
                    </div>

                    {/* Visit badges */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(visit.prescriptions?.length || 0) > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800"
                        >
                          <Pill className="h-3 w-3 mr-1" />
                          {visit.prescriptions.length} وصفة طبية
                        </Badge>
                      )}
                      {(visit.radiologyTests?.length || 0) > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          {visit.radiologyTests.length} أشعة
                        </Badge>
                      )}
                      {(visit.labTests?.length || 0) > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800"
                        >
                          <FileCheck className="h-3 w-3 mr-1" />
                          {visit.labTests.length} تحاليل
                        </Badge>
                      )}
                      {visit.followUpInstructions && (
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
                <CardContent className="p-6 pt-0">
                  <Button variant="default" className="w-full group" asChild>
                    <Link
                      href={`/patient-portal/visits/${visit.id}`}
                      className="flex items-center justify-center"
                    >
                      عرض تفاصيل الزيارة
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* No visits message */
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

      {/* Pagination Component */}
      {visitsResponse && visitsResponse.totalCount > 0 && (
        <Pagination
          currentPage={visitsResponse.pageNumber}
          totalPages={visitsResponse.totalPages}
          totalCount={visitsResponse.totalCount}
          pageSize={pageSize}
          hasPreviousPage={visitsResponse.hasPreviousPage}
          hasNextPage={visitsResponse.hasNextPage}
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
