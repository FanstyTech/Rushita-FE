export const clinicPatients = {
  // Page title and description
  pageTitle: 'Patients List',
  pageDescription: 'Manage patient information and medical records',

  // Table columns
  table: {
    name: 'Name',
    contact: 'Contact Info',
    gender: 'Gender',
    dateOfBirth: 'Date of Birth',
    totalVisits: 'Total Visits',
    lastVisitDate: 'Last Visit Date',
    actions: 'Actions',
  },

  // Filter options
  filters: {
    gender: 'Gender',
    all: 'All',
    male: 'Male',
    female: 'Female',
  },

  // Action buttons and tooltips
  actions: {
    addNew: 'Add New Patient',
    view: 'View Details',
    edit: 'Edit',
    delete: 'Delete',
  },

  // Delete confirmation modal
  deleteModal: {
    title: 'Delete Patient',
    message: 'Are you sure you want to delete this patient?',
    secondaryMessage: 'This action cannot be undone.',
    confirm: 'Delete',
    cancel: 'Cancel',
  },

  // Status messages
  messages: {
    noPatients: 'No patients found',
    loading: 'Loading...',
    error: 'Error loading data',
    deleteSuccess: 'Patient deleted successfully',
    deleteError: 'Error deleting patient',
  },

  // Date formatting
  dateFormat: {
    noDate: '-',
  },

  // Add/Edit Patient Form
  form: {
    // Page titles
    addTitle: 'Add New Patient',
    editTitle: 'Edit Patient Information',

    // Section headers
    sections: {
      personalInfo: 'Personal Information',
      contactInfo: 'Contact Information',
      medicalInfo: 'Medical Information',
    },

    // Form fields
    fields: {
      // Personal Information
      firstNameForeign: 'First Name (English)',
      firstNameArabic: 'First Name (Arabic)',
      secondNameForeign: 'Second Name (English)',
      secondNameArabic: 'Second Name (Arabic)',
      thirdNameForeign: 'Third Name (English)',
      thirdNameArabic: 'Third Name (Arabic)',
      lastNameForeign: 'Last Name (English)',
      lastNameArabic: 'Last Name (Arabic)',
      idType: 'ID Type',
      idNumber: 'ID Number',
      gender: 'Gender',
      preferredLanguage: 'Preferred Language',
      dateOfBirth: 'Date of Birth',

      // Contact Information
      phoneNumber: 'Phone Number',
      email: 'Email Address',
      country: 'Country',
      city: 'City',
      address: 'Address',

      // Medical Information
      bloodType: 'Blood Type',
      height: 'Height (cm)',
      weight: 'Weight (kg)',
    },

    // Validation messages
    validation: {
      firstNameRequired: 'First name is required',
      phoneRequired: 'Phone number is required',
      dateOfBirthRequired: 'Date of birth is required',
      emailInvalid: 'Invalid email address',
    },

    // Button labels
    buttons: {
      save: 'Save Patient',
      update: 'Update Patient',
      saving: 'Saving...',
      cancel: 'Cancel',
    },

    // Success messages
    success: {
      patientAdded: 'Patient added successfully',
      patientUpdated: 'Patient updated successfully',
    },
  },

  // Patient Profile Page
  profile: {
    // Page sections
    tabs: {
      overview: 'Overview',
      medicalHistory: 'Medical History',
      appointments: 'Appointments',
      documents: 'Documents',
    },

    // Contact information labels
    contact: {
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
    },

    // Action buttons
    buttons: {
      newAppointment: 'New Appointment',
      addCondition: 'Add Condition',
      addAllergy: 'Add Allergy',
      addFamilyHistory: 'Add Family History',
      uploadDocument: 'Upload Document',
    },

    // Overview section
    overview: {
      quickStats: 'Quick Stats',
      totalVisits: 'Total Visits',
      lastVisit: 'Last Visit',
      recentActivity: 'Recent Activity',
      noRecentActivity: 'No Recent Activity',
      noActivityDescription:
        'No activities have been recorded for this patient yet',
    },

    // Medical History section
    medicalHistory: {
      conditions: 'Medical Conditions',
      allergies: 'Allergies',
      medications: 'Current Medications',
      familyHistory: 'Family History',

      // Empty states
      noConditions: 'No Medical Conditions',
      noConditionsDescription: 'No medical conditions have been recorded',
      noAllergies: 'No Allergies',
      noAllergiesDescription: 'No allergies have been recorded',
      noMedications: 'No Medications',
      noMedicationsDescription: 'No medications have been prescribed',
      noFamilyHistory: 'No Family History',
      noFamilyHistoryDescription: 'No family medical history has been recorded',

      // Medications table
      medicationHeaders: {
        medication: 'Medication',
        dosage: 'Dosage',
        frequency: 'Frequency',
        started: 'Started',
      },
    },

    // Appointments section
    appointments: {
      upcoming: 'Upcoming Appointments',
      noAppointments: 'No Appointments',
      noAppointmentsDescription: 'No upcoming appointments scheduled',

      // Table headers
      headers: {
        dateTime: 'Date & Time',
        type: 'Type',
        doctor: 'Doctor',
        status: 'Status',
        notes: 'Notes',
      },
    },

    // Documents section
    documents: {
      title: 'Medical Documents',
      noDocuments: 'No Documents',
      noDocumentsDescription: 'No medical documents have been uploaded',
      uploaded: 'Uploaded',
      by: 'By',
    },

    // Error states
    errors: {
      loadingProfile: 'Error Loading Profile',
      loadingProfileDescription:
        'Failed to load patient profile. Please try again.',
      patientNotFound: 'Patient Not Found',
      patientNotFoundDescription:
        'The requested patient profile could not be found.',
    },
  },

  // Modal Components
  modals: {
    // Add Condition Modal
    addCondition: {
      title: 'Add Medical Condition',
      fields: {
        conditionName: 'Condition Name',
        diagnoseDate: 'Diagnose Date',
        status: 'Condition Status',
      },
      buttons: {
        cancel: 'Cancel',
        add: 'Add Condition',
      },
      validation: {
        nameRequired: 'Condition name is required',
        diagnoseDateRequired: 'Diagnose date is required',
        statusRequired: 'Condition status is required',
      },
    },

    // Add Allergy Modal
    addAllergy: {
      title: 'Add Allergy',
      fields: {
        allergyName: 'Allergy Name',
        severity: 'Severity',
        reaction: 'Reaction',
      },
      buttons: {
        cancel: 'Cancel',
        add: 'Add Allergy',
      },
      validation: {
        nameRequired: 'Allergy name is required',
        reactionRequired: 'Reaction is required',
        severityRequired: 'Severity is required',
      },
    },

    // Add Family History Modal
    addFamilyHistory: {
      title: 'Add Family History',
      fields: {
        condition: 'Condition',
        ageOfOnset: 'Age of Onset',
        relationship: 'Relationship',
        status: 'Status',
        notes: 'Notes',
      },
      buttons: {
        cancel: 'Cancel',
        add: 'Add Family History',
      },
      validation: {
        conditionRequired: 'Condition is required',
        ageOfOnsetRequired: 'Age of onset is required',
        relationshipRequired: 'Relationship is required',
        statusRequired: 'Status is required',
      },
    },
  },
};
