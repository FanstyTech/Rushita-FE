// 'use client';

// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Calendar,
//   Clock,
//   ArrowLeft,
//   Printer,
//   Download,
//   User,
//   Building,
//   FileText,
//   AlertCircle,
//   Info,
//   CheckCircle,
//   XCircle,
//   Eye,
//   Image,
//   FileImage,
// } from 'lucide-react';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { cn } from '@/lib/utils';
// import { useVisitRadiologyTest } from '@/lib/api/hooks/useVisitRadiologyTest';
// import { TestStatus } from '@/lib/api/types/visit-lab-test';
// import { formatDate, formatDateTime } from '@/utils/dateTimeUtils';
// import { getStatusText, getStatusColor } from '@/utils/textUtils';
// import { Skeleton } from '@/components/ui/skeleton';
// import { useQuery } from '@tanstack/react-query';

// export default function RadiologyTestDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const testId = params.id as string;

//   // Get radiology test details
//   const { getPatientRadiologyTestDetails } = useVisitRadiologyTest();
//   const { data: testData, isLoading, error } = useQuery(getPatientRadiologyTestDetails(testId));

//   const test = testData?.result;

//   if (isLoading) {
//     return (
//       <div className="container mx-auto p-6 space-y-6">
//         <div className="flex items-center space-x-4">
//           <Skeleton className="h-8 w-8" />
//           <Skeleton className="h-8 w-64" />
//         </div>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-6">
//             <Skeleton className="h-32 w-full" />
//             <Skeleton className="h-64 w-full" />
//           </div>
//           <div className="space-y-6">
//             <Skeleton className="h-48 w-full" />
//             <Skeleton className="h-32 w-full" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !test) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="text-center py-8">
//           <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//           <p className="text-red-600 dark:text-red-400">حدث خطأ في تحميل البيانات</p>
//           <Button
//             variant="outline"
//             className="mt-4"
//             onClick={() => router.back()}
//           >
//             العودة للخلف
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => router.back()}
//             className="flex items-center space-x-2"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span>العودة</span>
//           </Button>
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//               تفاصيل الفحص الإشعاعي
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-1">
//               {test.radiologyTestName}
//             </p>
//           </div>
//         </div>
        
//         <div className="flex items-center space-x-2">
//           <Button variant="outline" size="sm">
//             <Printer className="h-4 w-4 mr-2" />
//             طباعة
//           </Button>
//           <Button variant="outline" size="sm">
//             <Download className="h-4 w-4 mr-2" />
//             تحميل
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Main Content */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Test Information */}
//           <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
//                     <XRay className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   <div>
//                     <CardTitle className="text-xl text-gray-900 dark:text-white">
//                       {test.radiologyTestName}
//                     </CardTitle>
//                     <CardDescription className="text-gray-600 dark:text-gray-400">
//                       رمز الفحص: {test.radiologyTestCode}
//                     </CardDescription>
//                   </div>
//                 </div>
//                 <Badge
//                   variant={getStatusColor(test.status)}
//                   className="text-sm px-3 py-1"
//                 >
//                   {getStatusText(test.status)}
//                 </Badge>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Test Details */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       معلومات الفحص
//                     </h4>
//                     <div className="space-y-3">
//                       <div className="flex items-center space-x-3">
//                         <FileText className="h-4 w-4 text-gray-500" />
//                         <div>
//                           <p className="text-sm text-gray-600 dark:text-gray-400">نوع الفحص</p>
//                           <p className="text-sm font-medium text-gray-900 dark:text-white">
//                             {test.radiologyTestCategoryName}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <User className="h-4 w-4 text-gray-500" />
//                         <div>
//                           <p className="text-sm text-gray-600 dark:text-gray-400">الطبيب المعالج</p>
//                           <p className="text-sm font-medium text-gray-900 dark:text-white">
//                             {test.doctorName}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <Building className="h-4 w-4 text-gray-500" />
//                         <div>
//                           <p className="text-sm text-gray-600 dark:text-gray-400">العيادة</p>
//                           <p className="text-sm font-medium text-gray-900 dark:text-white">
//                             {test.clinicName}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       التواريخ
//                     </h4>
//                     <div className="space-y-3">
//                       <div className="flex items-center space-x-3">
//                         <Calendar className="h-4 w-4 text-gray-500" />
//                         <div>
//                           <p className="text-sm text-gray-600 dark:text-gray-400">تاريخ الطلب</p>
//                           <p className="text-sm font-medium text-gray-900 dark:text-white">
//                             {formatDateTime(test.requestDate)}
//                           </p>
//                         </div>
//                       </div>
//                       {test.testDate && (
//                         <div className="flex items-center space-x-3">
//                           <Clock className="h-4 w-4 text-gray-500" />
//                           <div>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">تاريخ الفحص</p>
//                             <p className="text-sm font-medium text-gray-900 dark:text-white">
//                               {formatDateTime(test.testDate)}
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                       {test.resultDate && (
//                         <div className="flex items-center space-x-3">
//                           <CheckCircle className="h-4 w-4 text-green-500" />
//                           <div>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">تاريخ النتيجة</p>
//                             <p className="text-sm font-medium text-gray-900 dark:text-white">
//                               {formatDateTime(test.resultDate)}
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <Separator className="bg-border/50" />

//               {/* Notes */}
//               {test.notes && (
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
//                     <Info className="h-4 w-4" />
//                     ملاحظات الطبيب
//                   </h4>
//                   <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
//                     <p className="text-sm text-gray-700 dark:text-gray-300">
//                       {test.notes}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Results */}
//               {test.result && (
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
//                     <CheckCircle className="h-4 w-4 text-green-500" />
//                     نتائج الفحص
//                   </h4>
//                   <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200/50 dark:border-green-800/30">
//                     <p className="text-sm text-green-700 dark:text-green-300">
//                       {test.result}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Attachments */}
//               {test.attachments && test.attachments.length > 0 && (
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
//                     <Image className="h-4 w-4" />
//                     المرفقات والصور
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {test.attachments.map((attachment) => (
//                       <Card
//                         key={attachment.id}
//                         className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 border border-gray-200/30 dark:border-gray-700/30 hover:shadow-md transition-all duration-200"
//                       >
//                         <CardContent className="p-4">
//                           <div className="flex items-center space-x-3">
//                             <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
//                               <FileImage className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
//                                 {attachment.fileName}
//                               </p>
//                               <p className="text-xs text-gray-500 dark:text-gray-400">
//                                 {attachment.fileType} • {(attachment.fileSize / 1024 / 1024).toFixed(2)} MB
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-2 mt-3">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="flex-1"
//                               onClick={() => window.open(attachment.filePath, '_blank')}
//                             >
//                               <Eye className="h-4 w-4 mr-2" />
//                               عرض
//                             </Button>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="flex-1"
//                               onClick={() => {
//                                 const link = document.createElement('a');
//                                 link.href = attachment.filePath;
//                                 link.download = attachment.fileName;
//                                 link.click();
//                               }}
//                             >
//                               <Download className="h-4 w-4 mr-2" />
//                               تحميل
//                             </Button>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           {/* Visit Information */}
//           <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50">
//             <CardHeader>
//               <CardTitle className="text-lg text-gray-900 dark:text-white">
//                 معلومات الزيارة
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">رقم الزيارة</p>
//                 <p className="text-sm font-medium text-gray-900 dark:text-white">
//                   {test.visitNumber}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">التخصص</p>
//                 <p className="text-sm font-medium text-gray-900 dark:text-white">
//                   {test.specialtyName}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">مركز الأشعة</p>
//                 <p className="text-sm font-medium text-gray-900 dark:text-white">
//                   {test.radiologyCenterName}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Status Timeline */}
//           <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50">
//             <CardHeader>
//               <CardTitle className="text-lg text-gray-900 dark:text-white">
//                 حالة الفحص
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-3">
//                   <div className={cn(
//                     "p-2 rounded-full",
//                     test.status === TestStatus.Pending ? "bg-yellow-100 dark:bg-yellow-900/20" : "bg-gray-100 dark:bg-gray-800"
//                   )}>
//                     <Clock className={cn(
//                       "h-4 w-4",
//                       test.status === TestStatus.Pending ? "text-yellow-600 dark:text-yellow-400" : "text-gray-400"
//                     )} />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-900 dark:text-white">تم الطلب</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       {formatDateTime(test.requestDate)}
//                     </p>
//                   </div>
//                 </div>

//                 {test.testDate && (
//                   <div className="flex items-center space-x-3">
//                     <div className={cn(
//                       "p-2 rounded-full",
//                       test.status === TestStatus.InProgress ? "bg-blue-100 dark:bg-blue-900/20" : "bg-gray-100 dark:bg-gray-800"
//                     )}>
//                       <XRay className={cn(
//                         "h-4 w-4",
//                         test.status === TestStatus.InProgress ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
//                       )} />
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-gray-900 dark:text-white">تم الفحص</p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         {formatDateTime(test.testDate)}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {test.resultDate && (
//                   <div className="flex items-center space-x-3">
//                     <div className={cn(
//                       "p-2 rounded-full",
//                       test.status === TestStatus.Completed ? "bg-green-100 dark:bg-green-900/20" : "bg-gray-100 dark:bg-gray-800"
//                     )}>
//                       <CheckCircle className={cn(
//                         "h-4 w-4",
//                         test.status === TestStatus.Completed ? "text-green-600 dark:text-green-400" : "text-gray-400"
//                       )} />
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-gray-900 dark:text-white">تم إصدار النتيجة</p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         {formatDateTime(test.resultDate)}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {test.status === TestStatus.Cancelled && (
//                   <div className="flex items-center space-x-3">
//                     <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
//                       <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-gray-900 dark:text-white">تم الإلغاء</p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         تم إلغاء الفحص
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
