export const radiology = {
  title: 'Radiología',
  description: 'Gestionar pruebas radiológicas y resultados',

  summary: {
    cards: {
      totalTests: 'Total de Pruebas',
      completed: 'Completadas',
      inProgress: 'En Progreso',
      pending: 'Pendientes',
    },
  },

  filters: {
    searchPlaceholder: 'Buscar por nombre del paciente o prueba...',
    doctor: 'Doctor',
    allDoctors: 'Todos los Doctores',
    status: 'Estado',
    allStatus: 'Todos los Estados',
  },

  table: {
    columns: {
      patient: 'Paciente',
      visitDate: 'Fecha de Visita',
      visitTime: 'Hora de Visita',
      testName: 'Nombre de la Prueba',
      status: 'Estado',
      details: 'Detalles',
      actions: 'Acciones',
    },
  },

  visitCard: {
    testsCount: 'Pruebas',
    testCount_one: '1 Prueba',
    testCount_other: '{{count}} Pruebas',
  },

  actions: {
    view: 'Ver',
    updateStatus: 'Actualizar Estado',
    uploadResults: 'Subir Resultados',
    viewDetails: 'Ver Detalles',
    tooltips: {
      viewTestDetails: 'Ver detalles de la prueba',
      updateTestStatus: 'Actualizar estado de la prueba',
      uploadTestResults: 'Subir resultados de la prueba',
    },
  },

  emptyStates: {
    noVisits: {
      title: 'No se Encontraron Visitas',
      description: 'No hay visitas que coincidan con los filtros seleccionados',
    },
    noTests: {
      title: 'No se Encontraron Pruebas',
      description: 'No se encontraron pruebas radiológicas para esta visita',
    },
  },

  loading: {
    loadingTests: 'Cargando pruebas...',
    loadingSummary: 'Cargando resumen...',
    updatingStatus: 'Actualizando estado...',
    uploadingResults: 'Subiendo resultados...',
  },

  messages: {
    success: {
      statusUpdated: 'Estado de la prueba actualizado exitosamente',
      resultsUploaded: 'Resultados subidos exitosamente',
    },
    error: {
      updateStatusFailed: 'Error al actualizar el estado de la prueba',
      uploadResultsFailed: 'Error al subir los resultados',
      loadingFailed: 'Error al cargar los datos',
    },
  },

  status: {
    pending: 'Pendiente',
    inProgress: 'En Progreso',
    completed: 'Completado',
    cancelled: 'Cancelado',
    expired: 'Expirado',
  },

  modals: {
    testDetails: {
      title: 'Detalles de la Prueba',
      sections: {
        testInformation: 'Información de la Prueba',
        testDetails: 'Detalles de la Prueba',
        testResults: 'Resultados de la Prueba',
        testAttachments: 'Adjuntos de la Prueba',
      },
      labels: {
        testName: 'Nombre de la Prueba:',
        patientName: 'Nombre del Paciente:',
        testDate: 'Fecha de la Prueba:',
        testTime: 'Hora de la Prueba:',
        testStatus: 'Estado de la Prueba:',
      },
      buttons: {
        close: 'Cerrar',
        print: 'Imprimir',
      },
    },
    uploadResults: {
      title: 'Subir Resultados de la Prueba',
      form: {
        results: 'Resultados',
        resultsPlaceholder: 'Ingrese los resultados de la prueba aquí...',
        attachments: 'Adjuntos',
        attachmentsPlaceholder: 'Elija archivos para subir',
      },
      buttons: {
        cancel: 'Cancelar',
        upload: 'Subir Resultados',
      },
    },
    updateStatus: {
      title: 'Actualizar Estado de la Prueba',
      form: {
        currentStatus: 'Estado Actual:',
        newStatus: 'Nuevo Estado:',
        selectStatus: 'Seleccionar nuevo estado',
      },
      buttons: {
        cancel: 'Cancelar',
        update: 'Actualizar Estado',
      },
    },
  },
};
