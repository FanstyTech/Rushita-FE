export const en = {
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
      create: 'Create',
      edit: 'Edit',
      view: 'View',
      new: 'New',
      add: 'Add',

      // Dynamic routes with IDs
      'patient #{{id}}': 'Patient #{{id}}',
      'appointment #{{id}}': 'Appointment #{{id}}',
      'invoice #{{id}}': 'Invoice #{{id}}',
      'user #{{id}}': 'User #{{id}}',
      'clinic #{{id}}': 'Clinic #{{id}}',
    },

    // Auth pages
    auth: {
      login: {
        title: 'Welcome Back',
        subtitle: 'Sign in to access your dashboard',
        email: 'Email Address',
        emailPlaceholder: 'Enter your email address',
        password: 'Password',
        passwordPlaceholder: 'Enter your password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        signIn: 'Sign In to Dashboard',
        signingIn: 'Signing in...',
        contactHelp: 'Need help or want to get started?',
        whatsapp: 'WhatsApp',
        instagram: 'Instagram',
        trustIndicators: {
          hipaaCompliant: 'HIPAA Compliant',
          trustedClinics: 'Trusted by 60+ Clinics',
        },
        branding: {
          title: 'Rushita',
          subtitle: 'Medical Practice Management',
          welcome: 'Welcome to the Future of',
          healthcare: 'Healthcare Management',
          description:
            'Streamline your clinic operations with our comprehensive medical practice management system.',
        },
        features: {
          secure: {
            title: 'Secure & Compliant',
            description: 'HIPAA compliant with enterprise-grade security',
          },
          patientCare: {
            title: 'Patient-Centered Care',
            description: 'Enhance patient experience and outcomes',
          },
          teamCollaboration: {
            title: 'Team Collaboration',
            description: 'Seamless workflow for your entire team',
          },
        },
      },
    },

    // Settings page
    settings: {
      title: 'Clinic Settings',
      description: 'Manage clinic settings and configuration',

      // Appointment Settings
      appointments: {
        title: 'Appointment Settings',
        description: 'Manage appointment booking settings and policies',
        duration: 'Appointment Duration (minutes)',
        maxAdvanceBooking: 'Maximum Advance Booking (days)',
        cancellationPolicy: 'Cancellation Policy (hours before appointment)',
        onlineBooking: 'Allow Online Booking',
        requireApproval: 'Require Appointment Approval',
      },

      // Notification Settings
      notifications: {
        title: 'Notification Settings',
        description: 'Control notifications and reminders delivery',
        emailNotifications: 'Email Notifications',
        smsNotifications: 'SMS Notifications',
        pushNotifications: 'Push Notifications',
        reminderTiming: 'Reminder Timing (hours before appointment)',
      },

      // Clinic Information
      clinicInfo: {
        title: 'Clinic Information',
        description: 'Manage basic clinic information',
        name: 'Clinic Name',
        phone: 'Phone Number',
        email: 'Email Address',
        address: 'Address',
        namePlaceholder: 'Enter clinic name',
        phonePlaceholder: 'Enter phone number',
        emailPlaceholder: 'Enter email address',
        addressPlaceholder: 'Enter clinic address',
      },

      // System Preferences
      system: {
        title: 'System Preferences',
        description: 'Manage general system settings',
        currency: 'Default Currency',
        language: 'Default Language',
        timezone: 'Timezone',
        autoBackup: 'Auto Backup',
        twoFactorAuth: 'Two-Factor Authentication',
        currencies: {
          SAR: 'Saudi Riyal (SAR)',
          AED: 'UAE Dirham (AED)',
          USD: 'US Dollar (USD)',
          EUR: 'Euro (EUR)',
        },
        languages: {
          ar: 'Arabic',
          en: 'English',
          fr: 'French',
        },
        timezones: {
          'Asia/Riyadh': 'Riyadh (GMT+3)',
          'Asia/Dubai': 'Dubai (GMT+4)',
          'Europe/London': 'London (GMT+0)',
          'America/New_York': 'New York (GMT-5)',
          'Asia/Tokyo': 'Tokyo (GMT+9)',
        },
      },

      // Booking Conditions
      bookingConditions: {
        title: 'Booking Conditions',
        description: 'Enter booking conditions and requirements (one per line)',
        patientInfoRequired: 'Require Complete Patient Information',
        insuranceRequired: 'Require Insurance Information',
        medicalHistoryRequired: 'Require Medical History',
        minAge: 'Minimum Age',
        maxAge: 'Maximum Age',
        emergencyContactRequired: 'Require Emergency Contact',
        sameDayBooking: 'Allow Same-Day Booking',
        depositRequired: 'Require Booking Deposit',
        depositAmount: 'Deposit Amount',
        termsRequired: 'Require Terms & Conditions Acceptance',
      },

      // Clinic Rooms Management
      rooms: {
        title: 'Clinic Rooms & Equipment',
        description: 'Manage clinic rooms and medical equipment',
        enableRoomManagement: 'Enable Room Management',
        defaultRoom: 'Default Room for Appointments',
        roomCapacity: 'Room Capacity Management',
        equipmentTracking: 'Equipment Tracking',
        maintenanceScheduling: 'Maintenance Scheduling',
        roomOptions: {
          room1: 'Examination Room 1',
          room2: 'Examination Room 2',
          room3: 'Examination Room 3',
          consultation: 'Consultation Room',
          procedure: 'Procedure Room',
          emergency: 'Emergency Room',
        },
      },
    },
    languages: {
      ar: 'Arabic',
      en: 'English',
      fr: 'French',
    },
    timezones: {
      'Asia/Riyadh': 'Riyadh (GMT+3)',
      'Asia/Dubai': 'Dubai (GMT+4)',
      'Europe/London': 'London (GMT+0)',
      'America/New_York': 'New York (GMT-5)',
      'Asia/Tokyo': 'Tokyo (GMT+9)',
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
      info: 'Information',
    },

    // Messages
    messages: {
      success: {
        saved: 'Saved successfully',
        updated: 'Updated successfully',
        deleted: 'Deleted successfully',
      },
    },
  },
};
