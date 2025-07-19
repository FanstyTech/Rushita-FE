import React from 'react';
import Modal from '@/components/common/Modal';
import { GetPatientForViewDto } from '@/lib/api/types/clinic-patient';

interface TreatmentFormData {
  patientId: string;
  visitType: 'initial' | 'followup' | 'emergency' | 'dental';
  symptoms: string;
  diagnosis: string;
  medications: Array<{
    id: string;
    name: string;
    dosage?: string;
    frequency?: string;
    duration?: string;
  }>;
  labTests: Array<{
    id: string;
    name: string;
    details: string;
  }>;
  rays: Array<{
    id: string;
    name: string;
    details: string;
  }>;
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
  const formatVisitType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Treatment Details"
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Patient Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Patient Information
          </h3>
          <div className="border-t border-gray-200 pt-3">
            <dl className="divide-y divide-gray-200">
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="text-sm text-gray-900 col-span-2">
                  {selectedPatientData?.patientName || 'N/A'}
                </dd>
              </div>
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Patient ID
                </dt>
                <dd className="text-sm text-gray-900 col-span-2">
                  {selectedPatientData?.patientNumber || 'N/A'}
                </dd>
              </div>
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Visit Type
                </dt>
                <dd className="text-sm text-gray-900 col-span-2">
                  {formatVisitType(formData.visitType)} Visit
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Treatment Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Treatment Information
          </h3>
          <div className="border-t border-gray-200 pt-3">
            <dl className="divide-y divide-gray-200">
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">Symptoms</dt>
                <dd className="text-sm text-gray-900 col-span-2">
                  {formData.symptoms || 'None specified'}
                </dd>
              </div>
              <div className="py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">Diagnosis</dt>
                <dd className="text-sm text-gray-900 col-span-2">
                  {formData.diagnosis || 'None specified'}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Medications */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Medications
          </h3>
          <div className="border-t border-gray-200 pt-3">
            {formData.medications.length > 0 ? (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dosage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Frequency
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.medications.map((med, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {med.name || 'Not specified'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {med.dosage || 'Not specified'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {med.frequency || 'Not specified'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {med.duration || 'Not specified'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500 py-3">
                No medications prescribed
              </p>
            )}
          </div>
        </div>

        {/* Lab Tests */}
        {formData.labTests.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Lab Tests
            </h3>
            <div className="border-t border-gray-200 pt-3">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Test Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.labTests.map((test, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {test.name || 'Not specified'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {test.details || 'No additional details'}
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
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Ray Tests
            </h3>
            <div className="border-t border-gray-200 pt-3">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ray Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.rays.map((ray, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {ray.name || 'Not specified'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ray.details || 'No additional details'}
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
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Additional Notes
            </h3>
            <div className="border-t border-gray-200 pt-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-900">{formData.notes}</p>
              </div>
            </div>
          </div>
        )}

        {/* Attachments */}
        {formData.attachments && formData.attachments.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Attachments
            </h3>
            <div className="border-t border-gray-200 pt-3">
              <ul className="divide-y divide-gray-200">
                {formData.attachments.map((file) => (
                  <li
                    key={file.id}
                    className="py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-8 w-8 text-gray-400"
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
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <a
                      href={file.url}
                      download={file.name}
                      className="ml-3 text-sm text-blue-600 hover:text-blue-500"
                    >
                      Download
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
