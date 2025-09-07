export const visits = {
  title: 'الزيارات',
  description: 'إدارة زيارات المرضى والمتابعة الطبية',

  // Table columns
  table: {
    columns: {
      visitNumber: 'رقم الزيارة',
      patientName: 'اسم المريض',
      doctor: 'الطبيب',
      date: 'التاريخ',
      type: 'نوع الزيارة',
      status: 'الحالة',
      actions: 'الإجراءات',
    },
  },

  // Filter options
  filters: {
    searchPlaceholder: 'البحث في الزيارات...',
    statusFilter: 'الحالة',
    allStatus: 'جميع الحالات',
  },

  // Action buttons and tooltips
  actions: {
    addNew: 'إضافة زيارة جديدة',
    view: 'عرض تفاصيل الزيارة',
    edit: 'تعديل تفاصيل الزيارة',
    delete: 'حذف الزيارة',
    editVisit: 'تعديل الزيارة',
    goBack: 'العودة',
    printSummary: 'طباعة ملخص الزيارة',
  },

  // Visit types
  visitTypes: {
    consultation: 'استشارة',
    followUp: 'متابعة',
    emergency: 'طوارئ',
    checkup: 'فحص دوري',
    procedure: 'إجراء طبي',
    vaccination: 'تطعيم',
    therapy: 'علاج طبيعي',
    new: 'زيارة جديدة',
    followup: 'زيارة متابعة',
  },

  // Visit statuses
  statuses: {
    scheduled: 'مجدولة',
    inProgress: 'جارية',
    completed: 'مكتملة',
    cancelled: 'ملغية',
    noShow: 'لم يحضر',
    rescheduled: 'معاد جدولتها',
  },

  // Delete confirmation modal
  deleteModal: {
    title: 'حذف الزيارة',
    message: 'هل أنت متأكد من رغبتك في حذف هذه الزيارة؟',
    secondaryMessage: 'لا يمكن التراجع عن هذا الإجراء.',
    confirmText: 'حذف',
    cancelText: 'إلغاء',
  },

  // Loading states
  loading: {
    visits: 'جاري تحميل الزيارات...',
    deleting: 'جاري حذف الزيارة...',
    processing: 'جاري المعالجة...',
    loadingVisit: 'جاري تحميل بيانات الزيارة...',
    loadingAppointment: 'جاري تحميل بيانات الموعد...',
    saving: 'جاري الحفظ...',
  },

  // Success/Error messages
  messages: {
    visitDeleted: 'تم حذف الزيارة بنجاح',
    visitUpdated: 'تم تحديث الزيارة بنجاح',
    visitCreated: 'تم إنشاء الزيارة بنجاح',
    errorLoading: 'خطأ في تحميل الزيارات',
    errorDeleting: 'خطأ في حذف الزيارة',
    errorUpdating: 'خطأ في تحديث الزيارة',
    failedToLoad: 'فشل في تحميل تفاصيل الزيارة.',
    visitNotFound: 'الزيارة غير موجودة.',
  },

  // Empty states
  emptyStates: {
    noVisits: 'لا توجد زيارات',
    noVisitsDescription:
      'لم يتم العثور على أي زيارات. ابدأ بإضافة زيارة جديدة.',
    noResults: 'لا توجد نتائج',
    noResultsDescription: 'لم يتم العثور على زيارات تطابق معايير البحث.',
  },

  // Visit Form
  form: {
    // Section titles
    sections: {
      treatmentInformation: 'معلومات العلاج',
      attachments: 'المرفقات',
    },

    // Form labels and placeholders
    labels: {
      linkedToAppointment: 'مرتبط بالموعد:',
    },

    // Form buttons
    buttons: {
      previous: 'السابق',
      preview: 'معاينة',
      saveVisit: 'حفظ الزيارة',
      saving: 'جاري الحفظ...',
    },

    // File upload
    fileUpload: {
      helperText: 'رفع الملفات والصور والمستندات المتعلقة بالزيارة',
      description: 'مرفق الزيارة',
    },

    // Modal titles
    modals: {
      addNewPatient: 'إضافة مريض جديد',
    },

    // Patient Info Section
    patientInfo: {
      title: 'معلومات المريض',
      searchPatient: 'البحث عن مريض',
      searchPlaceholder: 'البحث بالاسم أو الرقم أو الهاتف...',
      visitType: 'نوع الزيارة',
      patient: 'المريض',
      patientDetails: 'تفاصيل المريض',
      name: 'الاسم',
      age: 'العمر',
      years: 'سنة',
      bloodType: 'فصيلة الدم',
      phone: 'الهاتف',
      addNewPatient: 'إضافة مريض جديد',
      noPatients: 'لم يتم العثور على مرضى',
      typeToSearch: 'اكتب للبحث عن المرضى',
      notAvailable: 'غير متوفر',
      id: 'رقم المريض',
    },

    // Medications Section
    medications: {
      title: 'الأدوية',
      addMedication: 'إضافة دواء',
      removeMedication: 'إزالة الدواء',
      medicationNumber: 'الدواء رقم',
      medicationName: 'اسم الدواء',
      searchMedicine: 'البحث عن دواء...',
      dosage: 'الجرعة',
      frequency: 'التكرار',
      duration: 'المدة (أيام)',
      notes: 'ملاحظات',
      notesPlaceholder: 'تعليمات إضافية أو ملاحظات حول هذا الدواء',
      medicationNameRequired: 'اسم الدواء مطلوب',
    },

    // Lab Tests Section
    labTests: {
      title: 'فحوصات المختبر',
      addLabTest: 'إضافة فحص مختبر',
      removeLabTest: 'إزالة فحص المختبر',
      labTestNumber: 'فحص المختبر رقم',
      labTest: 'فحص المختبر',
      selectLabTest: 'اختر فحص المختبر',
      additionalDetails: 'تفاصيل إضافية',
      additionalDetailsPlaceholder: 'تفاصيل إضافية',
      labTestRequired: 'اسم فحص المختبر مطلوب',
      noLabTests:
        'لم يتم إضافة فحوصات مختبر بعد. انقر على إضافة فحص مختبر للبدء.',
      addLabTestButton: 'إضافة فحص مختبر',
    },

    // Ray Tests Section
    rayTests: {
      title: 'فحوصات الأشعة',
      addRayTest: 'إضافة فحص أشعة',
      removeRayTest: 'إزالة فحص الأشعة',
      rayTestNumber: 'فحص الأشعة رقم',
      rayTest: 'فحص الأشعة',
      selectRay: 'اختر الأشعة',
      additionalDetails: 'تفاصيل إضافية',
      additionalDetailsPlaceholder: 'تفاصيل إضافية',
      rayTestRequired: 'اسم فحص الأشعة مطلوب',
      noRayTests:
        'لم يتم إضافة فحوصات أشعة بعد. انقر على إضافة فحص أشعة للبدء.',
      addRayTestButton: 'إضافة فحص أشعة',
    },

    // Symptoms and Diagnosis Section
    symptomsAndDiagnosis: {
      title: 'الأعراض والتشخيص',
      symptoms: 'الأعراض',
      symptomsPlaceholder: 'أدخل أعراض المريض...',
      diagnosis: 'التشخيص (ICD-10)',
      diagnosisPlaceholder: 'اختر رمز التشخيص ICD-10...',
      selectDiagnosis: 'اختر التشخيص',
      noDiagnosisFound: 'لم يتم العثور على رموز التشخيص المطابقة للبحث',
      noDiagnosisSelected: 'لم يتم اختيار تشخيص',
      selected: 'المحدد',
      searchPlaceholder: ' بحث التشخيص ...',
    },

    // Notes Section
    notes: {
      title: 'ملاحظات إضافية',
      placeholder: 'أدخل أي ملاحظات إضافية...',
    },

    // Validation messages
    validation: {
      patientRequired: 'اختيار المريض مطلوب',
      visitTypeRequired: 'نوع الزيارة مطلوب',
      symptomsRequired: 'الأعراض مطلوبة',
      diagnosisRequired: 'التشخيص مطلوب',
      medicationNameRequired: 'اسم الدواء مطلوب',
      dosageRequired: 'الجرعة مطلوبة',
      frequencyRequired: 'التكرار مطلوب',
      durationRequired: 'المدة مطلوبة',
      labTestRequired: 'اسم فحص المختبر مطلوب',
      rayTestRequired: 'اسم فحص الأشعة مطلوب',
      dentalProcedureRequired: 'نوع الإجراء السني مطلوب',
    },
  },

  // Modals
  modals: {
    // Advanced Search Modal
    advancedSearch: {
      title: 'البحث المتقدم عن المرضى',
      cancel: 'إلغاء',
      search: 'بحث',
      patientName: 'اسم المريض',
      patientNamePlaceholder: 'أدخل اسم المريض',
      patientId: 'رقم المريض',
      patientIdPlaceholder: 'أدخل رقم المريض',
      phoneNumber: 'رقم الهاتف',
      phoneNumberPlaceholder: 'أدخل رقم الهاتف',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'أدخل عنوان البريد الإلكتروني',
    },

    // Medication Search Modal
    medicationSearch: {
      title: 'البحث عن الأدوية',
      searchPlaceholder: 'البحث باسم الدواء أو الفئة أو الشركة المصنعة...',
      select: 'اختيار',
      noMedicationsFound: 'لم يتم العثور على أدوية',
      adjustSearchTerms: 'حاول تعديل مصطلحات البحث',
      columns: {
        code: 'الرمز',
        name: 'الاسم',
        scientificName: 'الاسم العلمي',
        medicationType: 'نوع الدواء',
        actions: 'الإجراءات',
      },
    },

    // File Preview Modal
    filePreview: {
      previewNotAvailable:
        'المعاينة غير متوفرة لهذا النوع من الملفات. يرجى التحميل للعرض.',
      downloadFile: 'تحميل الملف',
    },

    // Treatment Details Modal
    treatmentDetails: {
      title: 'تفاصيل العلاج',
      patientInformation: 'معلومات المريض',
      treatmentInformation: 'معلومات العلاج',
      name: 'الاسم',
      patientId: 'رقم المريض',
      visitType: 'نوع الزيارة',
      visit: 'زيارة',
      symptoms: 'الأعراض',
      diagnosis: 'التشخيص',
      medications: 'الأدوية',
      medicationName: 'الاسم',
      dosage: 'الجرعة',
      frequency: 'التكرار',
      duration: 'المدة',
      labTests: 'فحوصات المختبر',
      testName: 'اسم الفحص',
      rayTests: 'فحوصات الأشعة',
      rayType: 'نوع الأشعة',
      details: 'التفاصيل',
      additionalNotes: 'ملاحظات إضافية',
      attachments: 'المرفقات',
      download: 'تحميل',
      notAvailable: 'غير متوفر',
      noneSpecified: 'لم يتم تحديد أي شيء',
      notSpecified: 'غير محدد',
      noAdditionalDetails: 'لا توجد تفاصيل إضافية',
      noMedicationsPrescribed: 'لم يتم وصف أدوية',
    },
  },

  // Visit Details Page
  details: {
    // Tabs
    tabs: {
      details: 'تفاصيل الزيارة',
      medications: 'الأدوية',
      tests: 'الفحوصات',
      notes: 'الملاحظات السريرية',
    },

    // Patient Information Section
    patientInfo: {
      title: 'معلومات المريض',
      patientName: 'اسم المريض',
      visitType: 'نوع الزيارة',
      dateTime: 'التاريخ والوقت',
      at: 'في',
    },

    // Medical Information Section
    medicalInfo: {
      title: 'المعلومات الطبية',
      symptoms: 'الأعراض',
      doctor: 'الطبيب',
      notSpecified: 'غير محدد',
    },

    // Diagnoses Section
    diagnoses: {
      title: 'التشخيصات',
      noDiagnoses: 'لم يتم تسجيل تشخيصات لهذه الزيارة',
    },

    // Visit Summary Section
    summary: {
      title: 'ملخص الزيارة',
      medications: {
        title: 'الأدوية',
        description: 'الأدوية الموصوفة',
        items: 'عنصر',
      },
      labTests: {
        title: 'فحوصات المختبر',
        description: 'فحوصات المختبر المطلوبة',
        tests: 'فحص',
      },
      radiology: {
        title: 'الأشعة',
        description: 'فحوصات التصوير',
        tests: 'فحص',
      },
    },

    // Medications Tab
    medications: {
      title: 'الأدوية',
      dosage: 'الجرعة:',
      duration: 'المدة:',
      notes: 'ملاحظات:',
      noMedications: 'لم يتم وصف أدوية لهذه الزيارة',
    },

    // Tests Tab
    tests: {
      labTests: {
        title: 'فحوصات المختبر',
        details: 'التفاصيل:',
        noLabTests: 'لم يتم طلب فحوصات مختبر لهذه الزيارة',
      },
      radiologyTests: {
        title: 'فحوصات الأشعة',
        details: 'التفاصيل:',
        noRadiologyTests: 'لم يتم طلب فحوصات أشعة لهذه الزيارة',
      },
    },

    // Clinical Notes Tab
    clinicalNotes: {
      title: 'الملاحظات السريرية',
      showMore: 'عرض المزيد',
      showLess: 'عرض أقل',
      noNotes: 'لم يتم تسجيل ملاحظات سريرية لهذه الزيارة',
    },

    // Footer
    footer: {
      lastUpdated: 'آخر تحديث:',
      printVisitSummary: 'طباعة ملخص الزيارة',
    },
  },
};
