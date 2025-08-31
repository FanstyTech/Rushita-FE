export const clinicDashboard = {
  // Error states
  errorLoading: 'Error loading dashboard',

  // Stats cards
  stats: {
    totalPatients: 'Total Patients',
    todayAppointments: "Today's Appointments",
    completedToday: 'Completed Today',
    todayRevenue: "Today's Revenue",
    fromYesterday: 'from yesterday',
    changeFromYesterday: 'from yesterday',
  },

  // Quick actions
  quickActions: {
    title: 'Quick Actions',
    newPatientRegistration: {
      title: 'New Patient Registration',
      description: 'Register a new patient',
    },
    scheduleAppointment: {
      title: 'Schedule Appointment',
      description: 'Book new appointment',
    },
    viewPatientRecords: {
      title: 'View Patient Records',
      description: 'Access patient files',
    },
    settings: {
      title: 'Settings',
      description: 'Clinic configuration',
    },
    takeAction: 'Take Action',
  },

  // Charts
  charts: {
    appointmentsOverview: 'Appointments Overview',
    appointmentStatus: 'Appointment Status',
    totalAppointments: 'Total Appointments',
    completed: 'Completed',
    noDataAvailable: 'No data available for this time range',
  },

  // Time ranges
  timeRanges: {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
  },

  // Upcoming appointments
  upcomingAppointments: {
    title: 'Upcoming Appointments',
    noUpcoming: 'No upcoming appointments',
  },

  // Recent activities
  recentActivities: {
    title: 'Recent Activities',
    noRecentActivities: 'No recent activities',
    types: {
      registration: 'Registration',
      completion: 'Completion',
      payment: 'Payment',
      cancellation: 'Cancellation',
    },
  },
};
