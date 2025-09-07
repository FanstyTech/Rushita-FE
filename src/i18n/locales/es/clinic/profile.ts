export const profile = {
  title: 'Perfil de la Clínica',
  description: 'Gestionar información de la clínica y configuraciones básicas',

  buttons: {
    edit: 'Editar Perfil',
    cancel: 'Cancelar',
    save: 'Guardar Cambios',
  },

  sections: {
    basicInfo: {
      title: 'Información Básica',
      description: 'Información básica de la clínica y detalles de contacto',
    },
    location: {
      title: 'Información de Ubicación',
      description: 'Dirección de la clínica y ubicación geográfica',
    },
    workingHours: {
      title: 'Horarios de Trabajo',
      description:
        'Establecer horarios de funcionamiento de la clínica durante la semana',
    },
    specialties: {
      title: 'Especialidades',
      description: 'Especialidades médicas disponibles en la clínica',
    },
    socialMedia: {
      title: 'Redes Sociales',
      description: 'Enlaces de redes sociales y sitio web',
    },
  },

  form: {
    labels: {
      nameArabic: 'Nombre de la Clínica (Árabe)',
      nameEnglish: 'Nombre de la Clínica (Inglés)',
      email: 'Dirección de Correo Electrónico',
      phoneNumber: 'Número de Teléfono',
      bio: 'Acerca de la Clínica',
      country: 'País',
      city: 'Ciudad',
      address: 'Dirección Completa',
      website: 'Sitio Web',
      facebook: 'Facebook',
      twitter: 'Twitter',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      youtube: 'YouTube',
    },
    placeholders: {
      selectCountry: 'Seleccionar País',
      selectCity: 'Seleccionar Ciudad',
      website: 'https://www.ejemplo.com',
      facebook: 'https://facebook.com/clinica',
      twitter: 'https://twitter.com/clinica',
      instagram: 'https://instagram.com/clinica',
      linkedin: 'https://linkedin.com/company/clinica',
      youtube: 'https://youtube.com/clinica',
    },
  },

  workingHours: {
    to: 'a',
    closed: 'Cerrado',
  },

  errors: {
    loadingProfile: 'Error al cargar datos de la clínica',
    savingProfile: 'Error al guardar datos de la clínica',
  },

  loading: {
    profile: 'Cargando perfil de la clínica...',
    saving: 'Guardando cambios...',
  },

  validation: {
    nameArabicRequired: 'El nombre de la clínica en árabe es requerido',
    nameArabicMinLength:
      'El nombre de la clínica en árabe debe tener al menos 3 caracteres',
    nameEnglishRequired: 'El nombre de la clínica en inglés es requerido',
    nameEnglishMinLength:
      'El nombre de la clínica en inglés debe tener al menos 3 caracteres',
    emailRequired: 'La dirección de correo electrónico es requerida',
    emailInvalid: 'Dirección de correo electrónico inválida',
    phoneRequired: 'El número de teléfono es requerido',
    phoneMinLength: 'El número de teléfono debe tener al menos 8 dígitos',
    bioRequired: 'La descripción de la clínica es requerida',
    urlInvalid: 'URL inválida',
  },
};
