import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  FileText,
  Package,
  Pill,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Factory,
  Info,
  AlertOctagon,
  BookOpen,
} from 'lucide-react';

import {
  PrescribedMedicationItemDto,
  PrescriptionStatus,
  MedicationItemDto,
} from '@/lib/api/types/visit-prescription';

interface MedicationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  medication: MedicationItemDto;
}

export default function MedicationDetailsModal({
  isOpen,
  onClose,
  medication,
}: MedicationDetailsModalProps) {
  const renderStatusBadge = (status: MedicationStatus) => {
    switch (status) {
      case MedicationStatus.InStock:
        return (
          <Badge className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            متوفر
          </Badge>
        );
      case MedicationStatus.LowStock:
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700">
            <AlertCircle className="h-3 w-3 mr-1" />
            مخزون منخفض
          </Badge>
        );
      case MedicationStatus.OutOfStock:
        return (
          <Badge className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
            <XCircle className="h-3 w-3 mr-1" />
            غير متوفر
          </Badge>
        );
      case MedicationStatus.Discontinued:
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700">
            <AlertTriangle className="h-3 w-3 mr-1" />
            متوقف
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={medication.name || medication.name}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* معلومات أساسية */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">
              {medication.name || medication.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {medication.scientificName}
            </p>
          </div>
          {renderStatusBadge(medication.status)}
        </div>

        {/* تفاصيل الدواء */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold border-b pb-2 dark:border-gray-700">
              معلومات الدواء
            </h3>

            <div className="flex items-center">
              <Pill className="h-5 w-5 ml-2 text-gray-500 dark:text-gray-400" />
              <div>
                <span className="font-medium">الفئة:</span>{' '}
                {medication.medicationTypeName}
              </div>
            </div>

            <div className="flex items-center">
              <Package className="h-5 w-5 ml-2 text-gray-500 dark:text-gray-400" />
              <div>
                <span className="font-medium">الشكل:</span>{' '}
                {medication.medicationTypeName}- {medication.strength}
              </div>
            </div>

            <div className="flex items-center">
              <Factory className="h-5 w-5 ml-2 text-gray-500 dark:text-gray-400" />
              <div>
                <span className="font-medium">الشركة المصنعة:</span>{' '}
                {medication.manufacturer}
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 ml-2 text-gray-500 dark:text-gray-400" />
              <div>
                <span className="font-medium">تاريخ الانتهاء:</span>{' '}
                {format(new Date(medication.expiryDate), 'dd/MM/yyyy', {
                  locale: ar,
                })}
              </div>
            </div>

            <div className="flex items-center">
              <Info className="h-5 w-5 ml-2 text-gray-500 dark:text-gray-400" />
              <div>
                <span className="font-medium">رقم التشغيلة:</span>{' '}
                {medication.batchNumber}
              </div>
            </div>

            <div className="flex items-center">
              <FileText className="h-5 w-5 ml-2 text-gray-500 dark:text-gray-400" />
              <div>
                <span className="font-medium">الوصفة الطبية:</span>{' '}
                {medication.requiresPrescription ? 'مطلوبة' : 'غير مطلوبة'}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold border-b pb-2 dark:border-gray-700">
              معلومات المخزون
            </h3>

            <div className="flex items-center">
              <Package className="h-5 w-5 ml-2 text-gray-500 dark:text-gray-400" />
              <div>
                <span className="font-medium">الكمية المتوفرة:</span>{' '}
                {medication.stockQuantity} وحدة
              </div>
            </div>

            <div className="flex items-center">
              <DollarSign className="h-5 w-5 ml-2 text-gray-500 dark:text-gray-400" />
              <div>
                <span className="font-medium">السعر:</span>{' '}
                {medication.price.toFixed(2)} ريال
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 ml-2 text-gray-500 dark:text-gray-400" />
              <div>
                <span className="font-medium">تاريخ الإضافة:</span>{' '}
                {format(new Date(medication.createdAt), 'dd/MM/yyyy', {
                  locale: ar,
                })}
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 ml-2 text-gray-500 dark:text-gray-400" />
              <div>
                <span className="font-medium">آخر تحديث:</span>{' '}
                {format(new Date(medication.updatedAt), 'dd/MM/yyyy', {
                  locale: ar,
                })}
              </div>
            </div>
          </div>
        </div>

        {/* وصف الدواء والآثار الجانبية وتعليمات الاستخدام */}
        {(medication.description ||
          medication.sideEffects ||
          medication.usageInstructions) && (
          <div className="space-y-4 border-t pt-4 dark:border-gray-700">
            {medication.description && (
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <Info className="h-5 w-5 ml-2" />
                  الوصف
                </h3>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  {medication.description}
                </p>
              </div>
            )}

            {medication.sideEffects && (
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <AlertOctagon className="h-5 w-5 ml-2" />
                  الآثار الجانبية
                </h3>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  {medication.sideEffects}
                </p>
              </div>
            )}

            {medication.usageInstructions && (
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <BookOpen className="h-5 w-5 ml-2" />
                  تعليمات الاستخدام
                </h3>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  {medication.usageInstructions}
                </p>
              </div>
            )}
          </div>
        )}

        {/* زر الإغلاق */}
        <div className="flex justify-end mt-6">
          <Button onClick={onClose}>إغلاق</Button>
        </div>
      </div>
    </Modal>
  );
}
