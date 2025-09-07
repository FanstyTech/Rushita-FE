export const staff = {
  title: 'Gestión de Personal',
  description: 'Gestionar personal de la clínica y permisos',

  filters: {
    specialty: 'Especialidad',
    allSpecialties: 'Todas las Especialidades',
    searchPlaceholder: 'Buscar en personal de la clínica',
  },

  emptyState: {
    title: 'No hay Personal',
    description:
      'Comience agregando su primer miembro del personal a la clínica',
    buttonText: 'Agregar Personal',
  },

  actions: {
    addStaff: 'Agregar Personal',
    editStaff: 'Editar Personal',
    changePassword: 'Cambiar Contraseña',
    resendActivationEmail: 'Reenviar Email de Activación',
    managePermissions: 'Gestionar Permisos',
    endSession: 'Finalizar Sesión',
    deleteStaff: 'Eliminar Personal',
    sending: 'Enviando...',
  },

  deleteModal: {
    title: 'Eliminar Personal',
    message:
      '¿Está seguro de que desea eliminar este miembro del personal? Esta acción no se puede deshacer.',
    cancel: 'Cancelar',
    confirm: 'Eliminar Personal',
  },

  endSessionModal: {
    title: 'Finalizar Sesión de Usuario',
    message:
      '¿Está seguro de que desea finalizar la sesión de este usuario? Se cerrará su sesión inmediatamente.',
  },

  changePasswordModal: {
    title: 'Cambiar Contraseña',
    newPasswordLabel: 'Nueva Contraseña',
    changePasswordButton: 'Cambiar Contraseña',
    passwordRequired: 'La contraseña es requerida',
    passwordMinLength: 'La contraseña debe tener al menos 6 caracteres',
  },

  staffForm: {
    addTitle: 'Agregar Nuevo Personal',
    editTitle: 'Editar Personal',
    firstNameForeign: 'Primer Nombre (Extranjero)',
    lastNameForeign: 'Apellido (Extranjero)',
    firstNameArabic: 'Primer Nombre (Árabe)',
    lastNameArabic: 'Apellido (Árabe)',
    email: 'Correo Electrónico',
    joinDate: 'Fecha de Ingreso',
    staffType: 'Tipo de Personal',
    specialty: 'Especialidad',
    allSpecialties: 'Todas las Especialidades',
    cancel: 'Cancelar',
    addButton: 'Agregar Personal',
    updateButton: 'Actualizar Personal',
    firstNameForeignRequired: 'El primer nombre en latín es requerido',
    lastNameForeignRequired: 'El apellido en latín es requerido',
    firstNameArabicRequired: 'El primer nombre en árabe es requerido',
    lastNameArabicRequired: 'El apellido en árabe es requerido',
    invalidEmail: 'Dirección de correo electrónico inválida',
    staffTypeRequired: 'El tipo de personal es requerido',
    specialtyRequired: 'La especialidad es requerida',
  },

  managePermissionsModal: {
    title: 'Gestionar Permisos - {{staffName}}',
    loadingTitle: 'Cargando permisos...',
    errorTitle: 'Error',
    errorMessage: 'Error al cargar permisos',
    close: 'Cerrar',
    quickActions: 'Acciones Rápidas',
    bulkSelection: 'Selección Masiva',
    selectAllPermissions: 'Seleccionar Todos los Permisos',
    clearAllSelections: 'Limpiar Todas las Selecciones',
    smartSelection: 'Selección Inteligente',
    selectCurrentlyGranted: 'Seleccionar Actualmente Otorgados',
    selectNonGrantedOnly: 'Seleccionar Solo No Otorgados',
    moduleManagement: 'Gestión de Módulos',
    expandAllModules: 'Expandir Todos los Módulos',
    collapseAllModules: 'Contraer Todos los Módulos',
    totalPermissions: 'Permisos Totales',
    currentlyGranted: 'Actualmente Otorgados',
    selected: 'Seleccionados',
    modules: 'Módulos',
    notesLabel: 'Notas (Opcional)',
    notesPlaceholder: 'Agregar notas sobre los permisos otorgados...',
    total: 'Total',
    granted: 'Otorgados',
    selectAll: 'Seleccionar Todo',
    clearAll: 'Limpiar Todo',
    currentlyGrantedBadge: 'Actualmente Otorgado',
    expires: 'Expira',
    notes: 'Notas',
    totalSelectedPermissions: 'Total de Permisos Seleccionados',
    outOf: 'de',
    availablePermissions: 'permisos disponibles',
    modulesDisplayed: 'módulos mostrados',
    cancel: 'Cancelar',
    savePermissions: 'Guardar Permisos',
  },

  leaves: {
    title: 'Gestión de Permisos',
    description: 'Gestionar solicitudes de permisos del personal',

    filters: {
      type: 'Tipo',
      allTypes: 'Todos los Tipos',
      status: 'Estado',
      allStatus: 'Todos los Estados',
      searchPlaceholder: 'Buscar en solicitudes de permiso',
    },

    emptyState: {
      title: 'No se Encontraron Solicitudes de Permiso',
      description: 'Comience agregando su primera solicitud de permiso',
      buttonText: 'Agregar Solicitud de Permiso',
    },

    actions: {
      addLeave: 'Agregar Solicitud de Permiso',
      editLeave: 'Editar Permiso',
      deleteLeave: 'Eliminar Permiso',
      approve: 'Aprobar',
      reject: 'Rechazar',
      cancel: 'Cancelar',
      submit: 'Enviar',
      update: 'Actualizar',
    },

    form: {
      title: 'Nueva Solicitud de Permiso',
      editTitle: 'Editar Solicitud de Permiso',
      staffMember: 'Miembro del Personal',
      startDate: 'Fecha de Inicio',
      endDate: 'Fecha de Fin',
      leaveType: 'Tipo de Permiso',
      reason: 'Razón',
      cancel: 'Cancelar',
      submit: 'Enviar',
      update: 'Actualizar',
    },

    deleteModal: {
      title: 'Eliminar Elemento',
      message: '¿Está seguro de que desea eliminar este elemento?',
      secondaryMessage: 'Esta acción no se puede deshacer.',
      confirm: 'Eliminar',
    },

    status: {
      pending: 'Pendiente',
      approved: 'Aprobado',
      rejected: 'Rechazado',
      cancelled: 'Cancelado',
    },

    types: {
      annual: 'Permiso Anual',
      sick: 'Permiso por Enfermedad',
      maternity: 'Permiso de Maternidad',
      paternity: 'Permiso de Paternidad',
      emergency: 'Permiso de Emergencia',
      unpaid: 'Permiso sin Sueldo',
      study: 'Permiso de Estudio',
      compassionate: 'Permiso de Compasión',
    },
  },

  errors: {
    accessDenied: 'Acceso denegado: No hay clínica asociada con este usuario.',
    loadingStaff: 'Error al cargar datos del personal',
    deletingStaff: 'Error al eliminar miembro del personal',
    updatingPassword: 'Error al actualizar contraseña',
    resendingEmail: 'Error al reenviar email de activación',
  },

  loading: {
    staff: 'Cargando personal...',
    deleting: 'Eliminando...',
    updating: 'Actualizando...',
  },

  status: {
    active: 'Activo',
    inactive: 'Inactivo',
    pending: 'Pendiente',
    suspended: 'Suspendido',
  },

  validation: {
    staffRequired: 'El miembro del personal es requerido',
    startDateRequired: 'La fecha de inicio es requerida',
    endDateRequired: 'La fecha de fin es requerida',
    leaveTypeRequired: 'El tipo de permiso es requerido',
    reasonRequired: 'La razón es requerida',
    endDateAfterStart:
      'La fecha de fin debe ser posterior a la fecha de inicio',
  },
};
