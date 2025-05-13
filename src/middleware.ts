import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { env } from '@/lib/env';

export function middleware(request: NextRequest) {
  // Check if the request is for the management page
  if (request.nextUrl.pathname.startsWith('/management')) {
    // Skip authentication check for the login page
    if (request.nextUrl.pathname === '/management/login') {
      return NextResponse.next();
    }

    // Get the admin password from cookies
    const adminPassword = request.cookies.get('admin_password')?.value;

    // If no password cookie or incorrect password, redirect to login
    if (!adminPassword || adminPassword !== env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/management/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/management/:path*',
}; 