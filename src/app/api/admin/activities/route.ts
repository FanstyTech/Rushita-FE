import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // TODO: Replace with actual database queries
    const activities = [
      { 
        id: 1, 
        type: 'clinic_added', 
        clinic: 'City Medical Center', 
        time: '2 hours ago' 
      },
      { 
        id: 2, 
        type: 'user_joined', 
        name: 'Dr. Sarah Wilson', 
        role: 'Doctor', 
        time: '4 hours ago' 
      },
      { 
        id: 3, 
        type: 'appointment_surge', 
        clinic: 'Metro Hospital', 
        count: 25, 
        time: '6 hours ago' 
      },
      { 
        id: 4, 
        type: 'system_update', 
        version: '2.1.0', 
        time: '12 hours ago' 
      },
    ];

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}
