// src/components/modals/ChangeStaffPasswordModal.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/common/Modal';
import { Input } from '@/components/common/form';
import Button from '@/components/common/Button';

interface ChangeStaffPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffId: string;
  onSubmit: (data: { id: string; password: string }) => Promise<void>;
  isLoading: boolean;
}
interface FormInputs {
  newPassword: string;
}

export default function ChangeStaffPasswordModal({
  isOpen,
  onClose,
  staffId,
  onSubmit,
  isLoading,
}: ChangeStaffPasswordModalProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm<FormInputs>();

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    await onSubmit({ id: staffId, password: data.newPassword });
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('clinic.staff.changePasswordModal.title')}
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            isLoading={isLoading}
            onClick={async () => {
              await handleSubmit(handleFormSubmit)();
            }}
          >
            {t('clinic.staff.changePasswordModal.changePasswordButton')}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          label={t('clinic.staff.changePasswordModal.newPasswordLabel')}
          type="password"
          {...register('newPassword', {
            required: t('clinic.staff.changePasswordModal.passwordRequired'),
            minLength: {
              value: 6,
              message: t('clinic.staff.changePasswordModal.passwordMinLength'),
            },
          })}
        />
      </form>
    </Modal>
  );
}
