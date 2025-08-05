'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  FileText,
  FileImage,
  FileArchive,
  File,
  Download,
  Eye,
} from 'lucide-react';
import { AttachmentDto } from '@/lib/api/types/attachment';
import { formatDate } from '@/utils/dateTimeUtils';
import { attachmentService } from '@/lib/api/services/attachment.service';
import { useAttachment } from '@/lib/api/hooks/useAttachment';
import FilePreviewModal from './FilePreviewModal';

interface AttachmentsListProps {
  attachments: AttachmentDto[];
  title?: string;
  className?: string;
}

/**
 * Reusable component for displaying a list of attachments
 * Can be used in any part of the application that needs to display attachments
 */
const AttachmentsList: React.FC<AttachmentsListProps> = ({
  attachments,
  title = 'Attachments',
  className = '',
}) => {
  const { downloadAttachment } = useAttachment();
  const [previewAttachment, setPreviewAttachment] =
    useState<AttachmentDto | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // No attachments to display
  if (!attachments || attachments.length === 0) {
    return null;
  }

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    if (type.includes('image')) {
      return <FileImage className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
    } else if (type.includes('pdf')) {
      return <FileText className="h-5 w-5 text-red-500 dark:text-red-400" />;
    } else if (
      type.includes('zip') ||
      type.includes('rar') ||
      type.includes('7z')
    ) {
      return (
        <FileArchive className="h-5 w-5 text-amber-500 dark:text-amber-400" />
      );
    } else {
      return <File className="h-5 w-5 text-gray-500 dark:text-gray-400" />;
    }
  };

  // Open preview modal
  const handlePreview = (attachment: AttachmentDto) => {
    setPreviewAttachment(attachment);
    setIsPreviewOpen(true);
  };

  // Close preview modal
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <>
      <div
        className={`bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 ${className}`}
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          {title}
        </h3>
        <div className="space-y-3">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(attachment.contentType)}
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {attachment.fileName}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {attachmentService.formatFileSize(attachment.fileSize)}
                    </span>
                    {attachment.createdAt && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(attachment.createdAt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs gap-1 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300"
                  onClick={() => handlePreview(attachment)}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs gap-1 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300"
                  onClick={() => {
                    if (attachment.downloadUrl) {
                      window.open(attachment.downloadUrl, '_blank');
                    } else if (attachment.id) {
                      downloadAttachment.mutate(attachment.id);
                    }
                  }}
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* File Preview Modal */}
      <FilePreviewModal
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        attachment={previewAttachment}
        attachments={attachments}
      />
    </>
  );
};

export default AttachmentsList;
