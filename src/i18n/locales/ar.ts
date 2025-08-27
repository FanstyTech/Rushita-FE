export const ar = {
  translation: {
    // Navigation
    navigation: {
      dashboard: 'لوحة التحكم',
      patients: 'المرضى',
      appointments: 'المواعيد',
      diagnosis: 'التشخيص',
      analytics: 'التحليلات',
      settings: 'الإعدادات',
      clinicAI: 'الذكاء الاصطناعي للعيادة',
      medicalIntelligence: 'الذكاء الطبي',
    },

    // Breadcrumb routes
    breadcrumb: {
      home: 'الرئيسية',
      // Main sections
      admin: 'الإدارة',
      clinic: 'العيادة',
      doctor: 'الطبيب',

      // Admin routes
      dashboard: 'لوحة التحكم',
      users: 'المستخدمون',
      clinics: 'العيادات',
      settings: 'الإعدادات',

      // Clinic routes
      patients: 'المرضى',
      appointments: 'المواعيد',
      'medical-records': 'السجلات الطبية',
      staff: 'الموظفون',

      // Financial routes
      financial: 'المالية',
      revenues: 'الإيرادات',
      expenses: 'المصروفات',
      invoices: 'الفواتير',
      salaries: 'الرواتب',
      transactions: 'المعاملات',
      reports: 'التقارير',
      'service-prices': 'أسعار الخدمات',

      // Doctor routes
      visits: 'الزيارات',
      prescriptions: 'الوصفات الطبية',
      schedule: 'الجدول الزمني',

      // Common actions
      create: 'إنشاء',
      edit: 'تعديل',
      view: 'عرض',
      new: 'جديد',
      add: 'إضافة',

      // Dynamic routes with IDs
      'patient #{{id}}': 'مريض #{{id}}',
      'appointment #{{id}}': 'موعد #{{id}}',
      'invoice #{{id}}': 'فاتورة #{{id}}',
      'user #{{id}}': 'مستخدم #{{id}}',
      'clinic #{{id}}': 'عيادة #{{id}}',
    },

    // Auth pages
    auth: {
      login: {
        title: 'مرحباً بعودتك',
        subtitle: 'سجل الدخول للوصول إلى لوحة التحكم',
        email: 'البريد الإلكتروني',
        emailPlaceholder: 'أدخل بريدك الإلكتروني',
        password: 'كلمة المرور',
        passwordPlaceholder: 'أدخل كلمة المرور',
        rememberMe: 'تذكرني',
        forgotPassword: 'نسيت كلمة المرور؟',
        signIn: 'تسجيل الدخول إلى لوحة التحكم',
        signingIn: 'جاري تسجيل الدخول...',
        contactHelp: 'تحتاج مساعدة أو تريد البدء؟',
        whatsapp: 'واتساب',
        instagram: 'إنستغرام',
        trustIndicators: {
          hipaaCompliant: 'متوافق مع HIPAA',
          trustedClinics: 'موثوق من 60+ عيادة',
        },
        branding: {
          title: 'رشيتا',
          subtitle: 'إدارة الممارسة الطبية',
          welcome: 'مرحباً بك في مستقبل',
          healthcare: 'إدارة الرعاية الصحية',
          description:
            'قم بتبسيط عمليات عيادتك مع نظام إدارة الممارسة الطبية الشامل الخاص بنا.',
        },
        features: {
          secure: {
            title: 'آمن ومتوافق',
            description: 'متوافق مع HIPAA مع أمان على مستوى المؤسسة',
          },
          patientCare: {
            title: 'رعاية تركز على المريض',
            description: 'تحسين تجربة المريض والنتائج',
          },
          teamCollaboration: {
            title: 'تعاون الفريق',
            description: 'سير عمل سلس لفريقك بالكامل',
          },
        },
      },
    },

    // Settings page
    settings: {
      title: 'إعدادات العيادة',
      description: 'إدارة إعدادات وتكوين العيادة',

      // Appointment Settings
      appointments: {
        title: 'إعدادات المواعيد',
        description: 'إدارة إعدادات حجز المواعيد وسياساتها',
        duration: 'مدة الموعد (بالدقائق)',
        maxAdvanceBooking: 'الحد الأقصى لحجز المواعيد المسبقة (بالأيام)',
        cancellationPolicy: 'سياسة الإلغاء (ساعات قبل الموعد)',
        onlineBooking: 'السماح بالحجز عبر الإنترنت',
        requireApproval: 'يتطلب موافقة على المواعيد',
      },

      // Notification Settings
      notifications: {
        title: 'إعدادات الإشعارات',
        description: 'التحكم في تسليم الإشعارات والتذكيرات',
        emailNotifications: 'إشعارات البريد الإلكتروني',
        smsNotifications: 'إشعارات الرسائل النصية',
        pushNotifications: 'الإشعارات الفورية',
        reminderTiming: 'توقيت التذكير (ساعات قبل الموعد)',
      },

      // Clinic Information
      clinicInfo: {
        title: 'معلومات العيادة',
        description: 'إدارة المعلومات الأساسية للعيادة',
        name: 'اسم العيادة',
        phone: 'رقم الهاتف',
        email: 'البريد الإلكتروني',
        address: 'العنوان',
        namePlaceholder: 'أدخل اسم العيادة',
        phonePlaceholder: 'أدخل رقم الهاتف',
        emailPlaceholder: 'أدخل البريد الإلكتروني',
        addressPlaceholder: 'أدخل عنوان العيادة',
      },

      // System Preferences
      system: {
        title: 'تفضيلات النظام',
        description: 'إدارة إعدادات النظام العامة',
        currency: 'العملة الافتراضية',
        language: 'اللغة الافتراضية',
        timezone: 'المنطقة الزمنية',
        autoBackup: 'النسخ الاحتياطي التلقائي',
        twoFactorAuth: 'المصادقة الثنائية',
        currencies: {
          SAR: 'ريال سعودي (SAR)',
          AED: 'درهم إماراتي (AED)',
          USD: 'دولار أمريكي (USD)',
          EUR: 'يورو (EUR)',
        },
        languages: {
          ar: 'العربية',
          en: 'الإنجليزية',
          fr: 'الفرنسية',
        },
        timezones: {
          'Asia/Riyadh': 'الرياض (GMT+3)',
          'Asia/Dubai': 'دبي (GMT+4)',
          'Europe/London': 'لندن (GMT+0)',
          'America/New_York': 'نيويورك (GMT-5)',
          'Asia/Tokyo': 'طوكيو (GMT+9)',
        },
      },

      // Booking Conditions
      bookingConditions: {
        title: 'شروط الحجز',
        description: 'أدخل شروط ومتطلبات الحجز (واحد في كل سطر)',
        patientInfoRequired: 'يتطلب معلومات المريض الكاملة',
        insuranceRequired: 'يتطلب معلومات التأمين',
        medicalHistoryRequired: 'يتطلب التاريخ الطبي',
        minAge: 'الحد الأدنى للعمر',
        maxAge: 'الحد الأقصى للعمر',
        emergencyContactRequired: 'يتطلب جهة اتصال طوارئ',
        sameDayBooking: 'السماح بحجز نفس اليوم',
        depositRequired: 'يتطلب دفع عربون',
        depositAmount: 'مبلغ العربون',
        termsRequired: 'يتطلب قبول الشروط والأحكام',
      },

      // Clinic Rooms Management
      rooms: {
        title: 'غرف العيادة والمعدات',
        description: 'إدارة غرف العيادة والمعدات الطبية',
        enableRoomManagement: 'تفعيل إدارة الغرف',
        defaultRoom: 'الغرفة الافتراضية للمواعيد',
        roomCapacity: 'إدارة سعة الغرف',
        equipmentTracking: 'تتبع المعدات',
        maintenanceScheduling: 'جدولة الصيانة',
        roomOptions: {
          room1: 'غرفة الفحص 1',
          room2: 'غرفة الفحص 2',
          room3: 'غرفة الفحص 3',
          consultation: 'غرفة الاستشارة',
          procedure: 'غرفة الإجراءات',
          emergency: 'غرفة الطوارئ',
        },
      },

      // Actions
      saveSettings: 'حفظ الإعدادات',
    },

    // Languages
    languages: {
      en: 'الإنجليزية',
      ar: 'العربية',
      es: 'الإسبانية',
    },

    // Common
    common: {
      search: 'بحث',
      filter: 'تصفية',
      sort: 'ترتيب',
      add: 'إضافة',
      edit: 'تعديل',
      delete: 'حذف',
      cancel: 'إلغاء',
      save: 'حفظ',
      confirm: 'تأكيد',
      back: 'رجوع',
      next: 'التالي',
      submit: 'إرسال',
      loading: 'جاري التحميل...',
      noResults: 'لا توجد نتائج',
      success: 'نجح',
      error: 'خطأ',
      warning: 'تحذير',
      info: 'معلومات',
    },

    // Messages
    messages: {
      success: {
        saved: 'تم الحفظ بنجاح',
        updated: 'تم التحديث بنجاح',
        deleted: 'تم الحذف بنجاح',
      },
    },
  },
};
