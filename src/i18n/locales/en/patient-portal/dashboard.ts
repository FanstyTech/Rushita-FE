export const dashboard = {
  welcome: {
    greeting: 'Welcome, ',
    user: 'User',
    editProfile: 'Edit Profile',
    title: 'Welcome to Patient Portal',
    description:
      'Manage your health easily and track your medical condition from one place',
    bookAppointment: 'Book Appointment',
    prescriptions: 'Prescriptions',
    visitHistory: 'Visit History',
    tagline: 'Your Health is Our Priority',
    subTagline: 'Exceptional Medical Services',
  },
  appointments: {
    title: 'Upcoming Appointments',
    appointmentsCount: 'appointment',
    description: 'Your scheduled appointments with doctors',
    viewAll: 'View All Appointments',
    noAppointments: {
      title: 'No Appointments',
      description: 'You have no scheduled appointments at the moment',
      button: 'Book Your First Appointment',
    },
  },
  medications: {
    title: 'Current Medications',
    medicationsCount: 'medication',
    description: 'Medications currently prescribed to you',
    viewAll: 'View All Medications',
    noMedications: {
      title: 'No Medications',
      description: 'You have no medications prescribed at the moment',
    },
  },
  recentVisits: {
    title: 'Recent Visits',
    visitsCount: 'visit',
    description: 'Your recent medical visits',
    viewAll: 'View All Visits',
    noVisits: {
      title: 'No Visits',
      description: 'You have not made any medical visits yet',
    },
  },
  tabs: {
    overview: 'Overview',
    health: 'Health',
    notifications: 'Notifications',
  },
  quickActions: {
    bookAppointment: 'Book Appointment',
    requestConsultation: 'Request Consultation',
    requestPrescription: 'Request Prescription',
    profile: 'Profile',
  },
  notifications: {
    appointmentConfirmed: 'Your appointment has been confirmed',
    testResultsReady: 'Test results are ready',
    medicationReminder: 'Medication reminder',
    newDoctorMessage: 'New message from doctor',
    systemUpdate: 'Appointment system update',
    viewAppointment: 'View Appointment',
    viewResults: 'View Results',
    viewMedications: 'View Medications',
    readMessage: 'Read Message',
    messages: {
      appointmentConfirmed:
        'Your appointment with Dr. Ahmed Khalid on Sunday, October 15 at 10:00 AM has been confirmed',
      testResultsReady: 'Your blood test results are ready for review',
      medicationReminder:
        'Reminder to take your blood pressure medication (Amlodipine) at 9:00 PM',
      newDoctorMessage:
        'You have a new message from Dr. Sarah Mohamed regarding your recent inquiry',
      systemUpdate:
        'The appointment booking system has been updated, you can now book appointments via the mobile app',
    },
    timeUnits: {
      minutes: 'minutes',
      hours: 'hours',
      days: 'day',
    },
  },
  healthAlerts: {
    highBloodPressure: 'High Blood Pressure',
    vaccinationReminder: 'Vaccination Reminder',
    healthDataUpdate: 'Health Data Update',
    bookAppointmentWithDoctor: 'Book Appointment with Doctor',
    bookVaccinationAppointment: 'Book Vaccination Appointment',
    updateHealthData: 'Update Data',
    messages: {
      highBloodPressure:
        'High blood pressure readings have been recorded in the last 3 measurements. Please consult your doctor.',
      vaccinationReminder:
        "It's time for your annual flu vaccination. Please book an appointment as soon as possible.",
      healthDataUpdate:
        'Weight measurements have not been updated for more than 3 months. Please update your health data.',
    },
  },
  errors: {
    failedToLoadDashboard: 'Failed to load dashboard data',
    retry: 'Retry',
  },
};
