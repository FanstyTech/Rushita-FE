export const billing = {
  list: {
    title: 'الفواتير والمدفوعات',
    description: 'عرض وإدارة فواتيرك الطبية والمدفوعات',
    filters: {
      search: 'بحث',
      searchPlaceholder: 'ابحث برقم الفاتورة...',
      description:
        'يمكنك تصفية الفواتير حسب الحالة أو التاريخ أو البحث برقم الفاتورة',
      status: 'حالة الفاتورة',
      statusAll: 'جميع الحالات',
      filter: 'تصفية النتائج',
      reset: 'إعادة ضبط الفلاتر',
    },
    stats: {
      totalInvoices: 'إجمالي الفواتير',
      totalAmount: 'إجمالي المبلغ',
      totalPaid: 'المدفوع',
      totalUnpaid: 'المتبقي',
    },
    card: {
      invoiceNumber: 'فاتورة رقم:',
      invoiceDate: 'تاريخ الفاتورة:',
      dueDate: 'تاريخ الاستحقاق:',
      totalAmount: 'المبلغ الإجمالي:',
      paidAmount: 'المدفوع:',
      remainingAmount: 'المتبقي:',
      lastPayment: 'آخر دفعة:',
      servicesCount: 'عدد الخدمات:',
      noPayment: 'لا توجد',
      viewDetails: 'عرض التفاصيل',
      downloadPDF: 'تحميل PDF',
    },
    empty: {
      title: 'لا توجد فواتير',
      description: 'لم يتم العثور على فواتير تطابق معايير البحث',
    },
    error: {
      title: 'فشل في تحميل الفواتير',
      description: 'حدث خطأ أثناء تحميل الفواتير. يرجى المحاولة مرة أخرى.',
      retry: 'إعادة المحاولة',
    },
    loading: 'جاري تحميل الفواتير...',
  },
  details: {
    title: 'تفاصيل الفاتورة',
    subtitle: 'تفاصيل الفاتورة والمدفوعات',
    backToList: 'العودة للفواتير',
    sections: {
      invoiceSummary: 'ملخص الفاتورة',
      serviceDetails: 'تفاصيل الخدمات',
      paymentHistory: 'سجل المدفوعات',
      financialSummary: 'الملخص المالي',
      patientDoctorInfo: 'معلومات المريض والطبيب',
    },
    invoiceInfo: {
      invoiceDate: 'تاريخ الفاتورة',
      dueDate: 'تاريخ الاستحقاق',
      status: 'الحالة',
      invoiceNumber: 'رقم الفاتورة',
    },
    serviceDetails: {
      quantity: 'الكمية:',
    },
    paymentHistory: {
      referenceNumber: 'رقم المرجع:',
    },
    financialSummary: {
      totalAmount: 'المبلغ الإجمالي:',
      paidAmount: 'المدفوع:',
      remainingAmount: 'المتبقي:',
    },
    patientInfo: {
      patient: 'المريض',
      doctor: 'الطبيب',
      clinic: 'العيادة',
    },
    error: {
      title: 'فشل في تحميل تفاصيل الفاتورة',
      description: 'حدث خطأ أثناء تحميل تفاصيل الفاتورة.',
      backToList: 'العودة للفواتير',
    },
    loading: 'جاري تحميل تفاصيل الفاتورة...',
  },
};
