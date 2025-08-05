'use client';

import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText, User, Printer } from 'lucide-react';
import { TestItemDto } from '@/lib/api/types/visit-lab-test';
import { getTestStatusColor, getTestStatusLabel } from '@/utils/textUtils';
import { cn } from '@/lib/utils';
import { formatDate, formatTime } from '@/utils/dateTimeUtils';
import AttachmentsList from '@/components/common/AttachmentsList';

interface TestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  test: TestItemDto;
}

const TestDetailsModal: React.FC<TestDetailsModalProps> = ({
  isOpen,
  onClose,
  test,
}) => {
  // Footer buttons
  const modalFooter = (
    <div className="flex gap-3">
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>

      <Button variant="lineargradian">
        <Printer className="h-4 w-4 mr-2" />
        Print
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Test Details: ${test.testName}`}
      maxWidth="5xl"
      footer={modalFooter}
    >
      <div className="space-y-6">
        {/* Test Info */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Test Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Test Name:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {test.testName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Patient Name:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {test.patientName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Test Date:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {formatDate(test.createdAt)}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Test Time:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {formatTime(test.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="h-5 w-5" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Test Status:
                </span>
                <Badge
                  variant="outline"
                  className={cn(getTestStatusColor(test.status))}
                >
                  {getTestStatusLabel(test.status)}
                </Badge>{' '}
              </div>
            </div>
          </div>
        </div>

        {/* Test Details */}
        {test.details && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Test Details
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {test.details}
            </p>
          </div>
        )}

        {/* Test Attachments */}
        {test.attachments && test.attachments.length > 0 && (
          <AttachmentsList
            title="Test Attachments"
            attachments={test.attachments}
          />
        )}
      </div>
    </Modal>
  );
};

export default TestDetailsModal;
