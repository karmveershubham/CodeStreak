// frontend/app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { account } from '../lib/appwrite';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  try {
    // Attempt to get the current user session
    await account.get();
    return NextResponse.next(); // User is authenticated
  } catch (error) {
    // Redirect to login page if authentication fails
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/dashboard/:path*'], // Apply middleware to dashboard route
};
