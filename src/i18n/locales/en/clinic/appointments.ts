export const clinicAppointments = {
  // Page title
  pageTitle: 'Appointments',
  description: 'Manage your clinic appointments efficiently',

  // View modes
  viewModes: {
    schedule: 'Schedule',
    kanban: 'Kanban',
  },

  // Header actions
  actions: {
    addNew: 'New Appointment',
    scheduleNew: 'Schedule New Appointment',
    edit: 'Edit Appointment',
    delete: 'Delete Appointment',
    startVisit: 'Start Visit',
    showDetails: 'Show Details',
  },

  // Appointment statuses
  statuses: {
    pending: 'Pending',
    scheduled: 'Scheduled',
    confirmed: 'Confirmed',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    noShow: 'No Show',
  },

  // Visit types
  visitTypes: {
    new: 'New Visit',
    followUp: 'Follow Up',
    emergency: 'Emergency',
    consultation: 'Consultation',
  },

  // Form labels
  form: {
    patient: 'Patient',
    staff: 'Doctor',
    date: 'Date',
    startTime: 'Start Time',
    endTime: 'End Time',
    type: 'Visit Type',
    status: 'Status',
    notes: 'Notes',
    selectPatient: 'Select Patient',
    selectStaff: 'Select Doctor',
    createNewAppointment: 'Create New Appointment',
    fillDetailsToSchedule: 'Fill in the details to schedule a new appointment',
    staffInformation: 'Staff Information',
    selectStaffMember: 'Select Staff Member',
    searchSelectStaff: 'Search and select a staff member...',
    noStaffFound: 'No staff found',
    typeToSearchStaff: 'Type to search for staff',
    selectedStaffMember: 'Selected Staff Member',
    searchSelectPatient: 'Search and select a patient...',
    noPatientsFound: 'No patients found',
    typeToSearchPatients: 'Type to search for patients',
    selectedPatient: 'Selected Patient',
    patientName: 'Patient Name',
    patientPhone: 'Patient Phone',
    appointmentDate: 'Appointment Date',
    appointmentTime: 'Appointment Time',
    duration: 'Duration',
    visitType: 'Visit Type',
    save: 'Save',
    cancel: 'Cancel',
    required: 'Required',
    selectVisitType: 'Select Visit Type',
    selectStatus: 'Select Status',
    placeholder: {
      patientName: 'Enter patient name',
      patientPhone: 'Enter phone number',
      notes: 'Add any additional notes about the appointment...',
    },
    validation: {
      required: 'This field is required',
      invalidPhone: 'Invalid phone number',
      invalidTime: 'Invalid time',
      endTimeBeforeStart: 'End time must be after start time',
    },
  },

  // Modal titles
  modals: {
    scheduleNew: 'Schedule New Appointment',
    editAppointment: 'Edit Appointment',
    appointmentDetails: 'Appointment Details',
    deleteConfirmation: 'Delete Appointment',
  },

  // Buttons
  buttons: {
    cancel: 'Cancel',
    save: 'Save',
    update: 'Update',
    delete: 'Delete',
    schedule: 'Schedule',
    updateAppointment: 'Update Appointment',
    scheduleAppointment: 'Schedule Appointment',
    newAppointment: 'New Appointment',
    export: 'Export',
    filter: 'Filter',
    search: 'Search',
  },

  // Messages
  messages: {
    selectPatient: 'Please select a patient',
    selectStaff: 'Please select a staff member',
    invalidTime: 'End time must be after start time',
    deleteConfirmation: 'Are you sure you want to delete this appointment?',
    deleteWarning: 'This action cannot be undone.',
    noAppointments: 'No appointments found',
    loading: 'Loading...',
    error: 'Error loading data',
    noAppointmentsInColumn: 'No appointments in this column',
    loadingAppointments: 'Loading appointments...',
    errorLoadingAppointments: 'Error loading appointments',
    appointmentCreated: 'Appointment created successfully',
    appointmentUpdated: 'Appointment updated successfully',
    appointmentDeleted: 'Appointment deleted successfully',
    appointmentCancelled: 'Appointment cancelled successfully',
    appointmentConfirmed: 'Appointment confirmed successfully',
    appointmentCompleted: 'Appointment completed successfully',
  },

  // Filters
  filters: {
    searchPlaceholder: 'Search for patient...',
    doctors: 'Doctors',
    treatments: 'Treatments',
    statuses: 'Statuses',
    dateRange: 'Date Range',
    clearFilters: 'Clear Filters',
  },

  // Calendar
  calendar: {
    today: 'Today',
    week: 'Week',
    month: 'Month',
    day: 'Day',
    agenda: 'Agenda',
  },

  // Kanban columns
  kanban: {
    pending: 'Pending',
    scheduled: 'Scheduled',
    confirmed: 'Confirmed',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    noShow: 'No Show',
  },

  // Appointment details
  details: {
    patientInfo: 'Patient Information',
    appointmentInfo: 'Appointment Information',
    medicalHistory: 'Medical History',
    previousVisits: 'Previous Visits',
    notes: 'Notes',
    attachments: 'Attachments',
    close: 'Close',
    patientId: 'Patient ID',
    appointmentId: 'Appointment ID',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    startVisit: 'Start Visit',
    dateTime: 'Date & Time',
    duration: 'Duration',
    minutes: 'minutes',
    assignedDoctor: 'Assigned Doctor',
    staffId: 'Staff ID',
    available: 'Available',
    patientDetails: 'Patient Details',
    contactAvailable: 'Contact available',
    treatment: 'Treatment',
  },

  // Calendar view
  calendarView: {
    today: 'Today',
    doctor: 'Doctor',
    schedule: 'Schedule',
    prostheticTooth: 'Prosthetic Tooth',
    postSurgicalCare: 'Post-Surgical Care',
    seePatientDetails: 'See Patient Details',
  },

  // New keys for AppointmentCard component
  newAppointment: 'New Appointment',
  export: 'Export',
  filter: 'Filter',
  search: 'Search',
  confirm: 'Confirm',
  start: 'Start',
  complete: 'Complete',
  reschedule: 'Reschedule',
  viewDetails: 'View Details',
  noAppointmentsInColumn: 'No appointments in this column',
  loadingAppointments: 'Loading appointments...',
  errorLoadingAppointments: 'Error loading appointments',
  appointmentCreated: 'Appointment created successfully',
  appointmentUpdated: 'Appointment updated successfully',
  appointmentDeleted: 'Appointment deleted successfully',
  appointmentCancelled: 'Appointment cancelled successfully',
  appointmentConfirmed: 'Appointment confirmed successfully',
  appointmentCompleted: 'Appointment completed successfully',
  patientName: 'Patient Name',
  patientPhone: 'Patient Phone',
  appointmentDate: 'Appointment Date',
  appointmentTime: 'Appointment Time',
  required: 'Required',
  selectVisitType: 'Select Visit Type',
  selectStatus: 'Select Status',
  placeholder: {
    patientName: 'Enter patient name',
    patientPhone: 'Enter phone number',
    notes: 'Enter additional notes',
  },
  validation: {
    required: 'This field is required',
    invalidPhone: 'Invalid phone number',
    invalidTime: 'Invalid time',
    endTimeBeforeStart: 'End time must be after start time',
  },
  medicalHistory: 'Medical History',
  previousVisits: 'Previous Visits',
  attachments: 'Attachments',
  close: 'Close',
  patientId: 'Patient ID',
  appointmentId: 'Appointment ID',
};
