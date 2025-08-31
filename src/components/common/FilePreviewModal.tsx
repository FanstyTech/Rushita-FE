'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import {
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { AttachmentDto } from '@/lib/api/types/attachment';
import { attachmentService } from '@/lib/api/services/attachment.service';
import { formatDate } from '@/utils/dateTimeUtils';
import LoadingSpinner from './LoadingSpinner';
import Image from 'next/image';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  attachment: AttachmentDto | null;
  attachments?: AttachmentDto[]; // Optional array of attachments for navigation
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  attachment,
  attachments = [],
}) => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Find the current index in the attachments array
  useEffect(() => {
    if (attachment && attachments.length > 0) {
      const index = attachments.findIndex((a) => a.id === attachment.id);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [attachment, attachments]);

  // Reset loading state when attachment changes
  useEffect(() => {
    setLoading(true);
    setLoadError(false);
  }, [attachment]);

  // Handle navigation
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < attachments.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Get current attachment
  const currentAttachment =
    attachments.length > 0 ? attachments[currentIndex] : attachment;

  // Determine content type for rendering
  const isImage = currentAttachment?.contentType.includes('image');
  const isPdf =
    currentAttachment?.contentType.includes('pdf') ||
    currentAttachment?.contentType.includes('application/pdf') ||
    (currentAttachment?.fileName &&
      currentAttachment.fileName.toLowerCase().endsWith('.pdf'));
  const isVideo = currentAttachment?.contentType.includes('video');
  const isAudio = currentAttachment?.contentType.includes('audio');
  const isText = currentAttachment?.contentType.includes('text');

  // Download current file
  const handleDownload = () => {
    if (currentAttachment?.downloadUrl) {
      window.open(currentAttachment.downloadUrl, '_blank');
    }
  };

  // Handle load error
  const handleLoadError = () => {
    setLoading(false);
    setLoadError(true);
  };

  // Footer buttons
  const modalFooter = (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-2">
        {attachments.length > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentIndex === attachments.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              {currentIndex + 1} of {attachments.length}
            </span>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button variant="outline" size="sm" onClick={onClose}>
          <X className="h-4 w-4 mr-2" />
          Close
        </Button>
      </div>
    </div>
  );

  // File info section
  const fileInfo = currentAttachment && (
    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {currentAttachment.fileName}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {attachmentService.formatFileSize(currentAttachment.fileSize)}
          </span>
          {currentAttachment.createdAt && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(currentAttachment.createdAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="File Preview"
      maxWidth="7xl"
      footer={modalFooter}
    >
      {currentAttachment ? (
        <div className="flex flex-col h-full">
          {fileInfo}
          <div className="flex-1 min-h-[60vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-md overflow-hidden relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 dark:bg-gray-900/80 z-10">
                <LoadingSpinner size="lg" />
              </div>
            )}
            {loadError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 dark:bg-gray-900/80 z-10">
                <div className="flex flex-col items-center gap-2">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Failed to load file preview
                  </p>
                </div>
              </div>
            )}
            {isImage && (
              <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 bg-[url('/assets/transparency-grid.png')] relative">
                <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-2 flex gap-2 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleDownload}
                    title="Download image"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <Image
                  src={currentAttachment.downloadUrl || ''}
                  alt={currentAttachment.fileName}
                  className="max-w-full max-h-full object-contain shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02]"
                  onLoad={() => setLoading(false)}
                  onError={handleLoadError}
                />
              </div>
            )}
            {isPdf && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md w-full text-center">
                  <div className="mb-4">
                    <AlertCircle className="h-12 w-12 text-amber-500 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    PDF Preview Unavailable
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Due to browser security restrictions, this PDF cannot be
                    previewed directly.
                  </p>
                  <div className="flex justify-center">
                    <Button
                      variant="default"
                      onClick={handleDownload}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {isVideo && (
              <video
                controls
                className="max-w-full max-h-full"
                onLoadedData={() => setLoading(false)}
                onError={handleLoadError}
              >
                <source
                  src={currentAttachment.previewUrl}
                  type={currentAttachment.contentType}
                />
                Your browser does not support the video tag.
              </video>
            )}
            {isAudio && (
              <audio
                controls
                className="w-full max-w-md"
                onLoadedData={() => setLoading(false)}
                onError={handleLoadError}
              >
                <source
                  src={currentAttachment.previewUrl}
                  type={currentAttachment.contentType}
                />
                Your browser does not support the audio tag.
              </audio>
            )}
            {isText && (
              <iframe
                src={currentAttachment.previewUrl}
                className="w-full h-full"
                onLoad={() => setLoading(false)}
                onError={handleLoadError}
              />
            )}
            {!isImage && !isPdf && !isVideo && !isAudio && !isText && (
              <div className="text-center p-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Preview not available for this file type
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 dark:text-gray-400">No file selected</p>
        </div>
      )}
    </Modal>
  );
};

export default FilePreviewModal;
