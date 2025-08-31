export const clinicAppointments = {
  // Page title
  pageTitle: 'Citas',
  description: 'Gestiona las citas de tu clínica de manera eficiente',

  // View modes
  viewModes: {
    schedule: 'Calendario',
    kanban: 'Kanban',
    list: 'Lista',
  },

  // Header actions
  actions: {
    addNew: 'Nueva Cita',
    scheduleNew: 'Programar Nueva Cita',
    edit: 'Editar Cita',
    delete: 'Eliminar Cita',
    startVisit: 'Iniciar Visita',
    showDetails: 'Mostrar Detalles',
    newAppointment: 'Nueva Cita',
    schedule: 'Programar',
    export: 'Exportar',
    filter: 'Filtrar',
    search: 'Buscar',
    editAppointment: 'Editar Cita',
    deleteAppointment: 'Eliminar Cita',
    confirm: 'Confirmar',
    start: 'Iniciar',
    complete: 'Completar',
    reschedule: 'Reprogramar',
    viewDetails: 'Ver Detalles',
  },

  // Appointment statuses
  statuses: {
    pending: 'Pendiente',
    scheduled: 'Programada',
    confirmed: 'Confirmada',
    inProgress: 'En Progreso',
    completed: 'Completada',
    cancelled: 'Cancelada',
    noShow: 'No Asistió',
  },

  // Visit types
  visitTypes: {
    new: 'Visita Nueva',
    followUp: 'Seguimiento',
    emergency: 'Emergencia',
    consultation: 'Consulta',
    patientNew: 'Paciente Nuevo',
  },

  // Form labels
  form: {
    patient: 'Paciente',
    staff: 'Doctor',
    date: 'Fecha',
    startTime: 'Hora de Inicio',
    endTime: 'Hora de Fin',
    type: 'Tipo de Visita',
    status: 'Estado',
    notes: 'Notas',
    selectPatient: 'Seleccionar Paciente',
    selectStaff: 'Seleccionar Doctor',
    patientName: 'Nombre del Paciente',
    patientPhone: 'Teléfono del Paciente',
    appointmentDate: 'Fecha de la Cita',
    appointmentTime: 'Hora de la Cita',
    duration: 'Duración',
    visitType: 'Tipo de Visita',
    save: 'Guardar',
    cancel: 'Cancelar',
    required: 'Requerido',
    selectVisitType: 'Seleccionar Tipo de Visita',
    selectStatus: 'Seleccionar Estado',
    placeholder: {
      patientName: 'Ingrese nombre del paciente',
      patientPhone: 'Ingrese número de teléfono',
      notes: 'Ingrese notas adicionales',
    },
    validation: {
      required: 'Este campo es requerido',
      invalidPhone: 'Número de teléfono inválido',
      invalidTime: 'Hora inválida',
      endTimeBeforeStart:
        'La hora de fin debe ser después de la hora de inicio',
    },
    createNewAppointment: 'Crear Nueva Cita',
    fillDetailsToSchedule:
      'Complete los detalles para programar una nueva cita',
    staffInformation: 'Información del Personal',
    searchSelectStaff: 'Buscar y seleccionar un miembro del personal...',
    noStaffFound: 'No se encontró personal',
    typeToSearchStaff: 'Escriba para buscar personal',
    selectedStaffMember: 'Miembro del Personal Seleccionado',
    searchSelectPatient: 'Buscar y seleccionar un paciente...',
    noPatientsFound: 'No se encontraron pacientes',
    typeToSearchPatients: 'Escriba para buscar pacientes',
    selectedPatient: 'Paciente Seleccionado',
  },

  // Modal titles
  modals: {
    scheduleNew: 'Programar Nueva Cita',
    editAppointment: 'Editar Cita',
    appointmentDetails: 'Detalles de la Cita',
    deleteConfirmation: 'Eliminar Cita',
  },

  // Buttons
  buttons: {
    cancel: 'Cancelar',
    save: 'Guardar',
    update: 'Actualizar',
    delete: 'Eliminar',
    schedule: 'Programar',
    updateAppointment: 'Actualizar Cita',
    scheduleAppointment: 'Programar Cita',
    newAppointment: 'Nueva Cita',
    export: 'Exportar',
    filter: 'Filtrar',
    search: 'Buscar',
    edit: 'Editar',
    confirm: 'Confirmar',
    start: 'Iniciar',
    complete: 'Completar',
    reschedule: 'Reprogramar',
    viewDetails: 'Ver Detalles',
  },

  // Messages
  messages: {
    selectPatient: 'Por favor seleccione un paciente',
    selectStaff: 'Por favor seleccione un miembro del personal',
    invalidTime: 'La hora de fin debe ser posterior a la hora de inicio',
    deleteConfirmation: '¿Está seguro de que desea eliminar esta cita?',
    deleteWarning: 'Esta acción no se puede deshacer.',
    noAppointments: 'No se encontraron citas',
    noAppointmentsInColumn: 'No hay citas en esta columna',
    loading: 'Cargando...',
    loadingAppointments: 'Cargando citas...',
    error: 'Error al cargar datos',
    errorLoadingAppointments: 'Error al cargar citas',
    appointmentCreated: 'Cita creada exitosamente',
    appointmentUpdated: 'Cita actualizada exitosamente',
    appointmentDeleted: 'Cita eliminada exitosamente',
    appointmentCancelled: 'Cita cancelada exitosamente',
    appointmentConfirmed: 'Cita confirmada exitosamente',
    appointmentCompleted: 'Cita completada exitosamente',
  },

  // Filters
  filters: {
    searchPlaceholder: 'Buscar paciente...',
    doctors: 'Doctores',
    treatments: 'Tratamientos',
    statuses: 'Estados',
    dateRange: 'Rango de Fechas',
    clearFilters: 'Limpiar Filtros',
  },

  // Calendar
  calendar: {
    today: 'Hoy',
    week: 'Semana',
    month: 'Mes',
    day: 'Día',
    agenda: 'Agenda',
  },

  // Kanban columns
  kanban: {
    pending: 'Pendiente',
    scheduled: 'Programada',
    confirmed: 'Confirmada',
    inProgress: 'En Progreso',
    completed: 'Completada',
    cancelled: 'Cancelada',
    noShow: 'No Asistió',
  },

  // Appointment details
  details: {
    patientInfo: 'Información del Paciente',
    appointmentInfo: 'Información de la Cita',
    medicalHistory: 'Historial Médico',
    previousVisits: 'Visitas Anteriores',
    notes: 'Notas',
    attachments: 'Adjuntos',
    close: 'Cerrar',
    patientId: 'ID del Paciente',
    appointmentId: 'ID de la Cita',
    createdAt: 'Creado En',
    updatedAt: 'Actualizado En',
    startVisit: 'Iniciar Visita',
    dateTime: 'Fecha y Hora',
    duration: 'Duración',
    minutes: 'minutos',
    assignedDoctor: 'Doctor Asignado',
    staffId: 'ID del Personal',
    available: 'Disponible',
    patientDetails: 'Detalles del Paciente',
    contactAvailable: 'Contacto disponible',
    treatment: 'Tratamiento',
  },

  // Calendar view
  calendarView: {
    today: 'Hoy',
    doctor: 'Doctor',
    schedule: 'Horario',
    treatment: 'Tratamiento',
    prostheticTooth: 'Diente Protésico',
    postSurgicalCare: 'Cuidado Post-Quirúrgico',
    seePatientDetails: 'Ver Detalles del Paciente',
  },
};
