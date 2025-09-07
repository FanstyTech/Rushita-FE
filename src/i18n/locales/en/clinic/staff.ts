export const staff = {
  title: 'Staff Management',
  description: 'Manage clinic staff and permissions',

  filters: {
    specialty: 'Specialty',
    allSpecialties: 'All Specialties',
    searchPlaceholder: 'Search in clinic staff',
  },

  emptyState: {
    title: 'No Staff Members',
    description: 'Start by adding your first staff member to the clinic',
    buttonText: 'Add Staff Member',
  },

  actions: {
    addStaff: 'Add Staff Member',
    editStaff: 'Edit Staff Member',
    changePassword: 'Change Password',
    resendActivationEmail: 'Resend Activation Email',
    managePermissions: 'Manage Permissions',
    endSession: 'End Session',
    deleteStaff: 'Delete Staff Member',
    sending: 'Sending...',
  },

  deleteModal: {
    title: 'Delete Staff Member',
    message:
      'Are you sure you want to delete this staff member? This action cannot be undone.',
    cancel: 'Cancel',
    confirm: 'Delete Staff Member',
  },

  endSessionModal: {
    title: 'End User Session',
    message:
      "Are you sure you want to end this user's session? They will be logged out immediately.",
  },

  changePasswordModal: {
    title: 'Change Password',
    newPasswordLabel: 'New Password',
    changePasswordButton: 'Change Password',
    passwordRequired: 'Password is required',
    passwordMinLength: 'Password must be at least 6 characters',
  },

  staffForm: {
    addTitle: 'Add New Staff Member',
    editTitle: 'Edit Staff Member',
    firstNameForeign: 'First Name (Foreign)',
    lastNameForeign: 'Last Name (Foreign)',
    firstNameArabic: 'First Name (Arabic)',
    lastNameArabic: 'Last Name (Arabic)',
    email: 'Email',
    joinDate: 'Join Date',
    staffType: 'Staff Type',
    specialty: 'Specialty',
    allSpecialties: 'All Specialties',
    cancel: 'Cancel',
    addButton: 'Add Staff Member',
    updateButton: 'Update Staff Member',
    firstNameForeignRequired: 'First name in Latin is required',
    lastNameForeignRequired: 'Last name in Latin is required',
    firstNameArabicRequired: 'First name in Arabic is required',
    lastNameArabicRequired: 'Last name in Arabic is required',
    invalidEmail: 'Invalid email address',
    staffTypeRequired: 'Staff type is required',
    specialtyRequired: 'Specialty is required',
  },

  managePermissionsModal: {
    title: 'Manage Permissions - {{staffName}}',
    loadingTitle: 'Loading permissions...',
    errorTitle: 'Error',
    errorMessage: 'Failed to load permissions',
    close: 'Close',
    quickActions: 'Quick Actions',
    bulkSelection: 'Bulk Selection',
    selectAllPermissions: 'Select All Permissions',
    clearAllSelections: 'Clear All Selections',
    smartSelection: 'Smart Selection',
    selectCurrentlyGranted: 'Select Currently Granted',
    selectNonGrantedOnly: 'Select Non-Granted Only',
    moduleManagement: 'Module Management',
    expandAllModules: 'Expand All Modules',
    collapseAllModules: 'Collapse All Modules',
    totalPermissions: 'Total Permissions',
    currentlyGranted: 'Currently Granted',
    selected: 'Selected',
    modules: 'Modules',
    notesLabel: 'Notes (Optional)',
    notesPlaceholder: 'Add notes about the granted permissions...',
    total: 'Total',
    granted: 'Granted',
    selectAll: 'Select All',
    clearAll: 'Clear All',
    currentlyGrantedBadge: 'Currently Granted',
    expires: 'Expires',
    notes: 'Notes',
    totalSelectedPermissions: 'Total Selected Permissions',
    outOf: 'out of',
    availablePermissions: 'available permissions',
    modulesDisplayed: 'modules displayed',
    cancel: 'Cancel',
    savePermissions: 'Save Permissions',
  },

  leaves: {
    title: 'Leave Management',
    description: 'Manage staff leave requests',

    filters: {
      type: 'Type',
      allTypes: 'All Types',
      status: 'Status',
      allStatus: 'All Status',
      searchPlaceholder: 'Search in leave requests',
    },

    emptyState: {
      title: 'No Leave Requests Found',
      description: 'Get started by adding your first leave request',
      buttonText: 'Add Leave Request',
    },

    actions: {
      addLeave: 'Add Leave Request',
      editLeave: 'Edit Leave',
      deleteLeave: 'Delete Leave',
      approve: 'Approve',
      reject: 'Reject',
      cancel: 'Cancel',
      submit: 'Submit',
      update: 'Update',
    },

    form: {
      title: 'New Leave Request',
      editTitle: 'Edit Leave Request',
      staffMember: 'Staff Member',
      startDate: 'Start Date',
      endDate: 'End Date',
      leaveType: 'Leave Type',
      reason: 'Reason',
      cancel: 'Cancel',
      submit: 'Submit',
      update: 'Update',
    },

    deleteModal: {
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item?',
      secondaryMessage: 'This action cannot be undone.',
      confirm: 'Delete',
    },

    status: {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      cancelled: 'Cancelled',
    },

    types: {
      annual: 'Annual Leave',
      sick: 'Sick Leave',
      maternity: 'Maternity Leave',
      paternity: 'Paternity Leave',
      emergency: 'Emergency Leave',
      unpaid: 'Unpaid Leave',
      study: 'Study Leave',
      compassionate: 'Compassionate Leave',
    },
  },

  errors: {
    accessDenied: 'Access denied: No clinic associated with this user.',
    loadingStaff: 'Error loading staff data',
    deletingStaff: 'Error deleting staff member',
    updatingPassword: 'Error updating password',
    resendingEmail: 'Error resending activation email',
  },

  loading: {
    staff: 'Loading staff members...',
    deleting: 'Deleting...',
    updating: 'Updating...',
  },

  status: {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    suspended: 'Suspended',
  },

  validation: {
    staffRequired: 'Staff member is required',
    startDateRequired: 'Start date is required',
    endDateRequired: 'End date is required',
    leaveTypeRequired: 'Leave type is required',
    reasonRequired: 'Reason is required',
    endDateAfterStart: 'End date must be after start date',
  },
};
