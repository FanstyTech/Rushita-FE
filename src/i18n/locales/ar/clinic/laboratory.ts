export const clinicLaboratory = {
  // Page title and description
  pageTitle: 'الفحوصات المخبرية',
  pageDescription: 'إدارة الفحوصات المخبرية ونتائج التحاليل',

  // Dashboard summary cards
  dashboard: {
    totalTests: 'إجمالي الفحوصات',
    completedTests: 'الفحوصات المكتملة',
    inProgressTests: 'قيد التنفيذ',
    pendingTests: 'في الانتظار',
    completed: 'مكتملة',
    inProgress: 'قيد التنفيذ',
    pending: 'في الانتظار',
  },

  // Filter and search
  filters: {
    searchPlaceholder: 'البحث بالاسم أو نوع الفحص...',
    allDoctors: 'جميع الأطباء',
    doctor: 'الطبيب',
    status: 'الحالة',
    dateRange: 'نطاق التاريخ',
  },

  // Test statuses
  testStatus: {
    pending: 'في الانتظار',
    inProgress: 'قيد التنفيذ',
    completed: 'مكتملة',
    cancelled: 'ملغية',
  },

  // Visit information
  visit: {
    patientName: 'اسم المريض',
    visitDate: 'تاريخ الزيارة',
    visitTime: 'وقت الزيارة',
    testsCount: 'فحص',
    testsCountPlural: 'فحوصات',
  },

  // Test actions
  actions: {
    view: 'عرض',
    viewDetails: 'عرض التفاصيل',
    updateStatus: 'تحديث الحالة',
    uploadResults: 'رفع النتائج',
    downloadResults: 'تحميل النتائج',
  },

  // Test information
  test: {
    testName: 'اسم الفحص',
    testDetails: 'تفاصيل الفحص',
    testResult: 'نتيجة الفحص',
    requestedBy: 'طلب من قبل',
    requestedDate: 'تاريخ الطلب',
    completedDate: 'تاريخ الإنجاز',
    notes: 'ملاحظات',
  },

  // Empty states
  emptyStates: {
    noVisits: 'لا توجد زيارات',
    noVisitsDescription: 'لا توجد زيارات تطابق المرشحات المحددة',
    noTests: 'لا توجد فحوصات',
    noTestsDescription: 'لا توجد فحوصات مخبرية متاحة',
    noResults: 'لا توجد نتائج',
    noResultsDescription: 'لم يتم رفع نتائج لهذا الفحص بعد',
  },

  // Loading states
  loading: {
    loadingTests: 'جاري تحميل الفحوصات...',
    loadingSummary: 'جاري تحميل الملخص...',
    updatingStatus: 'جاري تحديث الحالة...',
    uploadingResults: 'جاري رفع النتائج...',
  },

  // Success messages
  success: {
    statusUpdated: 'تم تحديث حالة الفحص بنجاح',
    resultsUploaded: 'تم رفع النتائج بنجاح',
    testCompleted: 'تم إكمال الفحص بنجاح',
  },

  // Error messages
  errors: {
    loadingFailed: 'فشل في تحميل البيانات',
    updateFailed: 'فشل في تحديث الحالة',
    uploadFailed: 'فشل في رفع النتائج',
    networkError: 'خطأ في الشبكة، يرجى المحاولة مرة أخرى',
  },

  // Form labels
  form: {
    testResult: 'نتيجة الفحص',
    attachments: 'المرفقات',
    notes: 'ملاحظات إضافية',
    newStatus: 'الحالة الجديدة',
    reason: 'سبب التغيير',
  },

  // Button labels
  buttons: {
    save: 'حفظ',
    cancel: 'إلغاء',
    upload: 'رفع',
    update: 'تحديث',
    close: 'إغلاق',
    refresh: 'تحديث',
    export: 'تصدير',
    print: 'طباعة',
  },

  // Modal Components
  modals: {
    confirmAction: 'تأكيد الإجراء',
    // Test Details Modal
    testDetails: {
      title: 'تفاصيل الفحص',
      testInformation: 'معلومات الفحص',
      testName: 'اسم الفحص',
      patientName: 'اسم المريض',
      testDate: 'تاريخ الفحص',
      testTime: 'وقت الفحص',
      testStatus: 'حالة الفحص',
      testDetailsSection: 'تفاصيل الفحص',
      testAttachments: 'مرفقات الفحص',
      buttons: {
        close: 'إغلاق',
        print: 'طباعة',
      },
    },

    // Test Result Upload Modal
    uploadResults: {
      title: 'رفع نتائج الفحص',
      testInformation: 'معلومات الفحص',
      patient: 'المريض',
      testType: 'نوع الفحص',
      testResults: 'نتائج الفحص',
      testResultsPlaceholder: 'أدخل نتائج الفحص هنا...',
      uploadAttachments: 'رفع المرفقات',
      attachmentHelperText: 'رفع ملفات النتائج، الصور، أو المستندات',
      buttons: {
        cancel: 'إلغاء',
        uploading: 'جاري الرفع...',
        saveResults: 'حفظ النتائج',
      },
      errors: {
        uploadFailed: 'فشل في رفع نتائج الفحص',
      },
    },

    // Test Status Update Modal
    updateStatus: {
      title: 'تحديث حالة الفحص',
      testInformation: 'معلومات الفحص',
      patientName: 'اسم المريض',
      currentStatus: 'الحالة الحالية',
      chooseNewStatus: 'اختر الحالة الجديدة',
      statusOptions: {
        pending: 'في الانتظار',
        inProgress: 'قيد التنفيذ',
        completed: 'مكتملة',
        cancelled: 'ملغية',
      },
      buttons: {
        cancel: 'إلغاء',
        updating: 'جاري التحديث...',
        updateStatus: 'تحديث الحالة',
      },
    },
  },
};
