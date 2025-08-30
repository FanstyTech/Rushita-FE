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
          title: 'Rousheta',
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
      completeRegistration: {
        title: 'Completa Tu Registro',
        subtitle: 'Crea una contraseña segura para completar la configuración de tu cuenta y unirte a la plataforma médica Rousheta.',
        formTitle: 'Crear Contraseña',
        formSubtitle: 'Configura una contraseña segura para tu cuenta',
        password: 'Contraseña',
        passwordPlaceholder: 'Crea una contraseña fuerte',
        confirmPassword: 'Confirmar Contraseña',
        confirmPasswordPlaceholder: 'Confirma tu contraseña',
        completeRegistration: 'Completar Registro',
        creatingAccount: 'Creando Cuenta...',
        alreadyHaveAccount: '¿Ya tienes una cuenta?',
        signInHere: 'Inicia sesión aquí',
        passwordRequirements: {
          title: 'Requisitos de Contraseña:',
          minLength: '• Al menos 8 caracteres de largo',
          mixedCase: '• Mezcla de letras mayúsculas y minúsculas',
          numbersSpecial: '• Incluir números y caracteres especiales',
          avoidCommon: '• Evitar palabras comunes o información personal',
        },
        validation: {
          passwordMinLength: 'La contraseña debe tener al menos 8 caracteres',
          confirmPasswordMinLength: 'Por favor confirma tu contraseña',
          passwordsDontMatch: 'Las contraseñas no coinciden',
        },
        features: {
          secure: {
            title: 'Seguro y Encriptado',
            description: 'Tu contraseña está encriptada con seguridad de nivel industrial',
          },
          hipaa: {
            title: 'Cumple con HIPAA',
            description: 'Cumpliendo estándares de protección de datos de salud',
          },
        },
        trustIndicators: {
          hipaaCompliant: 'Cumple con HIPAA',
          trustedClinics: 'Confiado por 60+ Clínicas',
        },
        branding: {
          title: 'Rousheta',
          subtitle: 'Gestión de Práctica Médica',
          welcome: 'Completa Tu',
          registration: 'Registro',
        },
      },
      registrationSuccess: {
        title: '¡Registro Exitoso!',
        subtitle: 'Gracias por unirte a Rousheta. Tu solicitud ha sido enviada y está siendo revisada.',
        welcome: 'Bienvenido a la',
        family: 'Familia Rousheta',
        description: 'Tu registro ha sido enviado exitosamente. Nuestro equipo revisará tu solicitud y te responderá pronto.',
        nextSteps: {
          checkEmail: {
            title: 'Revisa tu Email',
            description: 'Hemos enviado un email de confirmación con los siguientes pasos',
          },
          accountReview: {
            title: 'Revisión de Cuenta',
            description: 'Nuestro equipo revisará tu solicitud en 24-48 horas',
          },
          getStarted: {
            title: 'Comenzar',
            description: 'Una vez aprobado, recibirás credenciales de acceso',
          },
        },
        contactInfo: {
          title: '¿Necesitas Ayuda?',
          description: 'Nuestro equipo de soporte está aquí para ayudarte con cualquier pregunta.',
          emailSupport: 'Soporte por Email',
          whatsapp: 'WhatsApp',
        },
        status: {
          title: 'Solicitud Enviada',
          description: 'Te notificaremos una vez que tu cuenta sea aprobada',
        },
        actions: {
          goToLogin: 'Ir al Login',
          backToHome: 'Volver al Inicio',
        },
        trustIndicators: {
          hipaaCompliant: 'Cumple con HIPAA',
          trustedClinics: 'Confiado por 60+ Clínicas',
        },
        branding: {
          title: 'Rousheta',
          subtitle: 'Gestión de Práctica Médica',
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

    // Landing Page
    landing: {
      // Navigation
      nav: {
        home: 'Inicio',
        about: 'Acerca de Rousheta',
        features: 'Características',
        pricing: 'Precios',
        contact: 'Contáctanos',
        login: 'Iniciar Sesión',
        getStarted: 'Comenzar',
        language: 'Idioma',
        whyroshita: '¿Por qué Roshita?',
        services: 'Nuestros Servicios',
      },

      // Hero Section
      hero: {
        title: 'Sistema Inteligente de Gestión de Clínicas',
        subtitle:
          'Soluciones integrales para la gestión eficiente y fácil de clínicas médicas',
        description:
          'Una plataforma integral que te ayuda a gestionar pacientes, citas y registros médicos de manera profesional y eficiente',
        primaryButton: 'Comienza tu Prueba Gratuita',
        secondaryButton: 'Ver Demo',
        trustIndicators: {
          secure: 'Seguro y Protegido',
          timeSaving: 'Ahorra Tiempo',
          smart: 'Inteligente y Avanzado',
        },
        stats: {
          clinics: '60+ Clínicas',
          employees: '1947 Empleados',
          satisfaction: '99% Satisfacción del Cliente',
        },
        // HeroSection translations
        medicalBadge: 'Sistema Avanzado de Gestión de Clínicas',
        heroTitle: 'Clínica Inteligente',
        heroSubtitle: 'Comienza Aquí',
        heroDescription:
          'Con Rousheta, se acabó la era del papel y las demoras, y comienza la era de la organización y la comodidad',
        heroDescription2:
          'Desde la primera cita... hasta el último seguimiento – todo en su lugar',
        feature1: 'Programación Inteligente',
        feature2: 'Archivos Digitales',
        feature3: 'Seguimiento Integral',
        feature4: 'Informes Inteligentes',
        ctaButton1: 'Comienza Tu Prueba Gratuita',
        ctaButton2: 'Iniciar Sesión',
        trustIndicator1: 'Las Clínicas Confían en Nosotros',
        trustIndicator2: 'Usuarios Activos',
        trustIndicator3: 'Satisfacción del Cliente',
        medicalElement1: 'Estado del Paciente',
        medicalElement1Status: 'Estable ✓',
        medicalElement2: 'Citas de Hoy',
        medicalElement2Status: '12 Citas Programadas',
        medicalElement3: 'Examen Integral',
        medicalElement3Status: 'Completado',
      },
      featuresList: [
        'Programación de citas sin complicaciones. Sepa exactamente cuándo tiene disponibilidad y cuándo está ocupado.',
        'Archivo digital para cada paciente. No solo el historial médico, sino también sus notas.',
        'Notificaciones automáticas. Para el paciente, el médico y la clínica.',
        'Seguimiento remoto. ¿Su paciente está en casa? Puede hacer seguimiento desde su consultorio.',
        'Informes inteligentes. No solo números... sino información que lo ayuda a mejorar su clínica.',
      ],
      // Why Rousheta Section
      whyRushita: {
        title: '¿Por qué Rousheta?',
        subtitle:
          'Descubre cómo Rousheta puede transformar la gestión de tu clínica',
        learnMore: 'Saber Más',
        items: [
          {
            title:
              'Un paciente llamó preguntando sobre su condición... y la secretaria revisó los cuadernos.',
            description:
              'Con Rousheta, todos los datos del paciente están disponibles con un clic',
          },
          {
            title:
              'Un doctor busca el expediente de un paciente... y el archivo se perdió en algún lugar.',
            description:
              'Sistema electrónico integrado para almacenar y gestionar todos los archivos médicos',
          },
          {
            title:
              'Un paciente reservó una cita... olvidó la cita y no se presentó.',
            description:
              'Recordatorios automáticos para pacientes vía SMS y correo electrónico',
          },
        ],
      },

      // Value Proposition
      valueProposition: {
        title: 'Soluciones Integrales para Tu Clínica',
        subtitle:
          'Todo lo que necesitas para dirigir una clínica exitosa en un solo lugar',
        features: [
          'Gestión de pacientes y registros médicos',
          'Sistema de citas y recordatorios',
          'Informes y análisis',
          'Gestión de inventario y medicamentos',
          'Facturación y contabilidad',
          'Aplicación móvil para pacientes',
        ],
      },

      // CTA Section
      cta: {
        offer: 'Oferta Limitada Exclusiva',
        title: 'Obtén Tu Copia Ahora',
        subtitle:
          '¡Disfruta del descuento de por vida! Sé de los primeros y obtén 50% de descuento de por vida',
        offerBadge: ' Oferta Limitada - 50% Descuento de Por Vida',
        startYourJourney: 'Comienza Tu Viaje Médico Inteligente Hoy',
        button: 'Iniciar Prueba Gratuita Ahora',
        note: ' Sin Compromisos • Cancela en Cualquier Momento • Soporte Técnico Gratuito',
        benefits: [
          {
            title: 'Prueba Gratuita',
            description: '30 Días Completos',
          },
          {
            title: 'Configuración Rápida',
            description: 'En Minutos',
          },
          {
            title: 'Soporte Continuo',
            description: 'Disponible 24/7',
          },
        ],
        trustIndicators: [
          { title: 'Las Clínicas Confían en Nosotros' },
          { title: 'Tiempo de Actividad' },
          { title: 'Calificación del Usuario' },
        ],
      },

      // About Section
      about: {
        title: 'Nuestra Historia',
        subtitle: '¿Por qué Rousheta?',
        description:
          'Un sistema nacido del corazón de las clínicas, diseñado con profunda comprensión de las necesidades de médicos y pacientes',
        mainMessage: {
          title: 'No solo un sistema médico...',
          subtitle: 'Entendemos el dolor de la clínica',
        },
        storyCards: [
          {
            description:
              '"Rousheta" nació del corazón de una clínica.. Trabajamos con médicos, secretarias, pacientes y escuchamos todos los detalles, todas las luchas, y cada pequeño suspiro de la presión del día en la clínica.',
          },
          {
            description:
              'Regresamos y diseñamos el sistema no solo para ser "hermoso" únicamente! Sino para ser útil – rápido – realista – inteligente.',
          },
        ],
        keyFeatures: [
          { title: 'Fácil de Usar' },
          { title: 'Rápido e Inteligente' },
          { title: 'Seguro y Protegido' },
          { title: 'Soporte Continuo' },
        ],
        stats: [
          { title: 'Usuarios Activos' },
          { title: 'Las Clínicas Confían en Nosotros' },
        ],
        overlay: {
          title: 'Del Corazón de la Clínica',
          description: 'Experiencia real con médicos y pacientes',
        },
      },

      // Features Section
      features: {
        title: 'Nuestros Servicios Integrales',
        subtitle: '¿Qué Ofrecemos?',
        description:
          'Todo lo que necesitas... desde el primer "Hola Doctor" hasta el último "Gracias"',
        overlay: {
          title: 'Sistema Inteligente Integrado',
          description:
            'Experiencia perfecta para la gestión eficiente de clínicas',
        },
        bottomStats: [
          {
            title: 'Rápido',
            description: 'Configuración en Minutos',
          },
          {
            title: 'Confiable',
            description: 'Seguro y Protegido',
          },
        ],
      },

      // System Integration
      systemIntegration: {
        title: 'Integración Inteligente',
        subtitle: 'No solo un sistema...',
        description: 'Rousheta funciona como un equipo completo',
        note: 'Desde la entrada del paciente, hasta la programación de citas, hasta el diagnóstico, hasta la prescripción, hasta el seguimiento.. cada departamento en la clínica se comunica automáticamente con el otro',

        features: [
          'El médico ve las alertas de la secretaria',
          'El laboratorio recibe sus solicitudes propias',
          'El contador sabe automáticamente el estado de la factura',
        ],
        hub: {
          title: 'Rousheta',
          description: 'Centro Inteligente',
        },
        satellite: {
          doctor: 'Doctor',
          lab: 'Laboratorio',
          accountant: 'Contador',
          secretary: 'Secretaria',
        },
        bottomStats: [
          { title: 'Integración Automática' },
          { title: 'Operación Continua' },
          { title: 'Errores Humanos' },
        ],
      },

      // Final CTA
      finalCta: {
        badge: 'Listo para Lanzar Contigo',
        title: 'Tu Sistema Médico',
        subtitle: 'En Tus Manos Ahora',
        description:
          'Desde el primer paciente hasta el último informe, desde la programación de citas hasta la gestión financiera - Rousheta transforma tu clínica en un sistema inteligente integrado',
        features: [
          { title: 'Configuración Rápida' },
          { title: 'Rápido e Inteligente' },
          { title: 'Seguro y Protegido' },
          { title: 'Soporte 24/7' },
        ],
        subscription: {
          title: 'Planes de Suscripción',
          description:
            'Elige el plan que se adapte a las necesidades de tu clínica',
          monthly: 'Mensual',
          yearly: 'Anual',
          save: 'Ahorra',
          perMonth: 'mes',
          perYear: 'año',
          saveAmount: 'Ahorra {{amount}}$',
          startTrial: 'Comienza Tu Prueba Gratuita Ahora',
          offer: 'Oferta Limitada',
          trialNote:
            '✨ Prueba gratuita de 30 días • Cancela en cualquier momento',
          professional: {
            planName: 'Paquete Integral',
            subtitle:
              'Todo lo que necesitas para una clínica inteligente y avanzada',
            popular: 'Más Popular',
            features: {
              patientManagement: 'Gestión integral de pacientes y citas',
              financialSystem: 'Sistema financiero integrado con informes',
              medicalRecords: 'Expedientes médicos digitales seguros',
              automatedReminders: 'Recordatorios automáticos para pacientes',
              support: 'Soporte técnico 24/7',
              lifetimeUpdates: 'Actualizaciones gratuitas de por vida',
            },
            highlights: {
              quickSetup: 'Configuración Rápida',
              secure: 'Protección Certificada',
              support: 'Soporte Inmediato',
            },
          },
          basic: {
            planName: 'Paquete Básico',
            subtitle: 'Ideal para pequeñas clínicas y profesionales',
            features: {
              patientManagement: 'Gestión básica de pacientes y citas',
              medicalRecords: 'Expedientes médicos digitales básicos',
              support: 'Soporte por correo electrónico',
            },
            highlights: {
              easyToUse: 'Fácil de Usar',
              affordable: 'Accesible',
              scalable: 'Escalable',
            },
          },
          enterprise: {
            planName: 'Paquete Empresarial',
            subtitle: 'Diseñado para grandes clínicas y hospitales',
            features: {
              patientManagement: 'Gestión avanzada de pacientes y citas',
              financialSystem:
                'Sistema financiero integrado con informes avanzados',
              medicalRecords: 'Expedientes médicos digitales avanzados',
              automatedReminders: 'Recordatorios automáticos para pacientes',
              support: 'Soporte técnico 24/7',
              lifetimeUpdates: 'Actualizaciones gratuitas de por vida',
              customSolutions: 'Soluciones personalizadas',
            },
            highlights: {
              advancedFeatures: 'Características Avanzadas',
              dedicatedSupport: 'Soporte Dedicado',
              customizable: 'Personalizable',
            },
          },
        },
        trustIndicators: [
          { title: 'Las Clínicas Confían en Nosotros' },
          { title: 'Tiempo de Actividad' },
          { title: 'Soporte Técnico' },
        ],
      },

      footer: {
        companyInfo: {
          description:
            'Sistema de gestión de clínicas inteligente que hace que tu jornada laboral sea más fácil y organizada. Desde la primera cita hasta el último seguimiento.',
          email: 'contact@rousheta.net',
          phone: '+966 50 123 4567',
          address: 'Riad, Arabia Saudita',
        },
        quickLinks: 'Enlaces Rápidos',
        contactUs: 'Contáctenos',
        newsletter: {
          title: 'Suscríbete a nuestro boletín',
          placeholder: 'Tu dirección de correo electrónico',
          subscribe: 'Suscribirse',
          privacyNote:
            'Nunca compartiremos tu correo electrónico con nadie más.',
        },

        socialMedia: 'Síguenos',
        rights: '© {year} Rousheta. Todos los derechos reservados.',
        terms: 'Términos de Servicio',
        privacy: 'Política de Privacidad',
        scrollToTop: 'Volver arriba',
        supportResources: {
          title: 'Soporte y Recursos',
          helpCenter: 'Centro de Ayuda',
          faq: 'Preguntas Frecuentes',
          userGuide: 'Guía del Usuario',
          contactUs: 'Contáctanos',
        },
        allRightsReserved: 'Todos los derechos reservados',
        termsConditions: 'Términos y Condiciones',
        usagePolicy: 'Política de Uso',
        privacyPolicy: 'Política de Privacidad',
      },
      projectName: 'Rousheta',
    },
  },
};
