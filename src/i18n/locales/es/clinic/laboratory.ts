export const clinicLaboratory = {
  // Page title and description
  pageTitle: 'Pruebas de Laboratorio',
  pageDescription: 'Gestionar pruebas de laboratorio y resultados',

  // Dashboard summary cards
  dashboard: {
    totalTests: 'Total de Pruebas',
    completedTests: 'Pruebas Completadas',
    inProgressTests: 'En Progreso',
    pendingTests: 'Pendientes',
    completed: 'Completadas',
    inProgress: 'En Progreso',
    pending: 'Pendientes',
  },

  // Filter and search
  filters: {
    searchPlaceholder: 'Buscar por nombre del paciente o prueba...',
    allDoctors: 'Todos los Doctores',
    doctor: 'Doctor',
    status: 'Estado',
    dateRange: 'Rango de Fechas',
  },

  // Test statuses
  testStatus: {
    pending: 'Pendiente',
    inProgress: 'En Progreso',
    completed: 'Completada',
    cancelled: 'Cancelada',
  },

  // Visit information
  visit: {
    patientName: 'Nombre del Paciente',
    visitDate: 'Fecha de Visita',
    visitTime: 'Hora de Visita',
    testsCount: 'Prueba',
    testsCountPlural: 'Pruebas',
  },

  // Test actions
  actions: {
    view: 'Ver',
    viewDetails: 'Ver Detalles',
    updateStatus: 'Actualizar Estado',
    uploadResults: 'Subir Resultados',
    downloadResults: 'Descargar Resultados',
  },

  // Test information
  test: {
    testName: 'Nombre de la Prueba',
    testDetails: 'Detalles de la Prueba',
    testResult: 'Resultado de la Prueba',
    requestedBy: 'Solicitado por',
    requestedDate: 'Fecha de Solicitud',
    completedDate: 'Fecha de Finalización',
    notes: 'Notas',
  },

  // Empty states
  emptyStates: {
    noVisits: 'No se Encontraron Visitas',
    noVisitsDescription:
      'No hay visitas que coincidan con los filtros seleccionados',
    noTests: 'No se Encontraron Pruebas',
    noTestsDescription: 'No hay pruebas de laboratorio disponibles',
    noResults: 'Sin Resultados',
    noResultsDescription: 'Aún no se han subido resultados para esta prueba',
  },

  // Loading states
  loading: {
    loadingTests: 'Cargando pruebas...',
    loadingSummary: 'Cargando resumen...',
    updatingStatus: 'Actualizando estado...',
    uploadingResults: 'Subiendo resultados...',
  },

  // Success messages
  success: {
    statusUpdated: 'Estado de la prueba actualizado exitosamente',
    resultsUploaded: 'Resultados subidos exitosamente',
    testCompleted: 'Prueba completada exitosamente',
  },

  // Error messages
  errors: {
    loadingFailed: 'Error al cargar los datos',
    updateFailed: 'Error al actualizar el estado',
    uploadFailed: 'Error al subir los resultados',
    networkError: 'Error de red, por favor intente de nuevo',
  },

  // Form labels
  form: {
    testResult: 'Resultado de la Prueba',
    attachments: 'Adjuntos',
    notes: 'Notas Adicionales',
    newStatus: 'Nuevo Estado',
    reason: 'Razón del Cambio',
  },

  // Button labels
  buttons: {
    save: 'Guardar',
    cancel: 'Cancelar',
    upload: 'Subir',
    update: 'Actualizar',
    close: 'Cerrar',
    refresh: 'Actualizar',
    export: 'Exportar',
    print: 'Imprimir',
  },

  // Modal Components
  modals: {
    confirmAction: 'Confirmar Acción',
    // Test Details Modal
    testDetails: {
      title: 'Detalles de la Prueba',
      testInformation: 'Información de la Prueba',
      testName: 'Nombre de la Prueba',
      patientName: 'Nombre del Paciente',
      testDate: 'Fecha de la Prueba',
      testTime: 'Hora de la Prueba',
      testStatus: 'Estado de la Prueba',
      testDetailsSection: 'Detalles de la Prueba',
      testAttachments: 'Adjuntos de la Prueba',
      buttons: {
        close: 'Cerrar',
        print: 'Imprimir',
      },
    },

    // Test Result Upload Modal
    uploadResults: {
      title: 'Subir Resultados de la Prueba',
      testInformation: 'Información de la Prueba',
      patient: 'Paciente',
      testType: 'Tipo de Prueba',
      testResults: 'Resultados de la Prueba',
      testResultsPlaceholder: 'Ingrese los resultados de la prueba aquí...',
      uploadAttachments: 'Subir Adjuntos',
      attachmentHelperText:
        'Subir archivos de resultados, imágenes o documentos',
      buttons: {
        cancel: 'Cancelar',
        uploading: 'Subiendo...',
        saveResults: 'Guardar Resultados',
      },
      errors: {
        uploadFailed: 'Error al subir los resultados de la prueba',
      },
    },

    // Test Status Update Modal
    updateStatus: {
      title: 'Actualizar Estado de la Prueba',
      testInformation: 'Información de la Prueba',
      patientName: 'Nombre del Paciente',
      currentStatus: 'Estado Actual',
      chooseNewStatus: 'Elegir Nuevo Estado',
      statusOptions: {
        pending: 'Pendiente',
        inProgress: 'En Progreso',
        completed: 'Completada',
        cancelled: 'Cancelada',
      },
      buttons: {
        cancel: 'Cancelar',
        updating: 'Actualizando...',
        updateStatus: 'Actualizar Estado',
      },
    },
  },
};
