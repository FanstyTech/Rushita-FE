export const clinicDashboard = {
  // Error states
  errorLoading: 'خطأ في تحميل لوحة التحكم',

  // Stats cards
  stats: {
    totalPatients: 'إجمالي المرضى',
    todayAppointments: 'مواعيد اليوم',
    completedToday: 'مكتملة اليوم',
    todayRevenue: 'إيرادات اليوم',
    fromYesterday: 'من الأمس',
    changeFromYesterday: 'من الأمس',
  },

  // Quick actions
  quickActions: {
    title: 'الإجراءات السريعة',
    newPatientRegistration: {
      title: 'تسجيل مريض جديد',
      description: 'تسجيل مريض جديد',
    },
    scheduleAppointment: {
      title: 'جدولة موعد',
      description: 'حجز موعد جديد',
    },
    viewPatientRecords: {
      title: 'عرض سجلات المرضى',
      description: 'الوصول إلى ملفات المرضى',
    },
    settings: {
      title: 'الإعدادات',
      description: 'إعدادات العيادة',
    },
    takeAction: 'اتخاذ إجراء',
  },

  // Charts
  charts: {
    appointmentsOverview: 'نظرة عامة على المواعيد',
    appointmentStatus: 'حالة المواعيد',
    totalAppointments: 'إجمالي المواعيد',
    completed: 'مكتملة',
    noDataAvailable: 'لا توجد بيانات متاحة لهذا النطاق الزمني',
  },

  // Time ranges (already exist in main translations, but for consistency)
  timeRanges: {
    daily: 'يومي',
    weekly: 'أسبوعي',
    monthly: 'شهري',
  },

  // Upcoming appointments
  upcomingAppointments: {
    title: 'المواعيد القادمة',
    noUpcoming: 'لا توجد مواعيد قادمة',
  },

  // Recent activities
  recentActivities: {
    title: 'الأنشطة الحديثة',
    noRecentActivities: 'لا توجد أنشطة حديثة',
    types: {
      registration: 'تسجيل',
      completion: 'إكمال',
      payment: 'دفع',
      cancellation: 'إلغاء',
    },
  },
};
