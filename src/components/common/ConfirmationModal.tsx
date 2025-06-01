'use client';

import { AlertTriangle, HelpCircle, Info, XCircle } from 'lucide-react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

type ConfirmationVariant = 'info' | 'warning' | 'error' | 'question';

interface ConfirmationModalProps {
  /** Control the visibility of the modal */
  isOpen: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Callback when confirm button is clicked */
  onConfirm: () => void;
  /** Modal title */
  title: string;
  /** Modal message */
  message: string;
  /** Optional secondary message with more details */
  secondaryMessage?: string;
  /** Loading state for confirm button */
  isLoading?: boolean;
  /** Text for confirm button */
  confirmText?: string;
  /** Text for cancel button */
  cancelText?: string;
  /** Variant affects the icon and colors */
  variant?: ConfirmationVariant;
  /** Custom icon to override the default variant icon */
  icon?: React.ReactNode;
  /** Whether to disable the cancel button */
  disableCancel?: boolean;
  /** Custom class name for the message container */
  messageClassName?: string;
}

const variantConfig: Record<
  ConfirmationVariant,
  {
    icon: React.ReactNode;
    confirmVariant: 'primary' | 'danger' | 'secondary';
    iconClass: string;
  }
> = {
  info: {
    icon: <Info className="h-6 w-6" />,
    confirmVariant: 'primary',
    iconClass: 'text-blue-500',
  },
  warning: {
    icon: <AlertTriangle className="h-6 w-6" />,
    confirmVariant: 'secondary',
    iconClass: 'text-yellow-500',
  },
  error: {
    icon: <XCircle className="h-6 w-6" />,
    confirmVariant: 'danger',
    iconClass: 'text-red-500',
  },
  question: {
    icon: <HelpCircle className="h-6 w-6" />,
    confirmVariant: 'primary',
    iconClass: 'text-gray-500',
  },
};

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  secondaryMessage,
  isLoading = false,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'question',
  icon,
  disableCancel = false,
  messageClassName = '',
}: ConfirmationModalProps) {
  const {
    icon: defaultIcon,
    confirmVariant,
    iconClass,
  } = variantConfig[variant];
  const displayIcon = icon ?? defaultIcon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <div className="flex justify-end gap-3">
          {!disableCancel && (
            <Button variant="secondary" onClick={onClose} disabled={isLoading}>
              {cancelText}
            </Button>
          )}
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className={`flex gap-4 ${messageClassName}`}>
        <div className={iconClass}>{displayIcon}</div>
        <div className="space-y-2">
          <p className="text-gray-700">{message}</p>
          {secondaryMessage && (
            <p className="text-sm text-gray-500">{secondaryMessage}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
