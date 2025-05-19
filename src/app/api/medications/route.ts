import { NextResponse } from 'next/server';
import { medications, searchMedications } from '@/mockData/medications';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    
    const results = query ? searchMedications(query) : medications;
    
    return NextResponse.json({
      status: 'success',
      data: results
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch medications' },
      { status: 500 }
    );
  }
}
