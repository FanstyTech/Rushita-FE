import React from 'react';
import Modal from '@/components/common/Modal';
import {
  GetPatientForViewDto,
  VisitType,
} from '@/lib/api/types/clinic-patient';
import { CreateUpdateVisitLabTestDto } from '@/lib/api/types/visit-lab-test';
import { CreateUpdateVisitRadiologyTestDto } from '@/lib/api/types/visit-radiology-test';
import { CreateUpdateVisitPrescriptionDto } from '@/lib/api/types/visit-prescription';
import { getFrequencyTypeLabel, getVisitTypeLabel } from '@/utils/textUtils';
import {
  CalendarDays,
  FileText,
  PenLine,
  Pill,
  Stethoscope,
  RailSymbolIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TreatmentFormData {
  patientId: string;
  visitType: VisitType;
  symptoms: string;
  diagnosis: string;
  medications: CreateUpdateVisitPrescriptionDto[];
  labTests: CreateUpdateVisitLabTestDto[];
  rays: CreateUpdateVisitRadiologyTestDto[];
  notes?: string;
  attachments?: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
}

interface TreatmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: TreatmentFormData;
  selectedPatientData?: GetPatientForViewDto;
}

const TreatmentDetailsModal: React.FC<TreatmentDetailsModalProps> = ({
  isOpen,
  onClose,
  formData,
  selectedPatientData,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('clinic.visits.modals.treatmentDetails.title')}
      maxWidth="4xl"
    >
      <div className="space-y-8">
        {/* Patient Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center">
            <Stethoscope className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-blue-800">
              {t('clinic.visits.modals.treatmentDetails.patientInformation')}
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {selectedPatientData?.patientName?.charAt(0) || 'P'}
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-500">
                    {t('clinic.visits.modals.treatmentDetails.name')}
                  </h4>
                  <p className="mt-1 text-base font-medium text-gray-900">
                    {selectedPatientData?.patientName ||
                      t('clinic.visits.modals.treatmentDetails.notAvailable')}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    #ID
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-500">
                    {t('clinic.visits.modals.treatmentDetails.patientId')}
                  </h4>
                  <p className="mt-1 text-base font-medium text-gray-900">
                    {selectedPatientData?.patientNumber ||
                      t('clinic.visits.modals.treatmentDetails.notAvailable')}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-500">
                    {t('clinic.visits.modals.treatmentDetails.visitType')}
                  </h4>
                  <p className="mt-1 text-base font-medium text-gray-900">
                    {getVisitTypeLabel(formData.visitType)}{' '}
                    {t('clinic.visits.modals.treatmentDetails.visit')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex items-center">
            <PenLine className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">
              {t('clinic.visits.modals.treatmentDetails.treatmentInformation')}
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {t('clinic.visits.modals.treatmentDetails.symptoms')}
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-base text-gray-900">
                    {formData.symptoms ||
                      t('clinic.visits.modals.treatmentDetails.noneSpecified')}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {t('clinic.visits.modals.treatmentDetails.diagnosis')}
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-base text-gray-900">
                    {formData.diagnosis ||
                      t('clinic.visits.modals.treatmentDetails.noneSpecified')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-purple-50 px-6 py-4 border-b border-purple-100 flex items-center">
            <Pill className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-purple-800">
              {t('clinic.visits.modals.treatmentDetails.medications')}
            </h3>
          </div>
          <div className="p-6">
            {formData.medications.length > 0 ? (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t(
                          'clinic.visits.modals.treatmentDetails.medicationName'
                        )}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('clinic.visits.modals.treatmentDetails.dosage')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('clinic.visits.modals.treatmentDetails.frequency')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('clinic.visits.modals.treatmentDetails.duration')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.medications.map((med, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {med.name ||
                            t(
                              'clinic.visits.modals.treatmentDetails.notSpecified'
                            )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {med.dosage ||
                            t(
                              'clinic.visits.modals.treatmentDetails.notSpecified'
                            )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {getFrequencyTypeLabel(med.frequency) ||
                            t(
                              'clinic.visits.modals.treatmentDetails.notSpecified'
                            )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {med.duration ||
                            t(
                              'clinic.visits.modals.treatmentDetails.notSpecified'
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300">
                <Pill className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  {t(
                    'clinic.visits.modals.treatmentDetails.noMedicationsPrescribed'
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Lab Tests */}
        {formData.labTests.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-amber-50 px-6 py-4 border-b border-amber-100 flex items-center">
              <RailSymbolIcon className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-semibold text-amber-800">
                {t('clinic.visits.modals.treatmentDetails.labTests')}
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('clinic.visits.modals.treatmentDetails.testName')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('clinic.visits.modals.treatmentDetails.details')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.labTests.map((test, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {test?.testName ||
                            t(
                              'clinic.visits.modals.treatmentDetails.notSpecified'
                            )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {test.notes ||
                            t(
                              'clinic.visits.modals.treatmentDetails.noAdditionalDetails'
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Ray Tests */}
        {formData.rays.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex items-center">
              <RailSymbolIcon className="h-5 w-5 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-indigo-800">
                {t('clinic.visits.modals.treatmentDetails.rayTests')}
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('clinic.visits.modals.treatmentDetails.rayType')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('clinic.visits.modals.treatmentDetails.details')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.rays.map((ray, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {ray?.testName ||
                            t(
                              'clinic.visits.modals.treatmentDetails.notSpecified'
                            )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {ray?.notes ||
                            t(
                              'clinic.visits.modals.treatmentDetails.noAdditionalDetails'
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        {formData.notes && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-cyan-50 px-6 py-4 border-b border-cyan-100 flex items-center">
              <FileText className="h-5 w-5 text-cyan-600 mr-2" />
              <h3 className="text-lg font-semibold text-cyan-800">
                {t('clinic.visits.modals.treatmentDetails.additionalNotes')}
              </h3>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-900 whitespace-pre-wrap">
                  {formData.notes}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Attachments */}
        {formData.attachments && formData.attachments.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-rose-50 px-6 py-4 border-b border-rose-100 flex items-center">
              <svg
                className="h-5 w-5 text-rose-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              <h3 className="text-lg font-semibold text-rose-800">
                {t('clinic.visits.modals.treatmentDetails.attachments')}
              </h3>
            </div>
            <div className="p-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.attachments.map((file) => (
                  <li
                    key={file.id}
                    className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <a
                      href={file.url}
                      download={file.name}
                      className="ml-4 flex-shrink-0 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                      {t('clinic.visits.modals.treatmentDetails.download')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TreatmentDetailsModal;
