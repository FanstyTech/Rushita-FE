import { NextResponse } from 'next/server';
import { mockUsers } from '@/mockData/users';

export async function GET(request: Request) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get page and limit from query parameters
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = mockUsers.slice(startIndex, endIndex);
  
  return NextResponse.json({
    users: paginatedUsers,
    total: mockUsers.length,
    page,
    limit,
    totalPages: Math.ceil(mockUsers.length / limit)
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  // Here you would typically validate and save the data
  return NextResponse.json({ message: 'User created successfully', user: data });
}

export async function PUT(request: Request) {
  const data = await request.json();
  // Here you would typically validate and update the data
  return NextResponse.json({ message: 'User updated successfully', user: data });
}

export async function DELETE(request: Request) {
  const data = await request.json();
  // Here you would typically validate and delete the user
  return NextResponse.json({ message: 'User deleted successfully', userId: data.id });
}
