export const pharmacy = {
  // Page title and description
  pageTitle: 'الصيدلية',
  pageDescription: 'إدارة الزيارات والوصفات الطبية',

  // Table columns
  table: {
    visitNumber: 'رقم الزيارة',
    patientName: 'اسم المريض',
    doctor: 'الطبيب',
    date: 'التاريخ',
    type: 'النوع',
    status: 'الحالة',
    actions: 'الإجراءات',
  },

  // Filter options
  filters: {
    status: 'الحالة',
    allStatus: 'جميع الحالات',
    searchPlaceholder: 'البحث في الزيارات...',
  },

  // Action buttons and tooltips
  actions: {
    viewDetails: 'عرض التفاصيل',
    editVisit: 'تعديل الزيارة',
    viewPrescription: 'عرض الوصفة',
    dispenseMedicine: 'صرف الدواء',
  },

  // Empty states and messages
  emptyStates: {
    noVisits: 'لا توجد زيارات',
    noVisitsDescription: 'لم يتم العثور على زيارات للصيدلية',
  },

  // Loading states
  loading: {
    loadingVisits: 'جاري تحميل الزيارات...',
    processingRequest: 'جاري معالجة الطلب...',
  },

  // Status messages
  messages: {
    success: 'تم بنجاح',
    error: 'حدث خطأ',
    medicineDispensed: 'تم صرف الدواء بنجاح',
    prescriptionUpdated: 'تم تحديث الوصفة بنجاح',
  },

  // Prescriptions sub-page
  prescriptions: {
    pageTitle: 'الوصفات الطبية',
    pageDescription: 'إدارة الوصفات الطبية والأدوية',

    // Table columns
    table: {
      visitNumber: 'رقم الزيارة',
      patientName: 'اسم المريض',
      doctor: 'الطبيب',
      date: 'التاريخ',
      type: 'النوع',
      status: 'الحالة',
      actions: 'الإجراءات',
    },

    // Filter options
    filters: {
      status: 'الحالة',
      allStatus: 'جميع الحالات',
      searchPlaceholder: 'البحث في الوصفات...',
    },

    // Action buttons and tooltips
    actions: {
      viewPrescriptionDetails: 'عرض تفاصيل الوصفة',
      dispenseMedicine: 'صرف الدواء',
      printPrescription: 'طباعة الوصفة',
    },

    // Empty states and messages
    emptyStates: {
      noPrescriptions: 'لا توجد وصفات طبية',
      noPrescriptionsDescription: 'لم يتم العثور على وصفات طبية',
    },

    // Loading states
    loading: {
      loadingPrescriptions: 'جاري تحميل الوصفات...',
      processingRequest: 'جاري معالجة الطلب...',
    },

    // Status messages
    messages: {
      success: 'تم بنجاح',
      error: 'حدث خطأ',
      medicineDispensed: 'تم صرف الدواء بنجاح',
      prescriptionPrinted: 'تم طباعة الوصفة بنجاح',
    },

    // Prescription Details Page
    details: {
      // Visit information labels
      visitInfo: {
        visit: 'الزيارة',
        patient: 'المريض',
        date: 'التاريخ',
        medication: 'دواء',
        medications: 'أدوية',
      },

      // Medication card labels
      medicationCard: {
        dosage: 'الجرعة',
        frequency: 'التكرار',
        quantity: 'الكمية',
        duration: 'المدة',
        dispenseMedication: 'صرف الدواء',
      },

      // Expanded details sections
      expandedDetails: {
        prescriptionDetails: 'تفاصيل الوصفة',
        medicationInformation: 'معلومات الدواء',
        prescribedBy: 'وصف بواسطة',
        prescribedDate: 'تاريخ الوصف',
        expiryDate: 'تاريخ الانتهاء',
        notes: 'ملاحظات',
        name: 'الاسم',
        scientificName: 'الاسم العلمي',
        arabicName: 'الاسم العربي',
        strength: 'القوة',
        dosageForm: 'شكل الجرعة',
      },

      // Action buttons
      actions: {
        dispenseMedication: 'صرف الدواء',
        expandDetails: 'توسيع التفاصيل',
        collapseDetails: 'طي التفاصيل',
      },

      // Empty states
      emptyStates: {
        noPrescriptions: 'لا توجد وصفات طبية',
        noPrescriptionsDescription: 'لم يتم العثور على وصفات طبية لهذه الزيارة',
      },

      // Loading states
      loading: {
        loadingPrescriptions: 'جاري تحميل الوصفات الطبية...',
        processingDispense: 'جاري معالجة صرف الدواء...',
      },

      // Messages
      messages: {
        medicineDispensed: 'تم صرف الدواء بنجاح',
        dispenseFailed: 'فشل في صرف الدواء',
        prescriptionExpired: 'انتهت صلاحية الوصفة',
        insufficientQuantity: 'الكمية المتاحة غير كافية',
      },
    },
  },
  modal: {
    dispenseMedication: {
      title: 'صرف الدواء',
      sections: {
        medicationInfo: {
          title: 'معلومات الدواء',
          labels: {
            name: 'الاسم:',
            scientificName: 'الاسم العلمي:',
            arabicName: 'الاسم العربي:',
            strength: 'القوة:',
          },
        },
        prescriptionDetails: {
          title: 'تفاصيل الوصفة',
          labels: {
            dosage: 'الجرعة:',
            frequency: 'التكرار:',
            duration: 'المدة:',
            prescribedDate: 'تاريخ الوصف:',
            expiryDate: 'تاريخ الانتهاء:',
          },
        },
        quantityInfo: {
          title: 'معلومات الكمية',
          remaining: 'متبقي',
          of: 'من',
        },
        patientInfo: {
          labels: {
            patientNumber: 'رقم المريض:',
            visitNumber: 'رقم الزيارة:',
          },
        },
      },
      form: {
        quantityToDispense: 'الكمية المراد صرفها',
        notes: 'ملاحظات',
        notesPlaceholder: 'أدخل أي ملاحظات إضافية هنا...',
        required: '*',
      },
      buttons: {
        cancel: 'إلغاء',
        dispense: 'صرف الدواء',
      },
      errors: {
        positiveNumber: 'يرجى إدخال رقم موجب',
        availableQuantity: 'الكمية المتاحة للصرف هي فقط',
      },
    },
  },
};
