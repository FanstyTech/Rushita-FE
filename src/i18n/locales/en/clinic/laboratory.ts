export const clinicLaboratory = {
  // Page title and description
  pageTitle: 'Laboratory Tests',
  pageDescription: 'Manage laboratory tests and test results',

  // Dashboard summary cards
  dashboard: {
    totalTests: 'Total Tests',
    completedTests: 'Completed Tests',
    inProgressTests: 'In Progress',
    pendingTests: 'Pending',
    completed: 'Completed',
    inProgress: 'In Progress',
    pending: 'Pending',
  },

  // Filter and search
  filters: {
    searchPlaceholder: 'Search by patient name or test...',
    allDoctors: 'All Doctors',
    doctor: 'Doctor',
    status: 'Status',
    dateRange: 'Date Range',
  },

  // Test statuses
  testStatus: {
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  },

  // Visit information
  visit: {
    patientName: 'Patient Name',
    visitDate: 'Visit Date',
    visitTime: 'Visit Time',
    testsCount: 'Test',
    testsCountPlural: 'Tests',
  },

  // Test actions
  actions: {
    view: 'View',
    viewDetails: 'View Details',
    updateStatus: 'Update Status',
    uploadResults: 'Upload Results',
    downloadResults: 'Download Results',
  },

  // Test information
  test: {
    testName: 'Test Name',
    testDetails: 'Test Details',
    testResult: 'Test Result',
    requestedBy: 'Requested By',
    requestedDate: 'Requested Date',
    completedDate: 'Completed Date',
    notes: 'Notes',
  },

  // Empty states
  emptyStates: {
    noVisits: 'No Visits Found',
    noVisitsDescription: 'No visits match the selected filters',
    noTests: 'No Tests Found',
    noTestsDescription: 'No laboratory tests available',
    noResults: 'No Results',
    noResultsDescription: 'No results have been uploaded for this test yet',
  },

  // Loading states
  loading: {
    loadingTests: 'Loading tests...',
    loadingSummary: 'Loading summary...',
    updatingStatus: 'Updating status...',
    uploadingResults: 'Uploading results...',
  },

  // Success messages
  success: {
    statusUpdated: 'Test status updated successfully',
    resultsUploaded: 'Results uploaded successfully',
    testCompleted: 'Test completed successfully',
  },

  // Error messages
  errors: {
    loadingFailed: 'Failed to load data',
    updateFailed: 'Failed to update status',
    uploadFailed: 'Failed to upload results',
    networkError: 'Network error, please try again',
  },

  // Form labels
  form: {
    testResult: 'Test Result',
    attachments: 'Attachments',
    notes: 'Additional Notes',
    newStatus: 'New Status',
    reason: 'Reason for Change',
  },

  // Button labels
  buttons: {
    save: 'Save',
    cancel: 'Cancel',
    upload: 'Upload',
    update: 'Update',
    close: 'Close',
    refresh: 'Refresh',
    export: 'Export',
    print: 'Print',
  },

  // Modal Components
  modals: {
    confirmAction: 'Confirm Action',

    // Test Details Modal
    testDetails: {
      title: 'Test Details',
      testInformation: 'Test Information',
      testName: 'Test Name',
      patientName: 'Patient Name',
      testDate: 'Test Date',
      testTime: 'Test Time',
      testStatus: 'Test Status',
      testDetailsSection: 'Test Details',
      testAttachments: 'Test Attachments',
      buttons: {
        close: 'Close',
        print: 'Print',
      },
    },

    // Test Result Upload Modal
    uploadResults: {
      title: 'Upload Test Results',
      testInformation: 'Test Information',
      patient: 'Patient',
      testType: 'Test Type',
      testResults: 'Test Results',
      testResultsPlaceholder: 'Enter test results here...',
      uploadAttachments: 'Upload Attachments',
      attachmentHelperText: 'Upload test result files, images, or documents',
      buttons: {
        cancel: 'Cancel',
        uploading: 'Uploading...',
        saveResults: 'Save Results',
      },
      errors: {
        uploadFailed: 'Failed to upload test results',
      },
    },

    // Test Status Update Modal
    updateStatus: {
      title: 'Update Test Status',
      testInformation: 'Test Information',
      patientName: 'Patient Name',
      currentStatus: 'Current Status',
      chooseNewStatus: 'Choose New Status',
      statusOptions: {
        pending: 'Pending',
        inProgress: 'In Progress',
        completed: 'Completed',
        cancelled: 'Cancelled',
      },
      buttons: {
        cancel: 'Cancel',
        updating: 'Updating...',
        updateStatus: 'Update Status',
      },
    },
  },
};
