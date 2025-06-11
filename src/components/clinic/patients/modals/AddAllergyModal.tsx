import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';

interface AddAllergyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    severity: string;
    reaction: string;
  }) => void;
}

export const AddAllergyModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddAllergyModalProps) => {
  const [name, setName] = useState('');
  const [severity, setSeverity] = useState('');
  const [reaction, setReaction] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, severity, reaction });
    setName('');
    setSeverity('');
    setReaction('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Allergy">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Allergy Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter allergy name"
          required
        />
        <Input
          label="Severity"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          placeholder="Enter severity"
          required
        />
        <Input
          label="Reaction"
          value={reaction}
          onChange={(e) => setReaction(e.target.value)}
          placeholder="Enter reaction"
          required
        />
        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Add Allergy</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAllergyModal;
