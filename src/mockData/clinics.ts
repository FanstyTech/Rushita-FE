export interface Clinic {
  id: string;
  name: string;
  city: string;
  status: 'Active' | 'Inactive';
  patients: number;
  doctors: number;
  logo: string;
  description: string;
  workingHours: {
    weekdays: string;
    weekends: string;
  };
  specialties: string[];
  facilities: string[];
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  rating: number;
}

export const clinics: Clinic[] = [
  {
    id: '1',
    name: 'City Health Clinic',
    city: 'Riyadh',
    status: 'Active',
    patients: 150,
    doctors: 8,
    logo: 'https://placehold.co/400x400/67e8f9/ffffff.png?text=CHC&font=roboto',
    description: 'Leading healthcare provider in Riyadh with state-of-the-art facilities.',
    workingHours: {
      weekdays: '8:00 AM - 10:00 PM',
      weekends: '9:00 AM - 6:00 PM'
    },
    specialties: ['General Medicine', 'Cardiology', 'Pediatrics'],
    facilities: ['Laboratory', 'Pharmacy', 'Emergency Room', 'X-Ray'],
    contactInfo: {
      phone: '+966 11 123 4567',
      email: 'info@cityhealth.com',
      address: 'King Fahd Road, Riyadh, Saudi Arabia'
    },
    rating: 4.5
  },
  {
    id: '2',
    name: 'Al Noor Medical Center',
    city: 'Jeddah',
    status: 'Inactive',
    patients: 80,
    doctors: 5,
    logo: 'https://placehold.co/400x400/a5b4fc/ffffff.png?text=ANM&font=roboto',
    description: 'Specialized medical center offering comprehensive healthcare services.',
    workingHours: {
      weekdays: '9:00 AM - 9:00 PM',
      weekends: '10:00 AM - 5:00 PM'
    },
    specialties: ['Orthopedics', 'Dermatology', 'Dentistry'],
    facilities: ['MRI', 'Surgery Rooms', 'Pharmacy'],
    contactInfo: {
      phone: '+966 12 234 5678',
      email: 'contact@alnoor.com',
      address: 'Prince Mohammed Street, Jeddah, Saudi Arabia'
    },
    rating: 4.2
  },
  {
    id: '3',
    name: 'Saudi German Hospital',
    city: 'Dammam',
    status: 'Active',
    patients: 200,
    doctors: 12,
    logo: 'https://placehold.co/400x400/fca5a5/ffffff.png?text=SGH&font=roboto',
    description: 'Multi-specialty hospital providing world-class medical care.',
    workingHours: {
      weekdays: '24/7',
      weekends: '24/7'
    },
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Pediatrics'],
    facilities: ['ICU', 'NICU', 'MRI', 'CT Scan', 'Laboratory'],
    contactInfo: {
      phone: '+966 13 345 6789',
      email: 'info@saudigerman.com',
      address: 'King Abdulaziz Road, Dammam, Saudi Arabia'
    },
    rating: 4.8
  },
  {
    id: '4',
    name: 'Al Habib Medical Group',
    city: 'Riyadh',
    status: 'Active',
    patients: 300,
    doctors: 25,
    logo: 'https://placehold.co/400x400/86efac/ffffff.png?text=AHM&font=roboto',
    description: 'Premier healthcare network with advanced medical technologies.',
    workingHours: {
      weekdays: '7:00 AM - 11:00 PM',
      weekends: '8:00 AM - 8:00 PM'
    },
    specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology'],
    facilities: ['ICU', 'NICU', 'MRI', 'CT Scan', 'Laboratory', 'Pharmacy', 'Surgery Rooms'],
    contactInfo: {
      phone: '+966 11 234 5678',
      email: 'info@alhabib.com',
      address: 'Olaya Street, Riyadh, Saudi Arabia'
    },
    rating: 4.7
  },
  {
    id: '5',
    name: 'Almana General Hospital',
    city: 'Al Khobar',
    status: 'Active',
    patients: 175,
    doctors: 15,
    logo: 'https://placehold.co/400x400/fcd34d/ffffff.png?text=AGH&font=roboto',
    description: 'Comprehensive healthcare services with a focus on patient comfort.',
    workingHours: {
      weekdays: '8:00 AM - 9:00 PM',
      weekends: '9:00 AM - 5:00 PM'
    },
    specialties: ['General Medicine', 'Pediatrics', 'Gynecology', 'Orthopedics'],
    facilities: ['Laboratory', 'Pharmacy', 'X-Ray', 'Ultrasound', 'Emergency Room'],
    contactInfo: {
      phone: '+966 13 456 7890',
      email: 'contact@almana.com',
      address: 'Prince Turki Street, Al Khobar, Saudi Arabia'
    },
    rating: 4.4
  },
  {
    id: '6',
    name: 'Dallah Hospital',
    city: 'Makkah',
    status: 'Active',
    patients: 250,
    doctors: 20,
    logo: 'https://placehold.co/400x400/c084fc/ffffff.png?text=DH&font=roboto',
    description: 'Excellence in healthcare with modern facilities and expert staff.',
    workingHours: {
      weekdays: '24/7',
      weekends: '24/7'
    },
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Pediatrics', 'Orthopedics'],
    facilities: ['ICU', 'NICU', 'MRI', 'CT Scan', 'Laboratory', 'Pharmacy', 'Surgery Rooms'],
    contactInfo: {
      phone: '+966 12 345 6789',
      email: 'info@dallah.com',
      address: 'Al Aziziyah District, Makkah, Saudi Arabia'
    },
    rating: 4.6
  },
  {
    id: '7',
    name: 'Care Plus Medical Center',
    city: 'Medina',
    status: 'Inactive',
    patients: 60,
    doctors: 6,
    logo: 'https://placehold.co/400x400/94a3b8/ffffff.png?text=CPM&font=roboto',
    description: 'Personalized healthcare services in a comfortable environment.',
    workingHours: {
      weekdays: '9:00 AM - 8:00 PM',
      weekends: '10:00 AM - 4:00 PM'
    },
    specialties: ['General Medicine', 'Pediatrics', 'Dermatology'],
    facilities: ['Laboratory', 'Pharmacy', 'X-Ray'],
    contactInfo: {
      phone: '+966 14 567 8901',
      email: 'info@careplus.com',
      address: 'King Faisal Road, Medina, Saudi Arabia'
    },
    rating: 4.1
  },
  {
    id: '8',
    name: 'Al Mouwasat Hospital',
    city: 'Dammam',
    status: 'Active',
    patients: 220,
    doctors: 18,
    logo: 'https://placehold.co/400x400/60a5fa/ffffff.png?text=AMH&font=roboto',
    description: 'Advanced medical care with a patient-centered approach.',
    workingHours: {
      weekdays: '24/7',
      weekends: '24/7'
    },
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Pediatrics', 'Orthopedics'],
    facilities: ['ICU', 'NICU', 'MRI', 'CT Scan', 'Laboratory', 'Pharmacy', 'Surgery Rooms'],
    contactInfo: {
      phone: '+966 13 567 8901',
      email: 'info@mouwasat.com',
      address: 'Prince Mohammed Bin Fahd Road, Dammam, Saudi Arabia'
    },
    rating: 4.7
  },
  {
    id: '9',
    name: 'Green Crescent Clinic',
    city: 'Tabuk',
    status: 'Active',
    patients: 90,
    doctors: 7,
    logo: 'https://placehold.co/400x400/4ade80/ffffff.png?text=GCC&font=roboto',
    description: 'Quality healthcare services in a welcoming atmosphere.',
    workingHours: {
      weekdays: '8:00 AM - 8:00 PM',
      weekends: '9:00 AM - 5:00 PM'
    },
    specialties: ['General Medicine', 'Pediatrics', 'Dermatology', 'Dentistry'],
    facilities: ['Laboratory', 'Pharmacy', 'X-Ray', 'Dental Unit'],
    contactInfo: {
      phone: '+966 14 678 9012',
      email: 'info@greencrescent.com',
      address: 'King Abdulaziz Road, Tabuk, Saudi Arabia'
    },
    rating: 4.3
  }
]; 