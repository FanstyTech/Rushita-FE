import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';

interface AddFamilyHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { condition: string; relationship: string }) => void;
}

export const AddFamilyHistoryModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddFamilyHistoryModalProps) => {
  const [condition, setCondition] = useState('');
  const [relationship, setRelationship] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ condition, relationship });
    setCondition('');
    setRelationship('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Family History">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="Enter condition"
          required
        />
        <Input
          label="Relationship"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          placeholder="Enter relationship"
          required
        />
        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Add Family History</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddFamilyHistoryModal;
