export const visits = {
  title: 'Visits',
  description: 'Manage patient visits and medical follow-ups',

  // Table columns
  table: {
    columns: {
      visitNumber: 'Visit #',
      patientName: 'Patient Name',
      doctor: 'Doctor',
      date: 'Date',
      type: 'Visit Type',
      status: 'Status',
      actions: 'Actions',
    },
  },

  // Filter options
  filters: {
    searchPlaceholder: 'Search visits...',
    statusFilter: 'Status',
    allStatus: 'All Status',
  },

  // Action buttons and tooltips
  actions: {
    addNew: 'Add New Visit',
    view: 'View visit details',
    edit: 'Edit visit details',
    delete: 'Delete visit',
    editVisit: 'Edit Visit',
    goBack: 'Go Back',
    printSummary: 'Print Visit Summary',
  },

  // Visit types
  visitTypes: {
    consultation: 'Consultation',
    followUp: 'Follow-up',
    emergency: 'Emergency',
    checkup: 'Check-up',
    procedure: 'Medical Procedure',
    vaccination: 'Vaccination',
    therapy: 'Physical Therapy',
    new: 'New Visit',
    followup: 'Follow-up Visit',
  },

  // Visit statuses
  statuses: {
    scheduled: 'Scheduled',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    noShow: 'No Show',
    rescheduled: 'Rescheduled',
  },

  // Delete confirmation modal
  deleteModal: {
    title: 'Delete Visit',
    message: 'Are you sure you want to delete this visit?',
    secondaryMessage: 'This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
  },

  // Loading states
  loading: {
    visits: 'Loading visits...',
    deleting: 'Deleting visit...',
    processing: 'Processing...',
    loadingVisit: 'Loading visit data...',
    loadingAppointment: 'Loading appointment data...',
    saving: 'Saving...',
  },

  // Success/Error messages
  messages: {
    visitDeleted: 'Visit deleted successfully',
    visitUpdated: 'Visit updated successfully',
    visitCreated: 'Visit created successfully',
    errorLoading: 'Error loading visits',
    errorDeleting: 'Error deleting visit',
    errorUpdating: 'Error updating visit',
    failedToLoad: 'Failed to load visit details.',
    visitNotFound: 'Visit not found.',
  },

  // Empty states
  emptyStates: {
    noVisits: 'No visits found',
    noVisitsDescription: 'No visits were found. Start by adding a new visit.',
    noResults: 'No results found',
    noResultsDescription: 'No visits match your search criteria.',
  },

  // Visit Form
  form: {
    // Section titles
    sections: {
      treatmentInformation: 'Treatment Information',
      attachments: 'Attachments',
    },

    // Form labels and placeholders
    labels: {
      linkedToAppointment: 'Linked to appointment:',
    },

    // Form buttons
    buttons: {
      previous: 'Previous',
      preview: 'Preview',
      saveVisit: 'Save Visit',
      saving: 'Saving...',
    },

    // File upload
    fileUpload: {
      helperText: 'Upload visit-related files, images, or documents',
      description: 'Visit attachment',
    },

    // Modal titles
    modals: {
      addNewPatient: 'Add New Patient',
    },

    // Patient Info Section
    patientInfo: {
      title: 'Patient Information',
      searchPatient: 'Search Patient',
      searchPlaceholder: 'Search by name, ID, or phone...',
      visitType: 'Visit Type',
      patient: 'Patient',
      patientDetails: 'Patient Details',
      name: 'Name',
      age: 'Age',
      years: 'years',
      bloodType: 'Blood Type',
      phone: 'Phone',
      addNewPatient: 'Add New Patient',
      noPatients: 'No patients found',
      typeToSearch: 'Type to search for patients',
      notAvailable: 'N/A',
      id: 'ID',
    },

    // Medications Section
    medications: {
      title: 'Medications',
      addMedication: 'Add Medication',
      removeMedication: 'Remove Medication',
      medicationNumber: 'Medication #',
      medicationName: 'Medication Name',
      searchMedicine: 'Search medicine...',
      dosage: 'Dosage',
      frequency: 'Frequency',
      duration: 'Duration (days)',
      notes: 'Notes',
      notesPlaceholder:
        'Additional instructions or notes about this medication',
      medicationNameRequired: 'Medication name is required',
    },

    // Lab Tests Section
    labTests: {
      title: 'Lab Tests',
      addLabTest: 'Add Lab Test',
      removeLabTest: 'Remove Lab Test',
      labTestNumber: 'Lab Test #',
      labTest: 'Lab Test',
      selectLabTest: 'Select Lab Test',
      additionalDetails: 'Additional Details',
      additionalDetailsPlaceholder: 'Additional details',
      labTestRequired: 'Lab test name is required',
      noLabTests: 'No lab tests added yet. Click Add Lab Test to begin.',
      addLabTestButton: 'Add Lab Test',
    },

    // Ray Tests Section
    rayTests: {
      title: 'Ray Tests',
      addRayTest: 'Add Ray Test',
      removeRayTest: 'Remove Ray Test',
      rayTestNumber: 'Ray Test #',
      rayTest: 'Ray Test',
      selectRay: 'Select Ray',
      additionalDetails: 'Additional Details',
      additionalDetailsPlaceholder: 'Additional details',
      rayTestRequired: 'Ray test name is required',
      noRayTests: 'No ray tests added yet. Click Add Ray Test to begin.',
      addRayTestButton: 'Add Ray Test',
    },

    // Symptoms and Diagnosis Section
    symptomsAndDiagnosis: {
      title: 'Symptoms & Diagnosis',
      symptoms: 'Symptoms',
      symptomsPlaceholder: 'Enter patient symptoms...',
      diagnosis: 'Diagnosis (ICD-10)',
      diagnosisPlaceholder: 'Select ICD-10 diagnosis code...',
      selectDiagnosis: 'Select Diagnosis',
      noDiagnosisFound: 'No diagnosis codes found matching your search',
      noDiagnosisSelected: 'No diagnosis selected',
      selected: 'Selected',
      searchPlaceholder: 'Search diagnosis...',
    },

    // Notes Section
    notes: {
      title: 'Additional Notes',
      placeholder: 'Enter any additional notes...',
    },

    // Validation messages
    validation: {
      patientRequired: 'Patient selection is required',
      visitTypeRequired: 'Visit type is required',
      symptomsRequired: 'Symptoms are required',
      diagnosisRequired: 'Diagnosis is required',
      medicationNameRequired: 'Medication name is required',
      dosageRequired: 'Dosage is required',
      frequencyRequired: 'Frequency is required',
      durationRequired: 'Duration is required',
      labTestRequired: 'Lab test name is required',
      rayTestRequired: 'Ray test name is required',
      dentalProcedureRequired: 'Dental procedure type is required',
    },
  },

  // Modals
  modals: {
    // Advanced Search Modal
    advancedSearch: {
      title: 'Advanced Patient Search',
      cancel: 'Cancel',
      search: 'Search',
      patientName: 'Patient Name',
      patientNamePlaceholder: 'Enter patient name',
      patientId: 'Patient ID',
      patientIdPlaceholder: 'Enter patient ID',
      phoneNumber: 'Phone Number',
      phoneNumberPlaceholder: 'Enter phone number',
      email: 'Email',
      emailPlaceholder: 'Enter email address',
    },

    // Medication Search Modal
    medicationSearch: {
      title: 'Search Medications',
      searchPlaceholder:
        'Search by medication name, category, or manufacturer...',
      select: 'Select',
      noMedicationsFound: 'No medications found',
      adjustSearchTerms: 'Try adjusting your search terms',
      columns: {
        code: 'Code',
        name: 'Name',
        scientificName: 'Scientific Name',
        medicationType: 'Medication Type',
        actions: 'Actions',
      },
    },

    // File Preview Modal
    filePreview: {
      previewNotAvailable:
        'Preview not available for this file type. Please download to view.',
      downloadFile: 'Download File',
    },

    // Treatment Details Modal
    treatmentDetails: {
      title: 'Treatment Details',
      patientInformation: 'Patient Information',
      treatmentInformation: 'Treatment Information',
      name: 'Name',
      patientId: 'Patient ID',
      visitType: 'Visit Type',
      visit: 'Visit',
      symptoms: 'Symptoms',
      diagnosis: 'Diagnosis',
      medications: 'Medications',
      medicationName: 'Name',
      dosage: 'Dosage',
      frequency: 'Frequency',
      duration: 'Duration',
      labTests: 'Lab Tests',
      testName: 'Test Name',
      rayTests: 'Ray Tests',
      rayType: 'Ray Type',
      details: 'Details',
      additionalNotes: 'Additional Notes',
      attachments: 'Attachments',
      download: 'Download',
      notAvailable: 'N/A',
      noneSpecified: 'None specified',
      notSpecified: 'Not specified',
      noAdditionalDetails: 'No additional details',
      noMedicationsPrescribed: 'No medications prescribed',
    },
  },

  // Visit Details Page
  details: {
    // Tabs
    tabs: {
      details: 'Visit Details',
      medications: 'Medications',
      tests: 'Tests',
      notes: 'Clinical Notes',
    },

    // Patient Information Section
    patientInfo: {
      title: 'Patient Information',
      patientName: 'Patient Name',
      visitType: 'Visit Type',
      dateTime: 'Date & Time',
      at: 'at',
    },

    // Medical Information Section
    medicalInfo: {
      title: 'Medical Information',
      symptoms: 'Symptoms',
      doctor: 'Doctor',
      notSpecified: 'Not specified',
    },

    // Diagnoses Section
    diagnoses: {
      title: 'Diagnoses',
      noDiagnoses: 'No diagnoses recorded for this visit',
    },

    // Visit Summary Section
    summary: {
      title: 'Visit Summary',
      medications: {
        title: 'Medications',
        description: 'Prescribed drugs',
        items: 'Items',
      },
      labTests: {
        title: 'Lab Tests',
        description: 'Ordered lab work',
        tests: 'Tests',
      },
      radiology: {
        title: 'Radiology',
        description: 'Imaging tests',
        tests: 'Tests',
      },
    },

    // Medications Tab
    medications: {
      title: 'Medications',
      dosage: 'Dosage:',
      duration: 'Duration:',
      notes: 'Notes:',
      noMedications: 'No medications prescribed for this visit',
    },

    // Tests Tab
    tests: {
      labTests: {
        title: 'Lab Tests',
        details: 'Details:',
        noLabTests: 'No lab tests ordered for this visit',
      },
      radiologyTests: {
        title: 'Radiology Tests',
        details: 'Details:',
        noRadiologyTests: 'No radiology tests ordered for this visit',
      },
    },

    // Clinical Notes Tab
    clinicalNotes: {
      title: 'Clinical Notes',
      showMore: 'Show More',
      showLess: 'Show Less',
      noNotes: 'No clinical notes recorded for this visit',
    },

    // Footer
    footer: {
      lastUpdated: 'Last updated:',
      printVisitSummary: 'Print visit summary',
    },
  },
};
