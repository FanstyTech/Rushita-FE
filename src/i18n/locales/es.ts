export const es = {
  translation: {
    // Navigation
    navigation: {
      dashboard: 'Panel de Control',
      patients: 'Pacientes',
      appointments: 'Citas',
      diagnosis: 'Diagnóstico',
      analytics: 'Análisis',
      settings: 'Configuración',
      clinicAI: 'IA de Clínica',
      medicalIntelligence: 'Inteligencia Médica',
    },

    // Breadcrumb routes
    breadcrumb: {
      home: 'Inicio',
      // Main sections
      admin: 'Administración',
      clinic: 'Clínica',
      doctor: 'Doctor',

      // Admin routes
      dashboard: 'Panel de Control',
      users: 'Usuarios',
      clinics: 'Clínicas',
      settings: 'Configuración',

      // Clinic routes
      patients: 'Pacientes',
      appointments: 'Citas',
      'medical-records': 'Registros Médicos',
      staff: 'Personal',

      // Financial routes
      financial: 'Financiero',
      revenues: 'Ingresos',
      expenses: 'Gastos',
      invoices: 'Facturas',
      salaries: 'Salarios',
      transactions: 'Transacciones',
      reports: 'Reportes',
      'service-prices': 'Precios de Servicios',

      // Doctor routes
      visits: 'Visitas',
      prescriptions: 'Recetas',
      schedule: 'Horario',

      // Common actions
      create: 'Crear',
      edit: 'Editar',
      view: 'Ver',
      new: 'Nuevo',
      add: 'Añadir',

      // Dynamic routes with IDs
      'patient #{{id}}': 'Paciente #{{id}}',
      'appointment #{{id}}': 'Cita #{{id}}',
      'invoice #{{id}}': 'Factura #{{id}}',
      'user #{{id}}': 'Usuario #{{id}}',
      'clinic #{{id}}': 'Clínica #{{id}}',
    },

    // Auth pages
    auth: {
      login: {
        title: 'Bienvenido de Vuelta',
        subtitle: 'Inicia sesión para acceder a tu panel',
        email: 'Correo Electrónico',
        emailPlaceholder: 'Ingresa tu correo electrónico',
        password: 'Contraseña',
        passwordPlaceholder: 'Ingresa tu contraseña',
        rememberMe: 'Recordarme',
        forgotPassword: '¿Olvidaste tu contraseña?',
        signIn: 'Iniciar Sesión en Panel',
        signingIn: 'Iniciando sesión...',
        needHelp: '¿Necesitas ayuda o quieres comenzar?',
        whatsapp: 'WhatsApp',
        instagram: 'Instagram',
        trustIndicators: {
          hipaaCompliant: 'Cumple con HIPAA',
          trustedClinics: 'Confiado por 60+ Clínicas',
        },
        branding: {
          title: 'Rushita',
          subtitle: 'Gestión de Práctica Médica',
          welcome: 'Bienvenido al Futuro de la',
          healthcare: 'Gestión Sanitaria',
          description:
            'Optimiza las operaciones de tu clínica con nuestro sistema integral de gestión de práctica médica.',
        },
        features: {
          secure: {
            title: 'Seguro y Cumplidor',
            description: 'Cumple con HIPAA con seguridad de nivel empresarial',
          },
          patientCare: {
            title: 'Atención Centrada en el Paciente',
            description: 'Mejora la experiencia y resultados del paciente',
          },
          teamCollaboration: {
            title: 'Colaboración en Equipo',
            description:
              'Flujo de trabajo sin interrupciones para todo tu equipo',
          },
        },
      },
    },

    // Settings page
    settings: {
      title: 'Configuración de Clínica',
      description: 'Gestionar configuración y ajustes de la clínica',

      // Appointment Settings
      appointments: {
        title: 'Configuración de Citas',
        description: 'Gestionar configuración y políticas de reserva de citas',
        duration: 'Duración de Cita (minutos)',
        maxAdvanceBooking: 'Reserva Máxima Anticipada (días)',
        cancellationPolicy: 'Política de Cancelación (horas antes de la cita)',
        onlineBooking: 'Permitir Reserva en Línea',
        requireApproval: 'Requerir Aprobación de Cita',
      },

      // Notification Settings
      notifications: {
        title: 'Configuración de Notificaciones',
        description: 'Controlar entrega de notificaciones y recordatorios',
        emailNotifications: 'Notificaciones por Email',
        smsNotifications: 'Notificaciones SMS',
        pushNotifications: 'Notificaciones Push',
        reminderTiming: 'Tiempo de Recordatorio (horas antes de la cita)',
      },

      // Clinic Information
      clinicInfo: {
        title: 'Información de Clínica',
        description: 'Gestionar información básica de la clínica',
        name: 'Nombre de Clínica',
        phone: 'Número de Teléfono',
        email: 'Correo Electrónico',
        address: 'Dirección',
        namePlaceholder: 'Ingresa nombre de clínica',
        phonePlaceholder: 'Ingresa número de teléfono',
        emailPlaceholder: 'Ingresa correo electrónico',
        addressPlaceholder: 'Ingresa dirección de clínica',
      },

      // System Preferences
      system: {
        title: 'Preferencias del Sistema',
        description: 'Gestionar configuración general del sistema',
        currency: 'Moneda Predeterminada',
        language: 'Idioma Predeterminado',
        timezone: 'Zona Horaria',
        autoBackup: 'Respaldo Automático',
        twoFactorAuth: 'Autenticación de Dos Factores',
        currencies: {
          SAR: 'Riyal Saudí (SAR)',
          AED: 'Dirham EAU (AED)',
          USD: 'Dólar Estadounidense (USD)',
          EUR: 'Euro (EUR)',
        },
        languages: {
          ar: 'Árabe',
          en: 'Inglés',
          fr: 'Francés',
        },
        timezones: {
          'Asia/Riyadh': 'Riad (GMT+3)',
          'Asia/Dubai': 'Dubái (GMT+4)',
          'Europe/London': 'Londres (GMT+0)',
          'America/New_York': 'Nueva York (GMT-5)',
          'Asia/Tokyo': 'Tokio (GMT+9)',
        },
      },

      // Booking Conditions
      bookingConditions: {
        title: 'Condiciones de Reserva',
        description:
          'Ingresa condiciones y requisitos de reserva (uno por línea)',
        patientInfoRequired: 'Requerir Información Completa del Paciente',
        insuranceRequired: 'Requerir Información de Seguro',
        medicalHistoryRequired: 'Requerir Historial Médico',
        minAge: 'Edad Mínima',
        maxAge: 'Edad Máxima',
        emergencyContactRequired: 'Requerir Contacto de Emergencia',
        sameDayBooking: 'Permitir Reserva el Mismo Día',
        depositRequired: 'Requerir Depósito de Reserva',
        depositAmount: 'Monto del Depósito',
        termsRequired: 'Requerir Aceptación de Términos y Condiciones',
      },

      // Clinic Rooms Management
      rooms: {
        title: 'Salas de Clínica y Equipos',
        description: 'Gestionar salas de clínica y equipos médicos',
        enableRoomManagement: 'Habilitar Gestión de Salas',
        defaultRoom: 'Sala Predeterminada para Citas',
        roomCapacity: 'Gestión de Capacidad de Salas',
        equipmentTracking: 'Seguimiento de Equipos',
        maintenanceScheduling: 'Programación de Mantenimiento',
        roomOptions: {
          room1: 'Sala de Examen 1',
          room2: 'Sala de Examen 2',
          room3: 'Sala de Examen 3',
          consultation: 'Sala de Consulta',
          procedure: 'Sala de Procedimientos',
          emergency: 'Sala de Emergencias',
        },
      },

      // Actions
      saveSettings: 'Guardar Configuración',
    },

    // Languages
    languages: {
      en: 'Inglés',
      ar: 'Árabe',
      es: 'Español',
    },

    // Common
    common: {
      search: 'Buscar',
      filter: 'Filtrar',
      sort: 'Ordenar',
      add: 'Añadir',
      edit: 'Editar',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      save: 'Guardar',
      confirm: 'Confirmar',
      back: 'Atrás',
      next: 'Siguiente',
      submit: 'Enviar',
      loading: 'Cargando...',
      noResults: 'No se encontraron resultados',
      success: 'Éxito',
      error: 'Error',
      warning: 'Advertencia',
      info: 'Información',
    },

    // Messages
    messages: {
      success: {
        saved: 'Guardado con éxito',
        updated: 'Actualizado con éxito',
        deleted: 'Eliminado con éxito',
      },
    },
  },
};
