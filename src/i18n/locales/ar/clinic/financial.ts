export const financial = {
  expenses: {
    title: 'المصروفات',
    description: 'إدارة مصروفات العيادة والتقارير المالية',

    summary: {
      cards: {
        totalExpenses: 'إجمالي المصروفات',
        thisMonth: 'هذا الشهر',
        averageExpenses: 'متوسط المصروفات',
        totalTransactions: 'إجمالي المعاملات',
      },
    },

    table: {
      columns: {
        expenseType: 'نوع المصروف',
        amount: 'المبلغ',
        date: 'التاريخ',
        description: 'الوصف',
        actions: 'الإجراءات',
      },
    },

    filters: {
      searchPlaceholder: 'البحث في المصروفات...',
      expenseType: 'نوع المصروف',
      allTypes: 'جميع الأنواع',
    },

    actions: {
      add: 'إضافة مصروف جديد',
      edit: 'تعديل',
      delete: 'حذف',
      cancel: 'إلغاء',
      save: 'حفظ',
      addExpense: 'إضافة مصروف',
      updateExpense: 'تحديث المصروف',
    },

    form: {
      title: {
        add: 'إضافة مصروف جديد',
        edit: 'تعديل المصروف',
      },
      labels: {
        expenseType: 'نوع المصروف',
        amount: 'المبلغ',
        date: 'التاريخ',
        description: 'الوصف',
      },
      placeholders: {
        description: 'أدخل وصف المصروف...',
      },
    },

    expenseTypes: {
      rent: 'إيجار',
      utilities: 'مرافق',
      salaries: 'رواتب',
      supplies: 'مستلزمات',
      equipment: 'معدات',
      maintenance: 'صيانة',
      insurance: 'تأمين',
      marketing: 'تسويق',
      other: 'أخرى',
    },

    validation: {
      expenseTypeRequired: 'نوع المصروف مطلوب',
      expenseTypeInvalid: 'نوع المصروف غير صحيح',
      amountRequired: 'المبلغ مطلوب',
      amountMinimum: 'يجب أن يكون المبلغ أكبر من 0',
      dateRequired: 'التاريخ مطلوب',
    },

    deleteModal: {
      title: 'حذف المصروف',
      message: 'هل أنت متأكد من حذف سجل المصروف هذا؟',
      secondaryMessage: 'لا يمكن التراجع عن هذا الإجراء.',
      confirmText: 'حذف',
    },

    emptyStates: {
      noExpenses: {
        title: 'لا توجد مصروفات',
        description: 'لم يتم العثور على مصروفات تطابق المرشحات المحددة',
      },
    },

    loading: {
      loadingExpenses: 'جاري تحميل المصروفات...',
      savingExpense: 'جاري حفظ المصروف...',
      deletingExpense: 'جاري حذف المصروف...',
    },

    messages: {
      success: {
        expenseAdded: 'تم إضافة المصروف بنجاح',
        expenseUpdated: 'تم تحديث المصروف بنجاح',
        expenseDeleted: 'تم حذف المصروف بنجاح',
      },
      error: {
        addExpenseFailed: 'فشل في إضافة المصروف',
        updateExpenseFailed: 'فشل في تحديث المصروف',
        deleteExpenseFailed: 'فشل في حذف المصروف',
        loadingFailed: 'فشل في تحميل البيانات',
      },
    },
  },

  revenues: {
    title: 'الإيرادات',
    description: 'إدارة إيرادات العيادة والتقارير المالية',

    summary: {
      cards: {
        totalRevenue: 'إجمالي الإيرادات',
        thisMonth: 'هذا الشهر',
        averageRevenue: 'متوسط الإيرادات',
        totalTransactions: 'إجمالي المعاملات',
      },
    },

    table: {
      columns: {
        revenueType: 'نوع الإيراد',
        amount: 'المبلغ',
        date: 'التاريخ',
        description: 'الوصف',
        actions: 'الإجراءات',
      },
    },

    filters: {
      searchPlaceholder: 'البحث في الإيرادات...',
      revenueType: 'نوع الإيراد',
      allTypes: 'جميع الأنواع',
    },

    actions: {
      add: 'إضافة إيراد جديد',
      edit: 'تعديل',
      delete: 'حذف',
      cancel: 'إلغاء',
      save: 'حفظ',
      addRevenue: 'إضافة إيراد',
      updateRevenue: 'تحديث الإيراد',
    },

    form: {
      title: {
        add: 'إضافة إيراد جديد',
        edit: 'تعديل الإيراد',
      },
      labels: {
        revenueType: 'نوع الإيراد',
        amount: 'المبلغ',
        date: 'التاريخ',
        description: 'الوصف',
      },
      placeholders: {
        description: 'أدخل وصف الإيراد...',
      },
    },

    revenueTypes: {
      visit: 'زيارة',
      donations: 'تبرعات',
      governmentSupport: 'دعم حكومي',
      other: 'أخرى',
    },

    validation: {
      revenueTypeRequired: 'نوع الإيراد مطلوب',
      revenueTypeInvalid: 'نوع الإيراد غير صحيح',
      amountRequired: 'المبلغ مطلوب',
      amountMinimum: 'يجب أن يكون المبلغ أكبر من 0',
      dateRequired: 'التاريخ مطلوب',
    },

    deleteModal: {
      title: 'حذف الإيراد',
      message: 'هل أنت متأكد من حذف سجل الإيراد هذا؟',
      secondaryMessage: 'لا يمكن التراجع عن هذا الإجراء.',
      confirmText: 'حذف',
    },

    emptyStates: {
      noRevenues: {
        title: 'لا توجد إيرادات',
        description: 'لم يتم العثور على إيرادات تطابق المرشحات المحددة',
      },
    },

    loading: {
      loadingRevenues: 'جاري تحميل الإيرادات...',
      savingRevenue: 'جاري حفظ الإيراد...',
      deletingRevenue: 'جاري حذف الإيراد...',
    },

    messages: {
      success: {
        revenueAdded: 'تم إضافة الإيراد بنجاح',
        revenueUpdated: 'تم تحديث الإيراد بنجاح',
        revenueDeleted: 'تم حذف الإيراد بنجاح',
      },
      error: {
        addRevenueFailed: 'فشل في إضافة الإيراد',
        updateRevenueFailed: 'فشل في تحديث الإيراد',
        deleteRevenueFailed: 'فشل في حذف الإيراد',
        loadingFailed: 'فشل في تحميل البيانات',
      },
    },
  },

  salaries: {
    title: 'الرواتب',
    description: 'إدارة رواتب الموظفين والتقارير المالية',

    summary: {
      cards: {
        totalSalaries: 'إجمالي الرواتب',
        totalAmount: 'إجمالي المبلغ',
        totalPaid: 'إجمالي المدفوع',
        pendingSalaries: 'الرواتب المعلقة',
        pending: 'معلق',
      },
    },

    table: {
      columns: {
        staffName: 'اسم الموظف',
        amount: 'المبلغ',
        salaryMonth: 'شهر الراتب',
        status: 'الحالة',
        paidDate: 'تاريخ الدفع',
        notes: 'ملاحظات',
        actions: 'الإجراءات',
      },
    },

    filters: {
      searchPlaceholder: 'البحث في الرواتب...',
      status: 'الحالة',
      allStatuses: 'جميع الحالات',
    },

    actions: {
      add: 'إضافة راتب جديد',
      edit: 'تعديل',
      delete: 'حذف',
      cancel: 'إلغاء',
      save: 'حفظ',
      addSalary: 'إضافة راتب',
      updateSalary: 'تحديث الراتب',
    },

    form: {
      title: {
        add: 'إضافة راتب جديد',
        edit: 'تعديل الراتب',
      },
      labels: {
        staffMember: 'عضو الطاقم',
        amount: 'المبلغ',
        salaryMonth: 'شهر الراتب',
        status: 'الحالة',
        paidDate: 'تاريخ الدفع',
        notes: 'ملاحظات',
      },
      placeholders: {
        notes: 'أدخل ملاحظات...',
      },
    },

    statuses: {
      pending: 'معلق',
      paid: 'مدفوع',
      cancelled: 'ملغي',
      overdue: 'متأخر',
    },

    validation: {
      staffIdRequired: 'عضو الطاقم مطلوب',
      amountRequired: 'المبلغ مطلوب',
      amountMinimum: 'يجب أن يكون المبلغ أكبر من 0',
      salaryMonthRequired: 'شهر الراتب مطلوب',
      statusRequired: 'الحالة مطلوبة',
      statusInvalid: 'حالة غير صحيحة',
    },

    deleteModal: {
      title: 'حذف الراتب',
      message: 'هل أنت متأكد من حذف سجل الراتب هذا؟',
      secondaryMessage: 'لا يمكن التراجع عن هذا الإجراء.',
      confirmText: 'حذف',
    },

    emptyStates: {
      noSalaries: {
        title: 'لا توجد رواتب',
        description: 'لم يتم العثور على رواتب تطابق المرشحات المحددة',
      },
    },

    loading: {
      loadingSalaries: 'جاري تحميل الرواتب...',
      savingSalary: 'جاري حفظ الراتب...',
      deletingSalary: 'جاري حذف الراتب...',
    },

    messages: {
      success: {
        salaryAdded: 'تم إضافة الراتب بنجاح',
        salaryUpdated: 'تم تحديث الراتب بنجاح',
        salaryDeleted: 'تم حذف الراتب بنجاح',
      },
      error: {
        addSalaryFailed: 'فشل في إضافة الراتب',
        updateSalaryFailed: 'فشل في تحديث الراتب',
        deleteSalaryFailed: 'فشل في حذف الراتب',
        loadingFailed: 'فشل في تحميل البيانات',
      },
    },
  },

  invoices: {
    title: 'الفواتير',
    description: 'إدارة فواتير المرضى والمدفوعات',

    summary: {
      cards: {
        totalInvoices: 'إجمالي الفواتير',
        totalAmount: 'إجمالي المبلغ',
        totalPaid: 'إجمالي المدفوع',
        overdueInvoices: 'الفواتير المتأخرة',
        unpaid: 'غير مدفوع',
      },
    },

    table: {
      columns: {
        invoiceNumber: 'رقم الفاتورة',
        patientName: 'اسم المريض',
        doctorName: 'اسم الطبيب',
        totalAmount: 'إجمالي المبلغ',
        paidUnpaid: 'مدفوع/غير مدفوع',
        status: 'الحالة',
        dueDate: 'تاريخ الاستحقاق',
        actions: 'الإجراءات',
        paid: 'مدفوع',
        unpaid: 'غير مدفوع',
      },
    },

    filters: {
      searchPlaceholder: 'البحث في الفواتير...',
      status: 'الحالة',
      allStatuses: 'جميع الحالات',
    },

    actions: {
      view: 'عرض',
      addPayment: 'إضافة دفعة',
      delete: 'حذف',
      close: 'إغلاق',
      cancel: 'إلغاء',
    },

    statuses: {
      draft: 'مسودة',
      sent: 'مرسلة',
      paid: 'مدفوعة',
      overdue: 'متأخرة',
      cancelled: 'ملغاة',
      partial: 'جزئية',
    },

    paymentMethods: {
      cash: 'نقدي',
      card: 'بطاقة',
      bankTransfer: 'تحويل بنكي',
      insurance: 'تأمين',
      check: 'شيك',
    },

    serviceTypes: {
      consultation: 'استشارة',
      procedure: 'إجراء',
      medication: 'دواء',
      laboratory: 'مختبر',
      radiology: 'أشعة',
      surgery: 'جراحة',
      therapy: 'علاج طبيعي',
      other: 'أخرى',
    },

    modals: {
      payment: {
        title: 'إضافة دفعة',
        labels: {
          amount: 'المبلغ',
          paymentDate: 'تاريخ الدفع',
          paymentMethod: 'طريقة الدفع',
          referenceNumber: 'رقم المرجع',
          notes: 'ملاحظات',
        },
        buttons: {
          addPayment: 'إضافة دفعة',
          cancel: 'إلغاء',
        },
      },
      view: {
        title: 'تفاصيل الفاتورة - {{invoiceNumber}}',
        sections: {
          invoiceInformation: 'معلومات الفاتورة',
          patientDoctor: 'المريض والطبيب',
          invoiceItems: 'عناصر الفاتورة',
          paymentSummary: 'ملخص الدفع',
          paymentHistory: 'تاريخ المدفوعات',
          notes: 'ملاحظات',
        },
        labels: {
          invoiceNumber: 'رقم الفاتورة:',
          invoiceDate: 'تاريخ الفاتورة:',
          dueDate: 'تاريخ الاستحقاق:',
          status: 'الحالة:',
          patient: 'المريض:',
          doctor: 'الطبيب:',
          totalAmount: 'إجمالي المبلغ',
          paidAmount: 'المبلغ المدفوع',
          unpaidAmount: 'المبلغ غير المدفوع',
          payment: 'دفعة #{{number}}',
        },
        buttons: {
          close: 'إغلاق',
          addPayment: 'إضافة دفعة',
        },
        messages: {
          noNotes: 'لا توجد ملاحظات إضافية لهذه الفاتورة.',
        },
      },
      delete: {
        title: 'حذف الفاتورة',
        message: 'هل أنت متأكد من حذف هذه الفاتورة؟',
        secondaryMessage: 'لا يمكن التراجع عن هذا الإجراء.',
        confirmText: 'حذف',
      },
    },

    validation: {
      amountRequired: 'المبلغ مطلوب',
      amountMinimum: 'يجب أن يكون المبلغ أكبر من 0',
      paymentDateRequired: 'تاريخ الدفع مطلوب',
      paymentMethodRequired: 'طريقة الدفع مطلوبة',
      paymentMethodInvalid: 'طريقة دفع غير صحيحة',
    },

    loading: {
      loadingInvoices: 'جاري تحميل الفواتير...',
      savingPayment: 'جاري حفظ الدفعة...',
      deletingInvoice: 'جاري حذف الفاتورة...',
    },

    messages: {
      success: {
        paymentAdded: 'تم إضافة الدفعة بنجاح',
        invoiceDeleted: 'تم حذف الفاتورة بنجاح',
      },
      error: {
        addPaymentFailed: 'فشل في إضافة الدفعة',
        deleteInvoiceFailed: 'فشل في حذف الفاتورة',
        loadingFailed: 'فشل في تحميل البيانات',
      },
    },

    emptyStates: {
      noInvoices: 'لا توجد فواتير',
      noInvoicesDescription: 'لم يتم العثور على فواتير تطابق المرشحات المحددة',
    },
  },

  transactions: {
    title: 'المعاملات',
    description: 'عرض جميع المعاملات المالية للعيادة',

    summary: {
      cards: {
        totalInflow: 'إجمالي التدفق الداخل',
        totalOutflow: 'إجمالي التدفق الخارج',
        netAmount: 'صافي المبلغ',
        totalTransactions: 'إجمالي المعاملات',
        thisMonth: 'هذا الشهر',
      },
    },

    table: {
      columns: {
        type: 'النوع',
        amount: 'المبلغ',
        date: 'التاريخ',
        description: 'الوصف',
        referenceType: 'نوع المرجع',
        referenceId: 'معرف المرجع',
      },
    },

    filters: {
      searchPlaceholder: 'البحث في المعاملات...',
      transactionType: 'نوع المعاملة',
      referenceType: 'نوع المرجع',
      allTypes: 'جميع الأنواع',
    },

    transactionTypes: {
      inflow: 'تدفق داخل',
      outflow: 'تدفق خارج',
    },

    referenceTypes: {
      revenue: 'إيراد',
      expense: 'مصروف',
      salary: 'راتب',
      invoice: 'فاتورة',
    },

    emptyStates: {
      noTransactions: {
        title: 'لا توجد معاملات',
        description: 'لم يتم العثور على معاملات تطابق المرشحات المحددة',
      },
    },

    loading: {
      loadingTransactions: 'جاري تحميل المعاملات...',
    },

    messages: {
      error: {
        loadingFailed: 'فشل في تحميل البيانات',
      },
    },
  },

  servicePrices: {
    title: 'أسعار الخدمات',
    description: 'إدارة أسعار الخدمات الطبية للعيادة',

    serviceTypes: {
      visit: 'زيارة',
      prescription: 'وصفة طبية',
      labTest: 'فحص مختبري',
      radiology: 'أشعة',
      dental: 'أسنان',
    },

    summary: {
      cards: {
        count: 'العدد',
        avgPrice: 'متوسط السعر',
      },
    },

    table: {
      columns: {
        serviceType: 'نوع الخدمة',
        service: 'الخدمة',
        price: 'السعر',
        clinic: 'العيادة',
        doctor: 'الطبيب',
        status: 'الحالة',
        actions: 'الإجراءات',
      },
    },

    filters: {
      searchPlaceholder: 'البحث في أسعار الخدمات...',
      doctor: 'الطبيب',
      allDoctors: 'جميع الأطباء',
    },

    actions: {
      add: 'إضافة سعر خدمة جديد',
      edit: 'تعديل',
      delete: 'حذف',
      cancel: 'إلغاء',
      save: 'حفظ',
      saveChanges: 'حفظ التغييرات',
      addServicePrice: 'إضافة سعر خدمة',
    },

    form: {
      title: {
        add: 'إضافة سعر خدمة جديد',
        edit: 'تعديل سعر الخدمة',
      },
      labels: {
        serviceType: 'نوع الخدمة',
        service: 'الخدمة',
        price: 'السعر',
        doctor: 'الطبيب',
        notes: 'ملاحظات',
        status: 'الحالة',
      },
      placeholders: {
        selectDoctor: 'اختر الطبيب',
        generalAllServices: 'عام (جميع الخدمات)',
      },
    },

    status: {
      active: 'نشط',
      inactive: 'غير نشط',
    },

    validation: {
      serviceTypeRequired: 'نوع الخدمة مطلوب',
      serviceTypeInvalid: 'نوع خدمة غير صحيح',
      priceRequired: 'السعر مطلوب',
      priceMinimum: 'يجب أن يكون السعر على الأقل 1',
      priceInvalid: 'السعر يجب أن يكون رقماً',
      clinicRequired: 'العيادة مطلوبة',
      notesMaxLength: 'الملاحظات يجب ألا تتجاوز 500 حرف',
      statusRequired: 'الحالة مطلوبة',
      statusInvalid: 'الحالة يجب أن تكون نشطة أو غير نشطة',
    },

    deleteModal: {
      title: 'حذف سعر الخدمة',
      message: 'هل أنت متأكد من حذف سعر الخدمة هذا؟',
      secondaryMessage: 'لا يمكن التراجع عن هذا الإجراء.',
      confirmText: 'حذف',
    },

    emptyStates: {
      noServicePrices: {
        title: 'لا توجد أسعار خدمات',
        description: 'لم يتم العثور على أسعار خدمات تطابق المرشحات المحددة',
      },
    },

    loading: {
      loadingServicePrices: 'جاري تحميل أسعار الخدمات...',
      loadingDetails: 'جاري تحميل التفاصيل...',
      savingServicePrice: 'جاري حفظ سعر الخدمة...',
      deletingServicePrice: 'جاري حذف سعر الخدمة...',
    },

    messages: {
      success: {
        servicePriceAdded: 'تم إضافة سعر الخدمة بنجاح',
        servicePriceUpdated: 'تم تحديث سعر الخدمة بنجاح',
        servicePriceDeleted: 'تم حذف سعر الخدمة بنجاح',
      },
      error: {
        addServicePriceFailed: 'فشل في إضافة سعر الخدمة',
        updateServicePriceFailed: 'فشل في تحديث سعر الخدمة',
        deleteServicePriceFailed: 'فشل في حذف سعر الخدمة',
        loadingFailed: 'فشل في تحميل البيانات',
      },
    },
  },

  dashboard: {
    title: 'لوحة التحكم المالية',
    subtitle: 'نظرة شاملة على الأداء المالي للعيادة',
    status: {
      liveConnection: 'متصل مباشر',
      lastUpdate: 'آخر تحديث',
    },
    actions: {
      refreshData: 'تحديث البيانات',
    },
    periods: {
      week: 'أسبوع',
      month: 'شهر',
      year: 'سنة',
    },
    kpiCards: {
      totalRevenue: {
        title: 'إجمالي الإيرادات',
        description: 'مقارنة بالفترة السابقة',
        trend: '+12.5%',
      },
      totalExpenses: {
        title: 'إجمالي المصروفات',
        description: 'انخفاض في المصروفات',
        trend: '-3.2%',
      },
      netProfit: {
        title: 'صافي الربح',
        description: 'نمو مستمر في الأرباح',
        trend: '+8.1%',
      },
      totalInvoices: {
        title: 'إجمالي الفواتير',
        description: 'إدارة الفواتير',
        paidLabel: 'مدفوعة',
      },
    },
    charts: {
      revenueVsExpenses: {
        title: 'الإيرادات مقابل المصروفات',
        revenueLabel: 'الإيرادات',
        expensesLabel: 'المصروفات',
      },
      invoiceStatus: {
        title: 'حالة الفواتير',
        paid: 'مدفوعة',
        pending: 'معلقة',
        overdue: 'متأخرة',
      },
    },
    recentTransactions: {
      title: 'المعاملات الأخيرة',
      subtitle: 'آخر العمليات المالية',
      viewAll: 'عرض الكل',
      sampleTransactions: {
        visitInvoice: 'فاتورة زيارة',
        medicalSupplies: 'شراء مستلزمات طبية',
        clinicRent: 'دفع إيجار العيادة',
      },
      status: {
        completed: 'مكتمل',
        pending: 'معلق',
      },
    },
    keyMetrics: {
      profitMargin: {
        title: 'هامش الربح',
      },
      averageVisit: {
        title: 'متوسط الزيارة',
        trend: '+15.3%',
      },
      collectionRate: {
        title: 'معدل التحصيل',
      },
    },
    emptyStates: {
      noData: 'لا توجد بيانات متوفرة',
    },
  },
};
