export const appointments = {
  // Main appointments page
  tabs: {
    upcoming: 'Upcoming Appointments',
    past: 'Past Appointments',
  },
  messages: {
    noAppointments: 'No appointments',
    noUpcomingAppointments: 'No upcoming appointments currently',
    noPastAppointments: 'No past appointments',
    failedToLoad: 'Failed to load appointments',
    retry: 'Retry',
  },

  // Book appointment page
  booking: {
    steps: {
      selectClinic: 'Select Clinic',
      selectSpecialty: 'Select Specialty',
      selectDoctor: 'Select Doctor',
      selectDateTime: 'Select Date & Time',
      confirmation: 'Confirmation',
    },

    clinicSelection: {
      title: 'Select Clinic',
      previousBookingsTag: 'You have previous bookings',
    },

    specialtySelection: {
      title: 'Select Medical Specialty',
      emptyState: {
        title: 'No Specialties Found',
        message: 'Please select a clinic first to view available specialties',
        backButton: 'Back to Clinic Selection',
      },
    },

    doctorSelection: {
      title: 'Select Doctor',
      emptyState: {
        title: 'No Doctors Found',
        message:
          'No doctors found in this specialty, please select another specialty',
        backButton: 'Back to Specialty Selection',
      },
    },

    dateTimeSelection: {
      title: 'Select Date and Time',
      dateLabel: 'Date',
      timeLabel: 'Time',
      reasonLabel: 'Reason for Visit (Optional)',
      reasonPlaceholder: 'Write the reason for your visit here...',
      emptyTimeSlots: {
        title: 'Select a Date First',
        message: 'Please select a date to view available time slots',
      },
    },

    header: {
      backButton: 'Back',
      title: 'Book New Appointment',
      subtitle:
        'Select the clinic, specialty, doctor, and appointment time that suits you',
    },

    footer: {
      previousButton: 'Previous',
      nextButton: 'Next',
      confirmButton: 'Confirm Booking',
      submittingButton: 'Booking...',
    },

    confirmation: {
      title: 'Confirm Appointment',
      appointmentDetails: 'Appointment Details',
      clinicLabel: 'Clinic',
      specialtyLabel: 'Specialty',
      doctorLabel: 'Doctor',
      dateTimeLabel: 'Date and Time',
      reasonLabel: 'Reason for Visit',
      bookingConditions: 'Booking Conditions',
    },
  },

  // Appointments list components
  list: {
    header: {
      title: 'Appointments',
      subtitle: 'Manage your medical appointments and book new ones',
      newAppointmentButton: 'Book New Appointment',
    },
    filters: {
      title: 'Filter Appointments',
      subtitle: 'You can filter appointments by specialty and status',
      resetFilters: 'Reset Filters',
      search: 'Search',
      searchPlaceholder: 'Search for doctor or specialty...',
      specialtyLabel: 'Specialty',
      selectSpecialty: 'Select Specialty',
      statusLabel: 'Appointment Status',
      allStatuses: 'All Statuses',
      appointmentCount: '{{count}} {{type}} appointment',
      upcomingTab: 'Upcoming Appointments',
      pastTab: 'Past Appointments',
      upcoming: 'upcoming',
      past: 'past',
    },
    card: {
      details: 'Details',
      cancel: 'Cancel',
      requestFollowUp: 'Request Follow-up',
      notes: 'Notes',
    },
    emptyState: {
      title: 'No Appointments',
      upcomingMessage:
        'You have no upcoming appointments matching your search criteria',
      pastMessage:
        'You have no past appointments matching your search criteria',
      newAppointmentButton: 'Book New Appointment',
    },
  },

  // Appointment details page
  details: {
    pageTitle: 'Appointment Details',
    pageSubtitle: 'View and manage appointment details',
    backButton: 'Back',
    appointmentInfo: {
      title: 'Appointment Information',
      date: 'Date',
      time: 'Time',
      notes: 'Notes',
      cancellationReason: 'Cancellation Reason',
      appointmentNumber: 'Appointment Number',
    },
    clinicDoctorInfo: {
      title: 'Clinic and Doctor Details',
      clinic: 'Clinic',
      address: 'Address',
    },
    actions: {
      cancel: 'Cancel Appointment',
      canceling: 'Canceling...',
      reschedule: 'Reschedule Appointment',
      bookFollowUp: 'Book Follow-up Appointment',
    },
    modals: {
      cancel: {
        title: 'Cancel Appointment',
        message:
          'Are you sure you want to cancel this appointment? This action cannot be undone.',
        reasonLabel: 'Cancellation Reason (Optional)',
        reasonPlaceholder: 'Please specify the reason for cancellation...',
        cancelButton: 'Cancel',
        confirmButton: 'Confirm Cancellation',
      },
      reschedule: {
        title: 'Reschedule Appointment',
        message:
          'You will be redirected to the appointment booking page to select a new time.',
        cancelButton: 'Cancel',
        continueButton: 'Continue',
      },
      followUp: {
        title: 'Book Follow-up Appointment',
        message:
          'A follow-up appointment will be booked with the same doctor and clinic. You can choose your preferred date and appointment reason.',
        preferredDateLabel: 'Preferred Date (Optional)',
        reasonLabel: 'Appointment Reason',
        reasonPlaceholder: 'Please specify the reason for the appointment...',
        reasonDefault: 'Follow-up - {{reason}}',
        reasonFallback: 'Follow-up appointment',
        note: "If you don't select a date, the appointment will be scheduled two weeks from today.",
        noteLabel: 'Note:',
        cancelButton: 'Cancel',
        bookButton: 'Book Appointment',
      },
    },
    errors: {
      title: 'An Error Occurred',
      loadingMessage: 'An error occurred while loading appointment details',
      backToAppointments: 'Back to Appointments',
    },
    notFound: {
      title: 'Appointment Not Found',
      message:
        'The requested appointment could not be found. It may have been deleted or the link is incorrect.',
      backToAppointments: 'Back to Appointments',
    },
  },
};
