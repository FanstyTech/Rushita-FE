export const appointments = {
  // Main appointments page
  tabs: {
    upcoming: 'المواعيد القادمة',
    past: 'المواعيد السابقة',
  },
  messages: {
    noAppointments: 'لا توجد مواعيد',
    noUpcomingAppointments: 'لا توجد مواعيد قادمة حالياً',
    noPastAppointments: 'لا توجد مواعيد سابقة',
    failedToLoad: 'فشل في تحميل المواعيد',
    retry: 'إعادة المحاولة',
  },

  // Book appointment page
  booking: {
    steps: {
      selectClinic: 'اختيار العيادة',
      selectSpecialty: 'اختيار التخصص',
      selectDoctor: 'اختيار الطبيب',
      selectDateTime: 'اختيار الموعد',
      confirmation: 'تأكيد الحجز',
    },

    clinicSelection: {
      title: 'اختر العيادة',
      previousBookingsTag: 'لديك حجوزات سابقة',
    },

    specialtySelection: {
      title: 'اختر التخصص الطبي',
      emptyState: {
        title: 'لم يتم العثور على تخصصات',
        message: 'يرجى اختيار عيادة أولاً لعرض التخصصات المتاحة',
        backButton: 'العودة لاختيار العيادة',
      },
    },

    doctorSelection: {
      title: 'اختر الطبيب',
      emptyState: {
        title: 'لم يتم العثور على أطباء',
        message: 'لم يتم العثور على أطباء في هذا التخصص، يرجى اختيار تخصص آخر',
        backButton: 'العودة لاختيار التخصص',
      },
    },

    dateTimeSelection: {
      title: 'اختر التاريخ والوقت',
      dateLabel: 'التاريخ',
      timeLabel: 'الوقت',
      reasonLabel: 'سبب الزيارة (اختياري)',
      reasonPlaceholder: 'اكتب سبب الزيارة هنا...',
      emptyTimeSlots: {
        title: 'اختر تاريخ أولاً',
        message: 'يرجى اختيار تاريخ لعرض الأوقات المتاحة',
      },
    },

    header: {
      backButton: 'العودة',
      title: 'حجز موعد جديد',
      subtitle: 'اختر العيادة والتخصص والطبيب والموعد المناسب لك',
    },

    footer: {
      previousButton: 'السابق',
      nextButton: 'التالي',
      confirmButton: 'تأكيد الحجز',
      submittingButton: 'جاري الحجز...',
    },

    confirmation: {
      title: 'تأكيد الموعد',
      appointmentDetails: 'تفاصيل الموعد',
      clinicLabel: 'العيادة',
      specialtyLabel: 'التخصص',
      doctorLabel: 'الطبيب',
      dateTimeLabel: 'التاريخ والوقت',
      reasonLabel: 'سبب الزيارة',
      bookingConditions: 'شروط الحجز',
    },
  },

  // Appointments list components
  list: {
    header: {
      title: 'المواعيد',
      subtitle: 'إدارة مواعيدك الطبية وحجز مواعيد جديدة',
      newAppointmentButton: 'حجز موعد جديد',
    },
    filters: {
      title: 'تصفية المواعيد',
      subtitle: 'يمكنك تصفية المواعيد حسب التخصص والحالة',
      resetFilters: 'إعادة ضبط الفلاتر',
      search: 'بحث',
      searchPlaceholder: 'ابحث عن طبيب أو تخصص...',
      specialtyLabel: 'التخصص',
      selectSpecialty: 'اختر التخصص',
      statusLabel: 'حالة الموعد',
      allStatuses: 'جميع الحالات',
      appointmentCount: '{{count}} موعد {{type}}',
      upcomingTab: 'المواعيد القادمة',
      pastTab: 'المواعيد السابقة',
      upcoming: 'قادم',
      past: 'سابق',
    },
    card: {
      details: 'التفاصيل',
      cancel: 'إلغاء',
      requestFollowUp: 'طلب موعد متابعة',
      notes: 'ملاحظات',
    },
    emptyState: {
      title: 'لا توجد مواعيد',
      upcomingMessage: 'ليس لديك مواعيد قادمة تطابق معايير البحث الخاصة بك',
      pastMessage: 'ليس لديك مواعيد سابقة تطابق معايير البحث الخاصة بك',
      newAppointmentButton: 'حجز موعد جديد',
    },
  },

  // Appointment details page
  details: {
    pageTitle: 'تفاصيل الموعد',
    pageSubtitle: 'عرض تفاصيل الموعد وإدارته',
    backButton: 'العودة',
    appointmentInfo: {
      title: 'معلومات الموعد',
      date: 'التاريخ',
      time: 'الوقت',
      notes: 'ملاحظات',
      cancellationReason: 'سبب الإلغاء',
      appointmentNumber: 'رقم الموعد',
    },
    clinicDoctorInfo: {
      title: 'تفاصيل العيادة والطبيب',
      clinic: 'العيادة',
      address: 'العنوان',
    },
    actions: {
      cancel: 'إلغاء الموعد',
      canceling: 'جاري الإلغاء...',
      reschedule: 'إعادة جدولة الموعد',
      bookFollowUp: 'حجز موعد متابعة',
    },
    modals: {
      cancel: {
        title: 'إلغاء الموعد',
        message:
          'هل أنت متأكد من رغبتك في إلغاء هذا الموعد؟ لا يمكن التراجع عن هذا الإجراء.',
        reasonLabel: 'سبب الإلغاء (اختياري)',
        reasonPlaceholder: 'يرجى ذكر سبب الإلغاء...',
        cancelButton: 'إلغاء',
        confirmButton: 'تأكيد الإلغاء',
      },
      reschedule: {
        title: 'إعادة جدولة الموعد',
        message: 'سيتم توجيهك إلى صفحة حجز المواعيد لاختيار وقت جديد.',
        cancelButton: 'إلغاء',
        continueButton: 'متابعة',
      },
      followUp: {
        title: 'حجز موعد متابعة',
        message:
          'سيتم حجز موعد متابعة مع نفس الطبيب والعيادة. يمكنك اختيار التاريخ المفضل وسبب الموعد.',
        preferredDateLabel: 'التاريخ المفضل (اختياري)',
        reasonLabel: 'سبب الموعد',
        reasonPlaceholder: 'يرجى ذكر سبب الموعد...',
        reasonDefault: 'متابعة - {{reason}}',
        reasonFallback: 'موعد متابعة',
        note: 'إذا لم تختر تاريخاً، سيتم حجز الموعد بعد أسبوعين من اليوم.',
        noteLabel: 'ملاحظة:',
        cancelButton: 'إلغاء',
        bookButton: 'حجز الموعد',
      },
    },
    errors: {
      title: 'حدث خطأ',
      loadingMessage: 'حدث خطأ أثناء تحميل تفاصيل الموعد',
      backToAppointments: 'العودة إلى المواعيد',
    },
    notFound: {
      title: 'الموعد غير موجود',
      message:
        'لم يتم العثور على الموعد المطلوب. قد يكون تم حذفه أو أن الرابط غير صحيح.',
      backToAppointments: 'العودة إلى المواعيد',
    },
  },
};
