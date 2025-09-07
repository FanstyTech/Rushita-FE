import React from 'react';
import Modal from '@/components/common/Modal';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: Attachment | null;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  file,
}) => {
  const { t } = useTranslation();

  const isPreviewable = (fileType: string) => {
    return fileType.startsWith('image/') || fileType === 'application/pdf';
  };

  if (!file) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={file.name} maxWidth="4xl">
      <div className="flex justify-center">
        {isPreviewable(file.type) ? (
          file.type.startsWith('image/') ? (
            <Image
              src={file.url}
              alt={file.name}
              className="max-w-full max-h-[70vh] object-contain relative"
            />
          ) : (
            <iframe
              src={file.url}
              title={file.name}
              className="w-full h-[70vh]"
            />
          )
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">
              {t('clinic.visits.modals.filePreview.previewNotAvailable')}
            </p>
            <a
              href={file.url}
              download={file.name}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t('clinic.visits.modals.filePreview.downloadFile')}
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default FilePreviewModal;
