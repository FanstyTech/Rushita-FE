export const radiology = {
  title: 'الأشعة',
  description: 'إدارة فحوصات الأشعة والنتائج',

  summary: {
    cards: {
      totalTests: 'إجمالي الفحوصات',
      completed: 'مكتملة',
      inProgress: 'قيد التنفيذ',
      pending: 'في الانتظار',
    },
  },

  filters: {
    searchPlaceholder: 'البحث باسم المريض أو الفحص...',
    doctor: 'الطبيب',
    allDoctors: 'جميع الأطباء',
    status: 'الحالة',
    allStatus: 'جميع الحالات',
  },

  table: {
    columns: {
      patient: 'المريض',
      visitDate: 'تاريخ الزيارة',
      visitTime: 'وقت الزيارة',
      testName: 'اسم الفحص',
      status: 'الحالة',
      details: 'التفاصيل',
      actions: 'الإجراءات',
    },
  },

  visitCard: {
    testsCount: 'فحوصات',
    testCount_one: 'فحص واحد',
    testCount_other: '{{count}} فحوصات',
  },

  actions: {
    view: 'عرض',
    updateStatus: 'تحديث الحالة',
    uploadResults: 'رفع النتائج',
    viewDetails: 'عرض التفاصيل',
    tooltips: {
      viewTestDetails: 'عرض تفاصيل الفحص',
      updateTestStatus: 'تحديث حالة الفحص',
      uploadTestResults: 'رفع نتائج الفحص',
    },
  },

  emptyStates: {
    noVisits: {
      title: 'لا توجد زيارات',
      description: 'لا توجد زيارات تطابق المرشحات المحددة',
    },
    noTests: {
      title: 'لا توجد فحوصات',
      description: 'لا توجد فحوصات أشعة لهذه الزيارة',
    },
  },

  loading: {
    loadingTests: 'جاري تحميل الفحوصات...',
    loadingSummary: 'جاري تحميل الملخص...',
    updatingStatus: 'جاري تحديث الحالة...',
    uploadingResults: 'جاري رفع النتائج...',
  },

  messages: {
    success: {
      statusUpdated: 'تم تحديث حالة الفحص بنجاح',
      resultsUploaded: 'تم رفع النتائج بنجاح',
    },
    error: {
      updateStatusFailed: 'فشل في تحديث حالة الفحص',
      uploadResultsFailed: 'فشل في رفع النتائج',
      loadingFailed: 'فشل في تحميل البيانات',
    },
  },

  status: {
    pending: 'في الانتظار',
    inProgress: 'قيد التنفيذ',
    completed: 'مكتمل',
    cancelled: 'ملغي',
    expired: 'منتهي الصلاحية',
  },

  modals: {
    testDetails: {
      title: 'تفاصيل الفحص',
      sections: {
        testInformation: 'معلومات الفحص',
        testDetails: 'تفاصيل الفحص',
        testResults: 'نتائج الفحص',
        testAttachments: 'مرفقات الفحص',
      },
      labels: {
        testName: 'اسم الفحص:',
        patientName: 'اسم المريض:',
        testDate: 'تاريخ الفحص:',
        testTime: 'وقت الفحص:',
        testStatus: 'حالة الفحص:',
      },
      buttons: {
        close: 'إغلاق',
        print: 'طباعة',
      },
    },
    uploadResults: {
      title: 'رفع نتائج الفحص',
      form: {
        results: 'النتائج',
        resultsPlaceholder: 'أدخل نتائج الفحص هنا...',
        attachments: 'المرفقات',
        attachmentsPlaceholder: 'اختر الملفات لرفعها',
      },
      buttons: {
        cancel: 'إلغاء',
        upload: 'رفع النتائج',
      },
    },
    updateStatus: {
      title: 'تحديث حالة الفحص',
      form: {
        currentStatus: 'الحالة الحالية:',
        newStatus: 'الحالة الجديدة:',
        selectStatus: 'اختر الحالة الجديدة',
      },
      buttons: {
        cancel: 'إلغاء',
        update: 'تحديث الحالة',
      },
    },
  },
};
