import { NextResponse } from 'next/server';

// Mock doctor data - replace with actual database query
const doctorData = {
  id: 1,
  name: 'Dr. Ahmed Al-Sayed',
  specialization: 'Cardiology',
  email: 'dr.ahmed@clinic.com',
  phone: '+966 50 123 4567',
  location: 'Riyadh Medical Complex',
  experience: '15 years',
  education: [
    'MBBS - King Saud University, 2008',
    'MD Cardiology - Johns Hopkins University, 2012',
    'Fellowship in Interventional Cardiology - Cleveland Clinic, 2014',
  ],
  certifications: [
    'Saudi Board of Cardiology',
    'American Board of Internal Medicine',
    'European Society of Cardiology Fellow',
  ],
  languages: ['Arabic', 'English'],
  workingHours: {
    Sunday: '9:00 AM - 5:00 PM',
    Monday: '9:00 AM - 5:00 PM',
    Tuesday: '9:00 AM - 5:00 PM',
    Wednesday: '9:00 AM - 5:00 PM',
    Thursday: '9:00 AM - 3:00 PM',
    Friday: 'Closed',
    Saturday: 'Closed',
  },
  socialMedia: {
    twitter: 'https://twitter.com/dr_ahmed',
    linkedin: 'https://linkedin.com/in/dr-ahmed',
    facebook: 'https://facebook.com/dr.ahmed.clinic',
    instagram: 'https://instagram.com/dr.ahmed.cardio',
  },
  stats: {
    totalPatients: 1250,
    experienceYears: 15,
    successRate: 98,
    ratings: 4.9,
  },
};

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    // In a real application, you would fetch this data from your database
    // const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });

    return NextResponse.json(doctorData);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch doctor profile' },
      { status: 500 }
    );
  }
}
