export const financial = {
  expenses: {
    title: 'Expenses',
    description: 'Manage clinic expenses and financial reports',

    summary: {
      cards: {
        totalExpenses: 'Total Expenses',
        thisMonth: 'This Month',
        averageExpenses: 'Average Expenses',
        totalTransactions: 'Total Transactions',
      },
    },

    table: {
      columns: {
        expenseType: 'Expense Type',
        amount: 'Amount',
        date: 'Date',
        description: 'Description',
        actions: 'Actions',
      },
    },

    filters: {
      searchPlaceholder: 'Search expenses...',
      expenseType: 'Expense Type',
      allTypes: 'All Types',
    },

    actions: {
      add: 'Add New Expense',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
      addExpense: 'Add Expense',
      updateExpense: 'Update Expense',
    },

    form: {
      title: {
        add: 'Add New Expense',
        edit: 'Edit Expense',
      },
      labels: {
        expenseType: 'Expense Type',
        amount: 'Amount',
        date: 'Date',
        description: 'Description',
      },
      placeholders: {
        description: 'Enter expense description...',
      },
    },

    expenseTypes: {
      rent: 'Rent',
      utilities: 'Utilities',
      salaries: 'Salaries',
      supplies: 'Supplies',
      equipment: 'Equipment',
      maintenance: 'Maintenance',
      insurance: 'Insurance',
      marketing: 'Marketing',
      other: 'Other',
    },

    validation: {
      expenseTypeRequired: 'Expense type is required',
      expenseTypeInvalid: 'Invalid expense type',
      amountRequired: 'Amount is required',
      amountMinimum: 'Amount must be greater than 0',
      dateRequired: 'Date is required',
    },

    deleteModal: {
      title: 'Delete Expense',
      message: 'Are you sure you want to delete this expense record?',
      secondaryMessage: 'This action cannot be undone.',
      confirmText: 'Delete',
    },

    emptyStates: {
      noExpenses: {
        title: 'No expenses found',
        description: 'No expenses match the selected filters',
      },
    },

    loading: {
      loadingExpenses: 'Loading expenses...',
      savingExpense: 'Saving expense...',
      deletingExpense: 'Deleting expense...',
    },

    messages: {
      success: {
        expenseAdded: 'Expense added successfully',
        expenseUpdated: 'Expense updated successfully',
        expenseDeleted: 'Expense deleted successfully',
      },
      error: {
        addExpenseFailed: 'Failed to add expense',
        updateExpenseFailed: 'Failed to update expense',
        deleteExpenseFailed: 'Failed to delete expense',
        loadingFailed: 'Failed to load data',
      },
    },
  },

  revenues: {
    title: 'Revenues',
    description: 'Manage clinic revenues and financial reports',

    summary: {
      cards: {
        totalRevenue: 'Total Revenue',
        thisMonth: 'This Month',
        averageRevenue: 'Average Revenue',
        totalTransactions: 'Total Transactions',
      },
    },

    table: {
      columns: {
        revenueType: 'Revenue Type',
        amount: 'Amount',
        date: 'Date',
        description: 'Description',
        actions: 'Actions',
      },
    },

    filters: {
      searchPlaceholder: 'Search revenues...',
      revenueType: 'Revenue Type',
      allTypes: 'All Types',
    },

    actions: {
      add: 'Add New Revenue',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
      addRevenue: 'Add Revenue',
      updateRevenue: 'Update Revenue',
    },

    form: {
      title: {
        add: 'Add New Revenue',
        edit: 'Edit Revenue',
      },
      labels: {
        revenueType: 'Revenue Type',
        amount: 'Amount',
        date: 'Date',
        description: 'Description',
      },
      placeholders: {
        description: 'Enter revenue description...',
      },
    },

    revenueTypes: {
      visit: 'Visit',
      donations: 'Donations',
      governmentSupport: 'Government Support',
      other: 'Other',
    },

    validation: {
      revenueTypeRequired: 'Revenue type is required',
      revenueTypeInvalid: 'Invalid revenue type',
      amountRequired: 'Amount is required',
      amountMinimum: 'Amount must be greater than 0',
      dateRequired: 'Date is required',
    },

    deleteModal: {
      title: 'Delete Revenue',
      message: 'Are you sure you want to delete this revenue record?',
      secondaryMessage: 'This action cannot be undone.',
      confirmText: 'Delete',
    },

    emptyStates: {
      noRevenues: {
        title: 'No revenues found',
        description: 'No revenues match the selected filters',
      },
    },

    loading: {
      loadingRevenues: 'Loading revenues...',
      savingRevenue: 'Saving revenue...',
      deletingRevenue: 'Deleting revenue...',
    },

    messages: {
      success: {
        revenueAdded: 'Revenue added successfully',
        revenueUpdated: 'Revenue updated successfully',
        revenueDeleted: 'Revenue deleted successfully',
      },
      error: {
        addRevenueFailed: 'Failed to add revenue',
        updateRevenueFailed: 'Failed to update revenue',
        deleteRevenueFailed: 'Failed to delete revenue',
        loadingFailed: 'Failed to load data',
      },
    },
  },

  salaries: {
    title: 'Salaries',
    description: 'Manage staff salaries and financial reports',

    summary: {
      cards: {
        totalSalaries: 'Total Salaries',
        totalAmount: 'Total Amount',
        totalPaid: 'Total Paid',
        pendingSalaries: 'Pending Salaries',
        pending: 'pending',
      },
    },

    table: {
      columns: {
        staffName: 'Staff Name',
        amount: 'Amount',
        salaryMonth: 'Salary Month',
        status: 'Status',
        paidDate: 'Paid Date',
        notes: 'Notes',
        actions: 'Actions',
      },
    },

    filters: {
      searchPlaceholder: 'Search salaries...',
      status: 'Status',
      allStatuses: 'All Statuses',
    },

    actions: {
      add: 'Add New Salary',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
      addSalary: 'Add Salary',
      updateSalary: 'Update Salary',
    },

    form: {
      title: {
        add: 'Add New Salary',
        edit: 'Edit Salary',
      },
      labels: {
        staffMember: 'Staff Member',
        amount: 'Amount',
        salaryMonth: 'Salary Month',
        status: 'Status',
        paidDate: 'Paid Date',
        notes: 'Notes',
      },
      placeholders: {
        notes: 'Enter notes...',
      },
    },

    statuses: {
      pending: 'Pending',
      paid: 'Paid',
      cancelled: 'Cancelled',
      overdue: 'Overdue',
    },

    validation: {
      staffIdRequired: 'Staff member is required',
      amountRequired: 'Amount is required',
      amountMinimum: 'Amount must be greater than 0',
      salaryMonthRequired: 'Salary month is required',
      statusRequired: 'Status is required',
      statusInvalid: 'Invalid status',
    },

    deleteModal: {
      title: 'Delete Salary',
      message: 'Are you sure you want to delete this salary record?',
      secondaryMessage: 'This action cannot be undone.',
      confirmText: 'Delete',
    },

    emptyStates: {
      noSalaries: {
        title: 'No salaries found',
        description: 'No salaries match the selected filters',
      },
    },

    loading: {
      loadingSalaries: 'Loading salaries...',
      savingSalary: 'Saving salary...',
      deletingSalary: 'Deleting salary...',
    },

    messages: {
      success: {
        salaryAdded: 'Salary added successfully',
        salaryUpdated: 'Salary updated successfully',
        salaryDeleted: 'Salary deleted successfully',
      },
      error: {
        addSalaryFailed: 'Failed to add salary',
        updateSalaryFailed: 'Failed to update salary',
        deleteSalaryFailed: 'Failed to delete salary',
        loadingFailed: 'Failed to load data',
      },
    },
  },

  invoices: {
    title: 'Invoices',
    description: 'Manage patient invoices and payments',

    summary: {
      cards: {
        totalInvoices: 'Total Invoices',
        totalAmount: 'Total Amount',
        totalPaid: 'Total Paid',
        overdueInvoices: 'Overdue Invoices',
        unpaid: 'unpaid',
      },
    },

    table: {
      columns: {
        invoiceNumber: 'Invoice #',
        patientName: 'Patient',
        doctorName: 'Doctor',
        totalAmount: 'Total Amount',
        paidUnpaid: 'Paid/Unpaid',
        status: 'Status',
        dueDate: 'Due Date',
        actions: 'Actions',
        paid: 'Paid',
        unpaid: 'Unpaid',
      },
    },

    filters: {
      searchPlaceholder: 'Search invoices...',
      status: 'Status',
      allStatuses: 'All Statuses',
    },

    actions: {
      view: 'View',
      addPayment: 'Add Payment',
      delete: 'Delete',
      close: 'Close',
      cancel: 'Cancel',
    },

    statuses: {
      draft: 'Draft',
      sent: 'Sent',
      paid: 'Paid',
      overdue: 'Overdue',
      cancelled: 'Cancelled',
      partial: 'Partial',
    },

    paymentMethods: {
      cash: 'Cash',
      card: 'Card',
      bankTransfer: 'Bank Transfer',
      insurance: 'Insurance',
      check: 'Check',
    },

    serviceTypes: {
      consultation: 'Consultation',
      procedure: 'Procedure',
      medication: 'Medication',
      laboratory: 'Laboratory',
      radiology: 'Radiology',
      surgery: 'Surgery',
      therapy: 'Therapy',
      other: 'Other',
    },

    modals: {
      payment: {
        title: 'Add Payment',
        labels: {
          amount: 'Amount',
          paymentDate: 'Payment Date',
          paymentMethod: 'Payment Method',
          referenceNumber: 'Reference Number',
          notes: 'Notes',
        },
        buttons: {
          addPayment: 'Add Payment',
          cancel: 'Cancel',
        },
      },
      view: {
        title: 'Invoice Details - {{invoiceNumber}}',
        sections: {
          invoiceInformation: 'Invoice Information',
          patientDoctor: 'Patient & Doctor',
          invoiceItems: 'Invoice Items',
          paymentSummary: 'Payment Summary',
          paymentHistory: 'Payment History',
          notes: 'Notes',
        },
        labels: {
          invoiceNumber: 'Invoice Number:',
          invoiceDate: 'Invoice Date:',
          dueDate: 'Due Date:',
          status: 'Status:',
          patient: 'Patient:',
          doctor: 'Doctor:',
          totalAmount: 'Total Amount',
          paidAmount: 'Paid Amount',
          unpaidAmount: 'Unpaid Amount',
          payment: 'Payment #{{number}}',
        },
        buttons: {
          close: 'Close',
          addPayment: 'Add Payment',
        },
        messages: {
          noNotes: 'No additional notes for this invoice.',
        },
      },
      delete: {
        title: 'Delete Invoice',
        message: 'Are you sure you want to delete this invoice?',
        secondaryMessage: 'This action cannot be undone.',
        confirmText: 'Delete',
      },
    },

    validation: {
      amountRequired: 'Amount is required',
      amountMinimum: 'Amount must be greater than 0',
      paymentDateRequired: 'Payment date is required',
      paymentMethodRequired: 'Payment method is required',
      paymentMethodInvalid: 'Invalid payment method',
    },

    loading: {
      loadingInvoices: 'Loading invoices...',
      savingPayment: 'Saving payment...',
      deletingInvoice: 'Deleting invoice...',
    },

    messages: {
      success: {
        paymentAdded: 'Payment added successfully',
        invoiceDeleted: 'Invoice deleted successfully',
      },
      error: {
        addPaymentFailed: 'Failed to add payment',
        deleteInvoiceFailed: 'Failed to delete invoice',
        loadingFailed: 'Failed to load data',
      },
    },

    emptyStates: {
      noInvoices: 'No invoices found',
      noInvoicesDescription: 'No invoices match the selected filters',
    },
  },

  transactions: {
    title: 'Transactions',
    description: 'View all financial transactions for the clinic',

    summary: {
      cards: {
        totalInflow: 'Total Inflow',
        totalOutflow: 'Total Outflow',
        netAmount: 'Net Amount',
        totalTransactions: 'Total Transactions',
        thisMonth: 'this month',
      },
    },

    table: {
      columns: {
        type: 'Type',
        amount: 'Amount',
        date: 'Date',
        description: 'Description',
        referenceType: 'Reference Type',
        referenceId: 'Reference ID',
      },
    },

    filters: {
      searchPlaceholder: 'Search transactions...',
      transactionType: 'Transaction Type',
      referenceType: 'Reference Type',
      allTypes: 'All Types',
    },

    transactionTypes: {
      inflow: 'Inflow',
      outflow: 'Outflow',
    },

    referenceTypes: {
      revenue: 'Revenue',
      expense: 'Expense',
      salary: 'Salary',
      invoice: 'Invoice',
    },

    emptyStates: {
      noTransactions: {
        title: 'No transactions found',
        description: 'No transactions match the selected filters',
      },
    },

    loading: {
      loadingTransactions: 'Loading transactions...',
    },

    messages: {
      error: {
        loadingFailed: 'Failed to load data',
      },
    },
  },

  servicePrices: {
    title: 'Service Prices',
    description: 'Manage medical service prices for the clinic',

    serviceTypes: {
      visit: 'Visit',
      prescription: 'Prescription',
      labTest: 'Lab Test',
      radiology: 'Radiology',
      dental: 'Dental',
    },

    summary: {
      cards: {
        count: 'Count',
        avgPrice: 'Avg Price',
      },
    },

    table: {
      columns: {
        serviceType: 'Service Type',
        service: 'Service',
        price: 'Price',
        clinic: 'Clinic',
        doctor: 'Doctor',
        status: 'Status',
        actions: 'Actions',
      },
    },

    filters: {
      searchPlaceholder: 'Search service prices...',
      doctor: 'Doctor',
      allDoctors: 'All Doctors',
    },

    actions: {
      add: 'Add New Service Price',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
      saveChanges: 'Save Changes',
      addServicePrice: 'Add Service Price',
    },

    form: {
      title: {
        add: 'Add New Service Price',
        edit: 'Edit Service Price',
      },
      labels: {
        serviceType: 'Service Type',
        service: 'Service',
        price: 'Price',
        doctor: 'Doctor',
        notes: 'Notes',
        status: 'Status',
      },
      placeholders: {
        selectDoctor: 'Select Doctor',
        generalAllServices: 'General (All Services)',
      },
    },

    status: {
      active: 'Active',
      inactive: 'Inactive',
    },

    validation: {
      serviceTypeRequired: 'Service type is required',
      serviceTypeInvalid: 'Invalid service type',
      priceRequired: 'Price is required',
      priceMinimum: 'Price must be at least 1',
      priceInvalid: 'Price must be a number',
      clinicRequired: 'Clinic is required',
      notesMaxLength: 'Notes must not exceed 500 characters',
      statusRequired: 'Status is required',
      statusInvalid: 'Status must be either active or inactive',
    },

    deleteModal: {
      title: 'Delete Service Price',
      message: 'Are you sure you want to delete this service price?',
      secondaryMessage: 'This action cannot be undone.',
      confirmText: 'Delete',
    },

    emptyStates: {
      noServicePrices: {
        title: 'No service prices found',
        description: 'No service prices match the selected filters',
      },
    },

    loading: {
      loadingServicePrices: 'Loading service prices...',
      loadingDetails: 'Loading details...',
      savingServicePrice: 'Saving service price...',
      deletingServicePrice: 'Deleting service price...',
    },

    messages: {
      success: {
        servicePriceAdded: 'Service price added successfully',
        servicePriceUpdated: 'Service price updated successfully',
        servicePriceDeleted: 'Service price deleted successfully',
      },
      error: {
        addServicePriceFailed: 'Failed to add service price',
        updateServicePriceFailed: 'Failed to update service price',
        deleteServicePriceFailed: 'Failed to delete service price',
        loadingFailed: 'Failed to load data',
      },
    },
  },

  dashboard: {
    title: 'Financial Dashboard',
    subtitle: 'Comprehensive overview of clinic financial performance',
    status: {
      liveConnection: 'Live Connection',
      lastUpdate: 'Last Update',
    },
    actions: {
      refreshData: 'Refresh Data',
    },
    periods: {
      week: 'Week',
      month: 'Month',
      year: 'Year',
    },
    kpiCards: {
      totalRevenue: {
        title: 'Total Revenue',
        description: 'Compared to previous period',
        trend: '+12.5%',
      },
      totalExpenses: {
        title: 'Total Expenses',
        description: 'Decrease in expenses',
        trend: '-3.2%',
      },
      netProfit: {
        title: 'Net Profit',
        description: 'Continuous growth in profits',
        trend: '+8.1%',
      },
      totalInvoices: {
        title: 'Total Invoices',
        description: 'Invoice management',
        paidLabel: 'Paid',
      },
    },
    charts: {
      revenueVsExpenses: {
        title: 'Revenue vs Expenses',
        revenueLabel: 'Revenue',
        expensesLabel: 'Expenses',
      },
      invoiceStatus: {
        title: 'Invoice Status',
        paid: 'Paid',
        pending: 'Pending',
        overdue: 'Overdue',
      },
    },
    recentTransactions: {
      title: 'Recent Transactions',
      subtitle: 'Latest financial operations',
      viewAll: 'View All',
      sampleTransactions: {
        visitInvoice: 'Visit Invoice',
        medicalSupplies: 'Medical Supplies Purchase',
        clinicRent: 'Clinic Rent Payment',
      },
      status: {
        completed: 'Completed',
        pending: 'Pending',
      },
    },
    keyMetrics: {
      profitMargin: {
        title: 'Profit Margin',
      },
      averageVisit: {
        title: 'Average Visit',
        trend: '+15.3%',
      },
      collectionRate: {
        title: 'Collection Rate',
      },
    },
    emptyStates: {
      noData: 'No data available',
    },
  },
};
