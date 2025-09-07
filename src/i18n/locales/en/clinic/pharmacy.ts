export const pharmacy = {
  // Page title and description
  pageTitle: 'Pharmacy',
  pageDescription: 'Manage visits and prescriptions',

  // Table columns
  table: {
    visitNumber: 'Visit #',
    patientName: 'Patient Name',
    doctor: 'Doctor',
    date: 'Date',
    type: 'Type',
    status: 'Status',
    actions: 'Actions',
  },

  // Filter options
  filters: {
    status: 'Status',
    allStatus: 'All Status',
    searchPlaceholder: 'Search visits...',
  },

  // Action buttons and tooltips
  actions: {
    viewDetails: 'View details',
    editVisit: 'Edit visit',
    viewPrescription: 'View prescription',
    dispenseMedicine: 'Dispense medicine',
  },

  // Empty states and messages
  emptyStates: {
    noVisits: 'No visits found',
    noVisitsDescription: 'No pharmacy visits found',
  },

  // Loading states
  loading: {
    loadingVisits: 'Loading visits...',
    processingRequest: 'Processing request...',
  },

  // Status messages
  messages: {
    success: 'Success',
    error: 'An error occurred',
    medicineDispensed: 'Medicine dispensed successfully',
    prescriptionUpdated: 'Prescription updated successfully',
  },

  // Prescriptions sub-page
  prescriptions: {
    pageTitle: 'Prescriptions',
    pageDescription: 'Manage medical prescriptions and medications',

    // Table columns
    table: {
      visitNumber: 'Visit #',
      patientName: 'Patient Name',
      doctor: 'Doctor',
      date: 'Date',
      type: 'Type',
      status: 'Status',
      actions: 'Actions',
    },

    // Filter options
    filters: {
      status: 'Status',
      allStatus: 'All Status',
      searchPlaceholder: 'Search prescriptions...',
    },

    // Action buttons and tooltips
    actions: {
      viewPrescriptionDetails: 'View Prescriptions details',
      dispenseMedicine: 'Dispense medicine',
      printPrescription: 'Print prescription',
    },

    // Empty states and messages
    emptyStates: {
      noPrescriptions: 'No prescriptions found',
      noPrescriptionsDescription: 'No medical prescriptions found',
    },

    // Loading states
    loading: {
      loadingPrescriptions: 'Loading prescriptions...',
      processingRequest: 'Processing request...',
    },

    // Status messages
    messages: {
      success: 'Success',
      error: 'An error occurred',
      medicineDispensed: 'Medicine dispensed successfully',
      prescriptionPrinted: 'Prescription printed successfully',
    },

    // Prescription Details Page
    details: {
      // Visit information labels
      visitInfo: {
        visit: 'Visit',
        patient: 'Patient',
        date: 'Date',
        medication: 'Medication',
        medications: 'Medications',
      },

      // Medication card labels
      medicationCard: {
        dosage: 'Dosage',
        frequency: 'Frequency',
        quantity: 'Quantity',
        duration: 'Duration',
        dispenseMedication: 'Dispense Medication',
      },

      // Expanded details sections
      expandedDetails: {
        prescriptionDetails: 'Prescription Details',
        medicationInformation: 'Medication Information',
        prescribedBy: 'Prescribed By',
        prescribedDate: 'Prescribed Date',
        expiryDate: 'Expiry Date',
        notes: 'Notes',
        name: 'Name',
        scientificName: 'Scientific Name',
        arabicName: 'Arabic Name',
        strength: 'Strength',
        dosageForm: 'Dosage Form',
      },

      // Action buttons
      actions: {
        dispenseMedication: 'Dispense Medication',
        expandDetails: 'Expand Details',
        collapseDetails: 'Collapse Details',
      },

      // Empty states
      emptyStates: {
        noPrescriptions: 'No prescriptions found',
        noPrescriptionsDescription: 'No prescriptions found for this visit',
      },

      // Loading states
      loading: {
        loadingPrescriptions: 'Loading prescriptions...',
        processingDispense: 'Processing dispense...',
      },

      // Messages
      messages: {
        medicineDispensed: 'Medicine dispensed successfully',
        dispenseFailed: 'Failed to dispense medicine',
        prescriptionExpired: 'Prescription has expired',
        insufficientQuantity: 'Insufficient quantity available',
      },
    },
  },
  modal: {
    dispenseMedication: {
      title: 'Dispense Medication',
      sections: {
        medicationInfo: {
          title: 'Medication Information',
          labels: {
            name: 'Name:',
            scientificName: 'Scientific Name:',
            arabicName: 'Arabic Name:',
            strength: 'Strength:',
          },
        },
        prescriptionDetails: {
          title: 'Prescription Details',
          labels: {
            dosage: 'Dosage:',
            frequency: 'Frequency:',
            duration: 'Duration:',
            prescribedDate: 'Prescribed Date:',
            expiryDate: 'Expiry Date:',
          },
        },
        quantityInfo: {
          title: 'Quantity Information',
          remaining: 'remaining',
          of: 'of',
        },
        patientInfo: {
          labels: {
            patientNumber: 'Patient Number:',
            visitNumber: 'Visit Number:',
          },
        },
      },
      form: {
        quantityToDispense: 'Quantity to Dispense',
        notes: 'Notes',
        notesPlaceholder: 'Enter any additional notes here...',
        required: '*',
      },
      buttons: {
        cancel: 'Cancel',
        dispense: 'Dispense Medication',
      },
      errors: {
        positiveNumber: 'Please enter a positive number',
        availableQuantity: 'Available quantity for dispensing is only',
      },
    },
  },
};
