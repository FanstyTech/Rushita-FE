import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // TODO: Replace with actual database queries
    const stats = {
      totalClinics: 24,
      activeUsers: 1429,
      totalAppointments: 3842,
      clinicsChange: 2,
      usersChange: 142,
      appointmentsChange: 8
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
