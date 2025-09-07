import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/common/form';
import { TextArea } from '@/components/common/form';
import { Badge } from '@/components/ui/badge';
import {
  Package,
  Pill,
  AlertCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  Clock,
  Clipboard,
  FileText,
} from 'lucide-react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import {
  PrescribedMedicationItemDto,
  PrescriptionStatus,
} from '@/lib/api/types/visit-prescription';
import { cn } from '@/lib/utils';
import {
  getPrescriptionStatusColor,
  getPrescriptionStatusLabel,
} from '@/utils/textUtils';

// import { Progress } from '@/components/ui/progress';

interface DispenseMedicationModalProps {
  isOpen: boolean;
  isDispensing: boolean;
  onClose: () => void;
  prescription: PrescribedMedicationItemDto;
  onDispenseMedication: (
    prescriptionId: string,
    quantity: number,
    notes: string
  ) => void;
}

export default function DispenseMedicationModal({
  isOpen,
  isDispensing,
  onClose,
  prescription,
  onDispenseMedication,
}: DispenseMedicationModalProps) {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setNotes('');
      setError(null);
    }
  }, [isOpen, prescription]);

  // Validate input
  const validateInput = (value: string) => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue <= 0) {
      setError(
        t('clinic.pharmacy.modal.dispenseMedication.errors.positiveNumber')
      );
      return false;
    }

    if (numValue > prescription.remainingQuantity) {
      setError(
        `${t(
          'clinic.pharmacy.modal.dispenseMedication.errors.availableQuantity'
        )} ${prescription.remainingQuantity}`
      );
      return false;
    }

    setError(null);
    return true;
  };

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setQuantity(0);
      setError(null);
      return;
    }

    if (validateInput(value)) {
      setQuantity(parseInt(value));
    }
  };

  // Handle medication dispensing
  const handleDispense = async () => {
    onDispenseMedication(prescription.id, quantity, notes);
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

  const isDisabled =
    isDispensing ||
    prescription.status === PrescriptionStatus.FullyDispensed ||
    prescription.status === PrescriptionStatus.Cancelled ||
    prescription.status === PrescriptionStatus.Expired;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('clinic.pharmacy.modal.dispenseMedication.title')}
      maxWidth="3xl"
      footer={
        <div className="space-x-2">
          <Button variant="outline" onClick={onClose} disabled={isDispensing}>
            {t('clinic.pharmacy.modal.dispenseMedication.buttons.cancel')}
          </Button>
          <Button
            isLoading={isDispensing}
            onClick={handleDispense}
            disabled={isDisabled}
          >
            {t('clinic.pharmacy.modal.dispenseMedication.buttons.dispense')}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Patient and Medication Information */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold">{prescription.patientName}</h2>
              <div className="flex items-center text-sm mt-1">
                <User className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span>
                  {t(
                    'clinic.pharmacy.modal.dispenseMedication.sections.patientInfo.labels.patientNumber'
                  )}{' '}
                  {prescription.patientNumber}
                </span>
              </div>
              <div className="flex items-center text-sm mt-1">
                <Clipboard className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span>
                  {t(
                    'clinic.pharmacy.modal.dispenseMedication.sections.patientInfo.labels.visitNumber'
                  )}{' '}
                  {prescription.visitNumber}
                </span>
              </div>
            </div>
            {renderStatusBadge(prescription.status)}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Medication Information */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md space-y-3 border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium flex items-center text-gray-900 dark:text-gray-100">
                <Pill className="h-4 w-4 mr-2 text-primary" />
                {t(
                  'clinic.pharmacy.modal.dispenseMedication.sections.medicationInfo.title'
                )}
              </h3>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="font-medium w-32">
                    {t(
                      'clinic.pharmacy.modal.dispenseMedication.sections.medicationInfo.labels.name'
                    )}
                  </span>
                  <span>{prescription.medication.name}</span>
                </div>

                {prescription.medication.scientificName && (
                  <div className="flex items-center text-sm">
                    <span className="font-medium w-32">
                      {t(
                        'clinic.pharmacy.modal.dispenseMedication.sections.medicationInfo.labels.scientificName'
                      )}
                    </span>
                    <span>{prescription.medication.scientificName}</span>
                  </div>
                )}

                {prescription.medication.name && (
                  <div className="flex items-center text-sm">
                    <span className="font-medium w-32">
                      {t(
                        'clinic.pharmacy.modal.dispenseMedication.sections.medicationInfo.labels.arabicName'
                      )}
                    </span>
                    <span>{prescription.medication.name}</span>
                  </div>
                )}

                <div className="flex items-center text-sm">
                  <span className="font-medium w-32">
                    {t(
                      'clinic.pharmacy.modal.dispenseMedication.sections.medicationInfo.labels.strength'
                    )}
                  </span>
                  <span>{prescription.medication.strength}</span>
                </div>
              </div>
            </div>

            {/* Prescription Details */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md space-y-3 border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium flex items-center text-gray-900 dark:text-gray-100">
                <FileText className="h-4 w-4 mr-2 text-primary" />
                {t(
                  'clinic.pharmacy.modal.dispenseMedication.sections.prescriptionDetails.title'
                )}
              </h3>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="font-medium w-32">
                    {t(
                      'clinic.pharmacy.modal.dispenseMedication.sections.prescriptionDetails.labels.dosage'
                    )}
                  </span>
                  <span>{prescription.dosage}</span>
                </div>

                <div className="flex items-center text-sm">
                  <span className="font-medium w-32">
                    {t(
                      'clinic.pharmacy.modal.dispenseMedication.sections.prescriptionDetails.labels.frequency'
                    )}
                  </span>
                  <span>{prescription.frequency}</span>
                </div>

                <div className="flex items-center text-sm">
                  <span className="font-medium w-32">
                    {t(
                      'clinic.pharmacy.modal.dispenseMedication.sections.prescriptionDetails.labels.duration'
                    )}
                  </span>
                  <span>{prescription.duration}</span>
                </div>

                <div className="flex items-center text-sm">
                  <span className="font-medium w-32">
                    {t(
                      'clinic.pharmacy.modal.dispenseMedication.sections.prescriptionDetails.labels.prescribedDate'
                    )}
                  </span>
                  <span>
                    {(prescription.prescribedDate &&
                      format(
                        new Date(prescription.prescribedDate),
                        'MMM d, yyyy'
                      )) ||
                      '-'}
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <span className="font-medium w-32">
                    {t(
                      'clinic.pharmacy.modal.dispenseMedication.sections.prescriptionDetails.labels.expiryDate'
                    )}
                  </span>
                  <span>
                    {(prescription.expiryDate &&
                      format(
                        new Date(prescription.expiryDate || ''),
                        'MMM dd, yyyy',
                        {
                          locale: enUS,
                        }
                      )) ||
                      '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quantity Information */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium flex items-center text-gray-900 dark:text-gray-100">
                <Package className="h-4 w-4 mr-2 text-primary" />
                {t(
                  'clinic.pharmacy.modal.dispenseMedication.sections.quantityInfo.title'
                )}
              </h3>
              <span className="text-sm font-medium">
                {prescription.remainingQuantity}{' '}
                {t(
                  'clinic.pharmacy.modal.dispenseMedication.sections.quantityInfo.of'
                )}{' '}
                {prescription.quantity}{' '}
                {t(
                  'clinic.pharmacy.modal.dispenseMedication.sections.quantityInfo.remaining'
                )}
              </span>
            </div>

            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0</span>
              <span>{prescription.quantity}</span>
            </div>
          </div>
        </div>

        {/* Dispensing Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-base">
              {t(
                'clinic.pharmacy.modal.dispenseMedication.form.quantityToDispense'
              )}{' '}
              <span className="text-red-500">
                {t('clinic.pharmacy.modal.dispenseMedication.form.required')}
              </span>
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={prescription.remainingQuantity}
              value={quantity}
              onChange={handleQuantityChange}
              className="text-lg"
              disabled={isDisabled}
            />
            {error && (
              <p className="text-sm text-red-500 dark:text-red-400 flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-base">
              {t('clinic.pharmacy.modal.dispenseMedication.form.notes')}
            </Label>
            <TextArea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
              placeholder={t(
                'clinic.pharmacy.modal.dispenseMedication.form.notesPlaceholder'
              )}
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
