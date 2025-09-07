'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Download,
  Printer,
  User,
  Building,
  AlertCircle,
  Info,
  Eye,
  Microscope,
  Beaker,
  CheckCircle,
  Circle,
  Loader2,
  AlertTriangle,
  AlertOctagon,
  CalendarCheck,
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
import { Input, Select } from '@/components/common/form/index';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useVisitLabTest } from '@/lib/api/hooks/useVisitLabTest';
import {
  TestStatus,
  PatientLabTestFilterDto,
} from '@/lib/api/types/visit-lab-test';
import { formatDate } from '@/utils/dateTimeUtils';
import { Pagination, usePagination } from '@/components/ui/pagination';
import { getTestStatusColor, getTestStatusLabel } from '@/utils/textUtils';
import { useLabTestCategory } from '@/lib/api/hooks/useLabTestCategory';
import { SelectOption } from '@/lib/api/types/select-option';
import { useTranslation } from 'react-i18next';

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

export default function LabResultsPage() {
  const { t } = useTranslation();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TestStatus | ''>('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Pagination hook
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination(10);

  // Build API filters object
  const buildApiFilters = () => {
    const filters: PatientLabTestFilterDto = {
      pageNumber: currentPage,
      pageSize: pageSize,
    };

    // Add search filter
    if (searchQuery.trim()) {
      filters.searchValue = searchQuery.trim();
    }

    // Add status filter
    if (statusFilter) {
      filters.status = statusFilter;
    }

    // Add type filter
    if (typeFilter !== 'all') {
      filters.testTypeId = typeFilter;
    }

    return filters;
  };

  // Fetch lab tests using the hook
  const { useGetPatientLabTests: getPatientLabTests } = useVisitLabTest();
  const {
    data: labTestsData,
    isLoading,
    error,
  } = getPatientLabTests(buildApiFilters());

  const { useLabTestCategoriesDropdown: getLabTestCategoriesForDropdown } =
    useLabTestCategory();
  const { data: categories } = getLabTestCategoriesForDropdown();

  const labTests = labTestsData?.items || [];

  // Calculate summary statistics
  const totalResults = labTestsData?.totalCount || 0;
  const completedResults = labTests.filter(
    (result) => result.status === TestStatus.Completed
  ).length;
  const pendingResults = labTests.filter(
    (result) =>
      result.status === TestStatus.Pending ||
      result.status === TestStatus.InProgress
  ).length;
  const abnormalResults = labTests.filter(
    (result) => result.abnormalFlags > 0 || result.criticalFlags > 0
  ).length;

  // Handle filter changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusFilter = (status: TestStatus | '') => {
    setStatusFilter(status);
  };

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setTypeFilter('all');
  };

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-500 mb-2">
            {t('patientPortal.labResults.list.error.title')}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {t('patientPortal.labResults.list.error.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('patientPortal.labResults.list.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('patientPortal.labResults.list.description')}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t('patientPortal.labResults.list.stats.total')}
                </p>
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
                <p className="text-sm text-muted-foreground">
                  {t('patientPortal.labResults.list.stats.completed')}
                </p>
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
                  {t('patientPortal.labResults.list.stats.pending')}
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
                  {t('patientPortal.labResults.list.stats.abnormal')}
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
      <motion.div variants={itemVariants} initial="hidden" animate="show">
        <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
          <CardHeader className="bg-primary/5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  {t('patientPortal.labResults.list.actions.filter')}
                </CardTitle>
                <CardDescription className="mt-1">
                  {t('patientPortal.labResults.list.filters.description')}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs flex items-center gap-1 hover:bg-primary/10"
                onClick={handleResetFilters}
              >
                <X className="h-3 w-3" />
                {t('patientPortal.labResults.list.actions.reset')}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Search input */}
              <div className="space-y-2">
                <Input
                  label={t('patientPortal.labResults.list.filters.search')}
                  placeholder={t(
                    'patientPortal.labResults.list.filters.searchPlaceholder'
                  )}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  startIcon={<Search className="h-4 w-4" />}
                  fullWidth
                />
              </div>

              {/* Status filter */}
              <div className="space-y-2">
                <Select
                  label={t('patientPortal.labResults.list.filters.status')}
                  value={statusFilter}
                  onChange={(e) =>
                    handleStatusFilter(e.target.value as TestStatus | '')
                  }
                  options={[
                    { value: 'all', label: 'All' },
                    ...Object.entries(TestStatus)
                      .filter(([key]) => isNaN(Number(key)))
                      .map(([, value]) => ({
                        value: value.toString(),
                        label: getTestStatusLabel(value as TestStatus),
                      })),
                  ]}
                />
              </div>

              {/* Type filter */}
              <div className="space-y-2">
                <Select
                  label={t('patientPortal.labResults.list.filters.type')}
                  value={typeFilter}
                  onChange={(e) => handleTypeFilter(e.target.value)}
                  options={[
                    { value: '', label: 'Select Category' },
                    ...(categories?.map((category: SelectOption<string>) => ({
                      value: category.value,
                      label: category.label || '',
                    })) || []),
                  ]}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Lab results list */}
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
        ) : labTests.length > 0 ? (
          labTests.map((result) => {
            return (
              <motion.div key={result.id} variants={itemVariants}>
                <Card className="overflow-hidden backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="relative">
                    {/* Status indicator strip */}
                    <div
                      className={cn(
                        'absolute top-0 left-0 w-1 h-full',
                        result.status === TestStatus.Completed
                          ? 'bg-emerald-500'
                          : result.status === TestStatus.Pending
                          ? 'bg-amber-500'
                          : result.status === TestStatus.InProgress
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

                              'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400'
                            )}
                          >
                            <Microscope className="h-5 w-5" />
                          </div>
                          <h3 className="text-xl font-semibold">
                            {result.labTestName}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant={'destructive'}
                            className={cn(
                              'px-3 py-1',
                              getTestStatusColor(result.status)
                            )}
                          >
                            <div className="flex items-center gap-1.5">
                              {result.status === TestStatus.Completed ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : result.status === TestStatus.Pending ? (
                                <Clock className="h-3 w-3" />
                              ) : result.status === TestStatus.InProgress ? (
                                <Loader2 className="h-3 w-3" />
                              ) : (
                                <Circle className="h-3 w-3" />
                              )}
                              {getTestStatusLabel(result.status)}
                            </div>
                          </Badge>
                          <Badge
                            variant={'secondary'}
                            className="bg-blue-50 text-blue-700"
                          >
                            {result.labTestCategoryName}
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
                                    {t(
                                      'patientPortal.labResults.list.card.doctor'
                                    )}
                                  </p>
                                  <p className="font-medium">
                                    {result.doctorName}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {result.specialtyName}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="bg-blue-500/10 p-1.5 rounded-md">
                                  <Building className="h-4 w-4 text-blue-500" />
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    {t(
                                      'patientPortal.labResults.list.card.clinic'
                                    )}
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
                                <div className="bg-purple-500/10 p-1.5 rounded-md">
                                  <Calendar className="h-4 w-4 text-purple-500" />
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    {t(
                                      'patientPortal.labResults.list.card.requestDate'
                                    )}
                                  </p>
                                  <p className="font-medium">
                                    {formatDate(result.requestDate)}
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
                                      {t(
                                        'patientPortal.labResults.list.card.resultDate'
                                      )}
                                    </p>
                                    <p className="font-medium">
                                      {formatDate(result.resultDate)}
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
                                      {result.abnormalFlags}{' '}
                                      {t(
                                        'patientPortal.labResults.list.card.abnormalFlags'
                                      )}
                                    </span>
                                  </div>
                                )}
                                {result.criticalFlags > 0 && (
                                  <div className="flex items-center gap-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded-md text-xs">
                                    <AlertOctagon className="h-3 w-3" />
                                    <span>
                                      {result.criticalFlags}{' '}
                                      {t(
                                        'patientPortal.labResults.list.card.criticalFlags'
                                      )}
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
                          {t('patientPortal.labResults.list.card.testNumber')}{' '}
                          <span className="font-mono">
                            {result.labTestCode}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 self-end sm:self-center">
                          {result.status === TestStatus.Completed && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={() => {
                                  // Handle download functionality
                                  alert(
                                    t(
                                      'patientPortal.labResults.list.actions.download'
                                    )
                                  );
                                }}
                              >
                                <Download className="h-4 w-4" />
                                <span>
                                  {t(
                                    'patientPortal.labResults.list.actions.download'
                                  )}
                                </span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={() => {
                                  // Handle print functionality
                                  alert(
                                    t(
                                      'patientPortal.labResults.list.actions.print'
                                    )
                                  );
                                }}
                              >
                                <Printer className="h-4 w-4" />
                                <span>
                                  {t(
                                    'patientPortal.labResults.list.actions.print'
                                  )}
                                </span>
                              </Button>
                            </>
                          )}
                          <Button asChild>
                            <Link
                              href={`/patient-portal/lab-results/${result.id}`}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              {t(
                                'patientPortal.labResults.list.actions.viewDetails'
                              )}
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
                <h3 className="text-xl font-semibold">
                  {t('patientPortal.labResults.list.empty.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('patientPortal.labResults.list.empty.description')}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pagination Component */}
        {labTestsData && labTestsData.totalCount > 0 && (
          <Pagination
            currentPage={labTestsData.pageNumber}
            totalPages={labTestsData.totalPages}
            totalCount={labTestsData.totalCount}
            pageSize={pageSize}
            hasPreviousPage={labTestsData.hasPreviousPage}
            hasNextPage={labTestsData.hasNextPage}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            showPageSizeSelector={true}
            pageSizeOptions={[5, 10, 20, 50]}
            className="mt-6"
          />
        )}
      </motion.div>
    </div>
  );
}
