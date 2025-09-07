export const dashboard = {
  welcome: {
    greeting: 'مرحباً، ',
    user: 'المستخدم',
    editProfile: 'تعديل الملف الشخصي',
    title: 'مرحباً بك في بوابة المرضى',
    description: 'إدارة صحتك بسهولة ومتابعة حالتك الطبية من مكان واحد',
    bookAppointment: 'حجز موعد',
    prescriptions: 'الوصفات الطبية',
    visitHistory: 'تاريخ الزيارات',
    tagline: 'صحتك أولويتنا',
    subTagline: 'خدمات طبية متميزة',
  },
  appointments: {
    title: 'المواعيد القادمة',
    appointmentsCount: 'موعد',
    description: 'مواعيدك المجدولة مع الأطباء',
    viewAll: 'عرض جميع المواعيد',
    noAppointments: {
      title: 'لا توجد مواعيد',
      description: 'ليس لديك أي مواعيد مجدولة حالياً',
      button: 'احجز موعدك الأول',
    },
  },
  medications: {
    title: 'الأدوية الحالية',
    medicationsCount: 'دواء',
    description: 'الأدوية الموصوفة لك حالياً',
    viewAll: 'عرض جميع الأدوية',
    noMedications: {
      title: 'لا توجد أدوية',
      description: 'ليس لديك أي أدوية موصوفة حالياً',
    },
  },
  recentVisits: {
    title: 'الزيارات الأخيرة',
    visitsCount: 'زيارة',
    description: 'آخر زياراتك الطبية',
    viewAll: 'عرض جميع الزيارات',
    noVisits: {
      title: 'لا توجد زيارات',
      description: 'لم تقم بأي زيارات طبية بعد',
    },
  },
  tabs: {
    overview: 'نظرة عامة',
    health: 'الصحة',
    notifications: 'الإشعارات',
  },
  quickActions: {
    bookAppointment: 'حجز موعد',
    requestConsultation: 'طلب استشارة',
    requestPrescription: 'طلب وصفة طبية',
    profile: 'الملف الشخصي',
  },
  notifications: {
    appointmentConfirmed: 'تم تأكيد موعدك',
    testResultsReady: 'نتائج التحاليل جاهزة',
    medicationReminder: 'تذكير بموعد الدواء',
    newDoctorMessage: 'رسالة جديدة من الطبيب',
    systemUpdate: 'تحديث في نظام المواعيد',
    viewAppointment: 'عرض الموعد',
    viewResults: 'عرض النتائج',
    viewMedications: 'عرض الأدوية',
    readMessage: 'قراءة الرسالة',
    messages: {
      appointmentConfirmed:
        'تم تأكيد موعدك مع د. أحمد خالد يوم الأحد، 15 أكتوبر الساعة 10:00 صباحاً',
      testResultsReady: 'نتائج تحاليل الدم الخاصة بك جاهزة للاطلاع عليها',
      medicationReminder:
        'تذكير بموعد تناول دواء الضغط (أملوديبين) الساعة 9:00 مساءً',
      newDoctorMessage:
        'لديك رسالة جديدة من د. سارة محمد بخصوص استفسارك الأخير',
      systemUpdate:
        'تم تحديث نظام حجز المواعيد، يمكنك الآن حجز المواعيد عبر تطبيق الهاتف',
    },
    timeUnits: {
      minutes: 'دقيقة',
      hours: 'ساعات',
      days: 'يوم',
    },
  },
  healthAlerts: {
    highBloodPressure: 'ارتفاع في ضغط الدم',
    vaccinationReminder: 'تذكير بموعد التطعيم',
    healthDataUpdate: 'تحديث معلومات الصحة',
    bookAppointmentWithDoctor: 'حجز موعد مع الطبيب',
    bookVaccinationAppointment: 'حجز موعد التطعيم',
    updateHealthData: 'تحديث البيانات',
    messages: {
      highBloodPressure:
        'تم تسجيل قراءات مرتفعة لضغط الدم في آخر 3 قياسات. يرجى مراجعة طبيبك.',
      vaccinationReminder:
        'حان موعد التطعيم السنوي ضد الإنفلونزا. يرجى حجز موعد في أقرب وقت ممكن.',
      healthDataUpdate:
        'لم يتم تحديث قياسات الوزن منذ أكثر من 3 أشهر. يرجى تحديث بياناتك الصحية.',
    },
  },
  errors: {
    failedToLoadDashboard: 'فشل في تحميل بيانات لوحة التحكم',
    retry: 'إعادة المحاولة',
  },
};
