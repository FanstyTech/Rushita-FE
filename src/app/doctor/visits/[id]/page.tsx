'use client';

import { FC } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Edit, ArrowLeft } from 'lucide-react';
import { useVisit } from '@/lib/api/hooks/useVisit';
import {
  getVisitStatusClass,
  getVisitStatusLabel,
  getVisitTypeLabel,
} from '@/utils/textUtils';
import Spinner from '@/components/common/LoadingSpinner';

const VisitDetailsPage: FC = () => {
  const params = useParams();
  const router = useRouter();
  const visitId = params?.id as string;

  const { getVisit } = useVisit();
  const { data: visit, isLoading, error } = getVisit(visitId);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
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

  return (
    <PageLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Visit Details</h1>
          <p className="text-gray-600">View complete visit information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button onClick={() => router.push(`/doctor/visits/${visitId}/edit`)}>
            <Edit className="w-4 h-4 mr-2" /> Edit Visit
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Visit Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Visit #{visit.visitNumber}
              </h2>
              <p className="text-gray-500">
                Created on {new Date(visit.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getVisitStatusClass(
                  visit.currentStatus
                )}`}
              >
                {getVisitStatusLabel(visit.currentStatus)}
              </span>
            </div>
          </div>
        </div>

        {/* Visit Details */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Patient Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{visit.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Visit Type</p>
                <p className="font-medium">{getVisitTypeLabel(visit.type)}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Doctor Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium">{visit.staffName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Diagnosis</p>
                <p className="font-medium">
                  {/* {visit.diagnosis || 'Not specified'} */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visit Notes */}
        <div className="p-6 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
          <p className="text-gray-700 whitespace-pre-wrap">
            {visit.notes || 'No notes available'}
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default VisitDetailsPage;
