export const clinicDashboard = {
  // Error states
  errorLoading: 'Error al cargar el panel de control',

  // Stats cards
  stats: {
    totalPatients: 'Total de Pacientes',
    todayAppointments: 'Citas de Hoy',
    completedToday: 'Completadas Hoy',
    todayRevenue: 'Ingresos de Hoy',
    fromYesterday: 'desde ayer',
    changeFromYesterday: 'desde ayer',
  },

  // Quick actions
  quickActions: {
    title: 'Acciones Rápidas',
    newPatientRegistration: {
      title: 'Registro de Nuevo Paciente',
      description: 'Registrar un nuevo paciente',
    },
    scheduleAppointment: {
      title: 'Programar Cita',
      description: 'Reservar nueva cita',
    },
    viewPatientRecords: {
      title: 'Ver Registros de Pacientes',
      description: 'Acceder a archivos de pacientes',
    },
    settings: {
      title: 'Configuración',
      description: 'Configuración de la clínica',
    },
    takeAction: 'Tomar Acción',
  },

  // Charts
  charts: {
    appointmentsOverview: 'Resumen de Citas',
    appointmentStatus: 'Estado de Citas',
    totalAppointments: 'Total de Citas',
    completed: 'Completadas',
    noDataAvailable: 'No hay datos disponibles para este rango de tiempo',
  },

  // Time ranges
  timeRanges: {
    daily: 'Diario',
    weekly: 'Semanal',
    monthly: 'Mensual',
  },

  // Upcoming appointments
  upcomingAppointments: {
    title: 'Próximas Citas',
    noUpcoming: 'No hay próximas citas',
  },

  // Recent activities
  recentActivities: {
    title: 'Actividades Recientes',
    noRecentActivities: 'No hay actividades recientes',
    types: {
      registration: 'Registro',
      completion: 'Finalización',
      payment: 'Pago',
      cancellation: 'Cancelación',
    },
  },
};
