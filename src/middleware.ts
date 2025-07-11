import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported languages
export const languages = ['en', 'ar', 'es'];
export const defaultLanguage = 'ar';

const publicPaths = [
  '/', // Landing page
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/images', // Public images
  '/fonts', // Public fonts
  '/favicon.ico', // Favicon
];

// Paths that should be excluded from language prefix redirects
const excludedFromRedirect = [
  '/api/',
  '/_next/',
  '/images/',
  '/fonts/',
  '/favicon.ico',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  return NextResponse.next();

  // Skip language handling for excluded paths
  if (excludedFromRedirect.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if the path has a language prefix
  const pathnameHasLanguage = languages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  // Get language from cookie or headers
  let language =
    request.cookies.get('language')?.value ||
    request.headers.get('accept-language')?.split(',')[0].split('-')[0] ||
    defaultLanguage;

  // Ensure language is supported, otherwise use default
  if (!languages.includes(language)) {
    language = defaultLanguage;
  }

  // If path has language prefix, we need to rewrite it to the actual route
  // This allows Next.js to find the correct page while preserving the language in the URL
  if (pathnameHasLanguage) {
    const langPrefix = `/${pathname.split('/')[1]}`;
    const pathWithoutLang = pathname.replace(langPrefix, '') || '/';

    // Create a rewrite URL (internal redirect that doesn't change the URL in browser)
    const url = request.nextUrl.clone();
    url.pathname = pathWithoutLang;

    // Extract the path without the language prefix for auth checks
    const pathWithoutLanguage = pathWithoutLang;

    // Check if the path is public
    const isPublicPath = publicPaths.some((path) =>
      path === '/'
        ? pathWithoutLanguage === '/'
        : pathWithoutLanguage.startsWith(path)
    );

    // Get the token from cookies
    const token = request.cookies.get('auth-token')?.value;

    // If the path requires authentication and no token exists, redirect to login
    if (!isPublicPath && !token) {
      const loginUrl = new URL(
        `/${pathname.split('/')[1]}/auth/login`,
        request.url
      );
      // Store the current URL to redirect back after login
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If user is authenticated and tries to access auth pages, redirect to dashboard
    // But allow access to login page if it's a logout redirect
    if (isPublicPath && token && pathWithoutLanguage.startsWith('/auth')) {
      const isLogoutRedirect =
        request.headers.get('x-logout-redirect') === 'true';
      // For development/testing purposes, allow access to auth pages
      const allowAuthAccess = true; // Set to false in production
      if (!isLogoutRedirect && !allowAuthAccess) {
        return NextResponse.redirect(
          new URL(`/${pathname.split('/')[1]}/`, request.url)
        );
      }
    }

    // Set language cookie based on URL
    const response = NextResponse.rewrite(url);
    const urlLang = pathname.split('/')[1];
    if (request.cookies.get('language')?.value !== urlLang) {
      response.cookies.set('language', urlLang, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } else {
    // For paths without language prefix, redirect to the same path with language prefix
    // Except for the root path '/' which we'll keep as is for SEO purposes
    if (pathname !== '/') {
      const url = new URL(`/${language}${pathname}`, request.url);
      return NextResponse.redirect(url);
    }

    // For paths without language prefix, handle normally
    // Check if the path is public
    const isPublicPath = publicPaths.some((path) =>
      path === '/' ? pathname === '/' : pathname.startsWith(path)
    );

    // Get the token from cookies
    const token = request.cookies.get('auth-token')?.value;

    // If the path requires authentication and no token exists, redirect to login
    if (!isPublicPath && !token) {
      const loginUrl = new URL(`/${language}/auth/login`, request.url);
      // Store the current URL to redirect back after login
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If user is authenticated and tries to access auth pages, redirect to dashboard
    // But allow access to login page if it's a logout redirect
    if (isPublicPath && token && pathname.startsWith('/auth')) {
      const isLogoutRedirect =
        request.headers.get('x-logout-redirect') === 'true';
      // For development/testing purposes, allow access to auth pages
      const allowAuthAccess = true; // Set to false in production
      if (!isLogoutRedirect && !allowAuthAccess) {
        return NextResponse.redirect(new URL(`/${language}/`, request.url));
      }
    }

    // Set language cookie if it doesn't exist or is different
    const response = NextResponse.next();
    if (request.cookies.get('language')?.value !== language) {
      response.cookies.set('language', language, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  }
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
