export const profile = {
  title: 'Clinic Profile',
  description: 'Manage clinic information and basic settings',

  buttons: {
    edit: 'Edit Profile',
    cancel: 'Cancel',
    save: 'Save Changes',
  },

  sections: {
    basicInfo: {
      title: 'Basic Information',
      description: 'Basic clinic information and contact details',
    },
    location: {
      title: 'Location Information',
      description: 'Clinic address and geographic location',
    },
    workingHours: {
      title: 'Working Hours',
      description: 'Set clinic operating hours throughout the week',
    },
    specialties: {
      title: 'Specialties',
      description: 'Medical specialties available at the clinic',
    },
    socialMedia: {
      title: 'Social Media',
      description: 'Social media links and website',
    },
  },

  form: {
    labels: {
      nameArabic: 'Clinic Name (Arabic)',
      nameEnglish: 'Clinic Name (English)',
      email: 'Email Address',
      phoneNumber: 'Phone Number',
      bio: 'About the Clinic',
      country: 'Country',
      city: 'City',
      address: 'Full Address',
      website: 'Website',
      facebook: 'Facebook',
      twitter: 'Twitter',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      youtube: 'YouTube',
    },
    placeholders: {
      selectCountry: 'Select Country',
      selectCity: 'Select City',
      website: 'https://www.example.com',
      facebook: 'https://facebook.com/clinic',
      twitter: 'https://twitter.com/clinic',
      instagram: 'https://instagram.com/clinic',
      linkedin: 'https://linkedin.com/company/clinic',
      youtube: 'https://youtube.com/clinic',
    },
  },

  workingHours: {
    to: 'to',
    closed: 'Closed',
  },

  errors: {
    loadingProfile: 'Error loading clinic data',
    savingProfile: 'Error saving clinic data',
  },

  loading: {
    profile: 'Loading clinic profile...',
    saving: 'Saving changes...',
  },

  validation: {
    nameArabicRequired: 'Arabic clinic name is required',
    nameArabicMinLength: 'Arabic clinic name must be at least 3 characters',
    nameEnglishRequired: 'English clinic name is required',
    nameEnglishMinLength: 'English clinic name must be at least 3 characters',
    emailRequired: 'Email address is required',
    emailInvalid: 'Invalid email address',
    phoneRequired: 'Phone number is required',
    phoneMinLength: 'Phone number must be at least 8 digits',
    bioRequired: 'Clinic description is required',
    urlInvalid: 'Invalid URL',
  },
};
