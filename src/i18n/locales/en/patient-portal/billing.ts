export const billing = {
  list: {
    title: 'Billing & Payments',
    description: 'View and manage your medical bills and payments',
    filters: {
      search: 'Search',
      searchPlaceholder: 'Search by invoice number...',
      description:
        'You can filter invoices by status, date or search by invoice number',
      status: 'Invoice Status',
      statusAll: 'All Statuses',
      filter: 'Filter Results',
      reset: 'Reset Filters',
    },
    stats: {
      totalInvoices: 'Total Invoices',
      totalAmount: 'Total Amount',
      totalPaid: 'Paid',
      totalUnpaid: 'Remaining',
    },
    card: {
      invoiceNumber: 'Invoice #',
      invoiceDate: 'Invoice Date:',
      dueDate: 'Due Date:',
      totalAmount: 'Total Amount:',
      paidAmount: 'Paid:',
      remainingAmount: 'Remaining:',
      lastPayment: 'Last Payment:',
      servicesCount: 'Services Count:',
      noPayment: 'None',
      viewDetails: 'View Details',
      downloadPDF: 'Download PDF',
    },
    empty: {
      title: 'No Invoices Found',
      description: 'No invoices were found matching your search criteria',
    },
    error: {
      title: 'Failed to Load Invoices',
      description:
        'An error occurred while loading invoices. Please try again.',
      retry: 'Retry',
    },
    loading: 'Loading invoices...',
  },
  details: {
    title: 'Invoice Details',
    subtitle: 'Invoice details and payments',
    backToList: 'Back to Invoices',
    sections: {
      invoiceSummary: 'Invoice Summary',
      serviceDetails: 'Service Details',
      paymentHistory: 'Payment History',
      financialSummary: 'Financial Summary',
      patientDoctorInfo: 'Patient & Doctor Information',
    },
    invoiceInfo: {
      invoiceDate: 'Invoice Date',
      dueDate: 'Due Date',
      status: 'Status',
      invoiceNumber: 'Invoice Number',
    },
    serviceDetails: {
      quantity: 'Quantity:',
    },
    paymentHistory: {
      referenceNumber: 'Reference #:',
    },
    financialSummary: {
      totalAmount: 'Total Amount:',
      paidAmount: 'Paid:',
      remainingAmount: 'Remaining:',
    },
    patientInfo: {
      patient: 'Patient',
      doctor: 'Doctor',
      clinic: 'Clinic',
    },
    error: {
      title: 'Failed to Load Invoice Details',
      description: 'An error occurred while loading invoice details.',
      backToList: 'Back to Invoices',
    },
    loading: 'Loading invoice details...',
  },
};
