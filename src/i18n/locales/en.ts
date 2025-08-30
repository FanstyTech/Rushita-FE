export const en = {
  translation: {
    // Common
    common: {
      loading: 'Loading...',
    },
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
          title: 'Rousheta',
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
      completeRegistration: {
        title: 'Complete Your Registration',
        subtitle: 'Create a secure password to complete your account setup and join the Rousheta medical platform.',
        formTitle: 'Create Password',
        formSubtitle: 'Set up a secure password for your account',
        password: 'Password',
        passwordPlaceholder: 'Create a strong password',
        confirmPassword: 'Confirm Password',
        confirmPasswordPlaceholder: 'Confirm your password',
        completeRegistration: 'Complete Registration',
        creatingAccount: 'Creating Account...',
        alreadyHaveAccount: 'Already have an account?',
        signInHere: 'Sign in here',
        passwordRequirements: {
          title: 'Password Requirements:',
          minLength: '• At least 8 characters long',
          mixedCase: '• Mix of uppercase and lowercase letters',
          numbersSpecial: '• Include numbers and special characters',
          avoidCommon: '• Avoid common words or personal information',
        },
        validation: {
          passwordMinLength: 'Password must be at least 8 characters',
          confirmPasswordMinLength: 'Please confirm your password',
          passwordsDontMatch: "Passwords don't match",
        },
        features: {
          secure: {
            title: 'Secure & Encrypted',
            description: 'Your password is encrypted with industry-standard security',
          },
          hipaa: {
            title: 'HIPAA Compliant',
            description: 'Meeting healthcare data protection standards',
          },
        },
        trustIndicators: {
          hipaaCompliant: 'HIPAA Compliant',
          trustedClinics: 'Trusted by 60+ Clinics',
        },
        branding: {
          title: 'Rousheta',
          subtitle: 'Medical Practice Management',
          welcome: 'Complete Your',
          registration: 'Registration',
        },
      },
      registrationSuccess: {
        title: 'Registration Successful!',
        subtitle: 'Thank you for joining Rousheta. Your application has been submitted and is now under review.',
        welcome: 'Welcome to',
        family: 'Rousheta Family',
        description: 'Your registration has been submitted successfully. Our team will review your application and get back to you soon.',
        nextSteps: {
          checkEmail: {
            title: 'Check Your Email',
            description: "We've sent a confirmation email with next steps",
          },
          accountReview: {
            title: 'Account Review',
            description: 'Our team will review your application within 24-48 hours',
          },
          getStarted: {
            title: 'Get Started',
            description: 'Once approved, you\'ll receive login credentials',
          },
        },
        contactInfo: {
          title: 'Need Help?',
          description: 'Our support team is here to assist you with any questions.',
          emailSupport: 'Email Support',
          whatsapp: 'WhatsApp',
        },
        status: {
          title: 'Application Submitted',
          description: "We'll notify you once your account is approved",
        },
        actions: {
          goToLogin: 'Go to Login',
          backToHome: 'Back to Home',
        },
        trustIndicators: {
          hipaaCompliant: 'HIPAA Compliant',
          trustedClinics: 'Trusted by 60+ Clinics',
        },
        branding: {
          title: 'Rousheta',
          subtitle: 'Medical Practice Management',
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

    // Landing Page
    landing: {
      // Navigation
      nav: {
        home: 'Home',
        about: 'About Rousheta',
        features: 'Features',
        pricing: 'Pricing',
        contact: 'Contact Us',
        login: 'Login',
        getStarted: 'Get Started',
        language: 'Language',
        whyroshita: 'Why Roshita',
        services: 'Our Services',
      },

      // Hero Section
      hero: {
        title: 'Smart Clinic Management System',
        subtitle:
          'Comprehensive solutions for efficient and easy medical clinic management',
        description:
          'A comprehensive platform that helps you manage patients, appointments, and medical records professionally and efficiently',
        primaryButton: 'Start Your Free Trial',
        secondaryButton: 'Watch Demo',
        trustIndicators: {
          secure: 'Secure & Protected',
          timeSaving: 'Time Saving',
          smart: 'Smart & Advanced',
        },
        stats: {
          clinics: '60+ Clinics',
          employees: '1947 Employees',
          satisfaction: '99% Customer Satisfaction',
        },

        // HeroSection translations
        medicalBadge: 'Advanced Clinic Management System',
        heroTitle: 'Smart Clinic',
        heroSubtitle: 'Starts Here',
        heroDescription:
          'With Rousheta, the era of paper and delays is over, and the era of organization and comfort begins',
        heroDescription2:
          'From first appointment... to last follow-up – everything in its place',
        feature1: 'Smart Scheduling',
        feature2: 'Digital Files',
        feature3: 'Comprehensive Follow-up',
        feature4: 'Smart Reports',
        ctaButton1: 'Start Your Free Trial',
        ctaButton2: 'Sign In',
        trustIndicator1: 'Clinics Trust Us',
        trustIndicator2: 'Active Users',
        trustIndicator3: 'Customer Satisfaction',
        medicalElement1: 'Patient Status',
        medicalElement1Status: 'Stable ✓',
        medicalElement2: "Today's Appointments",
        medicalElement2Status: '12 Scheduled Appointments',
        medicalElement3: 'Comprehensive Exam',
        medicalElement3Status: 'Completed',
      },
      featuresList: [
        "Simple appointment scheduling. Know exactly when you have availability and when you're busy.",
        'Digital file for every patient. Not just medical history, but your notes too.',
        'Automatic notifications. For the patient, the doctor, and the clinic.',
        'Remote follow-up. Your patient is at home? You can follow up from your office.',
        'Smart reports. Not just numbers... but insights that help you improve your clinic.',
      ],
      // Why Rousheta Section
      whyRushita: {
        title: 'Why Rousheta?',
        subtitle: 'Discover how Rousheta can transform your clinic management',
        learnMore: 'Learn More',
        item1Title:
          'A patient called asking about their condition... and the secretary flipped through notebooks.',
        item1Description:
          'With Rousheta, all patient data is available with one click',
        item2Title:
          'A doctor searches for a patient file... and the file is lost somewhere.',
        item2Description:
          'Integrated electronic system for storing and managing all medical files',
        item3Title:
          "A patient booked an appointment... forgot the appointment and didn't show up.",
        item3Description: 'Automatic reminders for patients via SMS and email',
      },

      // Value Proposition
      valueProposition: {
        title: 'Comprehensive Solutions for Your Clinic',
        subtitle: 'Everything you need to run a successful clinic in one place',
        features: [
          'Patient and medical records management',
          'Appointment and reminder system',
          'Reports and analytics',
          'Inventory and medication management',
          'Billing and accounting',
          'Mobile app for patients',
        ],
      },

      // CTA Section
      cta: {
        offer: 'Exclusive Limited Offer',
        title: 'Get Your Copy Now',
        subtitle:
          'Enjoy lifetime discount! Be among the first and get 50% lifetime discount',
        offerBadge: '🔥 Limited Offer - 50% Lifetime Discount',
        startYourJourney: 'Start Your Smart Medical Journey Today',
        button: 'Start Free Trial Now',
        note: '✨ No Commitments • Cancel Anytime • Free Technical Support',
        benefits: [
          {
            title: 'Free Trial',
            description: '30 Full Days',
          },
          {
            title: 'Quick Setup',
            description: 'In Minutes',
          },
          {
            title: 'Continuous Support',
            description: '24/7 Available',
          },
        ],
        trustIndicators: [
          { title: 'Clinics Trust Us' },
          { title: 'Uptime' },
          { title: 'User Rating' },
        ],
      },

      // About Section
      about: {
        title: 'Our Story',
        subtitle: 'Why Rousheta?',
        description:
          'A system born from the heart of clinics, designed with deep understanding of doctors and patients needs',
        mainMessage: {
          title: 'Not just a medical system...',
          subtitle: 'We understand clinic pain',
        },
        storyCards: [
          {
            description:
              '"Rousheta" was born from the heart of a clinic.. We worked with doctors, secretaries, patients and heard all the details, all the struggles, and every small sigh from clinic day pressure.',
          },
          {
            description:
              'We came back and designed the system not just to be "beautiful" only! But to be useful – fast – realistic – smart.',
          },
        ],
        keyFeatures: [
          { title: 'Easy to Use' },
          { title: 'Fast & Smart' },
          { title: 'Secure & Protected' },
          { title: 'Continuous Support' },
        ],
        stats: [{ title: 'Active Users' }, { title: 'Clinics Trust Us' }],
        overlay: {
          title: 'From the Heart of Clinic',
          description: 'Real experience with doctors and patients',
        },
      },

      // Features Section
      features: {
        title: 'Our Comprehensive Services',
        subtitle: 'What Do We Offer?',
        description:
          'Everything you need... from the first "Hello Doctor" to the last "Thank you"',
        overlay: {
          title: 'Integrated Smart System',
          description: 'Seamless experience for efficient clinic management',
        },
        bottomStats: [
          {
            title: 'Fast',
            description: 'Setup in Minutes',
          },
          {
            title: 'Reliable',
            description: 'Safe & Secure',
          },
        ],
      },

      // System Integration
      systemIntegration: {
        title: 'Smart Integration',
        subtitle: 'Not just a system...',
        description: 'Rousheta works like a complete team',
        note: 'From patient entry, to appointment scheduling, to diagnosis, to prescription, to follow-up.. every department in the clinic automatically communicates with the other',
        features: [
          'The doctor sees the secretary’s alerts',
          'The lab receives its own requests',
          'The accountant automatically knows the invoice status',
        ],
        hub: {
          title: 'Rousheta',
          description: 'Smart Hub',
        },
        satellite: {
          doctor: 'Doctor',
          lab: 'Laboratory',
          accountant: 'Accountant',
          secretary: 'Secretary',
        },
        bottomStats: [
          { title: 'Automatic Integration' },
          { title: 'Continuous Operation' },
          { title: 'Human Errors' },
        ],
      },

      // Final CTA
      finalCta: {
        badge: 'Ready to Launch with You',
        title: 'Your Medical System',
        subtitle: 'In Your Hands Now',
        description:
          'From first patient to last report, from appointment scheduling to financial management - Rousheta transforms your clinic into a smart integrated system',
        features: [
          { title: 'Quick Setup' },
          { title: 'Fast & Smart' },
          { title: 'Secure & Protected' },
          { title: '24/7 Support' },
        ],
        subscription: {
          title: 'Subscription Plans',
          description: 'Choose the plan that fits your clinic needs',
          monthly: 'Monthly',
          yearly: 'Yearly',
          save: 'Save',
          perMonth: 'month',
          perYear: 'year',
          saveAmount: 'Save {{amount}}$',
          startTrial: 'Start Your Free Trial Now',
          trialNote: '✨ 30-day free trial • Cancel anytime',
          offer: 'Limited Offer',
          professional: {
            planName: 'Comprehensive Package',
            subtitle: 'Everything you need for a smart and advanced clinic',
            popular: 'Most Popular',
            features: {
              patientManagement:
                'Comprehensive patient and appointment management',
              financialSystem: 'Integrated financial system with reports',
              medicalRecords: 'Secure digital medical records',
              automatedReminders: 'Automated patient reminders',
              support: '24/7 technical support',
              lifetimeUpdates: 'Free lifetime updates',
            },
            highlights: {
              quickSetup: 'Quick Setup',
              secure: 'Certified Protection',
              support: 'Instant Support',
            },
          },
          basic: {
            planName: 'Basic Package',
            subtitle: 'Essential features for small clinics',
            features: {
              patientManagement: 'Basic patient and appointment management',
              medicalRecords: 'Secure digital medical records',
              support: 'Email support',
            },
            highlights: {
              quickSetup: 'Quick Setup',
              secure: 'Certified Protection',
              support: 'Email Support',
            },
          },
          enterprise: {
            planName: 'Enterprise Package',
            subtitle: 'Advanced features for large clinics and hospitals',
            features: {
              patientManagement:
                'Comprehensive patient and appointment management',
              financialSystem: 'Integrated financial system with reports',
              medicalRecords: 'Secure digital medical records',
              automatedReminders: 'Automated patient reminders',
              support: '24/7 technical support',
              lifetimeUpdates: 'Free lifetime updates',
              hospitalSystem: 'Hospital system integration',
              customTraining: 'Custom training and support',
            },
            highlights: {
              quickSetup: 'Quick Setup',
              secure: 'Certified Protection',
              support: 'Instant Support',
            },
          },
        },
        trustIndicators: [
          { title: 'Clinics Trust Us' },
          { title: 'Uptime' },
          { title: 'Technical Support' },
        ],
      },

      footer: {
        companyInfo: {
          description:
            'Smart clinic management system that makes your workday easier and more organized. From the first appointment to the last follow-up.',
          email: 'contact@rousheta.net',
          phone: '+966 50 123 4567',
          address: 'Riyadh, Saudi Arabia',
        },
        quickLinks: 'Quick Links',
        contactUs: 'Contact Us',
        newsletter: {
          title: 'Subscribe to Our Newsletter',
          placeholder: 'Your email address',
          subscribe: 'Subscribe',
          privacyNote: "We'll never share your email with anyone else.",
        },

        socialMedia: 'Follow Us',
        rights: ' {year} Rousheta. All rights reserved.',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        scrollToTop: 'Back to top',
        supportResources: {
          title: 'Support & Resources',
          helpCenter: 'Help Center',
          faq: 'FAQ',
          userGuide: 'User Guide',
          contactUs: 'Contact Us',
        },
        allRightsReserved: 'All Rights Reserved',
        termsConditions: 'Terms & Conditions',
        usagePolicy: 'Usage Policy',
        privacyPolicy: 'Privacy Policy',
      },
      projectName: 'Rousheta',
    },
  },
};
