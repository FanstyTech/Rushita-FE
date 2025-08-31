'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import PageLayout from '@/components/layouts/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Calendar,
  AlertCircle,
  FileText,
  User,
  Clock,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Pill,
  Info,
  Package,
  AlertTriangle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import DispenseMedicationModal from '@/components/clinic/pharmacy/modals/DispenseMedicationModal';
import { useParams } from 'next/navigation';
import { useVisitPrescription } from '@/lib/api/hooks/useVisitPrescription';
import {
  DispenseMedicineDto,
  PrescribedMedicationItemDto,
  PrescriptionStatus,
} from '@/lib/api/types/visit-prescription';
import {
  getDosageFormLabel,
  getFrequencyTypeClass,
  getFrequencyTypeLabel,
  getMedicineStrengthLabel,
  getPrescriptionStatusColor,
  getPrescriptionStatusLabel,
} from '@/utils/textUtils';
import PrescriptionDetailsSkeleton from '@/components/skeletons/PrescriptionDetailsSkeleton';

export default function PrescribedMedicationsPage() {
  const params = useParams();
  const visitId = params?.id as string;

  const { getPrescribedMedicationsByVisitId, dispenseMedicine } =
    useVisitPrescription();
  const { data: prescribedMedicationsit, isLoading } =
    getPrescribedMedicationsByVisitId(visitId);
  // State
  const [selectedPrescription, setSelectedPrescription] =
    useState<PrescribedMedicationItemDto | null>(null);
  const [isDispenseModalOpen, setIsDispenseModalOpen] =
    useState<boolean>(false);

  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {}
  );

  // Handle card expansion
  const toggleCardExpansion = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle opening dispense modal
  const handleOpenDispenseModal = (
    prescription: PrescribedMedicationItemDto
  ) => {
    setSelectedPrescription(prescription);
    setIsDispenseModalOpen(true);
  };

  // Handle dispensing medication
  const handleDispenseMedication = async (
    prescriptionId: string,
    quantity: number,
    notes: string
  ) => {
    const payload: DispenseMedicineDto = {
      id: prescriptionId,
      dispensedQuantity: quantity,
      notes: notes,
    };
    await dispenseMedicine.mutateAsync(payload);
    setIsDispenseModalOpen(false);
  };

  // Render status badge
  const renderStatusBadge = (status: PrescriptionStatus) => {
    let StatusIcon = Clock;

    switch (status) {
      case PrescriptionStatus.Pending:
        StatusIcon = Clock;
        break;
      case PrescriptionStatus.PartiallyDispensed:
        StatusIcon = AlertCircle;
        break;
      case PrescriptionStatus.FullyDispensed:
        StatusIcon = CheckCircle2;
        break;
      case PrescriptionStatus.Cancelled:
        StatusIcon = XCircle;
        break;
      case PrescriptionStatus.Expired:
        StatusIcon = AlertTriangle;
        break;
      default:
        StatusIcon = Clock;
    }

    return (
      <Badge className={cn(getPrescriptionStatusColor(status))}>
        <StatusIcon className="h-3 w-3 mr-1" />
        {getPrescriptionStatusLabel(status)}
      </Badge>
    );
  };

  // Render action button
  const renderActionButton = (prescription: PrescribedMedicationItemDto) => {
    switch (prescription.status) {
      case PrescriptionStatus.Pending:
      case PrescriptionStatus.PartiallyDispensed:
        return (
          <Button
            size="sm"
            onClick={() => handleOpenDispenseModal(prescription)}
          >
            <RefreshCw className="h-4 w-4 ml-1" />
            Dispense Medication
          </Button>
        );
      case PrescriptionStatus.FullyDispensed:
      case PrescriptionStatus.Cancelled:
      case PrescriptionStatus.Expired:
      default:
        return <></>;
    }
  };
  if (isLoading) {
    return (
      <PageLayout>
        <PrescriptionDetailsSkeleton />
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      {/* Prescriptions List */}
      <div className="space-y-6">
        {/* Group prescriptions by visit */}
        {prescribedMedicationsit &&
          (() => {
            // Group prescriptions by visitId
            const visitGroups = prescribedMedicationsit.reduce(
              (groups, prescription) => {
                if (!groups[prescription.visitNumber]) {
                  groups[prescription.visitNumber] = {
                    visitNumber: prescription.visitNumber,
                    patientId: prescription.patientId,
                    patientName: prescription.patientName,
                    patientNumber: prescription.patientNumber,
                    createdAt: prescription.createdAt,
                    prescriptions: [],
                  };
                }
                groups[prescription.visitNumber].prescriptions.push(
                  prescription
                );
                return groups;
              },
              {} as Record<
                string,
                {
                  visitNumber: string;
                  patientId: string;
                  patientName: string;
                  patientNumber: string;
                  createdAt: string;
                  prescriptions: PrescribedMedicationItemDto[];
                }
              >
            );

            return Object.values(visitGroups).map((visitGroup) => (
              <Card
                key={visitGroup.visitNumber}
                className="mb-6 overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
              >
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/70 dark:to-gray-800/50 p-5">
                  <div className="flex flex-wrap justify-between items-center">
                    <div>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <User className="h-5 w-5 mr-2 text-primary" />
                        {visitGroup.patientName}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1.5 text-gray-400 dark:text-gray-500" />
                          <span className="font-medium">Visit:</span>{' '}
                          <span className="ml-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">
                            {visitGroup.visitNumber}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1.5 text-gray-400 dark:text-gray-500" />
                          <span className="font-medium">Patient:</span>{' '}
                          <span className="ml-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">
                            {visitGroup.patientNumber}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1.5 text-gray-400 dark:text-gray-500" />
                          <span className="font-medium">Date:</span>{' '}
                          <span className="ml-1">
                            {format(
                              new Date(visitGroup.createdAt),
                              'MMM d, yyyy'
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium flex items-center">
                      <Package className="h-4 w-4 mr-1.5" />
                      {visitGroup.prescriptions.length} Medication
                      {visitGroup.prescriptions.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {visitGroup.prescriptions.map((prescription, index) => (
                      <div
                        key={prescription.id}
                        className={cn(
                          'p-5 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all duration-200',
                          expandedCards[prescription.id] &&
                            'bg-gray-50 dark:bg-gray-800/20'
                        )}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Pill className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {prescription.medication.name}
                              </span>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {prescription.medication.scientificName}
                              </div>
                            </div>
                            <div className="ml-2">
                              {renderStatusBadge(prescription.status)}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              'h-8 w-8 p-0 rounded-full transition-transform duration-200',
                              expandedCards[prescription.id] &&
                                'bg-gray-100 dark:bg-gray-800'
                            )}
                            onClick={() => toggleCardExpansion(prescription.id)}
                          >
                            {expandedCards[prescription.id] ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="space-y-2">
                            <p className="text-sm flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="font-medium mr-1">
                                Dosage:
                              </span>{' '}
                              {prescription.dosage}
                            </p>
                            <p className="text-sm flex items-center">
                              <RefreshCw className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="font-medium mr-1">
                                Frequency:
                              </span>{' '}
                              <Badge
                                variant="outline"
                                className={getFrequencyTypeClass(
                                  prescription.frequency
                                )}
                              >
                                {getFrequencyTypeLabel(prescription.frequency)}
                              </Badge>
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm flex items-center">
                                  <Package className="h-4 w-4 mr-2 text-gray-400" />
                                  <span className="font-medium mr-1">
                                    Quantity:
                                  </span>
                                  <span className="flex items-center">
                                    <span className="font-medium text-primary">
                                      {prescription.remainingQuantity}
                                    </span>
                                    <span className="mx-1 text-gray-400">
                                      /
                                    </span>
                                    <span>{prescription.quantity}</span>
                                  </span>
                                </p>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
                                <div
                                  className={cn(
                                    'h-1.5 rounded-full',
                                    getPrescriptionStatusColor(
                                      prescription.status
                                    )
                                  )}
                                  style={{
                                    width:
                                      prescription.status ===
                                        PrescriptionStatus.FullyDispensed ||
                                      prescription.status ===
                                        PrescriptionStatus.Cancelled
                                        ? '100%'
                                        : `${
                                            (prescription.remainingQuantity /
                                              prescription.quantity) *
                                            100
                                          }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <p className="text-sm flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="font-medium mr-1">
                                Duration:
                              </span>{' '}
                              {prescription.duration}
                            </p>
                          </div>
                          <div className="flex justify-end items-center">
                            {renderActionButton(prescription)}
                          </div>
                        </div>

                        {/* Expanded details */}
                        {expandedCards[prescription.id] && (
                          <div
                            className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700 animate-fadeIn"
                            style={{ animationDuration: '0.3s' }}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                <h4 className="font-medium mb-3 text-primary flex items-center">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Prescription Details
                                </h4>
                                <div className="space-y-3">
                                  <p className="text-sm flex items-center">
                                    <User className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium mr-1 w-28">
                                      Prescribed By:
                                    </span>{' '}
                                    <span className="text-gray-700 dark:text-gray-300">
                                      {prescription.prescribedByName}
                                    </span>
                                  </p>
                                  <p className="text-sm flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium mr-1 w-28">
                                      Prescribed Date:
                                    </span>{' '}
                                    <span className="text-gray-700 dark:text-gray-300">
                                      {(prescription.prescribedDate &&
                                        format(
                                          new Date(prescription.prescribedDate),
                                          'MMM d, yyyy'
                                        )) ||
                                        '-'}
                                    </span>
                                  </p>
                                  <p className="text-sm flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium mr-1 w-28">
                                      Expiry Date:
                                    </span>{' '}
                                    <span className="text-gray-700 dark:text-gray-300">
                                      {(prescription.expiryDate &&
                                        format(
                                          new Date(prescription.expiryDate),
                                          'MMM d, yyyy'
                                        )) ||
                                        '-'}
                                    </span>
                                  </p>
                                  {prescription.notes && (
                                    <div className="text-sm flex items-start bg-gray-50 dark:bg-gray-800 p-2 rounded border-l-2 border-primary mt-2">
                                      <Info className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                                      <div>
                                        <span className="font-medium block mb-1">
                                          Notes:
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">
                                          {prescription.notes}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                <h4 className="font-medium mb-3 text-primary flex items-center">
                                  <Pill className="h-4 w-4 mr-2" />
                                  Medication Information
                                </h4>
                                <div className="space-y-3">
                                  <p className="text-sm flex items-center">
                                    <span className="font-medium mr-1 w-28">
                                      Name:
                                    </span>{' '}
                                    <span className="text-gray-700 dark:text-gray-300">
                                      {prescription.medication.name}
                                    </span>
                                  </p>
                                  <p className="text-sm flex items-center">
                                    <span className="font-medium mr-1 w-28">
                                      Scientific Name:
                                    </span>{' '}
                                    <span className="text-gray-700 dark:text-gray-300">
                                      {prescription.medication.scientificName}
                                    </span>
                                  </p>
                                  {prescription.medication.name && (
                                    <p className="text-sm flex items-center">
                                      <span className="font-medium mr-1 w-28">
                                        Arabic Name:
                                      </span>{' '}
                                      <span className="text-gray-700 dark:text-gray-300">
                                        {prescription.medication.name}
                                      </span>
                                    </p>
                                  )}
                                  <p className="text-sm flex items-center">
                                    <span className="font-medium mr-1 w-28">
                                      Strength:
                                    </span>{' '}
                                    <span className="text-gray-700 dark:text-gray-300">
                                      {getMedicineStrengthLabel(
                                        prescription.medication.strength
                                      )}
                                    </span>
                                  </p>
                                  <p className="text-sm flex items-center">
                                    <span className="font-medium mr-1 w-28">
                                      Dosage Form:
                                    </span>{' '}
                                    <span className="text-gray-700 dark:text-gray-300">
                                      {getDosageFormLabel(
                                        prescription.medication.dosageForm
                                      )}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Add a divider except for the last item */}
                        {index < visitGroup.prescriptions.length - 1 &&
                          !expandedCards[prescription.id] && (
                            <div className="border-b border-gray-100 dark:border-gray-800 mt-4"></div>
                          )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ));
          })()}
        {/* Dispense Medication Modal */}
        {selectedPrescription && (
          <DispenseMedicationModal
            isOpen={isDispenseModalOpen}
            isDispensing={dispenseMedicine.isPending}
            onClose={() => setIsDispenseModalOpen(false)}
            prescription={selectedPrescription}
            onDispenseMedication={handleDispenseMedication}
          />
        )}

        {/* Prescription History Modal */}
        {/* {selectedPrescription && (
        <PrescriptionHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          history={dispensingHistory || undefined}
          patientName={selectedPrescription.patientName}
          medicationName={
            selectedPrescription.medication.arabicName ||
            selectedPrescription.medication.name
          }
        />
      )} */}
      </div>
    </PageLayout>
  );
}
