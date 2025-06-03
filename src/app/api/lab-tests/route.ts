import { NextResponse } from 'next/server';
import { labTests } from '@/mockData/labTests';

export async function GET() {
  try {
    return NextResponse.json({ labTests });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch lab tests' },
      { status: 500 }
    );
  }
}
