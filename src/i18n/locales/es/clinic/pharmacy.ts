export const pharmacy = {
  // Page title and description
  pageTitle: 'Farmacia',
  pageDescription: 'Gestionar visitas y recetas médicas',

  // Table columns
  table: {
    visitNumber: 'Visita #',
    patientName: 'Nombre del Paciente',
    doctor: 'Doctor',
    date: 'Fecha',
    type: 'Tipo',
    status: 'Estado',
    actions: 'Acciones',
  },

  // Filter options
  filters: {
    status: 'Estado',
    allStatus: 'Todos los Estados',
    searchPlaceholder: 'Buscar visitas...',
  },

  // Action buttons and tooltips
  actions: {
    viewDetails: 'Ver detalles',
    editVisit: 'Editar visita',
    viewPrescription: 'Ver receta',
    dispenseMedicine: 'Dispensar medicamento',
  },

  // Empty states and messages
  emptyStates: {
    noVisits: 'No se encontraron visitas',
    noVisitsDescription: 'No se encontraron visitas de farmacia',
  },

  // Loading states
  loading: {
    loadingVisits: 'Cargando visitas...',
    processingRequest: 'Procesando solicitud...',
  },

  // Status messages
  messages: {
    success: 'Éxito',
    error: 'Ocurrió un error',
    medicineDispensed: 'Medicamento dispensado exitosamente',
    prescriptionUpdated: 'Receta actualizada exitosamente',
  },

  // Prescriptions sub-page
  prescriptions: {
    pageTitle: 'Recetas Médicas',
    pageDescription: 'Gestionar recetas médicas y medicamentos',

    // Table columns
    table: {
      visitNumber: 'Visita #',
      patientName: 'Nombre del Paciente',
      doctor: 'Doctor',
      date: 'Fecha',
      type: 'Tipo',
      status: 'Estado',
      actions: 'Acciones',
    },

    // Filter options
    filters: {
      status: 'Estado',
      allStatus: 'Todos los Estados',
      searchPlaceholder: 'Buscar recetas...',
    },

    // Action buttons and tooltips
    actions: {
      viewPrescriptionDetails: 'Ver detalles de recetas',
      dispenseMedicine: 'Dispensar medicamento',
      printPrescription: 'Imprimir receta',
    },

    // Empty states and messages
    emptyStates: {
      noPrescriptions: 'No se encontraron recetas',
      noPrescriptionsDescription: 'No se encontraron recetas médicas',
    },

    // Loading states
    loading: {
      loadingPrescriptions: 'Cargando recetas...',
      processingRequest: 'Procesando solicitud...',
    },

    // Status messages
    messages: {
      success: 'Éxito',
      error: 'Ocurrió un error',
      medicineDispensed: 'Medicamento dispensado exitosamente',
      prescriptionPrinted: 'Receta impresa exitosamente',
    },

    // Prescription Details Page
    details: {
      // Visit information labels
      visitInfo: {
        visit: 'Visita',
        patient: 'Paciente',
        date: 'Fecha',
        medication: 'Medicamento',
        medications: 'Medicamentos',
      },

      // Medication card labels
      medicationCard: {
        dosage: 'Dosis',
        frequency: 'Frecuencia',
        quantity: 'Cantidad',
        duration: 'Duración',
        dispenseMedication: 'Dispensar Medicamento',
      },

      // Expanded details sections
      expandedDetails: {
        prescriptionDetails: 'Detalles de la Receta',
        medicationInformation: 'Información del Medicamento',
        prescribedBy: 'Recetado por',
        prescribedDate: 'Fecha de Receta',
        expiryDate: 'Fecha de Vencimiento',
        notes: 'Notas',
        name: 'Nombre',
        scientificName: 'Nombre Científico',
        arabicName: 'Nombre en Árabe',
        strength: 'Concentración',
        dosageForm: 'Forma Farmacéutica',
      },

      // Action buttons
      actions: {
        dispenseMedication: 'Dispensar Medicamento',
        expandDetails: 'Expandir Detalles',
        collapseDetails: 'Contraer Detalles',
      },

      // Empty states
      emptyStates: {
        noPrescriptions: 'No se encontraron recetas',
        noPrescriptionsDescription:
          'No se encontraron recetas para esta visita',
      },

      // Loading states
      loading: {
        loadingPrescriptions: 'Cargando recetas...',
        processingDispense: 'Procesando dispensación...',
      },

      // Messages
      messages: {
        medicineDispensed: 'Medicamento dispensado exitosamente',
        dispenseFailed: 'Error al dispensar medicamento',
        prescriptionExpired: 'La receta ha expirado',
        insufficientQuantity: 'Cantidad insuficiente disponible',
      },
    },
  },
  modal: {
    dispenseMedication: {
      title: 'Dispensar Medicamento',
      sections: {
        medicationInfo: {
          title: 'Información del Medicamento',
          labels: {
            name: 'Nombre:',
            scientificName: 'Nombre Científico:',
            arabicName: 'Nombre en Árabe:',
            strength: 'Concentración:',
          },
        },
        prescriptionDetails: {
          title: 'Detalles de la Receta',
          labels: {
            dosage: 'Dosis:',
            frequency: 'Frecuencia:',
            duration: 'Duración:',
            prescribedDate: 'Fecha de Prescripción:',
            expiryDate: 'Fecha de Vencimiento:',
          },
        },
        quantityInfo: {
          title: 'Información de Cantidad',
          remaining: 'restante',
          of: 'de',
        },
        patientInfo: {
          labels: {
            patientNumber: 'Número de Paciente:',
            visitNumber: 'Número de Visita:',
          },
        },
      },
      form: {
        quantityToDispense: 'Cantidad a Dispensar',
        notes: 'Notas',
        notesPlaceholder: 'Ingrese cualquier nota adicional aquí...',
        required: '*',
      },
      buttons: {
        cancel: 'Cancelar',
        dispense: 'Dispensar Medicamento',
      },
      errors: {
        positiveNumber: 'Por favor ingrese un número positivo',
        availableQuantity: 'La cantidad disponible para dispensar es solo',
      },
    },
  },
};
