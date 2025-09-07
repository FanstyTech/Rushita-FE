export const ar = {
  translation: {
    // Common
    common: {
      loading: 'جاري التحميل...',
      // Actions
      add: 'إضافة',
      edit: 'تعديل',
      delete: 'حذف',
      cancel: 'إلغاء',
      save: 'حفظ',
      confirm: 'تأكيد',
      back: 'رجوع',
      next: 'التالي',
      submit: 'إرسال',
      close: 'إغلاق',
      open: 'فتح',
      view: 'عرض',
      create: 'إنشاء',
      update: 'تحديث',
      remove: 'إزالة',
      search: 'بحث',
      filter: 'تصفية',
      sort: 'ترتيب',
      export: 'تصدير',
      import: 'استيراد',
      print: 'طباعة',
      download: 'تحميل',
      upload: 'رفع',
      refresh: 'تحديث',
      reset: 'إعادة تعيين',
      clear: 'مسح',
      select: 'اختيار',
      selectAll: 'اختيار الكل',
      deselectAll: 'إلغاء اختيار الكل',
      // Status
      active: 'نشط',
      inactive: 'غير نشط',
      enabled: 'مفعل',
      disabled: 'معطل',
      pending: 'قيد الانتظار',
      approved: 'موافق عليه',
      rejected: 'مرفوض',
      completed: 'مكتمل',
      inProgress: 'قيد التنفيذ',
      draft: 'مسودة',
      published: 'منشور',
      // Messages
      success: 'نجح',
      error: 'خطأ',
      warning: 'تحذير',
      info: 'معلومات',
      noResults: 'لا توجد نتائج',
      noData: 'لا توجد بيانات متاحة',
      // Confirmations
      areYouSure: 'هل أنت متأكد؟',
      deleteConfirmation: 'هل أنت متأكد من أنك تريد حذف هذا العنصر؟',
      unsavedChanges:
        'لديك تغييرات غير محفوظة. هل أنت متأكد من أنك تريد المغادرة؟',
      // Form validation
      required: 'هذا الحقل مطلوب',
      invalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
      invalidPhone: 'يرجى إدخال رقم هاتف صحيح',
      passwordTooShort: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
      passwordsDoNotMatch: 'كلمات المرور غير متطابقة',
      // Time and date
      today: 'اليوم',
      yesterday: 'أمس',
      tomorrow: 'غداً',
      thisWeek: 'هذا الأسبوع',
      thisMonth: 'هذا الشهر',
      thisYear: 'هذا العام',
      // Pagination
      previous: 'السابق',
      page: 'صفحة',
      of: 'من',
      showing: 'عرض',
      to: 'إلى',
      entries: 'إدخالات',
      // File operations
      file: 'ملف',
      files: 'ملفات',
      folder: 'مجلد',
      folders: 'مجلدات',
      size: 'الحجم',
      type: 'النوع',
      lastModified: 'آخر تعديل',
    },
    // Navigation
    navigation: {
      quickMenu: 'قائمة سريعة',
      searchPlaceholder: 'البحث في التنقل...',
      sections: {
        admin: 'الإدارة',
        clinic: 'العيادة',
        doctor: 'الطبيب',
      },
      // Admin Navigation
      admin: {
        dashboard: 'لوحة التحكم',
        users: 'المستخدمون',
        clinics: {
          title: 'العيادات',
          management: {
            title: 'إدارة العيادات',
            list: 'قائمة العيادات',
            add: 'إضافة عيادة',
          },
          reports: {
            title: 'تقارير العيادات',
            performance: 'تقارير الأداء',
            analytics: 'تقارير التحليلات',
          },
        },
        lookups: {
          title: 'البيانات المرجعية',
          specialty: 'التخصصات',
          country: 'البلدان',
          city: 'المدن',
          clinicType: 'أنواع العيادات',
          currency: 'العملات',
          radiologyTestCategory: 'فئات فحوصات الأشعة',
          radiologyTest: 'فحوصات الأشعة',
          medicationType: 'أنواع الأدوية',
          medicine: 'الأدوية',
          labTestCategory: 'فئات الفحوصات المخبرية',
          labTest: 'الفحوصات المخبرية',
          diagnosisCategory: 'فئات التشخيص',
          diagnosis: 'التشخيصات',
          dentalProcedure: 'إجراءات الأسنان',
        },
      },
      // Clinic Navigation
      clinic: {
        dashboard: 'لوحة التحكم',
        appointments: 'المواعيد',
        patients: 'المرضى',
        staff: {
          title: 'الموظفون',
          list: 'قائمة الموظفين',
          leaves: 'الإجازات',
        },
        laboratory: {
          title: 'المختبر',
          tests: 'الفحوصات المخبرية',
        },
        radiology: {
          title: 'الأشعة',
          tests: 'فحوصات الأشعة',
        },
        pharmacy: {
          title: 'الصيدلية',
          prescriptions: 'الوصفات الطبية',
        },
        financial: {
          title: 'المالية',
          dashboard: 'لوحة التحكم المالية',
          servicePrices: 'أسعار الخدمات',
          expenses: 'المصروفات',
          invoices: 'الفواتير',
          revenues: 'الإيرادات',
          salaries: 'الرواتب',
          transactions: 'المعاملات',
        },
        reports: {
          title: 'التقارير',
          view: 'عرض التقارير',
          generate: 'إنشاء التقارير',
        },
        settings: {
          title: 'الإعدادات',
          general: 'الإعدادات العامة',
          profile: 'ملف العيادة',
        },
      },
      // Doctor Navigation
      doctor: {
        dashboard: 'لوحة التحكم',
        visits: 'الزيارات',
        leaves: 'الإجازات',
        profile: 'الملف الشخصي',
      },
      dashboard: 'لوحة التحكم',
      patients: 'المرضى',
      appointments: 'المواعيد',
      diagnosis: 'التشخيص',
      analytics: 'التحليلات',
      settings: 'الإعدادات',
      clinicAI: 'الذكاء الاصطناعي للعيادة',
      medicalIntelligence: 'الذكاء الطبي',
    },

    // User interface
    user: {
      notifications: 'الإشعارات',
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج',
    },

    // Settings
    settings: {
      settings: 'الإعدادات',
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
          title: 'روشيتة',
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
      completeRegistration: {
        title: 'أكمل تسجيلك',
        subtitle:
          'أنشئ كلمة مرور آمنة لإكمال إعداد حسابك والانضمام إلى منصة روشيتة الطبية.',
        formTitle: 'إنشاء كلمة المرور',
        formSubtitle: 'قم بإعداد كلمة مرور آمنة لحسابك',
        password: 'كلمة المرور',
        passwordPlaceholder: 'أنشئ كلمة مرور قوية',
        confirmPassword: 'تأكيد كلمة المرور',
        confirmPasswordPlaceholder: 'أكد كلمة المرور',
        completeRegistration: 'إكمال التسجيل',
        creatingAccount: 'جاري إنشاء الحساب...',
        alreadyHaveAccount: 'لديك حساب بالفعل؟',
        signInHere: 'سجل الدخول هنا',
        passwordRequirements: {
          title: 'متطلبات كلمة المرور:',
          minLength: '• 8 أحرف على الأقل',
          mixedCase: '• مزيج من الأحرف الكبيرة والصغيرة',
          numbersSpecial: '• تضمين الأرقام والأحرف الخاصة',
          avoidCommon: '• تجنب الكلمات الشائعة أو المعلومات الشخصية',
        },
        validation: {
          passwordMinLength: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
          confirmPasswordMinLength: 'يرجى تأكيد كلمة المرور',
          passwordsDontMatch: 'كلمات المرور غير متطابقة',
        },
        features: {
          secure: {
            title: 'آمن ومشفر',
            description: 'كلمة المرور مشفرة بأمان على مستوى الصناعة',
          },
          hipaa: {
            title: 'متوافق مع HIPAA',
            description: 'يلبي معايير حماية بيانات الرعاية الصحية',
          },
        },
        trustIndicators: {
          hipaaCompliant: 'متوافق مع HIPAA',
          trustedClinics: 'موثوق من 60+ عيادة',
        },
        branding: {
          title: 'روشيتة',
          subtitle: 'إدارة الممارسة الطبية',
          welcome: 'أكمل',
          registration: 'تسجيلك',
        },
      },
      registrationSuccess: {
        title: 'تم التسجيل بنجاح!',
        subtitle:
          'شكراً لك على الانضمام إلى روشيتة. تم تقديم طلبك وهو قيد المراجعة الآن.',
        welcome: 'مرحباً بك في',
        family: 'عائلة روشيتة',
        description:
          'تم تقديم تسجيلك بنجاح. سيقوم فريقنا بمراجعة طلبك والرد عليك قريباً.',
        nextSteps: {
          checkEmail: {
            title: 'تحقق من بريدك الإلكتروني',
            description: 'لقد أرسلنا بريد إلكتروني تأكيدي مع الخطوات التالية',
          },
          accountReview: {
            title: 'مراجعة الحساب',
            description: 'سيقوم فريقنا بمراجعة طلبك خلال 24-48 ساعة',
          },
          getStarted: {
            title: 'ابدأ الآن',
            description: 'بمجرد الموافقة، ستتلقى بيانات تسجيل الدخول',
          },
        },
        contactInfo: {
          title: 'تحتاج مساعدة؟',
          description: 'فريق الدعم لدينا هنا لمساعدتك في أي أسئلة.',
          emailSupport: 'دعم البريد الإلكتروني',
          whatsapp: 'واتساب',
        },
        status: {
          title: 'تم تقديم الطلب',
          description: 'سنخطرك بمجرد الموافقة على حسابك',
        },
        actions: {
          goToLogin: 'اذهب إلى تسجيل الدخول',
          backToHome: 'العودة إلى الرئيسية',
        },
        trustIndicators: {
          hipaaCompliant: 'متوافق مع HIPAA',
          trustedClinics: 'موثوق من 60+ عيادة',
        },
        branding: {
          title: 'روشيتة',
          subtitle: 'إدارة الممارسة الطبية',
        },
      },
    },

    // Languages
    languages: {
      en: 'الإنجليزية',
      ar: 'العربية',
      es: 'الإسبانية',
    },

    // Messages
    messages: {
      success: {
        saved: 'تم الحفظ بنجاح',
        updated: 'تم التحديث بنجاح',
        deleted: 'تم الحذف بنجاح',
      },
    },

    // Landing Page
    landing: {
      // Navigation
      nav: {
        home: 'الرئيسية',
        about: 'حول روشيتة',
        features: 'المميزات',
        pricing: 'الأسعار',
        contact: 'اتصل بنا',
        login: 'تسجيل الدخول',
        getStarted: 'ابدأ الآن',
        language: 'اللغة',
        whyroshita: 'لماذا روشيتة',
        services: 'خدماتنا',
      },

      // Hero Section
      hero: {
        title: 'نظام إدارة العيادات الذكي',
        subtitle: 'حلول متكاملة لإدارة العيادات الطبية بكفاءة وسهولة',
        description:
          'منصة شاملة تساعدك على إدارة المرضى والمواعيد والملفات الطبية بطريقة احترافية ومتطورة',
        primaryButton: 'ابدأ تجربتك المجانية',
        secondaryButton: 'شاهد العرض التوضيحي',
        trustIndicators: {
          secure: 'آمن ومحمي',
          timeSaving: 'يوفر الوقت',
          smart: 'ذكي ومتطور',
        },
        stats: {
          clinics: '60+ عيادة',
          employees: '1947 موظف',
          satisfaction: '99% رضا العملاء',
        },

        medicalBadge: 'نظام إدارة العيادات المتطور',
        heroTitle: 'العيادة الذكية',
        heroSubtitle: 'تبدأ من هنا',
        heroDescription:
          'مع روشيتة، انتهى زمن الورق والتأجيل وبدأ زمن الترتيب والراحة',
        heroDescription2: 'من أول موعد... لآخر متابعة – كل شيء في مكانه',
        feature1: 'جدولة ذكية',
        feature2: 'ملفات رقمية',
        feature3: 'متابعة شاملة',
        feature4: 'تقارير ذكية',
        ctaButton1: 'ابدأ تجربتك المجانية',
        ctaButton2: 'سجل دخولك',
        trustIndicator1: 'عيادة تثق بنا',
        trustIndicator2: 'مستخدم نشط',
        trustIndicator3: 'رضا العملاء',
        medicalElement1: 'حالة المريض',
        medicalElement1Status: 'مستقرة ✓',
        medicalElement2: 'المواعيد اليوم',
        medicalElement2Status: '12 موعد مجدول',
        medicalElement3: 'فحص شامل',
        medicalElement3Status: 'مكتمل',
      },
      featuresList: [
        'جدولة مواعيد بدون تعقيد. بتعرف من بدري وين في فراغات، وين في ضغط.',
        'ملف رقمي لكل مريض. مش بس التاريخ الطبي، بل ملاحظاتك كمان.',
        'تنبيهات تلقائية. للمريض، للطبيب، وللعيادة.',
        'متابعة عن بعد. مريضك في البيت؟ تقدر تتابعه من عندك.',
        'تقارير ذكية. مو بس أرقام… بل رؤى تساعدك تطور العيادة.',
      ],
      // Why Rousheta Section
      whyRushita: {
        title: 'لماذا روشيتة؟',
        subtitle: 'اكتشف كيف يمكن لروشيتة تحويل إدارة عيادتك',
        learnMore: 'تعرف على الحل',
        item1Title: 'مريض اتصل يسأل عن حالته… والسكرتيرة قلبت الدفاتر.',
        item1Description: 'مع روشيتة، جميع بيانات المرضى متاحة بنقرة واحدة',
        item2Title: 'طبيب يبحث عن ملف مريض… والملف ضائع في مكان ما.',
        item2Description:
          'نظام إلكتروني متكامل لحفظ وإدارة جميع الملفات الطبية',
        item3Title: 'مريض حجز موعد… ونسي الموعد وما جاء.',
        item3Description:
          'تذكيرات تلقائية للمرضى عبر الرسائل النصية والبريد الإلكتروني',
      },

      // Value Proposition
      valueProposition: {
        title: 'حلول متكاملة لعيادتك',
        subtitle: 'كل ما تحتاجه لإدارة عيادة ناجحة في مكان واحد',
        features: [
          'إدارة المرضى والملفات الطبية',
          'نظام المواعيد والتذكيرات',
          'التقارير والإحصائيات',
          'إدارة المخزون والأدوية',
          'الفواتير والمحاسبة',
          'تطبيق موبايل للمرضى',
        ],
      },

      // CTA Section
      cta: {
        offer: 'عرض حصري ومحدود',
        title: 'احصل الآن على نسختك',
        subtitle:
          'وتمتع بخصم مدى الحياة! كن من ضمن الفئة الأولى واحصل على خصم 50% مدى الحياة',
        offerBadge: '🔥 عرض محدود - خصم 50% مدى الحياة',
        startYourJourney: 'ابدأ رحلتك الطبية الذكية اليوم',
        button: 'إبدأ تجربة مجانية الآن',
        note: '✨ بدون التزامات • إلغاء في أي وقت • دعم فني مجاني',
        benefits: [
          {
            title: 'تجربة مجانية',
            description: '30 يوم كاملة',
          },
          {
            title: 'إعداد سريع',
            description: 'في دقائق معدودة',
          },
          {
            title: 'دعم مستمر',
            description: '24/7 متاح',
          },
        ],
        trustIndicators: [
          { title: 'عيادة تثق بنا' },
          { title: 'وقت تشغيل' },
          { title: 'تقييم المستخدمين' },
        ],
      },

      // About Section
      about: {
        title: 'قصتنا',
        subtitle: 'لماذا روشيتة؟',
        description:
          'نظام وُلد من قلب العيادات، صُمم بفهم عميق لاحتياجات الأطباء والمرضى',
        mainMessage: {
          title: 'مش مجرد نظام طبي…',
          subtitle: 'إحنا فاهمين ألم العيادة',
        },
        storyCards: [
          {
            description:
              '"روشيتة" انولد من قلب عيادة.. اشتغلنا مع أطباء، سكرتارية، مرضى سمعنا كل التفاصيل، كل المآسي، وكل آه صغيرة من ضغط يوم العيادة.',
          },
          {
            description:
              'ورجعنا صممنا النظام مش عشان يكون "جميل" وبس! ، لكن عشان يكون مفيد – سريع – واقعي – ذكي.',
          },
        ],
        keyFeatures: [
          { title: 'سهل الاستخدام' },
          { title: 'سريع وذكي' },
          { title: 'آمن ومحمي' },
          { title: 'دعم مستمر' },
        ],
        stats: [{ title: 'مستخدم نشط' }, { title: 'عيادة تثق بنا' }],
        overlay: {
          title: 'من قلب العيادة',
          description: 'تجربة حقيقية مع الأطباء والمرضى',
        },
      },

      // Features Section
      features: {
        title: 'خدماتنا المتكاملة',
        subtitle: 'ماذا نقدم؟',
        description:
          'كل شي تحتاجه… من أول "أهلا دكتور" لآخر "الله يعطيك العافية"',
        overlay: {
          title: 'نظام متكامل وذكي',
          description: 'تجربة سلسة لإدارة العيادة بكفاءة عالية',
        },
        bottomStats: [
          {
            title: 'سريع',
            description: 'إعداد في دقائق',
          },
          {
            title: 'موثوق',
            description: 'آمن ومضمون',
          },
        ],
      },

      // System Integration
      systemIntegration: {
        title: 'التكامل الذكي',
        subtitle: 'مش بس نظام…',
        description: 'روشيتة بيشتغل كأنه فريق كامل',
        note: 'من لحظة دخول المريض، لجدولة الموعد، للتشخيص، للوصفة، للمتابعة.. كل قسم في العيادة يتواصل تلقائيًا مع الثاني',
        features: [
          'الطبيب يشوف تنبيهات السكرتارية',
          'المختبر يستلم المطلوب لحاله',
          'المحاسب يعرف تلقائيًا حالة الفاتورة',
        ],
        hub: {
          title: 'روشيتة',
          description: 'المركز الذكي',
        },
        satellite: {
          doctor: 'الطبيب',
          lab: 'المختبر',
          accountant: 'المحاسب',
          secretary: 'السكرتارية',
        },
        bottomStats: [
          { title: 'تكامل تلقائي' },
          { title: 'عمل مستمر' },
          { title: 'أخطاء بشرية' },
        ],
      },

      // Final CTA
      finalCta: {
        badge: 'جاهز للانطلاق معك',
        title: 'نظامك الطبي',
        subtitle: 'بين يديك الآن',
        description:
          'من أول مريض لآخر تقرير، من جدولة المواعيد لإدارة المالية - روشيتة تحول عيادتك لنظام ذكي متكامل',
        features: [
          { title: 'إعداد سريع' },
          { title: 'سريع وذكي' },
          { title: 'آمن ومحمي' },
          { title: 'دعم 24/7' },
        ],
        subscription: {
          title: 'خطط الاشتراك',
          description: 'اختر الخطة التي تناسب احتياجات عيادتك',
          monthly: 'شهري',
          yearly: 'سنوي',
          save: 'وفر',
          perMonth: 'شهر',
          perYear: 'سنة',
          offer: 'عرض محدود',
          saveAmount: 'وفر {{amount}}$',
          startTrial: 'ابدأ تجربتك المجانية الآن',
          trialNote: '✨ تجربة مجانية 30 يوم • إلغاء في أي وقت',
          professional: {
            planName: 'الباقة الشاملة',
            subtitle: 'كل ما تحتاجه لعيادة ذكية ومتطورة',
            popular: 'الأكثر شعبية',
            features: {
              patientManagement: 'إدارة شاملة للمرضى والمواعيد',
              financialSystem: 'نظام مالي متكامل مع التقارير',
              medicalRecords: 'ملفات طبية رقمية آمنة',
              automatedReminders: 'تذكيرات تلقائية للمرضى',
              support: 'دعم فني متاح 24/7',
              lifetimeUpdates: 'تحديثات مجانية مدى الحياة',
            },
            highlights: {
              quickSetup: 'إعداد سريع',
              secure: 'حماية معتمدة',
              support: 'دعم فوري',
            },
          },
          basic: {
            name: 'الأساسية',
            price: '99',
            period: '/شهرياً',
            features: {
              users: 'حتى 3 مستخدمين',
              patients: '500 مريض',
              storage: '5GB مساحة تخزين',
              support: 'دعم فني عبر البريد الإلكتروني',
            },
            button: 'ابدأ الآن',
          },
          enterprise: {
            name: 'الشركات',
            price: 'اتصل بنا',
            period: '',
            features: {
              users: 'عدد غير محدود من المستخدمين',
              patients: 'مريض غير محدود',
              storage: 'مساحة تخزين غير محدودة',
              support: 'دعم مخصص',
              hospital: 'تكامل مع أنظمة المستشفيات',
              training: 'تدريب مخصص',
              solutions: 'حلول مخصصة',
            },
            button: 'اتصل بنا',
          },
        },
        trustIndicators: [
          { title: 'عيادة تثق بنا' },
          { title: 'وقت تشغيل' },
          { title: 'دعم فني' },
        ],
      },
      footer: {
        companyInfo: {
          description:
            'نظام إدارة العيادات الذكي الذي يجعل يوم عملك أسهل وأكثر تنظيماً. من أول موعد لآخر متابعة.',
          email: 'contact@rousheta.net',
          phone: ' +970 59 664 80097',
          address: 'الرياض، المملكة العربية السعودية',
        },
        quickLinks: 'روابط سريعة',
        contactUs: 'اتصل بنا',
        newsletter: {
          title: 'اشترك في نشرتنا البريدية',
          placeholder: 'عنوان بريدك الإلكتروني',
          subscribe: 'اشتراك',
          privacyNote: 'لن نشارك بريدك الإلكتروني مع أي طرف ثالث.',
        },

        socialMedia: 'تابعنا',
        rights: '© {year} روشيتة. جميع الحقوق محفوظة.',
        terms: 'شروط الخدمة',
        privacy: 'سياسة الخصوصية',
        scrollToTop: 'العودة للأعلى',
        supportResources: {
          title: 'الدعم والموارد',
          helpCenter: 'مركز المساعدة',
          faq: 'الاسئلة الشائعة',
          userGuide: 'دليل المستخدم',
          contactUs: 'تواصل معنا',
        },
        allRightsReserved: 'جميع الحقوق محفوظة',
        termsConditions: 'شروط والأحكام',
        usagePolicy: 'سياسة الاستخدام',
        privacyPolicy: 'سياسة الخصوصية',
      },
      projectName: 'روشيتة',
    },
  },
};
