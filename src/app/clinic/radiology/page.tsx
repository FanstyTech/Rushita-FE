'use client';

import { useState, useMemo } from 'react';
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
  const { user } = useAuth();
  const clinicId = user?.clinicInfo?.id || '';

  // States
  const [selectedTest, setSelectedTest] = useState<RadiologyTestItemDto | null>(null);
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
    getVisitsWithRadiologyTests,
    getRadiologyTestSummary,
    updateStatus,
    updateResult,
  } = useVisitRadiologyTest();
  const { useClinicStaffForDropdown } = useClinicStaff();

  // Get data
  const {
    data: visitsWithRadiologyTestsData,
    isLoading: isVisitsLoading,
    refetch: refetchVisits,
  } = getVisitsWithRadiologyTests(filter);

  const { data: summaryData, isLoading: isSummaryLoading } = getRadiologyTestSummary({
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Tests Card */}
          <Card
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300',
              !filter.testStatus ? 'ring-2 ring-blue-500 shadow-md' : ''
            )}
            onClick={() => setFilter((prev) => ({ ...prev, testStatus: '' }))}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                <TestTube className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isSummaryLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  summaryStats.totalTests
                )}
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Tests
              </p>
            </CardContent>
          </Card>

          {/* Completed Tests Card */}
          <Card
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-md hover:border-green-300',
              filter.testStatus === 'completed'
                ? 'ring-2 ring-green-500 shadow-md'
                : ''
            )}
            onClick={() =>
              setFilter((prev) => ({ ...prev, testStatus: 'completed' }))
            }
          >
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-3">
                <ClipboardCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isSummaryLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  summaryStats.completedTests
                )}
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Completed
              </p>
            </CardContent>
          </Card>

          {/* In Progress Tests Card */}
          <Card
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300',
              filter.testStatus === 'inprogress'
                ? 'ring-2 ring-blue-500 shadow-md'
                : ''
            )}
            onClick={() =>
              setFilter((prev) => ({ ...prev, testStatus: 'inprogress' }))
            }
          >
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                <Loader2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isSummaryLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  summaryStats.inProgressTests
                )}
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                In Progress
              </p>
            </CardContent>
          </Card>

          {/* Pending Tests Card */}
          <Card
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-md hover:border-amber-300',
              filter.testStatus === 'pending'
                ? 'ring-2 ring-amber-500 shadow-md'
                : ''
            )}
            onClick={() =>
              setFilter((prev) => ({ ...prev, testStatus: 'pending' }))
            }
          >
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mb-3">
                <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isSummaryLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  summaryStats.pendingTests
                )}
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pending
              </p>
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
          searchPlaceholder="Search by patient name or test..."
          haveStatusFilter={false}
          additionalFilters={[
            {
              icon: <User className="w-4 h-4" />,
              label: 'Doctor',
              options: [
                { value: '', label: 'All Doctors' },
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
              label: 'Status',
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
                            {visit.tests.length} Tests
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
                            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 hover:shadow-sm transition-all duration-200 relative overflow-hidden"
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
                                  View
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
                                  Update Status
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
                                      Upload Results
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
                    No Visits Found
                  </CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    No visits match the selected filters
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