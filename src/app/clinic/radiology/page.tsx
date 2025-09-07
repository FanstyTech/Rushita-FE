'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import PageLayout from '@/components/layouts/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Calendar,
  AlertCircle,
  User,
  Clock,
  ChevronDown,
  Upload,
  Eye,
  RefreshCw,
  TestTube,
  ClipboardCheck,
  Loader2,
} from 'lucide-react';
import TestResultUploadModal from '../../../components/clinic/radiology/TestResultUploadModal';
import TestDetailsModal from '../../../components/clinic/radiology/TestDetailsModal';
import TestStatusUpdateModal from '../../../components/clinic/radiology/TestStatusUpdateModal';
import { cn } from '@/lib/utils';
import { useVisitRadiologyTest } from '@/lib/api/hooks/useVisitRadiologyTest';
import { useClinicStaff } from '@/lib/api/hooks/useClinicStaff';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { RadiologyTestItemDto } from '@/lib/api/types/visit-radiology-test';
import { TestStatus } from '@/lib/api/types/visit-lab-test';
import { SelectOption } from '@/lib/api/types/select-option';
import { getTestStatusColor, getTestStatusLabel } from '@/utils/textUtils';
import LabTestsSkeleton from '@/components/skeletons/LabTestsSkeleton';
import { formatDate, formatTime } from '@/utils/dateTimeUtils';

export default function RadiologyTestsPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const clinicId = user?.clinicInfo?.id || '';

  // States
  const [selectedTest, setSelectedTest] = useState<RadiologyTestItemDto | null>(
    null
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isStatusUpdateModalOpen, setIsStatusUpdateModalOpen] =
    useState<boolean>(false);
  const [expandedVisits, setExpandedVisits] = useState<Record<string, boolean>>(
    {}
  );

  // Filter state
  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 10,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    testStatus: undefined,
    doctorId: undefined,
    fromDate: undefined,
    toDate: undefined,
    patientId: undefined,
    visitId: undefined,
    clinicId: clinicId,
  });

  // API Hooks
  const {
    useGetVisitsWithRadiologyTests: getVisitsWithRadiologyTests,
    useGetRadiologyTestSummary: getRadiologyTestSummary,
    updateStatus,
    updateResult,
  } = useVisitRadiologyTest();
  const { useClinicStaffForDropdown } = useClinicStaff();

  // Get data
  const { data: visitsWithRadiologyTestsData, isLoading: isVisitsLoading } =
    getVisitsWithRadiologyTests(filter);

  const { data: summaryData, isLoading: isSummaryLoading } =
    getRadiologyTestSummary({
      clinicId: clinicId,
      doctorId: filter?.doctorId?.toString() || undefined,
    });

  const { data: doctors } = useClinicStaffForDropdown({ clinicId: clinicId });

  // Calculate summary statistics from API data
  const summaryStats = useMemo(() => {
    if (!summaryData) {
      return {
        totalTests: 0,
        completedTests: 0,
        inProgressTests: 0,
        pendingTests: 0,
      };
    }

    const totalTests = summaryData.reduce((sum, stat) => sum + stat.count, 0);
    const completedTests =
      summaryData.find((stat) => stat.testStatus === TestStatus.Completed)
        ?.count || 0;
    const inProgressTests =
      summaryData.find((stat) => stat.testStatus === TestStatus.InProgress)
        ?.count || 0;
    const pendingTests =
      summaryData.find((stat) => stat.testStatus === TestStatus.Pending)
        ?.count || 0;

    return { totalTests, completedTests, inProgressTests, pendingTests };
  }, [summaryData]);

  // Handlers
  const toggleVisitExpansion = (visitId: string) => {
    setExpandedVisits((prev) => ({
      ...prev,
      [visitId]: !prev[visitId],
    }));
  };

  const handleViewTestDetails = (test: RadiologyTestItemDto) => {
    setSelectedTest(test);
    setIsDetailsModalOpen(true);
  };

  const handleUploadTestResults = (test: RadiologyTestItemDto) => {
    setSelectedTest(test);
    setIsUploadModalOpen(true);
  };

  const handleOpenStatusUpdateModal = (test: RadiologyTestItemDto) => {
    setSelectedTest(test);
    setIsStatusUpdateModalOpen(true);
  };

  const handleUpdateTestStatus = async (
    testId: string,
    newStatus: TestStatus
  ) => {
    // Refetch data after update
    await updateStatus.mutateAsync({ id: testId, status: newStatus });
    setSelectedTest(null);
    setIsStatusUpdateModalOpen(false);
  };

  const handleTestResultUpload = async (
    results: string,
    attachmentIds: string[]
  ) => {
    if (!selectedTest) return;
    await updateResult.mutateAsync({
      id: selectedTest.id,
      result: results,
      attachmentIds,
    });
    setSelectedTest(null);
    setIsUploadModalOpen(false);
  };

  if (isVisitsLoading || isSummaryLoading) {
    return <LabTestsSkeleton />;
  }
  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Tests Card */}
          <Card
            className={cn(
              'group cursor-pointer transition-all duration-300 ease-out hover:shadow-lg border border-gray-200/60 dark:border-gray-700/60 bg-white dark:bg-gray-800/50 backdrop-blur-sm',
              !filter.testStatus
                ? 'ring-1 ring-blue-500/30 shadow-md border-blue-200 dark:border-blue-700/50'
                : 'hover:border-blue-300/60 dark:hover:border-blue-600/60'
            )}
            onClick={() => setFilter((prev) => ({ ...prev, testStatus: '' }))}
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center border border-blue-100 dark:border-blue-800/50">
                      <TestTube className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                        {t('clinic.radiology.summary.cards.totalTests')}
                      </p>
                      <div className="h-0.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {isSummaryLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                      ) : (
                        summaryStats.totalTests.toLocaleString()
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('clinic.radiology.summary.cards.totalTests')}
                    </p>
                  </div>
                </div>
                {!filter.testStatus && (
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse mt-1" />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Completed Tests Card */}
          <Card
            className={cn(
              'group cursor-pointer transition-all duration-300 ease-out hover:shadow-lg border border-gray-200/60 dark:border-gray-700/60 bg-white dark:bg-gray-800/50 backdrop-blur-sm',
              filter.testStatus === 'completed'
                ? 'ring-1 ring-emerald-500/30 shadow-md border-emerald-200 dark:border-emerald-700/50'
                : 'hover:border-emerald-300/60 dark:hover:border-emerald-600/60'
            )}
            onClick={() =>
              setFilter((prev) => ({ ...prev, testStatus: 'completed' }))
            }
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center border border-emerald-100 dark:border-emerald-800/50">
                      <ClipboardCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                        {t('clinic.radiology.summary.cards.completed')}
                      </p>
                      <div className="h-0.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{
                            width:
                              summaryStats.totalTests > 0
                                ? `${
                                    (summaryStats.completedTests /
                                      summaryStats.totalTests) *
                                    100
                                  }%`
                                : '0%',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {isSummaryLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                      ) : (
                        summaryStats.completedTests.toLocaleString()
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('clinic.radiology.summary.cards.completed')}
                    </p>
                  </div>
                </div>
                {filter.testStatus === 'completed' && (
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mt-1" />
                )}
              </div>
            </CardContent>
          </Card>

          {/* In Progress Tests Card */}
          <Card
            className={cn(
              'group cursor-pointer transition-all duration-300 ease-out hover:shadow-lg border border-gray-200/60 dark:border-gray-700/60 bg-white dark:bg-gray-800/50 backdrop-blur-sm',
              filter.testStatus === 'inprogress'
                ? 'ring-1 ring-amber-500/30 shadow-md border-amber-200 dark:border-amber-700/50'
                : 'hover:border-amber-300/60 dark:hover:border-amber-600/60'
            )}
            onClick={() =>
              setFilter((prev) => ({ ...prev, testStatus: 'inprogress' }))
            }
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center border border-amber-100 dark:border-amber-800/50">
                      <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                        {t('clinic.radiology.summary.cards.inProgress')}
                      </p>
                      <div className="h-0.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all duration-500"
                          style={{
                            width:
                              summaryStats.totalTests > 0
                                ? `${
                                    (summaryStats.inProgressTests /
                                      summaryStats.totalTests) *
                                    100
                                  }%`
                                : '0%',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {isSummaryLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                      ) : (
                        summaryStats.inProgressTests.toLocaleString()
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('clinic.radiology.summary.cards.inProgress')}
                    </p>
                  </div>
                </div>
                {filter.testStatus === 'inprogress' && (
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse mt-1" />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tests Card */}
          <Card
            className={cn(
              'group cursor-pointer transition-all duration-300 ease-out hover:shadow-lg border border-gray-200/60 dark:border-gray-700/60 bg-white dark:bg-gray-800/50 backdrop-blur-sm',
              filter.testStatus === 'pending'
                ? 'ring-1 ring-rose-500/30 shadow-md border-rose-200 dark:border-rose-700/50'
                : 'hover:border-rose-300/60 dark:hover:border-rose-600/60'
            )}
            onClick={() =>
              setFilter((prev) => ({ ...prev, testStatus: 'pending' }))
            }
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-rose-50 dark:bg-rose-900/20 rounded-lg flex items-center justify-center border border-rose-100 dark:border-rose-800/50">
                      <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                        {t('clinic.radiology.summary.cards.pending')}
                      </p>
                      <div className="h-0.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full transition-all duration-500"
                          style={{
                            width:
                              summaryStats.totalTests > 0
                                ? `${
                                    (summaryStats.pendingTests /
                                      summaryStats.totalTests) *
                                    100
                                  }%`
                                : '0%',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {isSummaryLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
                      ) : (
                        summaryStats.pendingTests.toLocaleString()
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('clinic.radiology.summary.cards.pending')}
                    </p>
                  </div>
                </div>
                {filter.testStatus === 'pending' && (
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse mt-1" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <FilterBar
          filter={filter}
          onFilterChange={(newFilter) => {
            setFilter((prev) => ({
              ...prev,
              ...newFilter,
              pageNumber: newFilter.pageNumber ?? prev.pageNumber,
              pageSize: newFilter.pageSize ?? prev.pageSize,
              sortColumn: newFilter.sortColumn ?? prev.sortColumn,
              sortDirection: newFilter.sortDirection ?? prev.sortDirection,
            }));
          }}
          searchPlaceholder={t('clinic.radiology.filters.searchPlaceholder')}
          haveStatusFilter={false}
          additionalFilters={[
            {
              icon: <User className="w-4 h-4" />,
              label: t('clinic.radiology.filters.doctor'),
              options: [
                { value: '', label: t('clinic.radiology.filters.allDoctors') },
                ...(doctors?.map((doctor: SelectOption<string>) => ({
                  value: doctor.value,
                  label: doctor.label || '',
                })) || []),
              ],
              value: String(filter.doctorId || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  doctorId: value || undefined,
                  pageNumber: 1,
                })),
            },
            {
              icon: <TestTube className="w-4 h-4" />,
              label: t('clinic.radiology.filters.status'),
              options: Object.entries(TestStatus)
                .filter(([key]) => isNaN(Number(key)))
                .map(([key, value]) => ({
                  value: value.toString(),
                  label: key,
                })),
              value: String(filter.testStatus || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  testStatus: value || undefined,
                  pageNumber: 1,
                })),
            },
          ]}
        />

        {/* Content */}
        {visitsWithRadiologyTestsData ? (
          <div className="space-y-6">
            {visitsWithRadiologyTestsData?.length > 0 ? (
              <>
                {visitsWithRadiologyTestsData?.map((visit) => (
                  <Card key={visit.id} className="overflow-hidden">
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleVisitExpansion(visit.id)}
                    >
                      <CardHeader className="flex flex-row items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border-b">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <CardTitle className="text-base font-medium text-gray-900 dark:text-gray-100">
                              {visit.patientName}
                            </CardTitle>
                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                                <span>{formatDate(visit.visitDate)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                                <span>{formatTime(visit.visitDate)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium px-2.5 py-1 rounded-full">
                            {visit.tests.length} {t('clinic.radiology.tests')}
                          </div>
                          <div
                            className={cn(
                              'bg-gray-100 dark:bg-gray-700 p-1 rounded-full transition-transform duration-300',
                              expandedVisits[visit.id] ? 'rotate-180' : ''
                            )}
                          >
                            <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          </div>
                        </div>
                      </CardHeader>
                    </div>

                    {expandedVisits[visit.id] && (
                      <CardContent className="p-4 space-y-3 border-t border-gray-100 dark:border-gray-700">
                        {visit.tests.map((test: RadiologyTestItemDto) => (
                          <div
                            key={test.id}
                            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all duration-200 relative overflow-hidden"
                          >
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 dark:bg-blue-600"></div>

                            <div className="flex flex-col md:flex-row justify-between gap-4 pl-2">
                              <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                  <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
                                    <TestTube className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                    {test.testName}
                                  </h4>
                                  <span
                                    className={cn(
                                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                      getTestStatusColor(test.status)
                                    )}
                                  >
                                    {getTestStatusLabel(test.status)}
                                  </span>
                                </div>

                                {test.details && (
                                  <div className="ml-10 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md border-r-2 border-blue-300 dark:border-blue-700">
                                    {test.details}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2 self-end md:self-center">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-9 text-xs gap-1.5"
                                  onClick={() => handleViewTestDetails(test)}
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                  {t('clinic.radiology.actions.view')}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-9 text-xs gap-1.5"
                                  onClick={() =>
                                    handleOpenStatusUpdateModal(test)
                                  }
                                >
                                  <RefreshCw className="h-3.5 w-3.5" />
                                  {t('clinic.radiology.actions.updateStatus')}
                                </Button>
                                {test.status !== TestStatus.Completed &&
                                  test.status !== TestStatus.Cancelled && (
                                    <Button
                                      variant="default"
                                      size="sm"
                                      className="h-9 text-xs gap-1.5"
                                      onClick={() =>
                                        handleUploadTestResults(test)
                                      }
                                    >
                                      <Upload className="h-3.5 w-3.5" />
                                      {t(
                                        'clinic.radiology.actions.uploadResults'
                                      )}
                                    </Button>
                                  )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4">
                    <AlertCircle className="h-8 w-8 text-blue-400 dark:text-blue-300" />
                  </div>
                  <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {t('clinic.radiology.noVisitsFound.title')}
                  </CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    {t('clinic.radiology.noVisitsFound.message')}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* Modals */}
      {selectedTest && (
        <>
          <TestDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            test={selectedTest}
          />

          <TestResultUploadModal
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
            test={selectedTest}
            onUpload={handleTestResultUpload}
            isUpdating={updateResult.isPending}
          />

          <TestStatusUpdateModal
            isOpen={isStatusUpdateModalOpen}
            onClose={() => setIsStatusUpdateModalOpen(false)}
            test={selectedTest}
            onStatusUpdate={handleUpdateTestStatus}
            isUpdating={updateStatus.isPending}
          />
        </>
      )}
    </PageLayout>
  );
}
