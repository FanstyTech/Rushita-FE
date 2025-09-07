export const clinicPatients = {
  // Page title and description
  pageTitle: 'قائمة المرضى',
  pageDescription: 'إدارة معلومات المرضى والسجلات الطبية',

  // Table columns
  table: {
    name: 'الاسم',
    contact: 'معلومات التواصل',
    gender: 'الجنس',
    dateOfBirth: 'تاريخ الميلاد',
    totalVisits: 'إجمالي الزيارات',
    lastVisitDate: 'تاريخ آخر زيارة',
    actions: 'الإجراءات',
  },

  // Filter options
  filters: {
    gender: 'الجنس',
    all: 'الكل',
    male: 'ذكر',
    female: 'أنثى',
  },

  // Action buttons and tooltips
  actions: {
    addNew: 'إضافة مريض جديد',
    view: 'عرض التفاصيل',
    edit: 'تعديل',
    delete: 'حذف',
  },

  // Delete confirmation modal
  deleteModal: {
    title: 'حذف المريض',
    message: 'هل أنت متأكد من رغبتك في حذف هذا المريض؟',
    secondaryMessage: 'لا يمكن التراجع عن هذا الإجراء.',
    confirm: 'حذف',
    cancel: 'إلغاء',
  },

  // Status messages
  messages: {
    noPatients: 'لا يوجد مرضى',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ في تحميل البيانات',
    deleteSuccess: 'تم حذف المريض بنجاح',
    deleteError: 'حدث خطأ أثناء حذف المريض',
  },

  // Date formatting
  dateFormat: {
    noDate: '-',
  },

  // Add/Edit Patient Form
  form: {
    // Page titles
    addTitle: 'إضافة مريض جديد',
    editTitle: 'تعديل بيانات المريض',

    // Section headers
    sections: {
      personalInfo: 'المعلومات الشخصية',
      contactInfo: 'معلومات التواصل',
      medicalInfo: 'المعلومات الطبية',
    },

    // Form fields
    fields: {
      // Personal Information
      firstNameForeign: 'الاسم الأول (إنجليزي)',
      firstNameArabic: 'الاسم الأول (عربي)',
      secondNameForeign: 'الاسم الثاني (إنجليزي)',
      secondNameArabic: 'الاسم الثاني (عربي)',
      thirdNameForeign: 'الاسم الثالث (إنجليزي)',
      thirdNameArabic: 'الاسم الثالث (عربي)',
      lastNameForeign: 'اسم العائلة (إنجليزي)',
      lastNameArabic: 'اسم العائلة (عربي)',
      idType: 'نوع الهوية',
      idNumber: 'رقم الهوية',
      gender: 'الجنس',
      preferredLanguage: 'اللغة المفضلة',
      dateOfBirth: 'تاريخ الميلاد',

      // Contact Information
      phoneNumber: 'رقم الهاتف',
      email: 'البريد الإلكتروني',
      country: 'الدولة',
      city: 'المدينة',
      address: 'العنوان',

      // Medical Information
      bloodType: 'فصيلة الدم',
      height: 'الطول (سم)',
      weight: 'الوزن (كج)',
    },

    // Validation messages
    validation: {
      firstNameRequired: 'الاسم الأول مطلوب',
      phoneRequired: 'رقم الهاتف مطلوب',
      dateOfBirthRequired: 'تاريخ الميلاد مطلوب',
      emailInvalid: 'البريد الإلكتروني غير صحيح',
    },

    // Button labels
    buttons: {
      save: 'حفظ المريض',
      update: 'تحديث المريض',
      saving: 'جاري الحفظ...',
      cancel: 'إلغاء',
    },

    // Success messages
    success: {
      patientAdded: 'تم إضافة المريض بنجاح',
      patientUpdated: 'تم تحديث بيانات المريض بنجاح',
    },
  },

  // Patient Profile Page
  profile: {
    // Page sections
    tabs: {
      overview: 'نظرة عامة',
      medicalHistory: 'التاريخ الطبي',
      appointments: 'المواعيد',
      documents: 'المستندات',
    },

    // Contact information labels
    contact: {
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      address: 'العنوان',
    },

    // Action buttons
    buttons: {
      newAppointment: 'موعد جديد',
      addCondition: 'إضافة حالة طبية',
      addAllergy: 'إضافة حساسية',
      addFamilyHistory: 'إضافة تاريخ عائلي',
      uploadDocument: 'رفع مستند',
    },

    // Overview section
    overview: {
      quickStats: 'إحصائيات سريعة',
      totalVisits: 'إجمالي الزيارات',
      lastVisit: 'آخر زيارة',
      recentActivity: 'النشاط الأخير',
      noRecentActivity: 'لا يوجد نشاط حديث',
      noActivityDescription: 'لم يتم تسجيل أي أنشطة للمريض بعد',
    },

    // Medical History section
    medicalHistory: {
      conditions: 'الحالات الطبية',
      allergies: 'الحساسيات',
      medications: 'الأدوية الحالية',
      familyHistory: 'التاريخ العائلي',

      // Empty states
      noConditions: 'لا توجد حالات طبية',
      noConditionsDescription: 'لم يتم تسجيل أي حالات طبية',
      noAllergies: 'لا توجد حساسيات',
      noAllergiesDescription: 'لم يتم تسجيل أي حساسيات',
      noMedications: 'لا توجد أدوية',
      noMedicationsDescription: 'لم يتم وصف أي أدوية',
      noFamilyHistory: 'لا يوجد تاريخ عائلي',
      noFamilyHistoryDescription: 'لم يتم تسجيل أي تاريخ طبي عائلي',

      // Medications table
      medicationHeaders: {
        medication: 'الدواء',
        dosage: 'الجرعة',
        frequency: 'التكرار',
        started: 'تاريخ البدء',
      },
    },

    // Appointments section
    appointments: {
      upcoming: 'المواعيد القادمة',
      noAppointments: 'لا توجد مواعيد',
      noAppointmentsDescription: 'لا توجد مواعيد مجدولة',

      // Table headers
      headers: {
        dateTime: 'التاريخ والوقت',
        type: 'النوع',
        doctor: 'الطبيب',
        status: 'الحالة',
        notes: 'الملاحظات',
      },
    },

    // Documents section
    documents: {
      title: 'المستندات الطبية',
      noDocuments: 'لا توجد مستندات',
      noDocumentsDescription: 'لم يتم رفع أي مستندات طبية',
      uploaded: 'تم الرفع',
      by: 'بواسطة',
    },

    // Error states
    errors: {
      loadingProfile: 'خطأ في تحميل الملف الشخصي',
      loadingProfileDescription:
        'فشل في تحميل الملف الشخصي للمريض. يرجى المحاولة مرة أخرى.',
      patientNotFound: 'المريض غير موجود',
      patientNotFoundDescription:
        'لا يمكن العثور على الملف الشخصي للمريض المطلوب.',
    },
  },

  // Modal Components
  modals: {
    // Add Condition Modal
    addCondition: {
      title: 'إضافة حالة طبية',
      fields: {
        conditionName: 'اسم الحالة الطبية',
        diagnoseDate: 'تاريخ التشخيص',
        status: 'حالة الحالة الطبية',
      },
      buttons: {
        cancel: 'إلغاء',
        add: 'إضافة حالة',
      },
      validation: {
        nameRequired: 'اسم الحالة الطبية مطلوب',
        diagnoseDateRequired: 'تاريخ التشخيص مطلوب',
        statusRequired: 'حالة الحالة الطبية مطلوبة',
      },
    },

    // Add Allergy Modal
    addAllergy: {
      title: 'إضافة حساسية',
      fields: {
        allergyName: 'اسم الحساسية',
        severity: 'شدة الحساسية',
        reaction: 'رد الفعل',
      },
      buttons: {
        cancel: 'إلغاء',
        add: 'إضافة حساسية',
      },
      validation: {
        nameRequired: 'اسم الحساسية مطلوب',
        reactionRequired: 'رد الفعل مطلوب',
        severityRequired: 'شدة الحساسية مطلوبة',
      },
    },

    // Add Family History Modal
    addFamilyHistory: {
      title: 'إضافة تاريخ عائلي',
      fields: {
        condition: 'الحالة الطبية',
        ageOfOnset: 'عمر بداية الحالة',
        relationship: 'صلة القرابة',
        status: 'الحالة',
        notes: 'ملاحظات',
      },
      buttons: {
        cancel: 'إلغاء',
        add: 'إضافة تاريخ عائلي',
      },
      validation: {
        conditionRequired: 'الحالة الطبية مطلوبة',
        ageOfOnsetRequired: 'عمر بداية الحالة مطلوب',
        relationshipRequired: 'صلة القرابة مطلوبة',
        statusRequired: 'الحالة مطلوبة',
      },
    },
  },
};
