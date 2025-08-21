'use client';

import { FC, useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Edit,
  ArrowLeft,
  Calendar,
  User,
  Stethoscope,
  FileText,
  Clock,
  Pill,
  Activity,
  ChevronDown,
  ChevronUp,
  Microscope,
  Waves,
  Clipboard,
} from 'lucide-react';
import { useVisit } from '@/lib/api/hooks/useVisit';
import {
  getFrequencyTypeClass,
  getFrequencyTypeLabel,
  getTestStatusColor,
  getTestStatusLabel,
  getVisitStatusClass,
  getVisitStatusLabel,
  getVisitTypeLabel,
} from '@/utils/textUtils';
import VisitDetailsSkeleton from '@/components/skeletons/patient-portal/VisitDetailsSkeleton';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

const VisitDetailsPage: FC = () => {
  const params = useParams();
  const router = useRouter();
  const visitId = params?.id as string;
  const [showFullNotes, setShowFullNotes] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('details');

  const { useVisitDetails: getVisit } = useVisit();
  const { data: visit, isLoading, error } = getVisit(visitId);

  if (isLoading) {
    return (
      <PageLayout>
        <VisitDetailsSkeleton />
      </PageLayout>
    );
  }

  if (error || !visit) {
    return (
      <PageLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>
            Failed to load visit details. {error?.message || 'Visit not found.'}
          </p>
        </div>
        <div className="mt-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
          </Button>
        </div>
      </PageLayout>
    );
  }

  // Format the date for better display
  const visitDate = new Date(visit.createdAt);
  const formattedDate = format(visitDate, "MMMM d, yyyy 'at' h:mm a");

  return (
    <PageLayout>
      {/* Breadcrumb navigation */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <button
          onClick={() => router.push('/doctor/visits')}
          className="hover:text-blue-600 transition-colors"
        >
          Visits
        </button>
        <span className="mx-2">/</span>

        <span className="font-medium text-gray-700 dark:text-gray-400">
          Visit #{visit.visitNumber}
        </span>
      </div>

      <Card className="overflow-hidden border-none shadow-lg mb-6">
        {/* Visit Header */}
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b py-3 dark:bg-gradient-to-r dark:from-blue-900 dark:to-purple-900 dark:bg-gradient-to-r dark:from-blue-900 dark:to-purple-900 dark:bg-gradient-to-r dark:from-blue-900 dark:to-purple-900">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white dark:bg-gray-800 dark:bg-gray-800 dark:bg-grdark:shadow-gray-700/30 ay-800 p-3 roundedark:shadow-gray-700/30 d-full shadow-sm dark:shadow-gray-700/30 mr-4">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400 dark:text-blue-400 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 text-gray-900 dark:text-gray-100 text-gray-900 dark:text-gray-100">
                  Visit #{visit.visitNumber}
                </CardTitle>
                <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400 flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {formattedDate}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Badge
                className={`text-sm px-4 py-1.5 ${getVisitStatusClass(
                  visit.currentStatus
                )}`}
              >
                {getVisitStatusLabel(visit.currentStatus)}
              </Badge>
              <Button
                onClick={() => router.push(`/doctor/visits/${visitId}/edit`)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white dark:text-gray-100 text-white dark:text-gray-100 text-white dark:text-gray-100"
                size="sm"
              >
                <Edit className="w-4 h-4 mr-2" /> Edit Visit
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs
            defaultValue="details"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="border-b bg-gradient-to-r from-gray-50 to-gray-100 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700">
              <TabsList className="bg-transparent h-14 px-6 w-full justify-start gap-2">
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-t-lg data-[state=active]:border-b-0 data-[state=active]:text-blue-600 data-[state=active]:font-medium px-5 py-3 transition-all hover:bg-gray-50 hover:text-blue-500 relative dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Visit Details
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 scale-x-0 data-[state=active]:scale-x-100 transition-transform"></div>
                </TabsTrigger>
                <TabsTrigger
                  value="medications"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-t-lg data-[state=active]:border-b-0 data-[state=active]:text-blue-600 data-[state=active]:font-medium px-5 py-3 transition-all hover:bg-gray-50 hover:text-blue-500 relative dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400"
                >
                  <Pill className="w-4 h-4 mr-2" />
                  Medications
                  {visit.prescriptions && visit.prescriptions.length > 0 && (
                    <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-medium rounded-full px-2 py-0.5">
                      {visit.prescriptions.length}
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 scale-x-0 data-[state=active]:scale-x-100 transition-transform"></div>
                </TabsTrigger>
                <TabsTrigger
                  value="tests"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-t-lg data-[state=active]:border-b-0 data-[state=active]:text-blue-600 data-[state=active]:font-medium px-5 py-3 transition-all hover:bg-gray-50 hover:text-blue-500 relative dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400"
                >
                  <Microscope className="w-4 h-4 mr-2" />
                  Tests
                  {((visit.labTests && visit.labTests.length > 0) ||
                    (visit.radiologyTests &&
                      visit.radiologyTests.length > 0)) && (
                    <span className="ml-2 bg-purple-100 text-purple-700 text-xs font-medium rounded-full px-2 py-0.5">
                      {(visit.labTests?.length || 0) +
                        (visit.radiologyTests?.length || 0)}
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 scale-x-0 data-[state=active]:scale-x-100 transition-transform"></div>
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-t-lg data-[state=active]:border-b-0 data-[state=active]:text-blue-600 data-[state=active]:font-medium px-5 py-3 transition-all hover:bg-gray-50 hover:text-blue-500 relative dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Clinical Notes
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 scale-x-0 data-[state=active]:scale-x-100 transition-transform"></div>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="details" className="p-0 mt-0">
              {/* Visit Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      <CardTitle>Patient Information</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Patient Name
                      </p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {visit.patientName}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Visit Type
                      </p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {getVisitTypeLabel(visit.type)}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Date & Time
                      </p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {format(new Date(visit.createdAt), 'MMMM d, yyyy')} at{' '}
                        {format(new Date(visit.createdAt), 'h:mm a')}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Stethoscope className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      <CardTitle>Medical Information</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Symptoms
                      </p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {visit.symptoms || 'Not specified'}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Doctor
                      </p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {visit.staffName}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Diagnoses section */}
              <div className="px-6 pb-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Clipboard className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      <CardTitle>Diagnoses</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {visit.diagnoses && visit.diagnoses.length > 0 ? (
                      <div className="space-y-4">
                        {visit.diagnoses.map((diagnosis, index) => (
                          <div
                            key={diagnosis.id || index}
                            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                  {diagnosis.name}
                                </h4>
                                {diagnosis.notes && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {diagnosis.notes}
                                  </p>
                                )}
                              </div>
                              {diagnosis.createdAt && (
                                <Badge
                                  variant="outline"
                                  className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-500 text-xs"
                                >
                                  {format(
                                    new Date(diagnosis.createdAt),
                                    'MMM d, yyyy'
                                  )}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        No diagnoses recorded for this visit
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Visit Summary */}
              <div className="px-6 pb-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      <CardTitle>Visit Summary</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => setActiveTab('medications')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full mr-3">
                              <Pill className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                Medications
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Prescribed drugs
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700"
                          >
                            {visit.prescriptions?.length || 0} Items
                          </Badge>
                        </div>
                      </div>

                      <div
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => setActiveTab('tests')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full mr-3">
                              <Microscope className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                Lab Tests
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Ordered lab work
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700"
                          >
                            {visit.labTests?.length || 0} Tests
                          </Badge>
                        </div>
                      </div>

                      <div
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => setActiveTab('tests')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-full mr-3">
                              <Waves className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                Radiology
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Imaging tests
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-amber-50 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700"
                          >
                            {visit.radiologyTests?.length || 0} Tests
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="medications" className="p-6 mt-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <Pill className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    <CardTitle>Medications</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {visit.prescriptions && visit.prescriptions.length > 0 ? (
                    <div className="space-y-4">
                      {visit.prescriptions.map((medication, index) => (
                        <div
                          key={medication.id || index}
                          className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"
                        >
                          <div className="flex flex-col">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {medication.medicineName}
                              </h4>
                              <Badge
                                variant="outline"
                                className={getFrequencyTypeClass(
                                  medication.frequency
                                )}
                              >
                                {getFrequencyTypeLabel(medication.frequency)}
                              </Badge>
                            </div>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">
                                  Dosage:
                                </span>{' '}
                                <span className="text-gray-700 dark:text-gray-300">
                                  {medication.dosage}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">
                                  Duration:
                                </span>{' '}
                                <span className="text-gray-700 dark:text-gray-300">
                                  {medication.duration}
                                </span>
                              </div>
                            </div>
                            {medication.notes && (
                              <div className="mt-2 text-sm">
                                <span className="text-gray-500 dark:text-gray-400">
                                  Notes:
                                </span>{' '}
                                <span className="text-gray-700 dark:text-gray-300">
                                  {medication.notes}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      No medications prescribed for this visit
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tests" className="p-6 mt-0">
              <div className="space-y-6">
                {/* Lab Tests Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Microscope className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                      <CardTitle>Lab Tests</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {visit.labTests && visit.labTests.length > 0 ? (
                      <div className="space-y-4">
                        {visit.labTests.map((test, index) => (
                          <div
                            key={test.id || index}
                            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"
                          >
                            <div className="flex justify-between">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {test.labTestName}
                              </h4>
                              <Badge
                                variant="outline"
                                className={getTestStatusColor(test.status)}
                              >
                                {getTestStatusLabel(test.status)}
                              </Badge>
                            </div>
                            {test.notes && (
                              <div className="mt-2 text-sm">
                                <span className="text-gray-500 dark:text-gray-400">
                                  Details:
                                </span>{' '}
                                <span className="text-gray-700 dark:text-gray-300">
                                  {test.notes}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        No lab tests ordered for this visit
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Radiology Tests Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Waves className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
                      <CardTitle>Radiology Tests</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {visit.radiologyTests && visit.radiologyTests.length > 0 ? (
                      <div className="space-y-4">
                        {visit.radiologyTests.map((test, index) => (
                          <div
                            key={test.id || index}
                            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"
                          >
                            <div className="flex justify-between">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {test.radiologyTestName}
                              </h4>
                              <Badge
                                variant="outline"
                                className={getTestStatusColor(test.status)}
                              >
                                {getTestStatusLabel(test.status)}
                              </Badge>
                            </div>
                            {test.notes && (
                              <div className="mt-2 text-sm">
                                <span className="text-gray-500 dark:text-gray-400">
                                  Details:
                                </span>{' '}
                                <span className="text-gray-700 dark:text-gray-300">
                                  {test.notes}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        No radiology tests ordered for this visit
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="p-6 mt-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    <CardTitle>Clinical Notes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {visit.notes ? (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                      <div className="prose dark:prose-invert max-w-none">
                        {showFullNotes || visit.notes.length <= 300 ? (
                          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {visit.notes}
                          </p>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {visit.notes.substring(0, 300)}...
                          </p>
                        )}
                      </div>
                      {visit.notes.length > 300 && (
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => setShowFullNotes(!showFullNotes)}
                        >
                          {showFullNotes ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-2" /> Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-2" /> Show More
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      No clinical notes recorded for this visit
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="bg-gray-50 dark:bg-gray-700 dark:bg-gray-700 dark:bg-gray-700 p-4 border-t">
          <div className="w-full flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
              Last updated:{' '}
              {format(
                new Date(visit.updatedAt || visit.createdAt),
                'MMM d, yyyy'
              )}
            </p>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <FileText className="w-4 h-4 mr-2" /> Print Visit Summary
            </Button>
          </div>
        </CardFooter>
      </Card>
    </PageLayout>
  );
};

export default VisitDetailsPage;
