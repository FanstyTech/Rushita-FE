export const visits = {
  list: {
    title: 'Historial de Visitas Médicas',
    subtitle:
      'Ver su historial de visitas médicas pasadas y revisar diagnósticos y prescripciones',
    filters: {
      title: 'Filtrar Resultados',
      subtitle:
        'Puede filtrar visitas por especialidad, tipo de visita o buscar por nombre',
      resetFilters: 'Restablecer Filtros',
      search: 'Buscar',
      searchPlaceholder: 'Buscar doctor, diagnóstico o queja...',
      specialty: 'Especialidad',
      allSpecialties: 'Todas las Especialidades',
      visitType: 'Tipo de Visita',
      allTypes: 'Todos los Tipos',
    },
    card: {
      mainComplaint: 'Queja Principal',
      diagnosis: 'Diagnóstico',
      notSpecified: 'No especificado',
      underReview: 'En revisión',
      prescriptions: 'prescripción',
      radiologyTests: 'radiología',
      labTests: 'análisis',
      followUp: 'seguimiento',
      viewDetails: 'Ver Detalles de la Visita',
    },
    emptyState: {
      title: 'No se Encontraron Visitas',
      message:
        'No se encontraron visitas que coincidan con los criterios de búsqueda. Modifique sus criterios de búsqueda o reserve una nueva cita.',
    },
    error: {
      title: 'Error al cargar visitas',
      retry: 'Reintentar',
    },
  },
  details: {
    title: 'Detalles de la Visita Médica',
    subtitle: 'Ver detalles de la visita, diagnóstico y prescripciones',
    backButton: 'Atrás',
    tabs: {
      details: 'Detalles',
      medications: 'Medicamentos',
      labTests: 'Análisis de Laboratorio',
      rayTests: 'Pruebas de Radiología',
    },
    visitInfo: {
      title: 'Información de la Visita',
      visitInfoSection: 'Información de la Visita',
      doctorInfoSection: 'Información del Doctor y Clínica',
      date: 'Fecha',
      time: 'Hora',
      visitNumber: 'Número de Visita',
      doctor: 'Doctor',
      clinic: 'Clínica',
      appointmentNumber: 'Número de Cita',
    },
    symptomsAndNotes: {
      title: 'Síntomas y Notas',
      symptoms: 'Síntomas',
      doctorNotes: 'Notas del Doctor',
      followUpInstructions: 'Instrucciones de Seguimiento',
    },
    diagnoses: {
      title: 'Diagnósticos',
    },
    followUp: {
      title: 'Cita de Seguimiento',
    },
    medications: {
      title: 'Medicamentos Prescritos',
      notes: 'Notas',
      emptyState: {
        title: 'No hay Medicamentos Prescritos',
        message: 'No se prescribieron medicamentos durante esta visita',
      },
      printPrescription: 'Imprimir Prescripción',
    },
    labTests: {
      title: 'Análisis de Laboratorio',
      labTest: 'laboratorio',
      testDate: 'Fecha del Análisis',
      results: 'Resultados',
      notes: 'Notas',
      emptyState: {
        title: 'No hay Análisis de Laboratorio',
        message:
          'No se solicitaron análisis de laboratorio durante esta visita',
      },
    },
    radiologyTests: {
      title: 'Pruebas de Radiología',
      radiologyTest: 'radiología',
      testDate: 'Fecha de la Prueba',
      results: 'Resultados',
      notes: 'Notas',
      emptyState: {
        title: 'No hay Pruebas de Radiología',
        message: 'No se solicitaron pruebas de radiología durante esta visita',
      },
    },
    error: {
      title: 'Error al Cargar Datos',
      message:
        'Ocurrió un error al cargar los detalles de la visita. Inténtelo de nuevo.',
      retry: 'Reintentar',
      backToVisits: 'Volver a Visitas',
    },
    notFound: {
      title: 'Visita No Encontrada',
      message:
        'La visita solicitada no fue encontrada. Puede haber sido eliminada o el enlace es incorrecto.',
      backToVisits: 'Volver a Visitas',
    },
  },
};
