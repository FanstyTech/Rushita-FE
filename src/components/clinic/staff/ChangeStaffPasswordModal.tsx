// src/components/modals/ChangeStaffPasswordModal.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
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
      title="Change Password"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            isLoading={isLoading}
            onClick={async () => {
              await handleSubmit(handleFormSubmit)();
            }}
          >
            Change Password
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          label="New Password"
          type="password"
          {...register('newPassword', {
            required: 'Password is required',
            minLength: 6,
          })}
        />
      </form>
    </Modal>
  );
}
