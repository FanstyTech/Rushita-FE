export const labResults = {
  list: {
    title: 'Resultados de Laboratorio',
    description: 'Ver y gestionar sus resultados de pruebas de laboratorio',
    filters: {
      search: 'Buscar Resultados',
      searchPlaceholder: 'Buscar nombre de prueba, doctor, clínica...',
      description:
        'Puede filtrar resultados por estado, tipo o buscar por nombre',
      status: 'Estado',
      statusAll: 'Todos los Estados',
      type: 'Tipo de Prueba',
      typeAll: 'Todos los Tipos',
    },
    actions: {
      filter: 'Filtrar',
      reset: 'Restablecer Filtros',
      export: 'Exportar',
      print: 'Imprimir',
      download: 'Descargar',
      viewDetails: 'Ver Detalles',
    },
    stats: {
      total: 'Total de Pruebas',
      completed: 'Pruebas Completadas',
      pending: 'Pruebas Pendientes',
      abnormal: 'Resultados Anormales',
    },
    card: {
      testNumber: 'Prueba #',
      doctor: 'Doctor',
      specialty: 'Especialidad',
      clinic: 'Clínica',
      requestDate: 'Fecha de Solicitud',
      resultDate: 'Fecha de Resultado',
      abnormalFlags: 'resultados anormales',
      criticalFlags: 'resultados críticos',
      notes: 'Notas',
    },
    status: {
      completed: 'Completada',
      pending: 'Pendiente',
      inProgress: 'En Progreso',
      cancelled: 'Cancelada',
    },
    empty: {
      title: 'No se Encontraron Resultados de Laboratorio',
      description:
        'No se encontraron resultados de laboratorio que coincidan con sus criterios de búsqueda.',
      action: 'Limpiar Filtros',
    },
    error: {
      title: 'Error al Cargar Resultados de Laboratorio',
      description:
        'Ocurrió un error al cargar los resultados de laboratorio. Por favor, inténtelo de nuevo.',
      retry: 'Reintentar',
    },
    loading: 'Cargando resultados de laboratorio...',
  },
  details: {
    title: 'Detalles del Resultado de Laboratorio',
    backToList: 'Volver a Resultados',
    subtitle: 'Resultados detallados de pruebas de laboratorio y análisis',
    notFound: {
      title: 'Resultado de Laboratorio No Encontrado',
      description: 'No se encontró el resultado de laboratorio solicitado',
      backButton: 'Volver',
      message:
        'No se encontró el resultado de laboratorio solicitado. El resultado puede haber sido eliminado o el enlace es incorrecto.',
      viewAllButton: 'Ver Todos los Resultados de Laboratorio',
    },
    tabs: {
      details: 'Detalles de la Prueba',
      results: 'Resultados',
      notes: 'Notas',
    },
    testInfo: {
      testCode: 'Código de Prueba:',
      requestDate: 'Fecha de Solicitud:',
      resultDate: 'Fecha de Resultado:',
      status: 'Estado:',
      testType: 'Tipo de Prueba:',
      abnormalResults: 'Resultados Anormales:',
      criticalResults: 'Resultados Críticos:',
      criteria: 'criterios',
    },
    sections: {
      testInformation: 'Información de la Prueba',
      testStatus: 'Estado de la Prueba',
      testResults: 'Resultados de la Prueba',
      notesRecommendations: 'Notas y Recomendaciones',
      visitInformation: 'Información de la Visita',
    },
    results: {
      title: 'Resultados de la Prueba',
      processing: 'Procesando Resultados',
      processingDescription:
        'Los resultados detallados estarán disponibles después de completar la prueba',
    },
    notes: {
      title: 'Notas y Recomendaciones',
      noNotes: 'No Hay Notas Disponibles',
      noNotesDescription:
        'No se han agregado notas especiales para esta prueba',
    },
    visitInfo: {
      visitNumber: 'Número de Visita',
      clinic: 'Clínica',
      specialty: 'Especialidad',
    },
    error: {
      title: 'Error al Cargar Resultado de Laboratorio',
      description: 'Error al cargar los detalles del resultado de laboratorio',
      notFound: 'No se encontró el resultado de laboratorio solicitado.',
      retry: 'Reintentar',
      backToList: 'Volver a la Lista',
      loadingFailed:
        'Error al cargar los detalles del resultado de laboratorio. Por favor, inténtelo de nuevo.',
    },
    loading: 'Cargando detalles del resultado de laboratorio...',
  },
};
