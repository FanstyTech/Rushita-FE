export const profile = {
  title: 'ملف العيادة الشخصي',
  description: 'إدارة معلومات العيادة والإعدادات الأساسية',

  buttons: {
    edit: 'تعديل الملف',
    cancel: 'إلغاء',
    save: 'حفظ التغييرات',
  },

  sections: {
    basicInfo: {
      title: 'المعلومات الأساسية',
      description: 'معلومات العيادة الأساسية والتواصل',
    },
    location: {
      title: 'معلومات الموقع',
      description: 'عنوان العيادة والموقع الجغرافي',
    },
    workingHours: {
      title: 'ساعات العمل',
      description: 'تحديد أوقات عمل العيادة خلال الأسبوع',
    },
    specialties: {
      title: 'التخصصات',
      description: 'التخصصات الطبية المتوفرة في العيادة',
    },
    socialMedia: {
      title: 'وسائل التواصل الاجتماعي',
      description: 'روابط المواقع الاجتماعية والموقع الإلكتروني',
    },
  },

  form: {
    labels: {
      nameArabic: 'اسم العيادة (العربية)',
      nameEnglish: 'اسم العيادة (الإنجليزية)',
      email: 'البريد الإلكتروني',
      phoneNumber: 'رقم الهاتف',
      bio: 'نبذة عن العيادة',
      country: 'الدولة',
      city: 'المدينة',
      address: 'العنوان الكامل',
      website: 'الموقع الإلكتروني',
      facebook: 'فيسبوك',
      twitter: 'تويتر',
      instagram: 'إنستغرام',
      linkedin: 'لينكد إن',
      youtube: 'يوتيوب',
    },
    placeholders: {
      selectCountry: 'اختر الدولة',
      selectCity: 'اختر المدينة',
      website: 'https://www.example.com',
      facebook: 'https://facebook.com/clinic',
      twitter: 'https://twitter.com/clinic',
      instagram: 'https://instagram.com/clinic',
      linkedin: 'https://linkedin.com/company/clinic',
      youtube: 'https://youtube.com/clinic',
    },
  },

  workingHours: {
    to: 'إلى',
    closed: 'مغلق',
  },

  errors: {
    loadingProfile: 'خطأ في تحميل بيانات العيادة',
    savingProfile: 'خطأ في حفظ بيانات العيادة',
  },

  loading: {
    profile: 'جاري تحميل ملف العيادة...',
    saving: 'جاري حفظ التغييرات...',
  },

  validation: {
    nameArabicRequired: 'اسم العيادة بالعربية مطلوب',
    nameArabicMinLength: 'اسم العيادة بالعربية يجب أن يكون 3 أحرف على الأقل',
    nameEnglishRequired: 'اسم العيادة بالإنجليزية مطلوب',
    nameEnglishMinLength:
      'اسم العيادة بالإنجليزية يجب أن يكون 3 أحرف على الأقل',
    emailRequired: 'البريد الإلكتروني مطلوب',
    emailInvalid: 'البريد الإلكتروني غير صحيح',
    phoneRequired: 'رقم الهاتف مطلوب',
    phoneMinLength: 'رقم الهاتف يجب أن يكون 8 أرقام على الأقل',
    bioRequired: 'نبذة عن العيادة مطلوبة',
    urlInvalid: 'رابط غير صحيح',
  },
};
