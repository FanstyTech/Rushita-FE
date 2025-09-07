export const appointments = {
  // Main appointments page
  tabs: {
    upcoming: 'Citas Próximas',
    past: 'Citas Pasadas',
  },
  messages: {
    noAppointments: 'No hay citas',
    noUpcomingAppointments: 'No hay citas próximas actualmente',
    noPastAppointments: 'No hay citas pasadas',
    failedToLoad: 'Error al cargar las citas',
    retry: 'Reintentar',
  },

  // Book appointment page
  booking: {
    steps: {
      selectClinic: 'Seleccionar Clínica',
      selectSpecialty: 'Seleccionar Especialidad',
      selectDoctor: 'Seleccionar Doctor',
      selectDateTime: 'Seleccionar Fecha y Hora',
      confirmation: 'Confirmación',
    },

    clinicSelection: {
      title: 'Seleccionar Clínica',
      previousBookingsTag: 'Tienes reservas anteriores',
    },

    specialtySelection: {
      title: 'Seleccionar Especialidad Médica',
      emptyState: {
        title: 'No se Encontraron Especialidades',
        message:
          'Por favor selecciona una clínica primero para ver las especialidades disponibles',
        backButton: 'Volver a Selección de Clínica',
      },
    },

    doctorSelection: {
      title: 'Seleccionar Doctor',
      emptyState: {
        title: 'No se Encontraron Doctores',
        message:
          'No se encontraron doctores en esta especialidad, por favor selecciona otra especialidad',
        backButton: 'Volver a Selección de Especialidad',
      },
    },

    dateTimeSelection: {
      title: 'Seleccionar Fecha y Hora',
      dateLabel: 'Fecha',
      timeLabel: 'Hora',
      reasonLabel: 'Motivo de la Visita (Opcional)',
      reasonPlaceholder: 'Escribe el motivo de tu visita aquí...',
      emptyTimeSlots: {
        title: 'Selecciona una Fecha Primero',
        message:
          'Por favor selecciona una fecha para ver los horarios disponibles',
      },
    },

    header: {
      backButton: 'Volver',
      title: 'Reservar Nueva Cita',
      subtitle:
        'Selecciona la clínica, especialidad, doctor y horario que te convenga',
    },

    footer: {
      previousButton: 'Anterior',
      nextButton: 'Siguiente',
      confirmButton: 'Confirmar Reserva',
      submittingButton: 'Reservando...',
    },

    confirmation: {
      title: 'Confirmar Cita',
      appointmentDetails: 'Detalles de la Cita',
      clinicLabel: 'Clínica',
      specialtyLabel: 'Especialidad',
      doctorLabel: 'Doctor',
      dateTimeLabel: 'Fecha y Hora',
      reasonLabel: 'Motivo de la Visita',
      bookingConditions: 'Condiciones de Reserva',
    },
  },

  // Appointments list components
  list: {
    header: {
      title: 'Citas',
      subtitle: 'Gestiona tus citas médicas y reserva nuevas',
      newAppointmentButton: 'Reservar Nueva Cita',
    },
    filters: {
      title: 'Filtrar Citas',
      subtitle: 'Puedes filtrar las citas por especialidad y estado',
      resetFilters: 'Restablecer Filtros',
      search: 'Buscar',
      searchPlaceholder: 'Buscar doctor o especialidad...',
      specialtyLabel: 'Especialidad',
      selectSpecialty: 'Seleccionar Especialidad',
      statusLabel: 'Estado de la Cita',
      allStatuses: 'Todos los Estados',
      appointmentCount: '{{count}} cita {{type}}',
      upcomingTab: 'Citas Próximas',
      pastTab: 'Citas Pasadas',
      upcoming: 'próxima',
      past: 'pasada',
    },
    card: {
      details: 'Detalles',
      cancel: 'Cancelar',
      requestFollowUp: 'Solicitar Seguimiento',
      notes: 'Notas',
    },
    emptyState: {
      title: 'No hay Citas',
      upcomingMessage:
        'No tienes citas próximas que coincidan con tus criterios de búsqueda',
      pastMessage:
        'No tienes citas pasadas que coincidan con tus criterios de búsqueda',
      newAppointmentButton: 'Reservar Nueva Cita',
    },
  },

  // Appointment details page
  details: {
    pageTitle: 'Detalles de la Cita',
    pageSubtitle: 'Ver y gestionar detalles de la cita',
    backButton: 'Volver',
    appointmentInfo: {
      title: 'Información de la Cita',
      date: 'Fecha',
      time: 'Hora',
      notes: 'Notas',
      cancellationReason: 'Motivo de Cancelación',
      appointmentNumber: 'Número de Cita',
    },
    clinicDoctorInfo: {
      title: 'Detalles de la Clínica y el Doctor',
      clinic: 'Clínica',
      address: 'Dirección',
    },
    actions: {
      cancel: 'Cancelar Cita',
      canceling: 'Cancelando...',
      reschedule: 'Reprogramar Cita',
      bookFollowUp: 'Reservar Cita de Seguimiento',
    },
    modals: {
      cancel: {
        title: 'Cancelar Cita',
        message:
          '¿Está seguro de que desea cancelar esta cita? Esta acción no se puede deshacer.',
        reasonLabel: 'Motivo de Cancelación (Opcional)',
        reasonPlaceholder:
          'Por favor especifique el motivo de la cancelación...',
        cancelButton: 'Cancelar',
        confirmButton: 'Confirmar Cancelación',
      },
      reschedule: {
        title: 'Reprogramar Cita',
        message:
          'Será redirigido a la página de reserva de citas para seleccionar una nueva hora.',
        cancelButton: 'Cancelar',
        continueButton: 'Continuar',
      },
      followUp: {
        title: 'Reservar Cita de Seguimiento',
        message:
          'Se reservará una cita de seguimiento con el mismo doctor y clínica. Puede elegir su fecha preferida y el motivo de la cita.',
        preferredDateLabel: 'Fecha Preferida (Opcional)',
        reasonLabel: 'Motivo de la Cita',
        reasonPlaceholder: 'Por favor especifique el motivo de la cita...',
        reasonDefault: 'Seguimiento - {{reason}}',
        reasonFallback: 'Cita de seguimiento',
        note: 'Si no selecciona una fecha, la cita se programará dos semanas a partir de hoy.',
        noteLabel: 'Nota:',
        cancelButton: 'Cancelar',
        bookButton: 'Reservar Cita',
      },
    },
    errors: {
      title: 'Ocurrió un Error',
      loadingMessage: 'Ocurrió un error al cargar los detalles de la cita',
      backToAppointments: 'Volver a las Citas',
    },
    notFound: {
      title: 'Cita No Encontrada',
      message:
        'No se pudo encontrar la cita solicitada. Puede haber sido eliminada o el enlace es incorrecto.',
      backToAppointments: 'Volver a las Citas',
    },
  },
};
