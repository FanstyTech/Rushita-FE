import { NextResponse } from 'next/server';
import { rays } from '@/mockData/rays';

export async function GET() {
  try {
    return NextResponse.json({ rays });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch rays' },
      { status: 500 }
    );
  }
}
