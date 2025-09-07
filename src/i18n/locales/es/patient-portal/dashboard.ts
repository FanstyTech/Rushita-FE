export const dashboard = {
  welcome: {
    greeting: 'Bienvenido, ',
    user: 'Usuario',
    editProfile: 'Editar Perfil',
    title: 'Bienvenido al Portal del Paciente',
    description:
      'Gestiona tu salud fácilmente y sigue tu condición médica desde un solo lugar',
    bookAppointment: 'Reservar Cita',
    prescriptions: 'Recetas',
    visitHistory: 'Historial de Visitas',
    tagline: 'Tu Salud es Nuestra Prioridad',
    subTagline: 'Servicios Médicos Excepcionales',
  },
  appointments: {
    title: 'Citas Próximas',
    appointmentsCount: 'cita',
    description: 'Tus citas programadas con médicos',
    viewAll: 'Ver Todas las Citas',
    noAppointments: {
      title: 'Sin Citas',
      description: 'No tienes citas programadas en este momento',
      button: 'Reserva tu Primera Cita',
    },
  },
  medications: {
    title: 'Medicamentos Actuales',
    medicationsCount: 'medicamento',
    description: 'Medicamentos actualmente recetados para ti',
    viewAll: 'Ver Todos los Medicamentos',
    noMedications: {
      title: 'Sin Medicamentos',
      description: 'No tienes medicamentos recetados en este momento',
    },
  },
  recentVisits: {
    title: 'Visitas Recientes',
    visitsCount: 'visita',
    description: 'Tus visitas médicas recientes',
    viewAll: 'Ver Todas las Visitas',
    noVisits: {
      title: 'Sin Visitas',
      description: 'Aún no has realizado ninguna visita médica',
    },
  },
  tabs: {
    overview: 'Resumen',
    health: 'Salud',
    notifications: 'Notificaciones',
  },
  quickActions: {
    bookAppointment: 'Reservar Cita',
    requestConsultation: 'Solicitar Consulta',
    requestPrescription: 'Solicitar Receta',
    profile: 'Perfil',
  },
  notifications: {
    appointmentConfirmed: 'Tu cita ha sido confirmada',
    testResultsReady: 'Los resultados de las pruebas están listos',
    medicationReminder: 'Recordatorio de medicamento',
    newDoctorMessage: 'Nuevo mensaje del médico',
    systemUpdate: 'Actualización del sistema de citas',
    viewAppointment: 'Ver Cita',
    viewResults: 'Ver Resultados',
    viewMedications: 'Ver Medicamentos',
    readMessage: 'Leer Mensaje',
    messages: {
      appointmentConfirmed:
        'Tu cita con el Dr. Ahmed Khalid el domingo 15 de octubre a las 10:00 AM ha sido confirmada',
      testResultsReady:
        'Los resultados de tu análisis de sangre están listos para revisar',
      medicationReminder:
        'Recordatorio para tomar tu medicamento para la presión arterial (Amlodipino) a las 9:00 PM',
      newDoctorMessage:
        'Tienes un nuevo mensaje de la Dra. Sarah Mohamed sobre tu consulta reciente',
      systemUpdate:
        'El sistema de reserva de citas ha sido actualizado, ahora puedes reservar citas a través de la aplicación móvil',
    },
    timeUnits: {
      minutes: 'minutos',
      hours: 'horas',
      days: 'día',
    },
  },
  healthAlerts: {
    highBloodPressure: 'Presión Arterial Alta',
    vaccinationReminder: 'Recordatorio de Vacunación',
    healthDataUpdate: 'Actualización de Datos de Salud',
    bookAppointmentWithDoctor: 'Reservar Cita con Médico',
    bookVaccinationAppointment: 'Reservar Cita de Vacunación',
    updateHealthData: 'Actualizar Datos',
    messages: {
      highBloodPressure:
        'Se han registrado lecturas de presión arterial alta en las últimas 3 mediciones. Por favor consulta a tu médico.',
      vaccinationReminder:
        'Es hora de tu vacuna anual contra la gripe. Por favor reserva una cita lo antes posible.',
      healthDataUpdate:
        'Las mediciones de peso no se han actualizado por más de 3 meses. Por favor actualiza tus datos de salud.',
    },
  },
  errors: {
    failedToLoadDashboard: 'Error al cargar los datos del panel',
    retry: 'Reintentar',
  },
};
