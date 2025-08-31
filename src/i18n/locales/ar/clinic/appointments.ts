export const clinicAppointments = {
  // Page title
  pageTitle: 'المواعيد',
  description: 'إدارة مواعيد العيادة وجدولة المرضى',

  // View modes
  viewModes: {
    schedule: 'التقويم',
    kanban: 'لوحة المهام',
  },

  // Header actions
  actions: {
    addNew: 'موعد جديد',
    scheduleNew: 'جدولة موعد جديد',
    edit: 'تعديل الموعد',
    delete: 'حذف الموعد',
    startVisit: 'بدء الزيارة',
    showDetails: 'عرض التفاصيل',
  },

  // Appointment statuses
  statuses: {
    pending: 'في الانتظار',
    scheduled: 'مجدول',
    confirmed: 'مؤكد',
    inProgress: 'قيد التنفيذ',
    completed: 'مكتمل',
    cancelled: 'ملغي',
    noShow: 'لم يحضر',
  },

  // Visit types
  visitTypes: {
    new: 'زيارة جديدة',
    followUp: 'زيارة متابعة',
    emergency: 'طوارئ',
    consultation: 'استشارة',
  },

  // Form labels

  form: {
    patient: 'المريض',
    staff: 'الطبيب',
    date: 'التاريخ',
    startTime: 'وقت البداية',
    endTime: 'وقت النهاية',
    type: 'نوع الزيارة',
    status: 'الحالة',
    notes: 'ملاحظات',
    selectPatient: 'اختر المريض',
    selectStaff: 'اختر الطبيب',
    createNewAppointment: 'إنشاء موعد جديد',
    fillDetailsToSchedule: 'املأ التفاصيل لجدولة موعد جديد',
    staffInformation: 'معلومات الطاقم',
    searchSelectStaff: 'ابحث واختر عضو الطاقم...',
    noStaffFound: 'لم يتم العثور على طاقم',
    typeToSearchStaff: 'اكتب للبحث عن الطاقم',
    selectedStaffMember: 'عضو الطاقم المختار',
    searchSelectPatient: 'ابحث واختر المريض...',
    noPatientsFound: 'لم يتم العثور على مرضى',
    typeToSearchPatients: 'اكتب للبحث عن المرضى',
    selectedPatient: 'المريض المختار',
    patientName: 'اسم المريض',
    patientPhone: 'رقم هاتف المريض',
    appointmentDate: 'تاريخ الموعد',
    appointmentTime: 'وقت الموعد',
    duration: 'المدة',
    visitType: 'نوع الزيارة',
    save: 'حفظ',
    cancel: 'إلغاء',
    required: 'مطلوب',
    selectVisitType: 'اختر نوع الزيارة',
    selectStatus: 'اختر الحالة',
    placeholder: {
      patientName: 'أدخل اسم المريض',
      patientPhone: 'أدخل رقم الهاتف',
      notes: 'أدخل ملاحظات إضافية حول الموعد...',
    },
    validation: {
      required: 'هذا الحقل مطلوب',
      invalidPhone: 'رقم الهاتف غير صحيح',
      invalidTime: 'الوقت غير صحيح',
      endTimeBeforeStart: 'وقت النهاية يجب أن يكون بعد وقت البداية',
    },
  },
  // Modal titles
  modals: {
    scheduleNew: 'جدولة موعد جديد',
    editAppointment: 'تعديل الموعد',
    appointmentDetails: 'تفاصيل الموعد',
    deleteConfirmation: 'تأكيد الحذف',
  },

  // Buttons
  buttons: {
    cancel: 'إلغاء',
    save: 'حفظ',
    update: 'تحديث',
    delete: 'حذف',
    schedule: 'جدولة',
    updateAppointment: 'تحديث الموعد',
    scheduleAppointment: 'جدولة الموعد',
  },

  // Messages
  messages: {
    selectPatient: 'يرجى اختيار مريض',
    selectStaff: 'يرجى اختيار طبيب',
    invalidTime: 'وقت النهاية يجب أن يكون بعد وقت البداية',
    deleteConfirmation: 'هل أنت متأكد من حذف هذا الموعد؟',
    deleteWarning: 'هذا الإجراء لا يمكن التراجع عنه.',
    noAppointments: 'لا توجد مواعيد',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ في تحميل البيانات',
  },

  // Filters
  filters: {
    searchPlaceholder: 'البحث عن مريض...',
    doctors: 'الأطباء',
    treatments: 'العلاجات',
    statuses: 'الحالات',
    dateRange: 'نطاق التاريخ',
    clearFilters: 'مسح المرشحات',
  },

  // Calendar
  calendar: {
    today: 'اليوم',
    week: 'الأسبوع',
    month: 'الشهر',
    day: 'اليوم',
    agenda: 'جدول الأعمال',
  },

  // Kanban columns
  kanban: {
    pending: 'في الانتظار',
    scheduled: 'مجدول',
    confirmed: 'مؤكد',
    inProgress: 'قيد التنفيذ',
    completed: 'مكتمل',
    cancelled: 'ملغي',
    noShow: 'لم يحضر',
  },

  // Appointment details
  details: {
    patientInfo: 'معلومات المريض',
    appointmentInfo: 'معلومات الموعد',
    medicalHistory: 'التاريخ الطبي',
    previousVisits: 'الزيارات السابقة',
    notes: 'ملاحظات',
    attachments: 'المرفقات',
    close: 'إغلاق',
    patientId: 'رقم المريض',
    appointmentId: 'رقم الموعد',
    createdAt: 'تاريخ الإنشاء',
    updatedAt: 'تاريخ التحديث',
    startVisit: 'بدء الزيارة',
    dateTime: 'التاريخ والوقت',
    duration: 'المدة',
    minutes: 'دقائق',
    assignedDoctor: 'الطبيب المعين',
    staffId: 'رقم الطاقم',
    available: 'متاح',
    patientDetails: 'تفاصيل المريض',
    contactAvailable: 'جهة الاتصال متاحة',
    treatment: 'العلاج',
  },

  // Calendar view
  calendarView: {
    today: 'اليوم',
    doctor: 'الطبيب',
    schedule: 'الجدولة',
    treatment: 'العلاج',
    prostheticTooth: 'سن صناعي',
    postSurgicalCare: 'رعاية ما بعد الجراحة',
    seePatientDetails: 'عرض تفاصيل المريض',
  },

  // AppointmentCard
  appointmentCard: {
    stats: {
      totalAppointments: 'إجمالي المواعيد',
      todayAppointments: 'مواعيد اليوم',
      pendingAppointments: 'المواعيد المعلقة',
      completedAppointments: 'المواعيد المكتملة',
    },
    filters: {
      all: 'الكل',
      today: 'اليوم',
      thisWeek: 'هذا الأسبوع',
      thisMonth: 'هذا الشهر',
    },
    views: {
      kanban: 'كانبان',
      calendar: 'التقويم',
      list: 'القائمة',
    },
    buttons: {
      newAppointment: 'موعد جديد',
      schedule: 'جدولة',
      export: 'تصدير',
      filter: 'تصفية',
      search: 'بحث',
    },
    actions: {
      edit: 'تعديل',
      delete: 'حذف',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      start: 'بدء',
      complete: 'إكمال',
      reschedule: 'إعادة جدولة',
      viewDetails: 'عرض التفاصيل',
    },
    statuses: {
      pending: 'معلق',
      scheduled: 'مجدول',
      confirmed: 'مؤكد',
      inProgress: 'قيد التنفيذ',
      completed: 'مكتمل',
      cancelled: 'ملغي',
      noShow: 'لم يحضر',
    },
    visitTypes: {
      new: 'مريض جديد',
      followUp: 'متابعة',
      emergency: 'طارئ',
      consultation: 'استشارة',
    },
    kanban: {
      pending: 'معلق',
      scheduled: 'مجدول',
      confirmed: 'مؤكد',
      inProgress: 'قيد التنفيذ',
      completed: 'مكتمل',
      cancelled: 'ملغي',
    },
    messages: {
      noAppointments: 'لا توجد مواعيد',
      noAppointmentsInColumn: 'لا توجد مواعيد في هذا العمود',
      loadingAppointments: 'جاري تحميل المواعيد...',
      errorLoadingAppointments: 'خطأ في تحميل المواعيد',
      appointmentCreated: 'تم إنشاء الموعد بنجاح',
      appointmentUpdated: 'تم تحديث الموعد بنجاح',
      appointmentDeleted: 'تم حذف الموعد بنجاح',
      appointmentCancelled: 'تم إلغاء الموعد بنجاح',
      appointmentConfirmed: 'تم تأكيد الموعد بنجاح',
      appointmentCompleted: 'تم إكمال الموعد بنجاح',
    },

    details: {
      patientInfo: 'معلومات المريض',
      appointmentInfo: 'معلومات الموعد',
      medicalHistory: 'التاريخ الطبي',
      previousVisits: 'الزيارات السابقة',
      notes: 'ملاحظات',
      attachments: 'المرفقات',
      close: 'إغلاق',
      patientId: 'رقم المريض',
      appointmentId: 'رقم الموعد',
      createdAt: 'تاريخ الإنشاء',
      updatedAt: 'تاريخ التحديث',
    },
    calendar: {
      today: 'اليوم',
      month: 'الشهر',
      week: 'الأسبوع',
      day: 'اليوم',
      agenda: 'جدول الأعمال',
      noEventsInRange: 'لا توجد أحداث في هذا النطاق',
      showMore: 'عرض المزيد',
    },
    search: {
      placeholder: 'البحث عن المواعيد...',
      byPatientName: 'بحث باسم المريض',
      byStaffName: 'بحث باسم الطبيب',
      byStatus: 'بحث بالحالة',
      noResults: 'لا توجد نتائج',
      clearSearch: 'مسح البحث',
    },
    export: {
      title: 'تصدير المواعيد',
      format: 'تنسيق التصدير',
      dateRange: 'نطاق التاريخ',
      includeDetails: 'تضمين التفاصيل',
      download: 'تحميل',
      excel: 'إكسل',
      pdf: 'PDF',
      csv: 'CSV',
    },
  },
};
