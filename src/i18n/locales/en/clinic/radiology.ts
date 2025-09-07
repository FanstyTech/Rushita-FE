export const radiology = {
  title: 'Radiology',
  description: 'Manage radiology tests and results',

  summary: {
    cards: {
      totalTests: 'Total Tests',
      completed: 'Completed',
      inProgress: 'In Progress',
      pending: 'Pending',
    },
  },

  filters: {
    searchPlaceholder: 'Search by patient name or test...',
    doctor: 'Doctor',
    allDoctors: 'All Doctors',
    status: 'Status',
    allStatus: 'All Status',
  },

  table: {
    columns: {
      patient: 'Patient',
      visitDate: 'Visit Date',
      visitTime: 'Visit Time',
      testName: 'Test Name',
      status: 'Status',
      details: 'Details',
      actions: 'Actions',
    },
  },

  visitCard: {
    testsCount: 'Tests',
    testCount_one: '1 Test',
    testCount_other: '{{count}} Tests',
  },

  actions: {
    view: 'View',
    updateStatus: 'Update Status',
    uploadResults: 'Upload Results',
    viewDetails: 'View Details',
    tooltips: {
      viewTestDetails: 'View test details',
      updateTestStatus: 'Update test status',
      uploadTestResults: 'Upload test results',
    },
  },

  emptyStates: {
    noVisits: {
      title: 'No Visits Found',
      description: 'No visits match the selected filters',
    },
    noTests: {
      title: 'No Tests Found',
      description: 'No radiology tests found for this visit',
    },
  },

  loading: {
    loadingTests: 'Loading tests...',
    loadingSummary: 'Loading summary...',
    updatingStatus: 'Updating status...',
    uploadingResults: 'Uploading results...',
  },

  messages: {
    success: {
      statusUpdated: 'Test status updated successfully',
      resultsUploaded: 'Results uploaded successfully',
    },
    error: {
      updateStatusFailed: 'Failed to update test status',
      uploadResultsFailed: 'Failed to upload results',
      loadingFailed: 'Failed to load data',
    },
  },

  status: {
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    expired: 'Expired',
  },
  modals: {
    testDetails: {
      title: 'Test Details',
      sections: {
        testInformation: 'Test Information',
        testDetails: 'Test Details',
        testResults: 'Test Results',
        testAttachments: 'Test Attachments',
      },
      labels: {
        testName: 'Test Name:',
        patientName: 'Patient Name:',
        testDate: 'Test Date:',
        testTime: 'Test Time:',
        testStatus: 'Test Status:',
      },
      buttons: {
        close: 'Close',
        print: 'Print',
      },
    },
    uploadResults: {
      title: 'Upload Test Results',
      form: {
        results: 'Results',
        resultsPlaceholder: 'Enter test results here...',
        attachments: 'Attachments',
        attachmentsPlaceholder: 'Choose files to upload',
      },
      buttons: {
        cancel: 'Cancel',
        upload: 'Upload Results',
      },
    },
    updateStatus: {
      title: 'Update Test Status',
      form: {
        currentStatus: 'Current Status:',
        newStatus: 'New Status:',
        selectStatus: 'Select new status',
      },
      buttons: {
        cancel: 'Cancel',
        update: 'Update Status',
      },
    },
  },
};
