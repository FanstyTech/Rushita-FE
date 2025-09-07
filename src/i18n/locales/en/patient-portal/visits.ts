export const visits = {
  list: {
    title: 'Medical Visits History',
    subtitle:
      'View your past medical visits and review diagnoses and prescriptions',
    filters: {
      title: 'Filter Results',
      subtitle:
        'You can filter visits by specialty, visit type, or search by name',
      resetFilters: 'Reset Filters',
      search: 'Search',
      searchPlaceholder: 'Search for doctor, diagnosis, or complaint...',
      specialty: 'Specialty',
      allSpecialties: 'All Specialties',
      visitType: 'Visit Type',
      allTypes: 'All Types',
    },
    card: {
      mainComplaint: 'Main Complaint',
      diagnosis: 'Diagnosis',
      notSpecified: 'Not specified',
      underReview: 'Under review',
      prescriptions: 'prescription',
      radiologyTests: 'radiology',
      labTests: 'lab tests',
      followUp: 'follow-up',
      viewDetails: 'View Visit Details',
    },
    emptyState: {
      title: 'No Visits Found',
      message:
        'No visits found matching the search criteria. Please modify your search criteria or book a new appointment.',
    },
    error: {
      title: 'Failed to load visits',
      retry: 'Retry',
    },
  },
  details: {
    title: 'Medical Visit Details',
    subtitle: 'View visit details, diagnosis, and prescriptions',
    backButton: 'Back',
    tabs: {
      details: 'Details',
      medications: 'Medications',
      labTests: 'Lab Tests',
      rayTests: 'Radiology Tests',
    },
    visitInfo: {
      title: 'Visit Information',
      visitInfoSection: 'Visit Information',
      doctorInfoSection: 'Doctor and Clinic Information',
      date: 'Date',
      time: 'Time',
      visitNumber: 'Visit Number',
      doctor: 'Doctor',
      clinic: 'Clinic',
      appointmentNumber: 'Appointment Number',
    },
    symptomsAndNotes: {
      title: 'Symptoms and Notes',
      symptoms: 'Symptoms',
      doctorNotes: 'Doctor Notes',
      followUpInstructions: 'Follow-up Instructions',
    },
    diagnoses: {
      title: 'Diagnoses',
    },
    followUp: {
      title: 'Follow-up Appointment',
    },
    medications: {
      title: 'Prescribed Medications',
      notes: 'Notes',
      emptyState: {
        title: 'No Medications Prescribed',
        message: 'No medications were prescribed during this visit',
      },
      printPrescription: 'Print Prescription',
    },
    labTests: {
      title: 'Laboratory Tests',
      labTest: 'laboratory',
      testDate: 'Test Date',
      results: 'Results',
      notes: 'Notes',
      emptyState: {
        title: 'No Laboratory Tests',
        message: 'No laboratory tests were requested during this visit',
      },
    },
    radiologyTests: {
      title: 'Radiology Tests',
      radiologyTest: 'radiology',
      testDate: 'Test Date',
      results: 'Results',
      notes: 'Notes',
      emptyState: {
        title: 'No Radiology Tests',
        message: 'No radiology tests were requested during this visit',
      },
    },
    error: {
      title: 'Error Loading Data',
      message:
        'An error occurred while loading visit details. Please try again.',
      retry: 'Retry',
      backToVisits: 'Back to Visits',
    },
    notFound: {
      title: 'Visit Not Found',
      message:
        'The requested visit was not found. It may have been deleted or the link is incorrect.',
      backToVisits: 'Back to Visits',
    },
  },
};
