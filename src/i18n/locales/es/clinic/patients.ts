export const clinicPatients = {
  // Page title and description
  pageTitle: 'Lista de Pacientes',
  pageDescription: 'Gestionar información de pacientes y registros médicos',

  // Table columns
  table: {
    name: 'Nombre',
    contact: 'Información de Contacto',
    gender: 'Género',
    dateOfBirth: 'Fecha de Nacimiento',
    totalVisits: 'Total de Visitas',
    lastVisitDate: 'Fecha de Última Visita',
    actions: 'Acciones',
  },

  // Filter options
  filters: {
    gender: 'Género',
    all: 'Todos',
    male: 'Masculino',
    female: 'Femenino',
  },

  // Action buttons and tooltips
  actions: {
    addNew: 'Agregar Nuevo Paciente',
    view: 'Ver Detalles',
    edit: 'Editar',
    delete: 'Eliminar',
  },

  // Delete confirmation modal
  deleteModal: {
    title: 'Eliminar Paciente',
    message: '¿Está seguro de que desea eliminar este paciente?',
    secondaryMessage: 'Esta acción no se puede deshacer.',
    confirm: 'Eliminar',
    cancel: 'Cancelar',
  },

  // Status messages
  messages: {
    noPatients: 'No se encontraron pacientes',
    loading: 'Cargando...',
    error: 'Error al cargar datos',
    deleteSuccess: 'Paciente eliminado exitosamente',
    deleteError: 'Error al eliminar paciente',
  },

  // Date formatting
  dateFormat: {
    noDate: '-',
  },

  // Add/Edit Patient Form
  form: {
    // Page titles
    addTitle: 'Agregar Nuevo Paciente',
    editTitle: 'Editar Información del Paciente',

    // Section headers
    sections: {
      personalInfo: 'Información Personal',
      contactInfo: 'Información de Contacto',
      medicalInfo: 'Información Médica',
    },

    // Form fields
    fields: {
      // Personal Information
      firstNameForeign: 'Primer Nombre (Inglés)',
      firstNameArabic: 'Primer Nombre (Árabe)',
      secondNameForeign: 'Segundo Nombre (Inglés)',
      secondNameArabic: 'Segundo Nombre (Árabe)',
      thirdNameForeign: 'Tercer Nombre (Inglés)',
      thirdNameArabic: 'Tercer Nombre (Árabe)',
      lastNameForeign: 'Apellido (Inglés)',
      lastNameArabic: 'Apellido (Árabe)',
      idType: 'Tipo de ID',
      idNumber: 'Número de ID',
      gender: 'Género',
      preferredLanguage: 'Idioma Preferido',
      dateOfBirth: 'Fecha de Nacimiento',

      // Contact Information
      phoneNumber: 'Número de Teléfono',
      email: 'Dirección de Correo',
      country: 'País',
      city: 'Ciudad',
      address: 'Dirección',

      // Medical Information
      bloodType: 'Tipo de Sangre',
      height: 'Altura (cm)',
      weight: 'Peso (kg)',
    },

    // Validation messages
    validation: {
      firstNameRequired: 'El primer nombre es requerido',
      phoneRequired: 'El número de teléfono es requerido',
      dateOfBirthRequired: 'La fecha de nacimiento es requerida',
      emailInvalid: 'Dirección de correo inválida',
    },

    // Button labels
    buttons: {
      save: 'Guardar Paciente',
      update: 'Actualizar Paciente',
      saving: 'Guardando...',
      cancel: 'Cancelar',
    },

    // Success messages
    success: {
      patientAdded: 'Paciente agregado exitosamente',
      patientUpdated: 'Paciente actualizado exitosamente',
    },
  },

  // Patient Profile Page
  profile: {
    // Page sections
    tabs: {
      overview: 'Resumen',
      medicalHistory: 'Historial Médico',
      appointments: 'Citas',
      documents: 'Documentos',
    },

    // Contact information labels
    contact: {
      phone: 'Teléfono',
      email: 'Correo',
      address: 'Dirección',
    },

    // Action buttons
    buttons: {
      newAppointment: 'Nueva Cita',
      addCondition: 'Agregar Condición',
      addAllergy: 'Agregar Alergia',
      addFamilyHistory: 'Agregar Historial Familiar',
      uploadDocument: 'Subir Documento',
    },

    // Overview section
    overview: {
      quickStats: 'Estadísticas Rápidas',
      totalVisits: 'Total de Visitas',
      lastVisit: 'Última Visita',
      recentActivity: 'Actividad Reciente',
      noRecentActivity: 'Sin Actividad Reciente',
      noActivityDescription:
        'No se han registrado actividades para este paciente aún',
    },

    // Medical History section
    medicalHistory: {
      conditions: 'Condiciones Médicas',
      allergies: 'Alergias',
      medications: 'Medicamentos Actuales',
      familyHistory: 'Historial Familiar',

      // Empty states
      noConditions: 'Sin Condiciones Médicas',
      noConditionsDescription: 'No se han registrado condiciones médicas',
      noAllergies: 'Sin Alergias',
      noAllergiesDescription: 'No se han registrado alergias',
      noMedications: 'Sin Medicamentos',
      noMedicationsDescription: 'No se han prescrito medicamentos',
      noFamilyHistory: 'Sin Historial Familiar',
      noFamilyHistoryDescription:
        'No se ha registrado historial médico familiar',

      // Medications table
      medicationHeaders: {
        medication: 'Medicamento',
        dosage: 'Dosis',
        frequency: 'Frecuencia',
        started: 'Iniciado',
      },
    },

    // Appointments section
    appointments: {
      upcoming: 'Próximas Citas',
      noAppointments: 'Sin Citas',
      noAppointmentsDescription: 'No hay citas programadas',

      // Table headers
      headers: {
        dateTime: 'Fecha y Hora',
        type: 'Tipo',
        doctor: 'Doctor',
        status: 'Estado',
        notes: 'Notas',
      },
    },

    // Documents section
    documents: {
      title: 'Documentos Médicos',
      noDocuments: 'Sin Documentos',
      noDocumentsDescription: 'No se han subido documentos médicos',
      uploaded: 'Subido',
      by: 'Por',
    },

    // Error states
    errors: {
      loadingProfile: 'Error Cargando Perfil',
      loadingProfileDescription:
        'Falló al cargar el perfil del paciente. Inténtelo de nuevo.',
      patientNotFound: 'Paciente No Encontrado',
      patientNotFoundDescription:
        'No se pudo encontrar el perfil del paciente solicitado.',
    },
  },

  // Modal Components
  modals: {
    // Add Condition Modal
    addCondition: {
      title: 'Agregar Condición Médica',
      fields: {
        conditionName: 'Nombre de la Condición',
        diagnoseDate: 'Fecha de Diagnóstico',
        status: 'Estado de la Condición',
      },
      buttons: {
        cancel: 'Cancelar',
        add: 'Agregar Condición',
      },
      validation: {
        nameRequired: 'El nombre de la condición es requerido',
        diagnoseDateRequired: 'La fecha de diagnóstico es requerida',
        statusRequired: 'El estado de la condición es requerido',
      },
    },

    // Add Allergy Modal
    addAllergy: {
      title: 'Agregar Alergia',
      fields: {
        allergyName: 'Nombre de la Alergia',
        severity: 'Severidad',
        reaction: 'Reacción',
      },
      buttons: {
        cancel: 'Cancelar',
        add: 'Agregar Alergia',
      },
      validation: {
        nameRequired: 'El nombre de la alergia es requerido',
        reactionRequired: 'La reacción es requerida',
        severityRequired: 'La severidad es requerida',
      },
    },

    // Add Family History Modal
    addFamilyHistory: {
      title: 'Agregar Historial Familiar',
      fields: {
        condition: 'Condición',
        ageOfOnset: 'Edad de Inicio',
        relationship: 'Relación Familiar',
        status: 'Estado',
        notes: 'Notas',
      },
      buttons: {
        cancel: 'Cancelar',
        add: 'Agregar Historial Familiar',
      },
      validation: {
        conditionRequired: 'La condición es requerida',
        ageOfOnsetRequired: 'La edad de inicio es requerida',
        relationshipRequired: 'La relación familiar es requerida',
        statusRequired: 'El estado es requerido',
      },
    },
  },
};
