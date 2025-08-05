'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { TextArea } from '@/components/common/form';
import { Label } from '@/components/ui/label';
import { FileUp, X, File, Image, FileText, Upload, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TestItemDto } from '@/lib/api/types/visit-lab-test';
import { useAttachment } from '@/lib/api/hooks/useAttachment';
import { useAuth } from '@/lib/api/hooks/useAuth';
import {
  AttachmentDto,
  EntityType,
  FileUploadProgress,
} from '@/lib/api/types/attachment';
import { attachmentService } from '@/lib/api/services/attachment.service';
import { toast } from 'sonner';

interface TestResultUploadModalProps {
  isOpen: boolean;
  isUpdating: boolean;
  onClose: () => void;
  test: TestItemDto;
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
  const [files, setFiles] = useState<File[]>([]);
  const isUploading = uploadMultipleFiles.isPending || isUpdating;

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedAttachmentIds, setUploadedAttachmentIds] = useState<string[]>(
    []
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection with better error handling
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const errors: string[] = [];

      // Validate each file
      const validFiles: File[] = [];
      newFiles.forEach((file) => {
        try {
          attachmentService.validateFile(file, 10 * 1024 * 1024, [
            'image/*',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ]);
          validFiles.push(file);
        } catch (error) {
          errors.push(
            error instanceof Error ? error.message : 'Unknown validation error'
          );
        }
      });

      // Update state
      if (errors.length > 0) {
        setValidationErrors(errors);
        // Show toast for validation errors
        errors.forEach((error) => toast.error(error));
      } else {
        setValidationErrors([]);
      }

      if (validFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      }

      // Clear the input
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  // Remove a file from the list
  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    // Clear validation errors when files are removed
    if (files.length <= 1) {
      setValidationErrors([]);
    }
  };

  // Trigger file input click
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!results && files.length === 0) {
      toast.error('Please provide results or upload files');
      return;
    }

    // Check for validation errors
    if (validationErrors.length > 0) {
      toast.error('Please fix validation errors before uploading');
      return;
    }
    setUploadProgress(0);
    // Upload files first if there are any
    if (files.length > 0) {
      const uploadResult = await uploadMultipleFiles.mutateAsync({
        showSuccessMsg: false,
        files,
        createDto: {
          entityId: test.id,
          entityType: EntityType.VisitLabTest,
          description: results,
          uploadedBy: user?.id || '',
          isTemp: true,
        },
        onProgress: (progress: FileUploadProgress) => {
          setUploadProgress(progress.percentage);
        },
      });

      // Extract attachment IDs from the upload result
      if (uploadResult && Array.isArray(uploadResult)) {
        setUploadedAttachmentIds(uploadResult);
      }
    }

    // Submit results with attachment IDs
    await onUpload(results, uploadedAttachmentIds);

    // Reset form
    setResults('');
    setFiles([]);
    setUploadedAttachmentIds([]);
    setUploadProgress(0);
    setValidationErrors([]);
    onClose();
  };

  // Get file icon based on type
  const getFileIcon = (file: File) => {
    const icon = attachmentService.getFileIcon(file.type);
    if (!icon) {
      // Provide fallback icon if the service returns empty string
      if (file.type.startsWith('image/')) {
        return <Image className="h-5 w-5 text-blue-500" />;
      } else if (file.type === 'application/pdf') {
        return <FileText className="h-5 w-5 text-red-500" />;
      } else if (
        file.type === 'application/msword' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        return <FileText className="h-5 w-5 text-blue-500" />;
      }
      return <File className="h-5 w-5 text-gray-500" />;
    }
    return icon;
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    return attachmentService.formatFileSize(bytes);
  };

  // Modal footer buttons
  const modalFooter = (
    <div className="flex justify-end gap-3">
      <Button variant="outline" onClick={onClose} disabled={isUploading}>
        Cancel
      </Button>
      <Button
        variant="default"
        onClick={handleSubmit}
        disabled={
          uploadMultipleFiles.isPending || (!results && files.length === 0)
        }
      >
        {isUploading ? (
          <>
            <span className="animate-pulse">Uploading...</span>
            <span className="text-xs">{uploadProgress}%</span>
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" />
            Upload Results
          </>
        )}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={isUploading ? () => {} : onClose}
      title={`Upload Test Results: ${test.testName}`}
      maxWidth="3xl"
      footer={modalFooter}
    >
      <div className="space-y-6">
        {/* Test Information */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Test Name:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {test.testName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Patient Name:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {test.patientName}
              </p>
            </div>
          </div>
        </div>

        {/* Results Text Area */}
        <div className="space-y-2">
          <Label htmlFor="results" className="text-gray-700 dark:text-gray-300">
            Test Results
          </Label>
          <TextArea
            id="results"
            placeholder="Enter test results here..."
            value={results}
            onChange={(e) => setResults(e.target.value)}
            className="min-h-[120px] w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-md"
            disabled={isUploading}
          />
        </div>

        {/* File Upload */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-gray-700 dark:text-gray-300">
              Attachments
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleBrowseClick}
              disabled={isUploading}
            >
              <FileUp className="h-3.5 w-3.5 mr-1" />
              Browse Files
            </Button>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
            disabled={isUploading}
            accept="image/*,.pdf,.doc,.docx"
          />

          {/* File drop zone */}
          <div
            className={cn(
              'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
              isUploading
                ? 'bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700'
                : 'bg-gray-50 dark:bg-gray-800/30 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
            )}
            onClick={isUploading ? undefined : handleBrowseClick}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <FileUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Drag and drop files here or click to browse
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                You can upload PDF files, images, or other documents (max 10MB
                each)
              </p>
            </div>
          </div>

          {/* Selected files list */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Selected Files ({files.length})
              </p>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getFileIcon(file)}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[200px]">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upload progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-700 dark:text-gray-300">
                Uploading...
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                {uploadProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 dark:bg-blue-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
