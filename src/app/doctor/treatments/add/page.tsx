'use client';

import { useState, useEffect } from 'react';
import { Patient, patientAPI } from '@/mockData/patients';
import Modal from '@/components/common/Modal';
import { Table } from '@/components/common/Table';
import { Medication } from '@/mockData/medications';
import { DentalChart } from '@/components/dental/DentalChart';
import { PaperClipIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/solid';
import { DocumentIcon } from '@heroicons/react/24/outline';
import PageLayout from '@/components/layouts/PageLayout';

interface TreatmentFormData {
  patientId: string;
  visitType: 'initial' | 'followup' | 'emergency' | 'dental';
  symptoms: string;
  diagnosis: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  labTests: Array<{
    name: string;
    details: string;
  }>;
  rays: Array<{
    type: string;
    details: string;
  }>;
  notes: string;
  selectedTeeth?: number[];
  dentalProcedure?: {
    type: string;
    notes?: string;
  };
  dentalProcedures?: Array<{
    teeth: number[];
    type: string;
    notes?: string;
  }>;
  attachments?: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
}

interface AdvancedSearchForm {
  name: string;
  id: string;
  phone: string;
  email: string;
}

interface LabTest {
  id: string;
  name: string;
}

interface Ray {
  id: string;
  name: string;
}

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export default function AddTreatmentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newPatientData, setNewPatientData] = useState<Omit<Patient, 'id' | 'medicalHistory' | 'lastVisit'>>({
    name: '',
    age: 0,

    dateOfBirth: '',
    bloodType: '',
    phone: '',
    email: '',
    gender: 'male',
    address: '',
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    }
  });

  const [formData, setFormData] = useState<TreatmentFormData>({
    patientId: '',
    visitType: 'initial',
    symptoms: '',
    diagnosis: '',
    medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
    labTests: [],
    rays: [],
    notes: '',
    selectedTeeth: [],
    dentalProcedure: { type: '', notes: '' },
    dentalProcedures: [],
    attachments: []  // Initialize with empty array
  });

  const [showMedicationSearch, setShowMedicationSearch] = useState(false);
  const [medicationSearchQuery, setMedicationSearchQuery] = useState('');
  const [currentMedicationIndex, setCurrentMedicationIndex] = useState<number>(0);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoadingMedications, setIsLoadingMedications] = useState(false);

  const [advancedSearchForm, setAdvancedSearchForm] = useState<AdvancedSearchForm>({
    name: '',
    id: '',
    phone: '',
    email: ''
  });

  const [showTreatmentDetails, setShowTreatmentDetails] = useState(false);

  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [rays, setRays] = useState<Ray[]>([]);
  const [selectedLabTest, setSelectedLabTest] = useState<string>('');
  const [selectedRay, setSelectedRay] = useState<string>('');
  const [labTestDetails, setLabTestDetails] = useState<string>('');
  const [rayDetails, setRayDetails] = useState<string>('');

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [previewFile, setPreviewFile] = useState<Attachment | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const newAttachments = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
    setFormData(prev => ({
      ...prev,
      attachments: [...(prev.attachments || []), ...newAttachments]
    }));
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments?.filter(att => att.id !== id) || []
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const fetchMedications = async (query: string = '') => {
    setIsLoadingMedications(true);
    try {
      const response = await fetch(`/api/medications?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.status === 'success') {
        setMedications(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch medications:', error);
    } finally {
      setIsLoadingMedications(false);
    }
  };

  useEffect(() => {
    if (showMedicationSearch) {
      fetchMedications(medicationSearchQuery);
    }
  }, [medicationSearchQuery, showMedicationSearch]);

  // Search patients when query changes
  useEffect(() => {
    const searchPatients = async () => {
      if (!searchQuery.trim()) {
        setFilteredPatients([]);
        setShowDropdown(false);
        return;
      }

      try {
        setIsLoading(true);
        const results = await patientAPI.searchPatients(searchQuery);
        setFilteredPatients(results);
        setShowDropdown(true);
        setError(null);
      } catch (err) {
        setError('Failed to search patients');
        console.error('Error searching patients:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchPatients, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Handle advanced search
  const handleAdvancedSearch = async () => {
    try {
      setIsLoading(true);
      const results = await patientAPI.advancedSearch({
        name: advancedSearchForm.name,
        id: advancedSearchForm.id,
        phone: advancedSearchForm.phone,
        email: advancedSearchForm.email
      });
      setFilteredPatients(results);
      setShowAdvancedSearch(false);
      setShowDropdown(true);
      setError(null);
    } catch (err) {
      setError('Failed to search patients');
      console.error('Error searching patients:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle new patient submission
  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const newPatient = await patientAPI.addPatient({
        ...newPatientData,
        medicalHistory: [],
        lastVisit: new Date().toISOString().split('T')[0]
      });
      
      setSelectedPatient(newPatient);
      setFormData(prev => ({ ...prev, patientId: newPatient.id }));
      setShowAddPatient(false);
      setError(null);
      
      // Reset form
      setNewPatientData({
        name: '',
        age: 0,
        dateOfBirth: '',
        bloodType: '',
        phone: '',
        email: '',
        gender: 'male',
        address: '',
        emergencyContact: {
          name: '',
          phone: '',
          relation: ''
        }
      });
    } catch (err) {
      setError('Failed to add new patient');
      console.error('Error adding patient:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch lab tests and rays
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [labResponse, rayResponse] = await Promise.all([
          fetch('/api/lab-tests'),
          fetch('/api/rays')
        ]);
        
        const labData = await labResponse.json();
        const rayData = await rayResponse.json();
        
        setLabTests(labData.labTests);
        setRays(rayData.rays);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  

 

  const isPreviewable = (fileType: string) => {
    return fileType.startsWith('image/') || fileType === 'application/pdf';
  };

  return (
    <PageLayout>

      <div className="mx-auto space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Patient Selection Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 bg-white px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Patient Information</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Search and Visit Type */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search Patient
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setShowDropdown(true)}
                      className="w-full rounded-md border border-gray-200 pl-10 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Search by name, ID, or phone..."
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    {isLoading && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                    {showDropdown && filteredPatients.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg">
                        {filteredPatients.map((patient) => (
                          <div
                            key={patient.id}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                            onClick={() => {
                              setSelectedPatient(patient);
                              setSearchQuery('');
                              setShowDropdown(false);
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-gray-900">{patient.name}</div>
                                <div className="text-sm text-gray-500">ID: {patient.id}</div>
                              </div>
                              <div className="text-right text-sm text-gray-500">
                                <div>Age: {patient.age}</div>
                                <div>Blood: {patient.bloodType}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Visit Type
                  </label>
                  <select
                    value={formData.visitType}
                    onChange={(e) => setFormData({ ...formData, visitType: e.target.value as TreatmentFormData['visitType']})}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="initial">Initial Visit</option>
                    <option value="followup">Follow-up</option>
                    <option value="emergency">Emergency</option>
                    <option value="dental">Dental</option>
                  </select>
                </div>
              </div>

              {/* Patient Details */}
              {selectedPatient && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-gray-900">Patient Details</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ID: {selectedPatient.id}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm font-medium text-gray-900">{selectedPatient.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Age</p>
                      <p className="text-sm font-medium text-gray-900">{selectedPatient.age} years</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Blood Type</p>
                      <p className="text-sm font-medium text-gray-900">{selectedPatient.bloodType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{selectedPatient.phone}</p>
                    </div>
                  </div>
                  {selectedPatient.medicalHistory.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Medical History</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedPatient.medicalHistory.map((condition, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {condition}
                            <button
                              onClick={() => {
                                const updatedHistory = selectedPatient.medicalHistory.filter((_, i) => i !== index);
                                setSelectedPatient({
                                  ...selectedPatient,
                                  medicalHistory: updatedHistory
                                });
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500"
                            >
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                type="button"
                onClick={() => setShowAdvancedSearch(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                Advanced Search
              </button>
              <button
                type="button"
                onClick={() => setShowAddPatient(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                Add New Patient
              </button>
            </div>
          </div>
        </section>

        {/* Treatment Form Section */}
        {selectedPatient && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 bg-white px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">Treatment Information</h2>
            </div>
            
            <div className="p-6">
              {/* Symptoms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Symptoms
                </label>
                <textarea
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter patient symptoms..."
                />
              </div>

              {/* Diagnosis */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnosis
                </label>
                <textarea
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter diagnosis..."
                />
              </div>

              {/* Medications */}
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Medications</h4>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      medications: [...formData.medications, { name: '', dosage: '', frequency: '', duration: '' }]
                    })}
                    className="p-2 text-blue-600 hover:bg-gray-100 rounded"
                    title="Add Medication"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.medications.map((med, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-start">
                      <div className="col-span-3 relative">
                        <input
                          placeholder="Search medicine..."
                          className="w-full rounded-md border border-gray-200 pl-10 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                          value={med.name}
                          onClick={() => {
                            setMedicationSearchQuery('');
                            setMedications([]);
                            setShowMedicationSearch(true);
                            setCurrentMedicationIndex(index);
                          }}
                          readOnly
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <input
                          placeholder="Dosage"
                          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={med.dosage}
                          onChange={(e) => {
                            const newMeds = [...formData.medications];
                            newMeds[index].dosage = e.target.value;
                            setFormData({ ...formData, medications: newMeds });
                          }}
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          placeholder="Frequency"
                          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={med.frequency}
                          onChange={(e) => {
                            const newMeds = [...formData.medications];
                            newMeds[index].frequency = e.target.value;
                            setFormData({ ...formData, medications: newMeds });
                          }}
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          placeholder="Duration"
                          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={med.duration}
                          onChange={(e) => {
                            const newMeds = [...formData.medications];
                            newMeds[index].duration = e.target.value;
                            setFormData({ ...formData, medications: newMeds });
                          }}
                        />
                      </div>
                      <div className="col-span-1">
                        <button
                          type="button"
                          onClick={() => {
                            const newMeds = formData.medications.filter((_, i) => i !== index);
                            setFormData({ ...formData, medications: newMeds });
                          }}
                          className="p-2 text-red-600 hover:bg-gray-100 rounded"
                          title="Remove Medication"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lab Tests Section */}
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Lab Tests</h4>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        labTests: [...formData.labTests, { name: '', details: '' }]
                      });
                    }}
                    className="p-2 text-blue-600 hover:bg-gray-100 rounded"
                    title="Add Lab Test"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.labTests.map((test, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-start">
                      <div className="col-span-5 relative">
                        <select
                          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={test.name}
                          onChange={(e) => {
                            const newTests = [...formData.labTests];
                            newTests[index] = { ...test, name: e.target.value };
                            setFormData({ ...formData, labTests: newTests });
                          }}
                        >
                          <option value="">Select Lab Test</option>
                          {labTests.map((lt) => (
                            <option key={lt.id} value={lt.name}>
                              {lt.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-6">
                        <input
                          type="text"
                          placeholder="Additional details"
                          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={test.details}
                          onChange={(e) => {
                            const newTests = [...formData.labTests];
                            newTests[index] = { ...test, details: e.target.value };
                            setFormData({ ...formData, labTests: newTests });
                          }}
                        />
                      </div>
                      <div className="col-span-1">
                        <button
                          type="button"
                          onClick={() => {
                            const newTests = formData.labTests.filter((_, i) => i !== index);
                            setFormData({ ...formData, labTests: newTests });
                          }}
                          className="p-2 text-red-600 hover:bg-gray-100 rounded"
                          title="Remove Test"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ray Tests Section */}
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Ray Tests</h4>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        rays: [...formData.rays, { type: '', details: '' }]
                      });
                    }}
                    className="p-2 text-blue-600 hover:bg-gray-100 rounded"
                    title="Add Ray"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.rays.map((ray, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-start">
                      <div className="col-span-5 relative">
                        <select
                          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={ray.type}
                          onChange={(e) => {
                            const newRays = [...formData.rays];
                            newRays[index] = { ...ray, type: e.target.value };
                            setFormData({ ...formData, rays: newRays });
                          }}
                        >
                          <option value="">Select Ray Test</option>
                          {rays.map((r) => (
                            <option key={r.id} value={r.name}>
                              {r.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-6">
                        <input
                          type="text"
                          placeholder="Additional details"
                          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={ray.details}
                          onChange={(e) => {
                            const newRays = [...formData.rays];
                            newRays[index] = { ...ray, details: e.target.value };
                            setFormData({ ...formData, rays: newRays });
                          }}
                        />
                      </div>
                      <div className="col-span-1">
                        <button
                          type="button"
                          onClick={() => {
                            const newRays = formData.rays.filter((_, i) => i !== index);
                            setFormData({ ...formData, rays: newRays });
                          }}
                          className="p-2 text-red-600 hover:bg-gray-100 rounded"
                          title="Remove Ray"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dental Chart Section */}
              {formData.visitType === 'dental' && (
                <div className="mt-6">
                  <DentalChart
                    selectedTeeth={formData.selectedTeeth || []}
                    onTeethSelect={(teeth) => {
                      setFormData({ ...formData, selectedTeeth: teeth });
                    }}
                    procedures={formData.dentalProcedures || []}
                    onProcedureAdd={async (procedure) => {
                      setFormData(prev => ({
                        ...prev,
                        selectedTeeth: [],
                        dentalProcedures: [...(prev.dentalProcedures || []), procedure]
                      }));
                      return Promise.resolve();
                    }}
                    onProcedureRemove={(index) => {
                      const newProcedures = [...(formData.dentalProcedures || [])];
                      newProcedures.splice(index, 1);
                      setFormData({
                        ...formData,
                        dentalProcedures: newProcedures
                      });
                    }}
                  />
                
                </div>
              )}

          

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 my-3">
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter any additional notes..."
                />
              </div>

                 {/* Attachments Section */}
              <div >
                <label className="block text-sm font-medium text-gray-700 my-3">
                Treatment Attachments
                </label>
                
                 
                  
                  {/* Upload Area */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8
                      ${isDragging 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    <div className="text-center">
                      <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex flex-col items-center text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                          <span>Upload files</span>
                          <input 
                            type="file" 
                            className="sr-only" 
                            multiple 
                            onChange={handleFileSelect}
                            accept="image/*,.pdf,.doc,.docx"
                          />
                        </label>
                        <p className="pl-1 mt-1">or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-2">
                          PNG, JPG, PDF up to 10MB each
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Attachments List */}
                 {attachments.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-700">
                        Attached files ({attachments.length})
                      </h4>
                      <ul className="mt-3 divide-y divide-gray-100 rounded-md border border-gray-200">
                        {attachments.map((file) => (
                          <li
                            key={file.id}
                            className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                          >
                            <div className="flex w-0 flex-1 items-center">
                              <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                <span className="truncate font-medium text-gray-700">{file.name}</span>
                                <span className="flex-shrink-0 text-gray-400">
                                  {formatFileSize(file.size)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4 flex flex-shrink-0 space-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewFile(file);
                                setShowPreviewModal(true);
                              }}
                              className="p-1 rounded-full hover:bg-blue-50"
                              aria-label="Preview file"
                            >
                              <EyeIcon className="h-5 w-5 text-blue-600" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeAttachment(file.id)}
                              className="p-1 rounded-full hover:bg-red-50"
                              aria-label="Remove file"
                            >
                              <XMarkIcon className="h-5 w-5 text-red-600" />
                            </button> 
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}  
                
              </div>
              {/* Submit Button */}
              <div className="flex justify-between space-x-3 pt-6">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Previous
                </button>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowTreatmentDetails(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Preview
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Treatment
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Add New Patient Modal */}
        <Modal
          isOpen={showAddPatient}
          onClose={() => {
            setNewPatientData({
              name: '',
              age: 0,
              dateOfBirth: '',
              bloodType: '',
              phone: '',
              email: '',
              gender: 'male',
              address: '',
              emergencyContact: {
                name: '',
                phone: '',
                relation: ''
              }
            });
            setShowAddPatient(false);
          }}
          title="Add New Patient"
          maxWidth="2xl"
          footer={
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setNewPatientData({
                    name: '',
                    age: 0,
                    dateOfBirth: '',
                    bloodType: '',
                    phone: '',
                    email: '',
                    gender: 'male',
                    address: '',
                    emergencyContact: {
                      name: '',
                      phone: '',
                      relation: ''
                    }
                  });
                  setShowAddPatient(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPatient}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Patient
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-2 gap-4 p-4">
            {/* Basic Information */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Full name"
                value={newPatientData.name}
                onChange={(e) => setNewPatientData({ ...newPatientData, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                max={new Date().toISOString().split('T')[0]}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={newPatientData.dateOfBirth}
                onChange={(e) => setNewPatientData({ ...newPatientData, dateOfBirth: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Blood Type
              </label>
              <select
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={newPatientData.bloodType}
                onChange={(e) => setNewPatientData({ ...newPatientData, bloodType: e.target.value })}
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={newPatientData.gender}
                onChange={(e) => setNewPatientData({ ...newPatientData, gender: e.target.value as 'male' | 'female' })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="+962 XXX XXX XXX"
                value={newPatientData.phone}
                onChange={(e) => setNewPatientData({ ...newPatientData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="patient@example.com"
                value={newPatientData.email}
                onChange={(e) => setNewPatientData({ ...newPatientData, email: e.target.value })}
              />
            </div>

            <div className="col-span-2 space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Full address"
                value={newPatientData.address}
                onChange={(e) => setNewPatientData({ ...newPatientData, address: e.target.value })}
              />
            </div>

            {/* Emergency Contact */}
            <div className="col-span-2 mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Emergency Contact</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Contact name"
                    value={newPatientData.emergencyContact.name}
                    onChange={(e) => setNewPatientData({
                      ...newPatientData,
                      emergencyContact: { ...newPatientData.emergencyContact, name: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="+962 XXX XXX XXX"
                    value={newPatientData.emergencyContact.phone}
                    onChange={(e) => setNewPatientData({
                      ...newPatientData,
                      emergencyContact: { ...newPatientData.emergencyContact, phone: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Relation
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., Spouse, Parent"
                    value={newPatientData.emergencyContact.relation}
                    onChange={(e) => setNewPatientData({
                      ...newPatientData,
                      emergencyContact: { ...newPatientData.emergencyContact, relation: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Advanced Search Modal */}
        <Modal
          isOpen={showAdvancedSearch}
          onClose={() => {
            setAdvancedSearchForm({ name: '', id: '', phone: '', email: '' });
            setShowAdvancedSearch(false);
          }}
          title="Advanced Search"
          maxWidth="2xl"
          footer={
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setAdvancedSearchForm({ name: '', id: '', phone: '', email: '' });
                  setShowAdvancedSearch(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAdvancedSearch}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Patient name"
                value={advancedSearchForm.name}
                onChange={(e) => setAdvancedSearchForm({ ...advancedSearchForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                ID
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Patient ID"
                value={advancedSearchForm.id}
                onChange={(e) => setAdvancedSearchForm({ ...advancedSearchForm, id: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="+962 XXX XXX XXX"
                value={advancedSearchForm.phone}
                onChange={(e) => setAdvancedSearchForm({ ...advancedSearchForm, phone: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="patient@example.com"
                value={advancedSearchForm.email}
                onChange={(e) => setAdvancedSearchForm({ ...advancedSearchForm, email: e.target.value })}
              />
            </div>
          </div>
        </Modal>

        {/* Medication Search Modal */}
        <Modal 
          isOpen={showMedicationSearch} 
          onClose={() => setShowMedicationSearch(false)}
          title="Search Medications"
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by medication name, category, or manufacturer..."
                value={medicationSearchQuery}
                onChange={(e) => setMedicationSearchQuery(e.target.value)}
                className="w-full rounded-md border border-gray-200 pl-10 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <Table<Medication>
              data={medications}
              columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Category', accessor: 'category' },
                { header: 'Form', accessor: 'dosageForm' },
                { header: 'Strength', accessor: 'strength' },
                {
                  header: 'Action',
                  accessor: (item) => (
                    <button
                      onClick={() => {
                        const newMeds = [...formData.medications];
                        newMeds[currentMedicationIndex].name = item.name;
                        setFormData({ ...formData, medications: newMeds });
                        setShowMedicationSearch(false);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Select
                    </button>
                  ),
                  className: 'text-right'
                }
              ]}
              isLoading={isLoadingMedications}
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
              noDataMessage={{
                title: "No medications found",
                subtitle: "Try adjusting your search terms"
              }}
            />
          </div>
        </Modal>

        {/* Treatment Details Modal */}
        <Modal
          isOpen={showTreatmentDetails}
          onClose={() => setShowTreatmentDetails(false)}
          title="Treatment Details"
          maxWidth="6xl"
        >
          {/* Patient Banner */}
          {selectedPatient && (
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 mb-6">
              <div className="relative z-10 flex items-center space-x-6">
                <div className="h-20 w-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-4 ring-white/20">
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedPatient.name}</h2>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm">
                      ID: {selectedPatient.id}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm">
                      Age: {selectedPatient.age}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm capitalize">
                      Visit: {formData.visitType}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent" />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Visit Information */}
              <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900">Visit Information</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Symptoms</h4>
                    <p className="text-gray-900 bg-gray-50/50 rounded-lg p-3">{formData.symptoms || 'None reported'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Diagnosis</h4>
                    <p className="text-gray-900 bg-gray-50/50 rounded-lg p-3">{formData.diagnosis || 'No diagnosis yet'}</p>
                  </div>
                </div>
              </div>

              {/* Dental Procedures */}
              {formData.visitType === 'dental' && (
                <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
                  <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-900">Dental Procedures</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    {(formData.dentalProcedures || []).length > 0 ? (
                      <div className="space-y-4">
                        {(formData.dentalProcedures || []).map((procedure, index) => (
                          <div key={index} className="bg-gray-50/50 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">{procedure.type}</h4>
                                <div className="mt-1 flex flex-wrap gap-2">
                                  {procedure.teeth.map((tooth) => (
                                    <span key={tooth} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                                      #{tooth}
                                    </span>
                                  ))}
                                </div>
                                {procedure.notes && (
                                  <p className="mt-2 text-sm text-gray-600">{procedure.notes}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No procedures added yet</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Medications */}
              {formData.medications.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
                  <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Medications</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {formData.medications.length} prescribed
                    </span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {formData.medications.map((med, index) => (
                      <div key={index} className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-medium text-gray-900">{med.name}</p>
                            <div className="mt-2 grid grid-cols-3 gap-4">
                              <div className="col-span-1">
                                <p className="text-sm font-medium text-gray-500">Dosage</p>
                                <p className="mt-1 text-sm text-gray-900">{med.dosage}</p>
                              </div>
                              <div className="col-span-1">
                                <p className="text-sm font-medium text-gray-500">Frequency</p>
                                <p className="mt-1 text-sm text-gray-900">{med.frequency}</p>
                              </div>
                              <div className="col-span-1">
                                <p className="text-sm font-medium text-gray-500">Duration</p>
                                <p className="mt-1 text-sm text-gray-900">{med.duration}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tests Section */}
              <div className="space-y-6">
                {/* Lab Tests */}
                {formData.labTests.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
                    <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Lab Tests</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        {formData.labTests.length} ordered
                      </span>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {formData.labTests.map((test, index) => (
                        <div key={index} className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-green-50 flex items-center justify-center">
                              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-base font-medium text-gray-900">{test.name}</p>
                              {test.details && (
                                <p className="mt-2 text-sm text-gray-500">{test.details}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ray Tests */}
                {formData.rays.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
                    <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Ray Tests</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                        {formData.rays.length} ordered
                      </span>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {formData.rays.map((ray, index) => (
                        <div key={index} className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-purple-50 flex items-center justify-center">
                              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-base font-medium text-gray-900">{ray.type}</p>
                              {ray.details && (
                                <p className="mt-2 text-sm text-gray-500">{ray.details}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Attachments */}
              {formData.attachments && formData.attachments.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
                  <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-900">Attachments</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                          <PaperClipIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-medium text-gray-900">{file.name}</p>
                          <p className="mt-2 text-sm text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {formData.notes && (
                <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
                  <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-900">Additional Notes</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-900 bg-gray-50/50 rounded-lg p-3 whitespace-pre-wrap">{formData.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>

        {/* File Preview Modal */}
        <Modal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          title={previewFile?.name || 'File Preview'}
        >
          <div className="relative min-h-[400px] w-full">
            {previewFile && (
              isPreviewable(previewFile.type) ? (
                previewFile.type.startsWith('image/') ? (
                  <img
                    src={previewFile.url}
                    alt={previewFile.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={previewFile.url}
                    className="w-full h-[600px]"
                    title={previewFile.name}
                  />
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <DocumentIcon className="h-16 w-16 text-gray-400" />
                  <p className="mt-4 text-sm text-gray-500">
                    Preview not available for this file type
                  </p>
                  <a
                    href={previewFile.url}
                    download={previewFile.name}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Download File
                  </a>
                </div>
              )
            )}
          </div>
        </Modal>
      </div>
    </PageLayout>
     
  );
}
