import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add paths that don't require authentication
const publicPaths = [
  '/', // Landing page
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
];

export function middleware(request: NextRequest) {
  return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Check if the path is public
  const isPublicPath = publicPaths.some((path) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path)
  );

  // Get the token from cookies
  const token = request.cookies.get('auth-token')?.value;

  // If the path requires authentication and no token exists, redirect to login
  if (!isPublicPath && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    // Store the current URL to redirect back after login
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and tries to access auth pages, redirect to dashboard
  // But allow access to login page if it's a logout redirect
  if (isPublicPath && token && pathname.startsWith('/auth')) {
    const isLogoutRedirect =
      request.headers.get('x-logout-redirect') === 'true';
    if (!isLogoutRedirect) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};
