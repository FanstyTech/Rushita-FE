'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { TextArea } from '@/components/common/form';
import { Label } from '@/components/ui/label';
import { Loader2, Check } from 'lucide-react';
import { RadiologyTestItemDto } from '@/lib/api/types/visit-radiology-test';
import { useAttachment } from '@/lib/api/hooks/useAttachment';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { EntityType } from '@/lib/api/types/attachment';
import { toast } from 'sonner';
import FileUpload from '@/components/common/files/FileUpload';

interface TestResultUploadModalProps {
  isOpen: boolean;
  isUpdating: boolean;
  onClose: () => void;
  test: RadiologyTestItemDto;
  onUpload: (results: string, attachmentIds: string[]) => Promise<void>;
}

export default function TestResultUploadModal({
  isOpen,
  isUpdating,
  onClose,
  test,
  onUpload,
}: TestResultUploadModalProps) {
  const { user } = useAuth();
  const { uploadMultipleFiles } = useAttachment();

  const [results, setResults] = useState('');
  const [uploadedAttachmentIds, setUploadedAttachmentIds] = useState<string[]>(
    []
  );
  const isUploading = uploadMultipleFiles.isPending || isUpdating;

  // Reset form when modal opens/closes or test changes
  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setResults(test.results || '');
      setUploadedAttachmentIds([]);
    } else {
      // Reset form when modal closes
      setResults('');
      setUploadedAttachmentIds([]);
    }
  }, [isOpen, test.id, test.results]);

  // Handle file upload completion
  const handleFileUploaded = (attachmentId: string) => {
    setUploadedAttachmentIds((prev) => [...prev, attachmentId]);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!test || !user) return;

    try {
      // Call the parent upload handler
      await onUpload(results, uploadedAttachmentIds);

      // Reset form after successful upload
      setResults('');
      setUploadedAttachmentIds([]);
    } catch (error) {
      console.error('Error uploading test results:', error);
      toast.error('Failed to upload test results');
    }
  };

  // Handle modal close
  const handleClose = () => {
    // Reset form when closing
    setResults('');
    setUploadedAttachmentIds([]);
    onClose();
  };

  // Modal footer
  const modalFooter = (
    <div className="flex justify-end gap-3">
      <Button variant="outline" onClick={handleClose} disabled={isUploading}>
        Cancel
      </Button>
      <Button
        variant="default"
        onClick={handleSubmit}
        disabled={
          isUploading || (!results.trim() && uploadedAttachmentIds.length === 0)
        }
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Check className="mr-2 h-4 w-4" />
            Save Results
          </>
        )}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Upload Test Results: ${test.testName}`}
      maxWidth="4xl"
      footer={modalFooter}
    >
      <div className="space-y-6">
        {/* Test Information */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Patient:
              </span>
              <span className="text-gray-900 dark:text-gray-100">
                {test.patientName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Test Type:
              </span>
              <span className="text-gray-900 dark:text-gray-100">
                {test.testName}
              </span>
            </div>
          </div>
        </div>

        {/* Results Text */}
        <div className="space-y-2">
          <Label htmlFor="results" className="text-base font-medium">
            Test Results
          </Label>
          <TextArea
            id="results"
            value={results}
            onChange={(e) => setResults(e.target.value)}
            placeholder="Enter test results here..."
            rows={6}
            className="resize-none"
            disabled={isUploading}
          />
        </div>

        {/* File Upload Section */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Upload Attachments</Label>

          <FileUpload
            entityId={test.id}
            entityType={EntityType.VisitRadiologyTest}
            uploadedBy={user?.id || ''}
            description={results || 'Test result attachment'}
            multiple={true}
            accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
            maxSize={10}
            label=""
            helperText="Upload test result files, images, or documents"
            showSuccessMsg={false}
            onFileUploaded={(attachment) => handleFileUploaded(attachment.id)}
            onError={(error) => toast.error(error)}
            disabled={isUploading}
          />
        </div>
      </div>
    </Modal>
  );
}
