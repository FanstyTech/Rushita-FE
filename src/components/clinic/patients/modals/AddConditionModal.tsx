import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { MedicalConditionStatus } from '@/lib/api/types/clinic-patient';

interface AddConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; status: MedicalConditionStatus }) => void;
}

export const AddConditionModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddConditionModalProps) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<MedicalConditionStatus>(
    MedicalConditionStatus.Monitoring
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, status });
    setName('');
    setStatus(MedicalConditionStatus.Monitoring);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Medical Condition">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Condition Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter condition name"
          required
        />
        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Add Condition</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddConditionModal;
