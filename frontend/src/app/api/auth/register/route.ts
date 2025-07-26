import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward the request to the backend - note: /api/user/ not /api/users/
    const backendResponse = await fetch(`${process.env.BACKEND_URL || 'http://localhost:8000'}/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();

    // Return the response from backend with appropriate status
    return NextResponse.json(data, { 
      status: backendResponse.status 
    });

  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { status: 'failed', message: 'Internal server error' },
      { status: 500 }
    );
  }
} 