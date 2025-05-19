import { NextResponse } from 'next/server';
import { clinics } from '@/mockData/clinics';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() {
  await delay(1000); // 1 second delay
  return NextResponse.json(clinics);
}

export async function POST(request: Request) {
  await delay(800); // 800ms delay
  const newClinic = await request.json();
  // In a real app, you would save to a database
  // For mock data, we'll just return the new clinic
  return NextResponse.json(newClinic, { status: 201 });
} 