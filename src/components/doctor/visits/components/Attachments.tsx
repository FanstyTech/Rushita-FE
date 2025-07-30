import { useState } from 'react';
import { PaperClipIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface AttachmentsProps {
  attachments: Attachment[];
  onAttachmentsChange: (attachments: Attachment[]) => void;
  onPreviewFile: (file: Attachment) => void;
}

export default function Attachments({
  attachments,
  onAttachmentsChange,
  onPreviewFile,
}: AttachmentsProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const newAttachments = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));
    onAttachmentsChange([...attachments, ...newAttachments]);
  };

  const removeAttachment = (id: string) => {
    onAttachmentsChange(attachments.filter((att) => att.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <div className="mb-3">
        <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">
          Treatment Attachments
        </h4>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8
            ${
              isDragging
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
      >
        <div className="text-center">
          <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <div className="mt-4 flex flex-col items-center text-sm text-gray-600 dark:text-gray-400">
            <label className="relative cursor-pointer rounded-md bg-white dark:bg-gray-700 font-semibold text-blue-600 dark:text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 dark:focus-within:ring-blue-400 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-800 hover:text-blue-500 dark:hover:text-blue-300">
              <span>Upload files</span>
              <input
                type="file"
                className="sr-only"
                multiple
                onChange={handleFileSelect}
                accept="image/*,.pdf,.doc,.docx"
              />
            </label>
            <p className="pl-1 mt-1">or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              PNG, JPG, PDF up to 10MB each
            </p>
          </div>
        </div>
      </div>

      {/* Attachments List */}
      {attachments.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Attached files ({attachments.length})
          </h4>
          <ul className="mt-3 divide-y divide-gray-100 dark:divide-gray-700 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700">
            {attachments.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              >
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium text-gray-700 dark:text-gray-300">
                      {file.name}
                    </span>
                    <span className="flex-shrink-0 text-gray-400 dark:text-gray-500">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex flex-shrink-0 space-x-2">
                  <button
                    type="button"
                    onClick={() => onPreviewFile(file)}
                    className="p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    aria-label="Preview file"
                  >
                    <EyeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeAttachment(file.id)}
                    className="p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                    aria-label="Remove file"
                  >
                    <XMarkIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
