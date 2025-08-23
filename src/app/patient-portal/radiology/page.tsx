'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  FileText,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  Building,
  Microscope,
  Activity,
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
import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVisitRadiologyTest } from '@/lib/api/hooks/useVisitRadiologyTest';
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { TestStatus } from '@/lib/api/types/visit-lab-test';
import { formatDate } from '@/utils/dateTimeUtils';
import Skeleton from '@/components/ui/Skeleton';
import { useQuery } from '@tanstack/react-query';

export default function RadiologyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TestStatus | ''>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Get specialties
  const { useSpecialtiesList } = useSpecialty();
  const { data: specialtiesData } = useSpecialtiesList({ pageNumber: 1, pageSize: 100 });

  // Create filter object
  const filter = {
    pageNumber: currentPage,
    pageSize: pageSize,
    searchValue: searchQuery.trim() || undefined,
    status: selectedStatus || undefined,
    specialtyId: selectedSpecialty !== 'all' ? selectedSpecialty : undefined,
    fromDate: selectedDateRange ? getDateRangeFromFilter(selectedDateRange).fromDate : undefined,
    toDate: selectedDateRange ? getDateRangeFromFilter(selectedDateRange).toDate : undefined,
  };

  // Get radiology tests
  const { getPatientRadiologyTests } = useVisitRadiologyTest();
  const { data: radiologyData, isLoading, error } = useQuery(getPatientRadiologyTests(filter));

  const radiologyTests = radiologyData?.result?.items || [];
  const totalCount = radiologyData?.result?.totalCount || 0;

  // Calculate stats
  const stats = {
    total: totalCount,
    pending: radiologyTests.filter(t => t.status === TestStatus.Pending).length,
    completed: radiologyTests.filter(t => t.status === TestStatus.Completed).length,
    cancelled: radiologyTests.filter(t => t.status === TestStatus.Cancelled).length,
  };

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

    // Add status filter
    if (selectedStatus) {
      filters.status = selectedStatus;
    }

    // Add date range filter
    if (selectedDateRange) {
      const now = new Date();
      switch (selectedDateRange) {
        case 'last30':
          filters.fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
          break;
        case 'last7':
          filters.fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
          break;
        case 'last90':
          filters.fromDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
          break;
      }
    }

    return filters;
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('');
    setSelectedSpecialty('all');
    setSelectedDateRange('');
  };

  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedStatus || selectedSpecialty !== 'all' || selectedDateRange;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">صور الأشعة</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            عرض وإدارة صور الأشعة والفحوصات الإشعاعية
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* إجمالي الفحوصات */}
        <Card className="backdrop-blur-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">إجمالي الفحوصات</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* في الانتظار */}
        <Card className="backdrop-blur-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">في الانتظار</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* مكتملة */}
        <Card className="backdrop-blur-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">مكتملة</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ملغية */}
        <Card className="backdrop-blur-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">ملغية</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.cancelled}</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                <X className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">الفلاتر</h3>
            </div>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="h-4 w-4 mr-2" />
                مسح الفلاتر
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                البحث
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الفحوصات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                حالة الفحص
              </label>
              {/* <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as TestStatus | '')}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الحالات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الحالات</SelectItem>
                  <SelectItem value={TestStatus.Pending}>في الانتظار</SelectItem>
                  <SelectItem value={TestStatus.InProgress}>قيد التنفيذ</SelectItem>
                  <SelectItem value={TestStatus.Completed}>مكتمل</SelectItem>
                  <SelectItem value={TestStatus.Cancelled}>ملغي</SelectItem>
                </SelectContent>
              </Select> */}
            </div>

            {/* Specialty Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                التخصص
              </label>
              {/* <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع التخصصات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التخصصات</SelectItem>
                  {specialtiesData?.result?.map((specialty) => (
                    <SelectItem key={specialty.value} value={specialty.value}>
                      {specialty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
            </div>

            {/* Date Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                الفترة الزمنية
              </label>
              {/* <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الفترات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الفترات</SelectItem>
                  <SelectItem value="last7">آخر 7 أيام</SelectItem>
                  <SelectItem value="last30">آخر 30 يوم</SelectItem>
                  <SelectItem value="last90">آخر 90 يوم</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">نتائج الفحوصات</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {totalCount} فحص إشعاعي
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 dark:text-red-400">حدث خطأ في تحميل البيانات</p>
            </div>
          ) : radiologyTests.length === 0 ? (
                         <div className="text-center py-8">
               <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
               <p className="text-gray-600 dark:text-gray-400">لا توجد فحوصات إشعاعية</p>
             </div>
          ) : (
            <div className="space-y-4">
              {radiologyTests.map((test) => (
                <Card
                  key={test.id}
                  className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 border border-gray-200/30 dark:border-gray-700/30 hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                                                 <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                           <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                         </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {test.radiologyTestName}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                رمز الفحص: {test.radiologyTestCode}
                              </p>
                            </div>
                                                         <Badge
                               variant="outline"
                               className="text-xs"
                             >
                               {test.status}
                             </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-700 dark:text-gray-300">
                                الطبيب: {test.doctorName}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Building className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-700 dark:text-gray-300">
                                العيادة: {test.clinicName}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-700 dark:text-gray-300">
                                تاريخ الطلب: {formatDate(test.requestDate)}
                              </span>
                            </div>
                          </div>

                          {test.notes && (
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <strong>ملاحظات:</strong> {test.notes}
                              </p>
                            </div>
                          )}

                          {test.result && (
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                              <p className="text-sm text-green-700 dark:text-green-300">
                                <strong>النتيجة:</strong> {test.result}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link href={`/patient-portal/radiology/${test.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            عرض التفاصيل
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination - TODO: Add pagination component */}
      {totalCount > 0 && (
        <div className="flex justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            إجمالي النتائج: {totalCount}
          </p>
        </div>
      )}
    </div>
  );
}

// Helper function to get date range from filter
function getDateRangeFromFilter(dateRange: string) {
  const now = new Date();
  let fromDate: string | undefined;
  let toDate: string | undefined;

  switch (dateRange) {
    case 'last7':
      fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      break;
    case 'last30':
      fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      break;
    case 'last90':
      fromDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
      break;
  }

  return { fromDate, toDate };
}
