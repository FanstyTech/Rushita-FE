'use client';

import { useState } from 'react';
import { Input, Select, DatePicker } from '@/components/common/form';
import Modal from '@/components/common/Modal';
import { NewPatientData } from '../types';

interface AddNewPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  newPatientData: NewPatientData;
  onNewPatientDataChange: (data: NewPatientData) => void;
  onAddPatient: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function AddNewPatientModal({
  isOpen,
  onClose,
  newPatientData,
  onNewPatientDataChange,
  onAddPatient,
  isLoading,
}: AddNewPatientModalProps) {
  const handleInputChange = (field: keyof NewPatientData, value: string) => {
    onNewPatientDataChange({
      ...newPatientData,
      [field]: value,
    });
  };

  const handleEmergencyContactChange = (
    field: keyof NewPatientData['emergencyContact'],
    value: string
  ) => {
    onNewPatientDataChange({
      ...newPatientData,
      emergencyContact: {
        ...newPatientData.emergencyContact,
        [field]: value,
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Patient"
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
            onClick={onAddPatient}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Adding...' : 'Add Patient'}
          </button>
        </div>
      }
    >
      <form onSubmit={onAddPatient} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            value={newPatientData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter patient's full name"
            required
          />
          <DatePicker
            label="Date of Birth"
            value={newPatientData.dateOfBirth}
            placeholder="Select date of birth"
            required
          />
          <Select
            label="Gender"
            value={newPatientData.gender}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
            placeholder="Select gender"
            required
          />
          <Select
            label="Blood Type"
            value={newPatientData.bloodType}
            options={[
              { value: 'A+', label: 'A+' },
              { value: 'A-', label: 'A-' },
              { value: 'B+', label: 'B+' },
              { value: 'B-', label: 'B-' },
              { value: 'AB+', label: 'AB+' },
              { value: 'AB-', label: 'AB-' },
              { value: 'O+', label: 'O+' },
              { value: 'O-', label: 'O-' },
            ]}
            placeholder="Select blood type"
          />
          <Input
            label="Phone Number"
            type="tel"
            value={newPatientData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter phone number"
            required
          />
          <Input
            label="Email"
            type="email"
            value={newPatientData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter email address"
          />
          <div className="md:col-span-2">
            <Input
              label="Address"
              type="text"
              value={newPatientData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter address"
            />
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Emergency Contact
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Name"
              type="text"
              value={newPatientData.emergencyContact.name}
              onChange={(e) =>
                handleEmergencyContactChange('name', e.target.value)
              }
              placeholder="Contact name"
            />
            <Input
              label="Phone"
              type="tel"
              value={newPatientData.emergencyContact.phone}
              onChange={(e) =>
                handleEmergencyContactChange('phone', e.target.value)
              }
              placeholder="Contact phone"
            />
            <Input
              label="Relation"
              type="text"
              value={newPatientData.emergencyContact.relation}
              onChange={(e) =>
                handleEmergencyContactChange('relation', e.target.value)
              }
              placeholder="Relation to patient"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
