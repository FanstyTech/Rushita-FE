'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      navigation: {
        dashboard: 'Dashboard',
        patients: 'Patients',
        appointments: 'Appointments',
        diagnosis: 'Diagnosis',
        analytics: 'Analytics',
        settings: 'Settings',
        clinicAI: 'Clinic AI',
        medicalIntelligence: 'Medical Intelligence',
      },

      // Breadcrumb routes
      breadcrumb: {
        home: 'Home',
        // Main sections
        admin: 'Administration',
        clinic: 'Clinic',
        doctor: 'Doctor',

        // Admin routes
        dashboard: 'Dashboard',
        users: 'Users',
        clinics: 'Clinics',
        settings: 'Settings',

        // Clinic routes
        patients: 'Patients',
        appointments: 'Appointments',
        'medical-records': 'Medical Records',
        staff: 'Staff',

        // Financial routes
        financial: 'Financial',
        revenues: 'Revenues',
        expenses: 'Expenses',
        invoices: 'Invoices',
        salaries: 'Salaries',
        transactions: 'Transactions',
        reports: 'Reports',
        'service-prices': 'Service Prices',

        // Doctor routes
        visits: 'Visits',
        prescriptions: 'Prescriptions',
        schedule: 'Schedule',

        // Common actions
        create: 'Create New',
        edit: 'Edit',
        view: 'View',
        new: 'New',
        add: 'Add',

        // Dynamic route labels
        patient: 'Patient #{{id}}',
        appointment: 'Appointment #{{id}}',
        visit: 'Visit #{{id}}',
        invoice: 'Invoice #{{id}}',
        staff_member: 'Staff #{{id}}',
      },

      // User related
      user: {
        profile: 'Profile',
        logout: 'Logout',
        login: 'Login',
        register: 'Register',
        forgotPassword: 'Forgot Password',
        resetPassword: 'Reset Password',
        generalPractitioner: 'General Practitioner',
        notifications: 'Notifications',
      },

      // Patient Portal
      patientPortal: {
        welcome: {
          greeting: 'Hello, ',
          user: 'User',
          editProfile: 'Edit Profile',
          title: 'Welcome to Patient Portal',
          description:
            'You can monitor your health status and manage your appointments and medications here',
          bookAppointment: 'Book New Appointment',
          prescriptions: 'Prescriptions',
          visitHistory: 'Visit History',
          tagline: 'Your Health is Our Priority',
          subTagline: 'We care for you every step of the way',
        },
        quickActions: {
          bookAppointment: 'Book Appointment',
          requestConsultation: 'Request Consultation',
          requestPrescription: 'Request Prescription',
          profile: 'Profile',
        },

        dashboard: {
          tabs: {
            overview: 'Overview',
            health: 'Health Status',
            notifications: 'Notifications',
          },

          // Appointments Card
          appointments: {
            title: 'Upcoming Appointments',
            description: 'Scheduled appointments for upcoming days',
            appointmentsCount: 'appointments',
            confirmed: 'Confirmed',
            pending: 'Pending',
            notes: 'Notes:',
            noAppointments: {
              title: 'No upcoming appointments',
              description:
                "You don't have any scheduled appointments at the moment. You can book a new appointment by clicking the button below.",
              button: 'Book New Appointment',
            },
            viewAll: 'View All Appointments',
          },

          // Medications Card
          medications: {
            title: 'Current Medications',
            description: 'Medications you are currently taking',
            medicationsCount: 'medications',
            priority: {
              high: 'High Priority',
              medium: 'Medium Priority',
              normal: 'Normal Priority',
            },
            started: 'Started:',
            ends: 'Ends:',
            instructions: 'Instructions:',
            noMedications: {
              title: 'No current medications',
              description:
                "You don't have any registered medications at the moment. You can consult your doctor for a prescription.",
            },
            viewAll: 'View All Medications',
          },

          // Recent Visits Card
          recentVisits: {
            title: 'Recent Visits',
            description: 'Your recent medical visit records',
            visitsCount: 'visits',
            diagnosis: 'Diagnosis:',
            followUp: 'Follow-up on:',
            noVisits: {
              title: 'No previous visits',
              description:
                "You don't have any medical visits recorded. Your visit records will appear here once you have a medical visit.",
            },
            viewAll: 'View All Visits',
          },

          // Health Metrics Card
          healthMetrics: {
            title: 'Health Metrics',
            description: 'Summary of your main health indicators',
            bloodPressure: {
              title: 'Blood Pressure',
              normal: 'Normal',
              elevated: 'Slightly Elevated',
              high: 'High',
              lastUpdate: 'Last update:',
              trend: 'Trend (last 3 readings)',
            },
            bloodSugar: {
              title: 'Blood Sugar',
              normal: 'Normal',
              elevated: 'Slightly Elevated',
              high: 'High',
              lastUpdate: 'Last update:',
              trend: 'Trend (last 3 readings)',
            },
            weight: {
              title: 'Weight',
              stable: 'Stable',
              increasing: 'Increasing',
              decreasing: 'Decreasing',
              lastUpdate: 'Last update:',
              trend: 'Trend (last 3 readings)',
            },
            heartRate: {
              title: 'Heart Rate',
              normal: 'Normal',
              abnormal: 'Abnormal',
              lastUpdate: 'Last update:',
              trend: 'Trend (last 3 readings)',
            },
            cholesterol: {
              title: 'Cholesterol',
              normal: 'Normal',
              high: 'High',
              total: 'Total',
              lastUpdate: 'Last update:',
            },
            bmi: {
              title: 'Body Mass Index',
              underweight: 'Underweight',
              normal: 'Normal',
              overweight: 'Overweight',
              obese: 'Obese',
              calculated:
                'Calculated based on current weight and registered height (170 cm)',
              unit: 'kg/m²',
            },
            viewMore: 'View More Health Metrics',
          },

          // Notifications Card
          notifications: {
            title: 'Notifications',
            description: 'Your latest updates and notifications',
            markAllRead: 'Mark All as Read',
            noNotifications: {
              title: 'No notifications',
              description: 'New notifications and updates will appear here',
            },
            viewAll: 'View All Notifications',
            viewDetails: 'View Details',
            ago: 'ago',
          },

          // Health Alerts Card
          healthAlerts: {
            title: 'Health Alerts',
            description: 'Important alerts related to your health',
            noAlerts: {
              title: 'No current alerts',
              description:
                'You are healthy and there are no alerts requiring your attention',
            },
          },
        },
        // Patient Portal Profile
        profile: {
          tabs: {
            personalInfo: 'Personal Information',
            medicalInfo: 'Medical Information',
            insuranceInfo: 'Insurance Information',
            healthIndicators: 'Health Indicators',
          },
          validation: {
            pleaseCorrectErrors:
              'Please correct the errors in the form to continue',
            personalInfo: {
              firstNameRequired: 'First name is required',
              fatherNameRequired: "Father's name is required",
              familyNameRequired: 'Family name is required',
              fullNameRequired: 'Full name is required',
              dateOfBirthRequired: 'Date of birth is required',
              genderRequired: 'Gender is required',
              emailInvalid: 'Invalid email address',
              countryCodeRequired: 'Country code is required',
              phoneMinLength: 'Phone number must be at least 9 digits',
              countryRequired: 'Country is required',
              cityRequired: 'City is required',
              addressRequired: 'Address is required',
              preferredLanguageRequired: 'Preferred language is required',
              idTypeRequired: 'ID type is required',
              idNumberRequired: 'ID number is required',
            },
            emergencyContact: {
              nameRequired: 'Emergency contact name is required',
              relationRequired: 'Relationship is required',
              phoneMinLength: 'Phone number must be at least 9 digits',
            },
            medicalInfo: {
              bloodTypeRequired: 'Blood type is required',
              heightRequired: 'Height is required',
              weightRequired: 'Weight is required',
            },
          },
          // Profile Header
          header: {
            medicalFileNumber: 'Medical File Number',
            registrationDate: 'Registration Date',
            bloodType: 'Blood Type',
            saveChanges: 'Save Changes',
            cancel: 'Cancel',
            editProfile: 'Edit Profile',
          },

          // Personal Information Card
          personalInfo: {
            title: 'Personal Information',
            description: 'Your basic personal information',
            firstNameEn: 'First Name (English)',
            fatherNameEn: "Father's Name (English)",
            grandfatherNameEn: "Grandfather's Name (English)",
            familyNameEn: 'Family Name (English)',
            firstNameAr: 'First Name (Arabic)',
            fatherNameAr: "Father's Name (Arabic)",
            grandfatherNameAr: "Grandfather's Name (Arabic)",
            familyNameAr: 'Family Name (Arabic)',
            fullName: 'Full Name',
            dateOfBirth: 'Date of Birth',
            gender: 'Gender',
            email: 'Email',
            countryCode: 'Country Code',
            phone: 'Phone Number',
            country: 'Country',
            city: 'City',
            address: 'Address',
            preferredLanguage: 'Preferred Language',
            idType: 'ID Type',
            idNumber: 'ID Number',
            male: 'Male',
            female: 'Female',
            other: 'Other',
            saudiArabia: 'Saudi Arabia',
            uae: 'UAE',
            kuwait: 'Kuwait',
            qatar: 'Qatar',
            bahrain: 'Bahrain',
            oman: 'Oman',
            riyadh: 'Riyadh',
            jeddah: 'Jeddah',
            dammam: 'Dammam',
            makkah: 'Makkah',
            madinah: 'Madinah',
            arabic: 'Arabic',
            english: 'English',
            nationalId: 'National ID',
            passport: 'Passport',
            iqama: 'Iqama',
            otherId: 'Other',
          },

          // Medical Information Card
          medicalInfo: {
            title: 'Medical Information',
            description: 'Your basic medical information and medical history',
            bloodType: 'Blood Type',
            bmi: 'Body Mass Index',
            height: 'Height',
            weight: 'Weight',
            allergies: 'Allergies',
            chronicDiseases: 'Chronic Diseases',
            noAllergies: 'No allergies',
            noChronicDiseases: 'No chronic diseases',
            cm: 'cm',
            kg: 'kg',
          },

          // Health Indicators Card
          healthIndicators: {
            title: 'Health Indicators',
            description: 'Summary of your main health indicators',
            bloodPressure: {
              title: 'Blood Pressure',
              normal: 'Normal',
              elevated: 'Slightly Elevated',
              high: 'High',
            },
            heartRate: {
              title: 'Heart Rate',
              normal: 'Normal',
              elevated: 'Slightly Elevated',
              high: 'High',
            },
            bloodSugar: {
              title: 'Blood Sugar',
              normal: 'Normal',
              elevated: 'Slightly Elevated',
              high: 'High',
            },
            cholesterol: {
              title: 'Cholesterol',
              normal: 'Normal',
              elevated: 'Slightly Elevated',
              high: 'High',
              total: 'Total',
            },
          },

          // Emergency Contact Card
          emergencyContact: {
            title: 'Emergency Contact Information',
            description: 'Person to contact in case of emergency',
            name: 'Name',
            relation: 'Relation',
            phone: 'Phone Number',
          },

          // Insurance Information Card
          insurance: {
            title: 'Health Insurance Information',
            description: 'Your health insurance policy details',
            provider: 'Insurance Company',
            policyNumber: 'Policy Number',
            expiryDate: 'Policy Expiry Date',
            coverageType: 'Coverage Type',
            expired: 'Expired',
            active: 'Active',
          },

          // Insurance Coverage Details Card
          insuranceCoverage: {
            title: 'Coverage Details',
            description: 'Insurance coverage details and exclusions',
            copayment: 'Copayment',
            annualLimit: 'Annual Coverage Limit',
            exclusions: 'Exclusions',
            notes: 'Additional Notes',
            noExclusions: 'No exclusions',
            noNotes: 'No notes',
            riyal: 'SAR',
          },

          // Medication History Card
          medicationHistory: {
            title: 'Medication History',
            description: 'Medications you are currently taking or continuously',
            currentMedications: 'Current Medications',
            noCurrentMedications: 'No current medications',
          },
        },
        // Patient Portal Sidebar
        sidebar: {
          title: 'Patient Portal',
          main: 'Main',
          appointments: 'Appointments & Visits',
          medical: 'Medical Information',
          services: 'Services',
          calendar: 'Calendar & Appointments',

          // Navigation items
          navigation: {
            dashboard: 'Dashboard',
            profile: 'Profile',
            appointments: 'Appointments',
            medicalVisits: 'Medical Visits',
            bookAppointment: 'Book New Appointment',
            appointmentHistory: 'Appointment History',
            prescriptions: 'Prescriptions',
            labResults: 'Lab Results',
            billing: 'Billing',
            telemedicine: 'Telemedicine',
          },

          // User section
          user: {
            user: 'User',
            settings: 'Settings',
            logout: 'Logout',
          },
        },
      },

      // Settings
      settings: {
        language: 'Language',
        theme: 'Theme',
        notifications: 'Notifications',
        privacy: 'Privacy',
        security: 'Security',
      },

      // Languages
      languages: {
        en: 'English',
        ar: 'Arabic',
        es: 'Spanish',
      },

      // Common
      common: {
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        cancel: 'Cancel',
        save: 'Save',
        confirm: 'Confirm',
        back: 'Back',
        next: 'Next',
        submit: 'Submit',
        loading: 'Loading...',
        noResults: 'No results found',
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Info',
      },

      // Messages
      messages: {
        success: {
          saved: 'Successfully saved',
          updated: 'Successfully updated',
          deleted: 'Successfully deleted',
        },
      },

      // Validation
    },
  },
  ar: {
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
        users: 'المستخدمين',
        clinics: 'العيادات',
        settings: 'الإعدادات',

        // Clinic routes
        patients: 'المرضى',
        appointments: 'المواعيد',
        'medical-records': 'السجلات الطبية',
        staff: 'الطاقم',

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
        schedule: 'الجدول',

        // Common actions
        create: 'إنشاء جديد',
        edit: 'تعديل',
        view: 'عرض',
        new: 'جديد',
        add: 'إضافة',

        // Dynamic route labels
        patient: 'مريض #{{id}}',
        appointment: 'موعد #{{id}}',
        visit: 'زيارة #{{id}}',
        invoice: 'فاتورة #{{id}}',
        staff_member: 'عضو طاقم #{{id}}',
      },

      // User related
      user: {
        profile: 'الملف الشخصي',
        logout: 'تسجيل الخروج',
        login: 'تسجيل الدخول',
        register: 'التسجيل',
        forgotPassword: 'نسيت كلمة المرور',
        resetPassword: 'إعادة تعيين كلمة المرور',
        generalPractitioner: 'طبيب عام',
        notifications: 'الإشعارات',
      },

      // Patient Portal
      patientPortal: {
        welcome: {
          greeting: 'مرحباً، ',
          user: 'مستخدم',
          editProfile: 'تعديل الملف الشخصي',
          title: 'مرحباً بك في بوابة المرضى',
          description:
            'يمكنك من هنا متابعة حالتك الصحية وإدارة مواعيدك وأدويتك',
          bookAppointment: 'حجز موعد جديد',
          prescriptions: 'الوصفات الطبية',
          visitHistory: 'سجل الزيارات',
          tagline: 'صحتك أولويتنا',
          subTagline: 'نعتني بك في كل خطوة',
        },
        quickActions: {
          bookAppointment: 'حجز موعد',
          requestConsultation: 'طلب استشارة',
          requestPrescription: 'طلب وصفة طبية',
          profile: 'الملف الشخصي',
        },

        dashboard: {
          tabs: {
            overview: 'نظرة عامة',
            health: 'الحالة الصحية',
            notifications: 'الإشعارات',
          },

          // Appointments Card
          appointments: {
            title: 'المواعيد القادمة',
            description: 'المواعيد المحجوزة للأيام القادمة',
            appointmentsCount: 'مواعيد',
            confirmed: 'مؤكد',
            pending: 'قيد الانتظار',
            notes: 'ملاحظات:',
            noAppointments: {
              title: 'لا توجد مواعيد قادمة',
              description:
                'ليس لديك أي مواعيد محجوزة في الوقت الحالي. يمكنك حجز موعد جديد من خلال الضغط على الزر أدناه.',
              button: 'حجز موعد جديد',
            },
            viewAll: 'عرض جميع المواعيد',
          },

          // Medications Card
          medications: {
            title: 'الأدوية الحالية',
            description: 'الأدوية التي تتناولها حالياً',
            medicationsCount: 'أدوية',
            priority: {
              high: 'أولوية عالية',
              medium: 'أولوية متوسطة',
              normal: 'أولوية عادية',
            },
            started: 'بدأ:',
            ends: 'ينتهي:',
            instructions: 'تعليمات:',
            noMedications: {
              title: 'لا توجد أدوية حالية',
              description:
                'ليس لديك أي أدوية مسجلة في الوقت الحالي. يمكنك مراجعة طبيبك للحصول على وصفة طبية.',
            },
            viewAll: 'عرض جميع الأدوية',
          },

          // Recent Visits Card
          recentVisits: {
            title: 'الزيارات الأخيرة',
            description: 'سجل زياراتك الطبية الأخيرة',
            visitsCount: 'زيارات',
            diagnosis: 'التشخيص:',
            followUp: 'متابعة في:',
            noVisits: {
              title: 'لا توجد زيارات سابقة',
              description:
                'ليس لديك أي زيارات طبية مسجلة. ستظهر هنا سجلات زياراتك بمجرد إجراء زيارة طبية.',
            },
            viewAll: 'عرض جميع الزيارات',
          },

          // Health Metrics Card
          healthMetrics: {
            title: 'المؤشرات الصحية',
            description: 'ملخص لمؤشراتك الصحية الرئيسية',
            bloodPressure: {
              title: 'ضغط الدم',
              normal: 'طبيعي',
              elevated: 'مرتفع قليلاً',
              high: 'مرتفع',
              lastUpdate: 'آخر تحديث:',
              trend: 'الاتجاه (آخر 3 قراءات)',
            },
            bloodSugar: {
              title: 'سكر الدم',
              normal: 'طبيعي',
              elevated: 'مرتفع قليلاً',
              high: 'مرتفع',
              lastUpdate: 'آخر تحديث:',
              trend: 'الاتجاه (آخر 3 قراءات)',
            },
            weight: {
              title: 'الوزن',
              stable: 'مستقر',
              increasing: 'في ازدياد',
              decreasing: 'في انخفاض',
              lastUpdate: 'آخر تحديث:',
              trend: 'الاتجاه (آخر 3 قراءات)',
            },
            heartRate: {
              title: 'معدل النبض',
              normal: 'طبيعي',
              abnormal: 'غير طبيعي',
              lastUpdate: 'آخر تحديث:',
              trend: 'الاتجاه (آخر 3 قراءات)',
            },
            cholesterol: {
              title: 'الكوليسترول',
              normal: 'طبيعي',
              high: 'مرتفع',
              total: 'الكلي',
              lastUpdate: 'آخر تحديث:',
            },
            bmi: {
              title: 'مؤشر كتلة الجسم',
              underweight: 'نقص الوزن',
              normal: 'طبيعي',
              overweight: 'زيادة الوزن',
              obese: 'سمنة',
              calculated: 'محسوب بناءً على الوزن الحالي والطول المسجل (170 سم)',
              unit: 'كجم/م²',
            },
            viewMore: 'عرض المزيد من المؤشرات الصحية',
          },

          // Notifications Card
          notifications: {
            title: 'الإشعارات',
            description: 'آخر التحديثات والإشعارات الخاصة بك',
            markAllRead: 'تعليم الكل كمقروء',
            noNotifications: {
              title: 'لا توجد إشعارات',
              description: 'ستظهر هنا الإشعارات والتحديثات الجديدة',
            },
            viewAll: 'عرض جميع الإشعارات',
            viewDetails: 'عرض التفاصيل',
            ago: 'منذ',
          },

          // Health Alerts Card
          healthAlerts: {
            title: 'تنبيهات صحية',
            description: 'تنبيهات هامة تتعلق بصحتك',
            noAlerts: {
              title: 'لا توجد تنبيهات حالية',
              description: 'أنت بصحة جيدة ولا توجد تنبيهات تتطلب اهتمامك',
            },
          },
        },
        // Patient Portal Profile
        profile: {
          tabs: {
            personalInfo: 'المعلومات الشخصية',
            medicalInfo: 'المعلومات الطبية',
            insuranceInfo: 'معلومات التأمين',
            healthIndicators: 'المؤشرات الصحية',
          },
          validation: {
            pleaseCorrectErrors: 'يرجى تصحيح الأخطاء في النموذج للمتابعة',
            // Personal Information Validation
            personalInfo: {
              firstNameRequired: 'الاسم الأول مطلوب',
              fatherNameRequired: 'اسم الأب مطلوب',
              familyNameRequired: 'اسم العائلة مطلوب',
              fullNameRequired: 'الاسم الكامل مطلوب',
              dateOfBirthRequired: 'تاريخ الميلاد مطلوب',
              genderRequired: 'الجنس مطلوب',
              emailInvalid: 'البريد الإلكتروني غير صالح',
              countryCodeRequired: 'رمز الدولة مطلوب',
              phoneMinLength: 'رقم الهاتف يجب أن يكون 9 أرقام على الأقل',
              countryRequired: 'الدولة مطلوبة',
              cityRequired: 'المدينة مطلوبة',
              addressRequired: 'العنوان مطلوب',
              preferredLanguageRequired: 'اللغة المفضلة مطلوبة',
              idTypeRequired: 'نوع الهوية مطلوب',
              idNumberRequired: 'رقم الهوية مطلوب',
            },

            // Emergency Contact Validation
            emergencyContact: {
              nameRequired: 'اسم جهة الاتصال مطلوب',
              relationRequired: 'صلة القرابة مطلوبة',
              phoneMinLength: 'رقم الهاتف يجب أن يكون 9 أرقام على الأقل',
            },

            // Medical Information Validation
            medicalInfo: {
              bloodTypeRequired: 'فصيلة الدم مطلوبة',
              heightRequired: 'الطول مطلوب',
              weightRequired: 'الوزن مطلوب',
            },
          },
          // Profile Header
          header: {
            medicalFileNumber: 'رقم الملف الطبي',
            registrationDate: 'تاريخ التسجيل',
            bloodType: 'فصيلة الدم',
            saveChanges: 'حفظ التغييرات',
            cancel: 'إلغاء',
            editProfile: 'تعديل الملف الشخصي',
          },

          // Personal Information Card
          personalInfo: {
            title: 'البيانات الشخصية',
            description: 'معلوماتك الشخصية الأساسية',
            firstNameEn: 'الاسم الأول (بالإنجليزية)',
            fatherNameEn: 'اسم الأب (بالإنجليزية)',
            grandfatherNameEn: 'اسم الجد (بالإنجليزية)',
            familyNameEn: 'اسم العائلة (بالإنجليزية)',
            firstNameAr: 'الاسم الأول (بالعربية)',
            fatherNameAr: 'اسم الأب (بالعربية)',
            grandfatherNameAr: 'اسم الجد (بالعربية)',
            familyNameAr: 'اسم العائلة (بالعربية)',
            fullName: 'الاسم الكامل',
            dateOfBirth: 'تاريخ الميلاد',
            gender: 'الجنس',
            email: 'البريد الإلكتروني',
            countryCode: 'رمز الدولة',
            phone: 'رقم الهاتف',
            country: 'الدولة',
            city: 'المدينة',
            address: 'العنوان',
            preferredLanguage: 'اللغة المفضلة',
            idType: 'نوع الهوية',
            idNumber: 'رقم الهوية',
            male: 'ذكر',
            female: 'أنثى',
            other: 'آخر',
            saudiArabia: 'السعودية',
            uae: 'الإمارات',
            kuwait: 'الكويت',
            qatar: 'قطر',
            bahrain: 'البحرين',
            oman: 'عمان',
            riyadh: 'الرياض',
            jeddah: 'جدة',
            dammam: 'الدمام',
            makkah: 'مكة',
            madinah: 'المدينة',
            arabic: 'العربية',
            english: 'الإنجليزية',
            nationalId: 'هوية وطنية',
            passport: 'جواز سفر',
            iqama: 'إقامة',
            otherId: 'أخرى',
          },

          // Medical Information Card
          medicalInfo: {
            title: 'المعلومات الطبية',
            description: 'معلوماتك الطبية الأساسية والتاريخ المرضي',
            bloodType: 'فصيلة الدم',
            bmi: 'مؤشر كتلة الجسم',
            height: 'الطول',
            weight: 'الوزن',
            allergies: 'الحساسية',
            chronicDiseases: 'الأمراض المزمنة',
            noAllergies: 'لا توجد حساسية',
            noChronicDiseases: 'لا توجد أمراض مزمنة',
            cm: 'سم',
            kg: 'كجم',
          },

          // Health Indicators Card
          healthIndicators: {
            title: 'المؤشرات الصحية',
            description: 'ملخص لمؤشراتك الصحية الرئيسية',
            bloodPressure: {
              title: 'ضغط الدم',
              normal: 'طبيعي',
              elevated: 'مرتفع قليلاً',
              high: 'مرتفع',
            },
            heartRate: {
              title: 'معدل ضربات القلب',
              normal: 'طبيعي',
              elevated: 'مرتفع قليلاً',
              high: 'مرتفع',
            },
            bloodSugar: {
              title: 'سكر الدم',
              normal: 'طبيعي',
              elevated: 'مرتفع قليلاً',
              high: 'مرتفع',
            },
            cholesterol: {
              title: 'الكوليسترول',
              normal: 'طبيعي',
              elevated: 'مرتفع قليلاً',
              high: 'مرتفع',
              total: 'الكلي',
            },
          },

          // Emergency Contact Card
          emergencyContact: {
            title: 'معلومات الاتصال في حالات الطوارئ',
            description: 'الشخص الذي يمكن الاتصال به في حالات الطوارئ',
            name: 'الاسم',
            relation: 'صلة القرابة',
            phone: 'رقم الهاتف',
          },

          // Insurance Information Card
          insurance: {
            title: 'معلومات التأمين الصحي',
            description: 'تفاصيل بوليصة التأمين الصحي الخاصة بك',
            provider: 'شركة التأمين',
            policyNumber: 'رقم البوليصة',
            expiryDate: 'تاريخ انتهاء البوليصة',
            coverageType: 'نوع التغطية',
            expired: 'منتهية',
            active: 'سارية',
          },

          // Insurance Coverage Details Card
          insuranceCoverage: {
            title: 'تفاصيل التغطية',
            description: 'تفاصيل التغطية التأمينية والاستثناءات',
            copayment: 'نسبة التحمل',
            annualLimit: 'الحد الأقصى للتغطية السنوية',
            exclusions: 'الاستثناءات',
            notes: 'ملاحظات إضافية',
            noExclusions: 'لا توجد استثناءات',
            noNotes: 'لا توجد ملاحظات',
            riyal: 'ريال',
          },

          // Medication History Card
          medicationHistory: {
            title: 'التاريخ الدوائي',
            description: 'الأدوية التي تتناولها حالياً أو بشكل مستمر',
            currentMedications: 'الأدوية الحالية',
            noCurrentMedications: 'لا توجد أدوية حالية',
          },
        },
        // Patient Portal Sidebar
        sidebar: {
          title: 'بورتل المرضى',
          main: 'الرئيسية',
          appointments: 'المواعيد والزيارات',
          medical: 'المعلومات الطبية',
          services: 'الخدمات',
          calendar: 'التقويم والمواعيد',

          // Navigation items
          navigation: {
            dashboard: 'لوحة المعلومات',
            profile: 'الملف الشخصي',
            appointments: 'المواعيد',
            medicalVisits: 'الزيارات الطبية',
            bookAppointment: 'حجز موعد جديد',
            appointmentHistory: 'سجل المواعيد',
            prescriptions: 'الوصفات الطبية',
            labResults: 'نتائج الفحوصات',
            billing: 'المدفوعات',
            telemedicine: 'الاستشارات عن بعد',
          },

          // User section
          user: {
            user: 'مستخدم',
            settings: 'الإعدادات',
            logout: 'تسجيل الخروج',
          },
        },
      },

      // Settings
      settings: {
        language: 'اللغة',
        theme: 'المظهر',
        notifications: 'الإشعارات',
        privacy: 'الخصوصية',
        security: 'الأمان',
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
        success: 'نجاح',
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
  },
  es: {
    translation: {
      // Navigation
      navigation: {
        dashboard: 'Panel de Control',
        patients: 'Pacientes',
        appointments: 'Citas',
        diagnosis: 'Diagnóstico',
        analytics: 'Análisis',
        settings: 'Configuración',
        clinicAI: 'IA Clínica',
        medicalIntelligence: 'Inteligencia Médica',
      },

      // Breadcrumb routes
      breadcrumb: {
        home: 'Inicio',
        // Main sections
        admin: 'Administración',
        clinic: 'Clínica',
        doctor: 'Doctor',

        // Admin routes
        dashboard: 'Panel de Control',
        users: 'Usuarios',
        clinics: 'Clínicas',
        settings: 'Configuración',

        // Clinic routes
        patients: 'Pacientes',
        appointments: 'Citas',
        'medical-records': 'Registros Médicos',
        staff: 'Personal',

        // Financial routes
        financial: 'Finanzas',
        revenues: 'Ingresos',
        expenses: 'Gastos',
        invoices: 'Facturas',
        salaries: 'Salarios',
        transactions: 'Transacciones',
        reports: 'Informes',
        'service-prices': 'Precios de Servicios',

        // Doctor routes
        visits: 'Visitas',
        prescriptions: 'Recetas',
        schedule: 'Calendario',

        // Common actions
        create: 'Crear Nuevo',
        edit: 'Editar',
        view: 'Ver',
        new: 'Nuevo',
        add: 'Agregar',

        // Dynamic route labels
        patient: 'Paciente #{{id}}',
        appointment: 'Cita #{{id}}',
        visit: 'Visita #{{id}}',
        invoice: 'Factura #{{id}}',
        staff_member: 'Miembro del Personal #{{id}}',
      },

      // User related
      user: {
        profile: 'Perfil',
        logout: 'Cerrar Sesión',
        login: 'Iniciar Sesión',
        register: 'Registrarse',
        forgotPassword: 'Olvidé mi Contraseña',
        resetPassword: 'Restablecer Contraseña',
        generalPractitioner: 'Médico General',
        notifications: 'Notificaciones',
      },

      // Patient Portal
      patientPortal: {
        welcome: {
          greeting: 'Hola, ',
          user: 'Usuario',
          editProfile: 'Editar Perfil',
          title: 'Bienvenido al Portal del Paciente',
          description:
            'Aquí puede monitorear su estado de salud y gestionar sus citas y medicamentos',
          bookAppointment: 'Reservar Nueva Cita',
          prescriptions: 'Recetas',
          visitHistory: 'Historial de Visitas',
          tagline: 'Su Salud es Nuestra Prioridad',
          subTagline: 'Cuidamos de usted en cada paso',
        },
        quickActions: {
          bookAppointment: 'Reservar Cita',
          requestConsultation: 'Solicitar Consulta',
          requestPrescription: 'Solicitar Receta',
          profile: 'Perfil',
        },

        dashboard: {
          tabs: {
            overview: 'Resumen',
            health: 'Estado de Salud',
            notifications: 'Notificaciones',
          },

          // Appointments Card
          appointments: {
            title: 'Próximas Citas',
            description: 'Citas programadas para los próximos días',
            appointmentsCount: 'citas',
            confirmed: 'Confirmada',
            pending: 'Pendiente',
            notes: 'Notas:',
            noAppointments: {
              title: 'No hay citas próximas',
              description:
                'No tienes citas programadas en este momento. Puedes reservar una nueva cita haciendo clic en el botón de abajo.',
              button: 'Reservar Nueva Cita',
            },
            viewAll: 'Ver Todas las Citas',
          },

          // Medications Card
          medications: {
            title: 'Medicamentos Actuales',
            description: 'Medicamentos que estás tomando actualmente',
            medicationsCount: 'medicamentos',
            priority: {
              high: 'Alta Prioridad',
              medium: 'Prioridad Media',
              normal: 'Prioridad Normal',
            },
            started: 'Comenzó:',
            ends: 'Termina:',
            instructions: 'Instrucciones:',
            noMedications: {
              title: 'No hay medicamentos actuales',
              description:
                'No tienes medicamentos registrados en este momento. Puedes consultar a tu médico para obtener una receta.',
            },
            viewAll: 'Ver Todos los Medicamentos',
          },

          // Recent Visits Card
          recentVisits: {
            title: 'Visitas Recientes',
            description: 'Registros de tus visitas médicas recientes',
            visitsCount: 'visitas',
            diagnosis: 'Diagnóstico:',
            followUp: 'Seguimiento en:',
            noVisits: {
              title: 'No hay visitas anteriores',
              description:
                'No tienes visitas médicas registradas. Tus registros de visitas aparecerán aquí una vez que tengas una visita médica.',
            },
            viewAll: 'Ver Todas las Visitas',
          },

          // Health Metrics Card
          healthMetrics: {
            title: 'Métricas de Salud',
            description: 'Resumen de tus principales indicadores de salud',
            bloodPressure: {
              title: 'Presión Arterial',
              normal: 'Normal',
              elevated: 'Ligeramente Elevada',
              high: 'Alta',
              lastUpdate: 'Última actualización:',
              trend: 'Tendencia (últimas 3 lecturas)',
            },
            bloodSugar: {
              title: 'Azúcar en Sangre',
              normal: 'Normal',
              elevated: 'Ligeramente Elevado',
              high: 'Alto',
              lastUpdate: 'Última actualización:',
              trend: 'Tendencia (últimas 3 lecturas)',
            },
            weight: {
              title: 'Peso',
              stable: 'Estable',
              increasing: 'Aumentando',
              decreasing: 'Disminuyendo',
              lastUpdate: 'Última actualización:',
              trend: 'Tendencia (últimas 3 lecturas)',
            },
            heartRate: {
              title: 'Frecuencia Cardíaca',
              normal: 'Normal',
              abnormal: 'Anormal',
              lastUpdate: 'Última actualización:',
              trend: 'Tendencia (últimas 3 lecturas)',
            },
            cholesterol: {
              title: 'Colesterol',
              normal: 'Normal',
              high: 'Alto',
              total: 'Total',
              lastUpdate: 'Última actualización:',
            },
            bmi: {
              title: 'Índice de Masa Corporal',
              underweight: 'Bajo Peso',
              normal: 'Normal',
              overweight: 'Sobrepeso',
              obese: 'Obesidad',
              calculated:
                'Calculado basado en el peso actual y altura registrada (170 cm)',
              unit: 'kg/m²',
            },
            viewMore: 'Ver Más Métricas de Salud',
          },

          // Notifications Card
          notifications: {
            title: 'Notificaciones',
            description: 'Tus últimas actualizaciones y notificaciones',
            markAllRead: 'Marcar Todo como Leído',
            noNotifications: {
              title: 'No hay notificaciones',
              description:
                'Las nuevas notificaciones y actualizaciones aparecerán aquí',
            },
            viewAll: 'Ver Todas las Notificaciones',
            viewDetails: 'Ver Detalles',
            ago: 'hace',
          },

          // Health Alerts Card
          healthAlerts: {
            title: 'Alertas de Salud',
            description: 'Alertas importantes relacionadas con tu salud',
            noAlerts: {
              title: 'No hay alertas actuales',
              description:
                'Estás saludable y no hay alertas que requieran tu atención',
            },
          },
        },
        // Patient Portal Profile
        profile: {
          tabs: {
            personalInfo: 'Información Personal',
            medicalInfo: 'Información Médica',
            insuranceInfo: 'Información de Seguro',
            healthIndicators: 'Indicadores de Salud',
          },
          validation: {
            pleaseCorrectErrors:
              'Por favor corrija los errores en el formulario para continuar',
            // Personal Information Validation
            personalInfo: {
              firstNameRequired: 'El nombre es requerido',
              fatherNameRequired: 'El nombre del padre es requerido',
              familyNameRequired: 'El apellido es requerido',
              fullNameRequired: 'El nombre completo es requerido',
              dateOfBirthRequired: 'La fecha de nacimiento es requerida',
              genderRequired: 'El género es requerido',
              emailInvalid: 'Dirección de correo electrónico inválida',
              countryCodeRequired: 'El código de país es requerido',
              phoneMinLength:
                'El número de teléfono debe tener al menos 9 dígitos',
              countryRequired: 'El país es requerido',
              cityRequired: 'La ciudad es requerida',
              addressRequired: 'La dirección es requerida',
              preferredLanguageRequired: 'El idioma preferido es requerido',
              idTypeRequired: 'El tipo de identificación es requerido',
              idNumberRequired: 'El número de identificación es requerido',
            },

            // Emergency Contact Validation
            emergencyContact: {
              nameRequired: 'El nombre del contacto de emergencia es requerido',
              relationRequired: 'La relación es requerida',
              phoneMinLength:
                'El número de teléfono debe tener al menos 9 dígitos',
            },

            // Medical Information Validation
            medicalInfo: {
              bloodTypeRequired: 'El tipo de sangre es requerido',
              heightRequired: 'La altura es requerida',
              weightRequired: 'El peso es requerido',
            },
          },
          // Profile Header
          header: {
            medicalFileNumber: 'Número de Archivo Médico',
            registrationDate: 'Fecha de Registro',
            bloodType: 'Tipo de Sangre',
            saveChanges: 'Guardar Cambios',
            cancel: 'Cancelar',
            editProfile: 'Editar Perfil',
          },

          // Personal Information Card
          personalInfo: {
            title: 'Información Personal',
            description: 'Tu información personal básica',
            firstNameEn: 'Primer Nombre (Inglés)',
            fatherNameEn: 'Nombre del Padre (Inglés)',
            grandfatherNameEn: 'Nombre del Abuelo (Inglés)',
            familyNameEn: 'Apellido (Inglés)',
            firstNameAr: 'Primer Nombre (Árabe)',
            fatherNameAr: 'Nombre del Padre (Árabe)',
            grandfatherNameAr: 'Nombre del Abuelo (Árabe)',
            familyNameAr: 'Apellido (Árabe)',
            fullName: 'Nombre Completo',
            dateOfBirth: 'Fecha de Nacimiento',
            gender: 'Género',
            email: 'Correo Electrónico',
            countryCode: 'Código de País',
            phone: 'Número de Teléfono',
            country: 'País',
            city: 'Ciudad',
            address: 'Dirección',
            preferredLanguage: 'Idioma Preferido',
            idType: 'Tipo de Identificación',
            idNumber: 'Número de Identificación',
            male: 'Masculino',
            female: 'Femenino',
            other: 'Otro',
            saudiArabia: 'Arabia Saudita',
            uae: 'EAU',
            kuwait: 'Kuwait',
            qatar: 'Qatar',
            bahrain: 'Bahrein',
            oman: 'Omán',
            riyadh: 'Riad',
            jeddah: 'Yeda',
            dammam: 'Dammam',
            makkah: 'Meca',
            madinah: 'Medina',
            arabic: 'Árabe',
            english: 'Inglés',
            nationalId: 'DNI Nacional',
            passport: 'Pasaporte',
            iqama: 'Iqama',
            otherId: 'Otro',
          },

          // Medical Information Card
          medicalInfo: {
            title: 'Información Médica',
            description: 'Tu información médica básica e historial médico',
            bloodType: 'Tipo de Sangre',
            bmi: 'Índice de Masa Corporal',
            height: 'Altura',
            weight: 'Peso',
            allergies: 'Alergias',
            chronicDiseases: 'Enfermedades Crónicas',
            noAllergies: 'Sin alergias',
            noChronicDiseases: 'Sin enfermedades crónicas',
            cm: 'cm',
            kg: 'kg',
          },

          // Health Indicators Card
          healthIndicators: {
            title: 'Indicadores de Salud',
            description: 'Resumen de tus principales indicadores de salud',
            bloodPressure: {
              title: 'Presión Arterial',
              normal: 'Normal',
              elevated: 'Ligeramente Elevada',
              high: 'Alta',
            },
            heartRate: {
              title: 'Frecuencia Cardíaca',
              normal: 'Normal',
              elevated: 'Ligeramente Elevada',
              high: 'Alta',
            },
            bloodSugar: {
              title: 'Azúcar en Sangre',
              normal: 'Normal',
              elevated: 'Ligeramente Elevado',
              high: 'Alto',
            },
            cholesterol: {
              title: 'Colesterol',
              normal: 'Normal',
              elevated: 'Ligeramente Elevado',
              high: 'Alto',
              total: 'Total',
            },
          },

          // Emergency Contact Card
          emergencyContact: {
            title: 'Información de Contacto de Emergencia',
            description: 'Persona a contactar en caso de emergencia',
            name: 'Nombre',
            relation: 'Relación',
            phone: 'Número de Teléfono',
          },

          // Insurance Information Card
          insurance: {
            title: 'Información de Seguro de Salud',
            description: 'Detalles de tu póliza de seguro de salud',
            provider: 'Compañía de Seguros',
            policyNumber: 'Número de Póliza',
            expiryDate: 'Fecha de Vencimiento de Póliza',
            coverageType: 'Tipo de Cobertura',
            expired: 'Vencida',
            active: 'Activa',
          },

          // Insurance Coverage Details Card
          insuranceCoverage: {
            title: 'Detalles de Cobertura',
            description: 'Detalles de cobertura de seguro y exclusiones',
            copayment: 'Copago',
            annualLimit: 'Límite de Cobertura Anual',
            exclusions: 'Exclusiones',
            notes: 'Notas Adicionales',
            noExclusions: 'Sin exclusiones',
            noNotes: 'Sin notas',
            riyal: 'SAR',
          },

          // Medication History Card
          medicationHistory: {
            title: 'Historial de Medicamentos',
            description:
              'Medicamentos que estás tomando actualmente o de forma continua',
            currentMedications: 'Medicamentos Actuales',
            noCurrentMedications: 'Sin medicamentos actuales',
          },
        },

        // Patient Portal Sidebar
        sidebar: {
          title: 'Portal del Paciente',
          main: 'Principal',
          appointments: 'Citas y Visitas',
          medical: 'Información Médica',
          services: 'Servicios',
          calendar: 'Calendario y Citas',

          // Navigation items
          navigation: {
            dashboard: 'Panel de Control',
            profile: 'Perfil',
            appointments: 'Citas',
            medicalVisits: 'Visitas Médicas',
            bookAppointment: 'Reservar Nueva Cita',
            appointmentHistory: 'Historial de Citas',
            prescriptions: 'Recetas',
            labResults: 'Resultados de Laboratorio',
            billing: 'Facturación',
            telemedicine: 'Telemedicina',
          },

          // User section
          user: {
            user: 'Usuario',
            settings: 'Configuración',
            logout: 'Cerrar Sesión',
          },
        },
      },

      // Settings
      settings: {
        language: 'Idioma',
        theme: 'Tema',
        notifications: 'Notificaciones',
        privacy: 'Privacidad',
        security: 'Seguridad',
      },

      // Languages
      languages: {
        en: 'Inglés',
        ar: 'Árabe',
        es: 'Español',
      },

      // Common
      common: {
        search: 'Buscar',
        filter: 'Filtrar',
        sort: 'Ordenar',
        add: 'Añadir',
        edit: 'Editar',
        delete: 'Eliminar',
        cancel: 'Cancelar',
        save: 'Guardar',
        confirm: 'Confirmar',
        back: 'Atrás',
        next: 'Siguiente',
        submit: 'Enviar',
        loading: 'Cargando...',
        noResults: 'No se encontraron resultados',
        success: 'Éxito',
        error: 'Error',
        warning: 'Advertencia',
        info: 'Información',
      },

      // Messages
      messages: {
        success: {
          saved: 'Guardado con éxito',
          updated: 'Actualizado con éxito',
          deleted: 'Eliminado con éxito',
        },
      },
    },
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
