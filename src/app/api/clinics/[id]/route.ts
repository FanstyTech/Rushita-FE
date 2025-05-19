import { NextResponse } from 'next/server';
import { clinics } from '@/mockData/clinics';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await delay(600); // 600ms delay
  const clinic = clinics.find(c => c.id === params.id);
  
  if (!clinic) {
    return NextResponse.json(
      { error: 'Clinic not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(clinic);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await delay(900); // 900ms delay
  const updatedClinic = await request.json();
  // In a real app, you would update in a database
  return NextResponse.json(updatedClinic);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await delay(700); // 700ms delay
  // In a real app, you would delete from a database
  return NextResponse.json(
    { message: 'Clinic deleted successfully' },
    { status: 200 }
  );
} 