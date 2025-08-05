'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  Upload,
  X,
  FileText,
  FileImage,
  FileArchive,
  File,
  AlertCircle,
  Check,
} from 'lucide-react';
import { attachmentService } from '@/lib/api/services/attachment.service';
import { useAttachment } from '@/lib/api/hooks/useAttachment';
import {
  AttachmentDto,
  EntityType,
  FileUploadProgress,
} from '@/lib/api/types/attachment';
import { toast } from '@/components/ui/Toast';
import LoadingSpinner from './LoadingSpinner';

export interface FileUploadProps {
  onFileUpload?: (file: File) => void;
  onFileUploaded?: (attachment: AttachmentDto) => void;
  onError?: (error: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  multiple?: boolean;
  label?: string;
  helperText?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  entityId?: string; // ID of the entity to attach the file to (e.g., patientId, testId)
  entityType?: EntityType; // Type of entity (e.g., 'Patient', 'Test', 'Visit')
  uploadedBy?: string; // User ID who is uploading the file
  description?: string; // Optional description for the attachment
  specificPath?: string; // Optional specific path for the attachment
  showSuccessMsg?: boolean; // Whether to show success message after upload
}

/**
 * Reusable file upload component with drag and drop support
 */
const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  onFileUploaded,
  onError,
  accept = '*',
  maxSize = 10, // Default max size: 10MB
  multiple = false,
  label = 'Upload File',
  helperText,
  className,
  disabled = false,
  required = false,
  entityId,
  entityType,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadFile, uploadMultipleFiles } = useAttachment();

  // Format accepted file types for display
  const formatAcceptedTypes = () => {
    if (accept === '*') return 'All files';
    return accept
      .split(',')
      .map((type) => type.trim().replace('.', '').toUpperCase())
      .join(', ');
  };

  // Handle drag events
  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  // Validate file
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file type if accept is specified and not '*'
    if (accept !== '*') {
      const acceptedTypes = accept.split(',').map((type) => type.trim());
      const fileType = file.type;
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

      const isValidType = acceptedTypes.some(
        (type) =>
          fileType.includes(type.replace('*', '')) ||
          type.includes(fileExtension) ||
          (type.includes('/*') && fileType.includes(type.split('/*')[0]))
      );

      if (!isValidType) {
        return {
          valid: false,
          error: `Invalid file type. Accepted types: ${formatAcceptedTypes()}`,
        };
      }
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSize) {
      return {
        valid: false,
        error: `File size exceeds the maximum allowed size of ${maxSize}MB`,
      };
    }

    return { valid: true };
  };

  // Handle file drop
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const droppedFiles = Array.from(e.dataTransfer.files);

      if (!multiple && droppedFiles.length > 1) {
        setUploadError('Only one file can be uploaded at a time');
        return;
      }

      const filesToProcess = multiple ? droppedFiles : [droppedFiles[0]];

      // Validate each file
      const invalidFile = filesToProcess.find((file) => {
        const validation = validateFile(file);
        if (!validation.valid) {
          setUploadError(validation.error || 'Invalid file');
          if (onError) onError(validation.error || 'Invalid file');
          return true;
        }
        return false;
      });

      if (invalidFile) return;

      setFiles(filesToProcess);
      setUploadError(null);

      // Auto upload if entityId and entityType are provided
      if (entityId && entityType) {
        handleUpload(filesToProcess);
      } else if (onFileUpload) {
        filesToProcess.forEach(onFileUpload);
      }
    },
    [
      disabled,
      multiple,
      maxSize,
      accept,
      onFileUpload,
      entityId,
      entityType,
      onError,
    ]
  );

  // Handle file selection via input
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || !e.target.files?.length) return;

      const selectedFiles = Array.from(e.target.files);

      if (!multiple && selectedFiles.length > 1) {
        setUploadError('Only one file can be uploaded at a time');
        return;
      }

      const filesToProcess = multiple ? selectedFiles : [selectedFiles[0]];

      // Validate each file
      const invalidFile = filesToProcess.find((file) => {
        const validation = validateFile(file);
        if (!validation.valid) {
          setUploadError(validation.error || 'Invalid file');
          if (onError) onError(validation.error || 'Invalid file');
          return true;
        }
        return false;
      });

      if (invalidFile) return;

      setFiles(filesToProcess);
      setUploadError(null);

      // Auto upload if entityId and entityType are provided
      if (entityId && entityType) {
        handleUpload(filesToProcess);
      } else if (onFileUpload) {
        filesToProcess.forEach(onFileUpload);
      }

      // Reset the input value to allow selecting the same file again
      e.target.value = '';
    },
    [
      disabled,
      multiple,
      maxSize,
      accept,
      onFileUpload,
      entityId,
      entityType,
      onError,
    ]
  );

  // Handle progress updates
  const handleProgress = useCallback((progress: FileUploadProgress) => {
    setUploadProgress(progress.percentage);
  }, []);

  // Handle file upload
  const handleUpload = useCallback(
    async (filesToUpload: File[]) => {
      if (!entityId || !entityType || !filesToUpload.length) return;

      setIsUploading(true);
      setUploadProgress(0);
      setUploadSuccess(false);

      try {
        if (multiple && filesToUpload.length > 1) {
          // Upload multiple files
          await uploadMultipleFiles.mutateAsync({
            showSuccessMsg: true,
            files: filesToUpload,
            createDto: {
              entityId,
              entityType,
              uploadedBy: uploadedBy || '',
              description,
              specificPath,
            },
            onProgress: handleProgress,
          });
        } else {
          // Upload single file
          const file = filesToUpload[0];
          const result = await uploadFile.mutateAsync({
            file,
            createDto: {
              entityId,
              entityType,
              uploadedBy: uploadedBy || '',
              description,
              specificPath,
            },
            onProgress: handleProgress,
          });

          if (result && onFileUploaded) {
            onFileUploaded(result);
          }
        }

        // Show success state
        setUploadProgress(100);
        setUploadSuccess(true);

        // Reset after a delay
        setTimeout(() => {
          setFiles([]);
          setUploadProgress(0);
          setUploadSuccess(false);
        }, 2000);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to upload file';
        setUploadError(errorMessage);
        if (onError) onError(errorMessage);
      } finally {
        setIsUploading(false);
      }
    },
    [
      entityId,
      entityType,
      multiple,
      uploadFile,
      uploadMultipleFiles,
      uploadedBy,
      description,
      specificPath,
      onFileUploaded,
      onError,
      handleProgress,
    ]
  );

  // Get file icon based on type
  const getFileIcon = (file: File) => {
    const type = file.type.toLowerCase();

    if (type.includes('image')) {
      return <FileImage className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
    } else if (type.includes('pdf')) {
      return <FileText className="h-5 w-5 text-red-500 dark:text-red-400" />;
    } else if (
      type.includes('zip') ||
      type.includes('rar') ||
      type.includes('7z') ||
      type.includes('archive')
    ) {
      return (
        <FileArchive className="h-5 w-5 text-amber-500 dark:text-amber-400" />
      );
    } else {
      return <File className="h-5 w-5 text-gray-500 dark:text-gray-400" />;
    }
  };

  // Handle removing a file
  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadError(null);
  }, []);

  // Handle click on the dropzone to open file dialog
  const handleDropzoneClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor="file-upload" className="flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-4 transition-colors',
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
            : 'border-gray-300 dark:border-gray-700',
          disabled && 'opacity-60 cursor-not-allowed',
          'relative'
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleDropzoneClick}
      >
        <Input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled || isUploading}
          className="hidden"
          onChange={handleFileChange}
          required={required}
        />

        {/* Upload area content */}
        <div className="flex flex-col items-center justify-center py-4">
          {isUploading ? (
            <div className="w-full space-y-4">
              <div className="flex items-center justify-center">
                <LoadingSpinner size="md" />
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Uploading... {Math.round(uploadProgress)}%
              </p>
            </div>
          ) : uploadSuccess ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                Upload successful!
              </p>
            </div>
          ) : (
            <>
              <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                <Upload className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-sm font-medium">
                {files.length > 0 ? 'Add more files' : 'Drag & drop files here'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                or click to browse
              </p>
              {helperText && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {helperText}
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Accepted types: {formatAcceptedTypes()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Max size: {maxSize}MB
              </p>
            </>
          )}
        </div>

        {/* Error message */}
        {uploadError && (
          <div className="mt-2 flex items-start gap-2 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>{uploadError}</p>
          </div>
        )}

        {/* File list */}
        {files.length > 0 && !uploadSuccess && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Selected files:</p>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-2">
                    {getFileIcon(file)}
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {attachmentService.formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  {!isUploading && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload button - only show if files are selected and not auto-uploading */}
        {files.length > 0 && !isUploading && !uploadSuccess && !entityId && (
          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleUpload(files);
              }}
              disabled={isUploading || disabled}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload {files.length > 1 ? `${files.length} files` : 'file'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
