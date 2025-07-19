'use client';

import { useState } from 'react';
import { Input } from '@/components/common/form';
import Modal from '@/components/common/Modal';
import { AdvancedSearchForm } from '../types';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  advancedSearchForm: AdvancedSearchForm;
  onAdvancedSearchFormChange: (form: AdvancedSearchForm) => void;
  onSearch: () => void;
}

export default function AdvancedSearchModal({
  isOpen,
  onClose,
  advancedSearchForm,
  onAdvancedSearchFormChange,
  onSearch,
}: AdvancedSearchModalProps) {
  const handleInputChange = (
    field: keyof AdvancedSearchForm,
    value: string
  ) => {
    onAdvancedSearchFormChange({
      ...advancedSearchForm,
      [field]: value,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Advanced Patient Search"
      maxWidth="2xl"
      footer={
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      }
    >
      <form onSubmit={handleSearch} className="space-y-4">
        <Input
          label="Patient Name"
          type="text"
          value={advancedSearchForm.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter patient name"
        />
        <Input
          label="Patient ID"
          type="text"
          value={advancedSearchForm.id}
          onChange={(e) => handleInputChange('id', e.target.value)}
          placeholder="Enter patient ID"
        />
        <Input
          label="Phone Number"
          type="tel"
          value={advancedSearchForm.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="Enter phone number"
        />
        <Input
          label="Email"
          type="email"
          value={advancedSearchForm.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter email address"
        />
      </form>
    </Modal>
  );
}
