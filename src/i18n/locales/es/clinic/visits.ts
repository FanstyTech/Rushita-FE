export const visits = {
  title: 'Visitas',
  description: 'Gestionar visitas de pacientes y seguimientos médicos',

  // Table columns
  table: {
    columns: {
      visitNumber: 'Visita #',
      patientName: 'Nombre del Paciente',
      doctor: 'Doctor',
      date: 'Fecha',
      type: 'Tipo de Visita',
      status: 'Estado',
      actions: 'Acciones',
    },
  },

  // Filter options
  filters: {
    searchPlaceholder: 'Buscar visitas...',
    statusFilter: 'Estado',
    allStatus: 'Todos los Estados',
  },

  // Action buttons and tooltips
  actions: {
    addNew: 'Agregar Nueva Visita',
    view: 'Ver detalles de la visita',
    edit: 'Editar detalles de la visita',
    delete: 'Eliminar visita',
    editVisit: 'Editar Visita',
    goBack: 'Volver',
    printSummary: 'Imprimir Resumen de Visita',
  },

  // Visit types
  visitTypes: {
    consultation: 'Consulta',
    followUp: 'Seguimiento',
    emergency: 'Emergencia',
    checkup: 'Revisión',
    procedure: 'Procedimiento Médico',
    vaccination: 'Vacunación',
    therapy: 'Terapia Física',
    new: 'Nueva Visita',
    followup: 'Visita de Seguimiento',
  },

  // Visit statuses
  statuses: {
    scheduled: 'Programada',
    inProgress: 'En Progreso',
    completed: 'Completada',
    cancelled: 'Cancelada',
    noShow: 'No Asistió',
    rescheduled: 'Reprogramada',
  },

  // Delete confirmation modal
  deleteModal: {
    title: 'Eliminar Visita',
    message: '¿Está seguro de que desea eliminar esta visita?',
    secondaryMessage: 'Esta acción no se puede deshacer.',
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
  },

  // Loading states
  loading: {
    visits: 'Cargando visitas...',
    deleting: 'Eliminando visita...',
    processing: 'Procesando...',
    loadingVisit: 'Cargando datos de la visita...',
    loadingAppointment: 'Cargando datos de la cita...',
    saving: 'Guardando...',
  },

  // Success/Error messages
  messages: {
    visitDeleted: 'Visita eliminada exitosamente',
    visitUpdated: 'Visita actualizada exitosamente',
    visitCreated: 'Visita creada exitosamente',
    errorLoading: 'Error al cargar las visitas',
    errorDeleting: 'Error al eliminar la visita',
    errorUpdating: 'Error al actualizar la visita',
    failedToLoad: 'Error al cargar los detalles de la visita.',
    visitNotFound: 'Visita no encontrada.',
  },

  // Empty states
  emptyStates: {
    noVisits: 'No se encontraron visitas',
    noVisitsDescription:
      'No se encontraron visitas. Comience agregando una nueva visita.',
    noResults: 'No se encontraron resultados',
    noResultsDescription:
      'No se encontraron visitas que coincidan con sus criterios de búsqueda.',
  },

  // Visit Form
  form: {
    // Section titles
    sections: {
      treatmentInformation: 'Información del Tratamiento',
      attachments: 'Archivos Adjuntos',
    },

    // Form labels and placeholders
    labels: {
      linkedToAppointment: 'Vinculado a la cita:',
    },

    // Form buttons
    buttons: {
      previous: 'Anterior',
      preview: 'Vista Previa',
      saveVisit: 'Guardar Visita',
      saving: 'Guardando...',
    },

    // File upload
    fileUpload: {
      helperText:
        'Subir archivos, imágenes o documentos relacionados con la visita',
      description: 'Archivo adjunto de la visita',
    },

    // Modal titles
    modals: {
      addNewPatient: 'Agregar Nuevo Paciente',
    },

    // Patient Info Section
    patientInfo: {
      title: 'Información del Paciente',
      searchPatient: 'Buscar Paciente',
      searchPlaceholder: 'Buscar por nombre, ID o teléfono...',
      visitType: 'Tipo de Visita',
      patient: 'Paciente',
      patientDetails: 'Detalles del Paciente',
      name: 'Nombre',
      age: 'Edad',
      years: 'años',
      bloodType: 'Tipo de Sangre',
      phone: 'Teléfono',
      addNewPatient: 'Agregar Nuevo Paciente',
      noPatients: 'No se encontraron pacientes',
      typeToSearch: 'Escriba para buscar pacientes',
      notAvailable: 'N/A',
      id: 'ID',
    },

    // Medications Section
    medications: {
      title: 'Medicamentos',
      addMedication: 'Agregar Medicamento',
      removeMedication: 'Eliminar Medicamento',
      medicationNumber: 'Medicamento #',
      medicationName: 'Nombre del Medicamento',
      searchMedicine: 'Buscar medicina...',
      dosage: 'Dosis',
      frequency: 'Frecuencia',
      duration: 'Duración (días)',
      notes: 'Notas',
      notesPlaceholder:
        'Instrucciones adicionales o notas sobre este medicamento',
      medicationNameRequired: 'El nombre del medicamento es requerido',
    },

    // Lab Tests Section
    labTests: {
      title: 'Pruebas de Laboratorio',
      addLabTest: 'Agregar Prueba de Laboratorio',
      removeLabTest: 'Eliminar Prueba de Laboratorio',
      labTestNumber: 'Prueba de Laboratorio #',
      labTest: 'Prueba de Laboratorio',
      selectLabTest: 'Seleccionar Prueba de Laboratorio',
      additionalDetails: 'Detalles Adicionales',
      additionalDetailsPlaceholder: 'Detalles adicionales',
      labTestRequired: 'El nombre de la prueba de laboratorio es requerido',
      noLabTests:
        'No se han agregado pruebas de laboratorio aún. Haga clic en Agregar Prueba de Laboratorio para comenzar.',
      addLabTestButton: 'Agregar Prueba de Laboratorio',
    },

    // Ray Tests Section
    rayTests: {
      title: 'Pruebas de Rayos',
      addRayTest: 'Agregar Prueba de Rayos',
      removeRayTest: 'Eliminar Prueba de Rayos',
      rayTestNumber: 'Prueba de Rayos #',
      rayTest: 'Prueba de Rayos',
      selectRay: 'Seleccionar Rayos',
      additionalDetails: 'Detalles Adicionales',
      additionalDetailsPlaceholder: 'Detalles adicionales',
      rayTestRequired: 'El nombre de la prueba de rayos es requerido',
      noRayTests:
        'No se han agregado pruebas de rayos aún. Haga clic en Agregar Prueba de Rayos para comenzar.',
      addRayTestButton: 'Agregar Prueba de Rayos',
    },

    // Symptoms and Diagnosis Section
    symptomsAndDiagnosis: {
      title: 'Síntomas y Diagnóstico',
      symptoms: 'Síntomas',
      symptomsPlaceholder: 'Ingrese los síntomas del paciente...',
      diagnosis: 'Diagnóstico (ICD-10)',
      diagnosisPlaceholder: 'Seleccione el código de diagnóstico ICD-10...',
      selectDiagnosis: 'Seleccione Diagnóstico',
      noDiagnosisFound:
        'No se encontraron códigos de diagnóstico coincidentes con su búsqueda',
      noDiagnosisSelected: 'No se seleccionó diagnóstico',
      selected: 'Seleccionado',
      searchPlaceholder: 'Buscar diagnóstico...',
    },

    // Notes Section
    notes: {
      title: 'Notas Adicionales',
      placeholder: 'Ingrese cualquier nota adicional...',
    },

    // Validation messages
    validation: {
      patientRequired: 'La selección del paciente es requerida',
      visitTypeRequired: 'El tipo de visita es requerido',
      symptomsRequired: 'Los síntomas son requeridos',
      diagnosisRequired: 'El diagnóstico es requerido',
      medicationNameRequired: 'El nombre del medicamento es requerido',
      dosageRequired: 'La dosis es requerida',
      frequencyRequired: 'La frecuencia es requerida',
      durationRequired: 'La duración es requerida',
      labTestRequired: 'El nombre de la prueba de laboratorio es requerido',
      rayTestRequired: 'El nombre de la prueba de rayos es requerido',
      dentalProcedureRequired: 'El tipo de procedimiento dental es requerido',
    },
  },

  // Modals
  modals: {
    // Advanced Search Modal
    advancedSearch: {
      title: 'Búsqueda Avanzada de Pacientes',
      cancel: 'Cancelar',
      search: 'Buscar',
      patientName: 'Nombre del Paciente',
      patientNamePlaceholder: 'Ingrese el nombre del paciente',
      patientId: 'ID del Paciente',
      patientIdPlaceholder: 'Ingrese el ID del paciente',
      phoneNumber: 'Número de Teléfono',
      phoneNumberPlaceholder: 'Ingrese el número de teléfono',
      email: 'Correo Electrónico',
      emailPlaceholder: 'Ingrese la dirección de correo electrónico',
    },

    // Medication Search Modal
    medicationSearch: {
      title: 'Buscar Medicamentos',
      searchPlaceholder:
        'Buscar por nombre del medicamento, categoría o fabricante...',
      select: 'Seleccionar',
      noMedicationsFound: 'No se encontraron medicamentos',
      adjustSearchTerms: 'Intente ajustar sus términos de búsqueda',
      columns: {
        code: 'Código',
        name: 'Nombre',
        scientificName: 'Nombre Científico',
        medicationType: 'Tipo de Medicamento',
        actions: 'Acciones',
      },
    },

    // File Preview Modal
    filePreview: {
      previewNotAvailable:
        'Vista previa no disponible para este tipo de archivo. Por favor descargue para ver.',
      downloadFile: 'Descargar Archivo',
    },

    // Treatment Details Modal
    treatmentDetails: {
      title: 'Detalles del Tratamiento',
      patientInformation: 'Información del Paciente',
      treatmentInformation: 'Información del Tratamiento',
      name: 'Nombre',
      patientId: 'ID del Paciente',
      visitType: 'Tipo de Visita',
      visit: 'Visita',
      symptoms: 'Síntomas',
      diagnosis: 'Diagnóstico',
      medications: 'Medicamentos',
      medicationName: 'Nombre',
      dosage: 'Dosis',
      frequency: 'Frecuencia',
      duration: 'Duración',
      labTests: 'Pruebas de Laboratorio',
      testName: 'Nombre de la Prueba',
      rayTests: 'Pruebas de Rayos',
      rayType: 'Tipo de Rayos',
      details: 'Detalles',
      additionalNotes: 'Notas Adicionales',
      attachments: 'Archivos Adjuntos',
      download: 'Descargar',
      notAvailable: 'N/A',
      noneSpecified: 'Ninguno especificado',
      notSpecified: 'No especificado',
      noAdditionalDetails: 'Sin detalles adicionales',
      noMedicationsPrescribed: 'No se recetaron medicamentos',
    },
  },

  // Visit Details Page
  details: {
    // Tabs
    tabs: {
      details: 'Detalles de la Visita',
      medications: 'Medicamentos',
      tests: 'Pruebas',
      notes: 'Notas Clínicas',
    },

    // Patient Information Section
    patientInfo: {
      title: 'Información del Paciente',
      patientName: 'Nombre del Paciente',
      visitType: 'Tipo de Visita',
      dateTime: 'Fecha y Hora',
      at: 'a las',
    },

    // Medical Information Section
    medicalInfo: {
      title: 'Información Médica',
      symptoms: 'Síntomas',
      doctor: 'Doctor',
      notSpecified: 'No especificado',
    },

    // Diagnoses Section
    diagnoses: {
      title: 'Diagnósticos',
      noDiagnoses: 'No se registraron diagnósticos para esta visita',
    },

    // Visit Summary Section
    summary: {
      title: 'Resumen de la Visita',
      medications: {
        title: 'Medicamentos',
        description: 'Medicamentos recetados',
        items: 'Elementos',
      },
      labTests: {
        title: 'Pruebas de Laboratorio',
        description: 'Trabajo de laboratorio ordenado',
        tests: 'Pruebas',
      },
      radiology: {
        title: 'Radiología',
        description: 'Pruebas de imagen',
        tests: 'Pruebas',
      },
    },

    // Medications Tab
    medications: {
      title: 'Medicamentos',
      dosage: 'Dosis:',
      duration: 'Duración:',
      notes: 'Notas:',
      noMedications: 'No se recetaron medicamentos para esta visita',
    },

    // Tests Tab
    tests: {
      labTests: {
        title: 'Pruebas de Laboratorio',
        details: 'Detalles:',
        noLabTests: 'No se ordenaron pruebas de laboratorio para esta visita',
      },
      radiologyTests: {
        title: 'Pruebas de Radiología',
        details: 'Detalles:',
        noRadiologyTests:
          'No se ordenaron pruebas de radiología para esta visita',
      },
    },

    // Clinical Notes Tab
    clinicalNotes: {
      title: 'Notas Clínicas',
      showMore: 'Mostrar Más',
      showLess: 'Mostrar Menos',
      noNotes: 'No se registraron notas clínicas para esta visita',
    },

    // Footer
    footer: {
      lastUpdated: 'Última actualización:',
      printVisitSummary: 'Imprimir resumen de la visita',
    },
  },
};
