'use client';

import { Select } from '@/components/common/form';

interface VisitTypeSelectionProps {
  visitType: string;
  onVisitTypeChange: (value: string) => void;
}

export default function VisitTypeSelection({
  visitType,
  onVisitTypeChange,
}: VisitTypeSelectionProps) {
  const visitTypeOptions = [
    { value: 'initial', label: 'Initial Visit' },
    { value: 'followup', label: 'Follow-up Visit' },
    { value: 'emergency', label: 'Emergency Visit' },
    { value: 'dental', label: 'Dental Visit' },
  ];

  return (
    <div>
      <Select
        label="Visit Type"
        value={visitType}
        options={visitTypeOptions}
        placeholder="Select visit type"
      />
    </div>
  );
}
