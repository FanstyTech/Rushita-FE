import React, { useState } from 'react';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ClipboardCheck, AlertTriangle, Clock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {  TestStatus } from '@/lib/api/types/visit-lab-test';
import { getTestStatusColor, getTestStatusLabel } from '@/utils/textUtils';
import { RadiologyTestItemDto } from '@/lib/api/types/visit-radiology-test';
interface TestStatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  test: RadiologyTestItemDto;
  isUpdating: boolean;
  onStatusUpdate: (testId: string, newStatus: TestStatus) => void;
}

export default function TestStatusUpdateModal({
  isOpen,
  onClose,
  test,
  isUpdating,
  onStatusUpdate,
}: TestStatusUpdateModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<TestStatus | null>(
    test ? test.status : null
  );

  // Reset selected status when test changes
  React.useEffect(() => {
    if (test) {
      setSelectedStatus(test.status);
    }
  }, [test]);

  const handleStatusUpdate = () => {
    if (!test || selectedStatus === null) return;
    onStatusUpdate(test.id, selectedStatus);
  };

  // Modal footer buttons
  const modalFooter = (
    <div className="flex justify-end gap-3">
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button
        variant="default"
        onClick={handleStatusUpdate}
        disabled={isUpdating || selectedStatus === test.status}
      >
        {isUpdating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          'Update Status'
        )}
      </Button>
    </div>
  );
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Update Test Status: ${test.testName}`}
      maxWidth="3xl"
      footer={modalFooter}
    >
      <div className="space-y-6 py-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Patient Name:
              </span>
              <span className="text-gray-900 dark:text-gray-100">
                {test.patientName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Current Status:
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTestStatusColor(
                  test.status
                )}`}
              >
                {getTestStatusLabel(test.status)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium">Choose New Status</Label>
          <div className="grid grid-cols-1 gap-3">
            {/* Pending */}
            <div
              className={cn(
                'flex items-center border rounded-lg p-3 cursor-pointer',
                selectedStatus === TestStatus.Pending
                  ? getTestStatusColor(TestStatus.Pending)
                  : 'border-gray-200 dark:border-gray-700'
              )}
              onClick={() => setSelectedStatus(TestStatus.Pending)}
            >
              <div
                className={cn(
                  'w-4 h-4 rounded-full border-2 mr-2',
                  selectedStatus === TestStatus.Pending
                    ? 'border-amber-500 bg-amber-500 dark:border-amber-400 dark:bg-amber-400'
                    : 'border-gray-400 dark:border-gray-500'
                )}
              ></div>
              <Label className="flex items-center gap-2 cursor-pointer">
                <Clock className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                {getTestStatusLabel(TestStatus.Pending)}
              </Label>
            </div>

            {/* In Progress */}
            <div
              className={cn(
                'flex items-center border rounded-lg p-3 cursor-pointer',
                selectedStatus === TestStatus.InProgress
                  ? getTestStatusColor(TestStatus.InProgress)
                  : 'border-gray-200 dark:border-gray-700'
              )}
              onClick={() => setSelectedStatus(TestStatus.InProgress)}
            >
              <div
                className={cn(
                  'w-4 h-4 rounded-full border-2 mr-2',
                  selectedStatus === TestStatus.InProgress
                    ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400'
                    : 'border-gray-400 dark:border-gray-500'
                )}
              ></div>
              <Label className="flex items-center gap-2 cursor-pointer">
                <Loader2 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                {getTestStatusLabel(TestStatus.InProgress)}
              </Label>
            </div>

            {/* Completed */}
            <div
              className={cn(
                'flex items-center border rounded-lg p-3 cursor-pointer',
                selectedStatus === TestStatus.Completed
                  ? getTestStatusColor(TestStatus.Completed)
                  : 'border-gray-200 dark:border-gray-700'
              )}
              onClick={() => setSelectedStatus(TestStatus.Completed)}
            >
              <div
                className={cn(
                  'w-4 h-4 rounded-full border-2 mr-2',
                  selectedStatus === TestStatus.Completed
                    ? 'border-green-500 bg-green-500 dark:border-green-400 dark:bg-green-400'
                    : 'border-gray-400 dark:border-gray-500'
                )}
              ></div>
              <Label className="flex items-center gap-2 cursor-pointer">
                <ClipboardCheck className="h-5 w-5 text-green-500 dark:text-green-400" />
                {getTestStatusLabel(TestStatus.Completed)}
              </Label>
            </div>

            {/* Cancelled */}
            <div
              className={cn(
                'flex items-center border rounded-lg p-3 cursor-pointer',
                selectedStatus === TestStatus.Cancelled
                  ? getTestStatusColor(TestStatus.Cancelled)
                  : 'border-gray-200 dark:border-gray-700'
              )}
              onClick={() => setSelectedStatus(TestStatus.Cancelled)}
            >
              <div
                className={cn(
                  'w-4 h-4 rounded-full border-2 mr-2',
                  selectedStatus === TestStatus.Cancelled
                    ? 'border-red-500 bg-red-500 dark:border-red-400 dark:bg-red-400'
                    : 'border-gray-400 dark:border-gray-500'
                )}
              ></div>
              <Label className="flex items-center gap-2 cursor-pointer">
                <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
                {getTestStatusLabel(TestStatus.Cancelled)}
              </Label>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
