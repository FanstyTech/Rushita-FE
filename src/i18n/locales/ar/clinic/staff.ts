export const staff = {
  title: 'إدارة الموظفين',
  description: 'إدارة موظفي العيادة والصلاحيات',

  filters: {
    specialty: 'التخصص',
    allSpecialties: 'جميع التخصصات',
    searchPlaceholder: 'البحث في موظفين العيادة',
  },

  emptyState: {
    title: 'لا يوجد موظفين',
    description: 'ابدأ بإضافة أول موظف في العيادة',
    buttonText: 'إضافة موظف',
  },

  actions: {
    addStaff: 'إضافة موظف',
    editStaff: 'تعديل الموظف',
    changePassword: 'تغيير كلمة المرور',
    resendActivationEmail: 'إعادة إرسال بريد التفعيل',
    managePermissions: 'إدارة الصلاحيات',
    endSession: 'إنهاء الجلسة',
    deleteStaff: 'حذف الموظف',
    sending: 'جاري الإرسال...',
  },

  deleteModal: {
    title: 'حذف الموظف',
    message: 'هل أنت متأكد من حذف هذا الموظف؟ لا يمكن التراجع عن هذا الإجراء.',
    cancel: 'إلغاء',
    confirm: 'حذف الموظف',
  },

  endSessionModal: {
    title: 'إنهاء جلسة المستخدم',
    message: 'هل أنت متأكد من إنهاء جلسة هذا المستخدم؟ سيتم تسجيل خروجه فوراً.',
  },

  changePasswordModal: {
    title: 'تغيير كلمة المرور',
    newPasswordLabel: 'كلمة المرور الجديدة',
    changePasswordButton: 'تغيير كلمة المرور',
    passwordRequired: 'كلمة المرور مطلوبة',
    passwordMinLength: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
  },

  staffForm: {
    addTitle: 'إضافة موظف جديد',
    editTitle: 'تعديل الموظف',
    firstNameForeign: 'الاسم الأول (أجنبي)',
    lastNameForeign: 'اسم العائلة (أجنبي)',
    firstNameArabic: 'الاسم الأول (عربي)',
    lastNameArabic: 'اسم العائلة (عربي)',
    email: 'البريد الإلكتروني',
    joinDate: 'تاريخ الانضمام',
    staffType: 'نوع الموظف',
    specialty: 'التخصص',
    allSpecialties: 'جميع التخصصات',
    cancel: 'إلغاء',
    addButton: 'إضافة موظف',
    updateButton: 'تحديث موظف',
    firstNameForeignRequired: 'الاسم الأول بالأحرف الأجنبية مطلوب',
    lastNameForeignRequired: 'اسم العائلة بالأحرف الأجنبية مطلوب',
    firstNameArabicRequired: 'الاسم الأول بالعربية مطلوب',
    lastNameArabicRequired: 'اسم العائلة بالعربية مطلوب',
    invalidEmail: 'عنوان بريد إلكتروني غير صحيح',
    staffTypeRequired: 'نوع الموظف مطلوب',
    specialtyRequired: 'التخصص مطلوب',
  },

  managePermissionsModal: {
    title: 'إدارة الصلاحيات - {{staffName}}',
    loadingTitle: 'جاري تحميل الصلاحيات...',
    errorTitle: 'خطأ',
    errorMessage: 'فشل في تحميل الصلاحيات',
    close: 'إغلاق',
    quickActions: 'الإجراءات السريعة',
    bulkSelection: 'التحديد المجمع',
    selectAllPermissions: 'تحديد جميع الصلاحيات',
    clearAllSelections: 'إلغاء جميع التحديدات',
    smartSelection: 'التحديد الذكي',
    selectCurrentlyGranted: 'تحديد الممنوحة حالياً',
    selectNonGrantedOnly: 'تحديد غير الممنوحة فقط',
    moduleManagement: 'إدارة الوحدات',
    expandAllModules: 'توسيع جميع الوحدات',
    collapseAllModules: 'طي جميع الوحدات',
    totalPermissions: 'إجمالي الصلاحيات',
    currentlyGranted: 'ممنوحة حالياً',
    selected: 'محددة',
    modules: 'الوحدات',
    notesLabel: 'ملاحظات (اختيارية)',
    notesPlaceholder: 'أضف ملاحظات حول الصلاحيات الممنوحة...',
    total: 'الإجمالي',
    granted: 'ممنوحة',
    selectAll: 'تحديد الكل',
    clearAll: 'إلغاء الكل',
    currentlyGrantedBadge: 'ممنوحة حالياً',
    expires: 'تنتهي في',
    notes: 'ملاحظات',
    totalSelectedPermissions: 'إجمالي الصلاحيات المحددة',
    outOf: 'من أصل',
    availablePermissions: 'صلاحية متاحة',
    modulesDisplayed: 'وحدة معروضة',
    cancel: 'إلغاء',
    savePermissions: 'حفظ الصلاحيات',
  },

  leaves: {
    title: 'إدارة الإجازات',
    description: 'إدارة طلبات إجازات الموظفين',

    filters: {
      type: 'النوع',
      allTypes: 'جميع الأنواع',
      status: 'الحالة',
      allStatus: 'جميع الحالات',
      searchPlaceholder: 'بحث في طلبات الإجازات',
    },

    emptyState: {
      title: 'لا توجد طلبات إجازة',
      description: 'ابدأ بإضافة أول طلب إجازة',
      buttonText: 'إضافة طلب إجازة',
    },

    actions: {
      addLeave: 'إضافة طلب إجازة',
      editLeave: 'تعديل الإجازة',
      deleteLeave: 'حذف الإجازة',
      approve: 'موافقة',
      reject: 'رفض',
      cancel: 'إلغاء',
      submit: 'إرسال',
      update: 'تحديث',
    },

    form: {
      title: 'طلب إجازة جديد',
      editTitle: 'تعديل طلب الإجازة',
      staffMember: 'الموظف',
      startDate: 'تاريخ البداية',
      endDate: 'تاريخ النهاية',
      leaveType: 'نوع الإجازة',
      reason: 'السبب',
      cancel: 'إلغاء',
      submit: 'إرسال',
      update: 'تحديث',
    },

    deleteModal: {
      title: 'حذف العنصر',
      message: 'هل أنت متأكد من حذف هذا العنصر؟',
      secondaryMessage: 'لا يمكن التراجع عن هذا الإجراء.',
      confirm: 'حذف',
    },

    status: {
      pending: 'في الانتظار',
      approved: 'موافق عليها',
      rejected: 'مرفوضة',
      cancelled: 'ملغاة',
    },

    types: {
      annual: 'إجازة سنوية',
      sick: 'إجازة مرضية',
      maternity: 'إجازة أمومة',
      paternity: 'إجازة أبوة',
      emergency: 'إجازة طارئة',
      unpaid: 'إجازة بدون راتب',
      study: 'إجازة دراسة',
      compassionate: 'إجازة عاطفية',
    },
  },

  errors: {
    accessDenied: 'الوصول مرفوض: لا توجد عيادة مرتبطة بهذا المستخدم.',
    loadingStaff: 'خطأ في تحميل بيانات الموظفين',
    deletingStaff: 'خطأ في حذف الموظف',
    updatingPassword: 'خطأ في تحديث كلمة المرور',
    resendingEmail: 'خطأ في إعادة إرسال بريد التفعيل',
  },

  loading: {
    staff: 'جاري تحميل الموظفين...',
    deleting: 'جاري الحذف...',
    updating: 'جاري التحديث...',
  },

  status: {
    active: 'نشط',
    inactive: 'غير نشط',
    pending: 'في الانتظار',
    suspended: 'موقوف',
  },

  validation: {
    staffRequired: 'الموظف مطلوب',
    startDateRequired: 'تاريخ البداية مطلوب',
    endDateRequired: 'تاريخ النهاية مطلوب',
    leaveTypeRequired: 'نوع الإجازة مطلوب',
    reasonRequired: 'السبب مطلوب',
    endDateAfterStart: 'تاريخ النهاية يجب أن يكون بعد تاريخ البداية',
  },
};
